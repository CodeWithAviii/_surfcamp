import axios from "axios";
import Link from "next/link";
import QueryString from "qs";

const BASE_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function fetchDataFromStrapi(route) {
    const url = `${BASE_URL}/api/${route}`;

    try {
        const response = await axios.get(url)
        return response.data.data;
    } catch (error) {
        console.log(error)
        throw new Error(`Failed to fetch data from Strapi: ${url}`);
    }
}

export function processedInfoBlocks(data){
    const infoBlocksRaw = data.attributes.info_blocks.data;
    return infoBlocksRaw.map((infoBlock) => (
        {
            ...infoBlock.attributes,
            id: infoBlock.id,
            imageSrc: BASE_URL + infoBlock.attributes?.image?.data?.attributes?.url,
            button: createInfoBlockButton(infoBlock.attributes?.button),
        }
    ))
}

export function createInfoBlockButton(buttonData){
    if(!buttonData) return null;

    return(
        <Link href={buttonData.slug}
        className={`btn btn--medium btn--${buttonData.colour}`}
         >
            {buttonData.text}
        </Link>
    )
}

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi("blog-articles?populate=deep")
  const processedBlogArticles = blogData.map(processBlogArticles);
    processedBlogArticles.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    return processedBlogArticles;
}

function processBlogArticles(article){
   return {
    ...article.attributes,
    id: article.id,
    featuredImage: BASE_URL + article.attributes?.featuredImage?.data?.attributes?.url,
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

export function extractImageUrl(imageData){
    return BASE_URL + imageData?.data?.attributes?.url;
}

export async function fetchIndividualEvent(eventId) {
  const response = await axios.get(`${BASE_URL}/api/events/${eventId}`);
  return processEventData(response.data.data);
}

function processEventData(event){
    return {
        ...event.attributes,
        id: event.id,
        image: BASE_URL + event.attributes?.image?.data?.attributes?.url,
    }
}

export function generateSignupPayload(formData, eventId) {
  if(!eventId) {
    return {
        data: { ...formData, isGeneralInterest: true },
    }
  }else{
    return {
        data : {
            ...formData,
            event:{
                connect: [eventId]
            }
        }
    }
  }
}

function createEventQuery(eventIdToExclude) {
  const queryObject = {
    pagination: {
      start: 0,
      limit: 12,
    },
    sort: ["startingDate:asc"],
    filters: {
      startingDate: {
        $gt: new Date(),
      },
    },
    populate: {
      image: {
        populate: "*",
      },
    },
  };
   if (eventIdToExclude) {
    queryObject.filters.id = {
      $ne: eventIdToExclude,
    };
  }

    return QueryString.stringify(queryObject, { encodeValuesOnly: true });
}

export async function fetchAllEvents(eventIdToExclude = null){
     const query = createEventQuery(eventIdToExclude);

    const response = await axios.get(`${BASE_URL}/api/events?${query}`);
    return response.data.data.map((event) => processEventData(event));
}
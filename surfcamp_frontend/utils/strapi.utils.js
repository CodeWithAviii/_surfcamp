import axios from "axios";
import Link from "next/link";

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
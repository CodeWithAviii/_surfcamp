import HeroSection from "./_components/HeroSection"
import InfoBlock from "./_components/InfoBlock"
import { fetchDataFromStrapi, processedInfoBlocks } from "@/utils/strapi.utils"

export default async function Home() {
  const data = await fetchDataFromStrapi("infoblocks-landing?populate=deep");
  const infoBlocksData = processedInfoBlocks(data);
 
  const heroheadline = (
    <>
            <h1>barrel.</h1>
            <h1>your.</h1>
            <h1>happiness.</h1>
    </>
  )


  return (
    <main >
      <HeroSection healine={heroheadline}/>
      {infoBlocksData.map((data) => <InfoBlock key={data.id} data={data} />)}
    </main>
  )
}

export const revalidate = 300; // Revalidate every 5 minutes
import { extractImageUrl } from "@/utils/strapi.utils";

const LandscapeImage = ({imageData}) => {
   
    // console.log(imageData)
    return <div className="article-image">
        <img src={extractImageUrl(imageData.image)} alt="Landscape" />
        <p className="copy-small article-image__caption">{imageData.imageCaption}</p>
    </div>
}

export default LandscapeImage;
import { extractImageUrl } from "@/utils/strapi.utils";
import ReactMarkDown from "react-markdown";
const ImageTextComponent = ({ component }) => {
  const { image, imageCaption, paragraph, isLandscape, imageShowsRight } = component;
  // console.log(component);
  // console.log(extractImageUrl(component.image));
  return (
    <div className={`article-text-image ${isLandscape ? "" : "article-text-image--portrait"} 
    ${imageShowsRight ? "" : "article-text-image--reversed"}`}>
      <div className="copy article-text-image__text article-paragraph">
        <ReactMarkDown>{paragraph}</ReactMarkDown>
      </div>
      <div className="article-text-image__container">
        <div className="article-text-image__image">
          <img src={extractImageUrl(image)} alt="" />
        </div>
        {imageCaption && <p className="article-text-image__caption copy-small">
          {imageCaption}
        </p>}
      </div>
    </div>
  );
};

export default ImageTextComponent;

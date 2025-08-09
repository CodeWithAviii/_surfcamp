import ReactMarkdown from "react-markdown";

const InfoBlock = ({data}) => {
    const {button ,headline, text, imageSrc, showImageRight} = data;
    // button
    // {button}
  return (
    <div className={`info ${showImageRight ? "info--reversed" : ""}`}>
        <img src={imageSrc || "/info-blocks/rectangle.png" }alt="" className="info__image" />
        <div className="info__text">
        <h2 className="info__headline">{headline}</h2>
         <ReactMarkdown
  components={{
    p: ({ node, ...props }) => <p className="copy" {...props} />,
  }}
>
  {text}
</ReactMarkdown>
{button}
        </div>
    </div>
  )
}

export default InfoBlock
import ReactMarkDown from 'react-markdown';
const ArticleParagraph = ({ paragraph }) => {
    console.log(paragraph)
  return (
    <div className="article-paragraph copy">
      <ReactMarkDown>{paragraph.paragraph}</ReactMarkDown>
    </div>
  );
};

export default ArticleParagraph;

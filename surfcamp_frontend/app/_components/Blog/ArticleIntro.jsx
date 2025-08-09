import { formatDate } from "@/utils/strapi.utils";

const ArticleIntro = ({ article }) => {
    return (
        <div className="article-intro">
            <div className="article-intro__background">
                <img src={article.featuredImage} />
            </div>
            <h3 className="article-intro__headline">
                 {article.headline}
            </h3>
            <p className="copy-small bold">
                {formatDate(article.publishedAt)}
            </p>
            <p className="copy-small">{article.author}</p>
        </div>
    );
};

export default ArticleIntro;


//Todo: Setup hero section theme according to the bg image

// headline: '3 tips for a super fast takeoff',
//   author: 'Arvind Kumar',
//   publishedAt: '2025-08-08T05:06:58.105Z',
//   featuredImage: 'http://localhost:1337/uploads/Group_32_2b6497cbb1.png'
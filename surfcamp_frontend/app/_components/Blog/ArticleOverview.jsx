import Link from "next/link";

const ArticleOverview = ({article}) => {
    // console.log(article);
    const headlines = article.ArticleContent.filter((component) => component.__component === "blog-article.headline");
    console.log(headlines.length)
    console.log(headlines[0])
    return (
        <div className="article-overview">
            <div className="article-overview__info">
                <h3 className="article-overview__headline">
                    In this Blog
                </h3>
                <h5 className="article-overview__excerpt">
                    {article.excerpt}
                </h5>
            </div>
            <div className="article-overview__contents">
                {headlines.map((headline, index) => (
                    <li key={headline.id} >
                        <Link href={`#${headline.slug}`}>
                        {index + 1}. {headline.headline}
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default ArticleOverview;
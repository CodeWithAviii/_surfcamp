import React from "react";
import HighlightArticle from "../_components/Blog/HighlightArticle";
import SubscribeToNewsLetter from "../_components/Blog/SubscribeToNewsLetter";
import FeaturedItems from "../_components/FeaturedItems/FeaturedItems";
import { fetchBlogArticles } from "@/utils/strapi.utils";


export default async function page() {
   const data = await fetchBlogArticles();

   //write different logic to find the highlight article
    //find the article that is not marked as highlight but sorted by published date


 const highlightArticleData = data.find(
    (article) => article.isHighlightArticle
  );

  const featuredArticlesData = data.filter(
    (article) => !article.isHighlightArticle
  );
  
  return (
    <main className="blog-page">
      <HighlightArticle data={highlightArticleData} />
      <SubscribeToNewsLetter />
      <FeaturedItems items={featuredArticlesData} />
    </main>
  );
};

export const revalidate = 300; // Revalidate every 60 seconds
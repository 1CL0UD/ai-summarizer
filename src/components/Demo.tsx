// import { useState, useEffect } from 'react';
import copy from '../assets/copy.svg';
import { useEffect, useState } from 'react';
import link from '../assets/link.svg';
// import  loader  from '../assets/loader.svg';
// import  tick  from '../assets/tick.svg';

import { useLazyGetSummaryQuery } from '../services/article';

interface Article {
  url: string;
  article: string;
  summary?: string;
}

const Demo = () => {
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [article, setArticle] = useState<Article>({ url: '', article: '' });
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem('articles');
    if (articlesFromLocalStorage !== null) {
      const parsedArticles = JSON.parse(articlesFromLocalStorage);
      setAllArticles(parsedArticles);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={link}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ⏎
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              className="link_card"
              onClick={() => setArticle(item)}
              key={`link-${index}`}
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
    </section>
  );
};

export default Demo;

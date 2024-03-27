// import { useState, useEffect } from 'react';
// import copy  from '../assets/copy.svg';
import { useState } from 'react';
import link from '../assets/link.svg';
// import  loader  from '../assets/loader.svg';
// import  tick  from '../assets/tick.svg';

const Demo = () => {
  const [article, setArticle] = useState({ url: '', article: '' });
  const handleSubmit = async (e) => {
    alert('Submitted');
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
        {/* Browse URL History */}
      </div>
      {/* Display Results */}
    </section>
  );
};

export default Demo;

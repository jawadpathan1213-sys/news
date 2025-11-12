import React, { useState } from 'react';

function SearchNews() {
  const [text, setText] = useState(""); // what user types
  const [articles, setArticles] = useState([]); // news results

  const handleSearch = async () => {
    // use your API key here
    const url = `https://newsapi.org/v2/everything?q=${text}&pageSize=15&apiKey=d264cb14106f4c30a0d8564c9fb258d3`;
    const res = await fetch(url);
    const data = await res.json();
    setArticles(data.articles);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🔍 Search News</h2>

      {/* input box */}
      <input
        type="text"
        placeholder="Type topic here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', width: '250px', marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Search</button>

      {/* showing cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        {articles.map((item, i) => (
          <div key={i} style={{
            border: '1px solid gray',
            borderRadius: '10px',
            width: '280px',
            margin: '10px',
            padding: '10px'
          }}>
            <img
              src={item.urlToImage || '/car.jpeg'}
              alt=""
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h4>{item.title?.slice(0, 50)}</h4>
            <p>{item.description?.slice(0, 80)}</p>
            <a href={item.url} target="_blank" rel="noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchNews;

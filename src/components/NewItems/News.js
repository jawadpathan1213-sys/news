import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spiner from "../Spiner.js";
import PropTypes from "prop-types";
import "./News.css";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [articlesSearch, setArticlesSearch] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };
useEffect(() => {
  if (props.searchQuery === "") {
    setArticlesSearch(articles);
  }else {
    setArticlesSearch(
      articles.filter((elm) =>
        elm.title.toLowerCase().includes(props.searchQuery.toLowerCase())
      )
    );
  }
}, [props.searchQuery, articles]);

  document.title = `${capitalizeFirstLetter(props.category)} - NewMonkey`;

  const updateNews = async () => {
    props.setProgress(10);
    const apiKey = props.apikey; // fallback if env missing
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let persondata = await data.json() || [];
    props.setProgress(70);
    setArticles(persondata.articles);
    setArticlesSearch(persondata.articles);
    setTotalResults(persondata.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  
  


useEffect(() => {
    updateNews()
  }, []);

  //    const handlePrevClick = async () => {
  //        updateNews();
  //        setPage(page - 1)
  //   };
  //   const handleNextClick = async () => {
  //     if (
  //       !(
  //         this.state.page + 1 >
  //         Math.ceil(this.state.totalResults / this.props.pageSize)
  //       )
  //     ) {
  //       this.setState({ page: this.state.page + 1 });
  //       this.updateNews();
  //     }
  //   };

  const fetchMoreData = async () => {
    //  stop if already loaded all/
    if (articles.length >= totalResults) {
      return;
    }

    const nextPage = page + 1;
    const apiKey = props.apikey; // fallback if env missing
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let persondata = await data.json();
    
    // ✅ if API returned no new data
    if (!persondata.articles || persondata.articles.length === 0) {
      setTotalResults(articles.length);
      return;
    }

    setArticles(articles.concat(persondata.articles));
    setTotalResults(persondata.totalResults);
    setArticlesSearch(articles.concat(persondata.articles));
    setPage(nextPage);
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <h1
          style={{
            margin: "70px auto 10px auto",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spiner />}
        <InfiniteScroll
          style={{ textAlign: "center" }}
          dataLength={articles?.length || 0}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spiner />}
          endMessage={
            <p
              style={{ textAlign: "center", margin: "20px", color: "gray" }}
            ></p>
          }
        >
          <div className='container'>
            <div
              className='row lastchild'
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                width: "98vw",
                maxWidth: "1100px",
              }}
            >
              {!loading &&
                articlesSearch
                  .filter((elm) => elm && elm.title) // 👈 ensures elm is not undefined
                  .map((elm) => (
                    <div
                      className='card my-3 items'
                      key={elm.url}
                      style={{
                        width: "30vw",
                        padding: " 0px 0.5vw ",
                        maxWidth: "300px",
                        marginTop: "20px 0px",
                      }}
                    >
                      <NewsItems
                        title={elm.title ? elm.title.slice(0, 45) : ""}
                        description={
                          elm.description ? elm.description.slice(0, 88) : ""
                        }
                        imageUrl={elm.urlToImage ? elm.urlToImage : "/car.jpeg"}
                        newsUrl={elm.url ? elm.url : ""}
                        author={elm.author}
                        date={elm.publishedAt}
                        source={elm.source?.name || "Unknown"}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

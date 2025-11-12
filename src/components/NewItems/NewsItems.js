import React from "react";
import "./News.css";

const NewsItems =(props)=> {
  
    return (
      <div className='my-3'>
        <div
          className='container'
          style={{
            padding: "0.5vw",
            width: "100vw !important",
            maxWidth: "100vw",
          }}
        >
          <div className="container" style={{display:'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span className=' badge rounded-pill bg-danger' >
                            {props.source}
              </span>
          </div>
          <img src={props.imageUrl} className='card-img-top' alt='./images.png' />
          <div
            className='card-body'
            style={{ padding: " 0px 0.5vw", textAlign: "justify" }}
          >
            <h5 className='card-title'>
              {props.title}
                         
            </h5>
            <p className='card-text'>{props.description}</p>
            <p class='card-text'>
              <small class='text-body-secondary'>
                by {!props.author ? "Unknown" : props.author}
                <br /> On {new Date(props.date).toGMTString()}
              </small>
            </p>
            <a
              href={props.newsUrl}
              target='_blank'
              className='btn btn-sm btn-primary'
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItems;

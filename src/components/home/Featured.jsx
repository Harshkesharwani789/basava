import React, { useEffect, useState, useRef } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import './Featured.css'

const API_URL = "https://basavamart.in/api/product";
const Featured = () => {
  const [brands, setBrands] = useState([]);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/getbrand`);
      console.log(response.data);
      setBrands([...response.data, ...response.data]); // Duplicate the list
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft === 0) {
          scrollContainerRef.current.scrollLeft = scrollWidth / 2;
        } else if (scrollLeft + clientWidth >= scrollWidth) {
          scrollContainerRef.current.scrollLeft = scrollWidth / 2 - clientWidth;
        }
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [brands]);

  return (
    <div className="container mx-auto">
      <div className="section-head text-center">
        <h3 className="h3style" data-title="Shop Popular Categories">
          Shop Popular Brands
        </h3>
        <div className="wt-separator bg-primarys"></div>
        <div className="wt-separator2 bg-primarys"></div>
      </div>
      <div className="category-scroll-container">
        <button
          className="scroll-arrow left-arrow"
          onClick={() => scroll("left")}
        >
          &#9664;
        </button>
        <div className="category-scroll" ref={scrollContainerRef}>
          {brands.map((brand, index) => (
            <div key={index} className="category-card">
              <Link to="/shop">
                <LazyLoadImage src={`https://basavamart.in${brand.img}`} alt={brand.name} effect='blur'/>
              </Link>
              <div className="category-info">
                <h3>{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <button
          className="scroll-arrow right-arrow"
          onClick={() => scroll("right")}
        >
          &#9654;
        </button>
      </div>

      {/* <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-lg-4 col-md-6 col-12 fade-in-left">
          <Slide direction="left">
            <div className=" banner mb-3">
              <div className="position-relative">
                <LazyLoadImage
                  src="https://as2.ftcdn.net/v2/jpg/03/00/98/07/1000_F_300980743_5YrcmC0fWo7Ts2I2Sh2YjvybCcPAp0ak.jpg"
                  alt="ad-banner-2"
                  className="img-fluid rounded-3 w-100"
                  effect="blur"
                />
              </div>
            </div>
          </Slide>
        </div>

        <div className="col-lg-4 col-md-6  col-12 slide-in-top">
          <Zoom>
            <div className="banner mb-3 ">
              <div className="position-relative">
                <LazyLoadImage
                  src="https://as2.ftcdn.net/v2/jpg/03/00/98/07/1000_F_300980743_5YrcmC0fWo7Ts2I2Sh2YjvybCcPAp0ak.jpg"
                  alt="ad-banner-2"
                  className="img-fluid rounded-3 w-100"
                  effect="blur"
                />
              </div>
            </div>
          </Zoom>
        </div>
        <div className="col-lg-4 col-12 fade-in-left ">
          <Slide direction="right">
            <div className="banner mb-3">
              <div className="banner-img">
                <LazyLoadImage
                  src="https://as2.ftcdn.net/v2/jpg/04/65/81/67/1000_F_465816712_bJPZ9ahoO71J0H2SLxBCWHN3LxyHMwIf.jpg"
                  alt="ad-banner-3"
                  className="img-fluid rounded-3 w-100"
                  effect="blur"
                />
              </div>
            </div>
          </Slide>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;

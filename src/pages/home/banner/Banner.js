import React from "react";
import { useState, useEffect } from "react";
import mobimgs from "../../../assets/data/BannerMobImgs";
import labimgs from "../../../assets/data/BannerLabImgs";
import classes from "./banner.module.css";
import header from "../../../assets/imgs/banner/header.svg";
import { Link } from "react-router-dom";

/**
 * Component that renders banner of home page
 *
 * @component
 * return(
 * <Banner />
 * )
 */

const Banner = () => {
  const [randImg, setrandImg] = useState(
    Math.floor(Math.random() * labimgs.length)
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth > 660 ? labimgs[randImg] : mobimgs[randImg];

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      id="HomePageBannerContainer"
      className={classes.bannercontainer}
      style={{
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: "url(" + imageUrl + ")",
        // backgroundImage:"image-set(
        //     url("small-landscape-750x536.jpg") 1x,
        //     url("large-landscape-2048x1536.jpg") 2x)",
      }}>
      <div
        id="HomePageBannerHeaderContainer"
        className={classes.bannerheadercontainer}>
        <div
          id="HomePageBannerHeaderImgContainer"
          className={classes.bannerheaderimg}>
          <img
            id="HomePageBannerHeaderImg"
            src={header}
            alt="Now Is Your Time"
          />
        </div>
        <div
          id="HomePageBannerHeaderBtnContainer"
          className={classes.bannerheaderbtn}>
          <Link
            id="HomePageBannerHeaderBtn"
            to="/"
            className={classes.bannerheaderlink}>
            <div id="HomePageBannerHeaderBtnDiv"> Find Your Next Event</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

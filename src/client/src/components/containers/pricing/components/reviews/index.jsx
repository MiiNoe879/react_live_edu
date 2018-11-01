import styles from "./reviews.scss";
import React from "react";
import PropTypes from "prop-types";
import QuoteIcon from "../../../../../assets/img/icons/quote.svg";

const propTypes = {};

const defaultProps = {};

const reviews = [
  {
    id: "iek334",
    user: {
      avatarUrl: "http://via.placeholder.com/48x48",
      name: "Simon Garris",
      position: "PHP developer"
    },
    text:
      "The project creators really care about their content since they get rewarded for each view. This makes the projects very competitive and improves the quality."
  },
  {
    id: "o3kdm3",
    user: {
      avatarUrl: "http://via.placeholder.com/48x48",
      name: "Simon Garris",
      position: "PHP developer student"
    },
    text:
      "The streamers really care about their content since they get rewarded for each view. This makes the projects very competitive and improves the quality."
  },
  {
    id: "l39dkj",
    user: {
      avatarUrl: "http://via.placeholder.com/48x48",
      name: "Sergey Popov",
      position: "C++ developer"
    },
    text:
      "I'm lead programmist and when I faced issues on my projects the LiveEdu community really helped. I've contacted a project creator who does C++ projects and he solved my issue."
  },
  {
    id: "k3o2dk",
    user: {
      avatarUrl: "http://via.placeholder.com/48x48",
      name: "Jason Barns",
      position: "Cryptocurrency trader"
    },
    text:
      "This platform opens the doors to any opportunity in the digital world. Online learning is useful and LiveEdu makes it entertaining also."
  },
  {
    id: "l2ok4d",
    user: {
      avatarUrl: "http://via.placeholder.com/48x48",
      name: "Mario Verdini",
      position: "IOS developer"
    },
    text:
      "The main trick of following a live stream is that you earn experience by mirroring what the project creator does. Also thanks to the Q&A sessions I always get the full understanding."
  }
];

export default function Reviews(props) {
  const renderReviewItem = function(item) {
    return (
      <li className={styles.item} key={item.id}>
        <div className={styles.itemIcon}>
          <img src={QuoteIcon} className={styles.itemIconSvg} />
        </div>
        <div className={styles.itemContent}>
          <p className={styles.itemText}>{item.text}</p>
          <div className={styles.itemUser}>
            <div className={styles.itemUserAvatar}>
              <img src={item.user.avatarUrl} alt="Avatar" />
            </div>
            <div className={styles.itemUserInfo}>
              <p className={styles.itemUserName}>{item.user.name}</p>
              <p className={styles.itemUserPosition}>{item.user.position}</p>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderReviewsList = function(reviews) {
    return reviews.map(review => renderReviewItem(review));
  };

  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <h2 className={styles.title}>LiveEdu student reviews</h2>
        <ul className={styles.list}>{renderReviewsList(reviews)}</ul>
      </div>
    </section>
  );
}

Reviews.propTypes = propTypes;
Reviews.defaultProps = defaultProps;

import styles from "./reviews.scss";
import React from "react";
import PropTypes from "prop-types";
import ProjectRating from "components/presentational/project-rating";
import QuoteIcon from "../../../../../assets/img/icons/quote.svg";

const propTypes = {};

const defaultProps = {};

const reviews = [
  {
    id: "kdJejdl",
    avatarUrl: "http://via.placeholder.com/42x42",
    username: "Joselyn Zane",
    reviewRating: {
      avarage: 3,
      name: "iJ3dkS"
    },
    postedTime: "10 minutes ago",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed."
  },
  {
    id: "kdJ7jdl",
    avatarUrl: "http://via.placeholder.com/42x42",
    username: "Joselyn Zane",
    reviewRating: {
      avarage: 3,
      name: "iJ3dkS"
    },
    postedTime: "10 minutes ago",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed."
  }
];

const maxItemToShow = 7;

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsToShow: maxItemToShow,
      expanded: false
    };

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    this.state.itemsToShow === maxItemToShow
      ? this.setState({ itemsToShow: reviews.length, expanded: true })
      : this.setState({ itemsToShow: maxItemToShow, expanded: false });
  }

  renderReviewItem(data) {
    return (
      <li className={styles.item} key={data.id}>
        <div className={styles.itemLeft}>
          <div className={styles.itemAvatar}>
            <img
              className={styles.itemAvatarImg}
              src={data.avatarUrl}
              alt="Avatar"
            />
          </div>
          <img src={QuoteIcon} className={styles.itemIcon} />
        </div>
        <div className={styles.itemRight}>
          <div className={styles.itemUsername}>
            <p className={styles.itemName}>{data.username}</p>
            <ProjectRating
              avarage={data.reviewRating.avarage}
              name={data.reviewRating.name}
              iconClassName={styles.itemRatingIcon}
            />
          </div>
          <p className={styles.itemTime}>{data.postedTime}</p>
          <p className={styles.itemText}>{data.text}</p>
          <div className={styles.itemDivider} />
        </div>
      </li>
    );
  }

  render() {
    const { itemsToShow, expanded } = this.state;
    const remainder =
      reviews.length - maxItemToShow > 0
        ? reviews.length - maxItemToShow
        : null;

    return (
      <div className={styles.reviews}>
        <div className={styles.header}>
          <div className={styles.left}>
            <p className={styles.title}>Reviews</p>

            <div className={styles.rating}>
              <p className={styles.ratingTitle}>Avarage rating</p>

              <ProjectRating
                avarage={4.5}
                total={8574}
                name="iJ3dkS"
                showAvarage={true}
                showReviewsCaption={true}
                iconClassName={styles.ratingIcon}
                totalClassName={styles.ratingTotal}
                avarageClassName={styles.ratingAvarage}
              />
            </div>
          </div>

          <div className={styles.right}>
            <button className={styles.button}>Leave a Review</button>
          </div>
        </div>

        <ul className={styles.reviewsList}>
          {reviews
            .slice(0, itemsToShow)
            .map((item, index) => this.renderReviewItem(item))}
        </ul>

        {remainder && (
          <div className={styles.showMore}>
            <button className={styles.button} onClick={this.showMore}>
              {expanded ? "Show less" : `Show ${remainder} more`}
            </button>
          </div>
        )}
      </div>
    );
  }
}

Reviews.propTypes = propTypes;
Reviews.defaultProps = defaultProps;

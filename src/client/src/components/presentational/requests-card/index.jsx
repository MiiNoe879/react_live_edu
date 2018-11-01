import styles from "./requests-card.scss";
import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  USER_ROLE_SUBSCRIBER,
  IS_USER_CREATOR_LEGACY
} from "store/app/constants";
import TopicIcon from "components/common/topic-icon";

const propTypes = {};

const defaultProps = {};

export default function RequestsCard(props) {
  const isUserCreator =
    props.user && IS_USER_CREATOR_LEGACY(props.user.user_role);

  return (
    <div className={styles.card}>
      {getVoteButton(
        props.id,
        props.voted,
        props.votes,
        props.user,
        props.subscriberAction
      )}

      <div className={styles.content}>
        <p className={styles.title}>
          {props.title}
          {isUserCreator && (
            <button
              className={styles.createButton}
              onClick={() =>
                handleClick(
                  props.url,
                  props.creatorAction,
                  props.redirectAction
                )
              }
            >
              Create this project
            </button>
          )}
        </p>
        <p className={styles.text}>{props.desc}</p>
        <div className={styles.details}>
          <div className={styles.left}>
            <p className={`${styles.language} ${styles.detailsItem}`}>
              {props.language}
            </p>
            <p className={`${styles.topic} ${styles.detailsItem}`}>
              <TopicIcon
                small={true}
                topic={props.topic.slug}
                title={props.topic.name}
              />
            </p>
            <p className={`${styles.category} ${styles.detailsItem}`}>
              <img
                src={props.category.logo}
                alt={props.category.name}
                title={props.category.name}
              />
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.user}>
              Requested by <span className={styles.userName}>
                {props.username}
              </span>
            </p>
            <p className={styles.date}>{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getVoteButton(id, voted, votes, user, subscriberAction) {
  const isUserAuthenticated = user ? true : false;
  const isUserSubscriber = user && user.user_role === USER_ROLE_SUBSCRIBER;
  const canVote = isUserAuthenticated && isUserSubscriber;

  return canVote ? (
    <div className={`${styles.votes} ${canVote && styles.canVote}`}>
      {votes}
      <button
        className={styles.votesButton}
        onClick={() => subscriberAction(id, !voted)}
        disabled={voted}
      >
        <FontAwesomeIcon
          icon="thumbs-up"
          icon={voted ? "thumbs-up" : ["far", "thumbs-up"]}
          className={styles.icon}
        />
      </button>
    </div>
  ) : (
    <div className={styles.votes}>
      {votes} <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
    </div>
  );
}

function handleClick(url, creatorAction, redirect) {
  creatorAction(url);
  redirect("/projects/create");
}

RequestsCard.propTypes = propTypes;
RequestsCard.defaultProps = defaultProps;

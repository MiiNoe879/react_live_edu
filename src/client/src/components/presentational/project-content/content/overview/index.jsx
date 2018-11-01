import styles from "./overview.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default function Overview(props) {
  return (
    <div className={styles.overview}>
      <p className={styles.title}>Overview</p>
      <div className={styles.content}>
        <h3 className={styles.contentTitle}>Introduction</h3>
        <p className={styles.contentText}>
          During this series we will cover the basics of creating an Isometric
          game using C++. As this series is meant to cover the design aspects of
          creating an Isometric game we will be using a premade graphics engine.
          The series will be split into multiple segments, at the end of each
          segment you, if you have followed along during the tutorial, then at
          the end of each segment you will have a runnable program. There will
          be uploaded versions of my compiled executable if you just want to see
          what it looks like on your own machine.
        </p>

        <h3 className={styles.contentTitle}>What are the requirements?</h3>
        <ul className={styles.contentList}>
          <li>Basic understanding of C++</li>
          <li>Very basic understanding of mathematics</li>
          <li>
            Windows development machine (Linux/Mac will not be covered in this
            tutorial)
          </li>
          <li>Desire to learn</li>
          <li>What is the target audience?</li>
          <li>You want to build a game using an Isometric map</li>
          <li>You want to create a 2D game in C++</li>
          <li>Learners who want to enhance their knowledge</li>
          <li>When are the streaming sessions (streaming schedule)?</li>
        </ul>

        <p className={styles.contentText}>
          Isometric game we will be using a premade graphics engine. The series
          will be split into multiple segments, at the end of each segment you,
          if you have followed along during the tutorial, then at the end of
          each segment you will have a runnable program. There will be uploaded
          versions of my compiled executable if you just want to see what it
          looks like on your own machine. What are the requirements?  Isometric
          game we will be using a premade graphics engine. The series will be
          split into multiple segments, at the end of each segment you, if you
          have followed along during the tutorial, then at the end of each
          segment you will have a runnable program. There will be uploaded
          versions of my compiled executable if you just want to see what it
          looks like on your own machine.
        </p>
      </div>
    </div>
  );
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

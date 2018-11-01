import styles from "./curriculum.scss";
import React from "react";
import PropTypes from "prop-types";
import Accordion from "./accordion";

const propTypes = {};

const defaultProps = {};

const curriculumData = [
  {
    date: "Monday, April 15",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Friday, April 19",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Monday, April 24",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Friday, April 28",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Monday, May 2",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Friday, May 6",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Monday, May 10",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Friday, May 14",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Monday, May 20",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using.",
    goToLink:
      "/elliottminns/l5DN4-how-to-create-a-cryptocurrency-trading-bot-in-nodejs/"
  },
  {
    date: "Friday, May 24",
    title: "Introduction to “Building a Video Game on Unity Engine”",
    content:
      "During this series we will cover the basics of creating an Isometric game using C++. As this series is meant to cover the design aspects of creating an Isometric game we will be using."
  }
];

export default function Curriculum(props) {
  return (
    <div className={styles.curriculum}>
      <p className={styles.title}>Curriculum</p>
      <div className={styles.content}>
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

      <Accordion panels={curriculumData} />
    </div>
  );
}

Curriculum.propTypes = propTypes;
Curriculum.defaultProps = defaultProps;

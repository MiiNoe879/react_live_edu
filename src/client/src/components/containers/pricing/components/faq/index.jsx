import styles from "./faq.scss";
import React from "react";
import PropTypes from "prop-types";
import Accordion from "./accordion";

const propTypes = {};

const defaultProps = {};

const faqList = [
  {
    title: "Do I need a paid subscription to create projects?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title: "Can I watch live streams and videos with a free account?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title: "What does a subscription give me?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title: "What is LEDU? Why do I need it?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title: "Do I need to buy more LEDU when I run out?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title:
      "How can I automatically renew my monthly plan with a cryptocurrency?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title:
      "Is it possible to withdraw LEDU from my student or subscription balance?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  },
  {
    title: "Can I pay the subscription with my student balance?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate officia iste incidunt officiis, eum fuga similique aliquid molestias sit, consectetur pariatur excepturi maxime adipisci error."
  }
];

export default function Faq(props) {
  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h2 className={styles.title}>FAQ</h2>
        <Accordion panels={faqList} />
      </div>
    </section>
  );
}

Faq.propTypes = propTypes;
Faq.defaultProps = defaultProps;

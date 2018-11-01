import React from "react";
import PropTypes from "prop-types";
import IconProgramming from "../../../assets/img/categories/general-programming.svg";
import IconDesign from "../../../assets/img/categories/general-design.svg";
import IconDataScience from "../../../assets/img/categories/general-data-science.svg";
import IconAI from "../../../assets/img/categories/general-ai.svg";
import IconArVr from "../../../assets/img/categories/general-ar-vr.svg";
import IconCybersecurity from "../../../assets/img/categories/general-cybersecurity.svg";
import IconCryptocurrency from "../../../assets/img/categories/general-cryptocurrency.svg";
import IconGameDevelopment from "../../../assets/img/categories/general-game-development.svg";
import IconProgrammingSm from "../../../assets/img/categories/general-sm-programming.svg";
import IconDesignSm from "../../../assets/img/categories/general-sm-design.svg";
import IconDataScienceSm from "../../../assets/img/categories/general-sm-data-science.svg";
import IconAISm from "../../../assets/img/categories/general-sm-ai.svg";
import IconArVrSm from "../../../assets/img/categories/general-sm-ar-vr.svg";
import IconCybersecuritySm from "../../../assets/img/categories/general-sm-cybersecurity.svg";
import IconCryptocurrencySm from "../../../assets/img/categories/general-sm-cryptocurrency.svg";
import IconGameDevelopmentSm from "../../../assets/img/categories/general-sm-game-development.svg";

const propTypes = {};

const defaultProps = {};

const icons = [
  {
    id: "programming",
    node: <img src={IconProgramming} key="programming" />,
    nodeSm: <img src={IconProgrammingSm} key="programming" />
  },
  {
    id: "design",
    node: <img src={IconDesign} key="design" />,
    nodeSm: <img src={IconDesignSm} key="design" />
  },
  {
    id: "data-science",
    node: <img src={IconDataScience} key="data-science" />,
    nodeSm: <img src={IconDataScienceSm} key="data-science" />
  },
  {
    id: "artificial-intelligence",
    node: <img src={IconAI} key="artificial-intelligence" />,
    nodeSm: <img src={IconAISm} key="artificial-intelligence" />
  },
  {
    id: "vr-and-ar",
    node: <img src={IconArVr} key="vr-and-ar" />,
    nodeSm: <img src={IconArVrSm} key="vr-and-ar" />
  },
  {
    id: "cybersecurity",
    node: <img src={IconCybersecurity} key="cybersecurity" />,
    nodeSm: <img src={IconCybersecuritySm} key="cybersecurity" />
  },
  {
    id: "cryptocurrency",
    node: <img src={IconCryptocurrency} key="cryptocurrency" />,
    nodeSm: <img src={IconCryptocurrencySm} key="cryptocurrency" />
  },
  {
    id: "game-development",
    node: <img src={IconGameDevelopment} key="game-development" />,
    nodeSm: <img src={IconGameDevelopmentSm} key="game-development" />
  }
];

const getIcon = function(topic, small) {
  return icons.map(icon => {
    if (icon.id === topic) {
      return small ? icon.nodeSm : icon.node;
    }
  });
};

export default function TopicIcon(props) {
  return (
    <span
      className={props.className}
      title={props.title}
      style={{ fontSize: 0 }}
    >
      {getIcon(props.topic, props.small)}
    </span>
  );
}

TopicIcon.propTypes = propTypes;
TopicIcon.defaultProps = defaultProps;

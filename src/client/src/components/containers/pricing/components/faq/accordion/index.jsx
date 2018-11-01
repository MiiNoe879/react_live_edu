import styles from "./accordion.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ArrowRightIcon from "../../../../../../assets/img/icons/arrow-right.svg";
import VideoIcon from "../../../../../../assets/img/icons/video-screen.svg";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this);
      const height = el.querySelector(".panel__inner").scrollHeight;
      this.setState({
        height
      });
    }, 330);
  }

  render() {
    const {
      title,
      content,
      goToLink,
      activeTab,
      index,
      activateTab
    } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: isActive ? `${height}px` : "0px"
    };
    const maxCount = 7;

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          <img src={ArrowRightIcon} className="panel__icon" />
          {title}
        </button>
        <div
          className="panel__inner"
          style={innerStyle}
          aria-hidden={!isActive}
        >
          <div className="panel__content">
            {goToLink && (
              <Link to={goToLink} className="panel__link">
                <img src={VideoIcon} className="panel__link__icon" />
                Go to Video
              </Link>
            )}
            <p className="panel__text">{content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: -1
    };

    this.activateTab = this.activateTab.bind(this);
  }

  activateTab(index) {
    this.setState(prev => ({
      activeTab: prev.activeTab === index ? -1 : index
    }));
  }

  render() {
    const { panels } = this.props;
    const { activeTab } = this.state;

    return (
      <React.Fragment>
        <div className="global-faq-accordion" role="tablist">
          {panels.map((panel, index) => (
            <Panel
              key={index}
              activeTab={activeTab}
              index={index}
              {...panel}
              activateTab={this.activateTab.bind(null, index)}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

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
      date,
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
          <span className="panel__date">{date}</span>
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

const maxItemToShow = 7;

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      itemsToShow: maxItemToShow,
      expanded: false
    };

    this.activateTab = this.activateTab.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  activateTab(index) {
    this.setState(prev => ({
      activeTab: prev.activeTab === index ? -1 : index
    }));
  }

  showMore() {
    this.state.itemsToShow === maxItemToShow
      ? this.setState({ itemsToShow: this.props.panels.length, expanded: true })
      : this.setState({ itemsToShow: maxItemToShow, expanded: false });
  }

  render() {
    const { panels } = this.props;
    const { activeTab, itemsToShow, expanded } = this.state;
    const remainder =
      panels.length - maxItemToShow > 0 ? panels.length - maxItemToShow : null;
    return (
      <React.Fragment>
        <div className="global-accordion" role="tablist">
          {panels
            .slice(0, itemsToShow)
            .map((panel, index) => (
              <Panel
                key={index}
                activeTab={activeTab}
                index={index}
                {...panel}
                activateTab={this.activateTab.bind(null, index)}
              />
            ))}
        </div>

        {remainder && (
          <div className="global-accordion show-more">
            <button className="button" onClick={this.showMore}>
              {expanded ? "Show less" : `Show ${remainder} more`}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

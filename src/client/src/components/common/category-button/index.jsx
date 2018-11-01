import styles from "./category-button.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TopicIcon from "components/common/topic-icon";

const propTypes = {};

const defaultProps = {};

export default class CategoryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(topic) {
    this.props.handleClick(this.props.topic, !this.state.active);
    this.setState({ active: !this.state.active });
  }

  render() {
    const { topic } = this.props;
    const buttonClassNames = classNames({
      [styles.button]: true,
      [styles.active]: this.state.active
    });

    return (
      <button className={buttonClassNames} onClick={this.handleClick}>
        <TopicIcon topic={topic.slug} />
        {topic.name}
      </button>
    );
  }
}

CategoryButton.propTypes = propTypes;
CategoryButton.defaultProps = defaultProps;

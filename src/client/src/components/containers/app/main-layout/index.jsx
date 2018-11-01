import styles from "./main-layout.scss";
import React from "react";
import PropTypes from "prop-types";
import Header from "components/common/site-header";
import Navigation from "components/common/site-navigation";
import Footer from "components/common/site-footer";

const propTypes = {
  title: PropTypes.string
};

const defaultProps = {};

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header title={this.props.title} isLive={this.props.isLive} />
        <Navigation />

        <main className={styles.app}>{this.props.children}</main>

        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

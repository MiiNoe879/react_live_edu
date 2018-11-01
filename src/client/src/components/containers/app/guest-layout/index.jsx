import styles from "./guest-layout.scss";
import React from "react";
import PropTypes from "prop-types";
import GuestHeader from "components/common/site-header/guest-header";
import Footer from "components/common/site-footer";

const propTypes = {};

const defaultProps = {};

export default function GuestLayout(props) {
  return (
    <div className={styles.wrapper}>
      <GuestHeader />
      <main className={styles.app}>{props.children}</main>
      <Footer />
    </div>
  );
}

GuestLayout.propTypes = propTypes;
GuestLayout.defaultProps = defaultProps;

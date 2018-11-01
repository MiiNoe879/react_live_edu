import styles from "components/containers/hub/hub.scss";
import React from "react";
import PropTypes from "prop-types";
import GuestLayout from "components/containers/app/guest-layout";

const propTypes = {};

const defaultProps = {};

export default class Hub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GuestLayout>
        <div className={styles.hub}>
          <h1>Hub page</h1>
        </div>
      </GuestLayout>
    );
  }
}

Hub.propTypes = propTypes;
Hub.defaultProps = defaultProps;

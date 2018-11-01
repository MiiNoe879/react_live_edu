import styles from "./annual-switcher.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Switch from "react-ios-switch";

const propTypes = {};

const defaultProps = {};

export default class AnnualSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    const { checked } = this.state;
    const monthlyTitleClassNames = classNames({
      [styles.title]: true,
      [styles.active]: !checked
    });
    const annualyTitleClassNames = classNames({
      [styles.title]: true,
      [styles.active]: checked
    });

    return (
      <div className={styles.annualSwitcher}>
        <p className={monthlyTitleClassNames}>Monthly subscription</p>
        <Switch
          checked={checked}
          className={styles.switcher}
          onChange={checked => this.setState({ checked })}
          onColor="#2574a9"
          style={{
            width: "44px",
            height: "24px"
          }}
        />
        <p className={annualyTitleClassNames}>
          Annual subscription <span className={styles.badge}>Save 12%</span>
        </p>
      </div>
    );
  }
}

AnnualSwitcher.propTypes = propTypes;
AnnualSwitcher.defaultProps = defaultProps;

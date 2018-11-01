import styles from "./signup.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { LOGIN_SUCCESS_URL } from "store/auth/constants";
import GuestLayout from "components/containers/app/guest-layout";
import SignupStep0 from "components/containers/signup/step-0";
import SignupStep1 from "components/containers/signup/step-1";
import SignupStep2 from "components/containers/signup/step-2";
import SignupStep3 from "components/containers/signup/step-3";
import SignupStep4 from "components/containers/signup/step-4";
import SignupStepError from "components/containers/signup/step-error";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  user: state.auth.get("user")
}))
export default class Signup extends React.Component {
  render() {
    const { user, match } = this.props;

    if (user) {
      return <Redirect to={LOGIN_SUCCESS_URL} />;
    }

    return (
      <GuestLayout>
        <div className={styles.signup}>
          <div className={styles.container}>
            <Switch>
              <Route exact path={match.url} component={SignupStep0} />
              <Route path={`${match.url}/step-1`} component={SignupStep1} />
              <Route path={`${match.url}/step-2`} component={SignupStep2} />
              <Route path={`${match.url}/step-3`} component={SignupStep3} />
              <Route path={`${match.url}/step-4`} component={SignupStep4} />
              <Route
                path={`${match.url}/step-error`}
                component={SignupStepError}
              />
              <Route
                path={match.url}
                component={() => <Redirect to="/signup" />}
              />
            </Switch>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

Signup.propTypes = propTypes;
Signup.defaultProps = defaultProps;

import styles from "./home.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { SIGNUP_SOCIAL_ERRORS } from "store/auth/constants";
import {
  clearSignupSteps,
  clearSignupFormError,
  clearConfirmEmail
} from "store/auth/actions";
import GuestLayout from "components/containers/app/guest-layout";
import Slider from "./components/slider";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    email: state.auth.getIn(["signupStep0", "email"]),
    password: state.auth.getIn(["signupStep0", "password"]),
    passwordConfirm: state.auth.getIn(["signupStep0", "passwordConfirm"]),
    signupSocialError: state.auth.getIn(["signupSocial", "error"])
  }),
  dispatch => ({
    clearSignupStepsAction: () => dispatch(clearSignupSteps()),
    clearSignupFormErrorAction: () => dispatch(clearSignupFormError()),
    clearConfirmEmailAction: () => dispatch(clearConfirmEmail())
  })
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClearActionsDispatched: false
    };
  }

  componentDidMount() {
    this.props.clearSignupStepsAction();
    this.props.clearSignupFormErrorAction();
    this.props.clearConfirmEmailAction();

    // TODO: Fix this dirty hack.
    // Placed here to prevent redirect to /signup/step-1 if render() happens before clear actions were dispatched.
    this.setState({ isClearActionsDispatched: true });
  }

  render() {
    const { isClearActionsDispatched } = this.state;
    const { email, password, passwordConfirm, signupSocialError } = this.props;

    if (email && password && passwordConfirm && isClearActionsDispatched) {
      return <Redirect to="/signup/step-1" />;
    }

    if (
      signupSocialError ===
      SIGNUP_SOCIAL_ERRORS.SOCIAL_ACCOUNT_IS_NOT_CONNECTED.type
    ) {
      return <Redirect to={"/signup/step-1"} />;
    }

    return (
      <GuestLayout>
        <div className={styles.home}>
          <Slider />
        </div>
      </GuestLayout>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

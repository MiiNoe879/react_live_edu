import styles from "./step-3.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE_SUBSCRIBER, USER_ROLE_CREATOR } from "store/app/constants";
import { SIGNUP_STEP_ERROR_URL } from "store/auth/constants";
import { fetchTopics } from "store/app/actions";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import SignupContactForm from "components/presentational/auth-flow/signup-contact-form";
import SignupWantToLearnForm from "components/presentational/auth-flow/signup-want-to-learn-form";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    role: state.auth.getIn(["signupStep2", "role"]),
    topics: state.app.get("topics"),
    confirmEmail: state.auth.getIn(["confirmEmail", "email"]),
    signupFormError: state.auth.getIn(["signupForm", "error"])
  }),
  dispatch => ({
    fetchTopicsAction: () => dispatch(fetchTopics())
  })
)
export default class SignupStep3 extends React.Component {
  componentDidMount() {
    if (!this.props.topics) {
      this.props.fetchTopicsAction();
    }
  }

  getLoginSignupHeader() {
    if (this.props.role === USER_ROLE_CREATOR) {
      return (
        <LoginSingupHeader
          title="Add contact information"
          text="We will reach out to you in order to assist in creating projects or when you will be chosen for a custom project request accomplishment."
        />
      );
    } else if (this.props.role === USER_ROLE_SUBSCRIBER) {
      const maxWantToLearn = this.props.topics && this.props.topics.length;
      return (
        <LoginSingupHeader
          title="What do you want to learn?"
          text={`Maximum ${maxWantToLearn} items`}
        />
      );
    } else {
      return null;
    }
  }

  getSignupStep3Form() {
    if (this.props.role === USER_ROLE_CREATOR) {
      return <SignupContactForm />;
    } else if (this.props.role === USER_ROLE_SUBSCRIBER) {
      return <SignupWantToLearnForm topics={this.props.topics} />;
    } else {
      return null;
    }
  }

  render() {
    const { role, confirmEmail, signupFormError } = this.props;

    if (!role && !confirmEmail) {
      return <Redirect to={SIGNUP_STEP_ERROR_URL} />;
    }

    if (confirmEmail) {
      return <Redirect to="/signup/step-4" />;
    }

    if (signupFormError) {
      return <Redirect to="/signup/step-error" />;
    }

    return (
      <React.Fragment>
        {this.getLoginSignupHeader()}
        {this.getSignupStep3Form()}
      </React.Fragment>
    );
  }
}

SignupStep3.propTypes = propTypes;
SignupStep3.defaultProps = defaultProps;

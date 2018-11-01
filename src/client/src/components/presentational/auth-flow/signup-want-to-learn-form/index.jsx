import styles from "./signup-want-to-learn-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import { connect } from "react-redux";
import {
  signUpStepSetWantLearn,
  setSignupStep3Error,
  clearSignupStep3Error,
  signUp,
  signUpSocial
} from "store/auth/actions";
import CategoryButton from "components/common/category-button";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["signupStep3", "error"]),
    socialSignupToken: state.auth.getIn(["signupSocial", "access_token"])
  }),
  dispatch => ({
    setWantLearn: topics => dispatch(signUpStepSetWantLearn(topics)),
    clearErrorAction: () => dispatch(clearSignupStep3Error()),
    setErrorAction: error => dispatch(setSignupStep3Error(error)),
    signUpAction: () => dispatch(signUp()),
    signUpSocialAction: () => dispatch(signUpSocial())
  })
)
export default class SignupWantToLearnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTopics: List([])
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTopic = this.renderTopic.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    const { selectedTopics } = this.state;
    const {
      setWantLearn,
      clearErrorAction,
      setErrorAction,
      signUpAction,
      socialSignupToken,
      signUpSocialAction
    } = this.props;

    event.preventDefault();

    if (selectedTopics.isEmpty()) {
      setErrorAction(["Choosing at least one category is required"]);
    } else {
      clearErrorAction();
      setWantLearn(this.state.selectedTopics);

      if (socialSignupToken) {
        signUpSocialAction();
      } else {
        signUpAction();
      }
    }
  }

  handleClick(topic, active) {
    let selectedTopics = List([]);

    if (active) {
      selectedTopics = this.state.selectedTopics.push(topic.slug);
    } else {
      selectedTopics = this.state.selectedTopics.filter(
        item => item !== topic.slug
      );
    }

    this.setState({ selectedTopics: selectedTopics });
  }

  renderTopic(topic) {
    return (
      <li className={styles.item} key={topic.slug}>
        <CategoryButton topic={topic} handleClick={this.handleClick} />
      </li>
    );
  }

  render() {
    const { error, topics, clearErrorAction } = this.props;

    return (
      <div className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <ul className={styles.categoriesList}>
          {topics && topics.map(topic => this.renderTopic(topic))}
        </ul>

        <button className={styles.formButton} onClick={this.handleSubmit}>
          Next
        </button>
      </div>
    );
  }
}

SignupWantToLearnForm.propTypes = propTypes;
SignupWantToLearnForm.defaultProps = defaultProps;

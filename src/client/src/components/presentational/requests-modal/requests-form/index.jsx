import styles from "./requests-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { fetchTopicsHierarchy } from "store/app/actions";
import {
  MAX_LENGTH_LIMIT,
  MAX_TEXTAREA_LENGTH_LIMIT
} from "store/app/constants";
import {
  DIFFICULTY_FILTER_OPTIONS,
  LANGUAGE_FILTER_OPTIONS
} from "store/app/constants";
import { add } from "store/project-requests/actions";

const propTypes = {};

const defaultProps = {};

const customStyles = {
  control: base => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #f3f3f3",
    height: "32px",
    minHeight: "32px",
    borderRadius: "2px"
  })
};

@connect(
  (state, props) => ({
    topicsHierarchy: state.app.get("topicsHierarchy")
  }),
  dispatch => ({
    addProjectRequestAction: payload => dispatch(add(payload)),
    fetchTopicsHierarchyAction: () => dispatch(fetchTopicsHierarchy())
  })
)
export default class RequestsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      topic: null,
      category: null,
      difficulty: null,
      language: null,
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
  }

  componentDidMount() {
    if (!this.props.topicsHierarchy) {
      this.props.fetchTopicsHierarchyAction();
    }
  }

  handleSubmit(event) {
    const { addProjectRequestAction } = this.props;
    const { title, category, difficulty, language, description } = this.state;

    if (title.length && description.length) {
      event.preventDefault();
      if (category && difficulty && language) {
        const payload = {
          title: title,
          category: category.url,
          difficulty: difficulty.value,
          language: language.value,
          description: description
        };
        addProjectRequestAction(payload);
        this.clearFormData();
      }
    }
  }

  clearFormData() {
    this.setState({
      title: "",
      topic: null,
      category: null,
      difficulty: null,
      language: null,
      description: ""
    });
  }

  render() {
    const { topicsHierarchy } = this.props;

    const optionsTopic = topicsHierarchy
      ? topicsHierarchy.map(topic => {
          return { value: topic.slug, label: topic.name };
        })
      : [];

    const optionsCategory = this.state.topic
      ? topicsHierarchy
          .filter(topic => topic.slug === this.state.topic.value)[0]
          .category_groups[0].categories.map(category => {
            return {
              value: category.slug,
              label: category.name,
              url: category.url
            };
          })
      : [];

    const optionsDifficulty = DIFFICULTY_FILTER_OPTIONS;

    const optionsLanguage = LANGUAGE_FILTER_OPTIONS;

    return (
      <form className={styles.form}>
        <input
          name="title"
          type="text"
          className={styles.formInput}
          required={true}
          placeholder="Enter project request name"
          maxLength={MAX_LENGTH_LIMIT}
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <Select
          options={optionsTopic}
          isDisabled={!topicsHierarchy}
          isRequired={true}
          isClearable={true}
          className={styles.select}
          placeholder="Choose a topic"
          styles={customStyles}
          value={this.state.topic}
          onChange={topic => this.setState({ topic: topic, category: null })}
        />
        <Select
          options={optionsCategory}
          isDisabled={!this.state.topic}
          isClearable={true}
          className={styles.select}
          placeholder="Choose a category"
          styles={customStyles}
          value={this.state.category}
          onChange={category => this.setState({ category: category })}
        />
        <Select
          options={optionsDifficulty}
          isClearable={true}
          className={styles.select}
          styles={customStyles}
          placeholder="Difficulty"
          value={this.state.difficulty}
          onChange={difficulty => this.setState({ difficulty: difficulty })}
        />
        <Select
          options={optionsLanguage}
          isClearable={true}
          className={styles.select}
          styles={customStyles}
          placeholder="Language"
          value={this.state.language}
          onChange={language => this.setState({ language: language })}
        />
        <textarea
          name="description"
          placeholder="Describe your idea"
          className={styles.formTextarea}
          required={true}
          value={this.state.description}
          onChange={event => this.setState({ description: event.target.value })}
          maxLength={MAX_TEXTAREA_LENGTH_LIMIT}
        />

        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit Request
        </button>
      </form>
    );
  }
}

RequestsForm.propTypes = propTypes;
RequestsForm.defaultProps = defaultProps;

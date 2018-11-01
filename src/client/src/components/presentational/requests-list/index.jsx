import styles from "./requests-list.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { vote } from "store/project-requests/actions";
import { createProject } from "store/project-create/actions";
import RequestsCard from "components/presentational/requests-card";
import { getFormatedDateFromTimestamp } from "utils/helpers";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({}),
  dispatch => ({
    voteAction: id => dispatch(vote(id)),
    createProjectAction: url => dispatch(createProject(url)),
    navigate: url => dispatch(push(url))
  })
)
export default class RequestsList extends React.Component {
  renderRequests() {
    return this.props.projects.map(project => {
      const date = getFormatedDateFromTimestamp(project.get("timestamp"));

      return (
        <li
          className={styles.item}
          key={project.get("id")}
          data-topic={project.get("topic").slug}
          data-category={project.get("category").slug}
        >
          <RequestsCard
            id={project.get("id")}
            url={project.get("url")}
            date={date}
            title={project.get("title")}
            desc={project.get("description")}
            username={project.get("user").username}
            topic={project.get("topic")}
            category={project.get("category")}
            language={project.get("language").name_en}
            voted={project.get("already_voted")}
            votes={project.get("votes")}
            user={this.props.user}
            subscriberAction={this.props.voteAction}
            creatorAction={this.props.createProjectAction}
            redirectAction={this.props.navigate}
          />
        </li>
      );
    });
  }

  render() {
    return <ul className={styles.list}>{this.renderRequests()}</ul>;
  }
}

RequestsList.propTypes = propTypes;
RequestsList.defaultProps = defaultProps;

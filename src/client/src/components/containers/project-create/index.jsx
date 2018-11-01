import styles from "./project-create.scss";
import React from "react";
import PropTypes from "prop-types";
import MainLayout from "components/containers/app/main-layout";

const propTypes = {};

const defaultProps = {};

export default class ProjectCreate extends React.Component {
  render() {
    return (
      <MainLayout title="Create Project">
        Hello from project create page
      </MainLayout>
    );
  }
}

ProjectCreate.propTypes = propTypes;
ProjectCreate.defaultProps = defaultProps;

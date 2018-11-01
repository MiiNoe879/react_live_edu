import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "components/containers/home";
import Login from "components/containers/login";
import Signup from "components/containers/signup";
import LiveDirectory from "components/containers/live-directory";
import ProjectDirectory from "components/containers/project-directory";
import GuidesDirectory from "components/containers/guides-directory";
import NonEducationalDirectory from "components/containers/non-educational-directory";
import Schedule from "components/containers/schedule";
import ProjectRequests from "components/containers/project-requests";
import ProjectCreate from "components/containers/project-create";
import Project from "components/containers/project";
import Pricing from "components/containers/pricing";
import Hub from "components/containers/hub";
import ConfirmEmail from "components/containers/confirm-email";
import PasswordReset from "components/containers/password-reset";
import PasswordResetConfirm from "components/containers/password-reset/password-reset-confirm";
import NotFound from "components/containers/not-found";

const propTypes = {};

const defaultProps = {};

export default function App(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/hub" component={Hub} />

        <Route path="/projects/create" component={ProjectCreate} />

        <Route
          path="/live/:topic?/:category?/:page?"
          component={LiveDirectory}
        />
        <Route
          path="/projects/:topic?/:category?/:page?"
          component={ProjectDirectory}
        />
        <Route
          path="/schedule/:topic?/:category?/:page?"
          component={Schedule}
        />
        <Route
          path="/requests/:topic?/:category?/:page?"
          component={ProjectRequests}
        />
        <Route
          path="/non-educational/:topic?/:category?/:page?"
          component={NonEducationalDirectory}
        />

        <Route path="/guides/:topic?" component={GuidesDirectory} />

        <Route
          exact
          path="/account-confirm-email/:key/"
          component={ConfirmEmail}
        />
        <Route
          exact
          path="/accounts/password/reset/key/:uid/:token/"
          component={PasswordResetConfirm}
        />

        <Route exact path="/:user/:project" component={Project} />

        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

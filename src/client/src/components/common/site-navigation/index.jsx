import styles from "./site-navigation.scss";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavigationLink from "components/common/site-navigation/nav-link";
import NavigationDropdown from "components/common/site-navigation/nav-dropdown";
import Logo from "../../../assets/img/icons/live-edu-glyph-v01.svg";
import Live from "../../../assets/img/icons/main-nav-live-animated.svg";
import Projects from "../../../assets/img/icons/main-nav-projects.svg";
import Guides from "../../../assets/img/icons/main-nav-guides.svg";
import Schedule from "../../../assets/img/icons/main-nav-schedule.svg";
import Requests from "../../../assets/img/icons/main-nav-requests.svg";
import Subscribe from "../../../assets/img/icons/main-nav-subscribe.svg";

@connect((state, props) => ({
  user: state.auth.get("user")
}))
export default class Navigation extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <nav className={styles.navigation}>
        <Link to={user ? "/hub" : "/"} className={styles.logo}>
          <img src={Logo} className={styles.logoSvg} />
        </Link>
        <ul className={`${styles.links} ${styles.linksTop}`}>
          <li>
            <NavigationLink
              to="/live"
              title="Live Now!"
              icon={<img src={Live} />}
              modClassName="live"
            />
          </li>
          <li>
            <NavigationLink
              to="/projects"
              title="Projects"
              icon={<img src={Projects} />}
            />
          </li>
          <li>
            <NavigationLink to="/guides" title="Guides" icon={<img src={Guides} />} />
          </li>
          <li>
            <NavigationLink
              to="/schedule"
              title="Schedule"
              icon={<img src={Schedule} />}
            />
          </li>
          <li>
            <NavigationLink
              to="/requests"
              title="Requests"
              icon={<img src={Requests} />}
            />
          </li>
        </ul>

        <ul className={`${styles.links} ${styles.linksBottom}`}>
          <li>
            <NavigationLink
              to="/pricing"
              title="Subscribe"
              icon={<img src={Subscribe} />}
              modClassName="subscribe"
            />
          </li>
          <li>
            <NavigationDropdown />
          </li>
        </ul>
      </nav>
    );
  }
}

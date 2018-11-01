import styles from "./site-footer.scss";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTopics } from "store/app/actions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Logo from "../../../assets/img/icons/live-edu-glyph-v01.svg";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    topics: state.app.get("topics")
  }),
  dispatch => ({
    fetchTopicsAction: () => dispatch(fetchTopics())
  })
)
export default class Footer extends React.Component {
  componentDidMount() {
    if (!this.props.topics) {
      this.props.fetchTopicsAction();
    }
  }

  renderNavLinks() {
    return (
      <React.Fragment>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            About Us
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Blog
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Press
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Support
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Terms &amp; Privacy
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Partnership
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/non-educational" className={styles.link}>
            Non-educational projects
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Contact Us
          </Link>
        </li>
      </React.Fragment>
    );
  }

  renderTopic(topic) {
    return (
      <li className={styles.item} key={topic.slug}>
        <Link to={`/projects/${topic.slug}`} className={styles.link}>
          #{topic.name}
        </Link>
      </li>
    );
  }

  renderLanguageSwitcher() {
    return (
      <React.Fragment>
        <button className={styles.dropdownButton}>
          <FontAwesomeIcon icon="globe" className={styles.icon} />
          English
        </button>
      </React.Fragment>
    );
  }

  renderLegalInfo() {
    return (
      <React.Fragment>
        <img src={Logo} className={styles.logo} />
        <div className={styles.legal}>© 2018 LiveEdu Inc.</div>
      </React.Fragment>
    );
  }

  renderSocialIcons() {
    return (
      <React.Fragment>
        <li className={styles.item}>
          <a
            href="https://www.facebook.com/liveedutvlive/"
            target="_blank"
            className={styles.link}
          >
            <FontAwesomeIcon
              icon={["fab", "facebook-f"]}
              className={styles.icon}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="https://twitter.com/liveedutv"
            target="_blank"
            className={styles.link}
          >
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className={styles.icon}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="https://www.linkedin.com/company/liveedu/"
            target="_blank"
            className={styles.link}
          >
            <FontAwesomeIcon
              icon={["fab", "linkedin-in"]}
              className={styles.icon}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="https://github.com/LiveCodingTVOfficial"
            target="_blank"
            className={styles.link}
          >
            <FontAwesomeIcon icon={["fab", "github"]} className={styles.icon} />
          </a>
        </li>
      </React.Fragment>
    );
  }

  render() {
    const { topics } = this.props;

    return (
      <React.Fragment>
        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.containerTop}`}>
            <div className={styles.top}>
              <ul className={styles.nav}>{this.renderNavLinks()}</ul>
            </div>

            <div className={styles.bottom}>
              <ul className={styles.categories}>
                <li className={`${styles.item} ${styles.itemTitle}`}>
                  Categories:
                </li>
                {topics && topics.map(topic => this.renderTopic(topic))}
              </ul>
              <ul className={styles.languageSwitcher}>
                {this.renderLanguageSwitcher()}
              </ul>
            </div>
          </div>

          <div className={`${styles.container}`}>
            <div className={styles.horizontalLine} />
          </div>

          <div className={`${styles.container} ${styles.containerBottom}`}>
            <div className={styles.top}>
              <div className={styles.info}>{this.renderLegalInfo()}</div>
              <ul className={styles.social}>{this.renderSocialIcons()}</ul>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

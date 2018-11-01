import styles from "./login-signup-social.scss";
import hello from "../../../../assets/vendors/hello.all.js";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { getSocialApps, socialAppsValidate } from "store/auth/actions";
import { getSocialAppsConfig } from "store/auth/selectors";
import {
  socialNetworkMapping,
  reverseSocialNetworkMapping
} from "utils/helpers.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import YahooIcon from "../../../../assets/img/icons/yahoo.svg";
import QqIcon from "../../../../assets/img/icons/qq.svg";
import IconMore from "../../../../assets/img/icons/main-nav-more.svg";

const propTypes = {};

const defaultProps = {};

const socialIcons = [
  {
    provider: "github",
    name: "GitHub",
    node: <FontAwesomeIcon icon={["fab", "github"]} />
  },
  {
    provider: "linkedin_oauth2",
    name: "LinkedIn",
    node: <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
  },
  {
    provider: "facebook",
    name: "Facebook",
    node: <FontAwesomeIcon icon={["fab", "facebook-f"]} />
  },
  {
    provider: "google",
    name: "Google +",
    node: <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
  },
  {
    provider: "twitter",
    name: "Twitter",
    node: <FontAwesomeIcon icon={["fab", "twitter"]} />
  },
  {
    provider: "twitch",
    name: "Twitch",
    node: <FontAwesomeIcon icon={["fab", "twitch"]} />
  },
  {
    provider: "vk",
    name: "VK",
    node: <FontAwesomeIcon icon={["fab", "vk"]} />
  },
  {
    provider: "windowslive",
    name: "Live",
    node: <FontAwesomeIcon icon={["fab", "windows"]} />
  },
  {
    provider: "yahoo",
    name: "Yahoo",
    node: <img src={YahooIcon} />
  },
  {
    provider: "qq",
    name: "QQ",
    node: <img src={QqIcon} />
  }
];

@connect(
  (state, props) => ({
    socialApps: state.auth.get("socialApps"),
    selectedSocialApps: getSocialAppsConfig(state)
  }),
  dispatch => ({
    getSocialAppsAction: () => dispatch(getSocialApps()),
    socialAppsValidateAction: (network, access_token) =>
      dispatch(socialAppsValidate(network, access_token))
  })
)
export default class LoginSignupSocial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.handleCollapseClick = this.handleCollapseClick.bind(this);
  }

  componentDidMount() {
    window.hello = hello;

    if (!this.props.socialApps) {
      this.props.getSocialAppsAction();
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedSocialApps } = this.props;

    if (this.props.socialApps !== prevProps.socialApps) {
      window.hello.init(selectedSocialApps, {
        redirect_uri: "/login",
        oauth_version: "2",
        oauth_proxy: "/oauth_proxy/proxy"
      });
    }
  }

  componentWillUnmount() {
    window.hello = undefined;
  }

  handleCollapseClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  handleClick(socialApp) {
    const { socialAppsValidateAction } = this.props;
    const provider = socialNetworkMapping(socialApp.provider);
    window
      .hello(provider)
      .login({ scope: "email" })
      .then(auth => {
        const network = socialNetworkMapping(auth.network);
        const access_token = auth.authResponse.access_token;
        socialAppsValidateAction(network, access_token);
      });
  }

  getSocialIcon(socialApp, compact) {
    return socialIcons.map(icon => {
      if (icon.provider === socialApp.provider) {
        return (
          <React.Fragment key={socialApp.id}>
            <div className={styles.linkIcon}>{icon.node}</div>
            {!compact && icon.name}
          </React.Fragment>
        );
      }
    });
  }

  getSocialButton(socialApp, compact) {
    const socialCssClassName = reverseSocialNetworkMapping(socialApp.provider);

    return (
      <button
        className={`${styles.link} ${styles[socialCssClassName]}`}
        onClick={() => this.handleClick(socialApp)}
        key={socialApp.id}
      >
        {this.getSocialIcon(socialApp, compact)}
      </button>
    );
  }

  render() {
    const { collapsed } = this.state;
    const { socialApps, compact } = this.props;
    const loginSignupSocialClassNames = classNames({
      [styles.loginSignupSocial]: true,
      [styles.compact]: compact
    });

    return (
      <div className={loginSignupSocialClassNames}>
        <div className={styles.links}>
          {socialApps &&
            socialApps.map((app, index) => {
              if (compact) {
                if (collapsed) {
                  if (index < 5) {
                    return this.getSocialButton(app, compact);
                  }
                } else {
                  return this.getSocialButton(app, compact);
                }
              } else {
                return this.getSocialButton(app, compact);
              }
            })}
        </div>
        {compact && (
          <button
            className={styles.moreButton}
            onClick={this.handleCollapseClick}
          >
            <img src={IconMore} className={styles.icon} />
          </button>
        )}
      </div>
    );
  }
}

LoginSignupSocial.propTypes = propTypes;
LoginSignupSocial.defaultProps = defaultProps;

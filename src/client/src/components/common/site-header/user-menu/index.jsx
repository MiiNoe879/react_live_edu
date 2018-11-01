import styles from "./user-menu.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { logOut } from "store/auth/actions";
import DefaultAvatar from "../../../../assets/img/default/avatar.png";
import SubscribeIcon from "../../../../assets/img/icons/main-nav-subscribe.svg";

const propTypes = {
  user: PropTypes.object.isRequired
};

const defaultProps = {};

@connect(
  (state, props) => ({}),
  dispatch => ({
    logOutAction: () => dispatch(logOut())
  })
)
export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };

    this.menu = React.createRef();
    this.userMenu = React.createRef();
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (
      !this.menu.current.isEqualNode(event.target) &&
      !this.userMenu.current.isEqualNode(event.target) &&
      !this.userMenu.current.contains(event.target)
    ) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  renderMenu(user) {
    const username = user.username;
    const userRole =
      user.user_role === "viewer"
        ? "Subscriber"
        : user.user_role === "streamer" || user.user_role === "both"
          ? "Project Creator"
          : null;
    const isUserViewer = user.user_role === "viewer";
    const isUserPro = user.plan !== "free";

    return (
      <ul className={styles.menu} ref={this.menu}>
        <li className={`${styles.item} ${styles.menuUser}`} ref={this.userMenu}>
          <div className={styles.left}>
            <img
              src={SubscribeIcon}
              className={`${styles.icon} ${isUserPro && styles.iconPro}`}
            />
          </div>
          <div className={styles.right}>
            <p className={styles.name}>{username}</p>
            {userRole && <p className={styles.role}>{userRole}</p>}
          </div>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            My Profile
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Settings
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Support
          </Link>
        </li>
        <li className={styles.item}>
          <button onClick={this.props.logOutAction} className={styles.link}>
            Log Out
          </button>
        </li>
      </ul>
    );
  }

  render() {
    const { showMenu } = this.state;
    const { user } = this.props;

    const buttonClassNames = classNames({
      [styles.button]: true,
      [styles.buttonActive]: showMenu
    });

    return (
      <div className={styles.dropdown}>
        <button className={buttonClassNames} onClick={this.showMenu}>
          <img
            className={styles.buttonAvatar}
            src={user.avatar || DefaultAvatar}
            width="42"
            height="42"
            alt="Avatar"
          />
        </button>

        {this.state.showMenu && this.renderMenu(user)}
      </div>
    );
  }
}

UserMenu.propTypes = propTypes;
UserMenu.defaultProps = defaultProps;

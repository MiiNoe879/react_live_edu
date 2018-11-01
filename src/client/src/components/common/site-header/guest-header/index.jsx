import styles from "./guest-header.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/img/icons/liveedu-logotype-wslogan-black.svg";
import GuestNavLinks from "components/common/site-header/guest-nav-links";
import SearchBar from "components/common/site-header/search-bar";
import AuthButtons from "components/common/site-header/auth-buttons";
import UserMenu from "components/common/site-header/user-menu";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  user: state.auth.get("user")
}))
export default class GuestHeader extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link to={user ? "/hub" : "/"} className={styles.logo}>
              <img src={Logo} className={styles.logoSvg} />
            </Link>
            <GuestNavLinks />
          </div>
          <div className={styles.right}>
            <SearchBar />
            {user ? <UserMenu user={user} /> : <AuthButtons />}
          </div>
        </div>
      </header>
    );
  }
}

GuestHeader.propTypes = propTypes;
GuestHeader.defaultProps = defaultProps;

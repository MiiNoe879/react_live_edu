import styles from "./site-header.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchBar from "components/common/site-header/search-bar";
import AuthButtons from "components/common/site-header/auth-buttons";
import UserMenu from "components/common/site-header/user-menu";

const propTypes = {
  title: PropTypes.string,
  isLive: PropTypes.bool
};

const defaultProps = {
  isLive: false
};

@connect((state, props) => ({
  user: state.auth.get("user")
}))
export default class Header extends React.Component {
  render() {
    const { title, user, isLive } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            {title && (
              <h2 className={styles.title}>
                {title}
                {isLive && <span className={styles.live} />}
              </h2>
            )}
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

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

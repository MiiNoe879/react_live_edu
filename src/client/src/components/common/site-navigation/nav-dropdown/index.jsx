import styles from "./nav-dropdown.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import IconMore from "../../../../assets/img/icons/main-nav-more.svg";

const propTypes = {};

const defaultProps = {};

export default class NavigationDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };

    this.menu = React.createRef();
    this.titleTop = React.createRef();
    this.titleBottom = React.createRef();
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
      !this.titleTop.current.isEqualNode(event.target) &&
      !this.titleBottom.current.isEqualNode(event.target)
    ) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  renderMenu() {
    return (
      <ul className={styles.menu} ref={this.menu}>
        <li className={`${styles.item} ${styles.title}`} ref={this.titleTop}>
          Company
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            How it Works
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Project creator guide
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Make money
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Tokens
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            API
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Pastebin
          </Link>
        </li>
        <li className={`${styles.item} ${styles.title}`} ref={this.titleBottom}>
          Product
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            About us
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
            Partnership
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" className={styles.link}>
            Contact us
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { showMenu } = this.state;
    const buttonClassNames = classNames({
      [styles.button]: true,
      [styles.buttonActive]: showMenu
    });

    return (
      <div className={styles.dropdown}>
        <button className={buttonClassNames} onClick={this.showMenu}>
          <div className={styles.icon}>
            <img src={IconMore} />
          </div>
          More
        </button>

        {this.state.showMenu && this.renderMenu()}
      </div>
    );
  }
}

NavigationDropdown.propTypes = propTypes;
NavigationDropdown.defaultProps = defaultProps;

import styles from "./requests-cta.scss";
import React from "react";
import PropTypes from "prop-types";
import { IS_USER_CREATOR_LEGACY } from "store/app/constants";
import RequestsModal from "components/presentational/requests-modal";

import Illustration from "../../../assets/img/icons/requests-request-project.svg";
import IllustrationBg from "../../../assets/img/icons/requests-request-project-bg.svg";
import Logo from "../../../assets/img/icons/liveedu-logotype-wslogan-black.svg";

const propTypes = {};

const defaultProps = {};

export default function RequestsCta(props) {
  const isUserProjectCreator =
    props.user && IS_USER_CREATOR_LEGACY(props.user.user_role);
  const title = isUserProjectCreator
    ? "Accomplish a project request."
    : "Make your own request";
  const text = isUserProjectCreator
    ? "Based on your expertise and audience requirements you can accomplish some of project requests that users make. This way you can be sure the audience is interested in your project and your reward will increase based on it’s relevance."
    : "If you can't find what you are looking for, you can always make a custom project request. Our project creators are working hard to bring to life each request you make.";

  return (
    <React.Fragment>
      <div className={styles.requestsCta}>
        <div className={styles.illustration}>
          <img src={IllustrationBg} className={`${styles.img} ${styles.imgBg}`} />
          <img src={Illustration} className={styles.img} />
        </div>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
        {!isUserProjectCreator && <RequestsModal />}
      </div>

      <div className={styles.requestsLogo}>
        <img src={Logo} className={styles.logo} />
      </div>
    </React.Fragment>
  );
}

RequestsCta.propTypes = propTypes;
RequestsCta.defaultProps = defaultProps;

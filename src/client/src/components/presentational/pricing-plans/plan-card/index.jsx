import styles from "./plan-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import IconCheck from "../../../../assets/img/icons/icon-check-grey.svg";

const propTypes = {
  details: PropTypes.shape({
    type: PropTypes.string,
    featured: PropTypes.bool,
    title: PropTypes.string,
    price: PropTypes.shape({
      ledu: PropTypes.number,
      usd: PropTypes.number
    }),
    benefits: PropTypes.shape({
      title: PropTypes.string,
      leduBonus: PropTypes.number,
      list: PropTypes.arrayOf(PropTypes.string)
    }),
    ctaUrl: PropTypes.string,
    ctaTitle: PropTypes.string
  }),
  icon: PropTypes.node
};

const defaultProps = {};

const planTypes = {
  free: "free",
  single: "single",
  triple: "triple",
  unlim: "unlim"
};

export default function PlanCard(props) {
  const cardClassNames = classNames({
    [styles.card]: true,
    [styles.free]: props.details.type === planTypes.free,
    [styles.single]: props.details.type === planTypes.single,
    [styles.triple]: props.details.type === planTypes.triple,
    [styles.unlim]: props.details.type === planTypes.unlim
  });

  return (
    <div className={cardClassNames}>
      <div className={styles.header}>
        {props.icon}
        <p className={styles.headerTitle}>{props.details.title}</p>

        {props.details.featured && (
          <div className={styles.badge}>
            <p className={styles.badgeText}>Best Choise</p>
          </div>
        )}
      </div>

      {props.details.price && (
        <div className={styles.price}>
          <p className={styles.ledu}>
            LEDU<span className={styles.amount}>
              {props.details.price.ledu}
            </span>
            /mo
          </p>

          <p className={styles.divider}>or</p>

          <p className={styles.usd}>
            USD<span className={styles.amount}>{props.details.price.usd}</span>
            /mo
          </p>
        </div>
      )}

      <div className={styles.benefits}>
        <p className={styles.benefitsTitle}>{props.details.benefits.title}</p>

        <ul className={styles.benefitsList}>
          {props.details.benefits.leduBonus && (
            <li className={styles.item}>
              <img src={IconCheck} className={styles.benefitsIcon} />
              <b>+{props.details.benefits.leduBonus} LEDU</b>&nbsp;on your
              balance
            </li>
          )}
          {props.details.benefits.list.map(benefit => {
            return (
              <li className={styles.item} key={benefit}>
                <img src={IconCheck} className={styles.benefitsIcon} />
                {benefit}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.footer}>
        <Link to={props.details.ctaUrl} className={styles.button}>
          {props.details.ctaTitle}
        </Link>
      </div>
    </div>
  );
}

PlanCard.propTypes = propTypes;
PlanCard.defaultProps = defaultProps;

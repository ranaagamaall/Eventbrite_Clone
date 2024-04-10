import React from "react";
import classes from "./footer.module.css";
import FooterData from "../../assets/data/FooterData";

/**
 * Component that renders footer
 *
 * @component
 * @example
 * return(
 * <Footer />
 * )
 */

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        <strong>© 2023 Envie</strong>
      </div>
      <div className={classes.footerdata}>
        {FooterData.staticData.map((element) => (
          <li key={element} className={classes.footeritem}>
            <div>{element}</div>
          </li>
        ))}
      </div>

      <div className={classes.dropdown}>
        <select defaultValue="Egypt">
          <option key="Egypt" value="Egypt" data-testid="Egypt">
            Egypt
          </option>
          {FooterData.countriesData.map((element) => (
            <option key={element} value={element} disabled data-testid={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Footer;

import classes from "./Salescards.module.css";

/**
 * Component that returns Sales Cards of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<SalesCards title="title" amount="amount"/>)
 */
const SalesCards = ({ title, amount}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
        <div className={classes.amount}>{amount}</div>
    </div>
  );
};

export default SalesCards;

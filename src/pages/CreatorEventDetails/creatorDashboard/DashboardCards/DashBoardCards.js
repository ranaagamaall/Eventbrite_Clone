import classes from "./dashboaradcards.module.css";

/**
 * Component that returns Cards of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<DashboardCards title="title" amount="amount" total="total" free="free" paid="paid"/>)
 */
const DashboardCards = ({ title, amount, total, free, paid }) => {
  return (
    <div id="CreatorDashBoardPageCardContainer" className={classes.container}>
      <div id="CreatorDashBoardPageCardTitle" className={classes.title}>
        {title}
      </div>
      <div
        id="CreatorDashBoardPageCardAmountAndTotal"
        className={classes.amountandtotal}>
        <div id="CreatorDashBoardPageCardAmount" className={classes.amount}>
          {amount}
        </div>
        {total !== false && (
          <div id="CreatorDashBoardPageCardTotal" className={classes.total}>
            {"/" + total}
          </div>
        )}
      </div>
      {free !== false && (
        <div
          id="CreatorDashBoardPageCardFreeAndPaidTickets"
          className={classes.type}>
          <div
            id="CreatorDashBoardPageCardPaidTickets"
            className={classes.paid}>
            <strong>{paid}</strong> paid
          </div>
          <div id="CreatorDashBoardPageCardFreeTickets">
            <strong>{free}</strong> free
          </div>
        </div>
      )}

      {free === false && (
        <div id="CreatorDashBoardPageCardView" className={classes.type}>
          4 from Envie
        </div>
      )}
    </div>
  );
};

export default DashboardCards;

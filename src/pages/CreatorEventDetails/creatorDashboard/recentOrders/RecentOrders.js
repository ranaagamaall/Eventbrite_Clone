import classes from "../salesBYticket/salesbyticke.module.css";
import dashboarddata from "../../../../assets/data/dashboarddata";
import moment from "moment";

/**
 * Component that returns table of recent orders of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<RecentOrders  recentordersReport ={ recentordersReport } />)
 */
const RecentOrders = ({ recentordersReport }) => {
  return (
    <div
      id="CreatorDashBoardPageSalesRecentOrdersContainer"
      className={classes.container}>
      <div
        id="CreatorDashBoardPageSalesRecentOrdersHeader"
        className={classes.mainsectionheader}>
        Recent Orders
      </div>
      {recentordersReport.length !== 0 ? (
        <div
          id="CreatorDashBoardPageSalesRecentOrdersTableContainer"
          className={classes.salestable}>
          <table id="CreatorDashBoardPageSalesRecentOrdersTable">
            <thead id="CreatorDashBoardPageSalesRecentOrdersTableHead">
              <tr id="CreatorDashBoardPageSalesRecentOrdersTableHeadRow">
                {dashboarddata.recentordersheader.map((item, index) => {
                  return (
                    <td
                      key={
                        "CreatorDashBoardPageSalesRecentOrdersTableHeadRow" +
                        index
                      }
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableHeadRow" +
                        index
                      }>
                      {item}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody id="CreatorDashBoardPageSalesRecentOrdersTableBody">
              {recentordersReport.map((item, index) => {
                return (
                  <tr
                    key={
                      "CreatorDashBoardPageSalesRecentOrdersTableBodyRow" +
                      index
                    }
                    id={
                      "CreatorDashBoardPageSalesRecentOrdersTableBodyRow" +
                      index
                    }>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataOrderNum" +
                        index
                      }
                      className={classes.sold}>
                      {item.orderNumber}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataName" +
                        index
                      }>
                      {item.name}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataQuantity" +
                        index
                      }>
                      {item.quantity}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataPrice" +
                        index
                      }>
                      {item.price.toFixed(2)}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataDate" +
                        index
                      }>
                      {moment(item.date).format("L")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={classes.emptypromos}>
          <div className={classes.emptyticketsicon}>
            <svg width="96" height="96" fill="none">
              <path
                d="M65.255 20.684l-5.298 2.903-6.919-3.454-6.653 3.454-7.136-3.92-7.289 3.496-4.752-2.478.38 49.592c.022 2.937 2.421 5.306 5.373 5.306H67.85c4.02 0 7.278-3.243 7.278-7.243s-3.259-7.243-7.278-7.243h-1.923l-.672-40.413z"
                fill="#fff"></path>
              <path
                d="M40.53 73.506l31.223.033-1.01 1.745-32.912.255 2.7-2.033z"
                fill="#EEEDF2"></path>
              <path
                d="M34.904 60.52l-7.794 7.817c.307 4.071 3.705 7.208 7.795 7.208h.297c3.611 0 6.649-2.696 7.059-6.266l-.18-2.178c-.305-3.718-3.427-6.582-7.177-6.582z"
                fill="#EEEDF2"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M36.325 33.115h20.292v2.098H36.325v-2.098zm0 7.605h20.292v2.098H36.325V40.72zm20.292 7.605H36.325v2.098h20.292v-2.098z"
                fill="#39364F"></path>
              <path
                d="M34.275 76.4h33.103v-1.458H34.275v1.459z"
                fill="#39364F"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.74 76.761H33.914v-2.18H67.74v2.18zm-.726-.721H34.636v-.737h32.378v.737z"
                fill="#39364F"></path>
              <mask
                id="orders-empty-graphic_svg__mask0"
                maskUnits="userSpaceOnUse"
                x="34"
                y="60"
                width="42"
                height="17">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M67.365 61.963c3.67 0 6.644 2.947 6.644 6.578 0 3.589-2.93 6.403-6.644 6.403v1.442c4.468 0 8.092-3.413 8.092-7.845 0-4.43-3.624-8.022-8.092-8.022v1.444zm-32.49.03c3.67 0 6.644 2.949 6.644 6.581 0 3.578-2.92 6.37-6.644 6.37v1.442c4.47 0 8.093-3.382 8.093-7.811 0-4.431-3.623-8.024-8.093-8.024v1.442z"
                  fill="#fff"></path>
              </mask>
              <g mask="url(#orders-empty-graphic_svg__mask0)">
                <path
                  d="M27.626 83.596h55.078V53.308H27.626v30.288z"
                  fill="#39364F"></path>
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.003 76.745h.362c4.742 0 8.455-3.604 8.455-8.204 0-4.622-3.793-8.382-8.455-8.382h-.362v2.164h.362c3.463 0 6.28 2.789 6.28 6.218 0 3.388-2.758 6.041-6.28 6.041h-.362v2.163zm-32.492 0h.363c4.743 0 8.457-3.588 8.457-8.17 0-4.622-3.794-8.384-8.457-8.384h-.363v2.163h.363c3.464 0 6.283 2.791 6.283 6.221 0 3.369-2.76 6.007-6.283 6.007h-.363v2.163zm.725-.728v-.722c3.756-.175 6.646-3.064 6.646-6.72 0-3.707-2.95-6.746-6.646-6.932v-.722c4.097.188 7.37 3.549 7.37 7.654 0 4.06-3.209 7.265-7.37 7.442zm32.491-.722v.722c4.162-.177 7.368-3.396 7.368-7.476 0-4.104-3.273-7.463-7.367-7.652v.722c3.694.187 6.643 3.224 6.643 6.93 0 3.674-2.891 6.578-6.643 6.754z"
                fill="#39364F"></path>
              <mask
                id="orders-empty-graphic_svg__mask1"
                maskUnits="userSpaceOnUse"
                x="34"
                y="60"
                width="34"
                height="2">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.876 60.517h32.487v1.459H34.876v-1.459z"
                  fill="#fff"></path>
              </mask>
              <g mask="url(#orders-empty-graphic_svg__mask1)">
                <path
                  d="M27.627 69.189H74.61V53.307H27.627V69.19z"
                  fill="#39364F"></path>
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.724 62.338H34.513v-2.18h33.211v2.18zM67 61.617H35.237v-.737H67v.737z"
                fill="#39364F"></path>
              <mask
                id="orders-empty-graphic_svg__mask2"
                maskUnits="userSpaceOnUse"
                x="26"
                y="18"
                width="41"
                height="59">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M46.179 22.415l-6.992-3.858-6.94 3.856-6.07-3.451v48.909c0 .09 0 .09.003.178.1 4.701 4.007 8.434 8.733 8.337l-.031-1.442c-3.923.08-7.17-3.02-7.253-6.925l-.001-46.57 4.61 2.622 6.952-3.866 6.997 3.864 6.81-3.86 6.857 3.849 5.457-2.69v39.216h1.451V19.043l-6.865 3.384-6.903-3.874-6.815 3.862z"
                  fill="#fff"></path>
              </mask>
              <g mask="url(#orders-empty-graphic_svg__mask2)">
                <path
                  d="M18.931 83.597H74.01V11.34H18.931v72.258z"
                  fill="#39364F"></path>
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.817 68.057c.102 4.83 4.083 8.69 8.916 8.69.062 0 .125 0 .189-.002l.363-.007-.047-2.163-.363.006c-.048.002-.095.002-.143.002-3.653 0-6.663-2.918-6.74-6.566l-.001-45.948 4.246 2.416 6.954-3.866 7 3.864L53 20.625l6.843 3.842 5.108-2.518v38.996h2.173V18.46l-7.215 3.557-6.915-3.881L46.176 22l-6.99-3.858-6.937 3.856-6.433-3.657v49.53l.001.185zm.725-.016l-.001-48.458 5.704 3.245 6.943-3.86 6.992 3.86 6.817-3.863 6.89 3.869 6.512-3.211v40.6h-.724V20.786l-5.81 2.863-6.868-3.856-6.811 3.863-6.997-3.863-6.948 3.864-4.976-2.83v.62c0 27.799 0 46.517.002 46.579.084 3.978 3.308 7.17 7.261 7.275l.015.723c-4.353-.1-7.91-3.609-8.001-7.983z"
                fill="#39364F"></path>
            </svg>
          </div>
          <div className={classes.mainsectionheaderno}>No Orders to show</div>
        </div>
      )}

      <div
        id="CreatorDashBoardPageSalesRecentOrdersHyperLink"
        className={classes.hyperlink}>
        Go to all orders
      </div>
    </div>
  );
};

export default RecentOrders;

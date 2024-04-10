import React from "react";
import { useState, useEffect } from "react";
import AddPromocodeForm from "../tickestPromocodes/addPromoCodeForm/AddPromocodeForm";
import PromoCodesList from "../tickestPromocodes/promocodesListView/PromoCodesList";

/**
 * Component that returns Creator's Manage Tickets Promo codes List and form
 *
 * @component
 * @example
 * return(<Promocodes />)
 */

export default function Promocodes() {
  const [dummydata, setdummydata] = useState(true);
  const [emptypromo, setEmptypromo] = useState(false);
  const [loadinglist, setloadinglist] = useState(true);
  return (
    <div>
      <AddPromocodeForm
        setdummydata={setdummydata}
        dummydata={dummydata}
        emptypromo={emptypromo}
        loadinglist={loadinglist}
      />
      <PromoCodesList
        dummydata={dummydata}
        setemptypromo={setEmptypromo}
        setloadinglist={setloadinglist}
      />
    </div>
  );
}

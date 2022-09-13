import React, { useState, useEffect } from "react";

import CheckoutItems from "../components/CheckoutPage/CheckoutItems";
import CheckoutForm from "../components/CheckoutPage/CheckoutForm";

function Checkout() {
  const [items, setItems] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("localCart"));
    setItems(items);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <CheckoutItems items={items} setItems={setItems} />
      <CheckoutForm />
    </div>
  );
}

export default Checkout;

import React from "react";

function CheckoutForm() {
  return (
    <div className="md:w-1/2 grid-flow-row-dense text-center md:h-[85vh]">
      <p>Order form</p>
      <p>Payment methods</p>
      <div className="flex flex-row justify-center gap-4 py-6">
        <button className="w-20 h-20 text-white bg-black">Google Pay</button>
        <button className="w-20 h-20 text-white bg-black">Privat</button>
        <button className="w-20 h-20 text-white bg-black">PayPal</button>
      </div>
      <label htmlFor="comments">Comments</label>
      <br />
      <input
        id="comments"
        name="comments"
        type="text"
        className="w-2/3 h-20 bg-gray-200 border-2 border-gray-400"
      />
    </div>
  );
}

export default CheckoutForm;

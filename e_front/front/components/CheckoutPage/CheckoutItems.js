import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import fins from "../../public/fins.png";

function CheckoutItems({ items, setItems }) {
  return (
    <div className="md:w-1/2 w-full md:h-[85vh] grid-flow-row px-2 my-4 overflow-y-scroll">
      {items ? (
        items?.map(({ name, quantity, slug }) => (
          <Link href={"/product/" + slug} key={name}>
            <a className="grid items-center grid-flow-col grid-cols-3 gap-4 px-4 py-2 border-2 rounded-full ring-gray-300 ring-2">
              <Image
                className="rounded-full"
                src={fins}
                alt="fins"
                layout="responsive"
                width={50}
                height={38}
              />
              <p className="text-center">{name}</p>
              <div className="text-center">
                {quantity > 1 ? (
                  <p className="border-b border-white">{quantity} items</p>
                ) : (
                  <p className="border-b border-white">{quantity} item</p>
                )}
                <p className="border-b border-white">Total: 29.99$</p>
              </div>
            </a>
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center p-6 text-white bg-gray-600 border-2 border-black rounded-lg hover:bg-black">
          <div className="">
            <p className="border-b border-white">No items in the cart yet</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutItems;

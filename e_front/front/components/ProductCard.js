import React from "react";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "../public/cart_icon.svg";
import CheckIcon from "../public/check_icon.svg";
import fins from "../public/fins.png";

function ProductCard({ product }) {
  return (
    <Link href={`/product/${encodeURIComponent(product.slug)}`}>
      <a className="mx-2 text-center ring-gray-400 hover:from-gray-200 hover:to-gray-500 ring-2 from-gray-100 to-gray-400 bg-gradient-to-br shadow-3xl rounded-xl">
        <Image
          className="rounded-t-xl"
          layout="responsive"
          quality={65}
          src={fins}
          alt={"fins"}
          priority={true}
        />
        <div>
          <p className="mt-1">{product.title}</p>
          <div className="flex flex-row justify-center gap-x-4">
            <p>9.99$</p>
            <CartIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-row justify-center mb-1 text-green-700 gap-x-2">
          <p>In stock</p>
          <CheckIcon className="w-6 h-6 stroke-green-700" />
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;

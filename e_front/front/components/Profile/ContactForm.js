import React from "react";

function ContactForm(props) {
  return (
    <form className="grid w-full h-full grid-flow-row grid-cols-2 place-items-center">
      <div className="relative w-3/4 col-span-2 mt-2 md:col-span-1 h-14">
        <div className="absolute w-full h-full ">
          <input
            id="email"
            className="absolute w-full h-full pl-2 border-2 border-gray-600 rounded-lg peer"
            placeholder=" "
          />
          <label
            className="absolute px-1 transition-all ease-in-out bg-white cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 -top-3 left-2 peer-focus:-top-3 peer-focus:left-2"
            htmlFor="email"
          >
            Your contact email
          </label>
        </div>
      </div>
      <div className="relative w-3/4 col-span-2 mt-2 md:col-span-1 h-14">
        <div className="absolute w-full h-full">
          <input
            id="name"
            className="absolute w-full h-full pl-2 border-2 border-gray-600 rounded-lg peer"
            placeholder=" "
          />
          <label
            className="absolute px-1 transition-all ease-in-out bg-white cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 -top-3 left-2 peer-focus:-top-3 peer-focus:left-2"
            htmlFor="name"
          >
            Your name
          </label>
        </div>
      </div>
      <div className="col-span-2 mt-2 text-xl font-bold">Letter</div>
      <div className="relative w-5/6 h-20 col-span-2 mt-4 overflow-y-scroll lg:h-44">
        <div className="absolute w-full h-full">
          <textarea
            id="letter"
            className="absolute w-full h-full pl-2 border-2 border-gray-600 rounded-lg"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-1/2 h-16 col-span-2 mt-3 text-sm font-medium text-center text-white rounded-lg focus:text-black bg-gradient-to-b hover:from-gray-600 hover:to-gray-700 from-gray-900 to-gray-600"
      >
        Submit form
      </button>
    </form>
  );
}

export default ContactForm;

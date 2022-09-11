import React from "react";

function PersonalInfo(props) {
  return (
    <form className="grid w-full h-full grid-flow-row grid-cols-2 place-items-center">
      <div className="relative w-4/5 h-14">
        <input
          id="First Name"
          className="absolute w-full pl-2 border-2 border-gray-600 rounded-lg h-14"
        />
        <label
          className="absolute px-1 bg-white -top-3 left-2"
          htmlFor="First Name"
        >
          First Name
        </label>
      </div>
      <div className="relative w-4/5 h-14">
        <input
          id="Surname"
          className="absolute w-full pl-2 border-2 border-gray-600 rounded-lg h-14"
        />
        <label
          className="absolute px-1 bg-white -top-3 left-2"
          htmlFor="Surname"
        >
          Surname
        </label>
      </div>
      <div className="relative w-4/5 col-span-2 md:col-span-1 h-14">
        <input
          id="Phone Number"
          className="absolute w-full pl-2 border-2 border-gray-600 rounded-lg h-14"
        />
        <label
          className="absolute px-1 bg-white -top-3 left-2"
          htmlFor="Phone Number"
        >
          Phone Number
        </label>
      </div>
      <div className="relative w-4/5 col-span-2 md:col-span-1 h-14">
        <input
          id="Email"
          className="absolute w-full pl-2 border-2 border-gray-600 rounded-lg h-14"
        />
        <label className="absolute px-1 bg-white -top-3 left-2" htmlFor="Email">
          Email
        </label>
      </div>
      <div className="relative w-4/5 col-span-2 md:w-1/2 h-14">
        <input
          id="Password"
          type={"password"}
          className="absolute w-full h-full pl-2 border-2 border-gray-600 rounded-lg peer"
          placeholder=" "
          required
        />
        <label
          className="absolute px-1 bg-white -top-3 left-2"
          htmlFor="Password"
        >
          Confirm Password
        </label>
      </div>
      <div className="flex items-center justify-center w-1/2 h-full col-span-2">
        <button className="w-4/5 h-16 text-sm font-medium text-center text-white rounded-lg focus:text-black bg-gradient-to-b hover:from-gray-600 hover:to-gray-700 from-gray-900 to-gray-600">
          Save changes
        </button>
      </div>
    </form>
  );
}

export default PersonalInfo;

import React, { useEffect, useState } from 'react';

function Switch({ value, onChange }) {

  const [toggle, setToggle] = useState(value);

  useEffect(() => {
    setToggle(value);
  }, [value]);

  const toggleClass = ' transform translate-x-6';
  return (
    <div className="flex justify-start items-center">
      <button
        type="button"
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center mt-2 ${
          toggle ? 'bg-gray-400' : 'bg-green-400'
        } rounded-full p-1 cursor-pointer`}
        onClick={() => {
          onChange(!toggle);
        }}
      >
        <div
          className={`bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out${
            toggle ? null : toggleClass
          }`}
        />
      </button>
    </div>
  );
}

export default Switch;

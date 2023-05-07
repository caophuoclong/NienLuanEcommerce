import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Seprate from '../Seprate';

export default function Quantity({
  deleted,
  current,
  max = Infinity,
  onChange,
  isLoading = false,
}) {
  const handleSubstract = () => {
    onChange(current - 1);
  };
  const handleAdd = (value = 1) => {
    onChange(current + 1);
  };
  return (
    <div className="flex h-10 items-center">
      <button
        disabled={isLoading || deleted}
        onClick={() => {
          if (current > 0) {
            handleSubstract();
          }
        }}
        className=" h-full bg-gray-100 p-2 hover:bg-gray-200 disabled:bg-gray-200"
      >
        <FaMinus size="12px" />
      </button>
      <Seprate />
      <input
        className="h-full w-9 cursor-default text-center outline-none disabled:bg-gray-200"
        value={current}
        disabled={isLoading || deleted}
        onChange={(e) => {
          const value = e.target.value;
          if (!isNaN(value)) {
            if (value < 0 || value > max) {
              alert('You could not do action');
            } else {
              onChange(value);
            }
          }
        }}
      />
      <Seprate />

      <button
        disabled={isLoading || deleted}
        onClick={() => {
          if (current + 1 > max) {
            alert('You are not');
          } else {
            handleAdd();
          }
        }}
        className=" h-full bg-gray-100 p-2 hover:bg-gray-200 disabled:bg-gray-200"
      >
        <FaPlus size="12px" />
      </button>
    </div>
  );
}

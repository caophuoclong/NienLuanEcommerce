import React, { useId } from 'react';

export default function Input({
  value,
  onChange1,
  name,
  required = false,
  number = false,
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="font-sm font-light italic">
        {name} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          if (number) {
            if (!isNaN(+e.target.value)) {
              onChange1(e.target.value);
            }
          } else {
            onChange1(e.target.value);
          }
        }}
        type="text"
        className="w-full rounded-md border p-1"
        placeholder={name}
      />
    </div>
  );
}

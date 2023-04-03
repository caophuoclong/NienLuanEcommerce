import React from 'react';

export default function Price({ price }) {
  function addDotsToNumber(num) {
    let str = num.toString();
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return str;
  }
  return <span>{addDotsToNumber(price)}</span>;
}

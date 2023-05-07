import React from 'react';
import {FaTimes} from "react-icons/fa"
export default function Hexagon({ children, color }) {
  return (
    // give me a hexagon div
    <div className={`hexagon-shape before:${color} before:content-['']`}>
     {children}
    </div>

  );
}

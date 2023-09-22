import React from "react";

export default function Button({ label }) {
  return (
    <button className="custom_btn mt-8 hover:bg-hover transition ease-in-out">
      {label}
    </button>
  );
}

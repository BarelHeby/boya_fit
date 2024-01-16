import React from "react";
import "./HorizontalScroller.css";
function HorizontalScroller({ items }) {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "hidden",
        maxWidth: "100%",
        minHeight: "120px",
      }}
    >
      {items.map((item, i) => (
        <div key={i} index className="scrollItem ms-2">
          {item}
        </div>
      ))}
    </div>
  );
}

export default HorizontalScroller;

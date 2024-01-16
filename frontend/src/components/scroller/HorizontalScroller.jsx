import React from "react";
import "./HorizontalScroller.css";
function HorizontalScroller({ items }) {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "hidden",
        maxWidth: "97%",
        minHeight: "120px",
      }}
    >
      {items.map((item, i) => (
        <div key={i} index className="scrollItem me-2">
          {item}
        </div>
      ))}
    </div>
  );
}

export default HorizontalScroller;

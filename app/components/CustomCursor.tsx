import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  // useEffect(() => {
  //   // Hide cursor on entire document and all elements
  //   const originalStyle = window.getComputedStyle(document.body).cursor;
  //   document.body.style.cursor = "none";
  //   document.documentElement.style.cursor = "none";
    
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setPosition({ x: e.clientX, y: e.clientY });
  //     const target = e.target as HTMLElement;
  //     const computedCursor = window.getComputedStyle(target).cursor;
  //     setIsPointer(computedCursor === "pointer" || computedCursor === "auto");
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     document.body.style.cursor = originalStyle;
  //     document.documentElement.style.cursor = originalStyle;
  //   };
  // }, []);

  return (
    // <div
    //   style={{
    //     position: "fixed",
    //     left: position.x,
    //     top: position.y,
    //     transform: "translate(-50%, -50%)",
    //     pointerEvents: "none",
    //     mixBlendMode: "difference",
    //     zIndex: 9999,
    //   }}
    // >
    //   {/* Outer purple cursor */}
    //   <div
    //     style={{
    //       width: isPointer ? "0px" : "24px",
    //       height: isPointer ? "0px" : "24px",
    //       backgroundColor: "rgba(147, 51, 234, 0.3)",
    //       borderRadius: "50%",
    //       transition: "all 0.15s ease-out",
    //       borderBottom: isPointer ? "20px solid #8b5cf6" : "none",
    //       borderLeft: isPointer ? "12px solid transparent" : "none",
    //       borderRight: isPointer ? "12px solid transparent" : "none",
    //       position: "absolute",
    //       transform: "translate(-50%, -50%)",
    //     }}
    //   />
    //   {/* Inner blue cursor */}
    //   <div
    //     style={{
    //       width: isPointer ? "0px" : "12px",
    //       height: isPointer ? "0px" : "12px",
    //       backgroundColor: "#60a5fa",
    //       borderRadius: "50%",
    //       transition: "all 0.15s ease-out",
    //       borderBottom: isPointer ? "12px solid #3b82f6" : "none",
    //       borderLeft: isPointer ? "8px solid transparent" : "none",
    //       borderRight: isPointer ? "8px solid transparent" : "none",
    //       position: "absolute",
    //       transform: "translate(-50%, -50%)",
    //       transitionDelay: "0.02s",
    //     }}
    //   />
    // </div>
    <></>
  );
};

export default CustomCursor;
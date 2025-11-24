import { useState, useEffect } from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";

export const Matador = (props : MatadorProps) => {
  const {matadorPosition, setMatadorPosition} = props
  useEffect(() => {
    const bullRun = (event: BullRunEvent) => {
      const bullPos = event.detail.position;
      let oldPos = matadorPosition
      while (matadorPosition === bullPos){ 
        setMatadorPosition(Math.random() * 8)
        console.log(`Motador is moving from ${oldPos} to ${matadorPosition}`)
      }
    };
    document.addEventListener('bullRun', bullRun as EventListener)
    return () => {
        document.removeEventListener('bullRun', bullRun as EventListener)
    }
  });
  return (
    <>
      <div>i am motador</div>
    </>
  );
};

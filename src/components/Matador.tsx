import { useState, useEffect } from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";

export const Matador = (props : MatadorProps) => {
  const {matadorPosition, setMatarodPosition} = props
  useEffect(() => {
    const bullRun = (event: BullRunEvent) => {
      const bullPos = event.detail.position;
      let oldPos = matadorPosition
      if(bullPos === oldPos){
        let random = Math.floor(Math.random() * 8)
        setMatarodPosition(random)
        console.log(`Matador is moving from ${oldPos} to ${random}`)
      }
    };
    document.addEventListener('bullRun', bullRun as EventListener)
    return () => {
        document.removeEventListener('bullRun', bullRun as EventListener)
    }
  }, [matadorPosition]);
  return (
    <>
      <div>i am motador</div>
    </>
  );
};

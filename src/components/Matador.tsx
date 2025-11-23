import { useState, useEffect } from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";

export const Matador = ({ position, setPosition }: MatadorProps) => {
  const generateNewPos = (currentPos: number): number => {
    let newPos;
    do {
      newPos = Math.floor(Math.random() * 8);
    } while (newPos === currentPos); 
    return newPos;
  };

  useEffect(() => {
    const bullRun = (event: BullRunEvent) => {
      const bullPos = event.detail.position;

      setPosition((oldPos) => {
        if (bullPos === oldPos) {
          const newPos = generateNewPos(oldPos);
          console.log(`Matador is moving from ${oldPos} to ${newPos}`);
          return newPos;
        }
        return oldPos;
      });
    };
    document.addEventListener('bullRun', bullRun as EventListener)
    return () => {
        document.removeEventListener('bullRun', bullRun as EventListener)
    }
  }, [setPosition]);
  return (
    <>
      <div>i am motador</div>
    </>
  );
};

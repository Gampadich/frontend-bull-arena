import { useState, useEffect, useRef } from "react";
import React from 'react'
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";

export const Matador = React.memo((props: MatadorProps) => {
  const [render, isRender] = useState(false);
  const { matadorPosition, setMatarodPosition } = props;
  let { applause } = props;
  const oldApplauseRef = useRef(applause)
  useEffect(() => {
    if (applause === 3) {
      let oldApplause = oldApplauseRef.current;
      if (applause !== oldApplause) {
        oldApplauseRef.current = applause
        isRender(true);
      } else if (applause === oldApplause) {
        isRender(false);
      }
    } else {
      oldApplauseRef.current = applause
    }
  }, [applause]);
  useEffect(() => {
    const bullRun = (event: BullRunEvent) => {
      const bullPos = event.detail.position;
      let oldPos = matadorPosition;
      if (bullPos === oldPos) {
        let random = Math.floor(Math.random() * 8);
        setMatarodPosition(random);
        console.log(`Matador is moving from ${oldPos} to ${random}`);
      }
    };
    document.addEventListener("bullRun", bullRun as EventListener);
    return () => {
      document.removeEventListener("bullRun", bullRun as EventListener);
    };
  }, [setMatarodPosition]);
  return (
    <>
      {render ? <h3>I am happy motador</h3> : <h3>i am motador</h3>}
    </>
  );
});

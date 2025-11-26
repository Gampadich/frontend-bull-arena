import { useState, useEffect, useRef } from "react";
import React from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";
import FirstSound from "./Sounds/firstSound.mp3";
import SecondSound from "./Sounds/SecondSound.mp3";
import ThirdSound from "./Sounds/ThirdSound.mp3";

export const Matador = React.memo((props: MatadorProps) => {
  const [render, isRender] = useState(false);
  const { matadorPosition, setMatarodPosition } = props;
  let { applause } = props;
  const oldApplauseRef = useRef(applause);

  useEffect(() => {
    if (applause === 1) {
      const firstSound = new Audio(FirstSound);
      firstSound.currentTime = 0
      firstSound.pause()
      firstSound.play();
    } else if (applause === 2) {
      const secondSound = new Audio(SecondSound);
      secondSound.currentTime = 0
      secondSound.pause()
      secondSound.play();
    } else if (applause === 3) {
      const thirdSound = new Audio(ThirdSound);
      thirdSound.currentTime = 0
      thirdSound.pause()
      thirdSound.play();
    }
  });

  useEffect(() => {
    if (applause === 3) {
      let oldApplause = oldApplauseRef.current;
      if (applause !== oldApplause) {
        oldApplauseRef.current = applause;
        isRender(true);
      } else if (applause === oldApplause) {
        isRender(false);
      }
    } else {
      oldApplauseRef.current = applause;
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
  return <>{render ? <h3>I am happy motador</h3> : <h3>i am motador</h3>}</>;
});

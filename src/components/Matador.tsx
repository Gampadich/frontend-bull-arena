import { useState, useEffect } from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";
import ReactDOM from "react-dom";

export const Matador = (props : MatadorProps) => {
  const [render, isRender] = useState(false)
  const {matadorPosition, setMatarodPosition} = props
  let { applause } = props
  let oldApplause
  if(applause === 3){
    if(applause !== oldApplause){
      oldApplause = applause
      isRender(true)
    } else if (applause === oldApplause){
      isRender(false)
    }
  }
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
      {render 
        ?<div>I am happy motador</div>
        :<div>i am motador</div>
      }
    </>
  );
};

import { useState, useEffect } from "react"
import { BullRunEvent } from "../types/types"

export const Matador = () => {
    const [matadorPosition, setPos] = useState(4)
    useEffect(() => {
        const bullRun = (event : BullRunEvent) => {
            const bullPosition = event.detail.position
            if(bullPosition === matadorPosition){
                setPos(Math.floor(Math.random() * 8))
                console.log(matadorPosition)
            }
        }
        document.addEventListener('bullRun', bullRun as EventListener)
        return(() => {
            document.removeEventListener('bullRun', bullRun as EventListener)
        })
    })
    return (
        <>
            <div>i am motador</div>
        </>
    )
}
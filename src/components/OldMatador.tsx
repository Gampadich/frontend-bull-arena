import React, { Component, createRef } from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps"; 
import FirstSound from "./Sounds/firstSound.mp3";
import SecondSound from "./Sounds/SecondSound.mp3";
import ThirdSound from "./Sounds/ThirdSound.mp3";

export class OldMatador extends Component<MatadorProps> {
    state = {
        render: false,
    };
    oldApplause: number; 
    constructor(props: MatadorProps) {
        super(props);
        this.oldApplause = props.applause; 
    }
    playApplauseSound = (applauseValue: number) => {
        let soundFile;
        switch (applauseValue) {
            case 1:
                soundFile = FirstSound;
                break;
            case 2:
                soundFile = SecondSound;
                break;
            case 3:
                soundFile = ThirdSound;
                break;
            default:
                return;
        }
        const audio = new Audio(soundFile);
        audio.play().catch(e => console.error("Sound playback error:", e));
    }
    componentDidUpdate(prevProps: MatadorProps) {
        const { applause } = this.props;
        if (applause !== prevProps.applause) {
            this.playApplauseSound(applause);
        }
        if (applause === 3 && applause !== prevProps.applause) {
            this.setState({ render: true });
        } else if (applause === 3 && applause === prevProps.applause) {
        } else if (applause !== 3) {
            this.setState({ render: false });
        }
    }
    bullRunHandler = (event: BullRunEvent) => {
        const { matadorPosition, setMatarodPosition } = this.props;
        const bullPos = event.detail.position;
        let oldPos = matadorPosition;
        if (bullPos === oldPos) {
            let random = Math.floor(Math.random() * 8);
            setMatarodPosition(random);
            console.log(`Matador is moving from ${oldPos} to ${random}`);
        }
    };
    componentDidMount() {
        document.addEventListener("bullRun", this.bullRunHandler as EventListener);
    }
    componentWillUnmount() {
        document.removeEventListener("bullRun", this.bullRunHandler as EventListener);
    }
    render() {
        const { render } = this.state;
        return (
            <>
                {render ? <h3>I am happy motador</h3> : <h3>i am motador</h3>}
            </>
        );
    }
}
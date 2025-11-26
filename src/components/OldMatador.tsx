import React from "react";
import { BullRunEvent } from "../types/types";
import { MatadorProps } from "../types/matadorProps";
import FirstSound from "./Sounds/firstSound.mp3";
import SecondSound from "./Sounds/SecondSound.mp3";
import ThirdSound from "./Sounds/ThirdSound.mp3";

export class OldMatador extends React.PureComponent<MatadorProps> {
    state = {
        render: false,
        userInteracted: false,
    };
    oldApplause: number;
    
    audioRefs: { [key: number]: HTMLAudioElement | null } = {
        1: null,
        2: null,
        3: null,
    };

    constructor(props: MatadorProps) {
        super(props);
        this.oldApplause = props.applause;
    }

    componentDidMount() {
        document.addEventListener("bullRun", this.bullRunHandler as EventListener);
        
        window.addEventListener('click', this.handleInitialInteraction, { once: true });
        window.addEventListener('touchstart', this.handleInitialInteraction, { once: true });
    }
    
    componentWillUnmount() {
        document.removeEventListener("bullRun", this.bullRunHandler as EventListener);
        window.removeEventListener('click', this.handleInitialInteraction);
        window.removeEventListener('touchstart', this.handleInitialInteraction);
    }

    handleInitialInteraction = () => {
        if (!this.state.userInteracted) {
            this.setState({ userInteracted: true });
            
            this.audioRefs[1] = new Audio(FirstSound);
            this.audioRefs[2] = new Audio(SecondSound);
            this.audioRefs[3] = new Audio(ThirdSound);
        }
    };

    playApplauseSound = (applauseValue: number) => {
        if (!this.state.userInteracted) {
            return;
        }

        const audio = this.audioRefs[applauseValue];

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch(e => console.error("Sound playback error:", e));
        }
    };

    componentDidUpdate(prevProps: MatadorProps, prevState: { render: boolean, userInteracted: boolean }) {
        const { applause } = this.props;
        const { render } = this.state;
        let newRenderState = render;

        if (applause !== prevProps.applause) {
            this.playApplauseSound(applause);

            if (applause === 3) {
                newRenderState = true;
                setTimeout(() => {
                    this.setState({ render: false });
                }, 100);
            } else {
                newRenderState = false;
            }
        }
        
        if (newRenderState !== render && applause !== 3) {
            this.setState({ render: newRenderState });
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
    
    render() {
        const { render } = this.state;
        return (
            <>
                {render ? <h3>I am happy motador</h3> : <h3>i am motador</h3>}
            </>
        );
    }
}
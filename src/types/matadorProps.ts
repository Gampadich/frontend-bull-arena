export interface MatadorProps {
    position: number; 
    setPosition: (newPosition: number | ((prevState: number) => number)) => void;
}
export type ButtonProps = {
    classname?: string;
    onClick: () => void;
}

export type CssStyles = {
    [name: string]: React.CSSProperties;
}

export type Point = {
    x: number;
    y: number;
}
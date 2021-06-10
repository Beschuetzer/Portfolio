import { CSSProperties } from "react";

interface DefaultStyles {
  position: string,
  top: string,
  left: string,
  bottom: string,
  right: string,
  transform: string,
  backgroundColor: string,
  color: string,
  zIndex: number,
  backdropFilter: string,
  padding: string,
}

export function getDefaultStyles () {
  const defaults: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    transform: "translate(-50%, -50%)",
    backgroundColor: '#f7f7f7',
    color: '#000000',
    zIndex: 10000,
    backdropFilter: 'blur(10px)',
    padding: "1.6rem 3.2rem",
  };

  return JSON.parse(JSON.stringify(defaults));
}

export function getStyles (stylesFromAbove: CSSProperties) {
  const defaultStyles = getDefaultStyles();
  if (!stylesFromAbove) return defaultStyles;
  const keys = Object.keys(stylesFromAbove);
  for (let i = 0; i < keys.length; i++) {
    const keyFromAbove = keys[i] as any;
    if (defaultStyles[keyFromAbove as keyof DefaultStyles]) {
      (defaultStyles[keyFromAbove as keyof DefaultStyles] as any) = stylesFromAbove[keyFromAbove as keyof DefaultStyles];
    }
  }
  return defaultStyles
}
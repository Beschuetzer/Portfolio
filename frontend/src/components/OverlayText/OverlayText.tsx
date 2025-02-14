import React, { CSSProperties, useRef, useEffect } from 'react'

type Positions = "relative" | 'static' | 'absolute' | 'fixed';

interface OverlayTextDefaultStyles {
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
interface OverlayTextProps {
  positionType?: Positions,
  positionTop?: string,
  positionBottom?: string,
  positionLeft?: string,
  positionRight?: string,
  transform?: string,
  zIndex?: string,
  textBackgroundColor?: string,
  textColor?: string,
  titleText?: string,
  backdropFilter?: string,
  cssClassname?: string,
  styles?: CSSProperties,
  children?: any,
  isVisible?: boolean, //parent controls visibility
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>, //parent controls visibility
}


export const OverlayText: React.FC<OverlayTextProps> = ({
  positionType = 'fixed',
  titleText = "Title",
  cssClassname = 'overlay-text',
  styles,
  children,
  isVisible = true,
  setIsVisible = () => null,
}) => {

  const reference = useRef<any>(null);
  let stylesToUse = reconcileStyles(styles as CSSProperties);

  function onClick() {
    setIsVisible && setIsVisible(false);
  }
  
  function getDefaultStyles () {
    // const defaults: CSSProperties = {
    //   position: 'fixed',
    //   top: '50%',
    //   left: '50%',
    //   bottom: 'auto',
    //   right: 'auto',
    //   transform: "translate(-50%, -50%)",
    //   backgroundColor: '#f7f7f7',
    //   color: '#000000',
    //   zIndex: 10000,
    //   backdropFilter: 'blur(10px)',
    //   padding: "1.6rem 3.2rem",
    // };
  
    const defaults: CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
      transform: "translate3d(-50%, -50%, 0)",
      zIndex: 10000,
    };
  
    return JSON.parse(JSON.stringify(defaults));
  }
  
  function reconcileStyles (stylesFromAbove: CSSProperties) {
    const defaultStyles = getDefaultStyles();
    if (!stylesFromAbove) return defaultStyles;
    const keys = Object.keys(stylesFromAbove);
    for (let i = 0; i < keys.length; i++) {
      const keyFromAbove = keys[i] as any;
      if (defaultStyles[keyFromAbove as keyof OverlayTextDefaultStyles]) {
        (defaultStyles[keyFromAbove as keyof OverlayTextDefaultStyles] as any) = stylesFromAbove[keyFromAbove as keyof OverlayTextDefaultStyles];
      }
    }
    return defaultStyles
  }

  useEffect(() => {
    //need to set parent to position relative inline style
    (reference.current.parentNode?.style as CSSProperties).position = positionType;
  }, [positionType])

  if (!isVisible) return null;
  return (
    <div ref={reference} className={`${cssClassname}`} style={stylesToUse ? stylesToUse : null}>
      <div className={`${cssClassname}-title-container`}>
        <h3 className={`${cssClassname}-title` }>{titleText}</h3>
        <svg className={`${cssClassname}-title-close`} onClick={onClick}>
          <use xlinkHref="/sprite.svg#icon-close"/>
        </svg>
      </div>
      <div className={`${cssClassname}-content` }>
        {children}
      </div>
    </div>
  )
}
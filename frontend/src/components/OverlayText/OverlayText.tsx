import React, { CSSProperties, useRef, useEffect, useState } from 'react'
import { reconcileStyles } from './utils';

type Positions = "relative" | 'static' | 'absolute' | 'fixed';

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
}


const OverlayText: React.FC<OverlayTextProps> = ({
  positionType = 'fixed',
  titleText = "Title",
  cssClassname = 'overlay-text',
  styles,
  children,
}) => {

  const reference = useRef<any>(null);
  let stylesToUse = reconcileStyles(styles as CSSProperties);
  const [isVisible, setIsVisible] = useState(true);

  function onClick() {
    setIsVisible((isVisible) => !isVisible);
  }

  useEffect(() => {
    //need to set parent to position relative inline style
    (reference.current.parentNode?.style as CSSProperties).position = positionType;
  }, [positionType])

  if (!isVisible) return null;
  return (
    <div ref={reference} className={`${cssClassname}`} style={stylesToUse ? stylesToUse : null}>
      <div className={`${cssClassname}-title-container`} onClick={onClick}>
        <h3 className={`${cssClassname}-title` }>{titleText}</h3>
        <svg className={`${cssClassname}-title-close`}>
          <use xlinkHref="/sprite.svg#icon-close"/>
        </svg>
      </div>
      <div className={`${cssClassname}-content` }>
        {children}
      </div>
    </div>
  )
}

export default OverlayText
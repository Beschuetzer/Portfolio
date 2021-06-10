import React, { CSSProperties, useRef, useEffect } from 'react'

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
  positionTop = "50%",
  positionBottom= "auto",
  positionLeft= "50%",
  positionRight= "auto",
  transform= "translate(-50%, -50%)",
  zIndex = 10000,
  textBackgroundColor = '#f7f7f7',
  textColor = '#000000',
  titleText = "Title",
  backdropFilter = "blur(10px)",
  cssClassname = 'overlay-text',
  styles,
  children,
}) => {

  const reference = useRef<any>(null);
  useEffect(() => {
    //need to set parent to position relative inline style
    (reference.current.parentNode?.style as CSSProperties).position = positionType
  }, [positionType])

  return (
    <div ref={reference} className={`${cssClassname}`}>
      <h3 className={`${cssClassname}-title` }>{titleText}</h3>
      <div className={`${cssClassname}-content` }>
        {children}
      </div>
    </div>
  )
}

export default OverlayText
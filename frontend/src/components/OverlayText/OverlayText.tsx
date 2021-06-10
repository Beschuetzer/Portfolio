import React, { CSSProperties, useRef, useEffect } from 'react'

type Positions = "relative" | 'static' | 'absolute' | 'fixed';

const defaultStyles = {

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

  function getStyles (stylesFromAbove: CSSProperties) {
    //if styles from above then iterate through each style and override default style with it

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
    }

    let defaultStyles: CSSProperties = {
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
    }

    const keys = Object.keys(stylesFromAbove);
    for (let i = 0; i < keys.length; i++) {
      const keyFromAbove = keys[i];
      if (defaultStyles[keyFromAbove as keyof DefaultStyles]) {
        defaultStyles[keyFromAbove] = stylesFromAbove[keyFromAbove as keyof DefaultStyles];
      }
    }
    
    return defaultStyles
  }

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
import React, { CSSProperties } from 'react'

interface Component {
  classnames: string[] | string,
  styles: CSSProperties,
}

export default function Component() {
  const  getDefaultStyles = (): CSSProperties {
    return {}
  }


  function reconcileStyles (stylesFromAbove: CSSProperties) {
    const defaultStyles = getDefaultStyles();
    if (!stylesFromAbove) return defaultStyles;
    const keys = Object.keys(stylesFromAbove);
    for (let i = 0; i < keys.length; i++) {
      const keyFromAbove = keys[i] as any;
      if (defaultStyles[keyFromAbove as keyof DefaultStyles]) {
        (defaultStyles[keyFromAbove as keyof DefaultStyles] as any) = styles[keyFromAbove as keyof DefaultStyles];
      }
    }
    return defaultStyles
  }

  return (
    <div>
      
    </div>
  )
}

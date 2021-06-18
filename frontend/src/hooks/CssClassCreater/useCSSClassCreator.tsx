import React, { useEffect } from 'react'
import { CSSProperties } from 'react'

interface CSSClassCreationObject{
  selector: string
  styles: CSSProperties,
}

interface  CssClassCreaterProps {
 list: CSSClassCreationObject[];
}

const useCssClassCreator: React.FC<CssClassCreaterProps> = ({
  list,
}) =>{

  function createCSSSelector (selector: string, style: string) {
    if (!document.styleSheets) return;
    if (document.getElementsByTagName('head').length === 0) return;
  
    let styleSheet, mediaType;
  
    if (document.styleSheets.length > 0) {
      for (let i = 0, l = document.styleSheets.length; i < l; i++) {
        if (document.styleSheets[i].disabled) 
          continue;
        let media = document.styleSheets[i].media;
        mediaType = typeof media;
  
        if (mediaType === 'string') {
          debugger;
          //@ts-ignore
          if (media === '' || (media.indexOf('screen') !== -1)) {
            styleSheet = document.styleSheets[i];
          }
        }
        else if (mediaType === 'object') {
          if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
            styleSheet = document.styleSheets[i];
          }
        }
  
        if (typeof styleSheet !== 'undefined') 
          break;
      }
    }
  
    if (typeof styleSheet === 'undefined') {
      let styleSheetElement = document.createElement('style');
      styleSheetElement.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(styleSheetElement);
  
      for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].disabled) {
          continue;
        }
        styleSheet = document.styleSheets[i];
      }
  
      mediaType = typeof styleSheet?.media;
    }
  
    if (mediaType === 'string') {
      for (let i = 0, l = styleSheet?.rules.length; i < l; i++) {
        if((styleSheet?.rules[i] as any).selectorText && (styleSheet?.rules[i] as any).selectorText.toLowerCase() === selector.toLowerCase()) {
          (styleSheet?.rules[i] as any).style.cssText = style;
          return;
        }
      }
      styleSheet?.addRule(selector,style);
    }
    else if (mediaType === 'object') {
      let styleSheetLength = (styleSheet?.cssRules) ? styleSheet.cssRules.length : 0;
      for (let i = 0; i < styleSheetLength; i++) {
        if ((styleSheet?.cssRules[i] as any).selectorText && (styleSheet?.cssRules[i] as any).selectorText?.toLowerCase() === selector.toLowerCase()) {
          (styleSheet?.cssRules[i] as any).style.cssText = style;
          return;
        }
      }
      styleSheet?.insertRule(selector + '{' + style + '}', styleSheetLength);
    }
  }
  
  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      debugger;
      for (let i = 0; i < list.length; i++) {
        const classToCreate = list[i];
        //todo: need to convert CSSProperties to string object
        const styles = JSON.parse(JSON.stringify(classToCreate.styles));
        createCSSSelector(selector, styles)
      }
      // const cssClassCreationObj = list[i];
      // const style = document.createElement('style');
      // style.type = 'text/css';
      // style.innerHTML = '.cssClass { color: #F00; }';
      // document.getElementsByTagName('head')[0].appendChild(style);

      // document.getElementById('someElementId').className = 'cssClass';
    }
  }, [list])
  //takes a list of objects
  return null
}

export default useCssClassCreator;

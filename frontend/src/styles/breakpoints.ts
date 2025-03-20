import { css } from 'styled-components';
import { defaultFontSize, SECTION_WIDTH_IN_PIXELS } from './constants';

enum Breakpoints {
  navListBreak = 'navListBreak',
  smallFont = 'smallFont',
  navBreak = 'navBreak',
  phone = 'phone',
  phoneTouch = 'phoneTouch',
  contentFull = 'contentFull',
  contentFullWithPadding = 'contentFullWithPadding',
  tabPort = 'tabPort',
  tabLand = 'tabLand',
  navSwitch = 'navSwitch',
  bigDesktop = 'bigDesktop',
  largerThanNavSwitch = 'largerThanNavSwitch',
}

export const BREAK_POINTS: { [key in Breakpoints]: string } = {
  [Breakpoints.navListBreak]: '370px',
  [Breakpoints.smallFont]: '469px',
  [Breakpoints.navBreak]: '561px',
  [Breakpoints.phone]: '655px',
  [Breakpoints.phoneTouch]: '655px',
  [Breakpoints.contentFull]: `${SECTION_WIDTH_IN_PIXELS}px`,
  [Breakpoints.contentFullWithPadding]: `calc(${SECTION_WIDTH_IN_PIXELS}px + 2 * ${defaultFontSize})`,
  [Breakpoints.tabPort]: '843px',
  [Breakpoints.tabLand]: '937px',
  [Breakpoints.navSwitch]: '1300px',
  [Breakpoints.bigDesktop]: '1800px',
  [Breakpoints.largerThanNavSwitch]: '1100px',
};

type RespondType = {
  [key in Breakpoints]: (...args: [TemplateStringsArray, ...any[]]) => any;
};

export const respond: RespondType = Object.keys(BREAK_POINTS).reduce((acc, label) => {
  acc[label as Breakpoints] = (...args) => css`
    @media (max-width: ${BREAK_POINTS[label as Breakpoints]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {} as RespondType);
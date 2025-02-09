import { css } from 'styled-components';

enum Breakpoints {
  navListBreak = 'navListBreak',
  smallFont = 'smallFont',
  navBreak = 'navBreak',
  phone = 'phone',
  phoneTouch = 'phoneTouch',
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
  [Breakpoints.tabPort]: '843px',
  [Breakpoints.tabLand]: '937px',
  [Breakpoints.navSwitch]: '1100px',
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
import { css, FlattenSimpleInterpolation } from 'styled-components';

export const sizes: { [key: string]: string } = {
  navListBreak: '370px',
  smallFont: '469px',
  navBreak: '561px',
  phone: '655px',
  phoneTouch: '655px',
  tabPort: '843px',
  tabLand: '937px',
  navSwitch: '1100px',
  bigDesktop: '1800px',
  largerThanNavSwitch: '1100px',
};

type RespondType = {
  [key: string]: (...args: any[]) => FlattenSimpleInterpolation;
};

export const respond: RespondType = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {} as RespondType);
import React, { useEffect, useMemo, useState } from "react";
import {
  getAbsoluteRightPosition,
} from "./sitenav/helpers";
import { styled } from "styled-components";
import { BUTTON_RADIUS } from "../../styles/constants";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { SITE_NAV_NAV_SWITCH_TOP } from "../../styles/constants";
import { buttonPlacementStyles } from "./sitenav/styles";

type GithubButtonProps = {};

const Container = styled.div<SiteNavStyledProps & { sitenavright: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  width: ${BUTTON_RADIUS};
  height: ${BUTTON_RADIUS};
  top: ${(props) => props.sitenavnavswitchtop};
  background-color: ${(props) => props.colorscheme?.primary4};
  ${buttonPlacementStyles}
  left: ${(props) => props.sitenavright};
`;

export function GithubButton(props: GithubButtonProps) {
  const [siteNavRight, setSiteNavRight] = useState(getAbsoluteRightPosition());
  const colorScheme = useColorScheme();
  const propsToAdd = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      sitenavnavswitchtop: SITE_NAV_NAV_SWITCH_TOP,
      sitenavright: siteNavRight,
    }),
    [colorScheme, siteNavRight]
  );

  useEffect(() => {
    function onResize() {
      setSiteNavRight(getAbsoluteRightPosition());
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <Container {...propsToAdd}></Container>;
}

// export class GithubButton extends React.Component {
//   render() {
//     return (
//       ReactDOM.createPortal(
//         <React.Fragment>
//           <a target="_blank" rel="noreferrer" className="github__link" href={GITHUB_URL}>
//             <span className="github__text github__text-top">View</span>
//             {/* <span className="github__text github__text-middle">My</span> */}
//             <span className="github__text github__text-bottom">GitHub</span>
//             <svg className="github__svg">
//               <use className="github__top" xlinkHref="/sprite.svg#icon-github-with-circle"></use>
//               <use className='github__bottom' xlinkHref="/sprite.svg#icon-github"></use>
//             </svg>
//           </a>

//         </React.Fragment>
//       ,
//         document.querySelector('#github')!
//       )
//     );
//   }
// }

import { css } from "styled-components";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { LayoutStyledProps } from "../layouts/types";
import { FONT_SIZE } from "../pages/styled-pages/constants";
import { CarouselOptions } from "react-thumbnail-carousel";
import { COLORS, ColorScheme } from "./constants";

export function getCarouselStylingOptions(
  colorScheme: ColorScheme = COLORS.general
): CarouselOptions {
  return {
    layout: {
      itemDisplayLocation: "below",
    },
    modal: {
      maintainMinimizedStateAcrossItems: true,
    },
    thumbnail: {
      size: [[100], [75, 1200, "max-width"], [66, 600, "max-width"]],
      descriptionOverlay: {
        hideDescriptionOverlayUnlessHovered: false,
        textColor: colorScheme?.primary4,
        background: {
          gradient: {
            start: {
              opacity: 0.9,
              color: colorScheme?.primary1,
            },
            end: {
              opacity: 0.9,
              color: colorScheme?.primary2,
            },
            angle: 270,
          },
        },
      },
      currentItemBorder: `1px solid ${colorScheme?.primary1}`,
    },
    styling: {
      fontFamily: {
        all: "Open Sans, sans-serif",
      },
      colorTheme: {
        colorOne: colorScheme?.primary4,
        colorTwo: colorScheme?.primary3,
        colorThree: colorScheme?.primary2,
        colorFour: colorScheme?.primary2,
        colorFive: colorScheme?.primary1,
        colorGreyOne: colorScheme?.greyOne,
      },
      navigation: {
        backgroundColor: colorScheme?.primary4,
        elements: {
          color: colorScheme?.primary1,
        },
      },
      toolbar: {
        progressBar: {
          backgroundColor: hexToRgba(colorScheme?.primary1, .25),
          seekColor: hexToRgba(colorScheme?.primary1, .5),
          textOrForegroundColor: colorScheme?.primary1,
        }
      },
      modal: {
        backgroundColor: colorScheme?.primary1,
        textColor: colorScheme?.primary4,
      },
      itemViewer: {
        backgroundColor: colorScheme?.primary4,
        loadingSpinner: {
          options: {
            color: colorScheme?.primary1,
          },
        },
      },
    },
  };
}

export const getTextShadowStyle = (x = 0) => css<LayoutStyledProps>`
  text-shadow: ${x}px 4px 3px
      ${(props) => hexToRgba(props.colorscheme?.primary3, 0.4)},
    ${x}px 8px 13px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)},
    ${x}px 18px 23px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)};
`;

export const getTextShadowPageNavStyle = (x = 0) => css<LayoutStyledProps>`
  text-shadow: ${x}px 7px 6px rgba(0, 0, 0, 0.2),
    ${x}px -5px 35px hsla(0, 0%, 100%, 0.3);
`;

export const linkStyles = css<LayoutStyledProps>`
  ${(props) => (props.url ? ` text-decoration: underline;` : "")}
  font-weight: bold;
  transition: color 0.25s ease-in-out;
  cursor: pointer;
  color: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.875)};
  &:hover {
    color: ${(props) => props.colorscheme?.primary1};
  }
`;

export const paragraphMarginTop = css<LayoutStyledProps>`
  margin-top: ${FONT_SIZE};
`;

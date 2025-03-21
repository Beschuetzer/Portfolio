import React from "react";
import { Carousel, CarouselProps } from "react-thumbnail-carousel";
import { LazyLoad, LazyLoadProps } from "./LazyLoad";

type LazyLoadedCarouselProps = CarouselProps & {
  lazyLoadProps?: LazyLoadProps;
};

export default function LazyLoadedCarousel(props: LazyLoadedCarouselProps) {
  const { lazyLoadProps, ...carouselProps } = props;
  return (
    <LazyLoad
      {...lazyLoadProps}
      containerProps={{
        style: {
          ...lazyLoadProps?.containerProps?.style,
          width: "100%",
        },
      }}
    >
      <Carousel {...carouselProps} />
    </LazyLoad>
  );
}

"use client";
import { CarouselResponseType } from "@/lib/types";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import BannerCarousel from "../BannerCarousel/BannerCarousel";

const options: EmblaOptionsType = { loop: false };

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;
const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

interface CarouselProps {
  carouselData: CarouselResponseType[];
}
const Carousel = ({ carouselData }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.destroy();
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="carousel" className="overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {carouselData.map((banner) => (
                <div className="embla__slide" key={banner.title}>
                  <BannerCarousel data={banner}></BannerCarousel>
                </div>
              ))}
            </div>
            <div className="embla__dots ">
              {carouselData.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={"after:bg-foreground embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

import React from "react";
import GlobalAPI from "../_utils/GlobalAPI";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type SliderItem = {
  image: Array<{
    url: string;
  }>;
};

async function Slider() {
  const sliderList: SliderItem[] = await GlobalAPI.getSlider();
  return (
    <>
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => {
            const imageUrl = slider.image[0]?.url;
            if (!imageUrl) return null;
            return (
              <CarouselItem key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
                  width={1000}
                  height={400}
                  alt={`Slider ${index + 1}`}
                  priority={index === 0}
                  className="w-full h-[200px] md:h-[500px] object-cover rounded-2xl"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default Slider;

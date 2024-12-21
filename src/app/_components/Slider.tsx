"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useSliders } from "../_utils/tanstackQuery";
import { LoaderCircleIcon } from "lucide-react";

function Slider() {
  const { data: sliders = [], isLoading, error } = useSliders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircleIcon className="animate-spin h-16 w-16 text-green-600" />
        <span className="ml-3 text-green-600 text-xl">Loading sliders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">
          {error instanceof Error ? error.message : "An error occurred"}
        </span>
      </div>
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {sliders.map((slider, index) => {
          const imageUrl = slider.image[0]?.url;
          if (!imageUrl) return null;
          return (
            <CarouselItem key={`slider-${index}`}>
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
    </Carousel>
  );
}

export default Slider;

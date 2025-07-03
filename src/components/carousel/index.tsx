"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { FullScreenImageViewer } from "./viewer";

export interface CarouselImage {
  src: any;
  alt: string;
  from: string;
}

interface CarouselProps {
  images: CarouselImage[];
  className?: string;
}

export function Carousel({ images, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);

  const openImageViewer = (index: number) => {
    setViewerStartIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={cn("flex items-center justify-center p-4 border rounded-lg bg-muted", className)}>
        <p className="text-muted-foreground">No Content...</p>
      </div>
    );
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [goToPrevious, goToNext]);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto rounded-xl", className)}>
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="relative min-w-full flex-shrink-0 aspect-video"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onClick={() => openImageViewer(index)}
              />
              <div className="absolute bottom-4 left-4 text-sm text-white bg-muted/50 px-2 py-1 rounded">{item.from}</div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        aria-label="上一张"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        aria-label="下一张"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-300",
              currentIndex === index ? "bg-primary" : "bg-primary/50 hover:bg-primary/75"
            )}
            aria-label={`跳转到 ${index + 1}`}
          />
        ))}
      </div>

      <FullScreenImageViewer
        images={images}
        isOpen={isViewerOpen}
        onClose={closeImageViewer}
        startIndex={viewerStartIndex}
      />
    </div>
  );
}
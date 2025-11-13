"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type CarouselImage } from "./index";

interface FullScreenImageViewerProps {
  images: CarouselImage[];
  startIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenImageViewer({
  images,
  startIndex = 0,
  isOpen,
  onClose,
}: FullScreenImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // 当组件打开或 startIndex 变化时，同步当前索引
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

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

  // 键盘事件监听
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 点击背景关闭
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackgroundClick}
      aria-modal="true"
      role="dialog"
    >
      {/* 关闭按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 rounded-full text-white hover:bg-white/20 hover:text-white z-50"
        aria-label="关闭"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* 上一张按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white sm:left-10"
        aria-label="上一张"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* 下一张按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white sm:right-10"
        aria-label="下一张"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* 图片容器 */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
        <Image
          key={currentIndex} // 使用 key 强制重新渲染以获得过渡效果
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain animate-fade-in" // 使用 object-contain 保证图片完整显示
          sizes="100vw"
        />
      </div>

      {/* 图片计数器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

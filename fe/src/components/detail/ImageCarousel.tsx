import { Theme, css } from '@emotion/react';
import { useState, useRef } from 'react';
import errorImage from '@assets/image-error.png';

type Props = {
  images?: { imageId: number; imageUrl: string }[];
};

export const ImageCarousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [initialXCoord, setInitialXCoord] = useState<number>(0);
  const [deltaX, setDeltaX] = useState<number>(0); // 이동한 만큼의 값

  const targetRef = useRef<HTMLDivElement | null>(null);
  const imageWidth = targetRef.current?.parentElement?.clientWidth || 0;

  const getCurrentX = (event: React.MouseEvent | React.TouchEvent) =>
    'touches' in event ? event.touches[0].clientX : event.clientX;

  const onDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!targetRef.current) return;
    const currentXCoord = getCurrentX(event);

    setInitialXCoord(currentXCoord);
    setIsDragging(true);
  };

  const onDragging = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const diffX = getCurrentX(event) - initialXCoord;
    setDeltaX(diffX);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    onSlide();
    setDeltaX(0);
  };

  const SWIPE_RATIO = 1 / 3;

  const onSlide = () => {
    if (!targetRef.current) return;

    const isPrevSlide = deltaX > imageWidth! * SWIPE_RATIO;
    const isNextSlide = deltaX < -imageWidth! * SWIPE_RATIO;

    if (isNextSlide) {
      onSlideNext();
    }

    if (isPrevSlide) {
      onSlidePrev();
    }
  };

  const onSlidePrev = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prev) => prev - 1);
  };

  const onSlideNext = () => {
    if (images && currentIndex === images?.length - 1) return;

    setCurrentIndex((prev) => prev + 1);
  };

  const onErrorImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = errorImage;
  };

  return (
    <div
      css={(theme) => carouselStyle(theme, currentIndex, deltaX, imageWidth)}
    >
      <div
        className="thumbnail-box-track"
        ref={targetRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragging}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        /* TODO 터치 추가 */
        onTouchStart={onDragStart}
        onTouchMove={onDragging}
        onTouchEnd={onDragEnd}
      >
        {images?.map((image) => (
          <img
            key={image.imageId}
            src={image.imageUrl}
            alt={image.imageUrl}
            onError={onErrorImage}
          />
        ))}
      </div>
      <div className="thumbnail-page-nav">
        {currentIndex + 1} / {images?.length}
      </div>
    </div>
  );
};

// BUG 모바일은 레이아웃까지 움직임
const carouselStyle = (
  theme: Theme,
  index: number,
  deltaX: number,
  imageWidth: number,
) => {
  return css`
    position: relative;
    width: 100%;
    min-height: 200px;
    max-height: 491px;

    .thumbnail-box-track {
      position: relative;
      display: flex;
      align-items: center;
      width: fit-content;
      transform: translateX(${-index * imageWidth + deltaX}px);
      transition: transform ${deltaX ? '0ms' : '300ms'} ease-in-out;
      min-height: 200px;
    }

    .thumbnail-box-track::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.24) 0%,
        rgba(0, 0, 0, 0.138832) 9.16%,
        rgba(0, 0, 0, 0) 32.27%
      );
      pointer-events: none;
    }

    img {
      min-width: ${imageWidth}px;
      max-width: ${imageWidth}px;
      height: 100%;
      object-fit: contain;
      -webkit-user-drag: none;
    }

    .thumbnail-page-nav {
      position: absolute;
      bottom: 16px;
      right: 16px;
      z-index: 1;
      display: inline-flex;
      padding: 8px 16px;
      align-items: flex-start;
      gap: 4px;
      border-radius: 16px;
      background: ${theme.color.neutral.backgroundBlur};

      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }
  `;
};

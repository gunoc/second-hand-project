import { Theme, css } from '@emotion/react';
import { useState, useRef } from 'react';

type Props = {
  imageUrls?: string[];
};

const randomGitProfile = [
  'https://avatars.githubusercontent.com/u/52685259?v=4',
  'https://avatars.githubusercontent.com/u/52685229?v=4',
  'https://avatars.githubusercontent.com/u/52685219?v=4',
]; // TODO 데이터로 교체

export const ImageCarousel: React.FC<Props> = ({
  imageUrls = randomGitProfile,
}) => {
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
    if (currentIndex === imageUrls?.length - 1) return;

    setCurrentIndex((prev) => prev + 1);
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
        {imageUrls?.map((url, index) => (
          <img src={url} key={index} />
        ))}
      </div>
      <div className="thumbnail-page-nav">
        {currentIndex + 1} / {imageUrls?.length}
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
    max-height: 491px;
    width: 100%;

    .thumbnail-box-track {
      display: flex;
      width: fit-content;
      transform: translateX(${-index * imageWidth + deltaX}px);
      transition: transform ${deltaX ? '0ms' : '300ms'} ease-in-out;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

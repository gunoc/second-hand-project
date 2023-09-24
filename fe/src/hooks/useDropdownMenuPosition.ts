import { useEffect, useRef, useState } from 'react';

type DropdownMenuPosition = {
  appLayout: HTMLElement;
};

export const useDropdownMenuPosition = ({
  appLayout,
}: DropdownMenuPosition) => {
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const [appLayoutRect, setAppLayoutRect] = useState<DOMRect>(appLayout?.getBoundingClientRect());

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appLayout) {
      setAppLayoutRect(appLayout.getBoundingClientRect());
    }
  }, [appLayout]);

  const calculatePosition = () => {
    const dropdownRect = dropdownRef.current?.getBoundingClientRect();

    const topSpace = (dropdownRect?.top ?? 0) - appLayoutRect.top;
    const bottomSpace = appLayoutRect.bottom - (dropdownRect?.bottom ?? 0);
    const leftSpace = (dropdownRect?.right ?? 0) - appLayoutRect.left;
    const rightSpace = appLayoutRect.right - (dropdownRect?.left ?? 0);

    const xPositionStyle =
      leftSpace > rightSpace
        ? { right: appLayoutRect.right - (dropdownRect?.right ?? 0) }
        : { left: (dropdownRect?.left ?? 0) - appLayoutRect.left };
    const yPositionStyle =
      topSpace > bottomSpace
        ? { bottom: appLayoutRect.bottom - (dropdownRect?.top ?? 0) }
        : { top: (dropdownRect?.bottom ?? 0) - appLayoutRect.top };

    setPositionStyle({ ...xPositionStyle, ...yPositionStyle });
  };

  return {
    dropdownRef,
    dropdownMenuPositionStyle: positionStyle,
    calcDropdownMenuPosition: calculatePosition,
  };
};

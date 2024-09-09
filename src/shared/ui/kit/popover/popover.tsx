import React from "react";

export const Popover: React.FC<{
  children?: React.ReactNode;
  position: { x: number; y: number };
  isOpen?: boolean;
}> = ({ children, position, isOpen = false }) => {
  const [popoverWidth, setPopoverWidth] = React.useState(0);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (popoverRef.current) {
      setPopoverWidth(popoverRef.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div
            ref={popoverRef}
            className="absolute z-10 rounded-[10px] border border-[#43425D] bg-white px-[26px]"
            style={{ top: `${position.y}px`, left: `${position.x - popoverWidth / 2}px` }}
          >
            <div className="relative -top-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-b-8 border-l-[5.5px] border-r-[5.5px] border-transparent border-b-[#43425D]" />
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Popover;

import { useEffect, useRef, useState } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

const ZoomableImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [touchStart, setTouchStart] = useState(null);
  const imgRef = useRef(null);



  // Desktop cursor-based zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  // Mobile center zoom
  const toggleMobileZoom = () => {
    setPosition({ x: 50, y: 50 });
    setIsZoomed((z) => !z);
  };
//   mobile touch actions
useEffect(() => {
  const img = imgRef.current;
  if (!img) return;

  const onStart = (e) => {
    if (!isZoomed) return;
    e.preventDefault();

    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      posX: position.x,
      posY: position.y,
    });
  };

  const onMove = (e) => {
    if (!isZoomed || !touchStart) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    setPosition({
      x: Math.min(100, Math.max(0, touchStart.posX - deltaX * 0.15)),
      y: Math.min(100, Math.max(0, touchStart.posY - deltaY * 0.15)),
    });
  };

  const onEnd = () => {
    setTouchStart(null);
  };

  img.addEventListener("touchstart", onStart, { passive: false });
  img.addEventListener("touchmove", onMove, { passive: false });
  img.addEventListener("touchend", onEnd);

  return () => {
    img.removeEventListener("touchstart", onStart);
    img.removeEventListener("touchmove", onMove);
    img.removeEventListener("touchend", onEnd);
  };
}, [isZoomed, touchStart]);



  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Desktop */}
      <div
        className={`hidden md:block w-full h-full ${
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={() => setIsZoomed((z) => !z)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full h-full touch-none overscroll-contain">
       <img
  src={src}
  alt={alt}
  ref={imgRef}
  
  className="w-full h-full object-cover transition-transform duration-300"
  style={{
    transform: isZoomed ? "scale(2)" : "scale(1)",
    transformOrigin: `${position.x}% ${position.y}%`,
    touchAction:'none'
  }}
/>

        {/* Mobile zoom icon */}
        <button
          onClick={toggleMobileZoom}
          className="absolute bottom-6 right-6 cursor-pointer bg-white/90 p-3 rounded-full shadow-lg"
        >
          {isZoomed ? (
            <FiZoomOut className="text-lg text-black" />
          ) : (
            <FiZoomIn className="text-lg text-black" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ZoomableImage;


import React, { useEffect, useRef } from 'react';

interface RotatingCubeProps {
  size?: number;
  className?: string;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ size = 120, className }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    let rotateX = 0;
    let rotateY = 0;
    let autoRotateX = 0.3;
    let autoRotateY = 0.5;
    
    const updateRotation = () => {
      if (!cubeRef.current) return;
      
      rotateX += autoRotateX;
      rotateY += autoRotateY;
      
      cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      animationFrameId = requestAnimationFrame(updateRotation);
    };
    
    updateRotation();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  const faceSize = size;
  const translateZ = faceSize / 2;
  
  return (
    <div 
      className={`${className || ''} relative`} 
      style={{ height: `${size}px`, width: `${size}px`, perspective: `${size * 2}px` }}
    >
      <div 
        ref={cubeRef}
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(0deg) rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">TastyHub</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `rotateY(180deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">Quality</span>
        </div>
        
        {/* Left */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `rotateY(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">Fresh</span>
        </div>
        
        {/* Right */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">Nutrition</span>
        </div>
        
        {/* Top */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `rotateX(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">Sustainable</span>
        </div>
        
        {/* Bottom */}
        <div 
          className="absolute w-full h-full flex items-center justify-center bg-primary/20 backdrop-blur-sm border border-white/20 rounded-lg"
          style={{ transform: `rotateX(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-sm font-medium">Healthy</span>
        </div>
      </div>
    </div>
  );
};

export default RotatingCube;

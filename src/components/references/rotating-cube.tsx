
import React, { useEffect, useRef } from 'react';

interface RotatingCubeProps {
  size?: number;
  className?: string;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ size = 150, className }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    let rotateX = 0;
    let rotateY = 0;
    let autoRotateX = 0.1;
    let autoRotateY = 0.2;
    
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
    <div className={`perspective-${size * 2} ${className || ''}`} style={{ perspective: `${size * 2}px`, height: `${size}px`, width: `${size}px` }}>
      <div 
        ref={cubeRef}
        className="relative transform-style-3d"
        style={{ 
          width: `${faceSize}px`, 
          height: `${faceSize}px`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">TastyHub</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(180deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">Quality</span>
        </div>
        
        {/* Left */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">Fresh</span>
        </div>
        
        {/* Right */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">Nutrition</span>
        </div>
        
        {/* Top */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateX(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">Sustainable</span>
        </div>
        
        {/* Bottom */}
        <div 
          className="absolute w-full h-full bg-primary/30 border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateX(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-lg font-bold">Healthy</span>
        </div>
      </div>
    </div>
  );
};

export default RotatingCube;

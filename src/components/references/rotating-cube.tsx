
import React, { useEffect, useRef } from 'react';

interface RotatingCubeProps {
  size?: number;
  className?: string;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ size = 200, className }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    let rotateX = 0;
    let rotateY = 0;
    let autoRotateX = 0.2;
    let autoRotateY = 0.3;
    
    const updateRotation = () => {
      if (!cubeRef.current) return;
      
      rotateX += autoRotateX;
      rotateY += autoRotateY;
      
      cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      animationFrameId = requestAnimationFrame(updateRotation);
    };
    
    updateRotation();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cubeRef.current) return;
      
      const cubeRect = cubeRef.current.getBoundingClientRect();
      const cubeCenterX = cubeRect.left + cubeRect.width / 2;
      const cubeCenterY = cubeRect.top + cubeRect.height / 2;
      
      const deltaX = (e.clientX - cubeCenterX) / 20;
      const deltaY = (e.clientY - cubeCenterY) / 20;
      
      autoRotateX = deltaY * 0.05;
      autoRotateY = deltaX * 0.05;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const faceSize = size;
  const translateZ = faceSize / 2;
  
  return (
    <div className={`perspective-${size * 2} ${className}`} style={{ perspective: `${size * 2}px` }}>
      <div 
        ref={cubeRef}
        className="relative transform-style-3d transition-transform duration-300 animate-float"
        style={{ 
          width: `${faceSize}px`, 
          height: `${faceSize}px`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front */}
        <div 
          className="absolute w-full h-full bg-gradient-to-tr from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">TastyHub</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute w-full h-full bg-gradient-to-bl from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(180deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">Culinary Innovation</span>
        </div>
        
        {/* Left */}
        <div 
          className="absolute w-full h-full bg-gradient-to-t from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">Quality</span>
        </div>
        
        {/* Right */}
        <div 
          className="absolute w-full h-full bg-gradient-to-b from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">Nutrition</span>
        </div>
        
        {/* Top */}
        <div 
          className="absolute w-full h-full bg-gradient-to-r from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateX(90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">Sustainability</span>
        </div>
        
        {/* Bottom */}
        <div 
          className="absolute w-full h-full bg-gradient-to-l from-primary/80 to-primary/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: `rotateX(-90deg) translateZ(${translateZ}px)` }}
        >
          <span className="text-white text-2xl font-bold">Community</span>
        </div>
      </div>
    </div>
  );
};

export default RotatingCube;

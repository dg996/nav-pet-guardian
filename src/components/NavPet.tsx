import { useState, useEffect } from 'react';
import { Cat, Dog, Rabbit, Moon, Sun } from 'lucide-react';
import { useIdleTimer } from '@/lib/hooks/useIdleTimer';
import { cn } from '@/lib/utils';

type PetType = 'cat' | 'dog' | 'rabbit';

interface NavPetProps {
  type: PetType;
  name: string;
}

const petIcons = {
  cat: Cat,
  dog: Dog,
  rabbit: Rabbit,
};

export const NavPet = ({ type, name }: NavPetProps) => {
  const isIdle = useIdleTimer(30000);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 20 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 100, y: 20 });
  const PetIcon = petIcons[type];

  useEffect(() => {
    console.log('Setting up mouse move listener');
    const handleMouseMove = (e: MouseEvent) => {
      // Only update target position when not idle
      if (!isIdle) {
        setTargetPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isIdle]);

  useEffect(() => {
    console.log('Animating pet movement');
    const animatePosition = () => {
      setPosition(current => ({
        x: current.x + (targetPosition.x - current.x) * 0.05,
        y: current.y + (targetPosition.y - current.y) * 0.05
      }));
      requestAnimationFrame(animatePosition);
    };

    const animation = requestAnimationFrame(animatePosition);
    return () => cancelAnimationFrame(animation);
  }, [targetPosition]);

  return (
    <div
      className={cn(
        "fixed p-3 rounded-full bg-white/80 backdrop-blur-sm",
        "shadow-lg transition-opacity duration-300",
        "cursor-pointer",
        isIdle ? "animate-sleep" : "animate-wake"
      )}
      style={{
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        transition: 'transform 0.05s linear'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <PetIcon className="w-8 h-8 text-primary" />
        {isIdle ? (
          <Moon className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />
        ) : (
          <Sun className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />
        )}
      </div>
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white/90 px-2 py-1 rounded shadow-sm">
          {name}
        </div>
      )}
    </div>
  );
};
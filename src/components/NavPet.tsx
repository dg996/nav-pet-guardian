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
  const isIdle = useIdleTimer(30000); // 30 seconds for demo purposes
  const [isHovered, setIsHovered] = useState(false);
  const PetIcon = petIcons[type];

  return (
    <div
      className={cn(
        "fixed top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm",
        "shadow-lg transition-all duration-300",
        "animate-float cursor-pointer",
        isIdle ? "animate-sleep" : "animate-wake"
      )}
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
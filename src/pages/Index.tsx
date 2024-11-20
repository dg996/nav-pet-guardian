import { useState } from 'react';
import { NavPet } from '@/components/NavPet';
import { PetCustomization } from '@/components/PetCustomization';

const Index = () => {
  const [pet, setPet] = useState<{ type: string; name: string } | null>(null);

  const handlePetCustomization = (type: string, name: string) => {
    setPet({ type, name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {!pet ? (
        <div className="container flex items-center justify-center min-h-screen">
          <PetCustomization onComplete={handlePetCustomization} />
        </div>
      ) : (
        <>
          <div className="container py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Welcome to Your Workspace
            </h1>
            <p className="mt-4 text-center text-gray-600">
              Your pet {pet.name} will keep you company while you work!
            </p>
          </div>
          <NavPet type={pet.type as 'cat' | 'dog' | 'rabbit'} name={pet.name} />
        </>
      )}
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cat, Dog, Rabbit } from 'lucide-react';
import { toast } from 'sonner';

interface PetCustomizationProps {
  onComplete: (type: string, name: string) => void;
}

export const PetCustomization = ({ onComplete }: PetCustomizationProps) => {
  const [selectedType, setSelectedType] = useState<string>('cat');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please give your pet a name!');
      return;
    }
    onComplete(selectedType, name);
    toast.success(`${name} is now your companion!`);
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Choose Your Pet</h2>
      
      <div className="flex justify-center gap-4">
        {[
          { type: 'cat', Icon: Cat },
          { type: 'dog', Icon: Dog },
          { type: 'rabbit', Icon: Rabbit },
        ].map(({ type, Icon }) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            className="p-6"
            onClick={() => setSelectedType(type)}
          >
            <Icon className="w-8 h-8" />
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Give your pet a name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center"
        />
        <Button type="submit" className="w-full">
          Start Adventure!
        </Button>
      </form>
    </Card>
  );
};
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  onClick: () => void;
}

const ProductCard = ({ name, description, price, image, onClick }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-[var(--shadow-hover)]" onClick={onClick}>
      <div className="aspect-square overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <p className="text-xl font-bold text-primary">{price}</p>
      </div>
    </Card>
  );
};

export default ProductCard;

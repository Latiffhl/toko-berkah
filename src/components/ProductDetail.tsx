import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomWhatsAppButton from './CustomWhatsAppButton'; // Sesuaikan path import jika perlu
// Hapus import { Button } dari Shadcn karena sudah diganti
import { MessageCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

const ProductDetail = ({ product, isOpen, onClose, whatsappNumber }: ProductDetailProps): JSX.Element | null => {
  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(`Halo, saya tertarik untuk memesan:\n\nNama Produk: ${product.name}\nHarga: ${product.price}\n\nMohon info lebih lanjut. Terima kasih!`);
    // Memastikan format nomor WhatsApp dimulai dengan 62 (tanpa tanda +)
    const cleanNumber = whatsappNumber.startsWith('+') ? whatsappNumber.substring(1) : whatsappNumber;
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" w-[95vw] mx-auto  overflow-y-hidden sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            {/* Memastikan atribut alt ada untuk aksesibilitas */}
            <img src={product.image} alt={`Gambar ${product.name}`} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-3">
            <p className="text-3xl font-bold text-primary">{product.price}</p>
            <p className="text-mutee}d-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Menggunakan Custom WhatsApp Button yang baru */}
          <CustomWhatsAppButton onClick={handleWhatsAppOrder} className="shadow-md">
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="h-6 w-6" />
            Pesan via WhatsApp
          </CustomWhatsAppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;

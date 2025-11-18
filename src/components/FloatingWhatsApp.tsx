import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

const FloatingWhatsApp = ({ phoneNumber }: FloatingWhatsAppProps) => {
  const handleClick = () => {
    const message = encodeURIComponent('Halo, saya ingin bertanya tentang produk Anda.');
    const cleanNumber = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <Button onClick={handleClick} className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg z-50 p-0 animate-whatsapp-shake" size="icon">
      <img src="/whatsapp-icon.png" alt="WhatsApp" className="h-10 w-10 justify-center mr-0.5" />
    </Button>
  );
};

export default FloatingWhatsApp;

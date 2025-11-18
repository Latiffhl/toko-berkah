import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  photoPlaceholder: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Siti Markonah',
    rating: 4,
    comment: 'Produk berkualitas dengan harga terjangkau. Pelayanan ramah dan cepat. Sangat puas dengan pembelian saya!',
    photoPlaceholder: true,
  },
  {
    id: 2,
    name: 'Jamaludin',
    rating: 5,
    comment: 'Sudah langganan di sini bertahun-tahun. Produk selalu fresh dan original. Highly recommended!',
    photoPlaceholder: true,
  },
  {
    id: 3,
    name: 'Ahmad Yani',
    rating: 5,
    comment: 'Pengiriman cepat dan packaging rapi. Produk sesuai deskripsi. Pasti akan order lagi!',
    photoPlaceholder: true,
  },
  {
    id: 4,
    name: 'Azzahra',
    rating: 5,
    comment: 'Toko terpercaya dengan produk lokal pilihan. Kualitas terjamin dan harga bersahabat.',
    photoPlaceholder: true,
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">Testimoni Pelanggan</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">Apa kata pelanggan kami tentang produk dan layanan Toko Berkah Jaya</p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-6 hover:bg-accent/50 transition-colors duration-300">
                  <div className="flex gap-6">
                    {/* Photo Section - Left */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">{testimonial.name}</h3>

                      {/* Rating */}
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-muted-foreground text-sm leading-relaxed">"{testimonial.comment}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp phoneNumber="6281234567890" />
    </div>
  );
};

export default Testimonials;

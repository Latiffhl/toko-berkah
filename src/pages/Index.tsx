import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroBanner from '@/assets/hero-banner.jpg';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';

import RunningTextMarquee from '@/components/LogoLoop/LogoLoop';
const PROMOSI_TOKO = ['DISKON 10% untuk pembelian di atas 1 Juta!', 'Gratis Ongkir untuk wilayah Jakarta Pusat!', 'Produk Lokal Kualitas Ekspor, Cek Sekarang!', 'Promo Spesial Akhir Bulan, Jangan Sampai Ketinggalan!'];

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp toko

const products: Product[] = [
  {
    id: 1,
    name: 'Kopi Arabika Premium',
    description: 'Kopi arabika pilihan dengan cita rasa khas Indonesia. Dipanggang sempurna untuk menghasilkan aroma dan rasa yang istimewa. Cocok untuk kopi manual brew.',
    price: 'Rp 85.000',
    image: product1,
  },
  {
    id: 2,
    name: 'Sabun Natural Organik',
    description: 'Sabun handmade berbahan alami tanpa pewangi sintetis. Lembut di kulit, cocok untuk semua jenis kulit termasuk kulit sensitif.',
    price: 'Rp 35.000',
    image: product2,
  },
  {
    id: 3,
    name: 'Kain Batik Tulis',
    description: 'Batik tulis asli dengan motif tradisional Indonesia. Dikerjakan oleh pengrajin berpengalaman dengan kualitas premium. Cocok untuk berbagai keperluan.',
    price: 'Rp 450.000',
    image: product3,
  },
  {
    id: 4,
    name: 'Set Alat Masak Kayu',
    description: 'Peralatan dapur dari kayu jati berkualitas tinggi. Tahan lama, anti bakteri alami, dan aman untuk peralatan masak anti lengket.',
    price: 'Rp 125.000',
    image: product4,
  },
  {
    id: 5,
    name: 'Madu Murni Organik',
    description: 'Madu murni 100% dari peternakan lebah lokal. Tanpa campuran gula atau bahan pengawet. Kaya akan manfaat untuk kesehatan.',
    price: 'Rp 95.000',
    image: product5,
  },
  {
    id: 6,
    name: 'Keranjang Rotan Anyaman',
    description: 'Keranjang anyaman rotan handmade dengan finishing halus. Multifungsi untuk penyimpanan atau dekorasi rumah. Produk ramah lingkungan.',
    price: 'Rp 175.000',
    image: product6,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('semua');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'semua' ||
      (categoryFilter === 'makanan' && [1, 5].includes(product.id)) ||
      (categoryFilter === 'kerajinan' && [3, 6].includes(product.id)) ||
      (categoryFilter === 'kecantikan' && [2].includes(product.id)) ||
      (categoryFilter === 'peralatan' && [4].includes(product.id));

    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden mt-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBanner})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">Toko Berkah Jaya</h1>
            <p className="text-xl text-white/90 md:text-2xl">Produk Lokal Berkualitas untuk Keluarga Indonesia</p>
          </div>
        </div>
      </section>
      <div className="bg-primary text-white py-2">
        <RunningTextMarquee
          promos={PROMOSI_TOKO}
          speed={50} // Kecepatan lebih lambat
          gap={100} // Jarak antar teks lebih lebar
          pauseOnHover={true} // Berhenti saat di hover
        />
      </div>
      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-14 pl-12 text-lg" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] h-14">
                <SelectValue placeholder="Filter Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Produk</SelectItem>
                <SelectItem value="makanan">Makanan & Minuman</SelectItem>
                <SelectItem value="kerajinan">Kerajinan</SelectItem>
                <SelectItem value="kecantikan">Kecantikan</SelectItem>
                <SelectItem value="peralatan">Peralatan Rumah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Katalog Produk</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} onClick={() => handleProductClick(product)} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl text-muted-foreground">Produk tidak ditemukan. Coba kata kunci lain.</p>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductDetail product={selectedProduct} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} whatsappNumber={WHATSAPP_NUMBER} />

      <Footer />
      <FloatingWhatsApp phoneNumber={WHATSAPP_NUMBER} />
    </div>
  );
};

export default Index;

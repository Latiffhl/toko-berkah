import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { MapPin, Clock } from 'lucide-react';
import Profile from '@/assets/profile.webp';

const profile = {
  name: 'Toko Berkah Jaya',
  role: 'Pemilik & Pendiri',
  image: Profile,
  description:
    'Dengan pengalaman lebih dari 5 tahun di industri ritel, saya berkomitmen untuk menyediakan produk berkualitas tinggi dan layanan terbaik bagi pelanggan kami. Visi saya adalah menjadikan Toko Berkah Jaya sebagai destinasi utama untuk kebutuhan sehari-hari masyarakat Indonesia.',
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">Tentang Kami</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">Kenali lebih dekat cerita dan perjalanan Toko Berkah Jaya</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Photo Placeholder */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <img src={profile.image} alt="Toko Berkah Jaya" className="object-cover w-full h-full" />
            </div>

            {/* Story */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center md:text-start">Kisah Kami</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Toko Berkah Jaya didirikan dengan semangat untuk menghadirkan produk-produk lokal berkualitas kepada masyarakat Indonesia. Kami percaya bahwa setiap produk lokal memiliki cerita dan keunikan tersendiri.</p>
                <p>Dengan pengalaman lebih dari 5 tahun, kami terus berkomitmen untuk memberikan pelayanan terbaik dan produk pilihan yang dapat memenuhi kebutuhan keluarga Indonesia.</p>
                <p>Kepercayaan pelanggan adalah aset berharga kami. Oleh karena itu, kami selalu menjaga kualitas produk dan memberikan harga yang kompetitif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours Section (Waktu Buka/Tutup Baru) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Jam Operasional</h2>
          <div className="max-w-xl mx-auto p-8 rounded-lg border shadow-sm">
            <div className="flex items-center justify-center text-primary mb-6">
              <Clock className="h-8 w-8 mr-3" />
              <p className="text-2xl font-semibold">Buka Setiap Hari!</p>
            </div>

            <ul className="space-y-3 text-lg">
              {/* Hari Kerja */}
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-foreground">Senin - Jumat</span>
                <span className="text-right text-muted-foreground">08:00 WIB - 20:00 WIB</span>
              </li>
              {/* Akhir Pekan */}
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-foreground">Sabtu - Minggu</span>
                <span className="text-right text-muted-foreground">09:00 WIB - 18:00 WIB</span>
              </li>
              {/* Catatan Khusus (Opsional) */}
              <li className="pt-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                <p>*Jam dapat berubah saat hari libur nasional. Mohon cek pengumuman.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Lokasi Toko</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1234567890" // Ganti dengan URL Google Maps yang sesungguhnya
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Toko Berkah Jaya"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                <MapPin className="inline h-4 w-4 mr-2 text-primary" />
                Jl. Contoh No. 123, Jakarta Pusat, DKI Jakarta 10110
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp phoneNumber="6281234567890" />
    </div>
  );
};

export default About;

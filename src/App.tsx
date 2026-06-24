import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import athenaImg from './assets/athena.png';
import heroImg from './assets/hero.jpg';
import logoImg from './assets/logo.png';
import arrow from './assets/arrow.svg';
import rippleHero from './assets/ripple-hero.png';
import Background60Img from './assets/60-background.png';
import photo1Img from './assets/photo1.jpg';
import arrowBlackImg from './assets/arrow-black.png';

function App() {
  // Lift state up ke sini biar Navbar bisa dikontrol dari luar kalau butuh
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Track active card buat efek hover. Hardcode index 1 dulu buat default state-nya
  const [activeIndex, setActiveIndex] = useState(1);
  

  // Dummy data buat cards
  const cards = [
    {
      num: '01',
      title: 'Firm Closure\nDates',
      desc: 'Lorem ipsum dolor sit\namet Lorem ipsum',
      img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop',
    },
    {
      num: '02',
      title: 'Pro Bono\nServices',
      desc: 'Lorem ipsum dolor sit\namet Lorem ipsum',
      img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop',
    },
    {
      num: '03',
      title: "Members'\nLibrary",
      desc: 'Lorem ipsum dolor sit\namet Lorem ipsum',
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop',
    },
    {
      num: '04',
      title: 'Specialists\nDirectory',
      desc: 'Lorem ipsum dolor sit\namet Lorem ipsum',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop', 
    },
  ];

  // State untuk melacak item aktif di section Legal Support
  const [activeSupportIndex, setActiveSupportIndex] = useState(1);

  // Dummy data untuk Legal Support
  const legalSupports = [
    { type: 'Lawyer', title: 'Feedback on Law Reforms' },
    { type: 'Public', title: 'Alternative Dispute Resolution Schemes' },
    { type: 'Lawyer', title: "Members' Support Schemes" },
    { type: 'Lawyer', title: 'Future Lawyering Research Portal' },
  ];

  // --- STATE UNTUK MEDIA & PRESS (NEWS API) ---
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mendefinisikan tipe data untuk artikel berita
interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  url: string;
}

// Mendefinisikan struktur balikan data dari The Guardian API
interface GuardianApiItem {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  sectionName: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
  };
}
  // 1. FETCH API (The Guardian API)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Menggunakan The Guardian API. 'test' adalah API key gratis untuk development.
        // Mencari berita terkait hukum dengan tambahan field gambar (thumbnail) dan deskripsi (trailText)
        const res = await fetch('https://content.guardianapis.com/search?q=law%20AND%20society&show-fields=thumbnail,trailText&page-size=8&api-key=test');
        
        if (!res.ok) throw new Error('Failed to fetch news data');
        
        const data = await res.json();

        // Mapping response dari API agar sesuai dengan kebutuhan desain card kita
        const formattedArticles = data.response.results.map((item: GuardianApiItem) => {
          // Format tanggal menjadi DD MMM YYYY (Contoh: 24 May 2025)
          const rawDate = new Date(item.webPublicationDate);
          const formattedDate = rawDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

          return {
            id: item.id,
            title: item.webTitle,
            date: formattedDate,
            category: item.sectionName === 'Law' ? 'Press Release' : 'Media',
            // Membersihkan tag HTML dari excerpt menggunakan Regex
            excerpt: item.fields?.trailText?.replace(/(<([^>]+)>)/gi, "") || "Read the full article for more details on this legal update.",
            // Fallback image jika API tidak mengirimkan thumbnail
            image: item.fields?.thumbnail || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
            url: item.webUrl
          };
        });

        setArticles(formattedArticles);
        setLoadingNews(false);
      } catch (err) {
        if (err instanceof Error) {
          setNewsError(err.message);
        } else {
          setNewsError(String(err));
        }
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  // 2. BONUS: AUTO-PLAY CAROUSEL & PAUSE ON HOVER
  useEffect(() => {
    if (isHovered || loadingNews || newsError) return;
    
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // Jika scroll sudah mentok di kanan, kembalikan ke awal (Loop)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll bergeser ke kanan sejauh lebar 1 kartu
          const cardWidth = carouselRef.current.children[0].clientWidth;
          carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3500); // Bergerak otomatis setiap 3.5 detik

    return () => clearInterval(interval);
  }, [isHovered, loadingNews, newsError]);

  // Fungsi untuk tombol panah navigasi manual
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].clientWidth;
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -cardWidth : cardWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-white relative overflow-x-hidden">
      <Navbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      
      <div className="w-full">
        <main className="flex flex-col">
          
          {/* --- HERO SECTION --- */}
          <div className="relative w-full h-screen overflow-hidden bg-brand-bg-white">
            <img 
              src={heroImg} 
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40" 
            />

            <div className="absolute z-10 transform 
                            -bottom-[125px] -left-[45px] w-[700px] translate-x-[-25%] translate-y-[15%] 
                            md:left-[0px] md:w-[850px] md:-translate-x-[20%] md:translate-y-[10%] 
                            xl:left-[50px] xl:w-[1000px] xl:-translate-x-[15%] xl:translate-y-[5%]">
              
              <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <div className="absolute opacity-80 bg-[#760525] 
                                left-[35px] w-[50%] h-[78px] bottom-[550px] rotate-[37deg]"></div>
                
                <div className="absolute opacity-80 bg-[#AA0433] 
                                left-[30px] w-[50%] h-[68px] bottom-[45%] -rotate-[50deg]"></div>
              </div>

              <img 
                src={athenaImg} 
                alt="Athena" 
                className="relative z-10 w-full h-auto max-w-none -scale-x-100 object-top grayscale-85" 
              />
            </div>
            
            <div className="relative z-20 h-full flex flex-col justify-start pt-[26px] pl-8 md:pl-16 lg:pl-24 pr-28 md:pr-32">
              <img
                src={logoImg}
                alt="Law Society Logo"
                className="w-[162px] md:w-64 h-auto mb-10"
              />

              <h1 className="font-heading text-[28px] md:text-[36px] font-medium text-brand-black leading-none tracking-normal uppercase">
                BECOME AN <br />
                <span className="text-brand-maroon pl-[16px]">AFFILIATE</span> OF THE <br />
                LAW SOCIETY
              </h1>

              <p className="font-body text-[16px] font-normal text-brand-black/80 mt-6 max-w-sm md:max-w-md leading-[30px] tracking-[0.01em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dict...
              </p>

              <a 
                href="#" 
                className="text-[16px] md:text-[18px] group inline-flex items-center mt-8 font-body text-brand-gold font-bold tracking-widest hover:text-brand-maroon transition-colors"
              >
                FIND LAWYER 
                <img
                  src={arrow}
                  alt="Arrow Icon"
                  className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className={`absolute -bottom-[200px] left-0 w-full pointer-events-none z-[70] transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className="w-full h-[400px] brightness-0 invert" 
              />
            </div>
          </div>
          
          {/* --- ABOUT / WHAT WE DO SECTION --- */}
          <div className="w-full bg-brand-bg-white p-16 md:p-16 lg:px-24">
            <div className="max-w-xl lg:max-w-5xl mx-auto">
              <div className="relative right-[38px] flex items-center space-x-3 mb-5">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#333333]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <span className="font-heading text-lg md:text-xl text-brand-maroon uppercase tracking-wider underline underline-offset-[6px] decoration-2">
                  WHAT WE DO
                </span>
              </div>

              <h2 className="font-heading text-[28px] md:text-[38px] lg:text-[42px] text-brand-black leading-[1.2] mb-6">
                WE CARRY OUT VARIOUS <br className="hidden md:block lg:hidden" />
                STATUTORY FUNCTIONS
              </h2>

              <p className="font-body text-[16px] md:text-[18px] text-brand-black/80 leading-relaxed lg:max-w-4xl">
                The mission of the Law Society is to serve its members and the public by sustaining an independent bar which upholds the rule of law and ensures access to justice ... 
                <span className="text-brand-gold font-bold cursor-pointer hover:underline ml-2 hover:text-brand-maroon transition-colors">
                  Read more
                </span>
              </p>
            </div>
          </div>

          {/* --- INTERACTIVE GRID CARDS --- */}
          {/* --- INTERACTIVE GRID CARDS --- */}
          <div className="w-full bg-brand-bg-white ">
            {/* Grid 2 kolom di mobile, 4 kolom di desktop */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 border-y border-gray-300">
              
              {cards.map((card, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={card.num}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="flex flex-col border-r border-b lg:border-b-0 border-gray-300 cursor-pointer group transition-all duration-300"
                  >
                    {/* Tinggi & padding disesuaikan untuk layar HP dan Desktop */}
                    <div className="relative h-[200px] md:h-[320px] lg:h-[380px] w-full overflow-hidden flex flex-col justify-between p-4 md:p-8">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale z-0"
                      />
                      
                      {/* OVERLAY: Menghapus md: agar langsung berubah gelap di semua lebar layar saat active */}
                      <div
                        className={`absolute inset-0 z-10 transition-colors duration-300 ${
                          isActive ? 'bg-[#4A4A4A]/90' : 'bg-[#EFEFEF]/85'
                        }`}
                      ></div>

                      {/* ANGKA: Menghapus md: agar warna berubah abu terang di semua ukuran layar saat active */}
                      <div
                        className={`relative z-20 text-[15px] md:text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {card.num}
                      </div>

                      <div className="relative z-20 mt-auto mb-2 md:mb-4">
                        {/* JUDUL: Diperbarui dengan font-normal (400), ukuran 26px di desktop, dan uppercase */}
                        <h3
                          className={`font-heading text-[18px] md:text-[22px] lg:text-[26px] font-normal leading-[1.1] whitespace-pre-line transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-brand-black'
                          }`}
                        >
                          {card.title}
                        </h3>
                        
                          {/* DESKRIPSI: Menghapus md: agar laci deskripsi bisa terbuka di mobile maupun desktop saat active */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isActive ? 'max-h-24 opacity-100 mt-2 md:mt-3' : 'max-h-0 opacity-0 mt-0'
                            }`}
                          >
                          <p className="font-body text-[18px] font-normal text-gray-300 whitespace-pre-line leading-[30px] tracking-normal">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER BAWAH: Menghapus md: bg-[#987F55] agar background otomatis emas di layar manapun saat active */}
                    <div
                      className={`h-[50px] md:h-[70px] border-t border-gray-300 flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-[#987F55]' : 'bg-[#F9F9F9]'
                      }`}
                    >
                      {/* Menggunakan kondisi index === 2 yang sudah diperbaiki sebelumnya */}
                      <div
                        className={`flex ${index === 2 ? 'md:mr-[60px]' : ''} mr-[90px] items-center space-x-2 text-[12px] md:text-sm transition-colors duration-300 ${
                          isActive ? 'text-white font-bold tracking-widest' : 'text-gray-500'
                        }`}
                      >
                        {isActive && (
                          <span className="hidden md:inline font-body text-[18px] font-semibold uppercase leading-[30px] tracking-[0.01em]">
                            MORE DETAIL
                          </span>
                        )}
                        <div className="flex items-center">
                          <img
                            src={arrowBlackImg}
                            alt="Arrow Icon"
                            className="scale-90 relative right-[0px]"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
          
          {/* --- 60TH ANNIVERSARY BANNER --- */}
          <div className="relative w-full h-[400px] md:h-[550px] flex flex-col items-center justify-center bg-[#222222]">
            
            {/* Background Image */}
            <img
              src={Background60Img}
              alt="60th Anniversary Background"
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
            />

            {/* Container Konten (Sama seperti kodemu) */}
            <div className="relative z-20 flex flex-col items-center w-full max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-auto flex items-center justify-center py-5 md:py-6 px-6 md:px-20 mb-8 md:mb-12">
                {/* <div className="md:top-[60px] top-[64px] opacity-70 absolute inset-0 bg-[#A31636] skew-x-[-30deg] shadow-lg h-[90px]"></div> */}
                <div className="md:top-[60px]  top-[64px] opacity-80 absolute bg-[#A31636] -skew-x-[30deg] shadow-lg h-[90px] w-[84%] md:w-[90%] left-[47%] -translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-white text-center">
                  <span className="relative right-[20px] md:bottom-[5px] font-heading text-[28px] md:text-[54px] font-normal leading-none tracking-normal uppercase md:mt-3">
                    Celebrating
                  </span>
                  <div className="flex items-start">
                    <span className="font-heading text-[100px] md:text-[150px] font-normal leading-none tracking-normal uppercase">
                      60
                    </span>
                    <span className="relative md:bottom-[30px] bottom-[20px] font-heading text-[28px] md:text-[42px] font-normal leading-none tracking-normal uppercase mt-2 md:mt-4">
                      TH
                    </span>
                  </div>
                  <span className="relative right-[15px] md:right-[40px] md:bottom-[5px] font-heading text-[28px] md:text-[54px] font-normal leading-none tracking-normal uppercase md:mt-3">
                    Anniversary
                  </span>
                </div>
              </div>

              <button className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-105 focus:outline-none mt-2">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#987F55] flex items-center justify-center mb-3 transition-colors group-hover:bg-[#B39665] shadow-lg">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white text-[11px] md:text-[13px] tracking-[0.2em] uppercase font-body font-light opacity-90 group-hover:opacity-100">
                  Play Video
                </span>
              </button>
            </div>

            {/* --- EFEK RIPPLE DI BAWAH BANNER --- */}
            {/* Menggunakan CSS Masking agar warna ripple-nya persis sama dengan background Footer (#404040) */}
            <div className={`absolute -bottom-[200px] left-0 w-full pointer-events-none z-[70] transition-opacity duration-300`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className="w-full h-[400px] brightness-0 invert" 
              />
            </div>

          </div>
          {/* --- ROAD TO 2027 SECTION --- */}
          <div className="relative w-full bg-brand-bg-white py-12 md:py-24 px-8 md:px-16 lg:px-24 overflow-hidden">
            
            {/* Trik Efek Tekstur Halus di Kanan (Opsional, meniru bercak di desain) */}
            <div className="absolute top-0 right-0 w-[60%] md:w-[40%] h-full opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent pointer-events-none z-0"></div>

            {/* Container Pembungkus agar sejajar dengan section lain */}
            <div className="max-w-xl lg:max-w-5xl mx-auto relative z-10 flex flex-col items-start">
              
              {/* Teks ROAD TO 2027 */}
              <div className="mb-4 md:mb-6">
                <span className="font-heading text-[18px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  ROAD TO 2027
                </span>
              </div>

              {/* Judul Besar */}
              <h2 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] text-brand-black font-normal leading-[1.1] uppercase">
                CELEBRATING A LEGACY, <br className="hidden md:block" />
                JOURNEYING TO THE FUTURE
              </h2>

            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="pt-[40px] border-t border-gray-300 w-[90%] max-w-6xl">
              
              {/* Gunakan CSS Grid untuk kebebasan mengatur urutan (order) di Mobile vs Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-0 items-start">
                
                 {/* 1. Header Tahun  */}
                <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 flex justify-center lg:justify-end items-center space-x-3 md:space-x-4 font-heading text-[32px] md:text-[42px] tracking-widest font-medium mb-4 lg:mb-8">
                  <span className="text-[#987F55]">2025</span>
                  <span className="text-[#DCD7CB] text-2xl md:text-3xl">&middot;</span>
                  <span className="text-[#DCD7CB]">2026</span>
                  <span className="text-[#DCD7CB] text-2xl md:text-3xl">&middot;</span>
                  <span className="text-[#DCD7CB]">2027</span>
                </div>

                 {/* 2. Kolom Kiri: Gambar */}
                <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 w-full">
                  <img 
                    src={photo1Img} 
                    alt="Laying groundwork" 
                    className="w-full h-auto object-cover" 
                  />
                </div>

                {/* 3. Kolom Kanan: Teks & Sub-judul */}
                <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 flex flex-col pt-0 lg:pt-4">
                  <h4 className="font-bold text-brand-black text-[18px] md:text-[20px] mb-4 leading-snug">
                    A new beginning - Laying the groundwork for our future
                  </h4>
                  <p className="font-body text-brand-black/80 text-[15px] md:text-[16px] leading-relaxed">
                    As we embark on our journey towards LawSoc's 60th anniversary, 2025 marks the beginning of our refreshed digital presence. This year, we're reimagining how we connect with members — through new digital tools, enhanced services, and stories from the legal community.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* --- LEGAL SUPPORT SECTION --- */}
          {/* --- LEGAL SUPPORT SECTION --- */}
          {/* Mengurangi padding vertikal (py) di mobile agar lebih proporsional */}
          {/* --- LEGAL SUPPORT SECTION --- */}
          {/* Mengurangi padding vertikal (py) di mobile agar lebih proporsional */}
          <div className="w-full bg-brand-bg-white py-12 md:py-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
              
              {/* Header Section */}
              {/* Gap diperkecil di mobile, margin bawah disesuaikan */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-0">
                <div className="font-heading text-[16px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  LEGAL SUPPORT
                </div>
                
                {/* Tambahan <br> khusus mobile agar teks turun setelah kata "THROUGH" seperti di gambar */}
                <h2 className="font-heading text-[24px] md:text-[38px] lg:text-[42px] text-brand-black leading-[1.2] md:leading-none uppercase text-left md:text-right">
                  GUIDING YOU THROUGH <br className="block md:hidden" /> EVERY STEPS
                </h2>
              </div>

              {/* List Container */}
              {/* Jarak antar baris dipersempit jadi space-y-2 di mobile */}
              <div className="flex flex-col space-y-2 md:space-y-4 max-w-5xl mx-auto">
                {legalSupports.map((item, index) => {
                  const isActive = activeSupportIndex === index;

                  return (
                    <div 
                      key={index} 
                      onMouseEnter={() => setActiveSupportIndex(index)}
                      className="flex flex-row gap-2 md:gap-4 cursor-pointer group"
                    >
                      {/* Kotak Kiri (Label Tipe) */}
                      {/* Lebar dan font dikecilkan di mobile */}
                      <div className="w-[75px] md:w-[130px] shrink-0 bg-[#3A3A3A] text-white flex items-center justify-center py-3 md:py-5 font-heading tracking-wide text-[13px] md:text-[18px]">
                        {item.type}
                      </div>

                      {/* Kotak Kanan (Judul & Arrow) */}
                      {/* WAJIB ada min-w-0 di flex-child agar efek truncate di dalamnya bisa berfungsi */}
                      {/* Kotak Kanan (Judul & Arrow) */}
                      <div 
                        className={`flex-1 flex items-center justify-between px-4 md:px-8 py-3 md:py-5 transition-colors duration-300 min-w-0 bg-[#EBEBEB] ${
                          isActive ? 'md:bg-[#987F55]' : ''
                        }`}
                      >
                        {/* Teks Judul */}
                        <span 
                          className={`font-body text-[13px] md:text-[17px] truncate md:whitespace-normal md:overflow-visible transition-colors duration-300 text-brand-black/80 ${
                            isActive ? 'md:text-white' : ''
                          }`}
                        >
                          {item.title}
                        </span>

                        {/* Arrow Animation (Di mobile kita sembunyikan total pakai 'hidden md:flex') */}
                        <div 
                          className={`hidden md:flex items-center text-white transition-opacity duration-300 ml-2 shrink-0 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <span className="tracking-widest mr-1">...</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300 md:w-5 md:h-5"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Link Button */}
              <div className="mt-10 md:mt-16 flex justify-center">
                <a 
                  href="#" 
                  // Gunakan font-body (Montserrat), font-semibold (600), dan tracking-[0.01em] untuk 1%
                  className="group flex items-center font-body text-[18px] font-semibold uppercase tracking-[0.01em] leading-[30px] text-[#987F55] hover:text-brand-maroon transition-colors"
                >
                  EXPLORE MORE SUPPORT
                  <div className="flex items-center ml-2 text-current">
                    <span className="tracking-widest mr-1 opacity-60">...</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>

            </div>
          </div>

          {/* --- MEDIA & PRESS SECTION (API INTEGRATION) --- */}
          {/* Background abu-abu terang meniru desain Figma */}
          <div className="w-full bg-[#F5F5F5] py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
              
              {/* Header */}
              <div className="flex justify-center mb-10 md:mb-14">
                <span className="font-heading text-[18px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  MEDIA & PRESS
                </span>
              </div>

              {/* Carousel Container (Track Hover State) */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                
                {/* 1. ERROR STATE */}
                {newsError && (
                  <div className="w-full p-8 bg-red-50 text-red-600 text-center rounded-lg border border-red-200">
                    <p className="font-bold text-lg">Failed to load latest news.</p>
                    <p className="text-sm mt-2">{newsError}</p>
                  </div>
                )}

                {/* 2. SKELETON LOADING STATE (Bonus Poin) */}
                {loadingNews && !newsError && (
                  <div className="flex overflow-hidden gap-6">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col animate-pulse">
                        <div className="w-full h-[200px] lg:h-[240px] bg-gray-300 mb-4 rounded-sm"></div>
                        <div className="w-3/4 h-6 bg-gray-300 mb-3 rounded-sm"></div>
                        <div className="w-1/3 h-4 bg-gray-300 mb-4 rounded-sm"></div>
                        <div className="w-full h-3 bg-gray-300 mb-2 rounded-sm"></div>
                        <div className="w-5/6 h-3 bg-gray-300 mb-4 rounded-sm"></div>
                        <div className="w-1/4 h-4 bg-gray-300 mt-auto rounded-sm"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. ACTUAL CONTENT (SUCCESS STATE) */}
                {!loadingNews && !newsError && (
                  <>
                    {/* Tombol Kiri (Bonus Poin: Accessibility aria-label) */}
                    <button 
                      onClick={() => scrollCarousel('left')}
                      aria-label="Previous slide"
                      className="absolute left-[-15px] lg:left-[-40px] top-[100px] z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-maroon opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    
                    {/* Tombol Kanan */}
                    <button 
                      onClick={() => scrollCarousel('right')}
                      aria-label="Next slide"
                      className="absolute right-[-15px] lg:right-[-40px] top-[100px] z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-maroon opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>

                    {/* Scrollable Track (Kalkulasi lebar: 1 kolom di HP, 2 di Tablet, 3 di Desktop) */}
                    <div 
                      ref={carouselRef}
                      className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {articles.map((article) => (
                        <div 
                          key={article.id} 
                          className="snap-start flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col group/card"
                        >
                          {/* Image Thumbnail (Hitam Putih bawaan, berwarna saat di-hover!) */}
                          <div className="w-full h-[200px] lg:h-[240px] overflow-hidden mb-5 bg-gray-200">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:scale-105"
                              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'; }}
                            />
                          </div>

                          {/* Article Title (Truncate max 2 lines) */}
                          <h3 className="font-heading text-[24px] font-normal uppercase text-brand-black leading-none line-clamp-2 mb-2 group-hover/card:text-brand-maroon transition-colors">
                            {article.title}
                          </h3>

                          {/* Meta Category & Date */}
                          <p className="mt-[17px] font-body text-[16px] font-semibold text-gray-800 mb-3 tracking-normal leading-none">
                            {article.category} | <span className="font-normal">{article.date}</span>
                          </p>

                          {/* Short Excerpt (Truncate max 3 lines) */}
                          <p className="font-body text-[18px] font-normal text-gray-600 leading-[30px] tracking-normal line-clamp-3 mb-6">
                            {article.excerpt}
                          </p>

                          {/* Read More Link */}
                          <a 
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto group/link flex items-center font-body text-[18px] font-semibold uppercase leading-[30px] tracking-[0.01em] text-[#987F55] hover:text-brand-maroon transition-colors"
                          >
                            MORE DETAIL
                            <div className="flex items-center ml-[10px] scale-90 mt-[3px]">
                            <img
                              src={arrow}
                              alt="Arrow Icon"
                              className="scale-90 relative right-[0px]"
                            />
                          </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
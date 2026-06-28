import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import athenaImg from './assets/athena3.png';
import heroImg from './assets/hero.jpg';
import logoImg from './assets/logo.png';
import arrow from './assets/arrow.svg';
import rippleHero from './assets/ripple-hero.png';
import dustyBackgroundImg from './assets/dustyBackgorund.png';
import Background60Img from './assets/60-background.png';
import photo1Img from './assets/photo1.jpg';
import arrowBlackImg from './assets/arrow-black.png';
import BackgroundSupportImg from './assets/support-background.jpg'
import phoneImg from './assets/phone.png'
import briefImg from './assets/brief.png'

// INTERFACE
interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  url: string;
}

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

//STATIC DATA
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

const legalSupports = [
    { type: 'Lawyer', title: 'Feedback on Law Reforms' },
    { type: 'Public', title: 'Alternative Dispute Resolution Schemes' },
    { type: 'Lawyer', title: "Members' Support Schemes" },
    { type: 'Lawyer', title: 'Future Lawyering Research Portal' },
  ];

function App() {
  // STATE FOR UI COMPONENT
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeSupportIndex, setActiveSupportIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // STATE FOR API FETCHING AND CAROUSEL
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
        const res = await fetch(`https://content.guardianapis.com/search?q=law%20AND%20society&show-fields=thumbnail,trailText&page-size=8&api-key=${apiKey}`);

        if (!res.ok) throw new Error('Failed to fetch news data');
        
        const data = await res.json();

        // MAPPING RAW DATA FROM FETCH INTO GuardianApiItem INTERFACE
        const formattedArticles = data.response.results.map((item: GuardianApiItem) => {
          const rawDate = new Date(item.webPublicationDate);
          const formattedDate = rawDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

          return {
            id: item.id,
            title: item.webTitle,
            date: formattedDate,
            category: item.sectionName === 'Law' ? 'Press Release' : 'Media',
            excerpt: item.fields?.trailText?.replace(/(<([^>]+)>)/gi, "") || "Read the full article for more details on this legal update.",
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

  // AUTO PLAY CAROUSEL (SLIDES EVERY 3.5s) AND STOP AUTOSLIDE WHEN HOVERED
  useEffect(() => {
    if (isHovered || loadingNews || newsError) return;
    
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        // IF ITS THE LAST ITEM, BACK TO FIRST ITEM
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {

          const cardWidth = carouselRef.current.children[0].clientWidth;
          carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3500); 

    // CLEAN UP THE STATE (MEMORY LEAK IF NOT)
    return () => clearInterval(interval);
  }, [isHovered, loadingNews, newsError]);

  // HELPER FUNCTION FOR LEFT RIGHT BUTTON
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
      <div className={` h-[100vh] absolute left-0 w-full pointer-events-none z-[70] transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className=" absolute bottom-[-200px] w-full scale-120 h-[400px] brightness-0 invert" 
              />
            </div>
      <Navbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      
      
      <div className="w-full">
        <main className="flex flex-col">
            <div className="relative h-screen overflow-hidden bg-brand-bg-white w-[calc(100%-105px)] md:w-[calc(100%-96px)]">
              <img 
                src={heroImg} 
                alt="Hero Background" 
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40" 
              />
              <div className="flex w-full justify-between p-10 items-center">
              <img
                  src={logoImg}
                  alt="Law Society Logo"
                  className="w-[162px] md:w-64 h-auto"
                />
                
                <div className='pt-[13px] [@media(max-width:627px)]:hidden'>
                  <div className="flex items-center space-x-4 md:space-x-6 text-brand-gold mb-10 h-6">
                  <a href="#" className="hover:text-brand-gold transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  
                  <a href="#" className="hover:text-brand-gold transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>

                  <a href="#" className="hover:text-brand-gold transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>

                  <span className="text-gray-400 font-light">|</span>
                  <a href="#" className="font-body text-sm tracking-wide hover:text-brand-gold transition-colors">CONTACT US</a>
                </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-stretch w-full h-screen overflow-hidden">
                
              {/* TEXT SECTION*/}
              <div className="relative md:w-1/2 h-[50%] md:h-full flex flex-col px-8 md:px-16 lg:px-24  md:order-last overflow-y-auto">
                
                <h1 className="font-heading text-[36px] md:text-[72px] font-medium leading-none tracking-normal uppercase">
                  BECOME AN <br />
                  <span className="text-brand-maroon pl-[16px]">AFFILIATE</span> OF THE <br />
                  LAW SOCIETY
                </h1>

                <p className="font-body text-[16px] md:text-[18px] font-normal text-brand-black/80 mt-6 max-w-md md:max-w-lg leading-[30px] tracking-[0.01em]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dict...
                </p>

                <a 
                  href="#" 
                  className="text-[18px] group inline-flex items-center mt-8 font-body text-brand-gold font-bold tracking-widest hover:text-brand-maroon transition-colors"
                >
                  FIND LAWYER 
                  <img
                    src={arrow}
                    alt="Arrow Icon"
                    className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div className="relative w-full md:w-1/2 h-[50%] md:h-full md:order-first shrink-0">
                
                {/* ATHENA */}
                <img
                  src={athenaImg}
                  alt="Athena"
                  
                  className="w-full h-full object-contain object-left-bottom [@media(max-height:720px)]:hidden origin-bottom-left -translate-y-18 md:translate-y-0 transition-transform duration-300"
                />
                
            </div>
            </div>
          </div>
          
          
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

          
          
          <div className="w-full bg-brand-bg-white ">
            
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 border-y border-gray-300">
              
              {cards.map((card, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={card.num}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="flex flex-col border-r border-b lg:border-b-0 border-gray-300 cursor-pointer group transition-all duration-300"
                  >
                    
                    <div className="relative h-[200px] md:h-[320px] lg:h-[380px] w-full overflow-hidden flex flex-col justify-between p-4 md:p-8">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale z-0"
                      />
                      
                      
                      <div
                        className={`absolute inset-0 z-10 transition-colors duration-300 ${
                          isActive ? 'bg-[#4A4A4A]/90' : 'bg-[#EFEFEF]/85'
                        }`}
                      ></div>

                      
                      <div
                        className={`relative z-20 text-[15px] md:text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {card.num}
                      </div>

                      <div className="relative z-20 mt-auto mb-2 md:mb-4">
                        
                        <h3
                          className={`font-heading text-[18px] md:text-[22px] lg:text-[26px] font-normal leading-[1.1] whitespace-pre-line transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-brand-black'
                          }`}
                        >
                          {card.title}
                        </h3>
                        
                          
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

                    
                    <div
                      className={`h-[50px] md:h-[70px] border-t border-gray-300 flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-[#987F55]' : 'bg-[#F9F9F9]'
                      }`}
                    >
                      
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
          
          
          <div className="relative w-full h-[400px] md:h-[550px] flex flex-col items-center justify-center bg-[#222222]">
            
            
            <img
              src={Background60Img}
              alt="60th Anniversary Background"
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
            />

            
            <div className="relative z-20 flex flex-col items-center w-full max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-auto flex items-center justify-center py-5 md:py-6 px-6 md:px-20 mb-8 md:mb-12">
                
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

            
            
            <div className={`absolute -bottom-[200px] left-0 w-full pointer-events-none z-[70] transition-opacity duration-300`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className="w-full h-[400px] brightness-0 invert scale-195" 
              />
            </div>

          </div>
          
          <div className="relative w-full bg-brand-bg-white py-12 md:py-24 px-8 md:px-16 lg:px-24 overflow-hidden">
            
            
            <div className="absolute top-0 right-0 w-[60%] md:w-[40%] h-full opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent pointer-events-none z-0"></div>

            
            <div className="max-w-xl lg:max-w-5xl mx-auto relative z-10 flex flex-col items-start">
              
              
              <div className="mb-4 md:mb-6">
                <span className="font-heading text-[18px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  ROAD TO 2027
                </span>
              </div>

              
              <h2 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] text-brand-black font-normal leading-[1.1] uppercase">
                CELEBRATING A LEGACY, <br className="hidden md:block" />
                JOURNEYING TO THE FUTURE
              </h2>

            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="pt-[40px] border-t border-gray-300 w-[90%] max-w-6xl">
              
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-0 items-start">
                
                 
                <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 flex justify-center lg:justify-end items-center space-x-3 md:space-x-4 font-heading text-[32px] md:text-[42px] tracking-widest font-medium mb-4 lg:mb-8">
                  <span className="text-[#987F55]">2025</span>
                  <span className="text-[#DCD7CB] text-2xl md:text-3xl">&middot;</span>
                  <span className="text-[#DCD7CB]">2026</span>
                  <span className="text-[#DCD7CB] text-2xl md:text-3xl">&middot;</span>
                  <span className="text-[#DCD7CB]">2027</span>
                </div>

                 
                <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 w-full">
                  <img 
                    src={photo1Img} 
                    alt="Laying groundwork" 
                    className="w-full h-auto object-cover" 
                  />
                </div>

                
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

          
          
          
          
          
          <div 
              className="w-full bg-cover bg-center bg-no-repeat py-12 md:py-16 px-6 md:px-16 lg:px-24 grayscale-0"
              style={{ backgroundImage: `url(${dustyBackgroundImg})` }}
            >
            <div className="max-w-6xl mx-auto">
              
              
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-0">
                <div className="font-heading text-[16px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  LEGAL SUPPORT
                </div>
                
                
                <h2 className="font-heading text-[24px] md:text-[38px] lg:text-[42px] text-brand-black leading-[1.2] md:leading-none uppercase text-left md:text-right">
                  GUIDING YOU THROUGH <br className="block md:hidden" /> EVERY STEPS
                </h2>
              </div>

              
              
              <div className="flex flex-col space-y-2 md:space-y-4 max-w-5xl mx-auto">
                {legalSupports.map((item, index) => {
                  const isActive = activeSupportIndex === index;

                  return (
                    <div 
                      key={index} 
                      onMouseEnter={() => setActiveSupportIndex(index)}
                      className="flex flex-row gap-2 md:gap-4 cursor-pointer group"
                    >
                      
                      
                      <div className="w-[75px] md:w-[130px] shrink-0 bg-[#3A3A3A] text-white flex items-center justify-center py-3 md:py-5 font-heading tracking-wide text-[13px] md:text-[18px]">
                        {item.type}
                      </div>

                      
                      
                      
                      <div 
                        className={`flex-1 flex items-center justify-between px-4 md:px-8 py-3 md:py-5 transition-colors duration-300 min-w-0 bg-[#EBEBEB] ${
                          isActive ? 'md:bg-[#987F55]' : ''
                        }`}
                      >
                        
                        <span 
                          className={`font-body text-[13px] md:text-[17px] truncate md:whitespace-normal md:overflow-visible transition-colors duration-300 text-brand-black/80 ${
                            isActive ? 'md:text-white' : ''
                          }`}
                        >
                          {item.title}
                        </span>

                        
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

              
              <div className="mt-10 md:mt-16 flex justify-center">
                <a 
                  href="#" 

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
             <div className={`absolute -bottom-[200px] left-0 w-full pointer-events-none z-[70] transition-opacity duration-300`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className="w-full h-[400px] brightness-0 invert scale-195" 
              />
            </div>
          </div>

          
          
          <div className="w-full bg-[#DEE2E6] py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
              
              
              <div className="flex justify-center mb-10 md:mb-14">
                <span className="font-heading text-[18px] md:text-[22px] font-normal text-brand-maroon uppercase tracking-wide underline underline-offset-[6px] decoration-1">
                  MEDIA & PRESS
                </span>
              </div>

              
              <div 
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                
                
                {newsError && (
                  <div className="w-full p-8 bg-red-50 text-red-600 text-center rounded-lg border border-red-200">
                    <p className="font-bold text-lg">Failed to load latest news.</p>
                    <p className="text-sm mt-2">{newsError}</p>
                  </div>
                )}

                
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

                
                {!loadingNews && !newsError && (
                  <>
                    
                    <button 
                      onClick={() => scrollCarousel('left')}
                      aria-label="Previous slide"
                      className="absolute left-[-15px] lg:left-[-40px] top-[100px] z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-maroon opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    
                    
                    <button 
                      onClick={() => scrollCarousel('right')}
                      aria-label="Next slide"
                      className="absolute right-[-15px] lg:right-[-40px] top-[100px] z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-maroon opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>

                    
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
                          
                          <div className="w-full h-[200px] lg:h-[240px] overflow-hidden mb-5 bg-gray-200">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:scale-105"
                              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'; }}
                            />
                          </div>

                          
                          <h3 className="font-heading text-[24px] font-normal uppercase text-brand-black leading-none line-clamp-2 mb-2 group-hover/card:text-brand-maroon transition-colors">
                            {article.title}
                          </h3>

                          
                          <p className="mt-[17px] font-body text-[16px] font-semibold text-gray-800 mb-3 tracking-normal leading-none">
                            {article.category} | <span className="font-normal">{article.date}</span>
                          </p>

                          
                          <p className="font-body text-[18px] font-normal text-gray-600 leading-[30px] tracking-normal line-clamp-3 mb-6">
                            {article.excerpt}
                          </p>

                          
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


          <div className="relative w-full h-[650px] md:h-[200px] flex flex-col md:flex-row items-center ">
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat bg-[#F5F5F5] z-0"
              style={{ backgroundImage: `url(${BackgroundSupportImg})` }}
            >
              <div className="opacity-87 hidden md:block absolute top-0 right-[-20%] md:h-full w-[65%] bg-[#AA0433] skew-x-[25deg] origin-bottom-left"></div>
              <div className="opacity-87 block md:hidden absolute bottom-0 left-0 w-full h-[25%] bg-[#AA0433]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col md:flex-row items-center justify-between h-full pt-12 md:pt-0">
              
              <div className="w-full md:w-[50%] flex flex-col md:flex-row items-start text-left gap-4 md:gap-6 mt-0">
                
                <div className="mt-0 md:mt-2 shrink-0">
                  <img 
                    src={briefImg} 
                    alt="Briefcase Icon" 
                    className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] object-contain" 
                  />
                </div>

                <div className="flex flex-col items-start">
                  <h2 className="font-heading text-[26px] font-normal text-brand-black leading-none tracking-normal mb-2 md:mb-3">
                    Support for your career growth
                  </h2>
                  <p className="font-body text-[18px] font-normal text-gray-700 md:text-gray-600 leading-[30px] tracking-normal mb-6">
                    A guidance on career and work related issues
                  </p>
                  
                 <a href="#" className="group flex items-center justify-start font-body text-[18px] font-semibold text-[#987F55] leading-[30px] tracking-[0.01em] uppercase hover:text-[#A31636] transition-colors w-fit">
                    FIND CAREER
                      <img
                              src={arrow}
                              alt="Arrow Icon"
                              className="scale-90 relative right-[0px] ml-1.5"
                      />
                  </a>
                </div>
              </div>

              <div className="flex absolute bottom-0 left-0 w-full h-[55%] md:h-full md:w-[50%] md:left-auto md:right-0 md:top-0 items-center justify-center z-20 pointer-events-none">
                <img 
                  src={phoneImg}
                  alt="Career App on Mobile" 
                  className="absolute -mb-[18px]  md:mb-[40px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-[-20%] h-[95%] md:h-[140%] object-contain md:right-[15%] drop-shadow-2xl pointer-events-auto" 
                />
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
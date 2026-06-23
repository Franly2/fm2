import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import athenaImg from './assets/athena.png';
import heroImg from './assets/hero.jpg';
import logoImg from './assets/logo.png';
import arrow from './assets/arrow.svg';
import rippleHero from './assets/ripple-hero.png';

function App() {
  // Lift state up ke sini biar Navbar bisa dikontrol dari luar kalau butuh
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Track active card buat efek hover. Hardcode index 1 dulu buat default state-nya
  const [activeIndex, setActiveIndex] = useState(1);

  // Dummy data buat cards. Nanti tinggal mapping respon API ke sini kalau backend udah kelar
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
      img: 'https://images.unsplash.com/photo-1497215848147-75e113264e1c?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg-white relative overflow-x-hidden">
      <Navbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      
      <div className="w-full">
        <main className="flex flex-col">
          
          {/* --- HERO SECTION --- */}
          {/* Note: Lumayan tricky di absolute positioning & z-index, don't break this! */}
          <div className="relative w-full h-screen overflow-hidden bg-brand-bg-white">
            <img 
              src={heroImg} 
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40" 
            />

            {/* Athena image wrapper dengan custom translate buat positioning tiap breakpoint */}
            <div className="absolute z-10 transform 
                            -bottom-[125px] -left-[45px] w-[700px] translate-x-[-25%] translate-y-[15%] 
                            md:left-[0px] md:w-[850px] md:-translate-x-[20%] md:translate-y-[10%] 
                            xl:left-[50px] xl:w-[1000px] xl:-translate-x-[15%] xl:translate-y-[5%]">
              
              {/* Dekorasi block merah di belakang Athena */}
              <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <div className="absolute opacity-80 bg-[#760525] 
                                left-[35px] w-[50%] h-[78px] bottom-[550px] rotate-[37deg]"></div>
                
                <div className="absolute opacity-80 bg-[#AA0433] 
                                left-[30px] w-[50%] h-[68px] bottom-[45%] -rotate-[50deg]"></div>
              </div>

              <img 
                src={athenaImg} 
                alt="Athena" 
                className="relative z-10 w-full h-auto max-w-none -scale-x-100 object-top grayscale" 
              />
            </div>
            
            {/* Main Hero Content (Text & Call to action) */}
            <div className="relative z-20 h-full flex flex-col justify-start pt-[26px] pl-8 md:pl-16 lg:pl-24 pr-28 md:pr-32">
              <img
                src={logoImg}
                alt="Law Society Logo"
                className="w-[162px] md:w-64 h-auto mb-10"
              />

              <h1 className="font-heading text-[32px] md:text-[40px] lg:text-[4rem] font-bold text-brand-black leading-tight tracking-wide">
                BECOME AN <br />
                <span className="text-brand-maroon pl-[16px]">AFFILIATE</span> OF THE <br />
                LAW SOCIETY
              </h1>

              <p className="text-[16px] md:text-[18px] font-body text-brand-black/80 mt-6 max-w-sm md:max-w-md leading-relaxed">
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

            {/* Ripple Effect Divider. Pake invert biar blend in sama next section */}
            <div className={`absolute -bottom-[200px] left-0 w-full pointer-events-none z-[70] transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}>
              <img 
                src={rippleHero} 
                alt="Ripple Divider" 
                className="w-full h-[400px] brightness-0 invert" 
              />
            </div>
          </div>
          
          {/* --- ABOUT / WHAT WE DO SECTION --- */}
          <div className="w-full bg-brand-bg-white p-8 md:p-16 lg:px-24">
            {/* Centering wrapper pake mx-auto biar gak nabrak edge screen di ultrawide */}
            <div className="max-w-xl lg:max-w-5xl mx-auto">
              
              <div className="flex items-center space-x-3 mb-5">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#333333]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <span className="font-heading text-lg md:text-xl text-brand-maroon uppercase tracking-wider underline underline-offset-[6px] decoration-2">
                  WHAT WE DO
                </span>
              </div>

              {/* Ngakalin responsive line break, biar rapi di desktop tapi tetep oke di mobile */}
              <h2 className="font-heading text-[28px] md:text-[38px] lg:text-[42px] text-brand-black leading-[1.2] mb-6">
                WE CARRY OUT VARIOUS <br className="hidden md:block lg:hidden" />
                STATUTORY FUNCTIONS
              </h2>

              <p className="font-body text-[16px] md:text-[18px] text-brand-black/80 leading-relaxed lg:max-w-4xl">
                The mission of the Law Society is to serve its members and the public by sustaining an independent bar which upholds the rule of law and ensures access to justice. As part of its mission in ensuring access to justice for the needy, the Law Society has established Pro Bono SG... 
                <span className="text-brand-gold font-bold cursor-pointer hover:underline ml-2 hover:text-brand-maroon transition-colors">
                  Read more
                </span>
              </p>
            </div>
          </div>

          {/* --- INTERACTIVE GRID CARDS --- */}
          <div className="w-full bg-brand-bg-white pb-16">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-y border-gray-300">
              
              {/* Iterate data cards. Handle active state pas onMouseEnter (lebih smooth dibanding onClick) */}
              {cards.map((card, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={card.num}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="flex flex-col border-r border-gray-300 cursor-pointer group transition-all duration-300"
                  >
                    {/* Upper Wrapper: Background image + Darken overlay logic */}
                    <div className="relative h-[320px] lg:h-[380px] w-full overflow-hidden flex flex-col justify-between p-8">
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
                        className={`relative z-20 text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {card.num}
                      </div>

                      {/* Titles & Smooth reveal description pake max-h trick */}
                      <div className="relative z-20 mt-auto mb-4">
                        <h3
                          className={`font-heading text-[22px] lg:text-[26px] font-bold leading-[1.2] whitespace-pre-line transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-brand-black'
                          }`}
                        >
                          {card.title}
                        </h3>
                        
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isActive ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                          }`}
                        >
                          <p className="font-body text-[14px] text-gray-300 whitespace-pre-line leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Lower Wrapper: Footer button + Arrow animation */}
                    <div
                      className={`h-[70px] border-t border-gray-300 flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-[#987F55]' : 'bg-[#F9F9F9]'
                      }`}
                    >
                      <div
                        className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
                          isActive ? 'text-white font-bold tracking-widest' : 'text-gray-500'
                        }`}
                      >
                        {/* Conditional render text "MORE DETAIL" */}
                        {isActive && <span>MORE DETAIL</span>}
                        
                        <div className="flex items-center">
                          <span className="tracking-widest mr-1">...</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
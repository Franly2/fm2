import Navbar from './components/Navbar';
import Footer from './components/Footer';
import athenaImg from './assets/athena.png';
import heroImg from './assets/hero.jpg';
import logoImg from './assets/logo.png';
import arrow from './assets/arrow.svg';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg-white relative overflow-x-hidden">
      <Navbar />
      
      <div className="w-full">
        
        <main className="flex flex-col">
          
          <div className="relative w-full h-screen overflow-hidden bg-brand-bg-white">
            
            <img 
              src={heroImg} 
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40" 
            />

            <img 
              src={athenaImg} 
              alt="Athena" 
              className="absolute z-10 -scale-x-100 object-top -bottom-[125px] -left-[50px] md:left-[50px] w-[700px] md:w-[900px] max-w-none transform translate-x-[-25%] translate-y-[15%] md:translate-x-[-15%] md:translate-y-[10%] grayscale" 
            />

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
          </div>
          
          {/* KONTEN LAIN DI BAWAH HERO */}
          <div className="w-full bg-brand-bg-white p-8 md:p-16">
            <h2 className="font-heading text-2xl text-brand-maroon underline">WHAT WE DO</h2>
            <p className="font-body mt-2 text-brand-black">The mission of the Law Society is to serve its members and the public by sustaining an independent bar which upholds the rule of law and ensures access to justice...<span className="text-brand-gold font-bold cursor-pointer hover:underline ml-2 hover:text-brand-maroon">Read more</span></p>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
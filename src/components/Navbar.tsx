import { useEffect } from 'react'; 
import bgImg from '../assets/bg-nav.jpg';

const Navbar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'ABOUT US', href: '#', isHighlight: true },
    { name: 'LAWYERS', href: '#' },
    { name: 'PUBLIC', href: '#' },
    { name: 'ADMISSIONS', href: '#' },
    { name: 'MEDIA', href: '#' },
    { name: 'CPD', href: '#' },
    { name: 'MEMBER LOGIN', href: '#' },
    { name: 'MEMBERSHIP', href: '#' },
    { name: 'CAREERS', href: '#' },
    { name: 'ADVERTISE', href: '#' },
  ];

  return (
    <>
      <nav 
        className={`absolute right-0 top-0 h-screen w-[105px] md:w-24 flex flex-col justify-between items-center py-8 z-[60] transition-colors duration-300 ${
          isOpen ? 'bg-transparent' : 'bg-[#404040]'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-6 text-brand-text-white hover:text-brand-gold focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span 
            className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ease-in-out cursor-pointer ${
              isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
            }`} 
          />
          <span 
            className={`absolute right-[40%] top-1/2 -translate-y-1/2 w-[60%] h-[2px] bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
            }`} 
          />
          <span 
            className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
            }`} 
          />
        </button>

        <div className={`flex flex-col items-center text-brand-text-white/70 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <span className="text-[10px] text-center mb-2 font-body uppercase tracking-widest leading-tight">
            Scroll<br/>Down
          </span>
          <svg className="h-5 w-5 opacity-80" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10.586 10.5V7z" clipRule="evenodd" />
          </svg>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-50 bg-[#333333] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <img 
          src={bgImg} 
          alt="Menu Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" 
        />

        <div className="relative z-10 w-full h-full flex flex-col px-8 md:px-24 pt-8 pb-8 max-w-4xl">
          
          <div className="flex items-center space-x-4 md:space-x-6 text-brand-text-white mb-10 h-6">
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

          <div className="w-full md:w-96 border-b border-gray-400 pb-2 mb-10 flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search here" 
              className="w-full bg-transparent text-white font-body placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto pb-10 custom-scrollbar">
            <div className="flex flex-col space-y-5 md:space-y-6 items-start">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-heading text-3xl md:text-[40px] tracking-wide transition-colors ${
                    link.isHighlight 
                      ? 'text-brand-gold border-b-2 border-brand-gold pb-1' 
                      : 'text-brand-text-white hover:text-brand-gold'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
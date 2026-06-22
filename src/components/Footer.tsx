import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#404040] pt-16 flex flex-col items-center">
      
      <img
        src={logoImg}
        alt="Law Society Logo"
        className="w-[220px] md:w-[280px] h-auto mb-10"
      />

      <div className="flex flex-wrap justify-center items-center gap-y-4 text-white/90 font-body uppercase tracking-widest text-[14px] md:text-[15px] mb-10 px-8 max-w-2xl text-center">
        
        {/* whitespace-nowrap gunanya biar teks dan garis ( | ) ga kepisah beda baris pas di HP */}
        <span className="whitespace-nowrap">
          <a href="#" className="hover:text-brand-gold transition-colors">FAQS</a>
          <span className="mx-3 md:mx-4">|</span>
        </span>
        
        <span className="whitespace-nowrap">
          <a href="#" className="hover:text-brand-gold transition-colors">ADVERTISING RATES</a>
          <span className="mx-3 md:mx-4">|</span>
        </span>
        
        <span className="whitespace-nowrap">
          <a href="#" className="hover:text-brand-gold transition-colors">TERMS OF USE</a>
          <span className="mx-3 md:mx-4">|</span>
        </span>
        
        <span className="whitespace-nowrap">
          <a href="#" className="hover:text-brand-gold transition-colors">PRIVACY POLICY</a>
        </span>

      </div>

      <div className="w-full border-t border-white/20 pt-8 pb-12 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left text-white/50 text-[13px] md:text-[14px] font-body px-8 md:px-16 lg:px-24">
        
        <p className="leading-relaxed">
          &copy; Copyright 2025 The Law Society of <br className="md:hidden" />
          Singapore. All rights reserved
        </p>
        
        <p className="mt-4 md:mt-0 md:text-right">
          Latest update 26 June 2025
        </p>

      </div>
    </footer>
  );
};

export default Footer;
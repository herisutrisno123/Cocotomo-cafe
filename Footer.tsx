
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b1311] text-[#D7CCC8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">Cocho Tomo</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Menghadirkan kehangatan dalam setiap cangkir sejak 2020. Tempat di mana kopi dan cerita bertemu.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Jam Operasional</h4>
            <ul className="text-sm space-y-2 opacity-80">
              <li>Senin - Jumat: 08:00 - 22:00</li>
              <li>Sabtu - Minggu: 09:00 - 23:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-50">
          © 2024 Cocho Tomo Cafe. Dibuat dengan cinta untuk para pecinta kopi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

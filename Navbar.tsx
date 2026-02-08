
import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', id: Page.BERANDA },
    { name: 'Tentang', id: Page.TENTANG },
    { name: 'Artikel', id: Page.ARTIKEL },
    { name: 'Kontak', id: Page.KONTAK },
    { name: 'Dashboard', id: Page.DASHBOARD },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#3E2723]/95 backdrop-blur-md text-[#FAF7F2] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setPage(Page.BERANDA)}>
            <div className="w-10 h-10 bg-[#D7CCC8] rounded-full flex items-center justify-center mr-3">
              <span className="text-[#3E2723] font-bold text-xl">CT</span>
            </div>
            <span className="text-2xl font-bold tracking-wider font-serif">COCHO TOMO</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setPage(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === link.id || (link.id === Page.DASHBOARD && currentPage === Page.LOGIN)
                      ? 'text-[#D7CCC8] border-b-2 border-[#D7CCC8]'
                      : 'hover:text-[#D7CCC8]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#5D4037] focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#5D4037] border-t border-[#3E2723]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.id ? 'bg-[#3E2723] text-white' : 'hover:bg-[#3E2723]/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

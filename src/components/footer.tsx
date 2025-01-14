import React from 'react';
import { Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 text-center px-4">
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <img 
          src="./make_in_india.png" 
          alt="make in india logo" 
          className="w-20 sm:w-24 h-auto"
        />
        <a 
          href="https://www.instagram.com/bazaar_update/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
        >
          <Instagram size={18} className="sm:w-5 sm:h-5" />
          <span>@bazaar_update</span>
        </a>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          © 2025 Bazaar Update. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;


import React from 'react';
import { Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-12 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <img 
          src="./bazaarupdate_logo.png" 
          alt="made in india logo" 
          className="w-24 h-auto"
        />
        <a 
          href="https://www.instagram.com/bazaar.updates/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
        >
          <Instagram size={20} />
          <span>@bazaar_update</span>
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © 2025 Bazaar Update. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;


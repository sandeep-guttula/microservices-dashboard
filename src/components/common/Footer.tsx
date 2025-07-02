import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-sm text-gray-600 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <p>© 2025 MonitoCorp. Service monitoring dashboard for SRE teams.</p>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-xs text-gray-500">Auto-refresh: 15s</span>
          <span className="text-green-500 text-xs">● Connected</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

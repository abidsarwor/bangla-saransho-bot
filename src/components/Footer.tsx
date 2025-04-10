
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          &copy; {year} Article Summarizer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary py-4 mb-4 border-b">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
          Article Summarizer
        </h1>
        <p className="text-primary-foreground/80">
          Create quick summaries from articles
        </p>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary py-4 mb-4 border-b">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
          বাংলা সারাংশ সহায়ক
        </h1>
        <p className="text-primary-foreground/80">
          আর্টিকেল থেকে দ্রুত সারাংশ তৈরি করুন
        </p>
      </div>
    </header>
  );
};

export default Header;

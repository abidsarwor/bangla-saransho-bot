
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Summarizer from '@/components/Summarizer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Summarizer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

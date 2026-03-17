import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GenZSection from './components/GenZSection';
import TimelineSection from './components/TimelineSection';
import QuoteSection from './components/QuoteSection';
import HistoryAccordion from './components/HistoryAccordion';
import PollSection from './components/PollSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <GenZSection />
      <TimelineSection />
      <QuoteSection />
      <HistoryAccordion />
      <PollSection />
      <Footer />
    </div>
  );
}

export default App;

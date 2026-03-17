import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GenZSection from './components/GenZSection';
import TimelineSection from './components/TimelineSection';
import QuoteSection from './components/QuoteSection';
import HistoryAccordion from './components/HistoryAccordion';
import PollSection from './components/PollSection';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import FactsTicker from './components/FactsTicker';
import SectionNavDots from './components/SectionNavDots';

function App() {
  return (
    <div className="app-container">
      <ProgressBar />
      <SectionNavDots />
      <Header />
      <div id="hero-top">
        <Hero />
      </div>
      <FactsTicker />
      <div id="genz">
        <GenZSection />
      </div>
      <TimelineSection />
      <div id="boicanh">
        <QuoteSection />
      </div>
      <FactsTicker />
      <div id="lichsu">
        <HistoryAccordion />
      </div>
      <PollSection />
      <Footer />
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSequence from './components/HeroSequence';
import EngineeringDeepDive from './components/EngineeringDeepDive';
import SoundstageSimulator from './components/SoundstageSimulator';
import ColorCustomizer from './components/ColorCustomizer';
import SpecsSection from './components/SpecsSection';
import Footer from './components/Footer';
import PreorderModal from './components/PreorderModal';

export default function App() {
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      {/* Apple-style Minimal Glassmorphism Navbar */}
      <Navbar
        onOpenPreorder={() => setIsPreorderOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Scrollytelling Sequence */}
      <main>
        <HeroSequence onOpenPreorder={() => setIsPreorderOpen(true)} />

        {/* Engineering Reveal Deep Dive & Exploded Blueprint */}
        <EngineeringDeepDive onOpenPreorder={() => setIsPreorderOpen(true)} />

        {/* Real-time Noise Cancelling & Soundstage Lab */}
        <SoundstageSimulator />

        {/* Curated Material Finishes & Colorways */}
        <ColorCustomizer onOpenPreorder={() => setIsPreorderOpen(true)} />

        {/* Full Apple/Sony Technical Specifications */}
        <SpecsSection onOpenPreorder={() => setIsPreorderOpen(true)} />
      </main>

      {/* Global Minimal Sony Brand Footer */}
      <Footer />

      {/* Interactive Luxury Pre-order Drawer Modal */}
      <PreorderModal
        isOpen={isPreorderOpen}
        onClose={() => setIsPreorderOpen(false)}
      />
    </div>
  );
}

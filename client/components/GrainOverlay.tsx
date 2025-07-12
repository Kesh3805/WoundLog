"use client";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none z-0 grain-animate"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'40\' height=\'40\' fill=\'white\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'black\' fill-opacity=\'0.08\'/%3E%3C/svg%3E")',
        opacity: 0.13,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
        mixBlendMode: 'overlay',
        animation: 'grainMove 2.5s steps(2, end) infinite, grainFlicker 1.7s steps(2, end) infinite',
      }}
    >
      <style jsx>{`
        @keyframes grainMove {
          0% { background-position: 0 0; }
          10% { background-position: 5px 10px; }
          20% { background-position: -10px 5px; }
          30% { background-position: 15px -5px; }
          40% { background-position: -5px 15px; }
          50% { background-position: 10px 10px; }
          60% { background-position: -10px -10px; }
          70% { background-position: 5px -15px; }
          80% { background-position: -15px 5px; }
          90% { background-position: 10px 0px; }
          100% { background-position: 0 0; }
        }
        @keyframes grainFlicker {
          0%, 100% { opacity: 0.13; }
          20% { opacity: 0.16; }
          40% { opacity: 0.11; }
          60% { opacity: 0.15; }
          80% { opacity: 0.12; }
        }
      `}</style>
    </div>
  );
} 
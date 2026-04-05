import React, { useState } from 'react';
import HomePage from './HomePage';
import PredictionForm from './PredictionForm'; 
import PredictionResult from './PredictionResult'; 

function App() {
  const [view, setView] = useState('home'); 
  const [resultData, setResultData] = useState(null);

  // Navigasi: Home -> Form
  const handleStart = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  // Navigasi: Form -> Result (Saat submit sukses)
  const handlePredictionSuccess = (data) => {
    setResultData(data);
    setView('result');
    window.scrollTo(0, 0);
  };

  // Navigasi: Result -> Form (Hitung Ulang)
  const handleReset = () => {
    setResultData(null);
    setView('form');
    window.scrollTo(0, 0);
  };

  // Navigasi: Kembali ke Home
  const goHome = () => {
    setView('home');
    setResultData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* TAMPILAN 1: HOME */}
      {view === 'home' && (
        <HomePage onStart={handleStart} />
      )}

      {/* TAMPILAN 2: FORM */}
      {view === 'form' && (
        <div className="min-h-screen bg-gray-50 p-6 font-sans flex items-center justify-center">
           {/* Tombol Back di pojok atas sudah DIHAPUS dari sini */}
           {/* Fungsi goHome dikirim ke dalam form sebagai onBack */}
           <PredictionForm onSuccess={handlePredictionSuccess} onBack={goHome} />
        </div>
      )}

      {/* TAMPILAN 3: RESULT */}
      {view === 'result' && resultData && (
        <div className="min-h-screen bg-gray-50 p-4">
           <PredictionResult data={resultData} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}

export default App;
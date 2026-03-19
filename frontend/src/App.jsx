import React, { useState } from 'react';
import HomePage from './HomePage';
import PredictionForm from './PredictionForm'; // Pastikan nama file sama persis
import PredictionResult from './PredictionResult'; // Pastikan nama file sama persis

function App() {
  const [view, setView] = useState('home'); 
  const [resultData, setResultData] = useState(null);

  // Navigasi: Home -> Form
  const handleStart = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  // Navigasi: Form -> Result (Saat submit sukses)
  // Kita ubah sedikit logika di Form nanti agar mengirim data kesini
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
  };

  return (
    <div>
      {/* TAMPILAN 1: HOME */}
      {view === 'home' && (
        <HomePage onStart={handleStart} />
      )}

      {/* TAMPILAN 2: FORM */}
      {view === 'form' && (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
           <button onClick={goHome} className="mb-4 text-blue-600 font-bold hover:underline">
      {/* Ikon panah dibuat lebih besar dengan w-6 h-6 */}
      <span className="text-2xl group-hover:-translate-x-1 transition-transform">&larr;</span> 
      
      {/* Tulisan diperbesar menjadi text-xl (atau text-lg) */}
      <span className="text-xl tracking-tight">Back to Home</span>
    </button>
           {/* Kita panggil komponen Form.
               Note: Komponen PredictionForm kamu sebelumnya mungkin belum menerima props 'onSuccess'. 
               Nanti kita sesuaikan sedikit jika error. Untuk sekarang pasang dulu. 
           */}
           <PredictionFormWrapper onSuccess={handlePredictionSuccess} />
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

// Wrapper kecil untuk menangani logika submit form agar rapi
// (Karena kode Form kamu sebelumnya langsung fetch API di dalam)
import PredictionFormOriginal from './PredictionForm';

const PredictionFormWrapper = ({ onSuccess }) => {
    // Kita perlu "mencegat" hasil dari PredictionFormOriginal.
    // TAPI, karena kode form kamu sebelumnya menyimpan hasil di state internalnya sendiri,
    // Cara paling mudah tanpa merombak total kode Form kamu adalah:
    // Biarkan Form kamu bekerja, tapi minta dia memberi tahu App.jsx kalau sudah ada hasil.
    
    // *SOLUSI CEPAT:* // Ganti import di atas menjadi <PredictionFormOriginal /> langsung di dalam App function 
    // kalau kamu belum mengubah kode Form agar support props.
    
    // Agar tidak bingung, mari kita pakai Form kamu apa adanya dulu.
    // Tapi kamu harus edit sedikit file PredictionForm.jsx kamu.
    
    return <PredictionFormOriginal onSuccess={onSuccess} />;
}

export default App;
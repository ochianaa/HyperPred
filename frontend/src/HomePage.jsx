import React from 'react';
import { HeartPulse, CheckCircle, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

const HomePage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center gap-4">
              <div className="text-blue-600">
                <HeartPulse className="w-14 h-14" />
              </div>
              <span className="text-3xl font-black text-blue-700 tracking-tighter uppercase">HyperPred</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-black text-blue-500 uppercase tracking-[0.2em] italic">
                Health is Wealth
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION (ULTRA MODERN & CLEAN) --- */}
      <section className="relative overflow-hidden pt-16 pb-24">
        {/* Dekorasi Background Soft Blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full filter blur-[120px] opacity-70"></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-5">            
            {/* Judul Utama dengan baris ketiga berwarna biru murni sesuai permintaan */}
            <h1 className="text-7xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight text-left">
              Smart System <br />
              for Early <span className="text-blue-600">Detection</span> <br />
              <span className="text-blue-600">of Hypertension Risk.</span>
            </h1>
            
            <div className="max-w-xl space-y-8 text-left">
              <p className="text-2xl text-gray-500 leading-relaxed font-medium">
                Integrating the accuracy of machine learning (<span className="text-blue-600 font-bold">XGBoost-PSO</span>) with <span className="text-blue-600 font-bold">Expert Medical Standards (JNC)</span> for more precise predictions.
              </p>
              
              {/* Badge Indikator "Live" */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-50 rounded-full border border-blue-100 shadow-sm">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></span>
                </span>
                <p className="text-lg font-black text-blue-700 uppercase tracking-[0.15em]">
                  Check now, and prevent earlier.
                </p>
              </div>

            </div>
            
            <div className="text-left">
              <button 
                onClick={onStart}
                className="group flex items-center px-8 py-4 text-3xl font-black text-white bg-blue-700 rounded-[2rem] shadow-2xl hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-2 active:scale-95 shadow-blue-200"
              >
                Start Prediction Now
                <ArrowRight className="w-10 h-10 ml-4 group-hover:translate-x-3 transition-transform" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Ilustrasi Konseptual */}
          <div className="relative flex justify-end">
             <div className="absolute inset-0 bg-blue-100/30 rounded-full filter blur-[100px] opacity-50"></div>
             <img 
               src="/medical-assets.png" 
               alt="Hybrid Medical AI System" 
               className="relative z-10 w-full max-w-2xl object-contain drop-shadow-2xl animate-float"
               onError={(e) => { e.target.style.display = 'none'; }} 
             />
          </div>
        </div>
      </section>

      {/* --- 2. ABOUT US (DIUBAH SESUAI REQUEST: BACKGROUND BIRU & FONT BESAR) --- */}
      <section className="py-28 bg-blue-600 border-t border-gray-50 relative overflow-hidden">
        {/* Dekorasi halus untuk background biru */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          {/* Lencana (Bulatan) diperbesar font dan ukurannya */}
          <div className="inline-block px-12 py-6 bg-white text-blue-700 rounded-full font-black text-2xl uppercase tracking-widest mb-16 shadow-2xl border-4 border-white transition-transform cursor-default">
            ABOUT HYPERPRED
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-10 bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Algorithm Optimization</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                This project focuses on testing the effectiveness of <span className="text-blue-600 font-bold">XGBoost</span> optimization using 
                <span className="text-blue-600 font-bold"> PSO (Particle Swarm Optimization)</span> to enhance predictive accuracy.
              </p>
            </div>

            <div className="p-10 bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                <ShieldCheck className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Clinical Standards</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Integration with a medical decision support system based on <span className="text-blue-600 font-bold">JNC 7 expert rules</span>, 
                ensuring every result aligns with global medical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THREE EASY STEPS (KODE AWAL TIDAK DIUBAH STRUKTURNYA) --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">THREE EASY STEPS</h2>
            <p className="text-gray-600 mt-4 text-2xl font-medium">Just fill in your data and the AI will analyze it in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition border border-gray-100 group flex flex-col items-center space-y-6">
              <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 transform group-hover:scale-110 transition-transform">
                <Activity className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800">1. Fill Clinical Data</h3>
              <p className="text-gray-600 leading-relaxed text-xl font-medium">
                Enter your health data such as Blood Pressure, Age, and Body Mass.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-2xl hover:shadow-blue-100 transition border border-gray-100 transform md:-translate-y-8 shadow-blue-500/10 group flex flex-col items-center space-y-6 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transform group-hover:rotate-12 transition-transform">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800">2. Hybrid Analysis</h3>
              <p className="text-gray-600 leading-relaxed text-xl font-medium text-center">
                AI and Expert System automatically verify your clinical health status.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition border border-gray-100 group flex flex-col items-center space-y-6">
              <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 transform group-hover:scale-110 transition-transform">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800">3. Get Report</h3>
              <p className="text-gray-600 leading-relaxed text-xl font-medium">
                Receive instant classification status and early medical prevention advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. FOOTER --- */}
      <footer className="bg-slate-50 border-t border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <p className="text-lg text-gray-500 font-bold uppercase tracking-widest text-slate-900">
            © 2026 HyperPred. Information Technology Thesis.
          </p>
          <p className="text-base text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium italic">
            Disclaimer: This system was developed as an IT undergraduate thesis prototype and serves only as an analysis support tool,
            not a replacement for professional medical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
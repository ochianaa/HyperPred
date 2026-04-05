import React from 'react';
import { HeartPulse, CheckCircle, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

const HomePage = ({ onStart }) => {
  return (
    /* Menggunakan min-h-screen tanpa overflow-hidden agar sticky navbar berfungsi */
    <div className="bg-white font-sans text-slate-800 min-h-screen flex flex-col">
      
      {/* NAVBAR STICKY: Ditambahkan bg-white/80 dan backdrop-blur agar tetap terlihat profesional saat scroll */}
      <nav className="sticky top-0 z-[100] w-full h-28 md:h-32 flex items-center border-b border-gray-100 bg-white/80 backdrop-blur-lg transition-all duration-300">
        <div className="w-full px-8 md:px-16 lg:px-24 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-blue-600 transition-transform group-hover:scale-110">
              <HeartPulse className="w-14 h-14 md:w-16 md:h-16" />
            </div>
            <span className="text-4xl md:text-5xl font-black text-blue-700 tracking-tighter uppercase">HyperPred</span>
          </div>
          <div className="hidden md:block">
            <span className="text-3xl font-black text-blue-500 uppercase tracking-[0.2em] italic opacity-80">
              Health is Wealth
            </span>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[calc(100vh-8rem)] flex items-center overflow-hidden bg-white">
          {/* Background Dekoratif Hero */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/80 rounded-full filter blur-[100px] z-0 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full filter blur-[120px] z-0 pointer-events-none"></div>

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">            
              <h1 className="text-7xl md:text-[6.5rem] xl:text-[7.5rem] font-black text-slate-900 leading-[1.05] tracking-tight text-left">
                Smart System <br />
                for Early <span className="text-blue-600">Detection</span> <br />
                <span className="text-blue-600">of Hypertension.</span>
              </h1>
              
              <div className="space-y-6 text-left max-w-4xl mt-4">
                <p 
                  className="text-2xl md:text-4xl text-gray-500 font-medium"
                  style={{ lineHeight: '1.7', marginTop: '0.5rem', marginBottom: '1.5rem' }}
                >
                  Integrating the accuracy of <span className="text-blue-600 font-bold">Machine Learning (XGBoost-PSO)</span> with <span className="text-blue-600 font-bold">Expert System (JNC)</span> for more precise predictions.
                </p>
                
                <div className="inline-flex items-center gap-4 px-6 py-4 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm transition-transform hover:scale-105">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-blue-600"></span>
                  </span>
                  <p className="text-lg md:text-xl font-black text-blue-700 uppercase tracking-[0.15em]">
                    Check now, prevent earlier.
                  </p>
                </div>
              </div>
              
              <div className="text-left pt-2">
                <button 
                  onClick={onStart}
                  className="group inline-flex items-center px-10 py-6 md:px-12 md:py-8 text-3xl md:text-4xl font-black text-white bg-blue-700 rounded-[2.5rem] shadow-2xl hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-2 active:scale-95 shadow-blue-200"
                >
                  Start Prediction Now
                  <ArrowRight className="w-10 h-10 md:w-12 md:h-12 ml-6 group-hover:translate-x-3 transition-transform" strokeWidth={3} />
                </button>
              </div>
            </div>

            <div className="relative hidden md:flex justify-end items-center">
               <div className="absolute inset-0 bg-blue-100/40 rounded-full filter blur-[100px] opacity-60"></div>
               {/* Menambahkan kembali animate-float */}
               <img 
                 src="/illustration.png" 
                 alt="HyperPred Illustration" 
                 className="relative z-10 w-full max-w-[850px] object-contain drop-shadow-2xl animate-float rounded-[3rem] transition-transform duration-500 hover:scale-105"
               />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION: Menambahkan animasi hover pada kartu */}
        <section className="py-32 bg-blue-600 border-t border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="w-full px-8 md:px-16 lg:px-24 text-center relative z-10 flex flex-col items-center">
            <div className="inline-block px-16 py-10 bg-white text-blue-700 rounded-[3rem] font-black text-6xl uppercase tracking-widest mb-24 shadow-2xl border-4 border-white transition-transform hover:scale-110 cursor-default">
              ABOUT HYPERPRED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left w-full max-w-[1600px]">
              <div className="group p-16 bg-white rounded-[4rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 text-center flex flex-col items-center">
                <div className="w-28 h-28 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-blue-200 transition-transform group-hover:rotate-12">
                  <Zap className="text-white w-16 h-16" />
                </div>
                <h3 className="text-6xl font-black mb-8 text-slate-900">Algorithm Optimization</h3>
                <p className="text-slate-600 text-4xl font-medium leading-relaxed">
                  This project focuses on testing the effectiveness of <span className="text-blue-600 font-bold">XGBoost</span> optimization using 
                  <span className="text-blue-600 font-bold"> PSO (Particle Swarm Optimization)</span> to enhance predictive accuracy.
                </p>
              </div>
              <div className="group p-16 bg-white rounded-[4rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 text-center flex flex-col items-center">
                <div className="w-28 h-28 bg-emerald-500 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-emerald-200 transition-transform group-hover:rotate-12">
                  <ShieldCheck className="text-white w-16 h-16" />
                </div>
                <h3 className="text-6xl font-black mb-8 text-slate-900">Clinical Standards</h3>
                <p className="text-slate-600 text-4xl font-medium leading-relaxed">
                  Integration with a medical decision support system based on <span className="text-blue-600 font-bold">JNC 7 expert rules</span>, 
                  ensuring every result aligns with global medical standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS SECTION: Menggunakan StepCard yang sudah diperbarui dengan animasi hover */}
        <section className="py-32 bg-gray-50 border-t border-gray-100">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div className="text-center mb-24">
              <h2 className="text-7xl font-black text-slate-900 tracking-tight uppercase">THREE EASY STEPS</h2>
              <p className="text-gray-600 mt-6 text-4xl font-medium">Just fill in your data and the AI will analyze it in seconds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center max-w-[1800px] mx-auto">
              <StepCard 
                icon={<Activity className="w-16 h-16" />} 
                title="1. Fill Clinical Data" 
                desc="Enter your health data seperti Tekanan Darah, Umur, dan Massa Tubuh." 
                color="bg-blue-100" 
                textColor="text-blue-600" 
              />
              <StepCard 
                icon={<Zap className="w-16 h-16" />} 
                title="2. Hybrid Analysis" 
                desc="AI dan Expert System otomatis memverifikasi status kesehatan klinis Anda." 
                color="bg-blue-600" 
                textColor="text-white" 
                highlight={true} 
              />
              <StepCard 
                icon={<CheckCircle className="w-16 h-16" />} 
                title="3. Get Report" 
                desc="Terima status klasifikasi instan dan saran pencegahan medis dini." 
                color="bg-emerald-100" 
                textColor="text-emerald-600" 
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-32 bg-blue-600 relative overflow-hidden text-center flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <h2 className="relative z-10 text-6xl md:text-7xl font-black text-white tracking-tight uppercase mb-12">
            Ready to Check Your Risk Level?
          </h2>
          <button 
            onClick={onStart}
            className="relative z-10 group flex items-center px-12 py-6 md:px-14 md:py-8 text-3xl md:text-4xl font-black text-blue-700 bg-white rounded-[2.5rem] shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-2 active:scale-95"
          >
            Predict Now
            <ArrowRight className="w-12 h-12 ml-6 group-hover:translate-x-3 transition-transform" strokeWidth={3} />
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-gray-200 py-24">
        <div className="w-full px-8 md:px-16 lg:px-24 text-center space-y-8">
          <p className="text-2xl text-gray-500 font-bold uppercase tracking-widest text-slate-900">
            © 2026 HyperPred. Information Technology Thesis.
          </p>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium italic">
            Disclaimer: This system was developed as an IT undergraduate thesis prototype and serves only as an analysis support tools, not a replacement for professional medical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};

{/* Sub-komponen StepCard dengan penambahan animasi hover */}
const StepCard = ({ icon, title, desc, color, textColor, highlight }) => (
  <div className={`group bg-white p-16 rounded-[4rem] border border-gray-100 flex flex-col items-center space-y-8 transition-all duration-500 transform hover:-translate-y-6 ${highlight ? 'shadow-2xl shadow-blue-500/20 md:-translate-y-8 hover:shadow-blue-500/40' : 'shadow-sm hover:shadow-xl'}`}>
    <div className={`w-32 h-32 ${color} ${textColor} rounded-[2.5rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
      {icon}
    </div>
    <h3 className="text-5xl font-extrabold text-slate-800">{title}</h3>
    <p className="text-gray-600 text-3xl font-medium leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
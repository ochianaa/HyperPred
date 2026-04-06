import React from 'react';
import { HeartPulse, CheckCircle, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

const HomePage = ({ onStart }) => {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen flex flex-col">
      
      {/* NAVBAR: Ukuran dikurangi agar tidak memakan layar */}
      <nav className="sticky top-0 z-[100] w-full h-16 md:h-24 flex items-center border-b border-gray-100 bg-white/80 backdrop-blur-lg transition-all duration-300">
        <div className="w-full px-6 md:px-12 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-blue-600 transition-transform group-hover:scale-110">
              <HeartPulse className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <span className="text-xl md:text-3xl font-black text-blue-700 tracking-tighter uppercase">HyperPred</span>
          </div>
          <div className="hidden md:block">
            <span className="text-sm lg:text-xl font-black text-blue-500 uppercase tracking-[0.2em] italic opacity-80">
              Health is Wealth
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* HERO SECTION: Skala Font diturunkan agar proporsional */}
        <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-white py-8 md:py-12">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-blue-50/80 rounded-full filter blur-[100px] z-0 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>

          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Judul Mobile */}
            <div className="w-full lg:hidden">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                  Smart System for Early <span className="text-blue-600">Detection of Hypertension.</span>
                </h1>
            </div>

            {/* Gambar Hero: Dibatasi maksimal lebarnya */}
            <div className="relative flex justify-center lg:justify-end items-center lg:order-last w-full">
               <div className="absolute inset-0 bg-blue-100/40 rounded-full filter blur-[80px] opacity-60"></div>
               <img 
                 src="/illustration.png" 
                 alt="HyperPred Illustration" 
                 className="relative z-10 w-full max-w-[280px] md:max-w-[400px] lg:max-w-[600px] object-contain drop-shadow-2xl animate-float rounded-2xl lg:rounded-[3rem] transition-transform duration-500 hover:scale-105"
               />
            </div>

            {/* Deskripsi & Tombol Desktop: Ukuran Font yang lebih masuk akal */}
            <div className="flex flex-col justify-center space-y-6 w-full"> 
              <h1 className="hidden lg:block text-5xl xl:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Smart System <br />
                for Early <span className="text-blue-600">Detection</span> <br />
                <span className="text-blue-600">of Hypertension.</span>
              </h1>
              
              <div className="space-y-6 text-left max-w-xl lg:max-w-2xl">
                <p className="text-base md:text-xl lg:text-2xl text-gray-500 font-medium leading-relaxed">
                  Integrating the accuracy of <span className="text-blue-600 font-bold">Machine Learning (XGBoost-PSO)</span> with <span className="text-blue-600 font-bold">Expert System (JNC)</span> for more precise predictions.
                </p>
                
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm transition-transform hover:scale-105">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-blue-600"></span>
                  </span>
                  <p className="text-xs md:text-sm lg:text-base font-black text-blue-700 uppercase tracking-widest">
                    Check now, prevent earlier.
                  </p>
                </div>
              </div>
              
              <div className="text-left pt-2">
                <button 
                  onClick={onStart}
                  className="group w-full md:w-auto inline-flex items-center justify-center px-6 py-4 lg:px-10 lg:py-6 text-lg lg:text-2xl font-black text-white bg-blue-700 rounded-xl lg:rounded-[2rem] shadow-xl hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-blue-200"
                >
                  Start Prediction Now
                  <ArrowRight className="w-5 h-5 lg:w-8 lg:h-8 ml-3 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION: Ukuran dikecilkan agar seimbang */}
        <section className="py-16 lg:py-24 bg-blue-600 border-t border-gray-50 relative overflow-hidden">
          <div className="w-full px-6 lg:px-16 text-center relative z-10 flex flex-col items-center">
            <div className="inline-block px-8 py-3 bg-white text-blue-700 rounded-xl lg:rounded-[2rem] font-black text-xl lg:text-3xl uppercase tracking-widest mb-10 lg:mb-16 shadow-2xl transition-transform hover:scale-105">
              ABOUT HYPERPRED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left w-full max-w-6xl">
              <AboutCard 
                icon={<Zap className="w-8 h-8 lg:w-12 lg:h-12" />}
                title="Algorithm Optimization"
                desc="Testing the effectiveness of XGBoost optimization using PSO (Particle Swarm Optimization) to enhance predictive accuracy."
                iconBg="bg-blue-600"
              />
              <AboutCard 
                icon={<ShieldCheck className="w-8 h-8 lg:w-12 lg:h-12" />}
                title="Clinical Standards"
                desc="Medical decision support system based on JNC 7 expert rules, ensuring results align with global medical standards."
                iconBg="bg-emerald-500"
              />
            </div>
          </div>
        </section>

        {/* STEPS SECTION */}
        <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
          <div className="w-full px-6 lg:px-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">THREE EASY STEPS</h2>
            <p className="text-sm lg:text-xl text-gray-600 mb-12 lg:mb-16 font-medium">Just fill in your data and the AI will analyze it in seconds.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
              <StepCard icon={<Activity />} title="1. Fill Clinical Data" desc="Input health data: Blood Pressure, Age, Body Mass." color="bg-blue-100" textColor="text-blue-600" />
              <StepCard icon={<Zap />} title="2. Hybrid Analysis" desc="AI and Expert System automatically verify your clinical status." color="bg-blue-600" textColor="text-white" highlight={true} />
              <StepCard icon={<CheckCircle />} title="3. Get Report" desc="Receive instant classification and medical advice." color="bg-emerald-100" textColor="text-emerald-600" />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 lg:py-24 bg-blue-700 relative overflow-hidden text-center flex flex-col items-center justify-center px-6">
          <h2 className="relative z-10 text-2xl lg:text-5xl font-black text-white tracking-tight uppercase mb-8 lg:mb-12">
            Ready to Check Your Risk Level?
          </h2>
          <button 
            onClick={onStart}
            className="relative z-10 group w-full md:w-auto flex items-center justify-center px-8 py-4 lg:px-14 lg:py-8 text-lg lg:text-3xl font-black text-blue-700 bg-white rounded-xl lg:rounded-[2.5rem] shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-2"
          >
            Predict Now
            <ArrowRight className="w-6 h-6 lg:w-10 lg:h-10 ml-4 group-hover:translate-x-3 transition-transform" />
          </button>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-gray-200 py-10 lg:py-16 px-6 text-center">
          <p className="text-sm lg:text-base font-bold text-slate-900 uppercase tracking-widest">© 2026 HyperPred. INFORMATION TECHNOLOGY THESIS.</p>
          <p className="text-xs lg:text-sm text-gray-400 max-w-3xl mx-auto mt-2 italic leading-relaxed">
            Disclaimer: This system was developed as an IT undergraduate thesis prototype and serves only as an analysis support tool,
            not a replacement for professional medical diagnosis.
          </p>
      </footer>
    </div>
  );
};

const AboutCard = ({ icon, title, desc, iconBg }) => (
  <div className="group p-6 lg:p-10 bg-white rounded-2xl lg:rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
    <div className={`w-16 h-16 lg:w-20 lg:h-20 ${iconBg || 'bg-blue-600'} rounded-xl flex items-center justify-center mb-6 text-white group-hover:rotate-6 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl lg:text-3xl font-black mb-4 text-slate-900 text-center uppercase tracking-tight">{title}</h3>
    <p className="text-gray-600 text-sm lg:text-lg font-medium leading-relaxed text-justify">{desc}</p>
  </div>
);

const StepCard = ({ icon, title, desc, color, textColor, highlight }) => (
  <div className={`group p-6 lg:p-10 rounded-2xl lg:rounded-[3rem] border border-gray-100 flex flex-col items-center space-y-4 transition-all duration-500 transform hover:-translate-y-4 ${highlight ? 'bg-white shadow-xl lg:-translate-y-6' : 'bg-white shadow-sm'}`}>
    <div className={`w-12 h-12 lg:w-20 lg:h-20 ${color} ${textColor} rounded-xl lg:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
      {React.cloneElement(icon, { className: "w-6 h-6 lg:w-10 lg:h-10" })}
    </div>
    <h3 className="text-lg lg:text-2xl font-black text-slate-800">{title}</h3>
    <p className="text-gray-500 text-xs lg:text-base font-medium leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
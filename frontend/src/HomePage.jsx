// src/HomePage.jsx
import React from 'react';
import { HeartPulse, CheckCircle } from "lucide-react";

const HomePage = ({ onStart }) => {
  return (
    // Menggunakan font dasar text-lg untuk seluruh halaman
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 text-lg">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <HeartPulse className="w-10 h-10" />
              </div>
              <span className="text-xl font-black text-blue-700 tracking-tighter">HyperPred</span>
            </div>
            <div className="text-sm md:text-base text-gray-500 font-semibold">
              Ochiana (2026). Information Technology Thesis.
            </div>
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-24 relative overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Kolom Kiri: Teks Ajakan */}
          <div className="text-left space-y-8">            
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Smart System for Early Detection <br />
              <span className="text-blue-600">of Hypertension Risk</span>
            </h1>
            
            <div className="text-2xl text-gray-600 leading-relaxed max-w-2xl font-medium space-y-4">
              <p>Integrating the accuracy of machine learning (XGBoost-PSO) with expert medical standards 
                (JNC) for more precise predictions.</p>
              {/* Kalimat dipisah agar menonjol sendiri tanpa kotak */}
              <p className="text-1x1 font-bold text-blue-700 pt-2 block">
                Check now, and prevent earlier.
              </p>
            </div>
            
            {/* Tombol diperbesar ukuran font dan padding-nya */}
            <button 
              onClick={onStart}
              className="inline-flex items-center px-6 py-6 text-2xl font-black text-white bg-blue-700 rounded-2xl shadow-2xl hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-blue-200"
            >
              Start Prediction Now
              <svg className="w-8 h-8 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Kolom Kanan: Foto Dokter (Digeser ke kanan lagi sedikit) */}
          <div className="relative md:-mr-16">
            <div className="relative z-10 flex justify-center items-center">
               <img 
                 src="/aset_hipertensi.jpg" 
                 alt="HyperPred Doctor" 
                 className="w-full max-w-xl object-contain drop-shadow-2xl animate-float"
               />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ABOUT US --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">ABOUT US</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-12 rounded-[2.5rem] border border-blue-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-3 h-full bg-blue-500 rounded-l-full"></div>
             <p className="text-gray-700 leading-relaxed text-xl font-semibold">
               This application was developed as part of an <strong>Information Technology undergraduate thesis</strong>.
               The main objective is to test the effectiveness of <strong>XGBoost</strong> algorithm optimization using 
               <strong> PSO (Particle Swarm Optimization)</strong>, which is then integrated into a medical decision support system 
               based on <strong>(JNC)</strong> expert rules.
             </p>
          </div>
        </div>
      </section>

      {/* --- 3. HOW TO USE --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">THREE EASY STEPS</h2>
            <p className="text-gray-600 mt-3 text-xl font-medium">Just fill in your data and the AI will analyze it in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition border border-gray-100 group space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 transform group-hover:scale-110 transition-transform">
                <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">1. Fill Clinical Data</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                Enter your health data such as Systolic/Diastolic blood pressure, Age, Weight, and Height.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[2rem] shadow-2xl hover:shadow-blue-100 transition border border-gray-100 transform md:-translate-y-6 shadow-blue-500/10 group space-y-6">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transform group-hover:rotate-12 transition-transform">
                <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">2. Smart AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                Our Hybrid system automatically verifies your data using JNC Standards and the XGBoost-PSO AI model.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition border border-gray-100 group space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 transform group-hover:scale-110 transition-transform">
                <CheckCircle className="w-11 h-11" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">3. Get Reports</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                Receive instant health risk reports along with JNC classification status and early medical prevention advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. FOOTER --- */}
      <footer className="bg-slate-50 border-t border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-base text-gray-500 font-semibold">
            © 2026 <strong>Ochiana</strong>. Information Technology Thesis.
          </p>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Disclaimer: This system was developed as an Information Technology undergraduate thesis prototype and serves only as an analysis support tool,
            not a replacement for professional medical diagnosis. Always consult results with professional medical personnel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
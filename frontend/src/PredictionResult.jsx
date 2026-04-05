import React, { useEffect } from 'react';
import { Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity, Heart, ClipboardCheck, ShieldCheck, Info, ShieldAlert, Cpu } from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  const resultData = data?.data || data || {}; 
  
  const classification = resultData.klasifikasi_jnc || resultData.prediksi_xgboost || "Unknown";
  const probability = resultData.probabilitas ? String(resultData.probabilitas).replace('%', '') : "0.00";
  const source = resultData.sumber || "Sistem";
  const input = resultData.input_data || data?.input_data || {};

  let sysFinal = input.sistole;
  let diaFinal = input.diastole;
  if (!sysFinal && resultData.tekanan_darah) {
      const tdParts = resultData.tekanan_darah.split(' ')[0].split('/');
      if(tdParts.length === 2) {
          sysFinal = tdParts[0];
          diaFinal = tdParts[1];
      }
  }

  const getJNCStatus = (label) => {
    const l = label ? label.toLowerCase() : "";
    if (l.includes("normal") || l.includes("tidak terdeteksi")) 
      return { 
        color: "text-emerald-600", 
        bg: "bg-emerald-50", 
        icon: CheckCircle, 
        level: 1, 
        desc: "Your blood pressure is within the normal range. Maintain a healthy lifestyle." 
      };
    if (l.includes("pre")) 
      return { 
        color: "text-yellow-600", 
        bg: "bg-yellow-50", 
        icon: Activity, 
        level: 2, 
        desc: "You are in the Pre-Hypertension category. Start exercise regularly." 
      };
    if (l.includes("stage 1")) 
      return { 
        color: "text-orange-600", 
        bg: "bg-orange-50", 
        icon: AlertTriangle, 
        level: 3, 
        desc: "Hypertension Stage 1 detected. It is recommended to consult with a healthcare professional soon." 
      };
    if (l.includes("stage 2")) 
      return { 
        color: "text-red-600", 
        bg: "bg-red-50", 
        icon: AlertOctagon, 
        level: 4, 
        desc: "Hypertension Stage 2 detected. Immediate medical attention is required to control your blood pressure." 
      };
    return { color: "text-gray-600", bg: "bg-gray-50", icon: Activity, level: 0, desc: "Undefined data." };
  };

  const statusStyle = getJNCStatus(classification);

  const getBMICategoryLabel = (val) => {
    const map = { "0": "Underweight", "1": "Normal", "2": "Overweight", "3": "Obese" };
    const key = String(val);
    return map[key] || "Normal";
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 font-sans flex flex-col items-center justify-start print:bg-white print:p-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @media screen {
          .report-container { width: 850px !important; margin: 0 auto; }
        }
        @media print {
          /* Paksa browser mempertahankan warna dan layout */
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            background-color: white !important;
          }
          .no-print { display: none !important; }
          .report-container { 
            width: 100% !important; 
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 20px !important;
            box-shadow: none !important;
          }
          /* Perbaiki layout flex yang hancur saat print */
          .flex-wrap { flex-wrap: nowrap !important; }
          .grid { display: flex !important; }
          .grid-cols-4 > div { flex: 1; margin: 0 5px; }
          
          /* Cegah kotak terpotong di halaman baru */
          .avoid-break { page-break-inside: avoid; }
        }
      `}} />

      <div className="report-container space-y-6 w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center py-4 border-b-4 border-blue-600 flex justify-between items-center avoid-break">
          <div className="flex items-center gap-2 text-blue-700">
             <Heart className="w-8 h-8 fill-current" />
             <span className="font-black text-2xl uppercase tracking-tighter">HyperPred</span>
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Medical Assessment Report</span>
        </div>

        {/* Kotak Hasil Utama */}
        <div className={`rounded-[3rem] border-4 border-gray-100 overflow-hidden shadow-sm avoid-break print:border-2 ${statusStyle.bg}`}>
          <div className="p-8 text-center">
            <h2 className="text-gray-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Based on Integrated Prediction Result</h2>
            
            <div className={`text-6xl md:text-8xl font-black mb-6 tracking-tighter print:text-5xl ${statusStyle.color}`}>
              {classification}
            </div>

            <div className="flex justify-center gap-4 mb-8 flex-wrap print:flex-nowrap print:justify-between">
               <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border-2 border-gray-100 shadow-md flex-1 justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-black text-gray-500 uppercase">Probability:</span>
                  <span className="text-3xl font-black text-blue-700">
                    {probability}%
                  </span>
               </div>
               
               <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border-2 border-gray-100 shadow-md flex-1 justify-center">
                  <Cpu className={`w-6 h-6 ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className="text-sm font-black text-gray-500 uppercase">Decision By:</span>
                  <span className={`text-lg font-black uppercase ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`}>
                    {source.includes('Pakar') ? 'Expert System' : 'XGBoost'}
                  </span>
               </div>
            </div>

            <div className="max-w-md mx-auto px-4 mb-8">
               <div className="flex gap-3 h-6 mb-3 print:h-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={`flex-1 rounded-full ${step <= statusStyle.level ? (step === 1 ? 'bg-emerald-500' : step === 2 ? 'bg-yellow-400' : step === 3 ? 'bg-orange-500' : 'bg-red-600') : 'bg-gray-200'}`} />
                  ))}
               </div>
               <div className="flex justify-between text-center text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-tighter">
                  <span className={`flex-1 ${statusStyle.level === 1 ? statusStyle.color : ""}`}>Normal</span>
                  <span className={`flex-1 ${statusStyle.level === 2 ? statusStyle.color : ""}`}>Pre-Hpt</span>
                  <span className={`flex-1 ${statusStyle.level === 3 ? statusStyle.color : ""}`}>Stage 1</span>
                  <span className={`flex-1 ${statusStyle.level === 4 ? statusStyle.color : ""}`}>Stage 2</span>
               </div>
            </div>

            <div className="bg-white/70 p-6 rounded-[2rem] border-2 border-white max-w-3xl mx-auto flex items-start gap-4 shadow-sm print:border-gray-200">
                <Info className={`w-8 h-8 flex-shrink-0 mt-1 ${statusStyle.color}`} />
                <p className="text-lg md:text-xl font-bold text-gray-700 text-left leading-relaxed print:text-sm">
                    {statusStyle.desc}
                </p>
            </div>
          </div>
        </div>

        {/* Kotak Ringkasan Data Pasien */}
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 shadow-sm avoid-break print:p-4">
           <h3 className="font-black text-gray-800 text-lg flex items-center gap-2 mb-6 uppercase tracking-widest border-l-8 border-blue-600 pl-4 print:text-base">
             <ClipboardCheck className="w-6 h-6 text-blue-600" /> Patient Data Summary
           </h3>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 print:flex print:flex-row print:justify-between print:gap-2">
              <DataBox label="Systolic" value={sysFinal} unit="mmHg" color="text-red-600" />
              <DataBox label="Diastolic" value={diaFinal} unit="mmHg" color="text-red-600" />
              <DataBox label="BMI Score" value={input.imt} unit="kg/m²" color="text-blue-700" />
              <DataBox label="Age" value={input.umur} unit="Years" color="text-gray-700" />
           </div>

           <div className="bg-gray-50 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between border-2 border-gray-100 print:flex-row print:p-4">
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0 md:ml-4">Body Mass Classification:</span>
              <div className="flex items-center gap-4 md:gap-6">
                  <span className="text-3xl md:text-4xl font-black text-blue-700 uppercase tracking-tighter">
                    {getBMICategoryLabel(input.imt_category)}
                  </span>
                  <div className="hidden md:block h-12 w-[3px] bg-gray-200 print:block"></div>
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 max-w-[150px] leading-tight uppercase text-center md:text-right print:text-right">Based on WHO Standards</span>
              </div>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center gap-4 avoid-break">
          <ShieldAlert className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <p className="text-sm md:text-base leading-relaxed text-blue-900 font-medium italic print:text-xs">
            Medical Disclaimer: This result is an initial AI-based screening. 
            Consult a physician immediately if high risk is detected or for further medical evaluation.
          </p>
        </div>

        {/* Tombol Aksi (Tidak diprint) */}
        <div className="flex gap-4 justify-center no-print pt-4">
          <button onClick={onReset} className="flex items-center gap-3 px-8 md:px-12 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm md:text-base uppercase">
            <RefreshCcw className="w-5 h-5" /> Analyze Again
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-3 px-8 md:px-12 py-4 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 shadow-xl text-sm md:text-base uppercase">
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-4 avoid-break">
            Automated Assessment System • (c) 2026 Ochiana IT Thesis
        </p>
      </div>
    </div>
  );
};

const DataBox = ({ label, value, unit, color }) => {
  const isValid = value !== undefined && value !== null && String(value).trim() !== '' && String(value).toLowerCase() !== 'nan';
  const displayValue = isValid ? value : '--';
  
  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-3xl border-2 border-gray-100 flex flex-col items-center justify-center print:flex-1 print:mx-1 print:p-2">
      <div className="text-[10px] md:text-xs font-black text-gray-400 uppercase mb-2 tracking-widest text-center">{label}</div>
      <div className={`text-3xl md:text-5xl font-black ${color} flex items-baseline gap-1 tracking-tighter print:text-3xl`}>
        {displayValue} 
        <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase ml-1">{unit}</span>
      </div>
    </div>
  );
};

export default PredictionResult;
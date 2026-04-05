import React from 'react';
import { HeartPulse, Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity, ClipboardCheck, ShieldCheck, Info, ShieldAlert, Cpu} from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  const resultData = data.data || data; 
  
  const classification = resultData.klasifikasi_jnc || "Unknown";
  const probability = resultData.probabilitas ? resultData.probabilitas.replace('%', '') : "0.00";
  const source = resultData.sumber || "Sistem";
  const input = resultData.input_data || {};

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
    <div className="min-h-screen bg-white py-6 px-4 font-sans flex flex-col items-center justify-start">
      <style dangerouslySetInnerHTML={{ __html: `
        @media screen {
          .report-container { width: 100% !important; max-width: 100% !important; margin: 0 auto; }
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            margin: 0 !important;
            padding: 0 !important;
          }
          
          @page { margin: 1cm; size: auto; }

          .no-print { display: none !important; }
          
          /* Container Utama - Mengunci Lebar */
          .report-container { 
             width: 800px !important; 
             max-width: 800px !important; 
             margin: 0 auto !important; 
             padding: 0 !important;
             display: block !important; /* Mencegah bug flex di PDF */
          }
          
          /* Mencegah terpotong */
          .avoid-break { 
             page-break-inside: avoid !important; 
             break-inside: avoid !important;
             display: block !important;
             margin-bottom: 20px !important;
          }

          /* Reset Font PDF ke Asli */
          .report-container * { font-size: initial !important; }
          
          /* Header */
          .print-header-icon svg { width: 1.5rem !important; height: 1.5rem !important; }
          .print-header-title { font-size: 1.5rem !important; line-height: 2rem !important; } 
          .print-header-subtitle { font-size: 0.75rem !important; line-height: 1rem !important; }

          /* Hero Box */
          .print-hero-box { padding: 2rem !important; border-radius: 2rem !important; border: 1px solid #e5e7eb !important; } 
          .print-hero-label { font-size: 0.75rem !important; line-height: 1rem !important; margin-bottom: 0.5rem !important; }
          .print-hero-class { font-size: 4.5rem !important; line-height: 1 !important; margin-bottom: 1rem !important; } 

          /* Badges - Ubah ke block layout untuk PDF */
          .print-badge-container { display: flex !important; justify-content: center !important; gap: 1rem !important; margin-bottom: 1.5rem !important; }
          .print-badge { padding: 0.5rem 1.5rem !important; border: 1px solid #e5e7eb !important; border-radius: 2rem !important; } 
          .print-badge-icon { width: 1.25rem !important; height: 1.25rem !important; margin-right: 0.5rem !important; } 
          .print-badge-label { font-size: 0.75rem !important; line-height: 1rem !important; margin-right: 0.5rem !important;} 
          .print-badge-prob { font-size: 1.5rem !important; line-height: 2rem !important; } 
          .print-badge-src { font-size: 1rem !important; line-height: 1.5rem !important; } 

          /* Status Bar */
          .print-status-wrap { width: 100% !important; max-width: 24rem !important; margin: 0 auto 1.5rem auto !important; display: block !important; } 
          .print-status-bar { display: flex !important; height: 1rem !important; margin-bottom: 0.5rem !important; gap: 0.25rem !important; } 
          .print-status-text-grid { display: flex !important; justify-content: space-between !important; } 
          .print-status-text { font-size: 0.65rem !important; line-height: 1rem !important; flex: 1 !important; text-align: center !important; } 

          /* Info Box */
          .print-info-box { padding: 1rem !important; border-radius: 1rem !important; max-width: 100% !important; display: flex !important; gap: 1rem !important; border: 1px solid #e5e7eb !important; } 
          .print-info-icon { width: 1.5rem !important; height: 1.5rem !important; margin-top: 0 !important; } 
          .print-info-text { font-size: 1rem !important; line-height: 1.5rem !important; } 

          /* Summary Section */
          .print-summary-box { padding: 1.5rem !important; border-radius: 1.5rem !important; border: 1px solid #e5e7eb !important; margin-bottom: 1rem !important; display: block !important; } 
          .print-summary-title { font-size: 1rem !important; line-height: 1.5rem !important; margin-bottom: 1.5rem !important; border-left-width: 4px !important; padding-left: 0.75rem !important; } 
          .print-summary-title-icon { width: 1.25rem !important; height: 1.25rem !important; margin-right: 0.5rem !important; } 
          
          /* DataBoxes - Statis di PDF */
          .print-grid-container { display: flex !important; justify-content: space-between !important; margin-bottom: 1.5rem !important; gap: 0.5rem !important; } 
          .print-databox { padding: 1rem !important; border-radius: 1rem !important; border: 1px solid #e5e7eb !important; flex: 1 !important; text-align: center !important; } 
          .print-databox-label { font-size: 0.65rem !important; line-height: 1rem !important; margin-bottom: 0.25rem !important; display: block !important;} 
          .print-databox-val { font-size: 2rem !important; line-height: 1 !important; display: inline-flex !important; align-items: baseline !important; justify-content: center !important;} 
          .print-databox-unit { font-size: 0.65rem !important; line-height: 1rem !important; margin-left: 0.25rem !important; } 

          /* BMI Row */
          .print-bmi-row { padding: 1rem !important; border-radius: 1rem !important; border: 1px solid #e5e7eb !important; display: flex !important; justify-content: space-between !important; align-items: center !important; } 
          .print-bmi-label { font-size: 0.75rem !important; line-height: 1rem !important; margin-left: 0.5rem !important; } 
          .print-bmi-gap { display: flex !important; align-items: center !important; gap: 1rem !important; } 
          .print-bmi-val { font-size: 1.5rem !important; line-height: 2rem !important; } 
          .print-bmi-divider { height: 2rem !important; width: 2px !important; display: block !important; } 
          .print-bmi-desc { font-size: 0.65rem !important; line-height: 1rem !important; max-width: 100px !important; text-align: right !important;} 

          /* Disclaimer */
          .print-disc-box { padding: 0.75rem !important; border-radius: 0.75rem !important; display: flex !important; gap: 0.75rem !important; align-items: center !important; } 
          .print-disc-icon { width: 1.25rem !important; height: 1.25rem !important; flex-shrink: 0 !important; } 
          .print-disc-text { font-size: 0.875rem !important; line-height: 1.25rem !important; margin: 0 !important;} 

          /* Footer */
          .print-footer { font-size: 0.6rem !important; padding-top: 1rem !important; margin-bottom: 0 !important;} 
        }
        .status-bg-dynamic { transition: all 0.5s ease; }
      `}} />

      <div className="report-container w-full px-8 md:px-16 lg:px-24 min-h-screen space-y-4 print-container">
        
        {/* Navbar */}
        <div className="text-center py-2 border-b-4 border-blue-600 flex justify-between items-center no-print-bg avoid-break">
          <div onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-blue-700 print-header-icon cursor-pointer hover:opacity-80 transition-all"
            title="Back to Home">
             <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
             <span className="font-black text-5xl uppercase tracking-tighter print-header-title">HyperPred</span>
          </div>
          <span className="text-2xl font-bold text-gray-400 uppercase tracking-widest print-header-subtitle">Medical Assessment Report</span>
        </div>

        {/* Hero Section */}
        <div className={`rounded-[3rem] border-4 border-gray-100 overflow-hidden shadow-sm avoid-break print-hero-box ${statusStyle.bg}`}>
          <div className="p-10 text-center">
            <h2 className="text-gray-500 font-black uppercase tracking-[0.3em] text-2xl mb-4 print-hero-label">Based on Integrated Prediction Result</h2>
            
            <div className={`text-9xl font-black mb-6 tracking-tighter print-hero-class ${statusStyle.color}`}>
              {classification}
            </div>

            <div className="flex justify-center gap-4 mb-10 flex-wrap print-badge-container">
               <div className="flex items-center gap-3 px-8 py-3 bg-white rounded-full border-2 border-gray-100 shadow-md print-badge">
                  <ShieldCheck className="w-6 h-6 text-blue-600 print-badge-icon" />
                  <span className="text-2xl font-black text-gray-500 uppercase print-badge-label">Probability:</span>
                  <span className="text-6xl font-black text-blue-700 print-badge-prob">
                    {probability}%
                  </span>
               </div>
               
               <div className="flex items-center gap-3 px-8 py-3 bg-white rounded-full border-2 border-gray-100 shadow-md print-badge">
                  <Cpu className={`w-6 h-6 print-badge-icon ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className="text-2xl font-black text-gray-500 uppercase print-badge-label">Decision By:</span>
                  <span className={`text-3xl font-black uppercase print-badge-src ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`}>
                    {source.includes('Pakar') ? 'Expert System' : 'XGBoost AI'}
                  </span>
               </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 mb-10 avoid-break print-status-wrap">
               <div className="flex gap-4 h-8 mb-4 print-status-bar">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={`flex-1 rounded-full ${step <= statusStyle.level ? (step === 1 ? 'bg-emerald-500' : step === 2 ? 'bg-yellow-400' : step === 3 ? 'bg-orange-500' : 'bg-red-600') : 'bg-gray-200'}`} />
                  ))}
               </div>
               <div className="grid grid-cols-4 gap-4 text-center text-xl font-black text-gray-400 uppercase tracking-tighter print-status-text-grid">
                  <span className={`print-status-text ${statusStyle.level === 1 ? statusStyle.color : ""}`}>Normal</span>
                  <span className={`print-status-text ${statusStyle.level === 2 ? statusStyle.color : ""}`}>Pre-Hpt</span>
                  <span className={`print-status-text ${statusStyle.level === 3 ? statusStyle.color : ""}`}>Stage 1</span>
                  <span className={`print-status-text ${statusStyle.level === 4 ? statusStyle.color : ""}`}>Stage 2</span>
               </div>
            </div>

            <div className="bg-white/80 p-8 rounded-[2rem] border-2 border-white max-w-6xl mx-auto flex items-start gap-6 shadow-md avoid-break border-gray-200 print-info-box">
                <Info className={`w-10 h-10 flex-shrink-0 mt-1 print-info-icon ${statusStyle.color}`} />
                <p className="text-4xl font-bold text-gray-700 text-left leading-relaxed print-info-text">
                    {statusStyle.desc}
                </p>
            </div>
          </div>
        </div>

        {/* Patient Data Summary */}
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 shadow-sm avoid-break print-summary-box">
           <h1 className="font-black text-gray-800 text-2xl flex items-center gap-2 mb-8 uppercase tracking-widest border-l-8 border-blue-600 pl-4 print-summary-title">
             <ClipboardCheck className="w-6 h-6 text-blue-600 print-summary-title-icon" /> Patient Data Summary
           </h1>
           
           <div className="grid grid-cols-4 gap-6 mb-8 print-grid-container">
              <DataBox label="Systolic" value={input.sistole} unit="mmHg" color="text-red-600" />
              <DataBox label="Diastolic" value={input.diastole} unit="mmHg" color="text-red-600" />
              <DataBox label="BMI Score" value={input.imt} unit="kg/m²" color="text-blue-700" />
              <DataBox label="Age" value={input.umur} unit="Years" color="text-gray-700" />
           </div>

           <div className="bg-gray-50 rounded-3xl p-6 flex items-center justify-between border-2 border-gray-100 avoid-break print-bmi-row">
              <span className="text-3xl font-black text-gray-400 uppercase tracking-widest ml-4 print-bmi-label">Body Mass Classification:</span>
              <div className="flex items-center justify-end gap-8 min-w-[400px] bmi-class-box">
                  <span className="text-6xl font-black text-blue-700 uppercase tracking-tighter bmi-class-val mr-10">
                    {getBMICategoryLabel(input.imt_category)}
                  </span>
                  <div className="h-12 w-[3px] bg-gray-200 print-bmi-divider"></div>
                  <span className="text-base font-bold text-gray-400 max-w-[150px] leading-tight uppercase text-right print-bmi-desc">Based on WHO Standards</span>
              </div>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center gap-4 avoid-break print-disc-box">
          <ShieldAlert className="w-7 h-7 text-blue-600 flex-shrink-0 print-disc-icon" />
          <p className="text-3xl leading-relaxed text-blue-900 font-medium italic print-disc-text">
            Medical Disclaimer: This result is an initial AI-based screening. 
            Consult a physician immediately if high risk is detected or for further medical evaluation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center no-print pt-6 pb-4">
          <button onClick={onReset} className="flex items-center gap-4 px-14 py-6 bg-gray-100 text-gray-500 font-black rounded-3xl hover:bg-gray-200 transition-all text-3xl uppercase shadow-sm">
            <RefreshCcw className="w-8 h-8" /> Analyze Again
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-4 px-14 py-6 bg-blue-700 text-white font-black rounded-3xl hover:bg-blue-800 shadow-xl text-3xl uppercase">
            <Download className="w-8 h-8" /> Download PDF
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 font-bold uppercase tracking-[0.2em] pt-4 print-footer avoid-break">
            Health Is Wealth, Prevention is Power • (c) 2026 HyperPred. 
        </p>
      </div>
    </div>
  );
};

// DataBox Component
const DataBox = ({ label, value, unit, color }) => (
  <div className="bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 flex flex-col items-center justify-center avoid-break print-databox">
    <span className="text-base font-black text-gray-400 uppercase mb-2 tracking-widest text-center print-databox-label">{label}</span>
    <span className={`text-7xl font-black ${color} flex items-baseline gap-1 tracking-tighter print-databox-val`}>
      {value || '--'} 
      <span className="text-base font-bold text-gray-300 uppercase ml-1 print-databox-unit">{unit}</span>
    </span>
  </div>
);

export default PredictionResult;
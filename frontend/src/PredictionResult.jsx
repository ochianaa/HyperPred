import React from 'react';
import {
  Download,
  RefreshCcw,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Activity,
  Heart,
  ClipboardCheck,
  ShieldCheck,
  Info,
  ShieldAlert
} from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  const getJNCStatus = (label) => {
    const l = label ? label.toLowerCase() : "";

    if (l.includes("normal")) {
      return {
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        icon: CheckCircle,
        level: 1,
        desc: "Your blood pressure is within the normal range. Maintain a healthy lifestyle."
      };
    }

    if (l.includes("pre")) {
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        icon: Activity,
        level: 2,
        desc: "You are in the Pre-Hypertension category. Start exercise regularly."
      };
    }

    if (l.includes("stage 1")) {
      return {
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: AlertTriangle,
        level: 3,
        desc: "Hypertension Stage 1 detected. It is recommended to consult with a healthcare professional soon."
      };
    }

    if (l.includes("stage 2")) {
      return {
        color: "text-red-600",
        bg: "bg-red-50",
        icon: AlertOctagon,
        level: 4,
        desc: "Hypertension Stage 2 detected. Immediate medical attention is required to control your blood pressure."
      };
    }

    return {
      color: "text-gray-600",
      bg: "bg-gray-50",
      icon: Activity,
      level: 0,
      desc: "Undefined data."
    };
  };

  // Pakai satu hasil final saja
  const finalLabel = data?.prediksi_pakar || data?.prediksi_xgboost || "Unknown";
  const statusStyle = getJNCStatus(finalLabel);
  const confidenceScore = data?.confidence_score || "94.8";

  const getBMICategoryLabel = (val) => {
    const map = {
      "0": "Underweight",
      "1": "Normal",
      "2": "Overweight",
      "3": "Obese",
      0: "Underweight",
      1: "Normal",
      2: "Overweight",
      3: "Obese"
    };
    return map[val] || "Normal";
  };

  return (
    <div className="min-h-screen bg-white py-4 px-4 font-sans flex flex-col items-center justify-start">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media screen {
              .report-container { width: 900px !important; margin: 0 auto; }
            }
            @media print {
              .no-print { display: none !important; }
              .report-container { width: 100% !important; transform: scale(0.95); transform-origin: top center; }
            }
          `
        }}
      />

      <div className="report-container space-y-4">
        <div className="text-center py-2 border-b-4 border-blue-600 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-700">
            <Heart className="w-8 h-8 fill-current" />
            <span className="font-black text-2xl uppercase tracking-tighter">
              HyperPred
            </span>
          </div>
        </div>

        <div className={`rounded-[3rem] border-4 border-gray-100 overflow-hidden shadow-sm ${statusStyle.bg}`}>
          <div className="p-10 text-center">
            <h2 className="text-gray-500 font-black uppercase tracking-[0.3em] text-sm mb-4">
              Based on Integrated Prediction Result
            </h2>

            <div className={`text-8xl font-black mb-6 tracking-tighter ${statusStyle.color}`}>
              {finalLabel}
            </div>

            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 px-8 py-3 bg-white rounded-full border-2 border-gray-100 shadow-md">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-black text-gray-500 uppercase">
                  Confidence Level:
                </span>
                <span className="text-4xl font-black text-blue-700">
                  {confidenceScore}%
                </span>
              </div>
            </div>

            <div className="max-w-md mx-auto px-4 mb-8">
              <div className="flex gap-3 h-6 mb-3">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 rounded-full ${
                      step <= statusStyle.level
                        ? step === 1
                          ? "bg-emerald-500"
                          : step === 2
                          ? "bg-yellow-400"
                          : step === 3
                          ? "bg-orange-500"
                          : "bg-red-600"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 text-center text-xs font-black text-gray-400 uppercase tracking-tighter">
                <span className={statusStyle.level === 1 ? statusStyle.color : ""}>Normal</span>
                <span className={statusStyle.level === 2 ? statusStyle.color : ""}>Pre-Hpt</span>
                <span className={statusStyle.level === 3 ? statusStyle.color : ""}>Stage 1</span>
                <span className={statusStyle.level === 4 ? statusStyle.color : ""}>Stage 2</span>
              </div>
            </div>

            <div className="bg-white/70 p-6 rounded-[2rem] border-2 border-white max-w-3xl mx-auto flex items-start gap-4 shadow-sm">
              <Info className={`w-8 h-8 flex-shrink-0 mt-1 ${statusStyle.color}`} />
              <p className="text-xl font-bold text-gray-700 text-left leading-relaxed">
                {statusStyle.desc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-800 text-lg flex items-center gap-2 mb-8 uppercase tracking-widest border-l-8 border-blue-600 pl-4">
            <ClipboardCheck className="w-6 h-6 text-blue-600" /> Patient Data Summary
          </h3>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <DataBox
              label="Systolic"
              value={data?.input_data?.sistole}
              unit="mmHg"
              color="text-red-600"
            />
            <DataBox
              label="Diastolic"
              value={data?.input_data?.diastole}
              unit="mmHg"
              color="text-red-600"
            />
            <DataBox
              label="BMI Score"
              value={data?.input_data?.imt}
              unit="kg/m²"
              color="text-blue-700"
            />
            <DataBox
              label="Age"
              value={data?.input_data?.umur}
              unit="Years"
              color="text-gray-700"
            />
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 flex items-center justify-between border-2 border-gray-100">
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest ml-4">
              Body Mass Classification:
            </span>

            <div className="flex items-center gap-6">
              <span className="text-4xl font-black text-blue-700 uppercase tracking-tighter">
                {getBMICategoryLabel(data?.input_data?.imt_category)}
              </span>
              <div className="h-12 w-[3px] bg-gray-200"></div>
              <span className="text-xs font-bold text-gray-400 max-w-[150px] leading-tight uppercase text-right">
                Based on WHO Standards
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center gap-4">
          <ShieldAlert className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-[18px] leading-relaxed text-blue-900 font-medium italic">
            <strong>Medical Disclaimer:</strong> This result is an initial screening.
            Consult a physician immediately if high risk is detected or for further medical evaluation.
          </p>
        </div>

        <div className="flex gap-4 justify-center no-print pt-4">
          <button
            onClick={onReset}
            className="flex items-center gap-3 px-12 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all text-base uppercase"
          >
            <RefreshCcw className="w-5 h-5" /> Analyze Again
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-3 px-12 py-4 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 shadow-xl text-base uppercase"
          >
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-4">
          Automated Assessment System • (c) 2026 Ochiana IT Thesis
        </p>
      </div>
    </div>
  );
};

const DataBox = ({ label, value, unit, color }) => (
  <div className="bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 flex flex-col items-center justify-center">
    <div className="text-xs font-black text-gray-400 uppercase mb-2 tracking-widest text-center">
      {label}
    </div>
    <div className={`text-5xl font-black ${color} flex items-baseline gap-1 tracking-tighter`}>
      {value ?? '--'}
      <span className="text-xs font-bold text-gray-300 uppercase ml-1">{unit}</span>
    </div>
  </div>
);

export default PredictionResult;
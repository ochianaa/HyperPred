import React, { useState, useEffect } from 'react';
import { HeartPulse, Activity, ArrowLeft, Thermometer, ShieldCheck } from "lucide-react";

const PredictionForm = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    jenis_kelamin: '0', 
    umur: '',
    merokok: '0',
    tinggi: '',
    berat: '',
    sistole: '',
    diastole: '',
    imt_category: '' 
  });

  const [loading, setLoading] = useState(false);

  const calculateIMTValue = () => {
    if (formData.tinggi && formData.berat) {
      const tinggiMeter = formData.tinggi / 100;
      return (formData.berat / (tinggiMeter * tinggiMeter)).toFixed(2);
    }
    return "0.00";
  };

  useEffect(() => {
    const imt = parseFloat(calculateIMTValue());
    if (imt > 0) {
      let category = '';
      if (imt < 18.5) category = '0';      
      else if (imt < 25) category = '1';   
      else if (imt < 30) category = '2';   
      else category = '3';                
      
      setFormData(prev => ({ ...prev, imt_category: category }));
    }
  }, [formData.tinggi, formData.berat]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getCategoryName = (val) => {
    const names = { '0': 'Underweight', '1': 'Normal Weight', '2': 'Overweight', '3': 'Obese' };
    return names[val] || 'WAITING FOR DATA...';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      imt: calculateIMTValue()
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.status === "success") onSuccess(result);
      else alert("Error: " + result.message);
    } catch (error) {
      alert("Backend not running. Please start app.py");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 font-sans">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-700 p-10 text-white">
        <h1 className="text-5xl font-black mb-3 flex items-center gap-4">
          <HeartPulse className="w-12 h-12" /> CLINICAL DATA
        </h1>
        <p className="text-blue-100 text-xl opacity-90 leading-relaxed font-medium">
          Input clinical parameters for hybrid risk assessment (Expert System + XGBoost-PSO).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-10">
        {/* Toggle Buttons: Gender & Smoking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToggleButton label="GENDER" name="jenis_kelamin" value={formData.jenis_kelamin} options={[{val:'0', label:'Male'}, {val:'1', label:'Female'}]} onSelect={handleSelect} />
          <ToggleButton label="SMOKING" name="merokok" value={formData.merokok} options={[{val:'0', label:'No'}, {val:'1', label:'Yes'}]} onSelect={handleSelect} />
        </div>

        {/* Input Groups: Age, Height, Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup label="AGE (YEARS)" name="umur" value={formData.umur} onChange={handleChange} placeholder="45" />
          <InputGroup label="HEIGHT (CM)" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="170" />
          <InputGroup label="WEIGHT (KG)" name="berat" value={formData.berat} onChange={handleChange} placeholder="70" />
        </div>

        {/* BMI & Category Results - FIXED LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-7 rounded-[2rem] border border-blue-100 flex items-center gap-6 shadow-sm">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <Activity className="text-blue-600 w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-blue-400 uppercase tracking-widest">BMI SCORE</span>
              <span className="text-4xl font-black text-blue-700 leading-none">{calculateIMTValue()}</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-7 rounded-[2rem] border border-emerald-100 flex items-center gap-6 shadow-sm">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <ShieldCheck className="text-emerald-600 w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-emerald-400 uppercase tracking-widest">CATEGORY</span>
              <span className="text-2xl font-black text-emerald-700 uppercase tracking-tight leading-tight">
                {getCategoryName(formData.imt_category)}
              </span>
            </div>
          </div>
        </div>

        {/* Blood Pressure Inputs */}
        <div className="pt-10 border-t-2 border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-base font-black text-red-500 uppercase tracking-widest px-1">SYSTOLIC (MMHG)</label>
            <input required type="number" name="sistole" value={formData.sistole} onChange={handleChange} className="w-full p-6 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-3xl font-black text-red-700 transition-all" placeholder="120" />
          </div>
          <div className="space-y-4">
            <label className="text-base font-black text-red-500 uppercase tracking-widest px-1">DIASTOLIC (MMHG)</label>
            <input required type="number" name="diastole" value={formData.diastole} onChange={handleChange} className="w-full p-6 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-3xl font-black text-red-700 transition-all" placeholder="80" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 pt-4">
          <button type="button" onClick={onBack} className="flex-1 py-6 text-xl font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center gap-3 uppercase">
            <ArrowLeft className="w-6 h-6" /> Back
          </button>
          <button type="submit" disabled={loading} className="flex-[2] py-6 bg-blue-600 text-white text-2xl font-black rounded-3xl shadow-xl hover:bg-blue-700 transition transform hover:-translate-y-1">
            {loading ? "ANALYZING..." : "PREDICT NOW"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ToggleButton = ({ label, name, value, options, onSelect }) => (
  <div className="space-y-4">
    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <div className="flex gap-4">
      {options.map((opt) => (
        <button key={opt.val} type="button" onClick={() => onSelect(name, opt.val)} className={`flex-1 py-5 rounded-2xl border-2 text-xl font-black transition-all ${value === opt.val ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"}`}>{opt.label.toUpperCase()}</button>
      ))}
    </div>
  </div>
);

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-4">
    <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <input required type="number" name={name} value={value} onChange={onChange} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none text-2xl font-black text-gray-700 transition-all placeholder:text-gray-300" placeholder={placeholder} />
  </div>
);

export default PredictionForm;
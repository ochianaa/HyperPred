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
    <div className="max-w-6xl mx-auto w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 font-sans">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-700 p-12 text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-4 flex items-center gap-6">
          <HeartPulse className="w-16 h-16" /> CLINICAL DATA
        </h1>
        <p className="text-blue-100 text-2xl md:text-3xl opacity-90 leading-relaxed font-medium">
          Input clinical parameters for hybrid risk assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ToggleButton label="GENDER" name="jenis_kelamin" value={formData.jenis_kelamin} options={[{val:'0', label:'Male'}, {val:'1', label:'Female'}]} onSelect={handleSelect} />
          <ToggleButton label="SMOKING" name="merokok" value={formData.merokok} options={[{val:'0', label:'No'}, {val:'1', label:'Yes'}]} onSelect={handleSelect} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <InputGroup label="AGE (YEARS)" name="umur" value={formData.umur} onChange={handleChange} placeholder="45" />
          <InputGroup label="HEIGHT (CM)" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="170" />
          <InputGroup label="WEIGHT (KG)" name="berat" value={formData.berat} onChange={handleChange} placeholder="70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex items-center gap-8 shadow-sm">
            <div className="bg-white p-5 rounded-3xl shadow-sm">
              <Activity className="text-blue-600 w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-blue-400 uppercase tracking-widest">BMI SCORE</span>
              <span className="text-5xl md:text-6xl font-black text-blue-700 leading-none">{calculateIMTValue()}</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center gap-8 shadow-sm">
            <div className="bg-white p-5 rounded-3xl shadow-sm">
              <ShieldCheck className="text-emerald-600 w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-emerald-400 uppercase tracking-widest">CATEGORY</span>
              <span className="text-3xl md:text-4xl font-black text-emerald-700 uppercase tracking-tight leading-tight">
                {getCategoryName(formData.imt_category)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t-2 border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <label className="text-lg md:text-xl font-black text-red-500 uppercase tracking-widest px-2">SYSTOLIC (MMHG)</label>
            <input required type="number" name="sistole" value={formData.sistole} onChange={handleChange} className="w-full p-8 bg-red-50/30 border-2 border-red-100 rounded-3xl focus:border-red-500 outline-none text-4xl md:text-5xl font-black text-red-700 transition-all" placeholder="120" />
          </div>
          <div className="space-y-6">
            <label className="text-lg md:text-xl font-black text-red-500 uppercase tracking-widest px-2">DIASTOLIC (MMHG)</label>
            <input required type="number" name="diastole" value={formData.diastole} onChange={handleChange} className="w-full p-8 bg-red-50/30 border-2 border-red-100 rounded-3xl focus:border-red-500 outline-none text-4xl md:text-5xl font-black text-red-700 transition-all" placeholder="80" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-6">
          <button type="button" onClick={onBack} className="flex-1 py-8 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-blue-600 text-2xl md:text-3xl font-black rounded-[2rem] transition-all flex items-center justify-center gap-4 uppercase shadow-sm">
            <ArrowLeft className="w-8 h-8" /> Back to Home
          </button>
          <button type="submit" disabled={loading} className="flex-[2] py-8 bg-blue-600 text-white text-3xl md:text-4xl font-black rounded-[2rem] shadow-xl hover:bg-blue-700 transition transform hover:-translate-y-1">
            {loading ? "ANALYZING..." : "PREDICT NOW"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ToggleButton = ({ label, name, value, options, onSelect }) => (
  <div className="space-y-6">
    <label className="block text-lg md:text-xl font-black text-gray-400 uppercase tracking-widest px-2">{label}</label>
    <div className="flex gap-6">
      {options.map((opt) => (
        <button key={opt.val} type="button" onClick={() => onSelect(name, opt.val)} className={`flex-1 py-6 md:py-8 rounded-3xl border-2 text-2xl md:text-3xl font-black transition-all ${value === opt.val ? "bg-blue-600 border-blue-600 text-white shadow-xl" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"}`}>{opt.label.toUpperCase()}</button>
      ))}
    </div>
  </div>
);

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-6">
    <label className="text-lg md:text-xl font-black text-gray-400 uppercase tracking-widest px-2">{label}</label>
    <input required type="number" name={name} value={value} onChange={onChange} className="w-full p-6 md:p-8 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-blue-500 outline-none text-3xl md:text-4xl font-black text-gray-700 transition-all placeholder:text-gray-300" placeholder={placeholder} />
  </div>
);

export default PredictionForm;
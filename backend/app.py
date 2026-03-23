from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# --- 1. SETUP PATH & LOAD MODEL ---
base_path = os.path.dirname(os.path.abspath(__file__))

try:
    # Memuat Model (10 Fitur) dan Scaler (8 Fitur)
    model = joblib.load(os.path.join(base_path, 'model_hipertensi_xgb_pso.pkl'))
    scaler = joblib.load(os.path.join(base_path, 'scaler_hipertensi.pkl'))
    print("Berhasil: Model (10 Fitur) dan Scaler (8 Fitur) siap digunakan!")
except Exception as e:
    print(f"Gagal memuat model/scaler: {e}")

# --- 2. LOGIKA PAKAR & HELPER ---
def klasifikasi_jnc7(sistole, diastole):
    """Klasifikasi Hipertensi berdasarkan standar JNC 7"""
    sistole = float(sistole)
    diastole = float(diastole)
    if sistole < 120 and diastole < 80:
        return "Normal"
    elif 120 <= sistole <= 139 or 80 <= diastole <= 89:
        return "Pre-Hypertension"
    elif 140 <= sistole <= 159 or 90 <= diastole <= 99:
        return "Hypertension Stage 1"
    elif sistole >= 160 or diastole >= 100:
        return "Hypertension Stage 2"
    return "Unknown"

# --- 3. ROUTE PREDIKSI ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Ambil nilai pendukung
        bmi_value = float(data['imt'])
        imt_cat = int(data.get('imt_category', 0))

        # --- A. PROSES SCALING (8 FITUR) ---
        # Scaler Anda hanya mengenali 8 kolom, jadi kita masukkan 8 saja di sini
        features_for_scaler = np.array([[
            int(data['jenis_kelamin']),
            float(data['umur']),
            int(data['merokok']),
            float(data['tinggi']),
            float(data['berat']),
            bmi_value,
            float(data['sistole']),
            float(data['diastole'])
        ]])
        
        # Lakukan transformasi (Hasilnya tetap 8 kolom yang sudah diskalakan)
        features_scaled = scaler.transform(features_for_scaler)
        
        # --- B. PENYUSUNAN 10 FITUR UNTUK MODEL ---
        # Kita gabungkan 8 fitur yang sudah diskalakan tadi dengan 2 fitur tambahan
        # Urutan: [8 fitur scaled] + [imt_category] + [dummy/0]
        final_features = np.hstack([
            features_scaled, 
            np.array([[imt_cat, 0]])
        ])
        
        # --- C. PREDIKSI AI ---
        prediction_idx = model.predict(final_features)[0]
        
        # Mapping hasil
        map_labels = {
            0: "Normal",
            1: "Pre-Hypertension",
            2: "Hypertension Stage 1",
            3: "Hypertension Stage 2"
        }
        
        prediction_ai = map_labels.get(prediction_idx, "Unknown")
        prediction_expert = klasifikasi_jnc7(data['sistole'], data['diastole'])

        return jsonify({
            "status": "success",
            "prediksi_xgboost": prediction_ai,
            "prediksi_pakar": prediction_expert,
            "input_data": {
                "sistole": data['sistole'],
                "diastole": data['diastole'],
                "imt": bmi_value,
                "umur": data['umur'],
                "imt_category": imt_cat
            }
        })
        
    except Exception as e:
        print(f"Error saat prediksi: {e}")
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
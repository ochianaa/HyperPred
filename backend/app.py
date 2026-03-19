from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Menggunakan joblib sebagai ganti pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Mendapatkan path absolut agar tidak error saat mencari file
base_path = os.path.dirname(os.path.abspath(__file__))

# --- TAHAP INTEGRASI: LOAD MODEL & SCALER MENGGUNAKAN JOBLIB ---
try:
    scaler = joblib.load(os.path.join(base_path, 'scaler_hipertensi.pkl'))
    model = joblib.load(os.path.join(base_path, 'model_hipertensi_xgb_pso.pkl'))
    print("Model and Scaler loaded successfully!")
except Exception as e:
    print(f"Error loading files: {e}")

def klasifikasi_jnc7(sistole, diastole):
    """Expert System Logic (JNC 7 Standard)"""
    if sistole < 120 and diastole < 80:
        return "Normal"
    elif 120 <= sistole <= 139 or 80 <= diastole <= 89:
        return "Pre-Hypertension"
    elif 140 <= sistole <= 159 or 90 <= diastole <= 99:
        return "Hypertension Stage 1"
    elif sistole >= 160 or diastole >= 100:
        return "Hypertension Stage 2"
    return "Unknown"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Ambil 8 atribut sesuai urutan training
        features = [
            int(data['jenis_kelamin']),
            float(data['umur']),
            int(data['merokok']),
            float(data['tinggi']),
            float(data['berat']),
            float(data['imt']),
            float(data['sistole']),
            float(data['diastole'])
        ]
        
        # Konversi ke array 2D untuk scaler
        final_features = np.array([features])
        
        # 1. Scaling data
        features_scaled = scaler.transform(final_features)
        
        # 2. Prediksi AI
        prediction_idx = model.predict(features_scaled)[0]
        
        # Mapping label (sesuaikan dengan label encoder Anda)
        map_labels = {
            0: "Normal",
            1: "Pre-Hypertension",
            2: "Hypertension Stage 1",
            3: "Hypertension Stage 2"
        }
        prediction_ai = map_labels.get(prediction_idx, "Unknown")
        
        # 3. Analisis Pakar (JNC 7)
        prediction_expert = klasifikasi_jnc7(float(data['sistole']), float(data['diastole']))

        return jsonify({
            "status": "success",
            "prediksi_xgboost": prediction_ai,
            "prediksi_pakar": prediction_expert,
            "input_data": {
                "sistole": data['sistole'],
                "diastole": data['diastole'],
                "imt": data['imt'],
                "umur": data['umur']
            }
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
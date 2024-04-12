from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('trained_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Assuming JSON data is sent from the client
    features = data['features']  # Assuming 'features' contains the feature values
    prediction = model.predict([features])[0]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask application

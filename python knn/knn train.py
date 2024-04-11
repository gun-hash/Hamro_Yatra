import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Assuming 'model' is your trained Logistic Regression model



# Load dataset
df = pd.read_csv('rides_data.csv')

# Define features and target variable
X = df[['distance', 'time_difference', 'day_compatibility', 'seat_availability']]
y = df['success']

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features (important for logistic regression)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a Logistic Regression model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Predict on the test set
y_pred = model.predict(X_test_scaled)

# Evaluate the model
print("Test Accuracy:", accuracy_score(y_test, y_pred))

# Feature weights (importances)
print("Feature Weights:", model.coef_)

joblib.dump(model, 'trained_model.pkl')
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, GridSearchCV, TimeSeriesSplit
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')

# ============================================
# HELPER FUNCTIONS (PEHLE DEFINE KARO)
# ============================================

def compute_rsi(prices, period=14):
    """Calculate RSI indicator"""
    delta = prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def calculate_atr(df, period=14):
    """Calculate Average True Range"""
    high_low = df['High'] - df['Low']
    high_close = abs(df['High'] - df['Close'].shift())
    low_close = abs(df['Low'] - df['Close'].shift())
    tr = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
    atr = tr.rolling(window=period).mean()
    return atr

# ============================================
# MAIN CODE STARTS HERE
# ============================================

# 1. Data Load
df = pd.read_csv('tradeassist_data_2026-05-19T19_26_17.csv')
df['DateTime'] = pd.to_datetime(df['DateTime'])
df.set_index('DateTime', inplace=True)

print("="*60)
print("🚀 IMPROVED MODEL TRAINING")
print("="*60)

# 2. ADVANCED FEATURE ENGINEERING
print("\n📊 Step 1: Creating Advanced Features...")

# Basic features
df['Range'] = df['High'] - df['Low']
df['Price_Change'] = df['Close'] - df['Open']
df['Body'] = abs(df['Close'] - df['Open'])
df['Upper_Wick'] = df['High'] - df[['Close', 'Open']].max(axis=1)
df['Lower_Wick'] = df[['Close', 'Open']].min(axis=1) - df['Low']

# Returns
df['Return'] = df['Close'].pct_change() * 100
df['Log_Return'] = np.log(df['Close'] / df['Close'].shift(1))

# Multiple Lag Features
for lag in [1, 2, 3, 5, 10]:
    df[f'Close_Lag_{lag}'] = df['Close'].shift(lag)
    df[f'Volume_Proxy_Lag_{lag}'] = (df['High'] - df['Low']).shift(lag) * df['Close'].shift(lag)

# Rolling Statistics
for window in [5, 10, 20, 50]:
    df[f'MA_{window}'] = df['Close'].rolling(window=window).mean()
    df[f'Std_{window}'] = df['Close'].rolling(window=window).std()
    df[f'Volume_MA_{window}'] = (df['High'] - df['Low']).rolling(window=window).mean()

# Price momentum
df['RSI'] = compute_rsi(df['Close'], 14)
df['Price_Momentum'] = df['Close'] - df['Close'].shift(20)
df['Price_Rate_Change'] = (df['Close'] - df['Close'].shift(5)) / df['Close'].shift(5) * 100

# Volatility
df['Volatility'] = df['Return'].rolling(window=20).std()
df['ATR'] = calculate_atr(df, 14)

# Time features
df['Day_of_Week'] = df.index.dayofweek
df['Hour'] = df.index.hour
df['Is_Weekend'] = (df['Day_of_Week'] >= 5).astype(int)

# Target variable
df['Target_Next_Close'] = df['Close'].shift(-1)
df['Target_Direction'] = (df['Target_Next_Close'] > df['Close']).astype(int)

print(f"✅ Total features created: {len(df.columns)}")

# 3. DATA CLEANING
print("\n🧹 Step 2: Cleaning Data...")
initial_rows = len(df)
df_clean = df.dropna()
print(f"✅ Removed {initial_rows - len(df_clean)} rows with missing values")
print(f"✅ Final rows: {len(df_clean)}")

# 4. FEATURE SELECTION
print("\n🎯 Step 3: Selecting Best Features...")

feature_cols = [
    'Open', 'High', 'Low', 'Close', 'Range', 'Price_Change',
    'Return', 'Close_Lag_1', 'Close_Lag_2', 'Close_Lag_3',
    'MA_5', 'MA_10', 'MA_20', 'Std_10', 'Volatility',
    'RSI', 'Price_Momentum', 'ATR', 'Day_of_Week', 'Hour'
]

X = df_clean[feature_cols]
y_reg = df_clean['Target_Next_Close']

print(f"✅ Using {len(feature_cols)} features")

# 5. TRAIN-TEST SPLIT
print("\n📚 Step 4: Splitting Data...")

split_idx = int(len(X) * 0.8)
X_train, X_test = X[:split_idx], X[split_idx:]
y_train, y_test = y_reg[:split_idx], y_reg[split_idx:]

print(f"✅ Training data: {len(X_train)} rows")
print(f"✅ Testing data: {len(X_test)} rows")

# 6. MODEL TRAINING
print("\n🤖 Step 5: Training Models...")

rf_model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    min_samples_split=10,
    min_samples_leaf=5,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_train, y_train)

gb_model = GradientBoostingRegressor(
    n_estimators=150,
    learning_rate=0.05,
    max_depth=5,
    min_samples_split=10,
    random_state=42
)
gb_model.fit(X_train, y_train)

# 7. PREDICTIONS
print("\n🔮 Step 6: Making Predictions...")

rf_predictions = rf_model.predict(X_test)
gb_predictions = gb_model.predict(X_test)

# 8. EVALUATION
print("\n📊 Step 7: Evaluating Models...")
print("="*60)

def evaluate_model(y_true, y_pred, name):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)
    mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    
    print(f"\n{name}:")
    print(f"   MAE:  {mae:.2f}")
    print(f"   RMSE: {rmse:.2f}")
    print(f"   R²:   {r2:.4f}")
    print(f"   MAPE: {mape:.2f}%")
    return mae, rmse, r2

print("\n📈 Random Forest Results:")
rf_mae, rf_rmse, rf_r2 = evaluate_model(y_test, rf_predictions, "Random Forest")

print("\n📈 Gradient Boosting Results:")
gb_mae, gb_rmse, gb_r2 = evaluate_model(y_test, gb_predictions, "Gradient Boosting")

# Best model
if rf_mae < gb_mae:
    best_model = rf_model
    best_name = "Random Forest"
    best_predictions = rf_predictions
else:
    best_model = gb_model
    best_name = "Gradient Boosting"
    best_predictions = gb_predictions

print(f"\n🏆 BEST MODEL: {best_name}")

# 9. FUTURE PREDICTION
print("\n🚀 Step 8: Future Price Prediction...")

last_row = X.iloc[-1:].values
next_price_rf = rf_model.predict(last_row)[0]
next_price_gb = gb_model.predict(last_row)[0]

current_price = df_clean['Close'].iloc[-1]

print(f"\n📊 Current Price: {current_price:.2f}")
print(f"🔮 Random Forest Next Price: {next_price_rf:.2f}")
print(f"🔮 Gradient Boosting Next Price: {next_price_gb:.2f}")

ensemble_pred = (next_price_rf + next_price_gb) / 2
print(f"🎯 Ensemble Prediction (Average): {ensemble_pred:.2f}")

if ensemble_pred > current_price:
    gain = ((ensemble_pred - current_price) / current_price) * 100
    print(f"📈 Predicted: UP ⬆️ by {gain:.2f}%")
else:
    loss = ((current_price - ensemble_pred) / current_price) * 100
    print(f"📉 Predicted: DOWN ⬇️ by {loss:.2f}%")

# 10. VISUALIZATIONS
print("\n📊 Step 9: Creating Visualizations...")

fig, axes = plt.subplots(2, 3, figsize=(18, 10))

# Plot 1
axes[0,0].plot(y_test.values[-100:], label='Actual', color='blue', alpha=0.7)
axes[0,0].plot(best_predictions[-100:], label=f'{best_name} Predicted', color='red', alpha=0.7)
axes[0,0].set_title(f'Actual vs Predicted (Best Model: {best_name})')
axes[0,0].set_xlabel('Time')
axes[0,0].set_ylabel('Price')
axes[0,0].legend()
axes[0,0].grid(True, alpha=0.3)

# Plot 2
errors = y_test - best_predictions
axes[0,1].hist(errors, bins=50, color='purple', alpha=0.7, edgecolor='black')
axes[0,1].axvline(x=0, color='red', linestyle='--', linewidth=2)
axes[0,1].set_title(f'Prediction Error Distribution\nMean Error: {errors.mean():.2f}')
axes[0,1].set_xlabel('Prediction Error')
axes[0,1].set_ylabel('Frequency')

# Plot 3
importance_df = pd.DataFrame({
    'Feature': feature_cols,
    'Importance': best_model.feature_importances_
}).sort_values('Importance', ascending=True).tail(15)

axes[0,2].barh(importance_df['Feature'], importance_df['Importance'], color='skyblue')
axes[0,2].set_title('Top 15 Most Important Features')
axes[0,2].set_xlabel('Importance Score')

# Plot 4
axes[1,0].bar(['Current Price', 'RF Prediction', 'GB Prediction', 'Ensemble'], 
              [current_price, next_price_rf, next_price_gb, ensemble_pred],
              color=['blue', 'orange', 'green', 'red'])
axes[1,0].set_title('Price Comparison: Current vs Predictions')
axes[1,0].set_ylabel('Price')
axes[1,0].grid(True, alpha=0.3)

# Plot 5
models = ['Random Forest', 'Gradient Boosting']
maes = [rf_mae, gb_mae]
r2s = [rf_r2, gb_r2]

x = np.arange(len(models))
width = 0.35

axes[1,1].bar(x - width/2, maes, width, label='MAE', color='coral')
axes[1,1].set_title('Model Comparison - MAE (lower is better)')
axes[1,1].set_xticks(x)
axes[1,1].set_xticklabels(models)
axes[1,1].set_ylabel('MAE')
axes[1,1].grid(True, alpha=0.3)

ax2 = axes[1,1].twinx()
ax2.bar(x + width/2, r2s, width, label='R²', color='lightgreen', alpha=0.7)
ax2.set_ylabel('R² (higher is better)')

# Plot 6
residuals = y_test - best_predictions
axes[1,2].scatter(best_predictions, residuals, alpha=0.5, color='teal')
axes[1,2].axhline(y=0, color='red', linestyle='--')
axes[1,2].set_title('Residual Plot (Checking Prediction Quality)')
axes[1,2].set_xlabel('Predicted Values')
axes[1,2].set_ylabel('Residuals')

plt.tight_layout()
plt.show()

# 11. SUMMARY
print("\n" + "="*60)
print("📋 FINAL SUMMARY")
print("="*60)
print(f"✅ Best Model: {best_name}")
print(f"✅ Random Forest MAE: {rf_mae:.2f}")
print(f"✅ Random Forest R²: {rf_r2:.4f}")
print(f"✅ Gradient Boosting MAE: {gb_mae:.2f}")
print(f"✅ Gradient Boosting R²: {gb_r2:.4f}")
print(f"\n🎯 Next Price Prediction: {ensemble_pred:.2f}")
print(f"📈 Direction: {'UP ⬆️' if ensemble_pred > current_price else 'DOWN ⬇️'}")
print("="*60)
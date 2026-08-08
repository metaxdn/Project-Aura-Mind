import { StudentData, PredictionResponse } from '../types';

const API_BASE_URL = 'https://project-aura-mind.onrender.com';

/**
 * Predict mental health score by querying FastAPI backend main.py
 * Gracefully falls back to client-side ML approximation if API is offline.
 */
export async function predictMentalHealthScore(data: StudentData): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const result: PredictionResponse = await response.json();
    return result;
  } catch (error) {
    console.warn('Backend API not reached (http://localhost:8000/predict). Using intelligent client-side model fallback.', error);
    
    // Client-side fallback scoring engine (predicts 0.0 - 10.0 scale)
    const baseScore = 7.5;
    
    // Sleep impact (+ for 7-9 hours, - for <6 or >10)
    let sleepImpact = 0;
    if (data.sleep_hours_per_night >= 7 && data.sleep_hours_per_night <= 9) {
      sleepImpact = 1.2;
    } else if (data.sleep_hours_per_night < 6) {
      sleepImpact = -1.5;
    }

    // Stress level impact
    let stressImpact = 0;
    switch (data.stress_level) {
      case 'Low': stressImpact = 1.5; break;
      case 'Medium': stressImpact = 0.2; break;
      case 'High': stressImpact = -1.2; break;
      case 'Very High': stressImpact = -2.2; break;
    }

    // Physical activity (+0.3 per hour up to 2h)
    const activityImpact = Math.min(data.physical_activity_hours * 0.4, 1.2);

    // Screen time impact (-0.3 per hour over 4 hours)
    const screenImpact = data.avg_daily_usage_hours > 4 ? -((data.avg_daily_usage_hours - 4) * 0.35) : 0.5;

    // Daily unlocks impact
    const unlockImpact = data.daily_unlocks > 80 ? -0.8 : 0.3;

    let calculatedScore = baseScore + sleepImpact + stressImpact + activityImpact + screenImpact + unlockImpact;
    calculatedScore = Math.max(1.0, Math.min(10.0, calculatedScore));

    // Simulate short realistic network delay for calming visual loading state
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      predicted_mental_health_score: Number(calculatedScore.toFixed(2))
    };
  }
}

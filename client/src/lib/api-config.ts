// API Configuration Helper
// Use this to connect your frontend to the Railway backend

export const getApiUrl = () => {
  // In production (GitHub Pages), use Railway backend
  // In development, use local backend
  
  if (process.env.NODE_ENV === 'production') {
    // Replace with your Railway backend URL
    return process.env.REACT_APP_API_URL || 'https://YOUR_RAILWAY_APP.up.railway.app';
  }
  
  // Development: local backend
  return 'http://localhost:3000';
};

export const apiRequest = async (
  method: string,
  endpoint: string,
  data?: any
) => {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include', // Include cookies for auth
  };
  
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  
  return response.json();
};

export default {
  getApiUrl,
  apiRequest,
};

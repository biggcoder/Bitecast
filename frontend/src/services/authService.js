import { saveToken, removeToken, getToken } from './storageService';

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch('http://localhost:8000/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  saveToken(data.access_token);
  
  const userResponse = await fetch('http://localhost:8000/api/auth/users/me', {
    headers: {
      'Authorization': `Bearer ${data.access_token}`
    }
  });
  
  if (!userResponse.ok) {
    throw new Error('Failed to get user info');
  }
  
  return userResponse.json();
};

export const logout = async () => {
  removeToken();
  return true;
};

export const checkAuthStatus = async () => {
  const token = getToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const response = await fetch('http://localhost:8000/api/auth/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      removeToken();
      return null;
    }
    
    return response.json();
  } catch (error) {
    removeToken();
    return null;
  }
};
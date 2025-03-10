
// A simple frontend authentication service
// Note: In a real application, this would connect to a backend API

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Simulated user storage
const STORAGE_KEY = 'tasty_hub_auth_user';

// Get the current user from localStorage
const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(STORAGE_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Check if user is logged in
const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Sign up function
const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // In a real app, this would send data to a server
    // For now, we'll do simple validation and store locally
    if (!name || !email || !password) {
      return {
        success: false,
        message: 'All fields are required'
      };
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: 'Invalid email format'
      };
    }

    // Check if user exists (in localStorage)
    const existingUsers = JSON.parse(localStorage.getItem('tasty_hub_users') || '[]');
    if (existingUsers.some((user: any) => user.email === email)) {
      return {
        success: false,
        message: 'Email already in use'
      };
    }

    // Create user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email
    };

    // Store user in our "database" (localStorage)
    existingUsers.push({...newUser, password});
    localStorage.setItem('tasty_hub_users', JSON.stringify(existingUsers));

    // Log the user in
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      message: 'Account created successfully',
      user: newUser
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Sign in function
const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Find user
    const users = JSON.parse(localStorage.getItem('tasty_hub_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    // Store user session (without password)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      message: 'Signed in successfully',
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Sign out function
const signOut = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export {
  getCurrentUser,
  isAuthenticated,
  signUp,
  signIn,
  signOut,
  type User,
  type AuthResponse
};

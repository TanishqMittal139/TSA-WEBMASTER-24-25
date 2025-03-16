
// Mock user storage - in a real app, this would be handled by a backend
let currentUser: any = null;

// Mock user data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=68',
    phone: '+1 (703) 123-4567',
    address: '123 Main St, Alexandria, VA 22314',
    bio: 'Food enthusiast and regular customer.',
    birthdate: '1990-01-01'
  }
];

// Initialize the auth state from localStorage on module load
(function initializeAuth() {
  const storedUser = localStorage.getItem('tastyHubUser');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse user data from localStorage', e);
      localStorage.removeItem('tastyHubUser');
    }
  }
})();

// Sign in function
export const signIn = (email: string, password: string) => {
  // Find the user with matching credentials
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Create a safe user object without the password
    const safeUser = { ...user };
    delete safeUser.password;
    
    // Store user in localStorage
    localStorage.setItem('tastyHubUser', JSON.stringify(safeUser));
    currentUser = safeUser;
    
    return { success: true, user: safeUser };
  }
  
  return { success: false, message: 'Invalid email or password' };
};

// Sign up function
export const signUp = (name: string, email: string, password: string) => {
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already in use' };
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    phone: '',
    address: '',
    bio: '',
    birthdate: ''
  };
  
  // Add to users array (in a real app, this would be a DB operation)
  users.push(newUser);
  
  // Create a safe user object without the password
  const safeUser = { ...newUser };
  delete safeUser.password;
  
  // Store user in localStorage
  localStorage.setItem('tastyHubUser', JSON.stringify(safeUser));
  currentUser = safeUser;
  
  return { success: true, user: safeUser };
};

// Sign out function
export const signOut = () => {
  localStorage.removeItem('tastyHubUser');
  currentUser = null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  if (currentUser) return true;
  
  const storedUser = localStorage.getItem('tastyHubUser');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      return true;
    } catch (e) {
      console.error('Failed to parse user data from localStorage', e);
      localStorage.removeItem('tastyHubUser');
      return false;
    }
  }
  
  return false;
};

// Get current user
export const getCurrentUser = () => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem('tastyHubUser');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      return currentUser;
    } catch (e) {
      console.error('Failed to parse user data from localStorage', e);
      localStorage.removeItem('tastyHubUser');
      return null;
    }
  }
  
  return null;
};

// Update user profile
export const updateUserProfile = (profileData: any) => {
  if (!isAuthenticated()) {
    return { success: false, message: 'User not authenticated' };
  }
  
  // Get current user
  const user = getCurrentUser();
  
  // Update user data
  const updatedUser = { ...user, ...profileData };
  
  // Update in users array (in a real app, this would be a DB operation)
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    // Keep the password from the existing user
    updatedUser.password = users[userIndex].password;
    users[userIndex] = updatedUser;
  }
  
  // Create a safe user object without the password
  const safeUser = { ...updatedUser };
  delete safeUser.password;
  
  // Store updated user in localStorage
  localStorage.setItem('tastyHubUser', JSON.stringify(safeUser));
  currentUser = safeUser;
  
  return { success: true, user: safeUser };
};

// Change password function
export const changePassword = (currentPassword: string, newPassword: string) => {
  if (!isAuthenticated()) {
    return { success: false, message: 'User not authenticated' };
  }
  
  // Get current user
  const user = getCurrentUser();
  
  // Find user in array
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Check if current password matches
  if (users[userIndex].password !== currentPassword) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  // Update password
  users[userIndex].password = newPassword;
  
  return { success: true, message: 'Password updated successfully' };
};

// Reset password function (normally would send email with reset link)
export const resetPassword = (email: string) => {
  // Find the user with matching email
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    return { success: false, message: 'No account found with that email' };
  }
  
  // In a real app, this would send a reset link to the user's email
  // For this mock version, we'll just reset to a default password
  users[userIndex].password = 'resetpassword123';
  
  return { 
    success: true, 
    message: 'Password has been reset. In a real app, we would send an email with instructions.' 
  };
};

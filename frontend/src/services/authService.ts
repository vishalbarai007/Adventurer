// This is a mock service. In a real application, you would make API calls to your backend.

export const registerUser = async (username: string, _password: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        // In a real app, you would send the data to your backend
        console.log('Registering user:', username);
        // Simulating successful registration
        resolve();
      }, 1000);
    });
  };
  
  export const signInUser = async (username: string, _password: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        // In a real app, you would validate credentials with your backend
        console.log('Signing in user:', username);
        // Simulating successful sign in
        resolve();
      }, 1000);
    });
  };
  
  
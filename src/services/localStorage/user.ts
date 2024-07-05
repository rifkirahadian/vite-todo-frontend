export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }
  

  return null;
}

export const setUser = (payload: { id: number, email: string, name: string }) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user',JSON.stringify(payload));
  }
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};
import axios from 'axios';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => { },
  logout: () => { },
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const response: any = await axios.get('http://localhost:3000/api/auth/authdetail')
      setUser(response.data);
    }

    fetchUserDetail();
    console.log(user)

  }, [])


  const logout = async () => {
    try {
      axios.post('http://localhost:3000/api/auth/logout').then(res => {
        console.log("Çıkış başarılı :",res.data)
        setUser(null);

      })
    } catch (error) {
      console.error('Logout error', error);
    }
  };



  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

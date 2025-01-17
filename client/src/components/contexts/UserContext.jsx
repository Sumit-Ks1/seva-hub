// ThemeContext.tsx
import { createContext, useState, ReactNode } from 'react';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "673ec9c670f916470ba666b4",
    name: "devyanshu negi",
    email: "muhammaddanish14@gmail.com",
    phone_No: "1902385021",
    age: 64,
    gender: "male",
    occupation: "Doctor",
    past_Volunteered: [],
    past_Participated: [],
    password: "$2b$10$JZyvMcUkyJjavvDFMgMUBudxV0TuUcqnb7bVy.glAto.8UpPbGz4u",
    createdAt: 1732168134370,
    updatedAt: 1732168134370,
    _v: 0
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
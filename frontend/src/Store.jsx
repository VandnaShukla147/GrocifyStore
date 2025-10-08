import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null); // ✅ store full user object

  return (
    <UserContext.Provider value={{ login, setLogin, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

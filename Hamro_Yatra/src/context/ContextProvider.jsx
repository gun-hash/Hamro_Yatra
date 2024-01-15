import { useContext, createContext, useState } from "react";
const stateContext = createContext({
  userName: null,
  token: null,
  userRole: null,
  settingToken: () => {},
  settingUserName: () => {},
  settingUserRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [userName, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [userRole, setRole] = useState(localStorage.getItem("role"));
  // const [token,setToken] = useState(null);

  const settingUserRole = (role) => {
    setRole(role);
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  };
  const settingToken = (token) => {
    setToken(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  const settingUserName = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  };

  //for getting user

  return (
    <stateContext.Provider
      value={{
        userName,
        settingUserName,
        token,
        settingToken,
        userRole,
        settingUserRole,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);

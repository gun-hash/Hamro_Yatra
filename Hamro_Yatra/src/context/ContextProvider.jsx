import { useContext, createContext, useState } from "react";
const stateContext = createContext({
  email: null,
  token: null,
  userRole: null,
  settingToken: () => {},
  settingEmail: () => {},
  settingUserRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [userRole, setRole] = useState(localStorage.getItem("role"));

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

  const settingEmail = (email) => {
    setEmail(email);
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  };

  //for getting user

  return (
    <stateContext.Provider
      value={{
        email,
        settingEmail,
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

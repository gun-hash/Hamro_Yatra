// LogoutButton.js
import "./logout.css";
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className="button-6">
      Logout
    </button>
  );
};

export default LogoutButton;

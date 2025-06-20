import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./log.css";
import Loginpage from "./Loginpage";
import Register from "./Register";


const Login = () => {
  const location = useLocation();
  const role = location.state?.role || null;
 const navigate = useNavigate();
 
  const handleBack =()=>{
    navigate('/');
  }
  let welcomeMessage = "Welcome";
  let description = "Please select a role to continue";
  let gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  
  if (role === "Login") {
    welcomeMessage = " Login Dashboard";
    description = "Sign in to access your Login panel";
    gradient = "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)";
  } else if (role === "Register") {
    welcomeMessage = " Register Dashboard";
    description = "Create your Register account";
    gradient = "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
  }
  
  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-box"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative header */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: gradient
        }}></div>
        
        {/* Logo/icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: gradient,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'white',
          fontSize: '2rem'
        }}>
          {role === "Login" ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          ) : role === "Register" ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          )}
        </div>
        
        {/* Content */}
        <h2 style={{
          margin: '0 0 10px',
          color: '#333',
          fontSize: '1.8rem',
          fontWeight: 700
        }}>{welcomeMessage}</h2>
        
        <p style={{
          color: '#666',
          marginBottom: '30px',
          fontSize: '1rem'
        }}>{description}</p>
        
        {role === "Login" && <Loginpage />}
        {role === "Register" && <Register />}
        
        {!role && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Please select your role from the previous page
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() =>handleBack}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Loginpage = ({ setIsAuthenticated }) => {  // Make sure to destructure the prop
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = () => {
         navigate('/login',{ state: { role: "Register" } });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const response = await fetch("https://codealpha-task2.onrender.com/api/login/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || "Invalid credentials");
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            if (typeof setIsAuthenticated === 'function') {
                setIsAuthenticated(true);
            }
            
            navigate('/shopping');
            
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <FaUserShield size={32} />
                    </div>
                    <h1 style={styles.title}>Login</h1>
                    <p style={styles.subtitle}>Enter your credentials to access the store</p>
                    {error && <p style={styles.error}>{error}</p>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <FaUserShield style={styles.inputIcon} />
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <RiLockPasswordFill style={styles.inputIcon} />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <Button 
                        type="submit"
                        variant="contained" 
                        disabled={isLoading}
                        style={styles.button}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div style={styles.switchText}>
                    Don't have an account?{' '}
                    <span 
                        style={styles.switchLink}
                        onClick={handleRegister}
                    >
                        Register
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px'
    },
    card: {
        width: '100%',
        maxWidth: '450px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center'
    },
    header: {
        marginBottom: '30px',
        position: 'relative'
    },
    iconContainer: {
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        color: 'white',
        fontSize: '2rem'
    },
    title: {
        margin: '0',
        color: '#333',
        fontSize: '1.8rem',
        fontWeight: 700
    },
    subtitle: {
        color: '#666',
        marginTop: '8px',
        fontSize: '0.9rem'
    },
    error: {
        color: 'red',
        marginTop: '10px'
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '0 15px',
        marginBottom: '15px'
    },
    inputIcon: {
        color: '#777',
        marginRight: '10px'
    },
    input: {
        width: '100%',
        padding: '12px 0',
        border: 'none',
        outline: 'none',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: 'none',
        marginTop: '10px'
    },
    switchText: {
        marginTop: '20px',
        fontSize: '0.9rem',
        color: '#666'
    },
    switchLink: {
        color: '#3a7bd5',
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
};

export default Loginpage;
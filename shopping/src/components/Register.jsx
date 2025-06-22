import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        navigate('/login', { state: { role: "Login" } });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setError('');

        // Frontend validation
        if (formData.password !== formData.password2) {
            setError("Passwords don't match");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Registration API call
            const registerResponse = await fetch('https://codealpha-task2.onrender.com/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const registerData = await registerResponse.json();

            if (!registerResponse.ok) {
                // Handle specific backend validation errors
                if (registerData.email) {
                    throw new Error(registerData.email[0]);
                } else if (registerData.username) {
                    throw new Error(registerData.username[0]);
                } else if (registerData.password) {
                    throw new Error(registerData.password[0]);
                } else {
                    throw new Error(registerData.detail || 'Registration failed');
                }
            }

            // 2. Auto-login after successful registration
            const loginResponse = await fetch('https://codealpha-task2.onrender.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(loginData.detail || 'Auto-login failed');
            }

            // 3. Store authentication data
            localStorage.setItem('authToken', loginData.token);
            localStorage.setItem('user', JSON.stringify(loginData.user));
            
            // 4. Update auth state and redirect
            if (typeof setIsAuthenticated === 'function') {
                setIsAuthenticated(true);
            }
            navigate('/shopping');

        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Registration failed. Please try again.');
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
                        <FaUser size={32} />
                    </div>
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join us to get started</p>
                    {error && <p style={styles.error}>{error}</p>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <FaUser style={styles.inputIcon} />
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
                        <FaEnvelope style={styles.inputIcon} />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email} 
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <FaLock style={styles.inputIcon} />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange}
                            required
                            minLength="8"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <FaLock style={styles.inputIcon} />
                        <input 
                            type="password" 
                            name="password2" 
                            placeholder="Confirm Password" 
                            value={formData.password2} 
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
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <div style={styles.switchText}>
                    Already have an account?{' '}
                    <span 
                        style={styles.switchLink}
                        onClick={handleLogin}
                    >
                        Sign in
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
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
        color: '#11998e',
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
};

export default Register;
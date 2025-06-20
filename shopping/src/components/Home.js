import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './home.css';
import PixelTransition from './PixelTransition';
import TextPressure from './TextPressure';

import fashion from '../Assets/fashion.jpeg';
import online from '../Assets/online.jpeg';
import shirts from '../Assets/shirt.jpeg';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const Home = (props) => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);
  const containerRef = useRef(null);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleScroll = (section) => {
    const sectionRefs = {
      Home: homeRef,
      About: aboutRef,
      Contact: contactRef,
    };

    if (sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 2 }}>Online Shopping</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleScroll(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login',{ state: { role: "Login" } });
  const handleRegister = () => navigate('/login',{ state: { role: "Register" } });

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position="fixed" sx={{ backgroundColor: " rgb(19, 78, 100)" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", display: { xs: 'none', sm: 'block' } }}
            >
              Online Shopping
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff', fontWeight: "bold" }} onClick={() => handleScroll(item)}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      
      <div id="home" className='main' ref={homeRef} style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a2a6c,rgb(150, 145, 220),rgb(88, 10, 106))',
          color: 'white',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          {/* Animated background elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0
          }}>
            {[...Array(15)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }} />
            ))}
          </div>

          <h1 style={{ position: 'relative', zIndex: 1 }}>
            <div
              ref={containerRef}
              style={{ 
                position: 'relative', 
                cursor: 'pointer', 
                fontSize: '6rem',
                marginBottom: '2rem',
                textShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}
            >
              <TextPressure
                text="Welcome_To_FitFinder!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={100}
              />
            </div>
            
            {/* Added subtitle */}
            <p style={{
              fontSize: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              fontWeight: 300,
              lineHeight: 1.5,
              textShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              Discover your perfect style with our curated collection of fashion essentials
            </p>
            
            {/* Enhanced button with animation */}
            <div className='btn' style={{ position: 'relative', zIndex: 1 }}>
              <Button 
                variant="outlined" 
                onClick={() => handleScroll('About')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  padding: '12px 30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    borderColor: 'white'
                  }
                }}
              >
                View More
              </Button>
            </div>
          </h1>

          {/* Floating shopping icons */}
          <div style={{
            position: 'absolute',
            bottom: '50px',
            display: 'flex',
            gap: '30px',
            zIndex: 1
          }}>
            {['👕', '👖', '👟', '👜', '👔'].map((icon, i) => (
              <div 
                key={i}
                style={{
                  fontSize: '2.5rem',
                  animation: `bounce 2s infinite ${i * 0.2}s`,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Add some CSS for animations */}
          <style>
            {`
              @keyframes float {
                0% {
                  transform: translateY(0) rotate(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translateY(-1000px) rotate(720deg);
                  opacity: 0;
                }
              }
              @keyframes bounce {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-20px);
                }
              }
            `}
          </style>
        </div>

      {/* Login Section */}
      <div className="login-page" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '4rem 2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <div className="content" style={{
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          margin: '0 0 1rem',
          background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          letterSpacing: '-1px'
        }}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)'
        }}
      >
        <TextPressure
          text="Welcome Back!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#3a7bd5"
          strokeColor="#00d2ff"
          minFontSize={60}
        />
      </div>
    </h1>
    <p style={{
      color: '#555',
      fontSize: '1.2rem',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      Sign in to your account or create a new one to get started
    </p>
  </div>

  {/* Login Boxes Section */}
  <div className="container" style={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    width: '100%',
    maxWidth: '900px'
  }}>
    <div className="box admin" style={{
      background: 'white',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      textAlign: 'center',
      flex: '1 1 300px',
      maxWidth: '400px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
      }
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        color: 'white',
        fontSize: '2rem'
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h2 style={{
        margin: '0 0 1rem',
        color: '#333',
        fontSize: '1.8rem',
        fontWeight: 700
      }}>Login</h2>
      <p style={{
        color: '#666',
        marginBottom: '2rem',
        fontSize: '1rem',
        lineHeight: '1.6'
      }}>Access your existing account with your credentials</p>
      <button 
        className="login-btn admin-btn" 
        onClick={handleLogin}
        style={{
          background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
          color: 'white',
          border: 'none',
          padding: '0.8rem 2rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(58, 123, 213, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(58, 123, 213, 0.4)'
          }
        }}
      >
        Sign In
      </button>
    </div>

    <div className="box teacher" style={{
      background: 'white',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      textAlign: 'center',
      flex: '1 1 300px',
      maxWidth: '400px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
      }
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        color: 'white',
        fontSize: '2rem'
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      </div>
      <h2 style={{
        margin: '0 0 1rem',
        color: '#333',
        fontSize: '1.8rem',
        fontWeight: 700
      }}>Register</h2>
      <p style={{
        color: '#666',
        marginBottom: '2rem',
        fontSize: '1rem',
        lineHeight: '1.6'
      }}>Create a new account to access all features</p>
      <button 
        className="login-btn teacher-btn" 
        onClick={handleRegister}
        style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white',
          border: 'none',
          padding: '0.8rem 2rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(17, 153, 142, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(17, 153, 142, 0.4)'
          }
        }}
      >
        Create Account
      </button>
    </div>
  </div>
</div>

{/*  About Section */}
      <div className='about' id="about-section" ref={aboutRef} style={{ padding: '100px 0', display:'flex', alignContent:'center'}}>
        <h1>
            <TextPressure
              text="About_Our_Platform"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#111"
              strokeColor="#ff0000"
              minFontSize={160}
            />
          </h1>
        <div className='box1' style={{marginBottom:'100px', width:'100%'}}>
          
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '20px auto', color: '#555', lineHeight: '1.5' }}>
            Discover the key features that make our shopping platform unique and user-friendly.
          </p>
        </div>
         <div 
        className='boxes' 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Shopping Cart Box */}
        <div style={{
          position: 'relative',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
         
        }}>
    <PixelTransition
      firstContent={
        <img
          src={shirts}
          alt="Shopping cart illustration"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: 'brightness(0.9)'
          }}
        />
      }
      secondContent={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(17, 17, 17, 0.9)",
            padding: "2rem",
            textAlign: "center"
          }}
        >
          <h3 style={{ 
            fontWeight: 600, 
            fontSize: "1.5rem", 
            color: "#ffffff",
            marginBottom: "1rem"
          }}>
            Shopping Cart
          </h3>
          <p style={{ 
            fontWeight: 300, 
            fontSize: "1rem", 
            color: "#ffffff",
            lineHeight: "1.6"
          }}>
            The shopping cart is a virtual container where users can collect items they wish to purchase.
          </p>
        </div>
      }
      gridSize={12}
      pixelColor='#ffffff'
      animationStepDuration={0.4}
      className="custom-pixel-card"
    />
  </div>

  {/* Product Details Box */}
  <div style={{
    position: 'relative',
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
    
  }}>
    <PixelTransition
      firstContent={
        <img
          src={fashion}
          alt="Product details illustration"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: 'brightness(0.9)'
          }}
        />
      }
      secondContent={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(17, 17, 17, 0.9)",
            padding: "2rem",
            textAlign: "center"
          }}
        >
          <h3 style={{ 
            fontWeight: 600, 
            fontSize: "1.5rem", 
            color: "#ffffff",
            marginBottom: "1rem"
          }}>
            Product Details
          </h3>
          <p style={{ 
            fontWeight: 300, 
            fontSize: "1rem", 
            color: "#ffffff",
            lineHeight: "1.6"
          }}>
            The Product Details Page (PDP) gives detailed information about a specific product.
          </p>
        </div>
      }
      gridSize={12}
      pixelColor='#ffffff'
      animationStepDuration={0.4}
      className="custom-pixel-card"
    />
  </div>

  {/* Order Processing Box */}
  <div style={{
    position: 'relative',
    height: '600px',
    borderRadius: '8px',
    overflow: 'hidden',
  
  }}>
    <PixelTransition
      firstContent={
        <img
          src={online}
          alt="Order processing illustration"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: 'brightness(0.9)'
          }}
        />
      }
      secondContent={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(17, 17, 17, 0.9)",
            padding: "2rem",
            textAlign: "center"
          }}
        >
          <h3 style={{ 
            fontWeight: 600, 
            fontSize: "1.5rem", 
            color: "#ffffff",
            marginBottom: "1rem"
          }}>
            Order Processing
          </h3>
          <p style={{ 
            fontWeight: 300, 
            fontSize: "1rem", 
            color: "#ffffff",
            lineHeight: "1.6"
          }}>
            Order processing involves the complete flow from when a user places an order until fulfillment.
          </p>
        </div>
      }
      gridSize={12}
      pixelColor='#ffffff'
      animationStepDuration={0.4}
      className="custom-pixel-card"
    />
  </div>
</div>
      </div>

      <div id='contact' ref={contactRef}>
        <Footer scrollToSection={handleScroll} />
      </div>
    </div>
  );
};

export default Home;
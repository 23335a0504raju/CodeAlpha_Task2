import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './shoppingpages/About';
import CategoryPage from './shoppingpages/CategoryPage';
import Contact from './shoppingpages/Contact';
import ContactUs from './shoppingpages/ContactUs';
import Features from './shoppingpages/Features';
import Footer from './shoppingpages/Footer';
import Hero from './shoppingpages/Hero';
import MenCollection from './shoppingpages/MenCollection';
import Navbar from './shoppingpages/Navbar';
import ProductSection from './shoppingpages/ProductSection';
import Profile from './shoppingpages/Profile';
import SearchPage from './shoppingpages/SearchPage';
import Story from './shoppingpages/Story';
import WomenCollection from './shoppingpages/WomenCollection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
   
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

 
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/register" 
            element={<Register setIsAuthenticated={setIsAuthenticated} />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/shopping" 
            element={
              <PrivateRoute>
                <>
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <Hero />
                  <About />
                  <ProductSection />
                  <Features />
                  <Story />
                  <Contact />
                  <Footer />
                </>
              </PrivateRoute>
            } 
          />

           <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/category/:categoryName" 
            element={
              <PrivateRoute>
                <CategoryPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/search" 
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/menscollection" 
            element={
              <PrivateRoute>
                <MenCollection />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/womenscollection" 
            element={
              <PrivateRoute>
                <WomenCollection />
              </PrivateRoute>
            } 
          />
          
          {/* Public Routes */}
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import BackgroundDecorations from '../components/BackgroundDecorations';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <BackgroundDecorations />

            <LandingHeader 
                onLogin={handleLogin}
                onRegister={handleRegister}
            />

            <HeroSection 
                onLogin={handleLogin}
                onRegister={handleRegister}
            />

            <FeaturesSection />
            
            <AboutSection />
            
            <ContactSection />
        </div>
    );
}

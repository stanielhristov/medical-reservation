import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackgroundDecorations from '../components/BackgroundDecorations';
import LanguageSwitcher from '../components/LanguageSwitcher';

const AboutPage = () => {
    const { t } = useTranslation();
    
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
            
            <nav style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem 2rem',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>🏥</span>
                        </div>
                        <Link to="/" style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            textDecoration: 'none',
                            letterSpacing: '-0.02em'
                        }}>
                            {t('landing.medReserve')}
                        </Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <LanguageSwitcher />
                        <Link to="/" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}>{t('nav.home')}</Link>
                        <Link to="/contact" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}>{t('nav.contact')}</Link>
                        <Link to="/login" style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                        }}>{t('nav.signIn')}</Link>
                    </div>
                </div>
            </nav>

            <div style={{
                padding: '6rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 5
            }}>
                {/* Section Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: '#1f2937',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {t('about.title')}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6b7280',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        {t('about.subtitle')}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Mission Card */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>🎯</span>
                        </div>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '1rem'
                        }}>
                            {t('about.ourMission')}
                        </h2>
                        <p style={{
                            color: '#6b7280',
                            lineHeight: '1.7',
                            marginBottom: '1rem'
                        }}>
                            {t('about.missionText1')}
                        </p>
                        <p style={{
                            color: '#6b7280',
                            lineHeight: '1.7'
                        }}>
                            {t('about.missionText2')}
                        </p>
                    </div>

                    {/* Key Features Card */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>⭐</span>
                        </div>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '1rem'
                        }}>
                            {t('about.keyFeatures')}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                t('about.feature1'),
                                t('about.feature2'),
                                t('about.feature3'),
                                t('about.feature4'),
                                t('about.feature5')
                            ].map((feature, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#22c55e',
                                        borderRadius: '50%',
                                        marginTop: '0.5rem',
                                        flexShrink: 0
                                    }}></div>
                                    <span style={{
                                        color: '#6b7280',
                                        lineHeight: '1.6'
                                    }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        {t('about.howItWorks')}
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { number: '1', title: t('about.step1Title'), description: t('about.step1Desc'), icon: '👤' },
                            { number: '2', title: t('about.step2Title'), description: t('about.step2Desc'), icon: '📅' },
                            { number: '3', title: t('about.step3Title'), description: t('about.step3Desc'), icon: '📊' }
                        ].map((step, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '1.5rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        fontSize: '2rem',
                                        position: 'absolute'
                                    }}>
                                        {step.icon}
                                    </span>
                                    <span style={{
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        position: 'absolute',
                                        bottom: '-5px',
                                        right: '-5px',
                                        background: '#16a34a',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1rem'
                                    }}>
                                        {step.number}
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '0.5rem'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: '#6b7280',
                                    lineHeight: '1.6'
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

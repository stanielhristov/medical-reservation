import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
    const { t } = useTranslation();
    
    return (
        <section id="about" style={{
            padding: '6rem 2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            position: 'relative',
            zIndex: 5
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Section Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>
                    <h2 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: '#1f2937',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {t('about.title')}
                    </h2>
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
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '1rem'
                        }}>
                            {t('about.ourMission')}
                        </h3>
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
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '1rem'
                        }}>
                            {t('about.keyFeatures')}
                        </h3>
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
                    <h3 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        {t('about.howItWorks')}
                    </h3>
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
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '0.5rem'
                                }}>
                                    {step.title}
                                </h4>
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
        </section>
    );
};

export default AboutSection;

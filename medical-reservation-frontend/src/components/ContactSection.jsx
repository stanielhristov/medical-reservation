import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert(t('contact.messageSent'));
    };

    return (
        <section id="contact" style={{
            padding: '6rem 2rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
                        {t('contact.title')}
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6b7280',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '3rem'
                }}>
                    {/* Contact Information */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '2rem'
                        }}>
                            {t('contact.contactInformation')}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Email Support */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>📧</span>
                                </div>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#1f2937',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {t('contact.emailSupport')}
                                    </h4>
                                    <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        support@medreserve.com
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        {t('contact.available247')}
                                    </p>
                                </div>
                            </div>

                            {/* Phone Support */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>📞</span>
                                </div>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#1f2937',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {t('contact.phoneSupport')}
                                    </h4>
                                    <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        +359 (2) 123-4567
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        {t('contact.phoneHours')}
                                    </p>
                                </div>
                            </div>

                            {/* Emergency Notice */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>🚨</span>
                                </div>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#1f2937',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {t('contact.emergency')}
                                    </h4>
                                    <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        {t('contact.emergencyText')}
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        {t('contact.emergencyNotice')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div style={{
                            marginTop: '2.5rem',
                            padding: '1.5rem',
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <h4 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                marginBottom: '1rem'
                            }}>
                                {t('contact.quickFAQ')}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    <strong>{t('contact.faq1Q')}</strong><br />
                                    {t('contact.faq1A')}
                                </p>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    <strong>{t('contact.faq2Q')}</strong><br />
                                    {t('contact.faq2A')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '2rem'
                        }}>
                            {t('contact.sendMessage')}
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    {t('contact.fullName')} *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22c55e';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder={t('contact.enterFullName')}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    {t('common.email')} *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22c55e';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder={t('contact.enterEmail')}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    {t('contact.subject')} *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22c55e';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder={t('contact.subjectPlaceholder')}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    {t('contact.message')} *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        resize: 'vertical',
                                        minHeight: '120px',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22c55e';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder={t('contact.messagePlaceholder')}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                                }}
                            >
                                {t('contact.sendMessageButton')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

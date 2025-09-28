import React, { useState } from 'react';

const ContactSection = () => {
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
        alert('Thank you for your message! We will get back to you soon.');
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
                        Get In Touch
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6b7280',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Have questions or need support? We're here to help you every step of the way
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
                            Contact Information
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
                                        Email Support
                                    </h4>
                                    <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        support@medreserve.com
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        Available 24/7 for your assistance
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
                                        Phone Support
                                    </h4>
                                    <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        +359 (2) 123-4567
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        Mon-Fri: 8:00 AM - 8:00 PM (Bulgaria Time)
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
                                        Emergency
                                    </h4>
                                    <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        For medical emergencies, call 112
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                        This platform is not for emergency services
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
                                Quick FAQ
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    <strong>Q:</strong> How do I book an appointment?<br />
                                    <strong>A:</strong> Register, browse doctors, and select your preferred time slot.
                                </p>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    <strong>Q:</strong> Can I cancel appointments?<br />
                                    <strong>A:</strong> Yes, from your dashboard with 24h notice when possible.
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
                            Send us a Message
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
                                    Full Name *
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
                                    placeholder="Enter your full name"
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
                                    Email Address *
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
                                    placeholder="Enter your email address"
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
                                    Subject *
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
                                    placeholder="What is this regarding?"
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
                                    Message *
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
                                    placeholder="Tell us how we can help you..."
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
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

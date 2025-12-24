import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useValidation } from '../hooks/useValidation';

const DateOfBirthInput = ({ value, onChange, disabled, error }) => {
    const { t } = useTranslation();
    const { calculateAge } = useValidation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [viewMode, setViewMode] = useState('year'); // 'year', 'month', 'day'
    const [yearRangeStart, setYearRangeStart] = useState(1950);
    const modalRef = useRef(null);

    const currentYear = new Date().getFullYear();
    const minAge = 18;
    const maxYear = currentYear - minAge;
    const minYear = 1900;

    useEffect(() => {
        if (value) {
            const [year, month, day] = value.split('-').map(Number);
            setSelectedYear(year);
            setSelectedMonth(month);
            setSelectedDay(day);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isModalOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isModalOpen]);

    const months = [
        { value: 1, label: t('dateOfBirth.january', 'January'), short: t('dateOfBirth.jan', 'Jan') },
        { value: 2, label: t('dateOfBirth.february', 'February'), short: t('dateOfBirth.feb', 'Feb') },
        { value: 3, label: t('dateOfBirth.march', 'March'), short: t('dateOfBirth.mar', 'Mar') },
        { value: 4, label: t('dateOfBirth.april', 'April'), short: t('dateOfBirth.apr', 'Apr') },
        { value: 5, label: t('dateOfBirth.may', 'May'), short: t('dateOfBirth.mayShort', 'May') },
        { value: 6, label: t('dateOfBirth.june', 'June'), short: t('dateOfBirth.jun', 'Jun') },
        { value: 7, label: t('dateOfBirth.july', 'July'), short: t('dateOfBirth.jul', 'Jul') },
        { value: 8, label: t('dateOfBirth.august', 'August'), short: t('dateOfBirth.aug', 'Aug') },
        { value: 9, label: t('dateOfBirth.september', 'September'), short: t('dateOfBirth.sep', 'Sep') },
        { value: 10, label: t('dateOfBirth.october', 'October'), short: t('dateOfBirth.oct', 'Oct') },
        { value: 11, label: t('dateOfBirth.november', 'November'), short: t('dateOfBirth.nov', 'Nov') },
        { value: 12, label: t('dateOfBirth.december', 'December'), short: t('dateOfBirth.dec', 'Dec') }
    ];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const openModal = () => {
        if (disabled) return;
        setIsModalOpen(true);
        if (!selectedYear) {
            setViewMode('year');
            setYearRangeStart(Math.floor((maxYear - 30) / 20) * 20);
        } else if (!selectedMonth) {
            setViewMode('month');
        } else {
            setViewMode('day');
        }
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setViewMode('month');
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setViewMode('day');
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onChange({ target: { value: formattedDate } });
        setIsModalOpen(false);
    };

    const formatDisplayDate = () => {
        if (!value) return '';
        const [year, month, day] = value.split('-').map(Number);
        const monthName = months.find(m => m.value === month)?.label || '';
        return `${monthName} ${day}, ${year}`;
    };

    const generateYearGrid = () => {
        const years = [];
        for (let i = 0; i < 20; i++) {
            const year = yearRangeStart + i;
            if (year >= minYear && year <= maxYear) {
                years.push(year);
            }
        }
        return years;
    };

    const generateDayGrid = () => {
        if (!selectedYear || !selectedMonth) return [];
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
        const days = [];
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        
        return days;
    };

    const weekDays = [
        t('dateOfBirth.sun', 'Su'),
        t('dateOfBirth.mon', 'Mo'),
        t('dateOfBirth.tue', 'Tu'),
        t('dateOfBirth.wed', 'We'),
        t('dateOfBirth.thu', 'Th'),
        t('dateOfBirth.fri', 'Fr'),
        t('dateOfBirth.sat', 'Sa')
    ];

    return (
        <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.9rem'
            }}>
                {t('auth.dateOfBirth')} <span style={{ color: '#dc2626' }}>*</span>
            </label>
            
            <div 
                onClick={openModal}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: error ? '2px solid #ef4444' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                    background: disabled ? '#f3f4f6' : '#f9fafb',
                    color: value ? '#374151' : '#9ca3af',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '52px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{value ? formatDisplayDate() : t('dateOfBirth.selectDate', 'Select your date of birth')}</span>
                </div>
                {value && calculateAge(value) !== null && (
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }}>
                        {calculateAge(value)} {t('auth.years')}
                    </div>
                )}
            </div>

            {error && (
                <div style={{
                    marginTop: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                </div>
            )}

            {value && !error && calculateAge(value) !== null && (
                <div style={{
                    marginTop: '0.5rem',
                    color: '#10b981',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {t('common.age')}: {calculateAge(value)} {t('auth.yearsOld')}
                </div>
            )}

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div 
                        ref={modalRef}
                        style={{
                            background: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            width: '90%',
                            maxWidth: '400px',
                            overflow: 'hidden',
                            animation: 'slideUp 0.3s ease-out'
                        }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            padding: '1.5rem',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 0.75rem'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <h3 style={{ 
                                margin: 0, 
                                fontSize: '1.25rem', 
                                fontWeight: '600',
                                letterSpacing: '-0.02em'
                            }}>
                                {t('dateOfBirth.title', 'Date of Birth')}
                            </h3>
                            <p style={{ 
                                margin: '0.5rem 0 0', 
                                fontSize: '0.9rem', 
                                opacity: 0.9 
                            }}>
                                {t('dateOfBirth.subtitle', 'Select your birth date')}
                            </p>
                            
                            {(selectedYear || selectedMonth || selectedDay) && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '500'
                                }}>
                                    {selectedDay ? `${months.find(m => m.value === selectedMonth)?.label || ''} ${selectedDay}, ${selectedYear}` :
                                     selectedMonth ? `${months.find(m => m.value === selectedMonth)?.label || ''} ${selectedYear}` :
                                     selectedYear ? selectedYear : ''}
                                </div>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            padding: '1rem 1.5rem 0.5rem',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setViewMode('year')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: viewMode === 'year' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f3f4f6',
                                    color: viewMode === 'year' ? 'white' : '#6b7280',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {selectedYear || t('dateOfBirth.year', 'Year')}
                            </button>
                            <span style={{ color: '#d1d5db' }}>→</span>
                            <button
                                onClick={() => selectedYear && setViewMode('month')}
                                disabled={!selectedYear}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: viewMode === 'month' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f3f4f6',
                                    color: viewMode === 'month' ? 'white' : selectedYear ? '#6b7280' : '#d1d5db',
                                    cursor: selectedYear ? 'pointer' : 'not-allowed',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {selectedMonth ? months.find(m => m.value === selectedMonth)?.short : t('dateOfBirth.month', 'Month')}
                            </button>
                            <span style={{ color: '#d1d5db' }}>→</span>
                            <button
                                onClick={() => selectedMonth && setViewMode('day')}
                                disabled={!selectedMonth}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: viewMode === 'day' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f3f4f6',
                                    color: viewMode === 'day' ? 'white' : selectedMonth ? '#6b7280' : '#d1d5db',
                                    cursor: selectedMonth ? 'pointer' : 'not-allowed',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {selectedDay || t('dateOfBirth.day', 'Day')}
                            </button>
                        </div>

                        <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                            
                            {viewMode === 'year' && (
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1rem'
                                    }}>
                                        <button
                                            onClick={() => setYearRangeStart(Math.max(minYear, yearRangeStart - 20))}
                                            disabled={yearRangeStart <= minYear}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: yearRangeStart <= minYear ? '#f3f4f6' : '#e0f2fe',
                                                color: yearRangeStart <= minYear ? '#d1d5db' : '#0369a1',
                                                cursor: yearRangeStart <= minYear ? 'not-allowed' : 'pointer',
                                                fontSize: '1.25rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            ←
                                        </button>
                                        <span style={{ 
                                            fontWeight: '600', 
                                            color: '#374151',
                                            fontSize: '1rem'
                                        }}>
                                            {yearRangeStart} - {Math.min(yearRangeStart + 19, maxYear)}
                                        </span>
                                        <button
                                            onClick={() => setYearRangeStart(Math.min(maxYear - 19, yearRangeStart + 20))}
                                            disabled={yearRangeStart + 20 > maxYear}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: yearRangeStart + 20 > maxYear ? '#f3f4f6' : '#e0f2fe',
                                                color: yearRangeStart + 20 > maxYear ? '#d1d5db' : '#0369a1',
                                                cursor: yearRangeStart + 20 > maxYear ? 'not-allowed' : 'pointer',
                                                fontSize: '1.25rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            →
                                        </button>
                                    </div>
                                    
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(4, 1fr)',
                                        gap: '0.5rem'
                                    }}>
                                        {generateYearGrid().map(year => (
                                            <button
                                                key={year}
                                                onClick={() => handleYearSelect(year)}
                                                style={{
                                                    padding: '0.75rem',
                                                    borderRadius: '12px',
                                                    border: selectedYear === year ? '2px solid #22c55e' : '1px solid #e5e7eb',
                                                    background: selectedYear === year ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 'white',
                                                    color: selectedYear === year ? '#166534' : '#374151',
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    fontWeight: selectedYear === year ? '600' : '400',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: selectedYear === year ? '0 2px 8px rgba(34, 197, 94, 0.2)' : 'none'
                                                }}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {viewMode === 'month' && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '0.75rem'
                                }}>
                                    {months.map(month => (
                                        <button
                                            key={month.value}
                                            onClick={() => handleMonthSelect(month.value)}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '16px',
                                                border: selectedMonth === month.value ? '2px solid #22c55e' : '1px solid #e5e7eb',
                                                background: selectedMonth === month.value ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 'white',
                                                color: selectedMonth === month.value ? '#166534' : '#374151',
                                                cursor: 'pointer',
                                                fontSize: '0.95rem',
                                                fontWeight: selectedMonth === month.value ? '600' : '500',
                                                transition: 'all 0.2s ease',
                                                boxShadow: selectedMonth === month.value ? '0 4px 12px rgba(34, 197, 94, 0.2)' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {month.short}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {viewMode === 'day' && (
                                <div>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '0.25rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {weekDays.map(day => (
                                            <div
                                                key={day}
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    color: '#9ca3af',
                                                    padding: '0.5rem 0'
                                                }}
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '0.25rem'
                                    }}>
                                        {generateDayGrid().map((day, index) => (
                                            <button
                                                key={index}
                                                onClick={() => day && handleDaySelect(day)}
                                                disabled={!day}
                                                style={{
                                                    aspectRatio: '1',
                                                    borderRadius: '12px',
                                                    border: selectedDay === day ? '2px solid #22c55e' : 'none',
                                                    background: selectedDay === day 
                                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                                                        : day ? '#f9fafb' : 'transparent',
                                                    color: selectedDay === day ? 'white' : day ? '#374151' : 'transparent',
                                                    cursor: day ? 'pointer' : 'default',
                                                    fontSize: '0.95rem',
                                                    fontWeight: selectedDay === day ? '600' : '400',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: selectedDay === day ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{
                            padding: '1rem 1.5rem',
                            borderTop: '1px solid #e5e7eb',
                            display: 'flex',
                            gap: '0.75rem',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={() => {
                                    setSelectedYear(null);
                                    setSelectedMonth(null);
                                    setSelectedDay(null);
                                    setViewMode('year');
                                    onChange({ target: { value: '' } });
                                }}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb',
                                    background: 'white',
                                    color: '#6b7280',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {t('common.clear', 'Clear')}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                                }}
                            >
                                {t('common.close', 'Close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default DateOfBirthInput;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../api/admin';
import GenericConfirmModal from '../../components/GenericConfirmModal';

const AdminComments = () => {
    const { t } = useTranslation();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize] = useState(10);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchComments = async (page = 0) => {
        try {
            setLoading(true);
            setError('');
            
            const response = await adminAPI.getAllRatings(page, pageSize);
            const data = response.data;
            
            setComments(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(t('errors.failedToLoadComments'));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async () => {
        if (!commentToDelete) return;

        try {
            setActionLoading(true);
            await adminAPI.deleteRating(commentToDelete.id);
            
            setSuccess(t('admin.commentDeletedSuccessfully'));
            setShowDeleteModal(false);
            setCommentToDelete(null);

            await fetchComments(currentPage);

            if (comments.length === 1 && currentPage > 0) {
                await fetchComments(currentPage - 1);
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            
            let errorMessage = t('errors.failedToDeleteComment');
            if (err.response?.status === 403) {
                errorMessage = t('errors.noPermissionToDeleteComment');
            } else if (err.response?.status === 404) {
                errorMessage = t('errors.commentNotFound');
            } else if (err.response?.status === 401) {
                errorMessage = t('errors.authenticationRequired');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const openDeleteModal = (comment) => {
        setCommentToDelete(comment);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchComments(newPage);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>{t('loading.loadingComments')}</p>
                </div>
            </div>
        );
    }

    if (error && !success) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.15)',
                    maxWidth: '500px',
                    border: '1px solid rgba(239, 68, 68, 0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1.5rem',
                        color: 'white'
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 1rem'
                    }}>
                        {t('admin.errorLoadingComments')}
                    </h3>
                    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
                        {error}
                    </p>
                    <button
                        onClick={() => fetchComments(0)}
                        style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {t('admin.retry')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {}
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, rgba(22, 163, 74, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '45%',
                left: '85%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-20%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                            border: '3px solid #047857'
                        }}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                <path d="M8 10h8"/>
                                <path d="M8 14h4"/>
                            </svg>
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            {t('admin.commentsManagement')}
                        </h1>
                        
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#6b7280',
                            margin: '0 0 3rem',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.6',
                            fontWeight: '400'
                        }}>
                            {t('admin.commentsManagementDescription', { total: totalElements })}
                        </p>

                        {}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                        <path d="M8 10h8"/>
                                        <path d="M8 14h4"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {totalElements}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('admin.totalComments')}</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7"/>
                                        <rect x="14" y="3" width="7" height="7"/>
                                        <rect x="14" y="14" width="7" height="7"/>
                                        <rect x="3" y="14" width="7" height="7"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {totalPages}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('admin.pages')}</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {comments.length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('admin.currentPage')}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {}
                {error && (
                    <div style={{
                        background: 'rgba(254, 242, 242, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(248, 113, 113, 0.2)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        boxShadow: '0 8px 32px rgba(248, 113, 113, 0.1)',
                        color: '#991b1b',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        background: 'rgba(240, 253, 244, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                        color: '#15803d',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}>
                        {success}
                    </div>
                )}

                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    overflow: 'hidden'
                }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 2rem',
                        letterSpacing: '-0.025em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <span style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </span>
                        {t('admin.userCommentsRatings')}
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '50px 180px 1fr 160px 100px',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    padding: '1.5rem',
                                    background: 'rgba(34, 197, 94, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    {}
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        flexShrink: 0
                                    }}>
                                        {comment.userFullName?.charAt(0) || '?'}
                                    </div>
                                    
                                    {}
                                    <div>
                                        <div style={{ 
                                            color: '#374151', 
                                            fontWeight: '700', 
                                            fontSize: '1rem',
                                            marginBottom: '0.25rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {comment.userFullName || t('common.anonymousUser')}
                                        </div>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.9rem'
                                        }}>
                                            <span style={{
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                color: comment.rating >= 4 ? '#16a34a' : 
                                                       comment.rating >= 3 ? '#d97706' : '#dc2626'
                                            }}>
                                                {comment.rating}
                                            </span>
                                            <span style={{ color: '#f59e0b', marginLeft: '0.5rem' }}>
                                                {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {}
                                    <div style={{ 
                                        color: '#6b7280', 
                                        fontSize: '0.9rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {comment.comment ? truncateText(comment.comment, 60) : t('admin.noCommentProvided')}
                                    </div>
                                    
                                    {}
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.4rem 0.75rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            borderRadius: '8px',
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            color: '#16a34a',
                                            border: '1px solid rgba(34, 197, 94, 0.2)'
                                        }}>
                                            ID: {comment.id}
                                        </span>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.75rem',
                                            marginTop: '0.4rem',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {formatDate(comment.createdAt)}
                                        </div>
                                    </div>
                                    
                                    {}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={() => openDeleteModal(comment)}
                                            disabled={actionLoading}
                                            style={{
                                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.6rem 1rem',
                                                borderRadius: '8px',
                                                cursor: actionLoading ? 'not-allowed' : 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.85rem',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                                                opacity: actionLoading ? 0.5 : 1,
                                                whiteSpace: 'nowrap'
                                            }}
                                            onMouseEnter={e => {
                                                if (!actionLoading) {
                                                    e.target.style.transform = 'translateY(-1px)';
                                                    e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.3)';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!actionLoading) {
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.25)';
                                                }
                                            }}
                                        >
                                            {t('common.delete')}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                padding: '3rem',
                                textAlign: 'center',
                                color: '#6b7280',
                                fontSize: '1.1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                </div>
                                {t('admin.noCommentsFound')}
                            </div>
                        )}
                    </div>

                    {}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                style={{
                                    background: currentPage === 0 
                                        ? 'rgba(107, 114, 128, 0.1)' 
                                        : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: currentPage === 0 ? '#9ca3af' : 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: currentPage === 0 ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.25)'
                                }}
                                onMouseEnter={e => {
                                    if (currentPage !== 0) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.3)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (currentPage !== 0) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.25)';
                                    }
                                }}
                            >
                                ← {t('common.previous')}
                            </button>

                            <span style={{
                                color: '#374151',
                                fontWeight: '600',
                                fontSize: '1rem',
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                {t('common.page')} {currentPage + 1} {t('common.of')} {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                                style={{
                                    background: currentPage === totalPages - 1 
                                        ? 'rgba(107, 114, 128, 0.1)' 
                                        : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: currentPage === totalPages - 1 ? '#9ca3af' : 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: currentPage === totalPages - 1 ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.25)'
                                }}
                                onMouseEnter={e => {
                                    if (currentPage !== totalPages - 1) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.3)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (currentPage !== totalPages - 1) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.25)';
                                    }
                                }}
                            >
                                {t('common.next')} →
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {}
            <GenericConfirmModal
                isOpen={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteComment}
                title={t('admin.deleteComment')}
                message={t('admin.deleteCommentMessage', { userName: commentToDelete?.userFullName || t('common.anonymousUser') })}
                confirmText={t('common.delete')}
                loading={actionLoading}
                confirmButtonStyle={{
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545'
                }}
                icon="🗑️"
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminComments;

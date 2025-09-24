import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import GenericConfirmModal from '../../components/GenericConfirmModal';

const AdminComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize] = useState(10);
    
    // Delete confirmation modal state
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
            setError('Failed to load comments. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async () => {
        if (!commentToDelete) return;

        try {
            setActionLoading(true);
            await adminAPI.deleteRating(commentToDelete.id);
            
            setSuccess('Comment deleted successfully');
            setShowDeleteModal(false);
            setCommentToDelete(null);
            
            // Refresh the current page
            await fetchComments(currentPage);
            
            // If the current page is now empty and it's not the first page, go to the previous page
            if (comments.length === 1 && currentPage > 0) {
                await fetchComments(currentPage - 1);
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            
            let errorMessage = 'Failed to delete comment. Please try again.';
            if (err.response?.status === 403) {
                errorMessage = 'You do not have permission to delete this comment.';
            } else if (err.response?.status === 404) {
                errorMessage = 'Comment not found. It may have already been deleted.';
            } else if (err.response?.status === 401) {
                errorMessage = 'Authentication required. Please log in again.';
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

    // Auto-hide success message after 3 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Auto-hide error message after 5 seconds
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading comments...</p>
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
                        Error Loading Comments
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
                        Retry
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
            {/* Background decorations */}
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

            {/* Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Enhanced Welcome Section */}
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
                    {/* Background pattern */}
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(245, 158, 11, 0.3)',
                            border: '3px solid #b45309',
                            position: 'relative'
                        }}>
                            {/* Comment Icon */}
                            <div style={{
                                fontSize: '3rem',
                                color: 'white'
                            }}>
                                💬
                            </div>
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            Comments Management
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
                            Manage user comments and ratings across the platform. Monitor feedback quality 
                            and maintain community standards ({totalElements} total comments).
                        </p>

                        {/* Quick Stats */}
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
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {totalElements}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Comments</div>
                            </div>
                            <div style={{
                                background: 'rgba(251, 191, 36, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(251, 191, 36, 0.2)'
                            }}>
                                <div style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {totalPages}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Pages</div>
                            </div>
                            <div style={{
                                background: 'rgba(139, 92, 246, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(139, 92, 246, 0.2)'
                            }}>
                                <div style={{ color: '#8b5cf6', fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {comments.length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Current Page</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Messages */}
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

                {/* Comments List */}
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem'
                        }}>💬</span>
                        User Comments & Ratings
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    padding: '1.5rem',
                                    background: 'rgba(245, 158, 11, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(245, 158, 11, 0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(245, 158, 11, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(245, 158, 11, 0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '700',
                                            fontSize: '1.2rem'
                                        }}>
                                            {comment.userFullName?.charAt(0) || '?'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontWeight: '700', 
                                                fontSize: '1.1rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {comment.userFullName || 'Anonymous User'}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.9rem',
                                                marginBottom: '0.25rem'
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
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.85rem',
                                                maxWidth: '400px'
                                            }}>
                                                {comment.comment ? truncateText(comment.comment, 80) : 'No comment provided'}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: '120px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                color: '#7c3aed',
                                                border: '1px solid rgba(139, 92, 246, 0.2)'
                                            }}>
                                                ID: {comment.id}
                                            </span>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.8rem',
                                                marginTop: '0.5rem'
                                            }}>
                                                {formatDate(comment.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => openDeleteModal(comment)}
                                            disabled={actionLoading}
                                            style={{
                                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '8px',
                                                cursor: actionLoading ? 'not-allowed' : 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                                                opacity: actionLoading ? 0.5 : 1
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
                                            🗑️ Delete
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
                                    <span style={{ fontSize: '1.5rem' }}>💬</span>
                                </div>
                                No comments found.
                            </div>
                        )}
                    </div>

                    {/* Enhanced Pagination */}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(245, 158, 11, 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(245, 158, 11, 0.1)'
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
                                ← Previous
                            </button>

                            <span style={{
                                color: '#374151',
                                fontWeight: '600',
                                fontSize: '1rem',
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                border: '1px solid rgba(245, 158, 11, 0.2)'
                            }}>
                                Page {currentPage + 1} of {totalPages}
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
                                Next →
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Delete Confirmation Modal */}
            <GenericConfirmModal
                isOpen={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteComment}
                title="Delete Comment"
                message={`Are you sure you want to delete this comment from ${commentToDelete?.userFullName}? This action cannot be undone.`}
                confirmText="Delete"
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

import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';



const Notfound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#18181b'
        }}>
            <div style={{
                animation: 'bounce 1s infinite',
                fontSize: '4rem',
                color: '#ff6b6b',
                marginBottom: '1rem'
            }}>
                <FaExclamationTriangle />
            </div>
            <h1 style={{ fontSize: '3rem', margin: 0, color: '#fafafa' }}>404</h1>
            <p style={{ fontSize: '1.2rem', color: '#a1a1aa', margin: '1rem 0' }}>
                Oops! The page you are looking for does not exist.
            </p>
            <a
                href="/"
                style={{
                    padding: '0.5rem 1.5rem',
                    background: '#27272a',
                    color: '#fafafa',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#3f3f46'}
                onMouseOut={e => e.currentTarget.style.background = '#27272a'}
            >
                Go Home
            </a>
            <style>
                {`
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0);}
                        50% { transform: translateY(-20px);}
                    }
                `}
            </style>
        </div>
    );
};

export default Notfound

import { BrowserRouter as  Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaSearch, FaTimes } from 'react-icons/fa';
import logo from '../logo.png'; 

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#ef97be',
          height: '50px',
          flexWrap: 'wrap',
        }}
      >
        {/* Sol */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Arama ikonu */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={iconStyle}
          >
            <FaSearch />
          </button>

          {!isMobile && (
            <>
              <a href="/hakkinda" style={linkStyle}>
                Hakkında
              </a>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  style={{ ...linkStyle, background: 'none', border: 'none', fontWeight: "bold" }}
                >
                  Kategoriler
                </button>
                {showCategories && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'white',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      minWidth: '150px',
                    }}
                    onMouseLeave={() => setShowCategories(false)} // Opsiyonel: otomatik kapansın
                  >
                    {[
                      'Yemekler',
                      'Seyahat',
                      'Sanat',
                      'Moda',
                      'Eğlence'
                    ].map((cat) => (
                      <a
                        key={cat}
                        href={`/kategoriler/${cat.toLowerCase().replace(/ /g, '-')}`}
                        style={{
                          display: 'block',
                          padding: '0.6rem 1rem',
                          textDecoration: 'none',
                          color: '#333',
                          backgroundColor: 'white',
                          fontSize: '0.95rem',
                        }}
                        onClick={() => setShowCategories(false)}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaFacebook />
        </a>
        </div>
      </header>

      {showSearch && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            background: '#f9f9f9',
            borderBottom: '1px solid #ccc',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Bir şeyler ara..."
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: isMobile ? '100%' : 'auto',
              minWidth: '200px',
            }}
          />
          <button onClick={() => setShowSearch(false)} style={iconStyle}>
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
};

const iconStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: 'white',
};



import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (

    isVisible && (

      <button 
        onClick={scrollToTop}
        style={styles.button}
      >
        <i className="bi bi-arrow-up-circle-fill" style={{ fontSize: '4rem', color: ' #e89404' }}></i>
    
      </button>

    )
    
  );

};

const styles = {
  button: {
    position: 'fixed',
    bottom: '30px',
    left: '15px',
    padding: '11px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.85))',
  }
};

export default ScrollToTopButton;


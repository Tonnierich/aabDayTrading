import React, { useState, useEffect, useRef } from 'react';
import './app-loader.scss';

interface AppLoaderProps {
    onLoadingComplete: () => void;
    duration?: number; // Duration in milliseconds, default 6000ms (6 seconds)
}

const AppLoader: React.FC<AppLoaderProps> = ({ onLoadingComplete, duration = 6000 }) => {
  const [progress, setProgress] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const bgElementsRef = useRef<HTMLDivElement>(null);

  // Create twinkling stars
  const createStars = () => {
    if (!bgElementsRef.current) return;
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 4 + 0.5;
      const leftPos = Math.random() * 100;
      const topPos = Math.random() * 100;
      const duration = 2 + Math.random() * 8;
      const delay = Math.random() * 10;
      const opacity = 0.2 + Math.random() * 0.8;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${leftPos}%`;
      star.style.top = `${topPos}%`;
      star.style.setProperty('--duration', `${duration}s`);
      star.style.setProperty('--opacity', opacity.toString());
      star.style.animationDelay = `${delay}s`;
      if (Math.random() > 0.8) {
        star.style.borderRadius = '0';
        star.style.transform = 'rotate(45deg)';
      }
      bgElementsRef.current.appendChild(star);
    }
  };

  // Create falling dollar bills
  const createDollar = () => {
    if (!bgElementsRef.current) return;
    const dollarSigns = ['💰', '💵', '💲', '🪙', '💴', '💶', '💷', '💸', '🤑', '💎'];
    const dollar = document.createElement('div');
    dollar.className = 'dollar';
    dollar.textContent = dollarSigns[Math.floor(Math.random() * dollarSigns.length)];
    const leftPos = Math.random() * 100;
    const duration = 3 + Math.random() * 8;
    const delay = Math.random() * 2;
    const size = 0.6 + Math.random() * 1.8;
    const rotation = Math.random() * 360;
    dollar.style.left = `${leftPos}%`;
    dollar.style.animationDuration = `${duration}s`;
    dollar.style.animationDelay = `${delay}s`;
    dollar.style.fontSize = `${size}em`;
    dollar.style.opacity = (0.4 + Math.random() * 0.6).toString();
    dollar.style.transform = `rotate(${rotation}deg)`;
    const drift = (Math.random() - 0.5) * 20;
    dollar.style.setProperty('--drift', `${drift}px`);
    bgElementsRef.current.appendChild(dollar);
    setTimeout(() => {
      if (dollar.parentNode === bgElementsRef.current) {
        bgElementsRef.current?.removeChild(dollar);
      }
    }, duration * 1000);
  };

  const createDollarBurst = () => {
    const burstCount = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => createDollar(), i * 50);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    container.style.transform = `translateY(0) rotate3d(${y}, ${x}, 0, ${(x - 0.5) * 2}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0) rotate3d(0, 0, 0, 0) scale(1)';
  };

  useEffect(() => {
    createStars();
    for (let i = 0; i < 100; i++) {
      setTimeout(() => createDollar(), i * 30);
    }
    const dollarInterval = setInterval(createDollarBurst, 150);
    const singleDollarInterval = setInterval(createDollar, 80);

    let currentProgress = 1;
    let speed = 0.5;
    const progressInterval = setInterval(() => {
      if (currentProgress < 30) {
        speed += 0.15;
      } else if (currentProgress > 85) {
        speed *= 0.85;
      }
      currentProgress = Math.min(currentProgress + speed, 100);
      setProgress(Math.floor(currentProgress));
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onLoadingComplete, 300);
        }, 200);
      }
    }, 40);

    return () => {
      clearInterval(dollarInterval);
      clearInterval(singleDollarInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="trading-hub-loader">
      <div className="background-elements" ref={bgElementsRef}></div>
      
      <div 
        className="loader-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="logo">
          <div className="logo-main">Welcome to</div>
          <div className="logo-sub">DAY TRADING</div>
        </div>

        <div className="welcome-message">
          <div className="welcome-title">Your Partner in Smarter, Automated Wealth 🚀</div>
          <div className="welcome-text">
            Access premium trading strategies, insights, and automation — all in one place.  
            With Day Trading, let’s turn opportunities into consistent growth. 📈💰
          </div>
        </div>

        <div className="features-container">
          <div className="feature-main">Start Your Trading Journey Today</div>
          <ul className="feature-list">
            <li className="feature-item">⚡ Advanced Market Analysis Tools</li>
            <li className="feature-item">🤖 AI-Powered & Automated Trading Bots</li>
            <li className="feature-item">👥 Seamless Copy Trading Options</li>
          </ul>
          <div className="feature-tagline">
            DAY TRADING — Empowering traders, one decision at a time.  
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-text">
            <span>Loading premium features</span>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-dots">
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;

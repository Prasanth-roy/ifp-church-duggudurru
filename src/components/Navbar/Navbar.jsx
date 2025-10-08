import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'హోమ్' },
    { path: '/songs', label: 'పాటలు' },
    { path: '/verses', label: 'వచనాలు' },
    { path: '/images', label: 'చిత్రాలు' },
    { path: '/prayer-requests', label: 'ప్రార్థన అభ్యర్థనలు' },
    { path: '/contact', label: 'సంప్రదించండి' }
  ];

  return (
    <>
      <header className={styles.navbar}>
        <div className="container">
          <div className={styles.navbarContent}>
            <Link to="/" className={styles.brand}>
              {/* Logo Image */}
              {/* <div className={styles.logo}>
                <img 
                  src="/images/yt end logo.jpg" 
                  alt="IFP Church Logo" 
                  className={styles.logoImage}
                />
              </div> */}
                <div className={`${styles.logo} ${styles.large}`}>
                  <img 
                    src="/images/yt end logo.jpg" 
                    alt="IFP Church Logo" 
                    className={styles.logoImage}
                  />
                </div>
              
              <div className={styles.brandText}>
                <h1 className={styles.churchName}>IFP Church</h1>
                <p className={styles.churchPlace}>Duggudurru</p>
              </div>
            </Link>

            <nav className={styles.desktopNav}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ''
                  } telugu-text`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.navActions}>
              <ThemeToggle />
              <button 
                className={styles.menuButton}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Navbar;
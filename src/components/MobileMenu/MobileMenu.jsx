import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose, navItems, currentPath }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.menu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className={styles.header}>
              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`${styles.navLink} ${
                    currentPath === item.path ? styles.active : ''
                  }`}
                  onClick={onClose}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
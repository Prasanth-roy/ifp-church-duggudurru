import React from 'react';
import { motion } from 'framer-motion';
import { CHURCH_INFO } from '../../utils/constants';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.animatedBackground} />
      <div className="container">
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={styles.churchName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {CHURCH_INFO.name}
          </motion.h1>
          <motion.p 
            className={styles.churchPlace}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {CHURCH_INFO.place}
          </motion.p>
          <motion.p 
            className={`${styles.tagline} telugu-text`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {CHURCH_INFO.tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
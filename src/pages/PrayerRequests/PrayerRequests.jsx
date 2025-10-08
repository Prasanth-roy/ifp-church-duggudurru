import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Clock } from 'lucide-react';
import PrayerForm from '../../components/PrayerForm/PrayerForm';
import PrayerList from '../../components/PrayerList/PrayerList';
import styles from './PrayerRequests.module.css';

const PrayerRequests = () => {
  const [activeTab, setActiveTab] = useState('request');

  return (
    <div className={styles.prayerRequests}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>ప్రార్థన అభ్యర్థనలు</h1>
            <p className={styles.pageDescription}>
              మీ ప్రార్థన అభ్యర్థనలను పంపండి మరియు ఇతరుల కోసం ప్రార్థించండి
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'request' ? styles.active : ''}`}
              onClick={() => setActiveTab('request')}
            >
              <Heart size={20} />
              ప్రార్థన అభ్యర్థన పంపండి
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'pray' ? styles.active : ''}`}
              onClick={() => setActiveTab('pray')}
            >
              <Users size={20} />
              ఇతరుల కోసం ప్రార్థించండి
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'request' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <h2>మీ ప్రార్థన అభ్యర్థనను పంపండి</h2>
                    <p>
                      మీ ప్రార్థన అవసరాలను మాతో పంచుకోండి. మేము మిమ్మల్ని మరియు మీ కుటుంబాన్ని 
                      మా ప్రార్థనలలో ఉంచుతాము.
                    </p>
                  </div>
                  <PrayerForm />
                </div>
              </motion.div>
            )}

            {activeTab === 'pray' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.listSection}>
                  <div className={styles.sectionHeader}>
                    <h2>ఇతరుల కోసం ప్రార్థించండి</h2>
                    <p>
                      మా సమాజం సభ్యుల ప్రార్థన అభ్యర్థనలను చూడండి మరియు వారి కోసం ప్రార్థించండి.
                    </p>
                  </div>
                  <PrayerList />
                </div>
              </motion.div>
            )}
          </div>

          <div className={styles.prayerGuidelines}>
            <h3>ప్రార్థన మార్గదర్శకాలు</h3>
            <div className="grid grid-3">
              <div className={styles.guidelineCard}>
                <Heart size={32} />
                <h4>ప్రేమతో ప్రార్థించండి</h4>
                <p>ప్రతి ప్రార్థనను ప్రేమ మరియు దయతో స్వీకరించండి మరియు ప్రతిస్పందించండి</p>
              </div>
              
              <div className={styles.guidelineCard}>
                <Clock size={32} />
                <h4>స్థిరంగా ప్రార్థించండి</h4>
                <p>ప్రార్థనలకు సమాధానాలు వచ్చే వరకు స్థిరంగా ప్రార్థించడం కొనసాగించండి</p>
              </div>
              
              <div className={styles.guidelineCard}>
                <Users size={32} />
                <h4>సమాజంతో పంచుకోండి</h4>
                <p>మీ ప్రార్థన విజయాలను సమాజంతో పంచుకోండి మరియు ఇతరులను ప్రోత్సహించండి</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerRequests;
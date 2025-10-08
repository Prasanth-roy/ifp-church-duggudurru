import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import ContactForm from '../../components/ContactForm/ContactForm';
import { CHURCH_INFO, SOCIAL_LINKS } from '../../utils/constants';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>సంప్రదించండి</h1>
            <p className={styles.pageDescription}>
              IFP Church, Duggudurru కు స్వాగతం. మీరు మమ్మల్ని ఎప్పుడైనా సంప్రదించవచ్చు
            </p>
          </div>

          <div className={styles.contactInfo}>
            <div className="grid grid-3">
              <motion.div 
                className={styles.infoCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className={styles.infoIcon}>
                  <MapPin size={32} />
                </div>
                <h3>చిరునామా</h3>
                <p>{CHURCH_INFO.address}</p>
              </motion.div>

              <motion.div 
                className={styles.infoCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className={styles.infoIcon}>
                  <Phone size={32} />
                </div>
                <h3>ఫోన్ నంబర్</h3>
                <p>{CHURCH_INFO.phone}</p>
                {/* <small>సమయం: ఉదయం 8:00 - సాయంత్రం 8:00</small> */}
              </motion.div>

              <motion.div 
                className={styles.infoCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className={styles.infoIcon}>
                  <Mail size={32} />
                </div>
                <h3>ఈమెయిల్</h3>
                <p>{CHURCH_INFO.email}</p>
                <small>24 గంటల్లో ప్రత్యుత్తరం ఇవ్వబడుతుంది</small>
              </motion.div>
            </div>
          </div>

          <div className={styles.serviceTimes}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>ఆరాదన సమయాలు</h2>
              <div className={styles.timesGrid}>
                <div className={styles.timeCard}>
                  <Clock size={24} />
                  <div>
                    <h4>ఆదివారం పూజ</h4>
                    <p>{CHURCH_INFO.serviceTimes.sunday}</p>
                  </div>
                </div>
                
                <div className={styles.timeCard}>
                  <Clock size={24} />
                  <div>
                    <h4>సాయంత్రం ప్రార్థన</h4>
                    <p>{CHURCH_INFO.serviceTimes.evening}</p>
                  </div>
                </div>
                
                <div className={styles.timeCard}>
                  <Clock size={24} />
                  <div>
                    <h4>శుక్రవారం  సమావేశం</h4>
                    <p>{CHURCH_INFO.serviceTimes.wednesday}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          <div className={styles.emergencyContact}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className={styles.emergencyCard}
            >
              <div className={styles.emergencyHeader}>
                <Send size={24} />
                <h3>అత్యవసర సంప్రదింపు</h3>
              </div>
              <p>
                అత్యవసర పరిస్థితులలో, దయచేసి మా పాస్టర్‌ను నేరుగా సంప్రదించండి. 
                మేము 24/7 మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాము.
              </p>
              <div className={styles.emergencyPhone}>
                <Phone size={20} />
                <span>+91 9989560494, 9948576544</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
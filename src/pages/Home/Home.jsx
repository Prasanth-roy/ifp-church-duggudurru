import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Image, Calendar, Share2 } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import VerseCard from '../../components/VerseCard/VerseCard';
import { CHURCH_INFO } from '../../utils/constants';
import { getDailyVerse } from '../../utils/dailyVerse';
import styles from './Home.module.css';

const Home = () => {
  const [dailyVerse, setDailyVerse] = useState(null);
  const [latestSongs, setLatestSongs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Get today's verse automatically with online background
    const verse = getDailyVerse();
    setDailyVerse(verse);

    // Mock latest songs
    setLatestSongs([
      { id: 1, title: "నీవే నా దేవుడవు", artist: "Hosanna" },
      { id: 2, title: "ప్రభువు నా కొండ", artist: "Raj Prakash Paul" },
      { id: 3, title: "ఆరాధన చేతలెత్తి", artist: "Aardana" }
    ]);

    // Mock announcements
    setAnnouncements([
      "ఆదివారం మొదటి ఆరాదన  - ఉదయం 10 :00 గంటలకు",
      "ఆదివారం రెండవ ఆరాదన  - రాత్రి 07:00 గంటలకు",
      "శుక్రవారం ఉపవాస ప్రార్దన - రాత్రి 07: 00 గంటలకు",
      "యవనస్తుల ప్రార్దన - శనివారం  సాయంత్రం 7:00 గంటలకు"
    ]);
  }, []);

  return (
    <div className={styles.home}>
      <Hero />
      
      <section className="section">
        <div className="container">
          {dailyVerse && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className={`${styles.sectionTitle} telugu-text`}>నిత్య వచనం</h2>
              <p className={styles.dailyDate}>
                {new Date().toLocaleDateString('te-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <VerseCard verse={dailyVerse} />
            </motion.div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className={`${styles.sectionTitle} telugu-text`}>త్వరిత లింకులు</h2>
            <div className="grid grid-3">
              <motion.a 
                href="/songs" 
                className={styles.quickLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.quickLinkIcon}>
                  <Music size={32} />
                </div>
                <h3 className="telugu-text">పాటలు</h3>
                <p className="telugu-text">100+ తెలుగు ఆరాధన పాటలు</p>
              </motion.a>

              <motion.a 
                href="/images" 
                className={styles.quickLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.quickLinkIcon}>
                  <Image size={32} />
                </div>
                <h3 className="telugu-text">చిత్రాలు</h3>
                <p className="telugu-text">చర్చి కార్యక్రమాల ఫోటోలు</p>
              </motion.a>

              <motion.a 
                href="/verses" 
                className={styles.quickLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.quickLinkIcon}>
                  <Share2 size={32} />
                </div>
                <h3 className="telugu-text">వచనాలు</h3>
                <p className="telugu-text">ప్రతిరోజు కొత్త వచనం</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <motion.div
              className={styles.latestSection}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className={`${styles.subSectionTitle} telugu-text`}>ఆద్యాత్మిక పాటలు</h3>
              <div className={styles.songsList}>
                {latestSongs.map((song, index) => (
                  <div key={song.id} className={styles.songItem}>
                    <span className={styles.songNumber}>{index + 1}</span>
                    <div className={styles.songInfo}>
                      <h4 className="telugu-text">{song.title}</h4>
                      <p className="telugu-text">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/songs" className="btn btn-outline telugu-text">
                అన్ని పాటలు చూడండి
              </a>
            </motion.div>

            <motion.div
              className={styles.announcementsSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className={`${styles.subSectionTitle} telugu-text`}>ఆరాదన సమయములు</h3>
              <div className={styles.announcementsList}>
                {announcements.map((announcement, index) => (
                  <div key={index} className={styles.announcementItem}>
                    <Calendar size={16} />
                    <span className="telugu-text">{announcement}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.serviceTimes}>
                <h4 className="telugu-text">పరిచర్యలు</h4>
                <div className={styles.serviceItem}>
                  <strong className="telugu-text">దుగ్గుదుర్రు</strong>
                  <span className="telugu-text">10:00 AM - 12:30 PM</span>
                </div>
                <div className={styles.serviceItem}>
                  <strong className="telugu-text">రాచబంధ (సాయంత్రం)</strong>
                  <span className="telugu-text">07:00 PM - 09:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Marquee for Announcements */}
      {announcements.length > 0 && (
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              {announcements.map((announcement, index) => (
                <span key={index} className={`${styles.marqueeItem} telugu-text`}>
                  {announcement}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Youtube, 
  Instagram, 
  Send,
  Heart
} from 'lucide-react';
import { CHURCH_INFO, SOCIAL_LINKS } from '../../utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>IFP Church, Duggudurru</h3>
            <p className={styles.churchDescription}>
              IFP Church, Duggudurru is a place of worship, testimony, and service. 
              We are committed to spreading the love of Christ and serving our community 
              through prayer, fellowship, and outreach programs.
            </p>
            <p className={`${styles.teluguDescription} telugu-text`}>
              ఐఎఫ్‌పి చర్చి, దుగ్గుదుర్రు ఒక ప్రార్థన, సాక్ష్యం మరియు సేవ స్థలం. 
              మేము క్రీస్తు ప్రేమను వ్యాప్తి చేయడానికి మరియు ప్రార్థన, సహవాసం 
              మరియు అవుట్రీచ్ కార్యక్రమాల ద్వారా మా సమాజానికి సేవ చేయడానికి నిబద్ధత కలిగి ఉన్నాము.
            </p>
            
            <div className={styles.socialLinks}>
              <a href={SOCIAL_LINKS.facebook} className={styles.socialLink}>
                <Facebook size={20} />
              </a>
              <a href={SOCIAL_LINKS.youtube} className={styles.socialLink}>
                <Youtube size={20} />
              </a>
              <a href={SOCIAL_LINKS.instagram} className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} className={styles.socialLink}>
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionSubtitle}>త్వరిత లింకులు</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/" className={styles.footerLink}>హోమ్</a></li>
              <li><a href="/songs" className={styles.footerLink}>పాటలు</a></li>
              <li><a href="/verses" className={styles.footerLink}>వచనాలు</a></li>
              <li><a href="/images" className={styles.footerLink}>చిత్రాలు</a></li>
              <li><a href="/prayer-requests" className={styles.footerLink}>ప్రార్థన అభ్యర్థనలు</a></li>
              <li><a href="/contact" className={styles.footerLink}>సంప్రదించండి</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionSubtitle}>ప్రార్దన  సమయాలు</h4>
            <div className={styles.serviceTimes}>
              <div className={styles.serviceItem}>
                <Clock size={16} />
                <span>ఆదివారం: 10:00 AM</span>
              </div>
              <div className={styles.serviceItem}>
                <Clock size={16} />
                <span>సాయంత్రం: 07:00 PM</span>
              </div>
              <div className={styles.serviceItem}>
                <Clock size={16} />
                <span>శుక్రవారం : 07.00 PM</span>
              </div>
            </div>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>{CHURCH_INFO.address}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{CHURCH_INFO.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{CHURCH_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionSubtitle}>న్యూస్ లెటర్</h4>
            <p className={styles.newsletterText}>
              మా పరిచర్య  మరియు కార్యక్రమాల కోసం సబ్‌స్క్రయిబ్ చేయండి
            </p>
            
            {isSubscribed ? (
              <div className={styles.successMessage}>
                ధన్యవాదాలు! మీరు విజయవంతంగా సబ్‌స్క్రయిబ్ అయ్యారు.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="మీ ఈమెయిల్ చిరునామా"
                    className={styles.newsletterInput}
                    required
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>
              &copy; {currentYear} IFP Church, Duggudurru. All rights reserved. | 
              By  <Heart size={14} /> Prasanth 
            </p>
          </div>
          
          <div className={styles.footerNav}>
            <a href="/privacy" className={styles.bottomLink}>గోప్యతా విధానం</a>
            <a href="/terms" className={styles.bottomLink}>వినియమాలు</a>
            <a href="/sitemap" className={styles.bottomLink}>సైట్ మ్యాప్</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
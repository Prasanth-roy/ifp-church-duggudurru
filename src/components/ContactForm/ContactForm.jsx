import React, { useState } from 'react';
import { Send, User, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CHURCH_INFO, SOCIAL_LINKS } from '../../utils/constants';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Formspree endpoint - replace with your actual Formspree URL
      const response = await fetch('https://formspree.io/f/mldplokj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `IFP Church Contact: ${formData.subject}`,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setIsSubmitting(false);
      setError('సందేశం పంపడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.');
    }
  };

  return (
    <div className={styles.contact}>
      <div className="grid grid-2">
        <div className={styles.contactInfo}>
          <h2 className={`${styles.sectionTitle} telugu-text`}>మమ్మల్ని సంప్రదించండి</h2>
          
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <MapPin size={24} className={styles.infoIcon} />
              <div>
                <h3 className="telugu-text">చిరునామా</h3>
                <p className="telugu-text">{CHURCH_INFO.address}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <Phone size={24} className={styles.infoIcon} />
              <div>
                <h3 className="telugu-text">ఫోన్ నంబర్</h3>
                <p className="telugu-text">{CHURCH_INFO.phone}</p>
                <small className="telugu-text">సమయం: ఉదయం 8:00 - సాయంత్రం 8:00</small>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <Mail size={24} className={styles.infoIcon} />
              <div>
                <h3 className="telugu-text">ఈమెయిల్</h3>
                <p className="telugu-text">{CHURCH_INFO.email}</p>
                <small className="telugu-text">24 గంటల్లో ప్రత్యుత్తరం ఇవ్వబడుతుంది</small>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <Clock size={24} className={styles.infoIcon} />
              <div>
                <h3 className="telugu-text">ఆరాదన  సమయాలు</h3>
                <p className="telugu-text">ఆదివారం: {CHURCH_INFO.serviceTimes.sunday}</p>
                <p className="telugu-text">సాయంత్రం: {CHURCH_INFO.serviceTimes.evening}</p>
                <p className="telugu-text">శుక్రవారం : {CHURCH_INFO.serviceTimes.wednesday}</p>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} />
              <p className="telugu-text">గూగుల్ మ్యాప్ ఇక్కడ ఉంచబడుతుంది</p>
              <small className="telugu-text">మ్యాప్ ఎంబెడ్ చేయడానికి గూగుల్ మ్యాప్‌స్ API కీని జోడించండి</small>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          {showSuccess && (
            <div className={styles.successMessage}>
              <h3 className="telugu-text">సందేశం పంపబడింది!</h3>
              <p className="telugu-text">మీ సందేశం విజయవంతంగా పంపబడింది. మేము త్వరలోనే మీకు ప్రత్యుత్తరం ఇస్తాము.</p>
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              <h3 className="telugu-text">లోపం!</h3>
              <p className="telugu-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <User size={16} />
                  <span className="telugu-text">పూర్తి పేరు *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="మీ పూర్తి పేరు"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <Mail size={16} />
                  <span className="telugu-text">ఈమెయిల్ *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="మీ ఈమెయిల్ చిరునామా"
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  <Phone size={16} />
                  <span className="telugu-text">ఫోన్ నంబర్</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="మీ ఫోన్ నంబర్"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  <span className="telugu-text">విషయం *</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="సందేశం విషయం"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                <span className="telugu-text">సందేశం *</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={styles.textarea}
                placeholder="మీ సందేశం ఇక్కడ రాయండి..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary ${styles.submitButton}`}
            >
              <Send size={16} />
              {isSubmitting ? 'పంపుతోంది...' : 'సందేశం పంపండి'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
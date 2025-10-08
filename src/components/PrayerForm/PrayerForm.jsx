import React, { useState } from 'react';
import { Send, User, Mail, Phone, Lock } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './PrayerForm.module.css';

const PrayerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    title: '',
    details: '',
    isPublic: true,
    isAnonymous: false
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [prayerRequests, setPrayerRequests] = useLocalStorage('prayer-requests', []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRequest = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: 'pending',
      answered: false
    };

    setPrayerRequests(prev => [newRequest, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      contact: '',
      title: '',
      details: '',
      isPublic: true,
      isAnonymous: false
    });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className={styles.prayerForm}>
      {showSuccess && (
        <div className={styles.successMessage}>
          <div className={styles.successContent}>
            <h3>ప్రార్థన అభ్యర్థన సమర్పించబడింది!</h3>
            <p>మీ ప్రార్థన అభ్యర్థన విజయవంతంగా సమర్పించబడింది. దేవుని దయ ఉండుగాక.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              <User size={16} />
              పేరు *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={formData.isAnonymous}
              className={styles.input}
              placeholder="మీ పూర్తి పేరు"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.label}>
              <Mail size={16} />
              సంప్రదింపు (ఐచ్ఛికం)
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={styles.input}
              placeholder="ఫోన్ నంబర్"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            ప్రార్థన శీర్షిక *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="ప్రార్థన శీర్షిక (సంక్షిప్తంగా)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="details" className={styles.label}>
            ప్రార్థన వివరాలు *
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            rows={6}
            className={styles.textarea}
            placeholder="మీ ప్రార్థన వివరాలను ఇక్కడ రాయండి..."
          />
        </div>

        {/* Honeypot field */}
        <div className={styles.honeypot}>
          <label htmlFor="website">
            <Lock size={16} />
            Do not fill this field
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className={styles.honeypotInput}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              ఈ ప్రార్థన అభ్యర్థనను పబ్లిక్‌గా చేయండి (ఇతరులు చూడగలరు)
            </span>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              అనామకంగా సమర్పించండి
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary ${styles.submitButton}`}
        >
          <Send size={16} />
          {isSubmitting ? 'సమర్పిస్తోంది...' : 'ప్రార్థన సమర్పించండి'}
        </button>
      </form>
    </div>
  );
};

export default PrayerForm;
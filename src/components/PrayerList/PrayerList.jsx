import React, { useState } from 'react';
import { Heart, CheckCircle, Clock, User, Eye, EyeOff } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './PrayerList.module.css';

const PrayerList = () => {
  const [prayerRequests, setPrayerRequests] = useLocalStorage('prayer-requests', []);
  const [filter, setFilter] = useState('all');
  const [showPrivate, setShowPrivate] = useState(false);

  const publicPrayers = prayerRequests.filter(prayer => 
    prayer.isPublic || showPrivate
  );

  const filteredPrayers = publicPrayers.filter(prayer => {
    if (filter === 'all') return true;
    if (filter === 'answered') return prayer.answered;
    if (filter === 'pending') return !prayer.answered;
    return true;
  });

  const toggleAnswered = (prayerId) => {
    setPrayerRequests(prev => 
      prev.map(prayer => 
        prayer.id === prayerId 
          ? { ...prayer, answered: !prayer.answered }
          : prayer
      )
    );
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'ఇప్పుడే';
    if (diffInHours < 24) return `${diffInHours} గంటల క్రితం`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'నిన్న';
    return `${diffInDays} రోజుల క్రితం`;
  };

  return (
    <div className={styles.prayerList}>
      <div className={styles.listHeader}>
        <h2 className={styles.title}>ప్రార్థన అభ్యర్థనలు</h2>
        
        <div className={styles.controls}>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              అన్నీ
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
              onClick={() => setFilter('pending')}
            >
              పెండింగ్
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'answered' ? styles.active : ''}`}
              onClick={() => setFilter('answered')}
            >
              సమాధానం లభించింది
            </button>
          </div>

          <button
            className={styles.privateToggle}
            onClick={() => setShowPrivate(!showPrivate)}
          >
            {showPrivate ? <Eye size={16} /> : <EyeOff size={16} />}
            ప్రైవేట్ అభ్యర్థనలు
          </button>
        </div>
      </div>

      {filteredPrayers.length === 0 ? (
        <div className={styles.emptyState}>
          <Heart size={48} className={styles.emptyIcon} />
          <h3>ప్రార్థన అభ్యర్థనలు లేవు</h3>
          <p>మొదటి ప్రార్థన అభ్యర్థనను సమర్పించండి</p>
        </div>
      ) : (
        <div className={styles.prayersGrid}>
          {filteredPrayers.map(prayer => (
            <div 
              key={prayer.id} 
              className={`${styles.prayerCard} ${prayer.answered ? styles.answered : ''}`}
            >
              <div className={styles.prayerHeader}>
                <div className={styles.prayerMeta}>
                  <div className={styles.prayerAuthor}>
                    <User size={16} />
                    {prayer.isAnonymous ? 'అనామక' : prayer.name || 'అనామక'}
                  </div>
                  <div className={styles.prayerDate}>
                    {getTimeAgo(prayer.date)}
                  </div>
                </div>
                
                <div className={styles.prayerStatus}>
                  {prayer.answered ? (
                    <span className={styles.answeredBadge}>
                      <CheckCircle size={16} />
                      సమాధానం లభించింది
                    </span>
                  ) : (
                    <span className={styles.pendingBadge}>
                      <Clock size={16} />
                      పెండింగ్
                    </span>
                  )}
                  
                  {!prayer.isPublic && (
                    <span className={styles.privateBadge}>
                      ప్రైవేట్
                    </span>
                  )}
                </div>
              </div>

              <h3 className={styles.prayerTitle}>{prayer.title}</h3>
              
              <p className={styles.prayerDetails}>{prayer.details}</p>

              {prayer.contact && (
                <div className={styles.prayerContact}>
                  <strong>సంప్రదింపు:</strong> {prayer.contact}
                </div>
              )}

              <div className={styles.prayerActions}>
                <button
                  className={`${styles.actionButton} ${prayer.answered ? styles.answered : ''}`}
                  onClick={() => toggleAnswered(prayer.id)}
                >
                  {prayer.answered ? (
                    <>
                      <CheckCircle size={16} />
                      సమాధానం లభించింది
                    </>
                  ) : (
                    <>
                      <Heart size={16} />
                      ప్రార్థించండి
                    </>
                  )}
                </button>
                
                <span className={styles.prayerCount}>
                  {Math.floor(Math.random() * 50) + 1} మంది ప్రార్థించారు
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerList;
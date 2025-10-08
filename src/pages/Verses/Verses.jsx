import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, RefreshCw } from 'lucide-react';
import VerseCard from '../../components/VerseCard/VerseCard';
import { generateVerses, getDailyVerse } from '../../utils/dailyVerse';
import styles from './Verses.module.css';

const Verses = () => {
  const [verses, setVerses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate 365 days of verses (1 year)
    const generatedVerses = generateVerses(365);
    setVerses(generatedVerses);
    setIsLoading(false);
  }, []);

  const allTags = [...new Set(verses.flatMap(verse => verse.tags))];

  const filteredVerses = verses.filter(verse => {
    const matchesFilter = filter === 'all' || verse.tags.includes(filter);
    const matchesDate = !selectedDate || verse.date === selectedDate;
    return matchesFilter && matchesDate;
  });

  const getUniqueDates = () => {
    return [...new Set(verses.map(verse => verse.date))].sort().reverse();
  };

  const refreshVerses = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newVerses = generateVerses(365);
      setVerses(newVerses);
      setIsLoading(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className={styles.verses}>
        <div className="container">
          <div className={styles.loading}>
            <RefreshCw size={48} className={styles.spinner} />
            <p className="telugu-text">వచనాలు లోడ్ అవుతున్నాయి...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.verses}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageHeader}>
            <h1 className={`${styles.pageTitle} telugu-text`}>వచనాలు</h1>
            <p className={styles.pageDescription}>
              ప్రతిరోజు కొత్త వచనం - ఆధ్యాత్మిక, ప్రేరణాదాయక మరియు ఓదార్పు వచనాలు
            </p>
            
            <button 
              className="btn btn-outline"
              onClick={refreshVerses}
              disabled={isLoading}
            >
              <RefreshCw size={16} />
              వచనాలు రిఫ్రెష్ చేయండి
            </button>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <Filter size={20} />
              <span className="telugu-text">ఫిల్టర్ చేయండి:</span>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">అన్నీ</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <Calendar size={20} />
              <span className="telugu-text">తేదీ:</span>
              <select 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">అన్ని తేదీలు</option>
                {getUniqueDates().map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('te-IN')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.versesInfo}>
            <p className="telugu-text">
              మొత్తం వచనాలు: <strong>{filteredVerses.length}</strong> | 
              ఫిల్టర్: <strong>{filter === 'all' ? 'అన్నీ' : filter}</strong>
              {selectedDate && ` | తేదీ: ${new Date(selectedDate).toLocaleDateString('te-IN')}`}
            </p>
          </div>

          <div className={styles.versesGrid}>
            {filteredVerses.map((verse, index) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={styles.verseItem}
              >
                <div className={styles.verseHeader}>
                  <span className={styles.verseDate}>
                    {new Date(verse.date).toLocaleDateString('te-IN', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={styles.verseRef}>{verse.ref}</span>
                </div>
                
                <VerseCard verse={verse} />
                
                <div className={styles.verseTags}>
                  {verse.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={styles.verseTag}
                      onClick={() => setFilter(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVerses.length === 0 && (
            <div className={styles.emptyState}>
              <h3 className="telugu-text">వచనాలు లేవు</h3>
              <p className="telugu-text">ఎంచుకున్న ఫిల్టర్‌కు వచనాలు కనబడలేదు</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setFilter('all');
                  setSelectedDate('');
                }}
              >
                అన్ని వచనాలు చూడండి
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Verses;
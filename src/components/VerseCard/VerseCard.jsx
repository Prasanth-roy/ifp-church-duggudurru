import React, { useRef } from 'react';
import { Download, Share2 } from 'lucide-react';
import { downloadVerseAsImage, downloadVerseAsPDF } from '../../utils/downloadVerse';
import styles from './VerseCard.module.css';

const VerseCard = ({ verse, showDownload = true }) => {
  const cardRef = useRef(null);

  const handleDownloadImage = () => {
    downloadVerseAsImage(cardRef.current, `verse-${verse.date}`);
  };

  const handleDownloadPDF = () => {
    downloadVerseAsPDF(cardRef.current, `verse-${verse.date}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Verse - ${verse.date}`,
          text: `${verse.telugu_text}\n\n${verse.english_text}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${verse.telugu_text}\n\n${verse.english_text}\n\n- ${verse.ref}`
      );
      alert('Verse copied to clipboard!');
    }
  };

  return (
    <div className={styles.verseCard}>
      <div 
        ref={cardRef}
        className={styles.cardContent}
        style={{
          backgroundImage: `url(${verse.bg_image_url})`,
        }}
      >
        <div className={styles.cardOverlay} />
        <div className={styles.verseContent}>
          <div className={styles.date}>{new Date(verse.date).toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}</div>
          <div className={styles.churchName}>IFP Church, Duggudurru</div>
          <div className={`${styles.teluguText} telugu-text`}>{verse.telugu_text}</div>
          <div className={styles.englishText}>{verse.english_text}</div>
          <div className={styles.reference}>- {verse.ref}</div>
        </div>
      </div>

      {showDownload && (
        <div className={styles.cardActions}>
          <button 
            className="btn btn-primary"
            onClick={handleDownloadImage}
          >
            <Download size={16} />
            ఇమేజ్ డౌన్‌లోడ్
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleDownloadPDF}
          >
            <Download size={16} />
            PDF డౌన్‌లోడ్
          </button>
          <button 
            className="btn btn-outline"
            onClick={handleShare}
          >
            <Share2 size={16} />
            షేర్ చేయండి
          </button>
        </div>
      )}
    </div>
  );
};

export default VerseCard;
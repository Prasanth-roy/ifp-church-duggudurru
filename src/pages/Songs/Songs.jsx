import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download } from 'lucide-react';
import SongsList from '../../components/SongsList/SongsList';
import songsData from '../../data/songs.json';
import styles from './Songs.module.css';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    setSongs(songsData);
  }, []);

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newSongs = JSON.parse(e.target.result);
          setSongs(prev => [...prev, ...newSongs]);
          setShowUploadModal(false);
          alert('పాటలు విజయవంతంగా అప్‌లోడ్ చేయబడ్డాయి!');
        } catch (error) {
          alert('ఫైల్ ఫార్మాట్ తప్పు. దయచేసి సరైన JSON ఫైల్‌ను అప్‌లోడ్ చేయండి.');
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadSampleJSON = () => {
    const sampleData = [{
      "id": Date.now(),
      "title_telugu": "నూతన పాట",
      "title_english": "New Song",
      "artist": "Artist Name",
      "lyrics_telugu": "పాట సాహిత్యం ఇక్కడ...",
      "lyrics_english": "Song lyrics here...",
      "tags": ["New", "Worship"],
      "created_at": new Date().toISOString().split('T')[0]
    }];

    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_songs_template.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.songs}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>పాటలు</h1>
            <p className={styles.pageDescription}>
              100+ తెలుగు ఆరాధన పాటలు - హోసన్న, రాజ్ ప్రకాష్ పాల్, ఆరాధన మరియు ఇతరులు
            </p>
            
            <div className={styles.pageActions}>
              <button 
                className="btn btn-primary"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={16} />
                పాటలు అప్‌లోడ్ చేయండి
              </button>
              
              <button 
                className="btn btn-outline"
                onClick={downloadSampleJSON}
              >
                <Download size={16} />
                సాంపిల్ టెంప్లేట్
              </button>
            </div>
          </div>

          <SongsList songs={songs} />
        </motion.div>
      </div>

      {showUploadModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>పాటలు అప్‌లోడ్ చేయండి</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.uploadInstructions}>
                <h3>సూచనలు:</h3>
                <ul>
                  <li>JSON ఫార్మాట్‌లో ఫైల్‌ను అప్‌లోడ్ చేయండి</li>
                  <li>ఫైల్‌లో ప్రతి పాటకు ఈ ఫీల్డ్‌లు ఉండాలి: title_telugu, artist, lyrics_telugu, tags</li>
                  <li>సాంపిల్ టెంప్లేట్‌ను డౌన్‌లోడ్ చేసి ఉపయోగించండి</li>
                </ul>
              </div>
              
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  id="bulkUpload"
                  accept=".json"
                  onChange={handleBulkUpload}
                  className={styles.fileInput}
                />
                <label htmlFor="bulkUpload" className={styles.uploadLabel}>
                  <Upload size={32} />
                  <span>JSON ఫైల్‌ను ఎంచుకోండి</span>
                  <small>లేదా ఫైల్‌ను ఇక్కడ డ్రాగ్ చేయండి</small>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;
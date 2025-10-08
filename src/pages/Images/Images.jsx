import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera } from 'lucide-react';
import Gallery from '../../components/Gallery/Gallery';
import styles from './Images.module.css';

const Images = () => {
  const [images, setImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    // Mock images data
    const mockImages = [
      {
        id: 1,
        url: "/images/church-gallery-1.jpg",
        caption: "సండే ఆరాదన ",
        date: "2024-01-15",
        category: "worship"
      },
      {
        id: 2,
        url: "/images/church-gallery-2.jpg",
        caption: "యూత్  సమావేశం",
        date: "2024-01-20",
        category: "youth"
      },
      {
        id: 3,
        url: "/images/church-gallery-3.jpg",
        caption: "చర్చి భవనం",
        date: "2024-01-25",
        category: "building"
      },
      {
        id: 4,
        url: "/images/church-gallery-4.jpg",
        caption: "కోయిర్ గానం",
        date: "2024-02-01",
        category: "choir"
      },
      {
        id: 5,
        url: "/images/church-gallery-5.jpg",
        caption: "గ్రూప్ ప్రార్థన",
        date: "2024-02-05",
        category: "prayer"
      },
      {
        id: 6,
        url: "/images/church-gallery-6.jpg",
        caption: "ప్రార్దన సందర్బం ",
        date: "2024-02-10",
        category: "festival"
      }
    ];
    setImages(mockImages);
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        caption: file.name.split('.')[0],
        date: new Date().toISOString().split('T')[0],
        category: "new"
      }));
      
      setImages(prev => [...prev, ...newImages]);
      setShowUploadModal(false);
      alert('చిత్రాలు విజయవంతంగా అప్‌లోడ్ చేయబడ్డాయి!');
    }
  };

  return (
    <div className={styles.images}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageHeader}>
            <div className={styles.headerContent}>
              <div className={styles.titleSection}>
                <h1 className={styles.pageTitle}>చిత్రాలు</h1>
                <p className={styles.pageDescription}>
                  IFP Church, Duggudurru కార్యక్రమాలు మరియు ప్రార్దనల  ఫోటోల గ్యాలరీ
                </p>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={16} />
                చిత్రాలు అప్‌లోడ్ చేయండి
              </button>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <Camera size={24} />
                <div>
                  <span className={styles.statNumber}>{images.length}</span>
                  <span className={styles.statLabel}>మొత్తం చిత్రాలు</span>
                </div>
              </div>
              
              <div className={styles.statItem}>
                <Camera size={24} />
                <div>
                  <span className={styles.statNumber}>
                    {new Set(images.map(img => img.category)).size}
                  </span>
                  <span className={styles.statLabel}>విభాగాలు</span>
                </div>
              </div>
            </div>
          </div>

          <Gallery images={images} />
        </motion.div>
      </div>

      {showUploadModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>చిత్రాలు అప్‌లోడ్ చేయండి</h2>
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
                  <li>JPG, PNG లేదా WEBP ఫార్మాట్‌లో ఫోటోలను అప్‌లోడ్ చేయండి</li>
                  <li>ప్రతి ఫైల్ సైజు 5MB కంటే తక్కువ ఉండాలి</li>
                  <li>ఒకసారికి అనేక ఫోటోలను అప్‌లోడ్ చేయవచ్చు</li>
                </ul>
              </div>
              
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <label htmlFor="imageUpload" className={styles.uploadLabel}>
                  <Upload size={48} />
                  <span>చిత్రాలను ఎంచుకోండి</span>
                  <small>లేదా ఫైల్‌లను ఇక్కడ డ్రాగ్ చేయండి</small>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
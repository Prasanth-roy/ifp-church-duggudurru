import React, { useState } from 'react';
import { Download, X, ZoomIn } from 'lucide-react';
import styles from './Gallery.module.css';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(images.map(img => img.category))];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const downloadImage = (imageUrl, imageName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    link.click();
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryFilters}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'అన్నీ' : category}
          </button>
        ))}
      </div>

      <div className={styles.masonryGrid}>
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className={styles.galleryItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={image.url}
              alt={image.caption}
              loading="lazy"
              className={styles.galleryImage}
              onClick={() => setSelectedImage(image)}
            />
            
            <div className={styles.imageOverlay}>
              <button
                className={styles.zoomButton}
                onClick={() => setSelectedImage(image)}
              >
                <ZoomIn size={20} />
              </button>
              
              <button
                className={styles.downloadButton}
                onClick={() => downloadImage(image.url, image.caption)}
              >
                <Download size={16} />
              </button>
            </div>
            
            <div className={styles.imageInfo}>
              <p className={styles.imageCaption}>{image.caption}</p>
              <span className={styles.imageDate}>{image.date}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.lightbox}>
          <button
            className={styles.lightboxClose}
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          
          <div className={styles.lightboxContent}>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className={styles.lightboxImage}
            />
            
            <div className={styles.lightboxInfo}>
              <h3>{selectedImage.caption}</h3>
              <p>{selectedImage.date}</p>
              <button
                className="btn btn-primary"
                onClick={() => downloadImage(selectedImage.url, selectedImage.caption)}
              >
                <Download size={16} />
                డౌన్‌లోడ్ చేయండి
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
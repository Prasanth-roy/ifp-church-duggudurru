import React, { useState, useMemo } from 'react';
import { Search, Heart, Play, Music } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './SongsList.module.css';

const SongsList = ({ songs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSong, setSelectedSong] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorite-songs', []);
  const songsPerPage = 10;

  const allTags = useMemo(() => {
    const tags = new Set();
    songs.forEach(song => song.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [songs]);

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = song.title_telugu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          song.title_english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          song.artist.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => song.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [songs, searchTerm, selectedTags]);

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const currentSongs = filteredSongs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const toggleFavorite = (songId) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  return (
    <div className={styles.songsList}>
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={20} />
          <input
            type="text"
            placeholder="పాటలు, కళాకారులు, ట్యాగ్‌ల వెతకండి..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.tagFilters}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`${styles.tag} ${selectedTags.includes(tag) ? styles.active : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.songsGrid}>
        {currentSongs.map(song => (
          <div key={song.id} className={styles.songCard}>
            <div className={styles.songHeader}>
              <Music size={24} className={styles.songIcon} />
              <button
                className={styles.favoriteButton}
                onClick={() => toggleFavorite(song.id)}
              >
                <Heart 
                  size={20} 
                  fill={favorites.includes(song.id) ? 'currentColor' : 'none'}
                  color={favorites.includes(song.id) ? '#ef4444' : 'currentColor'}
                />
              </button>
            </div>
            
            <h3 className={styles.songTitle}>
              <span className="telugu-text">{song.title_telugu}</span>
              {song.title_english && (
                <span className={styles.englishTitle}>({song.title_english})</span>
              )}
            </h3>
            
            <p className={styles.songArtist}>{song.artist}</p>
            
            <div className={styles.songTags}>
              {song.tags.map(tag => (
                <span key={tag} className={styles.songTag}>{tag}</span>
              ))}
            </div>
            
            <p className={styles.songPreview}>
              {song.lyrics_telugu.split('\n')[0].substring(0, 100)}...
            </p>
            
            <div className={styles.songActions}>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedSong(song)}
              >
                <Play size={16} />
                పూర్తి పాట చూడండి
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={styles.pageButton}
          >
            మునుపటి
          </button>
          
          <span className={styles.pageInfo}>
            పేజీ {currentPage} / {totalPages}
          </span>
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={styles.pageButton}
          >
            తరువాత
          </button>
        </div>
      )}

      {selectedSong && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className="telugu-text">{selectedSong.title_telugu}</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedSong(null)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <p className={styles.songMeta}>
                <strong>కళాకారి:</strong> {selectedSong.artist}
              </p>
              
              <div className={styles.lyrics}>
                <h4>పాట సాహిత్యం:</h4>
                <pre className={`${styles.lyricsText} telugu-text`}>
                  {selectedSong.lyrics_telugu}
                </pre>
                
                {selectedSong.lyrics_english && (
                  <>
                    <h4>English Lyrics:</h4>
                    <pre className={styles.lyricsText}>
                      {selectedSong.lyrics_english}
                    </pre>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongsList;
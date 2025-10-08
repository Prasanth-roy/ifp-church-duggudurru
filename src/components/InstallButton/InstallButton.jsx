import React from 'react';
import { Download } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import styles from './InstallButton.module.css';

const InstallButton = () => {
  const { canInstall, installApp, isInstalled } = usePWA();

  if (isInstalled || !canInstall) return null;

  return (
    <button 
      className={styles.installButton}
      onClick={installApp}
    >
      <Download size={20} />
      <span className="telugu-text">అనుసంధానించండి</span>
    </button>
  );
};

export default InstallButton;
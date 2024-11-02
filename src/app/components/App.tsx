import React, { useState, useEffect } from 'react';
import '../styles/ui.css';
import catSvg from '../../images/cat.svg';

// Add this new component above the App function
const Stars: React.FC = () => {
  // Create stars on component mount
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    // Create 50 stars with random positions and animations
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Random star properties
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;

      // Apply styles
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        --duration: ${duration}s;
      `;

      starsContainer.appendChild(star);
    }
  }, []);

  return <div className="stars" />;
};

function App() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Copy to cursor');

  const onCopyToCursor = () => {
    parent.postMessage({ pluginMessage: { type: 'copy-to-clipboard' } }, '*');
  };

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Data copied to clipboard');
      setButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy data: ', err);
      setButtonText('Copy failed');
    }
    document.body.removeChild(textArea);
    setTimeout(() => setButtonText('Copy to cursor'), 2000);
  };

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, name, data } = event.data.pluginMessage;
      if (type === 'selection-change') {
        setSelectedName(name);
      } else if (type === 'clipboard-data') {
        if (data) {
          copyToClipboard(data);
        } else {
          console.error('No data to copy');
          setButtonText('No data');
          setTimeout(() => setButtonText('Copy to cursor'), 2000);
        }
      }
    };
  }, []);

  return (
    <>
      <Stars />
      <div className="app">
        {selectedName ? (
          <div className="selected-element">
            <h3 className="subtitle">Selected Element</h3>
            <div className="element-name">{selectedName}</div>
            <button className="copy-button" onClick={onCopyToCursor}>
              {buttonText}
            </button>
          </div>
        ) : (
          <div className="frame-preview">
            <div className="frame-content">
              <img
                src={catSvg}
                alt="Cat illustration"
                style={{ width: '59px', height: '68.5px', marginBottom: '16px' }}
              />
              <p>Select a frame or group to start</p>
              <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>
                Made with ☕️ by{' '}
                <a
                  href="https://designwithprompts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ash
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

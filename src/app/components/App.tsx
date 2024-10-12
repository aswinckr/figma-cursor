import React, { useState, useEffect } from 'react';
import '../styles/ui.css';

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
    <div>
      {selectedName && (
        <div>
          <h3>Selected Element: {selectedName}</h3>
          <button onClick={onCopyToCursor}>{buttonText}</button>
        </div>
      )}
    </div>
  );
}

export default App;

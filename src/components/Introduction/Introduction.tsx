import React from 'react';
import Zoom from '@material-ui/core/Zoom';

export default function Introduction() {
  return (
    <Zoom in={true}>
      <div style={{
        margin: '16px auto',
        padding: '16px',
        maxWidth: '512px'
      }}>
        <h2 style={{
          textAlign: 'center',
          maxWidth: '400px',
          margin: 'auto'
        }}>Welcome to the eSign Genie Identity Wizard</h2>
        <ul style={{
          textIndent: '32px'
        }}>
          <li>You'll be asked a series of single-choice questions to establish your identity for electronically signing documents.</li>
          <li>You can not return to previous steps.</li>
          <li>You can cancel this process by closing the window/tab.</li>
        </ul>
      </div>
    </Zoom>
  );
}
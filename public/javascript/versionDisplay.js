import { VERSION } from './version.js';

export function displayVersion() {
  const versionString = VERSION.isBeta 
    ? `Running Beta ${VERSION.number}`
    : `Running v${VERSION.number}`;

  const versionElement = document.createElement('div');
  versionElement.textContent = versionString;
  versionElement.style.position = 'fixed';
  versionElement.style.bottom = '10px';
  versionElement.style.right = '10px';
  versionElement.style.color = '#f0f0f0';
  versionElement.style.fontFamily = 'Pixelify Sans, sans-serif';
  versionElement.style.fontSize = '0.75vw';
  document.body.appendChild(versionElement);
}
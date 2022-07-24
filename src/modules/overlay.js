const overlay = document.createElement('div');
// overlay.className = 'overlay';

overlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 333;
`;

export const showOverlay = () => {
  document.body.append(overlay);
};

export const hideOverlay = () => {
  overlay.remove();
};
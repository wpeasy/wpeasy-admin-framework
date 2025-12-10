// Theme state: 'light' | 'dark' | 'system'
export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'wpea-theme-mode';
const BROADCAST_CHANNEL = 'wpea-theme';

let themeMode = $state<ThemeMode>('system');
let broadcastChannel: BroadcastChannel | null = null;

export const theme = {
  get mode() { return themeMode; },
};

export function cycleTheme() {
  const modes: ThemeMode[] = ['light', 'dark', 'system'];
  const currentIndex = modes.indexOf(themeMode);
  const newMode = modes[(currentIndex + 1) % modes.length];
  setTheme(newMode);
}

export function setTheme(mode: ThemeMode) {
  themeMode = mode;
  applyTheme();
  persistTheme();
  broadcastTheme();
}

function applyTheme() {
  if (typeof document === 'undefined') return;

  switch (themeMode) {
    case 'light':
      document.body.style.setProperty('color-scheme', 'light only');
      break;
    case 'dark':
      document.body.style.setProperty('color-scheme', 'dark only');
      break;
    case 'system':
      document.body.style.setProperty('color-scheme', 'light dark');
      break;
  }
}

function persistTheme() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, themeMode);
}

function loadTheme(): ThemeMode {
  if (typeof localStorage === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
}

function broadcastTheme() {
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'theme-change', mode: themeMode });
  }
}

function setupBroadcastListener() {
  if (typeof BroadcastChannel === 'undefined') return;

  broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL);
  broadcastChannel.onmessage = (event) => {
    if (event.data?.type === 'theme-change' && event.data?.mode) {
      const newMode = event.data.mode as ThemeMode;
      if (newMode !== themeMode) {
        themeMode = newMode;
        applyTheme();
      }
    }
  };
}

// Also listen for storage events (for cross-tab sync in same window)
function setupStorageListener() {
  if (typeof window === 'undefined') return;

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      const newMode = event.newValue as ThemeMode;
      if (newMode !== themeMode) {
        themeMode = newMode;
        applyTheme();
      }
    }
  });
}

// Initialize on load
export function initTheme() {
  themeMode = loadTheme();
  applyTheme();
  setupBroadcastListener();
  setupStorageListener();
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  initTheme();
}

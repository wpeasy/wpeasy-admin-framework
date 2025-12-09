// Global UI state for modals and other UI elements

export interface UIState {
  settingsModalOpen: boolean;
}

const STORAGE_KEY = 'wpea-spa-ui';

function loadFromStorage(): UIState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load UI state from localStorage:', e);
  }
  return null;
}

function saveToStorage(state: UIState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save UI state to localStorage:', e);
  }
}

const defaults: UIState = {
  settingsModalOpen: false
};

const stored = loadFromStorage();
export const uiState = $state<UIState>(stored ?? { ...defaults });

export function openSettingsModal() {
  uiState.settingsModalOpen = true;
}

export function closeSettingsModal() {
  uiState.settingsModalOpen = false;
}

export function toggleSettingsModal() {
  uiState.settingsModalOpen = !uiState.settingsModalOpen;
}

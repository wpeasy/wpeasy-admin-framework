// Global UI state for modals and other UI elements

export interface UIState {
  settingsModalOpen: boolean;
  previewMode: boolean;
  showActionPopovers: boolean;
  showContainerWidths: boolean;
}

// Only persist user preferences, not transient UI state like modals
interface PersistedUIState {
  showActionPopovers: boolean;
  showContainerWidths: boolean;
}

const STORAGE_KEY = 'wpea-spa-ui';

function loadFromStorage(): PersistedUIState | null {
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

function saveToStorage(state: PersistedUIState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save UI state to localStorage:', e);
  }
}

const defaults: UIState = {
  settingsModalOpen: false,
  previewMode: false,
  showActionPopovers: true,
  showContainerWidths: false
};

const stored = loadFromStorage();
export const uiState = $state<UIState>({
  ...defaults,
  // Only apply persisted preferences
  showActionPopovers: stored?.showActionPopovers ?? defaults.showActionPopovers,
  showContainerWidths: stored?.showContainerWidths ?? defaults.showContainerWidths
});

export function openSettingsModal() {
  uiState.settingsModalOpen = true;
}

export function closeSettingsModal() {
  uiState.settingsModalOpen = false;
}

export function toggleSettingsModal() {
  uiState.settingsModalOpen = !uiState.settingsModalOpen;
}

export function enterPreviewMode() {
  uiState.previewMode = true;
}

export function exitPreviewMode() {
  uiState.previewMode = false;
}

export function togglePreviewMode() {
  uiState.previewMode = !uiState.previewMode;
}

function getPersistedState(): PersistedUIState {
  return {
    showActionPopovers: uiState.showActionPopovers,
    showContainerWidths: uiState.showContainerWidths
  };
}

export function setShowActionPopovers(show: boolean) {
  uiState.showActionPopovers = show;
  saveToStorage(getPersistedState());
}

export function setShowContainerWidths(show: boolean) {
  uiState.showContainerWidths = show;
  saveToStorage(getPersistedState());
}

// Global layout state for SPA panels
// All panel sizes and visibility are managed here

export type PanelPosition = 'left' | 'right' | 'top' | 'bottom';

// Icon size scale
export const iconSizes = {
  xs: 12,
  s: 16,
  m: 20,
  l: 24,
} as const;

export type IconSize = keyof typeof iconSizes;

// Shortcut alignment types
export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';

export interface LayoutState {
  // Panel widths/heights (in pixels)
  topPanelHeight: number;
  bottomPanelHeight: number;
  leftPanelWidth: number;
  rightPanelWidth: number;
  bottomLeftWidth: number;
  bottomRightWidth: number;

  // Panel visibility
  topPanelVisible: boolean;
  bottomPanelVisible: boolean;
  leftPanelVisible: boolean;
  rightPanelVisible: boolean;

  // Icon bar visibility
  leftIconBarVisible: boolean;
  rightIconBarVisible: boolean;
  bottomIconBarVisible: boolean;

  // Min/max constraints
  minPanelSize: number;
  maxPanelSize: number;
  iconBarWidth: number;
  topBarHeight: number;

  // Icon sizes (in pixels)
  actionIconSize: number;
  shortcutIconSize: number;

  // Shortcut bar alignment
  leftShortcutAlign: VerticalAlign;
  rightShortcutAlign: VerticalAlign;
  bottomShortcutAlign: HorizontalAlign;

  // Content frame
  contentFrameMargin: number;
  contentFrameWidth: number | null; // null = auto (fill available space)
}

// Default values
const defaults: LayoutState = {
  topPanelHeight: 48,
  bottomPanelHeight: 200,
  leftPanelWidth: 250,
  rightPanelWidth: 250,
  bottomLeftWidth: 250,
  bottomRightWidth: 250,

  topPanelVisible: true,
  bottomPanelVisible: true,
  leftPanelVisible: true,
  rightPanelVisible: true,

  leftIconBarVisible: true,
  rightIconBarVisible: true,
  bottomIconBarVisible: true,

  minPanelSize: 100,
  maxPanelSize: 600,
  iconBarWidth: 48,
  topBarHeight: 48,

  actionIconSize: 32,
  shortcutIconSize: 18,

  leftShortcutAlign: 'top',
  rightShortcutAlign: 'top',
  bottomShortcutAlign: 'center',

  contentFrameMargin: 6,
  contentFrameWidth: null,
};

const STORAGE_KEY = 'wpea-spa-layout';

function loadFromStorage(): LayoutState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load layout state from localStorage:', e);
  }
  return null;
}

function saveToStorage(state: LayoutState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save layout state to localStorage:', e);
  }
}

const stored = loadFromStorage();
export const layout = $state<LayoutState>(stored ?? { ...defaults });

// Resize actions
export function setLeftPanelWidth(width: number) {
  layout.leftPanelWidth = Math.max(layout.minPanelSize, Math.min(layout.maxPanelSize, width));
  saveToStorage(layout);
}

export function setRightPanelWidth(width: number) {
  layout.rightPanelWidth = Math.max(layout.minPanelSize, Math.min(layout.maxPanelSize, width));
  saveToStorage(layout);
}

export function setBottomPanelHeight(height: number) {
  layout.bottomPanelHeight = Math.max(layout.minPanelSize, Math.min(layout.maxPanelSize, height));
  saveToStorage(layout);
}

export function setBottomLeftWidth(width: number) {
  layout.bottomLeftWidth = Math.max(layout.minPanelSize, Math.min(layout.maxPanelSize, width));
  saveToStorage(layout);
}

export function setBottomRightWidth(width: number) {
  layout.bottomRightWidth = Math.max(layout.minPanelSize, Math.min(layout.maxPanelSize, width));
  saveToStorage(layout);
}

export function setTopPanelHeight(height: number) {
  layout.topPanelHeight = Math.max(40, Math.min(200, height));
  saveToStorage(layout);
}

// Toggle visibility
export function toggleLeftPanel() {
  layout.leftPanelVisible = !layout.leftPanelVisible;
  saveToStorage(layout);
}

export function toggleRightPanel() {
  layout.rightPanelVisible = !layout.rightPanelVisible;
  saveToStorage(layout);
}

export function toggleBottomPanel() {
  layout.bottomPanelVisible = !layout.bottomPanelVisible;
  saveToStorage(layout);
}

export function toggleTopPanel() {
  layout.topPanelVisible = !layout.topPanelVisible;
  saveToStorage(layout);
}

// Set panel visibility
export function setLeftPanelVisible(visible: boolean) {
  layout.leftPanelVisible = visible;
  saveToStorage(layout);
}

export function setRightPanelVisible(visible: boolean) {
  layout.rightPanelVisible = visible;
  saveToStorage(layout);
}

export function setBottomPanelVisible(visible: boolean) {
  layout.bottomPanelVisible = visible;
  saveToStorage(layout);
}

// Set icon bar visibility
export function setLeftIconBarVisible(visible: boolean) {
  layout.leftIconBarVisible = visible;
  saveToStorage(layout);
}

export function setRightIconBarVisible(visible: boolean) {
  layout.rightIconBarVisible = visible;
  saveToStorage(layout);
}

export function setBottomIconBarVisible(visible: boolean) {
  layout.bottomIconBarVisible = visible;
  saveToStorage(layout);
}

// Set shortcut alignment
export function setLeftShortcutAlign(align: VerticalAlign) {
  layout.leftShortcutAlign = align;
  saveToStorage(layout);
}

export function setRightShortcutAlign(align: VerticalAlign) {
  layout.rightShortcutAlign = align;
  saveToStorage(layout);
}

export function setBottomShortcutAlign(align: HorizontalAlign) {
  layout.bottomShortcutAlign = align;
  saveToStorage(layout);
}

// Content frame width
export function setContentFrameWidth(width: number | null) {
  layout.contentFrameWidth = width;
  saveToStorage(layout);
}

// Reset to defaults
export function resetLayout() {
  layout.topPanelHeight = defaults.topPanelHeight;
  layout.bottomPanelHeight = defaults.bottomPanelHeight;
  layout.leftPanelWidth = defaults.leftPanelWidth;
  layout.rightPanelWidth = defaults.rightPanelWidth;
  layout.bottomLeftWidth = defaults.bottomLeftWidth;
  layout.bottomRightWidth = defaults.bottomRightWidth;
  layout.topPanelVisible = defaults.topPanelVisible;
  layout.bottomPanelVisible = defaults.bottomPanelVisible;
  layout.leftPanelVisible = defaults.leftPanelVisible;
  layout.rightPanelVisible = defaults.rightPanelVisible;
  layout.leftIconBarVisible = defaults.leftIconBarVisible;
  layout.rightIconBarVisible = defaults.rightIconBarVisible;
  layout.bottomIconBarVisible = defaults.bottomIconBarVisible;
  layout.minPanelSize = defaults.minPanelSize;
  layout.maxPanelSize = defaults.maxPanelSize;
  layout.iconBarWidth = defaults.iconBarWidth;
  layout.topBarHeight = defaults.topBarHeight;
  layout.actionIconSize = defaults.actionIconSize;
  layout.shortcutIconSize = defaults.shortcutIconSize;
  layout.leftShortcutAlign = defaults.leftShortcutAlign;
  layout.rightShortcutAlign = defaults.rightShortcutAlign;
  layout.bottomShortcutAlign = defaults.bottomShortcutAlign;
  layout.contentFrameMargin = defaults.contentFrameMargin;
  layout.contentFrameWidth = defaults.contentFrameWidth;
  saveToStorage(layout);
}

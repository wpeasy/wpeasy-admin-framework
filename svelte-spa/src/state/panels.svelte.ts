// Global panel state for drag/drop between containers

export type ContainerId = 'left' | 'right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface PanelData {
  id: string;
  title: string;
}

export interface FloatingPanel extends PanelData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PanelSizeCache {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

export interface ExtractedPanel {
  id: string;
  title: string;
  sourceContainer: ContainerId | 'floating';
}

export interface PanelsState {
  panels: Record<ContainerId, PanelData[]>;
  floatingPanels: FloatingPanel[];
  extractedPanels: ExtractedPanel[];
  panelSizes: Record<string, PanelSizeCache>;
  draggingPanel: PanelData | null;
  dragSource: ContainerId | 'floating' | null;
  dragOffset: { x: number; y: number } | null;
}

const STORAGE_KEY = 'wpea-spa-panels';

function loadFromStorage(): PanelsState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load panels state from localStorage:', e);
  }
  return null;
}

function saveToStorage(state: PanelsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      panels: state.panels,
      floatingPanels: state.floatingPanels,
      extractedPanels: state.extractedPanels,
      panelSizes: state.panelSizes,
      draggingPanel: null,
      dragSource: null,
      dragOffset: null
    }));
  } catch (e) {
    console.warn('Failed to save panels state to localStorage:', e);
  }
}

const defaults: PanelsState = {
  panels: {
    'left': [{ id: 'demo-panel-left', title: 'Explorer' }],
    'right': [{ id: 'demo-panel-right', title: 'Properties' }],
    'bottom-left': [],
    'bottom-center': [{ id: 'demo-panel-bottom', title: 'Console' }],
    'bottom-right': []
  },
  floatingPanels: [],
  extractedPanels: [],
  panelSizes: {},
  draggingPanel: null,
  dragSource: null,
  dragOffset: null
};

const stored = loadFromStorage();
export const panelsState = $state<PanelsState>(stored ?? { ...defaults });

// Drag actions
export function startDrag(panel: PanelData, source: ContainerId | 'floating', offsetX: number = 0, offsetY: number = 0) {
  panelsState.draggingPanel = panel;
  panelsState.dragSource = source;
  panelsState.dragOffset = { x: offsetX, y: offsetY };
}

export function endDrag() {
  panelsState.draggingPanel = null;
  panelsState.dragSource = null;
  panelsState.dragOffset = null;
}

export function dropPanel(target: ContainerId, insertIndex?: number) {
  if (!panelsState.draggingPanel || !panelsState.dragSource) return;

  const panel = panelsState.draggingPanel;
  const source = panelsState.dragSource;

  // Remove from source
  if (source === 'floating') {
    const floatingIndex = panelsState.floatingPanels.findIndex(p => p.id === panel.id);
    if (floatingIndex !== -1) {
      // Cache the size before removing
      const floatingPanel = panelsState.floatingPanels[floatingIndex];
      panelsState.panelSizes[panel.id] = {
        width: floatingPanel.width,
        height: floatingPanel.height
      };
      panelsState.floatingPanels.splice(floatingIndex, 1);
    }
  } else {
    const sourceIndex = panelsState.panels[source].findIndex(p => p.id === panel.id);
    if (sourceIndex !== -1) {
      panelsState.panels[source].splice(sourceIndex, 1);
    }
  }

  // Calculate insert position
  let targetIndex = insertIndex ?? panelsState.panels[target].length;

  // If moving within same container and removing from before insert point, adjust index
  if (source !== 'floating' && source === target) {
    const sourceIndex = panelsState.panels[source].findIndex(p => p.id === panel.id);
    if (sourceIndex !== -1 && sourceIndex < targetIndex) {
      targetIndex--;
    }
  }

  // Insert at position
  panelsState.panels[target].splice(targetIndex, 0, { id: panel.id, title: panel.title });

  // Save, broadcast, and cleanup
  saveToStorage(panelsState);
  broadcastStateChange();
  endDrag();
}

export function dropPanelAsFloating(x: number, y: number) {
  if (!panelsState.draggingPanel || !panelsState.dragSource) return;

  const panel = panelsState.draggingPanel;
  const source = panelsState.dragSource;

  // Remove from source
  if (source === 'floating') {
    // Just update position
    const floatingPanel = panelsState.floatingPanels.find(p => p.id === panel.id);
    if (floatingPanel) {
      floatingPanel.x = x - (panelsState.dragOffset?.x ?? 0);
      floatingPanel.y = y - (panelsState.dragOffset?.y ?? 0);
    }
  } else {
    // Remove from container
    const sourceIndex = panelsState.panels[source].findIndex(p => p.id === panel.id);
    if (sourceIndex !== -1) {
      panelsState.panels[source].splice(sourceIndex, 1);
    }

    // Get cached size or use defaults
    const cachedSize = panelsState.panelSizes[panel.id];
    const width = cachedSize?.width ?? 300;
    const height = cachedSize?.height ?? 200;

    // Add as floating
    panelsState.floatingPanels.push({
      id: panel.id,
      title: panel.title,
      x: x - (panelsState.dragOffset?.x ?? 0),
      y: y - (panelsState.dragOffset?.y ?? 0),
      width,
      height
    });
  }

  // Save, broadcast, and cleanup
  saveToStorage(panelsState);
  broadcastStateChange();
  endDrag();
}

export function updateFloatingPanelPosition(id: string, x: number, y: number) {
  const panel = panelsState.floatingPanels.find(p => p.id === id);
  if (panel) {
    panel.x = x;
    panel.y = y;
    saveToStorage(panelsState);
    broadcastStateChange();
  }
}

export function updateFloatingPanelSize(id: string, width: number, height: number) {
  const panel = panelsState.floatingPanels.find(p => p.id === id);
  if (panel) {
    panel.width = width;
    panel.height = height;
    saveToStorage(panelsState);
    broadcastStateChange();
  }
}

export function getPanelsForContainer(containerId: ContainerId): PanelData[] {
  return panelsState.panels[containerId] ?? [];
}

// Extract panel to separate window
export function extractPanel(panelId: string, source: ContainerId | 'floating') {
  let panel: PanelData | undefined;

  if (source === 'floating') {
    const floatingIndex = panelsState.floatingPanels.findIndex(p => p.id === panelId);
    if (floatingIndex !== -1) {
      const floatingPanel = panelsState.floatingPanels[floatingIndex];
      panel = { id: floatingPanel.id, title: floatingPanel.title };
      // Cache size and position before removing
      panelsState.panelSizes[panelId] = {
        width: floatingPanel.width,
        height: floatingPanel.height,
        x: floatingPanel.x,
        y: floatingPanel.y
      };
      panelsState.floatingPanels.splice(floatingIndex, 1);
    }
  } else {
    const containerPanels = panelsState.panels[source];
    const panelIndex = containerPanels.findIndex(p => p.id === panelId);
    if (panelIndex !== -1) {
      panel = containerPanels[panelIndex];
      containerPanels.splice(panelIndex, 1);
    }
  }

  if (panel) {
    panelsState.extractedPanels.push({
      id: panel.id,
      title: panel.title,
      sourceContainer: source
    });
    saveToStorage(panelsState);
    broadcastStateChange();
  }

  return panel;
}

// Dock extracted panel back to main window
export function dockPanel(panelId: string, target?: ContainerId) {
  const extractedIndex = panelsState.extractedPanels.findIndex(p => p.id === panelId);
  if (extractedIndex === -1) return;

  const extracted = panelsState.extractedPanels[extractedIndex];
  panelsState.extractedPanels.splice(extractedIndex, 1);

  // If source was floating, restore as floating
  if (extracted.sourceContainer === 'floating') {
    // Restore as floating panel with cached size and position
    const cached = panelsState.panelSizes[panelId];
    panelsState.floatingPanels.push({
      id: extracted.id,
      title: extracted.title,
      x: cached?.x ?? 100,
      y: cached?.y ?? 100,
      width: cached?.width ?? 300,
      height: cached?.height ?? 200
    });
  } else {
    // Return to original container or specified target
    const destination = target ?? extracted.sourceContainer;
    panelsState.panels[destination].push({
      id: extracted.id,
      title: extracted.title
    });
  }

  saveToStorage(panelsState);
  broadcastStateChange();
}

// Check if panel is extracted
export function isPanelExtracted(panelId: string): boolean {
  return panelsState.extractedPanels.some(p => p.id === panelId);
}

// Get extracted panel data
export function getExtractedPanel(panelId: string): ExtractedPanel | undefined {
  return panelsState.extractedPanels.find(p => p.id === panelId);
}

// BroadcastChannel for real-time cross-window communication
const BROADCAST_CHANNEL = 'wpea-spa-panels-sync';
let broadcastChannel: BroadcastChannel | null = null;

function getBroadcastChannel(): BroadcastChannel {
  if (!broadcastChannel) {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL);
  }
  return broadcastChannel;
}

// Broadcast state change to other windows
function broadcastStateChange() {
  try {
    getBroadcastChannel().postMessage({
      type: 'state-update',
      state: {
        panels: panelsState.panels,
        floatingPanels: panelsState.floatingPanels,
        extractedPanels: panelsState.extractedPanels,
        panelSizes: panelsState.panelSizes
      }
    });
  } catch (err) {
    console.warn('Failed to broadcast state change:', err);
  }
}

// Listen for state changes from other windows
export function setupStorageListener() {
  // Listen to BroadcastChannel for real-time updates
  getBroadcastChannel().onmessage = (e) => {
    if (e.data?.type === 'state-update' && e.data?.state) {
      Object.assign(panelsState, {
        ...e.data.state,
        draggingPanel: null,
        dragSource: null,
        dragOffset: null
      });
    }
  };

  // Also listen to storage events as fallback
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const newState = JSON.parse(e.newValue);
        Object.assign(panelsState, {
          ...newState,
          draggingPanel: null,
          dragSource: null,
          dragOffset: null
        });
      } catch (err) {
        console.warn('Failed to parse storage update:', err);
      }
    }
  });
}

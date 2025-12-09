<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getExtractedPanel,
    dockPanel,
    setupStorageListener
  } from './state/panels.svelte';

  // Get panel ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const panelId = urlParams.get('panel') ?? '';

  let panel = $derived(getExtractedPanel(panelId));
  let isDocking = $state(false);

  onMount(() => {
    // Set up listener for storage changes from main window
    setupStorageListener();

    // Handle window close - dock panel back
    // Use both beforeunload and pagehide for better browser coverage
    const handleClose = () => {
      // Only dock if not already docking (prevents double-dock)
      if (!isDocking && getExtractedPanel(panelId)) {
        isDocking = true;
        dockPanel(panelId);
      }
    };

    window.addEventListener('beforeunload', handleClose);
    window.addEventListener('pagehide', handleClose);

    return () => {
      window.removeEventListener('beforeunload', handleClose);
      window.removeEventListener('pagehide', handleClose);
    };
  });

  function handleDock() {
    isDocking = true;
    dockPanel(panelId);
    // Small delay to ensure broadcast message is sent before window closes
    setTimeout(() => {
      window.close();
    }, 50);
  }
</script>

<div class="wpea wpea-full popout-container">
  {#if panel}
    <div class="popout-header">
      <span class="popout-title">{panel.title}</span>
      <button class="popout-dock-btn" onclick={handleDock} title="Dock back to main window">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      </button>
    </div>
    <div class="popout-body">
      <p>Panel content for: {panel.title}</p>
      <p>This panel is now in its own window and can be moved to another screen.</p>
      <p>Close this window or click the dock button to return the panel to the main window.</p>
    </div>
    <div class="popout-footer">
      <span class="popout-footer-text">Panel ID: {panel.id}</span>
    </div>
  {:else}
    <div class="popout-error">
      <p>Panel not found or already docked.</p>
      <button onclick={() => window.close()}>Close Window</button>
    </div>
  {/if}
</div>

<style>
  .popout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--wpea-surface--bg);
  }

  .popout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    background: var(--wpea-surface--elev-1);
    border-bottom: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
    -webkit-app-region: drag;
  }

  .popout-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--wpea-surface--text);
  }

  .popout-dock-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    -webkit-app-region: no-drag;
    transition: background-color 0.15s, color 0.15s;
  }

  .popout-dock-btn:hover {
    background: var(--wpea-surface--border);
    color: var(--wpea-surface--text);
  }

  .popout-body {
    flex: 1;
    overflow: auto;
    padding: 8px;
    font-size: 12px;
    color: var(--wpea-surface--text);
  }

  .popout-footer {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    background: var(--wpea-surface--elev-1);
    border-top: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
  }

  .popout-footer-text {
    font-size: 10px;
    color: var(--wpea-surface--text-muted);
  }

  .popout-error {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wpea-space--sm);
    color: var(--wpea-surface--text-muted);
  }

  .popout-error button {
    padding: var(--wpea-space--xs) var(--wpea-space--md);
    border: 1px solid var(--wpea-surface--border);
    border-radius: var(--wpea-radius--sm);
    background: var(--wpea-surface--bg);
    color: var(--wpea-surface--text);
    cursor: pointer;
  }
</style>

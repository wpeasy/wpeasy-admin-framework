<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from './lib/TopBar.svelte';
  import LeftSidebar from './lib/LeftSidebar.svelte';
  import RightSidebar from './lib/RightSidebar.svelte';
  import BottomBar from './lib/BottomBar.svelte';
  import ContentFrame from './lib/ContentFrame.svelte';
  import FloatingPanel from './lib/FloatingPanel.svelte';
  import SettingsModal from './lib/SettingsModal.svelte';
  import { layout } from './state/layout.svelte';
  import { panelsState, dropPanelAsFloating, setupStorageListener } from './state/panels.svelte';
  import { uiState, exitPreviewMode } from './state/ui.svelte';
  import { ExitPreviewIcon } from './lib/icons';

  onMount(() => {
    // Listen for panel state changes from popout windows
    setupStorageListener();
  });

  function handleDragOver(e: DragEvent) {
    if (panelsState.draggingPanel) {
      e.preventDefault();
    }
  }

  function handleDrop(e: DragEvent) {
    if (panelsState.draggingPanel) {
      e.preventDefault();
      dropPanelAsFloating(e.clientX, e.clientY);
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="wpea wpea-full spa-layout"
  class:preview-mode={uiState.previewMode}
  ondragover={handleDragOver}
  ondrop={handleDrop}
>
  {#if !uiState.previewMode}
    <!-- Top Application Bar -->
    {#if layout.topPanelVisible}
      <TopBar />
    {/if}
  {/if}

  <!-- Main content area (sidebars + center) -->
  <div class="spa-main">
    {#if !uiState.previewMode}
      <!-- Left Sidebar -->
      {#if layout.leftPanelVisible || layout.leftIconBarVisible}
        <LeftSidebar />
      {/if}
    {/if}

    <!-- Center Content -->
    <ContentFrame />

    {#if !uiState.previewMode}
      <!-- Right Sidebar -->
      {#if layout.rightPanelVisible || layout.rightIconBarVisible}
        <RightSidebar />
      {/if}
    {/if}
  </div>

  {#if !uiState.previewMode}
    <!-- Bottom Bar -->
    {#if layout.bottomPanelVisible || layout.bottomIconBarVisible}
      <BottomBar />
    {/if}

    <!-- Floating Panels -->
    {#each panelsState.floatingPanels as panel (panel.id)}
      <FloatingPanel {panel} />
    {/each}

    <!-- Settings Modal -->
    {#if uiState.settingsModalOpen}
      <SettingsModal />
    {/if}
  {/if}

  <!-- Preview Mode Exit Button -->
  {#if uiState.previewMode}
    <button class="preview-exit-btn" onclick={exitPreviewMode} title="Exit Preview">
      <ExitPreviewIcon size={24} />
    </button>
  {/if}
</div>

<style>
  .spa-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .spa-layout.preview-mode {
    background: var(--wpea-surface--bg);
  }

  .spa-main {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .preview-exit-btn {
    position: fixed;
    top: var(--wpea-space--sm);
    right: var(--wpea-space--sm);
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: var(--wpea-surface--panel);
    color: var(--wpea-surface--text);
    cursor: pointer;
    box-shadow: var(--wpea-shadow--lg);
    transition: background-color 0.15s, color 0.15s;
  }

  .preview-exit-btn:hover {
    background: var(--wpea-surface--elev-1);
    color: var(--wpea-color--secondary);
  }
</style>

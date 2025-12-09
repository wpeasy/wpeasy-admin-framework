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
  import { uiState } from './state/ui.svelte';

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
  ondragover={handleDragOver}
  ondrop={handleDrop}
>
  <!-- Top Application Bar -->
  {#if layout.topPanelVisible}
    <TopBar />
  {/if}

  <!-- Main content area (sidebars + center) -->
  <div class="spa-main">
    <!-- Left Sidebar -->
    {#if layout.leftPanelVisible || layout.leftIconBarVisible}
      <LeftSidebar />
    {/if}

    <!-- Center Content -->
    <ContentFrame />

    <!-- Right Sidebar -->
    {#if layout.rightPanelVisible || layout.rightIconBarVisible}
      <RightSidebar />
    {/if}
  </div>

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
</div>

<style>
  .spa-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .spa-main {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
</style>

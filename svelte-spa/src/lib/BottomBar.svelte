<script lang="ts">
  import { layout } from '../state/layout.svelte';
  import { getPanelsForContainer } from '../state/panels.svelte';
  import IconBar from './IconBar.svelte';
  import Panel from './Panel.svelte';
  import PanelDropZone from './PanelDropZone.svelte';
  import ResizeHandle from './ResizeHandle.svelte';

  let bottomLeftPanels = $derived(getPanelsForContainer('bottom-left'));
  let bottomCenterPanels = $derived(getPanelsForContainer('bottom-center'));
  let bottomRightPanels = $derived(getPanelsForContainer('bottom-right'));
</script>

<div class="bottom-bar">
  <!-- Wider Panels Container with Left/Center/Right sections -->
  {#if layout.bottomPanelVisible}
    <div class="bottom-panel" style="height: {layout.bottomPanelHeight}px;">
      <ResizeHandle position="top" target="bottom" />

      <div class="bottom-panel-content">
        <div class="bottom-section bottom-left" style="width: {layout.bottomLeftWidth}px;">
          <PanelDropZone containerId="bottom-left">
            {#each bottomLeftPanels as panel (panel.id)}
              <Panel id={panel.id} title={panel.title} containerId="bottom-left" />
            {/each}
          </PanelDropZone>
          <ResizeHandle position="right" target="bottom-left" variant="secondary" />
        </div>

        <div class="bottom-section bottom-center">
          <PanelDropZone containerId="bottom-center">
            {#each bottomCenterPanels as panel (panel.id)}
              <Panel id={panel.id} title={panel.title} containerId="bottom-center" />
            {/each}
          </PanelDropZone>
        </div>

        <div class="bottom-section bottom-right" style="width: {layout.bottomRightWidth}px;">
          <ResizeHandle position="left" target="bottom-right" variant="secondary" />
          <PanelDropZone containerId="bottom-right">
            {#each bottomRightPanels as panel (panel.id)}
              <Panel id={panel.id} title={panel.title} containerId="bottom-right" />
            {/each}
          </PanelDropZone>
        </div>
      </div>
    </div>
  {/if}

  <!-- Far bottom: Icon Shortcuts bar -->
  {#if layout.bottomIconBarVisible}
    <IconBar position="bottom" />
  {/if}
</div>

<style>
  .bottom-bar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-top: 1px solid var(--wpea-surface--border);
  }

  .bottom-panel {
    position: relative;
    background: var(--wpea-surface--panel);
    min-height: 100px;
    max-height: 600px;
  }

  .bottom-panel-content {
    display: flex;
    height: 100%;
  }

  .bottom-section {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .bottom-left {
    flex-shrink: 0;
    min-width: 100px;
    max-width: 600px;
    border-right: 1px solid var(--wpea-surface--divider);
  }

  .bottom-center {
    flex: 1;
    min-width: 100px;
  }

  .bottom-right {
    flex-shrink: 0;
    min-width: 100px;
    max-width: 600px;
    border-left: 1px solid var(--wpea-surface--divider);
  }
</style>

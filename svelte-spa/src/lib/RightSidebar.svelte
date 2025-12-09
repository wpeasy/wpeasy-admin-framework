<script lang="ts">
  import { layout } from '../state/layout.svelte';
  import { getPanelsForContainer } from '../state/panels.svelte';
  import IconBar from './IconBar.svelte';
  import Panel from './Panel.svelte';
  import PanelDropZone from './PanelDropZone.svelte';
  import ResizeHandle from './ResizeHandle.svelte';

  let panels = $derived(getPanelsForContainer('right'));
</script>

<div class="right-sidebar">
  <!-- Wider Panels Container -->
  {#if layout.rightPanelVisible}
    <div class="right-panel" style="width: {layout.rightPanelWidth}px;">
      <ResizeHandle position="left" target="right" />
      <PanelDropZone containerId="right">
        {#each panels as panel (panel.id)}
          <Panel id={panel.id} title={panel.title} containerId="right" />
        {/each}
      </PanelDropZone>
    </div>
  {/if}

  <!-- Far right: Icon Shortcuts bar -->
  {#if layout.rightIconBarVisible}
    <IconBar position="right" />
  {/if}
</div>

<style>
  .right-sidebar {
    display: flex;
    flex-shrink: 0;
    height: 100%;
    border-left: 1px solid var(--wpea-surface--border);
  }

  .right-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--wpea-surface--panel);
    min-width: 100px;
    max-width: 600px;
    overflow: hidden;
  }
</style>

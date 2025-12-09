<script lang="ts">
  import { layout } from '../state/layout.svelte';
  import { getPanelsForContainer } from '../state/panels.svelte';
  import IconBar from './IconBar.svelte';
  import Panel from './Panel.svelte';
  import PanelDropZone from './PanelDropZone.svelte';
  import ResizeHandle from './ResizeHandle.svelte';

  let panels = $derived(getPanelsForContainer('left'));
</script>

<div class="left-sidebar">
  <!-- Far left: Icon Shortcuts bar -->
  {#if layout.leftIconBarVisible}
    <IconBar position="left" />
  {/if}

  <!-- Wider Panels Container -->
  {#if layout.leftPanelVisible}
    <div class="left-panel" style="width: {layout.leftPanelWidth}px;">
      <PanelDropZone containerId="left">
        {#each panels as panel (panel.id)}
          <Panel id={panel.id} title={panel.title} containerId="left" />
        {/each}
      </PanelDropZone>
      <ResizeHandle position="right" target="left" />
    </div>
  {/if}
</div>

<style>
  .left-sidebar {
    display: flex;
    flex-shrink: 0;
    height: 100%;
    border-right: 1px solid var(--wpea-surface--border);
  }

  .left-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--wpea-surface--panel);
    min-width: 100px;
    max-width: 600px;
    overflow: hidden;
  }
</style>

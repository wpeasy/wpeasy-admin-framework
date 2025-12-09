<script lang="ts">
  import type { Snippet } from 'svelte';
  import { startDrag, endDrag, extractPanel, type ContainerId, type PanelData } from '../state/panels.svelte';

  type Props = {
    id?: string;
    title?: string;
    containerId?: ContainerId;
    header?: Snippet;
    children?: Snippet;
    footer?: Snippet;
  };

  let { id = 'panel', title = 'Panel', containerId, header, children, footer }: Props = $props();

  let isDragging = $state(false);
  let panelEl: HTMLDivElement;

  function handleDragStart(e: DragEvent) {
    if (!containerId) return;
    isDragging = true;
    const rect = panelEl.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const panelData: PanelData = { id, title };
    startDrag(panelData, containerId, offsetX, offsetY);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.setDragImage(panelEl, offsetX, offsetY);
    }
  }

  function handleDragEnd() {
    isDragging = false;
    endDrag();
  }

  function handleExtract(e: MouseEvent) {
    e.stopPropagation();
    if (!containerId) return;

    // Extract the panel from state
    extractPanel(id, containerId);

    // Open popout window
    const width = 400;
    const height = 300;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `/popout.html?panel=${encodeURIComponent(id)}`,
      `panel-${id}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  }
</script>

<div class="panel" class:dragging={isDragging} bind:this={panelEl}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="panel-header"
    draggable="true"
    ondragstart={handleDragStart}
    ondragend={handleDragEnd}
  >
    {#if header}
      {@render header()}
    {:else}
      <span class="panel-title">{title}</span>
    {/if}
    <button class="panel-extract-btn" onclick={handleExtract} title="Open in new window">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </button>
  </div>

  <div class="panel-body">
    {#if children}
      {@render children()}
    {:else}
      <p>This is a sample panel with default content.</p>
      <p>Replace this by passing children to the Panel component.</p>
    {/if}
  </div>

  <div class="panel-footer">
    {#if footer}
      {@render footer()}
    {:else}
      <span class="panel-footer-text">Panel Footer</span>
    {/if}
  </div>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid var(--wpea-surface--border);
    background: var(--wpea-surface--bg);
  }

  .panel.dragging {
    opacity: 0.5;
  }

  .panel-header {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    background: var(--wpea-surface--elev-1);
    border-bottom: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
    cursor: grab;
    gap: 4px;
  }

  .panel-header:active {
    cursor: grabbing;
  }

  .panel-title {
    flex: 1;
    font-size: 12px;
    font-weight: 600;
    color: var(--wpea-surface--text);
  }

  .panel-extract-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s, background-color 0.15s, color 0.15s;
  }

  .panel-header:hover .panel-extract-btn {
    opacity: 1;
  }

  .panel-extract-btn:hover {
    background: var(--wpea-surface--border);
    color: var(--wpea-surface--text);
  }

  .panel-body {
    padding: 4px;
    font-size: 12px;
    color: var(--wpea-surface--text);
  }

  .panel-footer {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    background: var(--wpea-surface--elev-1);
    border-top: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
  }

  .panel-footer-text {
    font-size: 12px;
    color: var(--wpea-surface--text-muted);
  }
</style>

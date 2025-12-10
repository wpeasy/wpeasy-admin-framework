<script lang="ts">
  import { startDrag, endDrag, updateFloatingPanelSize, extractPanel, type FloatingPanel } from '../state/panels.svelte';
  import { ExternalLinkIcon } from './icons';

  type Props = {
    panel: FloatingPanel;
  };

  let { panel }: Props = $props();

  let isDragging = $state(false);
  let isResizing = $state(false);
  let panelEl: HTMLDivElement;

  function handleDragStart(e: DragEvent) {
    isDragging = true;
    const rect = panelEl.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    startDrag({ id: panel.id, title: panel.title }, 'floating', offsetX, offsetY);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', panel.id);
      e.dataTransfer.setDragImage(panelEl, offsetX, offsetY);
    }
  }

  function handleDragEnd() {
    isDragging = false;
    endDrag();
  }

  // Resize handling
  type ResizeDirection = 'right' | 'bottom' | 'corner';
  let resizeDirection: ResizeDirection | null = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;

  function handleResizeStart(e: MouseEvent, direction: ResizeDirection) {
    e.preventDefault();
    e.stopPropagation();
    isResizing = true;
    resizeDirection = direction;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = panel.width;
    startHeight = panel.height;

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = direction === 'right' ? 'ew-resize' : direction === 'bottom' ? 'ns-resize' : 'nwse-resize';
    document.body.style.userSelect = 'none';
  }

  function handleResizeMove(e: MouseEvent) {
    if (!isResizing || !resizeDirection) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;

    if (resizeDirection === 'right' || resizeDirection === 'corner') {
      newWidth = Math.max(150, startWidth + deltaX);
    }
    if (resizeDirection === 'bottom' || resizeDirection === 'corner') {
      newHeight = Math.max(100, startHeight + deltaY);
    }

    // Update through the global state to avoid prop mutation warning
    updateFloatingPanelSize(panel.id, newWidth, newHeight);
  }

  function handleResizeEnd() {
    isResizing = false;
    resizeDirection = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  function handleExtract(e: MouseEvent) {
    e.stopPropagation();

    // Extract the panel from state
    extractPanel(panel.id, 'floating');

    // Open popout window
    const width = panel.width;
    const height = panel.height;
    const left = window.screenX + panel.x;
    const top = window.screenY + panel.y;

    window.open(
      `/popout.html?panel=${encodeURIComponent(panel.id)}`,
      `panel-${panel.id}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  }
</script>

<div
  class="floating-panel"
  class:dragging={isDragging}
  style="left: {panel.x}px; top: {panel.y}px; width: {panel.width}px; height: {panel.height}px;"
  bind:this={panelEl}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="floating-header"
    draggable="true"
    ondragstart={handleDragStart}
    ondragend={handleDragEnd}
  >
    <span class="floating-title">{panel.title}</span>
    <button class="floating-extract-btn" onclick={handleExtract} title="Open in new window">
      <ExternalLinkIcon size={12} />
    </button>
  </div>
  <div class="floating-body">
    <p>This is a sample panel with default content.</p>
    <p>Replace this by passing children to the Panel component.</p>
  </div>
  <div class="floating-footer">
    <span class="floating-footer-text">Panel Footer</span>
  </div>

  <!-- Resize handles -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="resize-handle resize-right" onmousedown={(e) => handleResizeStart(e, 'right')}></div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="resize-handle resize-bottom" onmousedown={(e) => handleResizeStart(e, 'bottom')}></div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="resize-handle resize-corner" onmousedown={(e) => handleResizeStart(e, 'corner')}></div>
</div>

<style>
  .floating-panel {
    position: fixed;
    display: flex;
    flex-direction: column;
    background: var(--wpea-surface--bg);
    border: 1px solid var(--wpea-surface--border);
    box-shadow: var(--wpea-shadow--xl);
    z-index: 1000;
    overflow: hidden;
  }

  .floating-panel.dragging {
    opacity: 0.5;
  }

  .floating-header {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    background: var(--wpea-surface--elev-1);
    border-bottom: 1px solid var(--wpea-surface--border);
    cursor: grab;
    gap: 4px;
  }

  .floating-header:active {
    cursor: grabbing;
  }

  .floating-title {
    flex: 1;
    font-size: 12px;
    font-weight: 600;
    color: var(--wpea-surface--text);
  }

  .floating-extract-btn {
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

  .floating-header:hover .floating-extract-btn {
    opacity: 1;
  }

  .floating-extract-btn:hover {
    background: var(--wpea-surface--border);
    color: var(--wpea-surface--text);
  }

  .floating-body {
    flex: 1;
    overflow: auto;
    padding: var(--wpea-space--xs);
    font-size: var(--wpea-text--sm);
    color: var(--wpea-surface--text);
  }

  .floating-footer {
    display: flex;
    align-items: center;
    padding: 2px var(--wpea-space--xs);
    background: var(--wpea-surface--elev-1);
    border-top: 1px solid var(--wpea-surface--border);
  }

  .floating-footer-text {
    font-size: var(--wpea-text--xs);
    color: var(--wpea-surface--text-muted);
  }

  .resize-handle {
    position: absolute;
    background: transparent;
  }

  .resize-handle:hover {
    background: var(--wpea-color--primary-t-30);
  }

  .resize-right {
    top: 0;
    right: 0;
    width: 6px;
    height: calc(100% - 12px);
    cursor: ew-resize;
  }

  .resize-bottom {
    bottom: 0;
    left: 0;
    width: calc(100% - 12px);
    height: 6px;
    cursor: ns-resize;
  }

  .resize-corner {
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    cursor: nwse-resize;
  }
</style>

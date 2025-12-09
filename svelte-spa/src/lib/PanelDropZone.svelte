<script lang="ts">
  import type { Snippet } from 'svelte';
  import { panelsState, dropPanel, type ContainerId } from '../state/panels.svelte';

  type Props = {
    containerId: ContainerId;
    children?: Snippet;
  };

  let { containerId, children }: Props = $props();

  let isDragOver = $state(false);
  let dropIndex = $state<number | null>(null);
  let indicatorTop = $state<number>(0);
  let containerEl: HTMLDivElement;

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!panelsState.draggingPanel) return;

    isDragOver = true;

    // Calculate drop position based on mouse position
    const panelElements = Array.from(containerEl.querySelectorAll(':scope > .panel'));
    const containerRect = containerEl.getBoundingClientRect();
    const scrollTop = containerEl.scrollTop;

    if (panelElements.length === 0) {
      dropIndex = 0;
      indicatorTop = 0;
      return;
    }

    const mouseY = e.clientY;
    let newDropIndex = panelElements.length;
    let newIndicatorTop = 0;

    for (let i = 0; i < panelElements.length; i++) {
      const rect = panelElements[i].getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;

      if (mouseY < midpoint) {
        newDropIndex = i;
        newIndicatorTop = rect.top - containerRect.top + scrollTop;
        break;
      }
    }

    // If dropping at end, position after last panel
    if (newDropIndex === panelElements.length) {
      const lastRect = panelElements[panelElements.length - 1].getBoundingClientRect();
      newIndicatorTop = lastRect.bottom - containerRect.top + scrollTop;
    }

    dropIndex = newDropIndex;
    indicatorTop = newIndicatorTop;
  }

  function handleDragLeave(e: DragEvent) {
    // Only handle if leaving the container entirely
    const relatedTarget = e.relatedTarget as Node | null;
    if (containerEl && relatedTarget && containerEl.contains(relatedTarget)) {
      return;
    }
    isDragOver = false;
    dropIndex = null;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    const insertAt = dropIndex ?? undefined;
    isDragOver = false;
    dropIndex = null;
    dropPanel(containerId, insertAt);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="panel-drop-zone"
  class:drag-over={isDragOver}
  class:has-dragging={panelsState.draggingPanel !== null}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  bind:this={containerEl}
>
  {#if children}
    {@render children()}
  {/if}

  {#if isDragOver && dropIndex !== null}
    <div
      class="drop-indicator"
      style="top: {indicatorTop}px;"
    ></div>
  {/if}
</div>

<style>
  .panel-drop-zone {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    gap: 4px;
    padding: 4px;
    position: relative;
    overflow: auto;
  }

  .panel-drop-zone.has-dragging {
    outline: 2px dashed var(--wpea-surface--border);
    outline-offset: -2px;
  }

  .panel-drop-zone.drag-over {
    outline-color: var(--wpea-color--primary);
    background: var(--wpea-color--primary-t-10);
  }

  .drop-indicator {
    position: absolute;
    left: 4px;
    right: 4px;
    height: 3px;
    background: var(--wpea-color--primary);
    border-radius: 2px;
    pointer-events: none;
  }
</style>

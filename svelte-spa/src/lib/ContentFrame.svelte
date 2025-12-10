<script lang="ts">
  import { layout, setContentFrameWidth } from '../state/layout.svelte';

  type Props = {
    src?: string;
  };

  let { src = '' }: Props = $props();

  let wrapperEl: HTMLDivElement;
  let isResizing = $state(false);
  let resizeSide = $state<'left' | 'right' | null>(null);
  let startX = 0;
  let startWidth = 0;

  function handleResizeStart(e: MouseEvent, side: 'left' | 'right') {
    e.preventDefault();
    isResizing = true;
    resizeSide = side;
    startX = e.clientX;

    // Get current actual width of the inner frame
    const innerEl = wrapperEl.querySelector('.content-inner') as HTMLElement;
    startWidth = innerEl?.offsetWidth ?? wrapperEl.offsetWidth;

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  function handleResizeMove(e: MouseEvent) {
    if (!isResizing || !resizeSide) return;

    // Since the inner frame is centered, dragging one side affects both sides
    // So we need to double the delta to keep the handle under the cursor
    const delta = resizeSide === 'left'
      ? (startX - e.clientX) * 2
      : (e.clientX - startX) * 2;

    const newWidth = Math.max(200, startWidth + delta);
    const maxWidth = wrapperEl.offsetWidth - (layout.contentFrameMargin * 2);

    // If dragged to max or beyond, set to null (auto)
    if (newWidth >= maxWidth) {
      setContentFrameWidth(null);
    } else {
      setContentFrameWidth(newWidth);
    }
  }

  function handleResizeEnd() {
    isResizing = false;
    resizeSide = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  // Double-click to reset to full width
  function handleDoubleClick() {
    setContentFrameWidth(null);
  }
</script>

<div class="content-wrapper" bind:this={wrapperEl}>
  <div
    class="content-inner"
    style={layout.contentFrameWidth !== null ? `width: ${layout.contentFrameWidth}px;` : ''}
  >
    {#if src}
      <iframe
        {src}
        title="Content Frame"
        class="content-iframe"
      ></iframe>
    {:else}
      <div class="content-placeholder">
        <span>Content Area</span>
        <p>Set the src prop to load an iframe, or replace this component with your content.</p>
      </div>
    {/if}

    <!-- Resize handles on the inner frame -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="inner-resize-handle inner-resize-left"
      class:active={isResizing && resizeSide === 'left'}
      onmousedown={(e) => handleResizeStart(e, 'left')}
      ondblclick={handleDoubleClick}
    ></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="inner-resize-handle inner-resize-right"
      class:active={isResizing && resizeSide === 'right'}
      onmousedown={(e) => handleResizeStart(e, 'right')}
      ondblclick={handleDoubleClick}
    ></div>
  </div>
</div>

<style>
  .content-wrapper {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background: var(--wpea-surface--elev-2);
    padding: 0 6px;
  }

  .content-inner {
    flex: 1;
    max-width: 100%;
    display: flex;
    overflow: hidden;
    background: var(--wpea-surface--bg);
    position: relative;
  }

  /* When width is set, don't flex-grow */
  .content-inner[style*="width"] {
    flex: none;
  }

  .content-iframe {
    width: 100%;
    height: 100%;
    border: none;
    flex: 1;
  }

  .content-placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wpea-space--sm);
    color: var(--wpea-surface--text-muted);
  }

  .content-placeholder span {
    font-size: var(--wpea-text--lg);
    font-weight: 600;
  }

  .content-placeholder p {
    font-size: var(--wpea-text--sm);
    text-align: center;
    max-width: 300px;
  }

  .inner-resize-handle {
    position: absolute;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    z-index: 10;
    transition: background var(--wpea-anim-duration--fast);
  }

  .inner-resize-left {
    left: 0;
  }

  .inner-resize-right {
    right: 0;
  }

  .inner-resize-handle:hover,
  .inner-resize-handle.active {
    background: var(--wpea-color--secondary-t-50);
  }
</style>

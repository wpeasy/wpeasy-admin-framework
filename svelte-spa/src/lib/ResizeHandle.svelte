<script lang="ts">
  import {
    layout,
    setLeftPanelWidth,
    setRightPanelWidth,
    setBottomPanelHeight,
    setTopPanelHeight
  } from '../state/layout.svelte';

  type Props = {
    position: 'left' | 'right' | 'top' | 'bottom';
    target: 'left' | 'right' | 'top' | 'bottom';
    variant?: 'primary' | 'secondary';
  };

  let { position, target, variant = 'primary' }: Props = $props();

  let isDragging = $state(false);
  let startPos = $state(0);
  let startSize = $state(0);

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    isDragging = true;

    if (position === 'left' || position === 'right') {
      startPos = e.clientX;
    } else {
      startPos = e.clientY;
    }

    switch (target) {
      case 'left':
        startSize = layout.leftPanelWidth;
        break;
      case 'right':
        startSize = layout.rightPanelWidth;
        break;
      case 'top':
        startSize = layout.topBarHeight;
        break;
      case 'bottom':
        startSize = layout.bottomPanelHeight;
        break;
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = position === 'left' || position === 'right' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    let delta: number;

    switch (target) {
      case 'left':
        // Dragging right edge of left panel
        delta = e.clientX - startPos;
        setLeftPanelWidth(startSize + delta);
        break;
      case 'right':
        // Dragging left edge of right panel
        delta = startPos - e.clientX;
        setRightPanelWidth(startSize + delta);
        break;
      case 'top':
        // Dragging bottom edge of top panel
        delta = e.clientY - startPos;
        setTopPanelHeight(startSize + delta);
        break;
      case 'bottom':
        // Dragging top edge of bottom panel
        delta = startPos - e.clientY;
        setBottomPanelHeight(startSize + delta);
        break;
    }
  }

  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="resize-handle resize-handle--{position} resize-handle--{variant}"
  class:dragging={isDragging}
  onmousedown={handleMouseDown}
  role="separator"
  aria-orientation={position === 'left' || position === 'right' ? 'vertical' : 'horizontal'}
  tabindex="0"
></div>

<style>
  .resize-handle {
    position: absolute;
    background: transparent;
    z-index: 10;
    transition: background var(--wpea-anim-duration--fast);
  }

  .resize-handle--primary:hover,
  .resize-handle--primary.dragging {
    background: var(--wpea-color--primary-t-50);
  }

  .resize-handle--secondary:hover,
  .resize-handle--secondary.dragging {
    background: var(--wpea-color--secondary-t-50);
  }

  .resize-handle--left {
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
  }

  .resize-handle--right {
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
  }

  .resize-handle--top {
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    cursor: row-resize;
  }

  .resize-handle--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    cursor: row-resize;
  }
</style>

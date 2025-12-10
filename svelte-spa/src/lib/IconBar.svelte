<script lang="ts">
  import type { Snippet } from 'svelte';
  import { layout, setLeftShortcutAlign, setRightShortcutAlign, setBottomShortcutAlign } from '../state/layout.svelte';

  type Props = {
    position: 'left' | 'right' | 'bottom';
    children?: Snippet;
  };

  let { position, children }: Props = $props();

  // Get current alignment based on position
  let currentAlignment = $derived(() => {
    if (position === 'left') return layout.leftShortcutAlign;
    if (position === 'right') return layout.rightShortcutAlign;
    return layout.bottomShortcutAlign;
  });

  // Cycle through alignments
  function cycleAlignment() {
    if (position === 'left' || position === 'right') {
      const modes = ['top', 'center', 'bottom'] as const;
      const currentIndex = modes.indexOf(currentAlignment() as typeof modes[number]);
      const newMode = modes[(currentIndex + 1) % modes.length];
      if (position === 'left') {
        setLeftShortcutAlign(newMode);
      } else {
        setRightShortcutAlign(newMode);
      }
    } else {
      const modes = ['left', 'center', 'right'] as const;
      const currentIndex = modes.indexOf(currentAlignment() as typeof modes[number]);
      const newMode = modes[(currentIndex + 1) % modes.length];
      setBottomShortcutAlign(newMode);
    }
  }

  // Icons and titles for vertical alignment (left/right bars)
  const verticalIcons = {
    top: {
      title: 'Align top (click for center)',
      // Align top icon
      path: 'M4 4h16M4 4v4M20 4v4M8 8h8v8H8z'
    },
    center: {
      title: 'Align center (click for bottom)',
      // Align center icon
      path: 'M4 12h16M8 6h8v12H8z'
    },
    bottom: {
      title: 'Align bottom (click for top)',
      // Align bottom icon
      path: 'M4 20h16M4 20v-4M20 20v-4M8 8h8v8H8z'
    }
  };

  // Icons and titles for horizontal alignment (bottom bar)
  const horizontalIcons = {
    left: {
      title: 'Align left (click for center)',
      // Align left icon
      path: 'M4 4v16M4 4h4M4 20h4M8 8v8h8V8z'
    },
    center: {
      title: 'Align center (click for right)',
      // Align center icon
      path: 'M12 4v16M6 8h12v8H6z'
    },
    right: {
      title: 'Align right (click for left)',
      // Align right icon
      path: 'M20 4v16M20 4h-4M20 20h-4M8 8v8h8V8z'
    }
  };

  let currentIcon = $derived(() => {
    const align = currentAlignment();
    if (position === 'left' || position === 'right') {
      return verticalIcons[align as keyof typeof verticalIcons];
    }
    return horizontalIcons[align as keyof typeof horizontalIcons];
  });

  // Map alignment to justify-content value
  let justifyContent = $derived(() => {
    const align = currentAlignment();
    if (align === 'top' || align === 'left') return 'flex-start';
    if (align === 'bottom' || align === 'right') return 'flex-end';
    return 'center';
  });

  let isVertical = $derived(position === 'left' || position === 'right');
</script>

<div class="icon-bar icon-bar--{position}">
  <button
    class="icon-bar__toggle-btn"
    onclick={cycleAlignment}
    title={currentIcon().title}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d={currentIcon().path}></path>
    </svg>
  </button>
  <div class="icon-bar__scroll" style="justify-content: {justifyContent()}">
    {#if children}
      {@render children()}
    {:else}
      <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
      <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
      <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
    {/if}
  </div>
</div>

<style>
  .icon-bar {
    background: var(--wpea-surface--muted);
    display: flex;
    align-items: stretch;
    flex-shrink: 0;
  }

  .icon-bar--left,
  .icon-bar--right {
    flex-direction: column;
    border-right: 1px solid var(--wpea-surface--border);
  }

  .icon-bar--right {
    border-right: none;
    border-left: 1px solid var(--wpea-surface--border);
  }

  .icon-bar--bottom {
    flex-direction: row;
    border-top: 1px solid var(--wpea-surface--border);
  }

  .icon-bar__toggle-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 4px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
  }

  .icon-bar__toggle-btn:hover {
    background: var(--wpea-surface--border);
    color: var(--wpea-surface--text);
  }

  .icon-bar__toggle-btn:active {
    background: var(--wpea-surface--elev-1);
  }

  .icon-bar__scroll {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    overflow: auto;
  }

  .icon-bar--left .icon-bar__scroll,
  .icon-bar--right .icon-bar__scroll {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .icon-bar--bottom .icon-bar__scroll {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .placeholder-icon {
    flex-shrink: 0;
    border-radius: var(--wpea-radius--sm);
    background: var(--wpea-surface--border);
  }
</style>

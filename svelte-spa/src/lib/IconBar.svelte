<script lang="ts">
  import type { Snippet, Component } from 'svelte';
  import { layout, setLeftShortcutAlign, setRightShortcutAlign, setBottomShortcutAlign } from '../state/layout.svelte';
  import { uiState } from '../state/ui.svelte';
  import Popover from './Popover.svelte';
  import {
    AlignTopIcon,
    AlignCenterVerticalIcon,
    AlignBottomIcon,
    AlignLeftIcon,
    AlignCenterHorizontalIcon,
    AlignRightIcon
  } from './icons';

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
  const verticalConfig = {
    top: {
      title: 'Align top (click for center)',
      icon: AlignTopIcon
    },
    center: {
      title: 'Align center (click for bottom)',
      icon: AlignCenterVerticalIcon
    },
    bottom: {
      title: 'Align bottom (click for top)',
      icon: AlignBottomIcon
    }
  };

  // Icons and titles for horizontal alignment (bottom bar)
  const horizontalConfig = {
    left: {
      title: 'Align left (click for center)',
      icon: AlignLeftIcon
    },
    center: {
      title: 'Align center (click for right)',
      icon: AlignCenterHorizontalIcon
    },
    right: {
      title: 'Align right (click for left)',
      icon: AlignRightIcon
    }
  };

  let CurrentIcon = $derived(() => {
    const align = currentAlignment();
    if (position === 'left' || position === 'right') {
      return verticalConfig[align as keyof typeof verticalConfig].icon;
    }
    return horizontalConfig[align as keyof typeof horizontalConfig].icon;
  });

  let currentTitle = $derived(() => {
    const align = currentAlignment();
    if (position === 'left' || position === 'right') {
      return verticalConfig[align as keyof typeof verticalConfig].title;
    }
    return horizontalConfig[align as keyof typeof horizontalConfig].title;
  });

  // Map alignment to justify-content value
  let justifyContent = $derived(() => {
    const align = currentAlignment();
    if (align === 'top' || align === 'left') return 'flex-start';
    if (align === 'bottom' || align === 'right') return 'flex-end';
    return 'center';
  });

  let isVertical = $derived(position === 'left' || position === 'right');

  // Popover position based on icon bar position
  let popoverPosition = $derived(() => {
    if (position === 'left') return 'right';
    if (position === 'right') return 'left';
    return 'right'; // bottom bar - align button is on the left
  });

  let isHovered = $state(false);
</script>

{#snippet iconBtn()}
  {@const Icon = CurrentIcon()}
  <Icon size={14} />
{/snippet}

<div class="icon-bar icon-bar--{position}">
  <Popover
    content={currentTitle()}
    position={popoverPosition()}
    size="xs"
    visible={isHovered}
    enabled={uiState.showActionPopovers}
  >
    <button
      class="icon-bar__toggle-btn"
      onclick={cycleAlignment}
      onmouseenter={() => isHovered = true}
      onmouseleave={() => isHovered = false}
    >
      {@render iconBtn()}
    </button>
  </Popover>
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
    overflow: visible;
    /* Extra padding to allow popovers to appear above without clipping */
    margin-top: -24px;
    padding-top: 24px;
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
    overflow: visible;
  }

  .placeholder-icon {
    flex-shrink: 0;
    border-radius: var(--wpea-radius--sm);
    background: var(--wpea-surface--border);
  }
</style>

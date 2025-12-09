<script lang="ts">
  import type { Snippet } from 'svelte';
  import { layout } from '../state/layout.svelte';

  type Props = {
    position: 'left' | 'right' | 'bottom';
    children?: Snippet;
  };

  let { position, children }: Props = $props();

  // Get alignment based on position
  let alignment = $derived(() => {
    if (position === 'left') return layout.leftShortcutAlign;
    if (position === 'right') return layout.rightShortcutAlign;
    return layout.bottomShortcutAlign;
  });

  // Map alignment to justify-content value
  let justifyContent = $derived(() => {
    const align = alignment();
    if (align === 'top' || align === 'left') return 'flex-start';
    if (align === 'bottom' || align === 'right') return 'flex-end';
    return 'center';
  });
</script>

<div class="icon-bar icon-bar--{position}" style="justify-content: {justifyContent()}">
  {#if children}
    {@render children()}
  {:else}
    <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
    <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
    <div class="placeholder-icon" style="width: {layout.shortcutIconSize}px; height: {layout.shortcutIconSize}px;"></div>
  {/if}
</div>

<style>
  .icon-bar {
    background: var(--wpea-surface--muted);
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
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

  .placeholder-icon {
    border-radius: var(--wpea-radius--sm);
    background: var(--wpea-surface--border);
  }
</style>

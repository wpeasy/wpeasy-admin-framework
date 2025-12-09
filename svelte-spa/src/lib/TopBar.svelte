<script lang="ts">
  import type { Snippet } from 'svelte';
  import { layout } from '../state/layout.svelte';
  import { openSettingsModal } from '../state/ui.svelte';
  import ResizeHandle from './ResizeHandle.svelte';

  type Props = {
    left?: Snippet;
    center?: Snippet;
    right?: Snippet;
  };

  let { left, center, right }: Props = $props();
</script>

<div class="topbar" style="height: {layout.topBarHeight}px;">
  <div class="topbar-section topbar-left">
    {#if left}
      {@render left()}
    {/if}
  </div>

  <div class="topbar-section topbar-center">
    {#if center}
      {@render center()}
    {/if}
  </div>

  <div class="topbar-section topbar-right">
    {#if right}
      {@render right()}
    {/if}
    <button
      class="topbar-icon-btn"
      style="width: {layout.actionIconSize}px; height: {layout.actionIconSize}px;"
      onclick={openSettingsModal}
      title="Settings"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={layout.actionIconSize * 0.6} height={layout.actionIconSize * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>
  </div>

  <ResizeHandle position="bottom" target="top" />
</div>

<style>
  .topbar {
    display: flex;
    align-items: center;
    background: var(--wpea-surface--panel);
    border-bottom: 1px solid var(--wpea-surface--border);
    position: relative;
    flex-shrink: 0;
    min-height: 40px;
  }

  .topbar-section {
    display: flex;
    align-items: center;
    gap: var(--wpea-space--sm);
    padding: 0 var(--wpea-space--sm);
  }

  .topbar-left {
    flex: 1;
    justify-content: flex-start;
  }

  .topbar-center {
    flex: 1;
    justify-content: center;
  }

  .topbar-right {
    flex: 1;
    justify-content: flex-end;
  }

  .topbar-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
  }

  .topbar-icon-btn:hover {
    background: var(--wpea-surface--elev-1);
    color: var(--wpea-surface--text);
  }

  .topbar-icon-btn:active {
    background: var(--wpea-surface--border);
  }
</style>

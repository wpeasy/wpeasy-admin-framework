<script lang="ts">
  import type { Snippet, Component } from 'svelte';
  import { uiState } from '../state/ui.svelte';
  import Popover from './Popover.svelte';

  type Props = {
    icon: Component<{ size?: number }>;
    label: string;
    size?: number;
    onclick?: () => void;
    active?: boolean;
    disabled?: boolean;
  };

  let { icon: Icon, label, size = 32, onclick, active = false, disabled = false }: Props = $props();

  let isHovered = $state(false);
  let iconSize = $derived(size * 0.6);
</script>

<Popover content={label} position="bottom" size="xs" visible={isHovered} enabled={uiState.showActionPopovers}>
  <button
    class="action-btn"
    class:active
    style="width: {size}px; height: {size}px;"
    {onclick}
    {disabled}
    onmouseenter={() => isHovered = true}
    onmouseleave={() => isHovered = false}
  >
    <Icon size={iconSize} />
  </button>
</Popover>

<style>
  .action-btn {
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

  .action-btn:hover {
    background: var(--wpea-surface--elev-1);
    color: var(--wpea-color--secondary);
  }

  .action-btn:active,
  .action-btn.active {
    background: var(--wpea-surface--border);
  }

  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    content: string;
    position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';
    size?: 'xs' | 's' | 'm';
    visible?: boolean;
    enabled?: boolean;
    class?: string;
    style?: string;
    children?: Snippet;
  };

  let {
    content,
    position = 'top',
    size = 'm',
    visible = false,
    enabled = true,
    class: className = '',
    style,
    children
  }: Props = $props();

  const positionClass = $derived(`wpea-popover__content--${position}`);
  const sizeClass = $derived(`wpea-popover__content--${size}`);
  const visibleClass = $derived(visible ? 'wpea-popover__content--visible' : '');

  const contentClass = $derived(
    `wpea-popover__content ${positionClass} ${sizeClass} ${visibleClass}`.trim()
  );

  const wrapperClass = $derived(
    `wpea-popover ${enabled ? '' : 'wpea-popover--disabled'} ${className}`.trim()
  );
</script>

<div class={wrapperClass} {style}>
  {#if children}
    {@render children()}
  {/if}
  <div class={contentClass}>
    {content}
  </div>
</div>

<style>
  /* When disabled, don't show on hover */
  .wpea-popover--disabled:hover :global(.wpea-popover__content),
  .wpea-popover--disabled:focus-within :global(.wpea-popover__content) {
    opacity: 0;
    visibility: hidden;
  }
</style>

<script lang="ts">
  import { CopyIcon } from './icons';

  type Props = {
    width: number;
  };

  let { width }: Props = $props();

  let copied = $state(false);

  async function copyContainerQuery() {
    const query = `@container (max-width: ${width}px) {
  /* Add your styles here */
}`;

    try {
      await navigator.clipboard.writeText(query);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<div class="container-width-badge">
  <span class="badge-text">{width}px</span>
  <button
    class="badge-copy-btn"
    onclick={copyContainerQuery}
    title="Copy container query"
  >
    {#if copied}
      <span class="copied-text">✓</span>
    {:else}
      <CopyIcon size={10} />
    {/if}
  </button>
</div>

<style>
  .container-width-badge {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    background: var(--wpea-color--secondary-t-30);
    border-bottom-right-radius: var(--wpea-radius--sm);
    font-size: 10px;
    font-weight: 500;
    color: var(--wpea-color--secondary);
    pointer-events: auto;
  }

  .badge-text {
    line-height: 1;
  }

  .badge-copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    border: none;
    border-radius: 2px;
    background: transparent;
    color: var(--wpea-color--secondary);
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .badge-copy-btn:hover {
    background: var(--wpea-color--secondary-t-30);
  }

  .copied-text {
    font-size: 10px;
    line-height: 1;
  }
</style>

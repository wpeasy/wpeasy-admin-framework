<script lang="ts">
  type Props = {
    size?: number;
  };

  let { size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="4" y1="20" x2="20" y2="20"></line>
  <rect x="6" y="10" width="3" height="10" fill="currentColor" stroke="none"></rect>
  <rect x="11" y="14" width="3" height="6" fill="currentColor" stroke="none"></rect>
  <rect x="16" y="6" width="3" height="14" fill="currentColor" stroke="none"></rect>
</svg>

<script lang="ts">
  type Props = {
    size?: number;
  };

  let { size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="12" y1="4" x2="12" y2="20"></line>
  <rect x="7" y="6" width="10" height="3" fill="currentColor" stroke="none"></rect>
  <rect x="9" y="11" width="6" height="3" fill="currentColor" stroke="none"></rect>
  <rect x="5" y="16" width="14" height="3" fill="currentColor" stroke="none"></rect>
</svg>

<script lang="ts">
  type Props = {
    size?: number;
  };

  let { size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4h16M4 4v4M20 4v4M8 8h8v8H8z"></path>
</svg>

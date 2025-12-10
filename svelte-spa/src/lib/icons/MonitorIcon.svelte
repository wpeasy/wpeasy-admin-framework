<script lang="ts">
  type Props = {
    size?: number;
  };

  let { size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M4 6h16M4 6a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2M4 6h16"></path>
</svg>

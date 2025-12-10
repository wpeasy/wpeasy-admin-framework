<script lang="ts">
  type Props = {
    size?: number;
  };

  let { size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21.3 8.7l-8.6-8.6c-.4-.4-1-.4-1.4 0l-8.6 8.6c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l8.6-8.6c.4-.4.4-1 0-1.4z"></path>
  <path d="M7.5 11.5l2-2"></path>
  <path d="M10.5 8.5l2-2"></path>
  <path d="M13.5 11.5l2-2"></path>
  <path d="M16.5 8.5l1-1"></path>
</svg>

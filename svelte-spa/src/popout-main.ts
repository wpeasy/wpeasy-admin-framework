import '../../wpea-wp-resets.css';
import '../../wpea-framework.css';
import PopoutPanel from './PopoutPanel.svelte';
import { mount } from 'svelte';

const app = mount(PopoutPanel, {
  target: document.getElementById('app')!,
});

export default app;

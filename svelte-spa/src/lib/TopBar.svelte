<script lang="ts">
  import type { Snippet } from 'svelte';
  import { layout, setLeftPanelVisible, setRightPanelVisible, setBottomPanelVisible } from '../state/layout.svelte';
  import { openSettingsModal } from '../state/ui.svelte';
  import { theme, cycleTheme } from '../state/theme.svelte';
  import ResizeHandle from './ResizeHandle.svelte';
  import Switch from './Switch.svelte';

  type Props = {
    left?: Snippet;
    center?: Snippet;
    right?: Snippet;
  };

  let { left, center, right }: Props = $props();

  let settingsMenuOpen = $state(false);
  let menuRef = $state<HTMLDivElement | null>(null);

  function toggleSettingsMenu() {
    settingsMenuOpen = !settingsMenuOpen;
  }

  function closeSettingsMenu() {
    settingsMenuOpen = false;
  }

  function handleAllSettings() {
    closeSettingsMenu();
    openSettingsModal();
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef && !menuRef.contains(event.target as Node)) {
      closeSettingsMenu();
    }
  }

  $effect(() => {
    if (settingsMenuOpen) {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  });

  const themeIcons = {
    light: {
      title: 'Light mode (click for dark)',
      // Sun icon
      path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    },
    dark: {
      title: 'Dark mode (click for system)',
      // Moon icon
      path: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
    },
    system: {
      title: 'System preference (click for light)',
      // Monitor icon
      path: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M4 6h16M4 6a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2M4 6h16'
    }
  };

  let currentIcon = $derived(themeIcons[theme.mode]);
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
      onclick={cycleTheme}
      title={currentIcon.title}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={layout.actionIconSize * 0.6} height={layout.actionIconSize * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d={currentIcon.path}></path>
      </svg>
    </button>
    <div class="settings-menu-container" bind:this={menuRef}>
      <button
        class="topbar-icon-btn"
        class:active={settingsMenuOpen}
        style="width: {layout.actionIconSize}px; height: {layout.actionIconSize}px;"
        onclick={toggleSettingsMenu}
        title="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={layout.actionIconSize * 0.6} height={layout.actionIconSize * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {#if settingsMenuOpen}
        <div class="settings-menu">
          <div class="settings-menu-section">
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.leftPanelVisible}
                onchange={(checked) => setLeftPanelVisible(checked)}
              />
              <span>Left Panel</span>
            </div>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.rightPanelVisible}
                onchange={(checked) => setRightPanelVisible(checked)}
              />
              <span>Right Panel</span>
            </div>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.bottomPanelVisible}
                onchange={(checked) => setBottomPanelVisible(checked)}
              />
              <span>Bottom Panel</span>
            </div>
          </div>
          <div class="settings-menu-divider"></div>
          <button class="settings-menu-btn" onclick={handleAllSettings}>
            All Settings...
          </button>
        </div>
      {/if}
    </div>
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

  .topbar-icon-btn:active,
  .topbar-icon-btn.active {
    background: var(--wpea-surface--border);
  }

  /* Settings menu */
  .settings-menu-container {
    position: relative;
  }

  .settings-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: var(--wpea-space--xs);
    min-width: 160px;
    background: var(--wpea-surface--panel);
    border: 1px solid var(--wpea-surface--border);
    border-radius: var(--wpea-radius--sm);
    box-shadow: var(--wpea-shadow--lg);
    z-index: 1000;
  }

  .settings-menu-section {
    padding: var(--wpea-space--xs);
  }

  .settings-menu-item {
    display: flex;
    align-items: center;
    gap: var(--wpea-space--sm);
    padding: var(--wpea-space--xs);
    font-size: var(--wpea-text--sm);
    color: var(--wpea-surface--text);
    border-radius: var(--wpea-radius--sm);
  }

  .settings-menu-item:hover {
    background: var(--wpea-surface--elev-1);
  }

  .settings-menu-divider {
    height: 1px;
    background: var(--wpea-surface--border);
    margin: 0;
  }

  .settings-menu-btn {
    display: block;
    width: 100%;
    padding: var(--wpea-space--sm);
    border: none;
    background: transparent;
    font-size: var(--wpea-text--sm);
    color: var(--wpea-surface--text);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .settings-menu-btn:hover {
    background: var(--wpea-surface--elev-1);
  }
</style>

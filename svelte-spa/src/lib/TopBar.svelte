<script lang="ts">
  import type { Snippet } from 'svelte';
  import { layout, setLeftPanelVisible, setRightPanelVisible, setBottomPanelVisible, setLeftIconBarVisible, setRightIconBarVisible, setBottomIconBarVisible } from '../state/layout.svelte';
  import { openSettingsModal, enterPreviewMode, uiState, setShowContainerWidths } from '../state/ui.svelte';
  import { theme, cycleTheme } from '../state/theme.svelte';
  import Switch from './Switch.svelte';
  import ActionButton from './ActionButton.svelte';
  import { SunIcon, MoonIcon, MonitorIcon, SettingsIcon, EyeIcon, SaveIcon } from './icons';

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

  const themeConfig = {
    light: {
      title: 'Light mode (click for dark)',
      icon: SunIcon
    },
    dark: {
      title: 'Dark mode (click for system)',
      icon: MoonIcon
    },
    system: {
      title: 'System preference (click for light)',
      icon: MonitorIcon
    }
  };

  let currentTheme = $derived(themeConfig[theme.mode]);
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
    <ActionButton
      icon={currentTheme.icon}
      label={currentTheme.title}
      size={layout.actionIconSize}
      onclick={cycleTheme}
    />
    <div class="settings-menu-container" bind:this={menuRef}>
      <ActionButton
        icon={SettingsIcon}
        label="Settings"
        size={layout.actionIconSize}
        onclick={toggleSettingsMenu}
        active={settingsMenuOpen}
      />

      {#if settingsMenuOpen}
        <div class="settings-menu">
          <div class="settings-menu-section">
            <span class="settings-menu-label">Panels</span>
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
          <div class="settings-menu-section">
            <span class="settings-menu-label">Shortcut Bars</span>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.leftIconBarVisible}
                onchange={(checked) => setLeftIconBarVisible(checked)}
              />
              <span>Left Shortcuts</span>
            </div>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.rightIconBarVisible}
                onchange={(checked) => setRightIconBarVisible(checked)}
              />
              <span>Right Shortcuts</span>
            </div>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={layout.bottomIconBarVisible}
                onchange={(checked) => setBottomIconBarVisible(checked)}
              />
              <span>Bottom Shortcuts</span>
            </div>
          </div>
          <div class="settings-menu-divider"></div>
          <div class="settings-menu-section">
            <span class="settings-menu-label">Content Frame</span>
            <div class="settings-menu-item">
              <Switch
                size="xs"
                checked={uiState.showContainerWidths}
                onchange={(checked) => setShowContainerWidths(checked)}
              />
              <span>Container Widths</span>
            </div>
          </div>
          <div class="settings-menu-divider"></div>
          <button class="settings-menu-btn" onclick={handleAllSettings}>
            All Settings...
          </button>
        </div>
      {/if}
    </div>
    <ActionButton
      icon={EyeIcon}
      label="Preview"
      size={layout.actionIconSize}
      onclick={enterPreviewMode}
    />
    <ActionButton
      icon={SaveIcon}
      label="Save"
      size={layout.actionIconSize}
    />
  </div>
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

  .settings-menu-label {
    display: block;
    padding: var(--wpea-space--xs);
    font-size: var(--wpea-text--xs);
    font-weight: 600;
    color: var(--wpea-surface--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
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

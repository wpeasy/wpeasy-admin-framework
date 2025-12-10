<script lang="ts">
  import { closeSettingsModal } from '../state/ui.svelte';
  import {
    layout,
    setLeftPanelVisible,
    setRightPanelVisible,
    setBottomPanelVisible,
    setLeftShortcutAlign,
    setRightShortcutAlign,
    setBottomShortcutAlign,
    resetLayout,
    type VerticalAlign,
    type HorizontalAlign
  } from '../state/layout.svelte';
  import { resetPanels } from '../state/panels.svelte';
  import DoubleOptInButton from './DoubleOptInButton.svelte';
  import Switch from './Switch.svelte';

  let activeTab = $state<'layout' | 'general'>('layout');

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeSettingsModal();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeSettingsModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="wpea settings-modal-backdrop" onclick={handleBackdropClick}>
  <div class="settings-modal">
    <div class="settings-header">
      <h2 class="settings-title">Settings</h2>
      <button class="settings-close-btn" onclick={closeSettingsModal} title="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Tabs -->
    <div class="settings-tabs">
      <button
        class="settings-tab"
        class:active={activeTab === 'layout'}
        onclick={() => activeTab = 'layout'}
      >
        Layout
      </button>
      <button
        class="settings-tab"
        class:active={activeTab === 'general'}
        onclick={() => activeTab = 'general'}
      >
        General
      </button>
    </div>

    <div class="settings-body">
      {#if activeTab === 'layout'}
        <!-- Layout Tab -->
        <div class="settings-section">
          <h3 class="settings-section-title">Panel Visibility</h3>
          <div class="settings-group">
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.leftPanelVisible}
                onchange={(checked) => setLeftPanelVisible(checked)}
                label="Left Panel"
              />
            </div>
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.rightPanelVisible}
                onchange={(checked) => setRightPanelVisible(checked)}
                label="Right Panel"
              />
            </div>
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.bottomPanelVisible}
                onchange={(checked) => setBottomPanelVisible(checked)}
                label="Bottom Panel"
              />
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Shortcut Bar Alignment</h3>
          <div class="settings-group">
            <div class="settings-align-row">
              <div class="three-state-switch">
                <button
                  class="align-btn"
                  class:active={layout.leftShortcutAlign === 'top'}
                  onclick={() => setLeftShortcutAlign('top')}
                  title="Top"
                >
                  <!-- Flex align-items: flex-start (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="4" x2="20" y2="4"></line>
                    <rect x="6" y="4" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="4" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="4" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.leftShortcutAlign === 'center'}
                  onclick={() => setLeftShortcutAlign('center')}
                  title="Center"
                >
                  <!-- Flex align-items: center (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <rect x="6" y="7" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="9" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="5" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.leftShortcutAlign === 'bottom'}
                  onclick={() => setLeftShortcutAlign('bottom')}
                  title="Bottom"
                >
                  <!-- Flex align-items: flex-end (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="20" x2="20" y2="20"></line>
                    <rect x="6" y="10" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="14" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="6" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
              </div>
              <span>Left Shortcuts</span>
            </div>
            <div class="settings-align-row">
              <div class="three-state-switch">
                <button
                  class="align-btn"
                  class:active={layout.rightShortcutAlign === 'top'}
                  onclick={() => setRightShortcutAlign('top')}
                  title="Top"
                >
                  <!-- Flex align-items: flex-start (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="4" x2="20" y2="4"></line>
                    <rect x="6" y="4" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="4" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="4" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.rightShortcutAlign === 'center'}
                  onclick={() => setRightShortcutAlign('center')}
                  title="Center"
                >
                  <!-- Flex align-items: center (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <rect x="6" y="7" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="9" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="5" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.rightShortcutAlign === 'bottom'}
                  onclick={() => setRightShortcutAlign('bottom')}
                  title="Bottom"
                >
                  <!-- Flex align-items: flex-end (vertical) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="20" x2="20" y2="20"></line>
                    <rect x="6" y="10" width="3" height="10" fill="currentColor" stroke="none"></rect>
                    <rect x="11" y="14" width="3" height="6" fill="currentColor" stroke="none"></rect>
                    <rect x="16" y="6" width="3" height="14" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
              </div>
              <span>Right Shortcuts</span>
            </div>
            <div class="settings-align-row">
              <div class="three-state-switch">
                <button
                  class="align-btn"
                  class:active={layout.bottomShortcutAlign === 'left'}
                  onclick={() => setBottomShortcutAlign('left')}
                  title="Left"
                >
                  <!-- Flex justify-content: flex-start (horizontal) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="4" x2="4" y2="20"></line>
                    <rect x="4" y="6" width="10" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="4" y="11" width="6" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="4" y="16" width="14" height="3" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.bottomShortcutAlign === 'center'}
                  onclick={() => setBottomShortcutAlign('center')}
                  title="Center"
                >
                  <!-- Flex justify-content: center (horizontal) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="4" x2="12" y2="20"></line>
                    <rect x="7" y="6" width="10" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="9" y="11" width="6" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="5" y="16" width="14" height="3" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
                <button
                  class="align-btn"
                  class:active={layout.bottomShortcutAlign === 'right'}
                  onclick={() => setBottomShortcutAlign('right')}
                  title="Right"
                >
                  <!-- Flex justify-content: flex-end (horizontal) -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="20" y1="4" x2="20" y2="20"></line>
                    <rect x="10" y="6" width="10" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="14" y="11" width="6" height="3" fill="currentColor" stroke="none"></rect>
                    <rect x="6" y="16" width="14" height="3" fill="currentColor" stroke="none"></rect>
                  </svg>
                </button>
              </div>
              <span>Bottom Shortcuts</span>
            </div>
          </div>
        </div>
      {:else if activeTab === 'general'}
        <!-- General Tab -->
        <div class="settings-section">
          <h3 class="settings-section-title">Reset</h3>
          <div class="settings-group">
            <div class="settings-reset-row">
              <DoubleOptInButton
                onClick={resetPanels}
                defaultLabel="Reset"
                confirmLabel="Confirm?"
                timeout={3000}
              />
              <div class="reset-info">
                <span class="reset-label">Reset Panels</span>
                <span class="reset-description">Restore panel arrangement to defaults</span>
              </div>
            </div>
            <div class="settings-reset-row">
              <DoubleOptInButton
                onClick={resetLayout}
                defaultLabel="Reset"
                confirmLabel="Confirm?"
                timeout={3000}
              />
              <div class="reset-info">
                <span class="reset-label">Reset UI size and visibility</span>
                <span class="reset-description">Restore layout sizes and visibility to defaults</span>
              </div>
            </div>
            <div class="settings-reset-row">
              <DoubleOptInButton
                onClick={() => { resetPanels(); resetLayout(); }}
                defaultLabel="Reset"
                confirmLabel="Confirm?"
                timeout={3000}
              />
              <div class="reset-info">
                <span class="reset-label">Reset All UI</span>
                <span class="reset-description">Restore all UI settings to defaults</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div class="settings-footer">
      <button class="settings-btn settings-btn-secondary" onclick={closeSettingsModal}>Close</button>
    </div>
  </div>
</div>

<style>
  .settings-modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }

  .settings-modal {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    max-width: 100%;
    max-height: 100%;
    background: var(--wpea-surface--bg);
    border: 1px solid var(--wpea-surface--border);
    box-shadow: var(--wpea-shadow--xl);
    overflow: hidden;
  }

  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--wpea-space--sm) var(--wpea-space--md);
    background: var(--wpea-surface--elev-1);
    border-bottom: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
  }

  .settings-title {
    margin: 0;
    font-size: var(--wpea-text--lg);
    font-weight: 600;
    color: var(--wpea-surface--text);
  }

  .settings-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
  }

  .settings-close-btn:hover {
    background: var(--wpea-surface--border);
    color: var(--wpea-surface--text);
  }

  /* Tabs */
  .settings-tabs {
    display: flex;
    gap: 0;
    padding: 0 var(--wpea-space--md);
    background: var(--wpea-surface--elev-1);
    border-bottom: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
  }

  .settings-tab {
    padding: var(--wpea-space--sm) var(--wpea-space--md);
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    font-size: var(--wpea-text--sm);
    font-weight: 500;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .settings-tab:hover {
    color: var(--wpea-surface--text);
  }

  .settings-tab.active {
    color: var(--wpea-color--primary);
    border-bottom-color: var(--wpea-color--primary);
  }

  .settings-body {
    flex: 1;
    overflow: auto;
    padding: var(--wpea-space--md);
  }

  .settings-section {
    margin-bottom: var(--wpea-space--lg);
  }

  .settings-section-title {
    margin: 0 0 var(--wpea-space--sm) 0;
    font-size: var(--wpea-text--md);
    font-weight: 600;
    color: var(--wpea-surface--text);
    border-bottom: 1px solid var(--wpea-surface--border);
    padding-bottom: var(--wpea-space--xs);
  }

  .settings-group {
    display: flex;
    flex-direction: column;
    gap: var(--wpea-space--sm);
  }

  .settings-item {
    display: flex;
    align-items: center;
    gap: var(--wpea-space--sm);
    font-size: var(--wpea-text--sm);
    color: var(--wpea-surface--text);
  }

  /* Alignment row */
  .settings-align-row {
    display: flex;
    align-items: center;
    gap: var(--wpea-space--sm);
    font-size: var(--wpea-text--sm);
    color: var(--wpea-surface--text);
  }

  /* Three state switch */
  .three-state-switch {
    display: flex;
    gap: 2px;
    background: var(--wpea-surface--border);
    border-radius: var(--wpea-radius--sm);
    padding: 2px;
  }

  .align-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: var(--wpea-radius--sm);
    background: transparent;
    color: var(--wpea-surface--text-muted);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
  }

  .align-btn:hover {
    color: var(--wpea-surface--text);
  }

  .align-btn.active {
    background: var(--wpea-surface--bg);
    color: var(--wpea-color--primary);
    box-shadow: var(--wpea-shadow--sm);
  }

  .settings-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--wpea-space--sm);
    padding: var(--wpea-space--sm) var(--wpea-space--md);
    background: var(--wpea-surface--elev-1);
    border-top: 1px solid var(--wpea-surface--border);
    flex-shrink: 0;
  }

  .settings-btn {
    padding: var(--wpea-space--xs) var(--wpea-space--md);
    border: 1px solid var(--wpea-surface--border);
    border-radius: var(--wpea-radius--sm);
    font-size: var(--wpea-text--sm);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;
  }

  .settings-btn-secondary {
    background: var(--wpea-surface--bg);
    color: var(--wpea-surface--text);
  }

  .settings-btn-secondary:hover {
    background: var(--wpea-surface--elev-1);
  }

  /* Reset row */
  .settings-reset-row {
    display: flex;
    align-items: center;
    gap: var(--wpea-space--md);
    padding: var(--wpea-space--xs) 0;
  }

  .reset-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .reset-label {
    font-size: var(--wpea-text--sm);
    font-weight: 500;
    color: var(--wpea-surface--text);
  }

  .reset-description {
    font-size: var(--wpea-text--xs);
    color: var(--wpea-surface--text-muted);
  }
</style>

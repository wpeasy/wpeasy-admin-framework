<script lang="ts">
  import { closeSettingsModal, uiState, setShowActionPopovers, setShowContainerWidths } from '../state/ui.svelte';
  import {
    layout,
    setLeftPanelVisible,
    setRightPanelVisible,
    setBottomPanelVisible,
    setLeftIconBarVisible,
    setRightIconBarVisible,
    setBottomIconBarVisible,
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
  import {
    CloseIcon,
    AlignVerticalTopIcon,
    AlignVerticalCenterIcon,
    AlignVerticalBottomIcon,
    AlignHorizontalLeftIcon,
    AlignHorizontalCenterIcon,
    AlignHorizontalRightIcon
  } from './icons';

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
        <CloseIcon size={20} />
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
          <h3 class="settings-section-title">Shortcut Bar Visibility</h3>
          <div class="settings-group">
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.leftIconBarVisible}
                onchange={(checked) => setLeftIconBarVisible(checked)}
                label="Left Shortcuts"
              />
            </div>
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.rightIconBarVisible}
                onchange={(checked) => setRightIconBarVisible(checked)}
                label="Right Shortcuts"
              />
            </div>
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={layout.bottomIconBarVisible}
                onchange={(checked) => setBottomIconBarVisible(checked)}
                label="Bottom Shortcuts"
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
                  <AlignVerticalTopIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.leftShortcutAlign === 'center'}
                  onclick={() => setLeftShortcutAlign('center')}
                  title="Center"
                >
                  <AlignVerticalCenterIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.leftShortcutAlign === 'bottom'}
                  onclick={() => setLeftShortcutAlign('bottom')}
                  title="Bottom"
                >
                  <AlignVerticalBottomIcon size={16} />
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
                  <AlignVerticalTopIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.rightShortcutAlign === 'center'}
                  onclick={() => setRightShortcutAlign('center')}
                  title="Center"
                >
                  <AlignVerticalCenterIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.rightShortcutAlign === 'bottom'}
                  onclick={() => setRightShortcutAlign('bottom')}
                  title="Bottom"
                >
                  <AlignVerticalBottomIcon size={16} />
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
                  <AlignHorizontalLeftIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.bottomShortcutAlign === 'center'}
                  onclick={() => setBottomShortcutAlign('center')}
                  title="Center"
                >
                  <AlignHorizontalCenterIcon size={16} />
                </button>
                <button
                  class="align-btn"
                  class:active={layout.bottomShortcutAlign === 'right'}
                  onclick={() => setBottomShortcutAlign('right')}
                  title="Right"
                >
                  <AlignHorizontalRightIcon size={16} />
                </button>
              </div>
              <span>Bottom Shortcuts</span>
            </div>
          </div>
        </div>
      {:else if activeTab === 'general'}
        <!-- General Tab -->
        <div class="settings-section">
          <h3 class="settings-section-title">Action Icons</h3>
          <div class="settings-group">
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={uiState.showActionPopovers}
                onchange={(checked) => setShowActionPopovers(checked)}
                label="Show Action Popovers"
              />
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Content Frame</h3>
          <div class="settings-group">
            <div class="settings-switch-row">
              <Switch
                size="xs"
                checked={uiState.showContainerWidths}
                onchange={(checked) => setShowContainerWidths(checked)}
                label="Show Container Widths"
              />
            </div>
          </div>
        </div>

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

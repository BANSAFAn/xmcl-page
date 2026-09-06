---
date: 2026-09-06
title: "XMCL v0.69.0: Focus Mode Card Customization, Pack Grouping, Resumable Installs & Clock-Skew Resilient Auth"
description: "XMCL v0.69.0 is here! Discover in-depth commit analyses: customizable focus mode dashboard, shader & resource pack grouping, progressive and resumable instance installs, Forge recovery from stale outputs, DPoP clock-skew tolerance, world preview restorations, and non-blocking blueprint loading."
category: Release
author: BANSAFAn
authorRole: Technical Writer & Contributor
coAuthors:
  - name: CI010
    role: Core Creator & Lead Architect
    github: https://github.com/ci010
---

<PostDetail>

We are excited to announce the release of **[XMCL v0.69.0](https://github.com/Voxelum/x-minecraft-launcher/releases/tag/v0.69.0)**! This release brings major workflow enhancements for personalizing your instance dashboards, convenient organization for massive shader and resource pack libraries, rock-solid network and installation resilience, and deep cryptographic authentication hardening.

:::tip UPDATE NOW AVAILABLE
**XMCL v0.69.0** is ready for Windows, macOS, and Linux. Update directly via the built-in launcher updater, download standalone installers from **[GitHub Releases](https://github.com/Voxelum/x-minecraft-launcher/releases/tag/v0.69.0)**, or update via **[Flathub](https://flathub.org/en/apps/app.xmcl.voxelum)**.
:::

---

## 🚀 1. New Features & Workflow Enhancements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       XMCL v0.69.0 Highlight Overview                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  🎯 Focus Mode Personalization ──► Hide, restore & drag-reorder cards       │
│  📁 Pack Grouping Folders       ──► Organize hundreds of Shaders & Textures │
│  🔄 Resumable Installs          ──► Progressive recovery from network drops │
│  🛡️ DPoP Clock Skew Tolerance   ──► Flawless auth despite desynced clocks   │
│  ⚡ Non-Blocking Blueprints     ──► Zero UI freezes during instance parsing │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 Customizable Focus Mode Cards ([#1745](https://github.com/Voxelum/x-minecraft-launcher/pull/1745) / [`06df494`](https://github.com/Voxelum/x-minecraft-launcher/commit/06df494e6264ef29168f5769971e05117380f2d3))
Focus Mode is designed to provide a clean, distraction-free cockpit for your Minecraft instances. With v0.69.0, you now have complete control over your dashboard layout:
* **Drag-and-Drop Reordering**: Rearrange cards (Mod statistics, Quick Actions, Save Games, Server status, Screenshots) to match your workflow.
* **Hide & Restore Elements**: Hide cards you rarely use to keep your workspace minimal, and restore them at any time from the view customizer.
* **Persistent Layouts**: Your custom card arrangements are preserved across sessions and instances.

### 📁 Grouping for Resource Packs & Shader Packs ([`30b9f92`](https://github.com/Voxelum/x-minecraft-launcher/commit/30b9f92441064ef972ff8798a4d157170515f149))
Managing extensive texture and shader collections is now effortless:
* **Custom Category Groups**: Create custom folder groups for your shader packs (e.g., *Path Tracing*, *Performance*, *Cinematic*) and resource packs (e.g., *Faithful/Vanilla+*, *Fantasy*, *GUI Tweaks*).
* **Batch Operations**: Easily enable, disable, or filter entire categories without endlessly scrolling through flat lists of hundreds of `.zip` files.

### 📊 Correlated Runtime Telemetry ([`4b0a80c`](https://github.com/Voxelum/x-minecraft-launcher/commit/4b0a80c6252da833660ace1a3e7f37ecaff07278))
To diagnose complex startup and runtime crashes faster, anonymous opt-in telemetry events are now correlated across lifecycle phases. This allows our automated diagnostic copilot to pinpoint exact failure points (such as modloader bootstrap crashes vs. GPU shader driver faults) with greater precision while strictly adhering to privacy standards.

---

## 🐛 2. Deep Dive: Bug Fixes & Resilience Improvements

### 🔄 Progressive & Resumable Instance Installation ([`df78c00`](https://github.com/Voxelum/x-minecraft-launcher/commit/df78c00fc8569012695e285c46569e68bd76b109))
Large modpacks containing thousands of asset files and dozens of multi-megabyte dependencies can be interrupted by network drops or accidental window closures. The installation pipeline is now **fully progressive and resumable**:
* Downloads write to verifiable state journals.
* If interrupted, resuming the installation verifies existing hashes and picks up exactly where it left off, avoiding redundant downloads and bandwidth waste.

### 🔧 Self-Healing Forge Installs from Stale Outputs ([`24f2d7e`](https://github.com/Voxelum/x-minecraft-launcher/commit/24f2d7ed6056e8843c53a5d328902c5572c74992))
When Forge installations fail midway (e.g. during heavy Forge processor steps or power interruptions), stale and corrupted intermediate `.jar` outputs could permanently block future install attempts. XMCL now actively identifies stale Forge processor outputs, clears the broken cache, and cleanly finishes the installation process.

### 🛡️ DPoP Authentication Clock-Skew Recovery ([`1cdbf88`](https://github.com/Voxelum/x-minecraft-launcher/commit/1cdbf880089a72306bed0d20c756062062daee73))
XMCL utilizes modern **DPoP (Demonstrating Proof-of-Possession)** cryptographic tokens for zero-trust API security. Previously, if a user's system clock was desynchronized from standard NTP time by more than a few minutes, auth servers would reject cryptographic tokens due to expired timestamps. XMCL now dynamically measures clock skew against server response headers and automatically recalibrates token generation, ensuring smooth authentication even on devices with incorrect time settings.

### 🖼️ Restored World Previews & Screenshots ([`c4821c8`](https://github.com/Voxelum/x-minecraft-launcher/commit/c4821c82d66886e6e54e1982b022ece516212a75))
Fixed an issue where world save thumbnails (`icon.png`) failed to render in the Saves management tab. World previews now load reliably with cached image streams.

### ⚡ Non-Blocking Blueprint Loading ([`60af87f`](https://github.com/Voxelum/x-minecraft-launcher/commit/60af87f2a85db4160a03e159001e41cce875e7c4))
Parsing instance blueprint templates has been moved to background worker threads. Heavy blueprint processing no longer blocks main thread execution or stutters UI transitions.

### 🛍️ Market Item Navigation Fix ([`328f6e0`](https://github.com/Voxelum/x-minecraft-launcher/commit/328f6e0f0cd3e92d6aeff4d6a3931799800bce1a))
Resolved a routing bug in the Modrinth/CurseForge market browser where navigating back from certain omitted project items could break history state.

### 🧪 Node.js 22 LTS Core Test Suite Stability ([`b4ccd5d`](https://github.com/Voxelum/x-minecraft-launcher/commit/b4ccd5d6a2ca21debbbbbe6dc3b3169d842dd929))
Refactored internal unit and integration test harnesses for full compatibility with Node.js 22 LTS runtime environments, improving CI/CD build reliability and continuous testing speed.

---

## 📦 3. Summary of Commits

| Commit | Category | Description |
| :--- | :--- | :--- |
| [`06df494`](https://github.com/Voxelum/x-minecraft-launcher/commit/06df494e6264ef29168f5769971e05117380f2d3) | Feature | Customize, hide, restore and reorder cards in focus mode ([#1745](https://github.com/Voxelum/x-minecraft-launcher/pull/1745)) |
| [`30b9f92`](https://github.com/Voxelum/x-minecraft-launcher/commit/30b9f92441064ef972ff8798a4d157170515f149) | Feature | Support grouping resource and shader packs |
| [`4b0a80c`](https://github.com/Voxelum/x-minecraft-launcher/commit/4b0a80c6252da833660ace1a3e7f37ecaff07278) | Feature | Correlate runtime telemetry across execution phases |
| [`df78c00`](https://github.com/Voxelum/x-minecraft-launcher/commit/df78c00fc8569012695e285c46569e68bd76b109) | Bug Fix | Progressive and resumable instance installation |
| [`24f2d7e`](https://github.com/Voxelum/x-minecraft-launcher/commit/24f2d7ed6056e8843c53a5d328902c5572c74992) | Bug Fix | Recover Forge installs from stale and corrupted outputs |
| [`1cdbf88`](https://github.com/Voxelum/x-minecraft-launcher/commit/1cdbf880089a72306bed0d20c756062062daee73) | Bug Fix | Recover DPoP cryptographic authentication from clock skew |
| [`c4821c8`](https://github.com/Voxelum/x-minecraft-launcher/commit/c4821c82d66886e6e54e1982b022ece516212a75) | Bug Fix | Restore world save thumbnail and screenshot previews |
| [`60af87f`](https://github.com/Voxelum/x-minecraft-launcher/commit/60af87f2a85db4160a03e159001e41cce875e7c4) | Bug Fix | Non-blocking blueprint loading preventing main process freezes |
| [`328f6e0`](https://github.com/Voxelum/x-minecraft-launcher/commit/328f6e0f0cd3e92d6aeff4d6a3931799800bce1a) | Bug Fix | Restore navigation for omitted market items |
| [`b4ccd5d`](https://github.com/Voxelum/x-minecraft-launcher/commit/b4ccd5d6a2ca21debbbbbe6dc3b3169d842dd929) | Bug Fix | Stabilize core test suites on Node.js 22 LTS |

---

## 💬 Feedback & Community

Encountered an issue or want to suggest a new feature?
* 💬 Join the conversation on **[Discord](https://discord.gg/W5XVwYY7GQ)**.
* 🐛 Report bugs and submit feature requests on **[GitHub Issues](https://github.com/Voxelum/x-minecraft-launcher/issues)**.

Enjoy crafting and playing with **XMCL v0.69.0**! 🚀

</PostDetail>

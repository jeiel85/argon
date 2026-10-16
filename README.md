<div align="center">

# 🧪 ARGON-18 // Emergence Lab
### Neural Primordial Soup & Procedural Bio-Acoustic Particle Life Studio

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-Launch_ARGON--18_Studio-00f2fe?style=for-the-badge& labelColor=0a0d18)](https://jeiel85.github.io/argon/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_(100%25_Vanilla_JS)-10b981?style=for-the-badge&labelColor=0a0d18)](https://github.com/jeiel85/argon)
[![Engine](https://img.shields.io/badge/Physics-O(N)_Spatial_Hash_60FPS-a855f7?style=for-the-badge&labelColor=0a0d18)](https://github.com/jeiel85/argon)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge&labelColor=0a0d18)](./LICENSE)

<p align="center">
  <b>No React. No Three.js. No external audio files. No build step.</b><br/>
  Up to <b>4,200+ autonomous bio-luminescent agents</b> self-organizing into mitotic cells, plasma gliders, and predator-prey ecosystems at 60 FPS—paired with a real-time <b>WebAudio ambient synthesizer</b> driven directly by particle kinetics.
</p>

### 👉 [**体验 / Try the Interactive Live Demo: https://jeiel85.github.io/argon/**](https://jeiel85.github.io/argon/) 👈

</div>

---

## 🌟 Overview (English & 한국어)

**ARGON-18** is a zero-dependency interactive artificial life (ALife) laboratory built in a single shot to showcase high-density vanilla web engineering. By breaking Newton's third law ($F_{A \to B} \neq F_{B \to A}$) across 6 distinct species in a live **6×6 Interaction DNA Matrix**, simple pairwise forces spontaneously produce complex, lifelike macro-structures.

**ARGON-18**은 외부 라이브러리나 프레임워크(React, Three.js 등), 심지어 오디오 샘플 파일조차 일절 사용하지 않고 **순수 바닐라 JS와 수학만으로 구현한 창발적 인공생명(Particle Life) & 바이오 신디사이저 연구소**입니다. $O(N)$ 공간 해싱(Spatial Hashing)과 `TypedArray` 메모리 최적화를 통해 브라우저에서 최대 4,200개의 입자가 스스로 세포 분열(Mitosis), 포식자-피식자 추격전, 플라즈마 글라이더를 형성하며, 입자들의 운동 에너지가 실시간 WebAudio 우주 앰비언트 사운드로 변환됩니다.

---

## ✨ Key Highlights

### 1. ⚡ $O(N)$ Spatial-Hashed Particle Life Engine (`TypedArrays`)
- **Cache-Friendly SoA (Structure of Arrays)**: Positions, velocities, species IDs, and linked-list spatial cells are stored in pre-allocated `Float32Array` and `Int32Array` buffers—zero garbage collection pauses at 60 FPS.
- **Interactive 6×6 Species DNA Matrix**: Click or drag cells on the live matrix canvas to tune attraction (`+Green`) and repulsion (`-Red`) between any two species in real time, or hit `MUTATE` (`R`), `SYM`, or `CYCLE` to evolve new ecosystems.
- **Synaptic Bonds & Plasma Halos**: Real-time dynamic neural-like filaments connect high-affinity neighbors within sense radius $R_{\max}$.

### 2. 🎹 Procedural WebAudio Bio-Acoustic Synthesizer
- Built entirely with native `AudioContext`, dual-oscillator harmonic voices, stereo panning (`StereoPannerNode`), resonant low-pass filters (`BiquadFilterNode`), and a feedback delay space.
- **Kinetic Sonification**: Each of the 6 species controls one voice in a **D-Minor Pentatonic** harmonic field. As a species accelerates or clusters on the left/right side of the screen, its filter cutoff, detune, and stereo pan shift organically.

### 3. 📸 Built-in SNS & Threads Viral Export Suite
- **60fps WebM Video Recorder (`REC CLIP`)**: Captures a crisp 8 Mbps 60fps stream directly from the canvas via `MediaRecorder`—ready to upload straight to Threads, X, or Reels.
- **4K Poster Snapshot (`P`)**: Exports a high-resolution PNG complete with a custom scientific telemetry badge and your current `AR18` DNA seed code.
- **Zen Mode (`H`)**: Hides all HUD panels with a smooth glassmorphic transition for pure full-screen visual immersion.

---

## 🧬 Curated Emergent Ecosystems (Keys `1` – `6`)

| Preset | DNA Seed | Emergent Phenomenon |
| :--- | :--- | :--- |
| **`01. Mitosis Cells`** | `AR18-MITOSIS-9F2A` | Self-assembling multi-layered biological cells that grow, divide, and exchange membrane particles. |
| **`02. Predator-Prey`** | `AR18-HUNTERS-7C4E` | Cyclic rock-paper-scissors hunting chains where species endlessly chase and evade one another. |
| **`03. Plasma Gliders`** | `AR18-GLIDERS-3A8D` | Asymmetric aerodynamic clusters that self-propel across the toroidal canvas like spaceships. |
| **`04. Symbiotic Webs`** | `AR18-SYMBIO-5E1B` | Cooperative lattice networks and pulsing neural filaments bridging multiple species. |
| **`05. Orbital Rings`** | `AR18-ORBITAL-6D9F` | High-angular-momentum vortex rings and rotating concentric super-structures. |
| **`06. Primordial Chaos`** | `AR18-CHAOS-0X99` | High-energy turbulent plasma soup with rapid phase transitions and spontaneous nucleation. |

---

## 🎮 Controls & Keyboard Shortcuts

| Input / Shortcut | Function |
| :--- | :--- |
| **Left Click + Drag** | Engage active Cursor Force Field (`Orbital Vortex`, `Singularity Pull`, `Shockwave`, `Inject Life`, `Plasma Jet`) |
| **Right Click + Drag** | Instant radial Shockwave Repulsor |
| **Mouse Wheel** | Dynamically scale Cursor Force Field radius |
| **`Q` / `W` / `E` / `A` / `S`** | Switch Cursor Field (`Vortex` / `Attract` / `Repel` / `Inject Life` / `Plasma Jet`) |
| **`1` – `6`** | Load Curated Ecosystem Presets 01 through 06 |
| **`R`** | **Mutate DNA** — Randomize the 6×6 interaction matrix |
| **`C`** | **Reseed Positions** — Reset particles into concentric orbital rings |
| **`M`** | Toggle **WebAudio Bio-Acoustic Synthesizer** (`SYNTH: LIVE / OFF`) |
| **`Space`** | Pause / Resume physics simulation |
| **`P`** | Download watermarked **4K Poster PNG** |
| **`H`** | Toggle **Zen Mode** (hide/show UI panels) |

---

## 📐 Mathematical Formulation

Each particle $i$ of species $s_i \in \{0, \dots, 5\}$ interacts with neighboring particle $j$ of species $s_j$ within sense radius $R_{\max}$. Let $r = \|\mathbf{x}_j - \mathbf{x}_i\| / R_{\max} \in (0, 1)$. The normalized pairwise force profile $F(r)$ is defined piecewise:

$$F(r) = \begin{cases} 
\dfrac{r}{\beta} - 1 & \text{if } 0 < r < \beta \quad \text{(Universal Steric Core Repulsion)} \\[10pt]
M_{s_i, s_j} \left(1 - \dfrac{|2r - 1 - \beta|}{1 - \beta}\right) & \text{if } \beta \le r < 1 \quad \text{(Asymmetric Species DNA Affinity)}
\end{cases}$$

where:
- $\beta = 0.32$ is the universal short-range repulsion barrier preventing particle collapse.
- $M \in [-1, +1]^{6 \times 6}$ is the interaction genome matrix. Because $M_{a,b} \neq M_{b,a}$ in general, non-reciprocal forces inject net directional momentum, driving spontaneous locomotion and morphogenesis.

---

## 🛠️ Local Development

Zero build tools required. Clone and open directly:

```bash
git clone https://github.com/jeiel85/argon.git
cd argon

# Open index.html directly in any modern browser, or serve locally:
npx serve .
```

## 📂 Project Architecture

```text
argon/
├── index.html   # Cyberpunk scientific HUD, telemetry bar, 6x6 DNA dock & toolbars
├── style.css    # Glassmorphism UI, CRT scanline overlay & responsive layout
├── app.js       # O(N) spatial hash physics kernel, WebAudio synth & media exporters
├── LICENSE      # MIT Open Source License
└── README.md    # Documentation & mathematical specification
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

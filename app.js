/**
 * ARGON-18 // Neural Primordial Soup & Particle Life Studio
 * Zero-dependency O(N) spatial-hashed emergent artificial life & WebAudio synth.
 */

(() => {
  'use strict';

  // --- SPECIES PALETTE (6 Neon Bio-Luminescent Species) ---
  const NUM_SPECIES = 6;
  const SPECIES = [
    { name: 'Cyanon',   hex: '#00f2fe', r: 0,   g: 242, b: 254 },
    { name: 'Aether',   hex: '#c084fc', r: 192, g: 132, b: 252 },
    { name: 'Solaris',  hex: '#fb7185', r: 251, g: 113, b: 133 },
    { name: 'Viridian', hex: '#34d399', r: 52,  g: 211, b: 153 },
    { name: 'Helios',   hex: '#fbbf24', r: 251, g: 191, b: 36  },
    { name: 'Cobalt',   hex: '#60a5fa', r: 96,  g: 165, b: 250 }
  ];

  // --- CURATED GENOME PRESETS (6x6 Interaction Matrices) ---
  const PRESETS = {
    mitosis: {
      code: 'AR18-MITOSIS-9F2A',
      radius: 95,
      force: 1.15,
      friction: 0.86,
      trail: 0.88,
      matrix: [
        [ 0.85, -0.45,  0.20, -0.60,  0.00,  0.35],
        [ 0.40,  0.80, -0.50,  0.15, -0.40,  0.00],
        [-0.30,  0.45,  0.75, -0.45,  0.25, -0.50],
        [ 0.00, -0.35,  0.50,  0.85, -0.55,  0.20],
        [ 0.30,  0.00, -0.40,  0.45,  0.80, -0.45],
        [-0.45,  0.30,  0.00, -0.30,  0.50,  0.78]
      ]
    },
    hunters: {
      code: 'AR18-HUNTERS-7C4E',
      radius: 110,
      force: 1.35,
      friction: 0.84,
      trail: 0.86,
      matrix: [
        [ 0.25,  0.85, -0.80,  0.00,  0.00, -0.35],
        [-0.75,  0.30,  0.85, -0.80,  0.00,  0.00],
        [ 0.00, -0.75,  0.28,  0.85, -0.80,  0.00],
        [ 0.00,  0.00, -0.75,  0.30,  0.85, -0.80],
        [-0.80,  0.00,  0.00, -0.75,  0.28,  0.85],
        [ 0.85, -0.80,  0.00,  0.00, -0.75,  0.30]
      ]
    },
    gliders: {
      code: 'AR18-GLIDERS-3A8D',
      radius: 90,
      force: 1.40,
      friction: 0.88,
      trail: 0.92,
      matrix: [
        [ 0.15,  0.90, -0.40, -0.70,  0.20, -0.10],
        [-0.65,  0.10,  0.85, -0.30, -0.60,  0.25],
        [ 0.30, -0.60,  0.15,  0.92, -0.45, -0.50],
        [-0.50,  0.25, -0.65,  0.12,  0.88, -0.35],
        [-0.35, -0.55,  0.30, -0.60,  0.15,  0.90],
        [ 0.90, -0.35, -0.50,  0.25, -0.65,  0.12]
      ]
    },
    symbiosis: {
      code: 'AR18-SYMBIO-5E1B',
      radius: 105,
      force: 1.05,
      friction: 0.85,
      trail: 0.87,
      matrix: [
        [-0.25,  0.75,  0.65, -0.60, -0.40,  0.50],
        [ 0.75, -0.30,  0.60,  0.40, -0.65, -0.45],
        [ 0.65,  0.60, -0.25, -0.50,  0.55, -0.55],
        [-0.60,  0.40, -0.50, -0.20,  0.80,  0.70],
        [-0.40, -0.65,  0.55,  0.80, -0.25,  0.75],
        [ 0.50, -0.45, -0.55,  0.70,  0.75, -0.30]
      ]
    },
    vortex: {
      code: 'AR18-ORBITAL-6D9F',
      radius: 120,
      force: 1.25,
      friction: 0.89,
      trail: 0.91,
      matrix: [
        [ 0.55,  0.95, -0.90,  0.35, -0.40,  0.10],
        [-0.85,  0.50,  0.95, -0.85,  0.35, -0.30],
        [ 0.40, -0.85,  0.55,  0.95, -0.85,  0.35],
        [-0.35,  0.40, -0.85,  0.50,  0.95, -0.85],
        [-0.85, -0.35,  0.40, -0.85,  0.55,  0.95],
        [ 0.95, -0.85, -0.35,  0.40, -0.85,  0.50]
      ]
    },
    chaos: {
      code: 'AR18-CHAOS-0X99',
      radius: 100,
      force: 1.65,
      friction: 0.82,
      trail: 0.84,
      matrix: [
        [-0.50,  0.95, -0.95,  0.80, -0.75,  0.90],
        [-0.90, -0.45,  0.95, -0.85,  0.85, -0.80],
        [ 0.85, -0.90, -0.50,  0.95, -0.90,  0.75],
        [-0.80,  0.85, -0.90, -0.45,  0.95, -0.90],
        [ 0.90, -0.80,  0.85, -0.90, -0.50,  0.95],
        [-0.95,  0.90, -0.80,  0.85, -0.90, -0.45]
      ]
    }
  };

  // --- SIMULATION STATE ---
  const state = {
    count: 2400,
    maxCount: 4500,
    rMax: 95,
    forceGain: 1.15,
    friction: 0.86,
    trailAlpha: 0.88,
    paused: false,
    drawBonds: true,
    drawGlow: true,
    drawVectors: false,
    toroidalWrap: true,
    activeTool: 'vortex',
    brushRadius: 150,
    matrix: PRESETS.mitosis.matrix.map(row => [...row]),
    dnaCode: PRESETS.mitosis.code
  };

  // --- TYPED ARRAYS FOR CACHE-FRIENDLY 60FPS PHYSICS ---
  const MAX_PARTICLES = state.maxCount;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const vx = new Float32Array(MAX_PARTICLES);
  const vy = new Float32Array(MAX_PARTICLES);
  const pSpecies = new Uint8Array(MAX_PARTICLES);
  const pEnergy = new Float32Array(MAX_PARTICLES);

  // Spatial Grid Linked-List Buffers
  const nextParticle = new Int32Array(MAX_PARTICLES);
  let gridCols = 1;
  let gridRows = 1;
  let gridCellSize = 100;
  let gridHeads = new Int32Array(1);

  // Shockwave Ripples for Visual Feedback
  const ripples = [];

  // --- DOM REFERENCES ---
  const simCanvas = document.getElementById('simCanvas');
  const ctx = simCanvas.getContext('2d', { alpha: false });
  const matrixCanvas = document.getElementById('matrixCanvas');
  const mCtx = matrixCanvas.getContext('2d');
  const sparkCanvas = document.getElementById('energySparkline');
  const sCtx = sparkCanvas.getContext('2d');

  const fpsValEl = document.getElementById('fpsVal');
  const agentCountValEl = document.getElementById('agentCountVal');
  const entropyValEl = document.getElementById('entropyVal');
  const clusterValEl = document.getElementById('clusterVal');
  const dnaInput = document.getElementById('dnaInput');
  const toastEl = document.getElementById('toastMsg');

  let width = window.innerWidth;
  let height = window.innerHeight;

  // --- PROCEDURAL WEBAUDIO BIO-ACOUSTIC SYNTHESIZER ---
  class BioAcousticSynth {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.masterGain = null;
      this.voices = [];
      // Pentatonic Minor in D (D2, F2, G2, A2, C3, D3, F3, A3)
      this.freqs = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66];
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.0;

      // Stereo Delay Feedback Space
      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.38;
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.35;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1600;

      this.masterGain.connect(this.ctx.destination);
      this.masterGain.connect(delay);
      delay.connect(filter);
      filter.connect(feedback);
      feedback.connect(delay);
      filter.connect(this.ctx.destination);

      for (let i = 0; i < NUM_SPECIES; i++) {
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const voiceFilter = this.ctx.createBiquadFilter();
        const voiceGain = this.ctx.createGain();
        const panner = this.ctx.createStereoPanner();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = this.freqs[i];

        subOsc.type = 'sine';
        subOsc.frequency.value = this.freqs[i] * 1.5; // Fifth harmonic

        voiceFilter.type = 'lowpass';
        voiceFilter.frequency.value = 400;

        voiceGain.gain.value = 0.02;
        panner.pan.value = ((i / (NUM_SPECIES - 1)) * 2 - 1) * 0.7;

        osc.connect(voiceFilter);
        subOsc.connect(voiceFilter);
        voiceFilter.connect(voiceGain);
        voiceGain.connect(panner);
        panner.connect(this.masterGain);

        osc.start();
        subOsc.start();

        this.voices.push({ osc, subOsc, voiceFilter, voiceGain, panner, baseFreq: this.freqs[i] });
      }
    }

    toggle() {
      if (!this.ctx) this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      this.enabled = !this.enabled;
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.enabled ? 0.24 : 0.0, now, 0.25);
      return this.enabled;
    }

    updateFromSimulation(speciesSpeeds, speciesCenterX, mouseActive) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;

      for (let i = 0; i < NUM_SPECIES; i++) {
        const v = this.voices[i];
        const normSpeed = Math.min(1, speciesSpeeds[i] / 4.5);
        const targetGain = 0.015 + normSpeed * 0.065;
        const targetCutoff = 220 + normSpeed * 1800 + (mouseActive ? 500 : 0);
        const detune = normSpeed * 12;

        v.voiceGain.gain.setTargetAtTime(targetGain, now, 0.1);
        v.voiceFilter.frequency.setTargetAtTime(targetCutoff, now, 0.1);
        v.osc.detune.setTargetAtTime(detune, now, 0.15);

        const pan = Math.max(-0.85, Math.min(0.85, (speciesCenterX[i] / width) * 2 - 1));
        v.panner.pan.setTargetAtTime(pan, now, 0.2);
      }
    }

    triggerPulse(freqMultiplier = 1.0) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220 * freqMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(55 * freqMultiplier, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.36);
    }
  }

  const synth = new BioAcousticSynth();

  // --- INITIALIZE & RESIZE CANVAS ---
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    simCanvas.width = width;
    simCanvas.height = height;

    ctx.fillStyle = '#05060b';
    ctx.fillRect(0, 0, width, height);
    rebuildSpatialGrid();
  }

  function rebuildSpatialGrid() {
    gridCellSize = Math.max(40, Math.ceil(state.rMax));
    gridCols = Math.max(1, Math.ceil(width / gridCellSize));
    gridRows = Math.max(1, Math.ceil(height / gridCellSize));
    const totalCells = gridCols * gridRows;
    if (gridHeads.length < totalCells) {
      gridHeads = new Int32Array(totalCells);
    }
  }

  // --- SEED PARTICLES ---
  function seedParticles(mode = 'rings') {
    const cx = width * 0.54;
    const cy = height * 0.5;
    const maxR = Math.min(width, height) * 0.38;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const s = i % NUM_SPECIES;
      pSpecies[i] = s;

      if (mode === 'rings') {
        const ringR = ((s + 0.6) / NUM_SPECIES) * maxR + (Math.random() - 0.5) * 45;
        const angle = Math.random() * Math.PI * 2;
        px[i] = cx + Math.cos(angle) * ringR;
        py[i] = cy + Math.sin(angle) * ringR;
        vx[i] = -Math.sin(angle) * 0.8;
        vy[i] = Math.cos(angle) * 0.8;
      } else {
        px[i] = Math.random() * width;
        py[i] = Math.random() * height;
        vx[i] = (Math.random() - 0.5) * 1.5;
        vy[i] = (Math.random() - 0.5) * 1.5;
      }
      pEnergy[i] = 0.2;
    }

    ripples.push({ x: cx, y: cy, r: 10, maxR: maxR * 1.1, alpha: 0.7, color: '#00f2fe' });
  }

  // --- GENERATE DNA CODE STRING ---
  function generateDnaHash() {
    let sum = 0;
    for (let i = 0; i < NUM_SPECIES; i++) {
      for (let j = 0; j < NUM_SPECIES; j++) {
        sum = (sum * 31 + Math.round((state.matrix[i][j] + 1) * 50)) & 0xffff;
      }
    }
    const hex = sum.toString(16).toUpperCase().padStart(4, '0');
    state.dnaCode = `AR18-GEN-${hex}-${state.rMax}`;
    dnaInput.value = state.dnaCode;
  }

  // --- DRAW 6x6 FORCE MATRIX UI ---
  function renderMatrixUI() {
    const size = matrixCanvas.width;
    const pad = 22;
    const cell = (size - pad) / NUM_SPECIES;

    mCtx.clearRect(0, 0, size, size);

    // Column & Row Species Dots
    for (let i = 0; i < NUM_SPECIES; i++) {
      const c = SPECIES[i].hex;
      // Top header dot
      mCtx.fillStyle = c;
      mCtx.beginPath();
      mCtx.arc(pad + i * cell + cell * 0.5, 10, 4.5, 0, Math.PI * 2);
      mCtx.fill();

      // Left row dot
      mCtx.beginPath();
      mCtx.arc(10, pad + i * cell + cell * 0.5, 4.5, 0, Math.PI * 2);
      mCtx.fill();
    }

    // Matrix Cells
    for (let r = 0; r < NUM_SPECIES; r++) {
      for (let c = 0; c < NUM_SPECIES; c++) {
        const val = state.matrix[r][c];
        const x = pad + c * cell + 2;
        const y = pad + r * cell + 2;
        const w = cell - 4;

        if (val >= 0) {
          const intensity = Math.min(1, val);
          mCtx.fillStyle = `rgba(16, 185, 129, ${0.12 + intensity * 0.78})`;
          mCtx.strokeStyle = `rgba(52, 211, 153, ${0.25 + intensity * 0.6})`;
        } else {
          const intensity = Math.min(1, -val);
          mCtx.fillStyle = `rgba(244, 63, 94, ${0.12 + intensity * 0.78})`;
          mCtx.strokeStyle = `rgba(251, 113, 133, ${0.25 + intensity * 0.6})`;
        }

        mCtx.beginPath();
        mCtx.roundRect(x, y, w, w, 5);
        mCtx.fill();
        mCtx.lineWidth = 1;
        mCtx.stroke();

        // Value text
        mCtx.fillStyle = Math.abs(val) > 0.45 ? '#ffffff' : '#94a3b8';
        mCtx.font = '600 9px "JetBrains Mono", monospace';
        mCtx.textAlign = 'center';
        mCtx.textBaseline = 'middle';
        mCtx.fillText((val >= 0 ? '+' : '') + val.toFixed(1), x + w * 0.5, y + w * 0.5);
      }
    }
  }

  // --- INTERACT WITH 6x6 MATRIX ---
  let isDraggingMatrix = false;
  let activeMatrixCell = null;

  function handleMatrixPointer(e, isStart = false) {
    const rect = matrixCanvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (matrixCanvas.width / rect.width);
    const my = (e.clientY - rect.top) * (matrixCanvas.height / rect.height);
    const pad = 22;
    const cell = (matrixCanvas.width - pad) / NUM_SPECIES;

    const c = Math.floor((mx - pad) / cell);
    const r = Math.floor((my - pad) / cell);

    if (r >= 0 && r < NUM_SPECIES && c >= 0 && c < NUM_SPECIES) {
      if (isStart) {
        activeMatrixCell = { r, c, startY: e.clientY, startVal: state.matrix[r][c] };
        // Cycle value on simple click
        if (e.button === 2) {
          state.matrix[r][c] = 0;
        }
      } else if (activeMatrixCell) {
        const dy = activeMatrixCell.startY - e.clientY;
        if (Math.abs(dy) > 3) {
          const nextVal = Math.max(-1, Math.min(1, activeMatrixCell.startVal + dy * 0.015));
          state.matrix[activeMatrixCell.r][activeMatrixCell.c] = Math.round(nextVal * 20) / 20;
        }
      }
      generateDnaHash();
      renderMatrixUI();
    }
  }

  matrixCanvas.addEventListener('mousedown', (e) => {
    isDraggingMatrix = true;
    handleMatrixPointer(e, true);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingMatrix) handleMatrixPointer(e, false);
  });

  window.addEventListener('mouseup', (e) => {
    if (isDraggingMatrix && activeMatrixCell) {
      const dy = Math.abs(activeMatrixCell.startY - e.clientY);
      if (dy <= 3 && e.button === 0) {
        // Click step +0.35 wrap
        let v = state.matrix[activeMatrixCell.r][activeMatrixCell.c] + 0.35;
        if (v > 1.0) v = -0.9;
        state.matrix[activeMatrixCell.r][activeMatrixCell.c] = Math.round(v * 20) / 20;
        generateDnaHash();
        renderMatrixUI();
      }
    }
    isDraggingMatrix = false;
    activeMatrixCell = null;
  });

  matrixCanvas.addEventListener('contextmenu', e => e.preventDefault());

  // --- CURSOR FIELD INTERACTION ---
  const pointer = {
    x: width * 0.5,
    y: height * 0.5,
    vx: 0,
    vy: 0,
    down: false,
    rightDown: false
  };

  simCanvas.addEventListener('pointerdown', (e) => {
    pointer.down = true;
    pointer.rightDown = e.button === 2;
    pointer.x = e.clientX;
    pointer.y = e.clientY;

    if (state.activeTool === 'spawn' && !pointer.rightDown) {
      injectParticleBurst(pointer.x, pointer.y, 120);
    } else {
      ripples.push({
        x: pointer.x,
        y: pointer.y,
        r: 8,
        maxR: state.brushRadius * 1.15,
        alpha: 0.65,
        color: pointer.rightDown ? '#fb7185' : '#00f2fe'
      });
      synth.triggerPulse(pointer.rightDown ? 0.7 : 1.25);
    }
  });

  window.addEventListener('pointermove', (e) => {
    pointer.vx = e.clientX - pointer.x;
    pointer.vy = e.clientY - pointer.y;
    pointer.x = e.clientX;
    pointer.y = e.clientY;

    if (pointer.down && state.activeTool === 'spawn') {
      injectParticleBurst(pointer.x, pointer.y, 16);
    }
  });

  window.addEventListener('pointerup', () => {
    pointer.down = false;
    pointer.rightDown = false;
  });

  simCanvas.addEventListener('contextmenu', e => e.preventDefault());

  simCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    state.brushRadius = Math.max(50, Math.min(360, state.brushRadius - e.deltaY * 0.15));
  }, { passive: false });

  function injectParticleBurst(x, y, amount) {
    const species = Math.floor(Math.random() * NUM_SPECIES);
    for (let k = 0; k < amount; k++) {
      const idx = Math.floor(Math.random() * state.count);
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.random() * 35;
      px[idx] = (x + Math.cos(ang) * rad + width) % width;
      py[idx] = (y + Math.sin(ang) * rad + height) % height;
      vx[idx] = Math.cos(ang) * (2 + Math.random() * 3);
      vy[idx] = Math.sin(ang) * (2 + Math.random() * 3);
      pSpecies[idx] = species;
      pEnergy[idx] = 1.0;
    }
    ripples.push({ x, y, r: 5, maxR: 90, alpha: 0.8, color: SPECIES[species].hex });
    synth.triggerPulse(1.5);
  }

  // --- O(N) SPATIAL HASHING & PARTICLE LIFE KERNEL ---
  const speciesSpeedAccum = new Float32Array(NUM_SPECIES);
  const speciesCountAccum = new Uint16Array(NUM_SPECIES);
  const speciesCenterX = new Float32Array(NUM_SPECIES);

  // Bond lines buffer for rendering synaptic links
  const MAX_BONDS = 2200;
  const bondX1 = new Float32Array(MAX_BONDS);
  const bondY1 = new Float32Array(MAX_BONDS);
  const bondX2 = new Float32Array(MAX_BONDS);
  const bondY2 = new Float32Array(MAX_BONDS);
  const bondSpecies = new Uint8Array(MAX_BONDS);
  let activeBondCount = 0;

  function stepPhysics() {
    const N = state.count;
    const rMax = state.rMax;
    const rMaxSq = rMax * rMax;
    const invRMax = 1.0 / rMax;
    const beta = 0.32; // Universal core repulsion threshold
    const invOneMinusBeta = 1.0 / (1.0 - beta);
    const forceScale = state.forceGain * 0.55;
    const friction = state.friction;
    const wrap = state.toroidalWrap;

    if (gridCellSize !== Math.max(40, Math.ceil(rMax))) {
      rebuildSpatialGrid();
    }

    const totalCells = gridCols * gridRows;
    gridHeads.fill(-1, 0, totalCells);

    // 1. Insert particles into Spatial Hash Grid
    for (let i = 0; i < N; i++) {
      let cx = Math.floor(px[i] / gridCellSize);
      let cy = Math.floor(py[i] / gridCellSize);
      if (cx < 0) cx = 0; else if (cx >= gridCols) cx = gridCols - 1;
      if (cy < 0) cy = 0; else if (cy >= gridRows) cy = gridRows - 1;

      const cellIdx = cy * gridCols + cx;
      nextParticle[i] = gridHeads[cellIdx];
      gridHeads[cellIdx] = i;
    }

    speciesSpeedAccum.fill(0);
    speciesCountAccum.fill(0);
    speciesCenterX.fill(0);
    activeBondCount = 0;

    const collectBonds = state.drawBonds;
    const bondDistSq = (rMax * 0.42) * (rMax * 0.42);

    // 2. Evaluate pairwise forces across 3x3 neighbor cells
    for (let i = 0; i < N; i++) {
      const xi = px[i];
      const yi = py[i];
      const si = pSpecies[i];
      const matrixRow = state.matrix[si];

      let fx = 0;
      let fy = 0;
      let localNeighbors = 0;

      const cx = Math.floor(xi / gridCellSize);
      const cy = Math.floor(yi / gridCellSize);

      for (let dyCell = -1; dyCell <= 1; dyCell++) {
        let ny = cy + dyCell;
        let yOffset = 0;
        if (ny < 0) {
          if (!wrap) continue;
          ny += gridRows;
          yOffset = -height;
        } else if (ny >= gridRows) {
          if (!wrap) continue;
          ny -= gridRows;
          yOffset = height;
        }

        const rowOffset = ny * gridCols;

        for (let dxCell = -1; dxCell <= 1; dxCell++) {
          let nx = cx + dxCell;
          let xOffset = 0;
          if (nx < 0) {
            if (!wrap) continue;
            nx += gridCols;
            xOffset = -width;
          } else if (nx >= gridCols) {
            if (!wrap) continue;
            nx -= gridCols;
            xOffset = width;
          }

          let j = gridHeads[rowOffset + nx];
          while (j !== -1) {
            if (i !== j) {
              const dx = (px[j] + xOffset) - xi;
              const dy = (py[j] + yOffset) - yi;
              const dSq = dx * dx + dy * dy;

              if (dSq > 0.0001 && dSq < rMaxSq) {
                const d = Math.sqrt(dSq);
                const rNorm = d * invRMax;
                let f = 0;

                if (rNorm < beta) {
                  // Smooth universal short-range steric repulsion
                  f = (rNorm / beta) - 1.0;
                } else {
                  // Piecewise linear attraction/repulsion peak
                  const attraction = matrixRow[pSpecies[j]];
                  f = attraction * (1.0 - Math.abs(2.0 * rNorm - 1.0 - beta) * invOneMinusBeta);
                }

                const invD = (f * forceScale) / d;
                fx += dx * invD;
                fy += dy * invD;
                localNeighbors++;

                // Record synaptic bond for close high-affinity neighbors
                if (
                  collectBonds &&
                  i < j &&
                  activeBondCount < MAX_BONDS &&
                  dSq < bondDistSq &&
                  Math.abs(xOffset) === 0 &&
                  Math.abs(yOffset) === 0 &&
                  (i & 3) === 0
                ) {
                  bondX1[activeBondCount] = xi;
                  bondY1[activeBondCount] = yi;
                  bondX2[activeBondCount] = px[j];
                  bondY2[activeBondCount] = py[j];
                  bondSpecies[activeBondCount] = si;
                  activeBondCount++;
                }
              }
            }
            j = nextParticle[j];
          }
        }
      }

      // 3. Cursor Force Field Interaction
      if (pointer.down) {
        const mdx = pointer.x - xi;
        const mdy = pointer.y - yi;
        const mdSq = mdx * mdx + mdy * mdy;
        const bRad = state.brushRadius;
        if (mdSq < bRad * bRad && mdSq > 1) {
          const md = Math.sqrt(mdSq);
          const falloff = 1.0 - md / bRad;
          const nx = mdx / md;
          const ny = mdy / md;

          if (pointer.rightDown || state.activeTool === 'repel') {
            fx -= nx * falloff * 3.8;
            fy -= ny * falloff * 3.8;
          } else if (state.activeTool === 'attract') {
            fx += nx * falloff * 2.8;
            fy += ny * falloff * 2.8;
          } else if (state.activeTool === 'vortex') {
            // Tangential swirl + gentle inward pull
            fx += (-ny * 2.6 + nx * 0.65) * falloff;
            fy += ( nx * 2.6 + ny * 0.65) * falloff;
          } else if (state.activeTool === 'slice') {
            fx += pointer.vx * 0.28 * falloff;
            fy += pointer.vy * 0.28 * falloff;
          }
        }
      }

      // 4. Integrate Velocity & Position
      let nvx = (vx[i] + fx) * friction;
      let nvy = (vy[i] + fy) * friction;

      // Clamp terminal velocity for stability
      const speedSq = nvx * nvx + nvy * nvy;
      if (speedSq > 64) {
        const scale = 8.0 / Math.sqrt(speedSq);
        nvx *= scale;
        nvy *= scale;
      }

      vx[i] = nvx;
      vy[i] = nvy;

      let nextX = xi + nvx;
      let nextY = yi + nvy;

      if (wrap) {
        if (nextX < 0) nextX += width; else if (nextX >= width) nextX -= width;
        if (nextY < 0) nextY += height; else if (nextY >= height) nextY -= height;
      } else {
        const margin = 16;
        if (nextX < margin) { nextX = margin; vx[i] *= -0.8; }
        else if (nextX > width - margin) { nextX = width - margin; vx[i] *= -0.8; }
        if (nextY < margin) { nextY = margin; vy[i] *= -0.8; }
        else if (nextY > height - margin) { nextY = height - margin; vy[i] *= -0.8; }
      }

      px[i] = nextX;
      py[i] = nextY;

      const speed = Math.sqrt(speedSq);
      pEnergy[i] = Math.min(1.0, speed * 0.22 + localNeighbors * 0.012);

      speciesSpeedAccum[si] += speed;
      speciesCountAccum[si]++;
      speciesCenterX[si] += nextX;
    }

    // Update Bio-Acoustic Synth with real-time species kinetics
    for (let s = 0; s < NUM_SPECIES; s++) {
      const c = Math.max(1, speciesCountAccum[s]);
      speciesSpeedAccum[s] /= c;
      speciesCenterX[s] /= c;
    }
    synth.updateFromSimulation(speciesSpeedAccum, speciesCenterX, pointer.down);
  }

  // --- RENDER SIMULATION FRAME ---
  function renderFrame() {
    // 1. Phosphor Trail Fade
    const fadeAlpha = 1.0 - state.trailAlpha;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(5, 6, 11, ${fadeAlpha.toFixed(3)})`;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';

    // 2. Draw Synaptic Bonds
    if (state.drawBonds && activeBondCount > 0) {
      ctx.lineWidth = 0.75;
      for (let s = 0; s < NUM_SPECIES; s++) {
        const sp = SPECIES[s];
        ctx.strokeStyle = `rgba(${sp.r}, ${sp.g}, ${sp.b}, 0.14)`;
        ctx.beginPath();
        for (let b = 0; b < activeBondCount; b++) {
          if (bondSpecies[b] === s) {
            ctx.moveTo(bondX1[b], bondY1[b]);
            ctx.lineTo(bondX2[b], bondY2[b]);
          }
        }
        ctx.stroke();
      }
    }

    // 3. Draw Particles Batched by Species for Maximum Canvas Throughput
    const N = state.count;
    const showGlow = state.drawGlow;
    const showVec = state.drawVectors;

    for (let s = 0; s < NUM_SPECIES; s++) {
      const sp = SPECIES[s];

      // Outer Bio-Plasma Halo
      if (showGlow) {
        ctx.fillStyle = `rgba(${sp.r}, ${sp.g}, ${sp.b}, 0.16)`;
        ctx.beginPath();
        for (let i = s; i < N; i += NUM_SPECIES) {
          if (pSpecies[i] !== s) continue;
          const x = px[i];
          const y = py[i];
          const r = 4.2 + pEnergy[i] * 4.5;
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Core Particle Body
      ctx.fillStyle = sp.hex;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        if (pSpecies[i] !== s) continue;
        const x = px[i];
        const y = py[i];
        const r = 1.7 + pEnergy[i] * 1.1;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();

      // Velocity Vectors
      if (showVec) {
        ctx.strokeStyle = `rgba(${sp.r}, ${sp.g}, ${sp.b}, 0.45)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          if (pSpecies[i] !== s) continue;
          const x = px[i];
          const y = py[i];
          ctx.moveTo(x, y);
          ctx.lineTo(x - vx[i] * 3.2, y - vy[i] * 3.2);
        }
        ctx.stroke();
      }
    }

    // 4. Draw Shockwave Ripples & Cursor Field Indicator
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.maxR - rp.r) * 0.12;
      rp.alpha *= 0.92;
      if (rp.alpha < 0.02) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = rp.color;
      ctx.globalAlpha = rp.alpha;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    if (pointer.down) {
      ctx.strokeStyle = pointer.rightDown ? 'rgba(251, 113, 133, 0.45)' : 'rgba(0, 242, 254, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, state.brushRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // --- TELEMETRY & SPARKLINE ---
  const energyHistory = new Array(45).fill(0.3);
  let frameCounter = 0;
  let lastFpsTime = performance.now();
  let currentFps = 60;

  function updateTelemetry(now) {
    frameCounter++;
    if (now - lastFpsTime >= 400) {
      currentFps = Math.min(60, Math.round((frameCounter * 1000) / (now - lastFpsTime)));
      fpsValEl.textContent = currentFps;
      frameCounter = 0;
      lastFpsTime = now;

      // Compute average kinetic energy & entropy proxy
      let avgSpeed = 0;
      for (let s = 0; s < NUM_SPECIES; s++) avgSpeed += speciesSpeedAccum[s];
      avgSpeed /= NUM_SPECIES;

      const normKe = Math.min(1, avgSpeed / 3.0);
      energyHistory.push(normKe);
      if (energyHistory.length > 45) energyHistory.shift();

      const entropy = Math.min(0.99, Math.max(0.12, (avgSpeed * 0.35 + (activeBondCount / MAX_BONDS) * 0.45))).toFixed(2);
      entropyValEl.textContent = entropy;

      // Estimate active macro-clusters from occupied high-density grid cells
      let denseCells = 0;
      const totalCells = gridCols * gridRows;
      for (let c = 0; c < totalCells; c++) {
        if (gridHeads[c] !== -1 && nextParticle[gridHeads[c]] !== -1) denseCells++;
      }
      clusterValEl.textContent = Math.max(1, Math.round(denseCells * 0.22));

      drawSparkline();
    }
  }

  function drawSparkline() {
    const w = sparkCanvas.width;
    const h = sparkCanvas.height;
    sCtx.clearRect(0, 0, w, h);

    sCtx.strokeStyle = '#00f2fe';
    sCtx.lineWidth = 1.5;
    sCtx.beginPath();
    for (let i = 0; i < energyHistory.length; i++) {
      const x = (i / (energyHistory.length - 1)) * w;
      const y = h - 3 - energyHistory[i] * (h - 6);
      if (i === 0) sCtx.moveTo(x, y);
      else sCtx.lineTo(x, y);
    }
    sCtx.stroke();
  }

  // --- UI CONTROLS & BINDINGS ---
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  function applyPreset(presetKey) {
    const p = PRESETS[presetKey];
    if (!p) return;

    state.rMax = p.radius;
    state.forceGain = p.force;
    state.friction = p.friction;
    state.trailAlpha = p.trail;
    state.matrix = p.matrix.map(r => [...r]);
    state.dnaCode = p.code;

    // Sync sliders
    document.getElementById('radiusSlider').value = state.rMax;
    document.getElementById('radiusSliderVal').textContent = `${state.rMax} px`;
    document.getElementById('forceSlider').value = state.forceGain;
    document.getElementById('forceSliderVal').textContent = `${state.forceGain.toFixed(2)}x`;
    document.getElementById('frictionSlider').value = state.friction;
    document.getElementById('frictionSliderVal').textContent = state.friction.toFixed(2);
    document.getElementById('trailSlider').value = state.trailAlpha;
    document.getElementById('trailSliderVal').textContent = state.trailAlpha.toFixed(2);
    dnaInput.value = state.dnaCode;

    document.querySelectorAll('.preset-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetKey);
    });

    rebuildSpatialGrid();
    renderMatrixUI();
    synth.triggerPulse(1.1);
    showToast(`Loaded Ecosystem: ${presetKey.toUpperCase()}`);
  }

  // Preset Buttons
  document.querySelectorAll('.preset-chip').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  // Matrix Generators
  document.getElementById('randomMatrixBtn').addEventListener('click', () => {
    for (let r = 0; r < NUM_SPECIES; r++) {
      for (let c = 0; c < NUM_SPECIES; c++) {
        state.matrix[r][c] = Math.round((Math.random() * 2 - 1) * 20) / 20;
      }
    }
    document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
    generateDnaHash();
    renderMatrixUI();
    synth.triggerPulse(1.4);
    showToast('Mutated 6×6 Genome Matrix');
  });

  document.getElementById('symmetricMatrixBtn').addEventListener('click', () => {
    for (let r = 0; r < NUM_SPECIES; r++) {
      for (let c = r; c < NUM_SPECIES; c++) {
        const val = Math.round((Math.random() * 1.8 - 0.8) * 20) / 20;
        state.matrix[r][c] = val;
        state.matrix[c][r] = val;
      }
    }
    generateDnaHash();
    renderMatrixUI();
    showToast('Symmetric Crystal DNA Generated');
  });

  document.getElementById('cyclicMatrixBtn').addEventListener('click', () => {
    for (let r = 0; r < NUM_SPECIES; r++) {
      for (let c = 0; c < NUM_SPECIES; c++) {
        if (r === c) state.matrix[r][c] = 0.35;
        else if (c === (r + 1) % NUM_SPECIES) state.matrix[r][c] = 0.90;
        else if (r === (c + 1) % NUM_SPECIES) state.matrix[r][c] = -0.85;
        else state.matrix[r][c] = -0.25;
      }
    }
    generateDnaHash();
    renderMatrixUI();
    showToast('Cyclic Predator-Prey Chain Generated');
  });

  // Sliders
  document.getElementById('popSlider').addEventListener('input', (e) => {
    state.count = parseInt(e.target.value, 10);
    document.getElementById('popSliderVal').textContent = state.count;
    agentCountValEl.textContent = state.count.toLocaleString();
  });

  document.getElementById('radiusSlider').addEventListener('input', (e) => {
    state.rMax = parseInt(e.target.value, 10);
    document.getElementById('radiusSliderVal').textContent = `${state.rMax} px`;
    generateDnaHash();
  });

  document.getElementById('forceSlider').addEventListener('input', (e) => {
    state.forceGain = parseFloat(e.target.value);
    document.getElementById('forceSliderVal').textContent = `${state.forceGain.toFixed(2)}x`;
  });

  document.getElementById('frictionSlider').addEventListener('input', (e) => {
    state.friction = parseFloat(e.target.value);
    document.getElementById('frictionSliderVal').textContent = state.friction.toFixed(2);
  });

  document.getElementById('trailSlider').addEventListener('input', (e) => {
    state.trailAlpha = parseFloat(e.target.value);
    document.getElementById('trailSliderVal').textContent = state.trailAlpha.toFixed(2);
  });

  // Render Mode Pills
  const bindToggle = (id, prop) => {
    const btn = document.getElementById(id);
    btn.addEventListener('click', () => {
      state[prop] = !state[prop];
      btn.classList.toggle('active', state[prop]);
    });
  };
  bindToggle('toggleBondsBtn', 'drawBonds');
  bindToggle('toggleGlowBtn', 'drawGlow');
  bindToggle('toggleVectorsBtn', 'drawVectors');
  bindToggle('toggleWrapBtn', 'toroidalWrap');

  // Pause & Reseed
  const pauseBtn = document.getElementById('pauseSimBtn');
  pauseBtn.addEventListener('click', () => {
    state.paused = !state.paused;
    pauseBtn.textContent = state.paused ? 'RESUME (SPACE)' : 'PAUSE (SPACE)';
  });

  document.getElementById('reseedPosBtn').addEventListener('click', () => {
    seedParticles('rings');
    showToast('Particles Reseeded in Orbital Rings');
  });

  // Copy DNA Code
  const copyDna = () => {
    navigator.clipboard?.writeText(state.dnaCode);
    showToast(`Copied Genome: ${state.dnaCode}`);
  };
  document.getElementById('copyDnaBtn').addEventListener('click', copyDna);
  dnaInput.addEventListener('click', copyDna);

  // Audio Synth Toggle
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioBtnText = document.getElementById('audioBtnText');
  audioBtn.addEventListener('click', () => {
    const active = synth.toggle();
    audioBtn.classList.toggle('active', active);
    audioBtnText.textContent = active ? 'SYNTH: LIVE' : 'SYNTH: OFF';
    showToast(active ? 'Bio-Acoustic Ambient Synth Activated' : 'Audio Synth Muted');
  });

  // Zen Mode & Dock Collapse
  document.getElementById('zenModeBtn').addEventListener('click', () => {
    document.body.classList.toggle('zen-mode');
    showToast(document.body.classList.contains('zen-mode') ? 'Zen Mode (Press H to restore UI)' : 'UI Restored');
  });

  const dockBody = document.getElementById('dockBody');
  const collapseDockBtn = document.getElementById('collapseDockBtn');
  collapseDockBtn.addEventListener('click', () => {
    const hidden = dockBody.style.display === 'none';
    dockBody.style.display = hidden ? 'flex' : 'none';
    collapseDockBtn.textContent = hidden ? '−' : '+';
  });

  // Bottom Cursor Tool Selector
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTool = btn.dataset.tool;
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  // --- 4K SNS POSTER SNAPSHOT GENERATOR (WITH TELEMETRY WATERMARK) ---
  document.getElementById('snapshotBtn').addEventListener('click', () => {
    const outCanvas = document.createElement('canvas');
    outCanvas.width = width;
    outCanvas.height = height;
    const oCtx = outCanvas.getContext('2d');

    // Copy simulation artwork
    oCtx.drawImage(simCanvas, 0, 0);

    // Draw sleek scientific watermark badge in bottom-right
    const pad = 28;
    const boxW = 330;
    const boxH = 68;
    const bx = width - boxW - pad;
    const by = height - boxH - pad;

    oCtx.fillStyle = 'rgba(8, 11, 22, 0.82)';
    oCtx.strokeStyle = 'rgba(0, 242, 254, 0.45)';
    oCtx.lineWidth = 1.5;
    oCtx.beginPath();
    oCtx.roundRect(bx, by, boxW, boxH, 12);
    oCtx.fill();
    oCtx.stroke();

    oCtx.fillStyle = '#00f2fe';
    oCtx.font = '700 15px "Space Grotesk", sans-serif';
    oCtx.fillText('ARGON-18 // EMERGENCE LAB', bx + 16, by + 26);

    oCtx.fillStyle = '#94a3b8';
    oCtx.font = '500 11px "JetBrains Mono", monospace';
    oCtx.fillText(`DNA: ${state.dnaCode}  |  N=${state.count}`, bx + 16, by + 48);

    const link = document.createElement('a');
    link.download = `${state.dnaCode.toLowerCase()}-poster.png`;
    link.href = outCanvas.toDataURL('image/png');
    link.click();
    showToast('Saved High-Res Poster PNG!');
  });

  // --- WEBM VIDEO CLIP RECORDER FOR THREADS / SNS ---
  let mediaRecorder = null;
  let recordedChunks = [];
  const recordBtn = document.getElementById('recordBtn');
  const recordBtnText = document.getElementById('recordBtnText');

  recordBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      return;
    }

    try {
      const stream = simCanvas.captureStream(60);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
      recordedChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.dnaCode.toLowerCase()}-clip.webm`;
        a.click();
        URL.revokeObjectURL(url);
        recordBtn.classList.remove('recording');
        recordBtnText.textContent = 'REC CLIP';
        showToast('60fps WebM Clip Exported for SNS!');
      };

      mediaRecorder.start();
      recordBtn.classList.add('recording');
      recordBtnText.textContent = 'STOP REC';
      showToast('Recording 60fps Canvas Stream...');
    } catch (err) {
      showToast('Recording not supported in this browser.');
    }
  });

  // --- KEYBOARD SHORTCUTS ---
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    const key = e.key.toLowerCase();

    if (key === ' ') {
      e.preventDefault();
      pauseBtn.click();
    } else if (key === 'r') {
      document.getElementById('randomMatrixBtn').click();
    } else if (key === 'c') {
      document.getElementById('reseedPosBtn').click();
    } else if (key === 'h') {
      document.getElementById('zenModeBtn').click();
    } else if (key === 'm') {
      audioBtn.click();
    } else if (key === 'p') {
      document.getElementById('snapshotBtn').click();
    } else if (key >= '1' && key <= '6') {
      const keys = Object.keys(PRESETS);
      applyPreset(keys[parseInt(key, 10) - 1]);
    } else if (['q', 'w', 'e', 'a', 's'].includes(key)) {
      const map = { q: 'vortex', w: 'attract', e: 'repel', a: 'spawn', s: 'slice' };
      const target = map[key];
      state.activeTool = target;
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.toggle('active', b.dataset.tool === target));
    }
  });

  window.addEventListener('resize', resizeCanvas);

  // --- MAIN ANIMATION LOOP ---
  function animate(now) {
    if (!state.paused) {
      stepPhysics();
    }
    renderFrame();
    updateTelemetry(now);
    requestAnimationFrame(animate);
  }

  // Boot
  resizeCanvas();
  renderMatrixUI();
  seedParticles('rings');
  requestAnimationFrame(animate);
})();

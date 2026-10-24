# BRUCE — Private Personal Intelligence (web-first v1.0)

An **original**, noir-inspired, two-mode personal assistant for Karthik Simhadri. Wayne mode is calm and strategic; Tactical mode is brief and action-oriented. No movie assets, logos, or proprietary dialogue are included.

## Quick start on macOS

1. Install **Node.js 20+**: https://nodejs.org/ . Confirm `node -v`.
2. Install **Ollama**: https://ollama.com/ . Start the Ollama application.
3. Download a compact local language model (one-time internet access):

   ```sh
   ollama pull llama3.2:3b
   ```

4. Extract this project, open Terminal inside `bruce-personal`, then run:

   ```sh
   npm start
   ```

5. Open **http://127.0.0.1:4173/** in your browser. The model runs on your machine via Ollama. Model download size and speed depend on your hardware.

No npm dependencies are required. `npm start` works with Node itself.

**If Ollama is offline:** tasks, projects, notes and settings still work. AI chat shows an explicit error. Check `ollama list` and that the Ollama app is running.

### Select a different local model

On macOS/Linux: `BRUCE_MODEL=qwen2.5:3b npm start` (first run `ollama pull qwen2.5:3b`). A smaller model often improves responsiveness but may reduce quality.

### Storage and privacy

- API server listens on **127.0.0.1 only** by default (not reachable from other devices).
- Personal profile, tasks, projects, and notes persist to `data/bruce.json`, which is gitignored. This file is **not encrypted at rest**; protect your Mac account and use FileVault.
- Current chat messages stay in the active browser session and go to your **local Ollama**. They are not saved in the data file.
- There are **no analytics or cloud AI API calls** in the app. Optional macOS/browser speech synthesis can use system voices; do not assume every OS voice is offline.
- Initial installation and model download require internet access. The app itself is designed for offline use once installed.
- Never set `BRUCE_HOST=0.0.0.0` without adding authentication, TLS, and network controls.
- No wake word, microphone streaming, computer-control tools, background agent, 24/7 remote access, or encrypted database are included in this version. These need separate engineering and testing.

### Future desktop app

The UI (`public/`) is decoupled from the local Node API. You can later package both with Tauri or Electron, keeping the private data directory outside the app bundle. Add authentication and native permissions before exposing the API to other devices.

### API overview

`GET /api/health`, `GET /api/ai/status`, `GET /api/state`, `POST /api/chat`, `PUT /api/profile`, `PUT /api/settings`, CRUD for `/api/tasks`, `/api/projects`, `/api/notes`.

## Security limitations

Local-only binding is the primary trust boundary. Other processes running under your account may access the server. There is no user authentication or encryption at rest. This app is **not safe to deploy to GitHub Pages or a public cloud** with your private data; GitHub Pages cannot run this Node server. Do not push your `data` folder or tokens. All AI-generated content may be incorrect; actions are not executed by the model.

See `docs/ARCHITECTURE.md` and `AGENTS.md` for next steps.


## Version 1.1 improvements
- Local fast-command router: `time now`, `show my tasks`, `show my projects`, `list my notes`, `help` bypass Ollama and respond immediately. No command executes system actions.
- Stop response button aborts a browser streaming request.
- Export my data button downloads a local JSON backup. Treat the backup as sensitive; it contains personal notes and preferences.
- Existing Wayne/Tactical modes, task and note editing, and streamed local AI remain available.
- **Voice privacy:** browser speech synthesis may use operating-system voices whose implementation varies. The app does not turn on browser cloud-backed speech recognition. This release is *not* an always-listening assistant.
- **Security:** Keep the server bound to 127.0.0.1; no authentication or encryption-at-rest is provided. Do not host it on GitHub Pages or expose this local API to the internet.

## Bruce 2.0 — Sprint 1 update

This release upgrades the existing local Bruce 1.1 app. It includes a new responsive noir command stage with an original geometric wing emblem, animated concentric rings, a waveform, Wayne/Knight visual identity, and states for idle, local processing and spoken output. The **Preview listening animation** button only shows a visual demonstration: it does not request microphone access and does not transcribe speech. Actual local microphone capture/STT is still future work.

### Upgrade safely

1. Stop the previous Bruce server (`Control+C`).
2. **Back up** the previous `data/bruce.json` to a private safe location if it exists. The ZIP deliberately contains no personal data.
3. Extract the new ZIP. If updating the same installation, copy your existing `data/bruce.json` into the new `bruce-personal/data/` directory before starting the server.
4. Run `npm start` from `bruce-personal` and open `http://127.0.0.1:4173`.
5. Start Ollama and ensure `llama3.2:3b` is installed for AI answers. Without it, local tasks/notes/projects and fast commands still work.
6. Run `npm test` to execute the automated tests.

### Privacy and voice limitations

- No external fonts, scripts, tracking services or cloud AI API calls are included in the frontend. The server binds to `127.0.0.1` by default.
- Voice playback uses browser/system speech synthesis when manually enabled. The browser or OS voice engine may use an online service depending on installed voices and system settings; **do not enable voice** if your threat model requires strictly offline speech until an explicitly verified local TTS backend is integrated.
- The listening control is a demo animation, not a working microphone feature.
- The existing local JSON database is **not encrypted at rest**, so keep your Mac account and disk secured.
- The original crest is independent artwork, not a licensed Batman emblem.

### Subsequent sprints

Sprint 2: local microphone capture and offline STT, explicit audio permission, local TTS, interruption and live audio-driven waveform. Sprint 3: smarter memory and optimized streaming. Sprint 4: permission-gated tools. Sprint 5: privacy testing and encryption. Sprint 6: desktop packaging.


## Sprint 2: Offline voice input (BRUCE 2.1)

Voice transcription runs on YOUR Mac via `ffmpeg` and `whisper-cli` from whisper.cpp. **It does not call a cloud STT service or silently fall back to one.** Browser microphone use requires an explicit click and permission. Recording stops automatically after 30 seconds, and audio is sent only to the localhost Bruce server, then deleted after processing. No wake word yet.

Install local tools using Homebrew (if available):

```sh
brew install ffmpeg whisper.cpp
which whisper-cli
```

Download a whisper.cpp GGML model such as `ggml-base.en.bin` from the official whisper.cpp model resources; verify its provenance, then set its absolute path:

```sh
export BRUCE_WHISPER_MODEL="$HOME/models/ggml-base.en.bin"
npm start
```

If `whisper-cli` is elsewhere set `BRUCE_WHISPER_BIN=/absolute/path/to/whisper-cli`. The server converts recorded audio to mono 16 kHz WAV locally and feeds it to whisper.cpp. The app reports a configuration error if dependencies are missing. Spoken replies use your browser/OS speech synthesis (depending on platform, OS voices may not be offline); for strict no-outbound use only installed offline voices, or leave speech output disabled until a local TTS backend is integrated.

**Current limits**: push-to-talk (not hands-free), English transcription, max 30-second recordings, 12 MB upload limit, no real microphone amplitude visualization yet, and speech output is browser synthesis. Do not expose the server on public interfaces.

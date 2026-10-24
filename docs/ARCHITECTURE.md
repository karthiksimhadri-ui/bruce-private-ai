# BRUCE Architecture & Roadmap

## Current implementation
Browser (static HTML/CSS/JS) -> loopback Node HTTP API -> Ollama localhost for AI text generation. Structured task/project/note/profile data -> local JSON in `data/`. All assistant responses stream from Ollama to the browser. The system prompt selects Wayne or Tactical mode; neither grants additional capabilities.

## Version roadmap

1. **v1.0 — Delivered**: two personas, streaming local text chat, local memory settings, CRUD tasks, notes and projects, optional system voice playback, macOS run script, and offline Ollama integration.
2. **v1.1 — Responsiveness**: benchmark first-token response and tokens/sec; evaluate quantized 1B–3B local models; add summary context, cancellation and queueing; add fast deterministic command router.
3. **v1.2 — Private voice**: local STT (whisper.cpp), local TTS (Piper or carefully verified native system voice), push-to-talk, interruptions. Only enable wake word after microphone consent and CPU testing.
4. **v1.3 — Agent tools**: allowlisted file and calendar tools; confirmation before writes; audit log; sandboxed shell actions where appropriate; no unrestricted command execution.
5. **v2 — Desktop**: Tauri wrapper, launch-on-login, tray interface, OS credential storage and migration from local JSON to encrypted SQLite.
6. **v3 — 24/7**: dedicated Mac mini/home server, authentication, restricted private network access, backups, monitoring and health checks. Sleeping MacBook Air is not a reliable always-on host.

## Performance strategy
Route simple commands without the model; keep Ollama loaded; stream partial tokens; start with small models; measure instead of promising fixed latencies. Keep the visible browser UI responsive even when Ollama is unavailable.

## Security decisions
Loopback only, strict same-origin requests, no remote tool execution, no third-party scripts, and CSP for static files. This does not provide encryption at rest or protect against another malicious process on the same computer. Additional authentication will be required before private remote access.

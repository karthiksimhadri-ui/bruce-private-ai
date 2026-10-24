# Agent Guidance — BRUCE

Maintain BRUCE as a privacy-first personal assistant. Do not introduce cloud LLM APIs, telemetry, external script CDNs, analytics, or data exfiltration without explicit approval from Karthik. Keep the web server loopback-only by default. Never commit `data/*.json`, passwords, model conversations, API keys, or `.env` values.

Keep frontend in `public/`, local server in `server.js`, and architecture notes under `docs/`. Prefer small dependencies and fast startup. Update docs with each new capability. Add tests when changing persistence or security boundaries. AI should not execute shell commands directly. Scope and consent every new tool before implementation. For risky actions, require a human confirmation, audit actions, and do not give models access to arbitrary file paths.

Changes should use feature branches and code review before merging. Preserve accessibility and mobile usability. Wayne and Tactical modes are interaction styles, not different authorization levels.


Version 1.1 requirements: maintain `/api/fast` as a bounded read-only local command route; do not run shell commands based on model output, and never add browser cloud speech recognition without user consent. Preserve data export and streaming cancellation. Run `npm test` before proposing a PR.

## Bruce 2.0 constraints
- Preserve `public/index.html` and `public/app.js` element IDs referenced by tests when editing the UI.
- `coreFrame` states are `idle`, `listening`, `thinking`, and `speaking`.
- `listening` is currently *preview-only*; do not label it as active microphone acquisition.
- Do not introduce third-party calls, CDN dependencies, telemetry, or external voice services by default.
- Do not bundle personal data from `data/` in releases. Always run `npm test` and `node --check public/app.js`.

---
description: Synchronizes AI design system skills across .agent, .claude, and .codex directories.
---
# Sync AI Skills

This workflow copies all skill definitions from the primary `.agent/skills/` directory and mirrors them identically to the `.claude/skills/` and `.codex/skills/` directories to ensure all AI coding assistants follow the exact same design system and component rules.

When you modify any Markdown file inside the `.agent/skills/` directory, run this workflow to propagate the updates to the other agents.

// turbo-all
```powershell
Write-Host "Syncing .agent/skills to .claude/skills and .codex/skills..."
Copy-Item -Path ".agent\skills\*" -Destination ".claude\skills\" -Recurse -Force
Copy-Item -Path ".agent\skills\*" -Destination ".codex\skills\" -Recurse -Force
Write-Host "Sync complete!"
```

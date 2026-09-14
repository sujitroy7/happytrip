# Project AI Context System

This directory contains the hierarchical, progressive context management system for AI coding agents working on this backend.

## Principles

1. **Source code is authoritative**: Context files store navigation maps, architectural decisions, conventions, and rules—never copies of source code.
2. **Progressive discovery**: Never load project knowledge speculatively. Start at `manifest.yaml` and navigate only to the minimal context node needed for your task.
3. **Agent-agnostic**: Standard YAML and Markdown files usable by any AI agent (Claude Code, Gemini, Cursor, Codex, etc.).
4. **Mandatory Audit**: Every completed task must perform a context audit to determine if any context requires additions, updates, or splits.

## Getting Started for AI Agents

Read [AGENT.md](file:///.ai/AGENT.md) for step-by-step instructions on context routing, discovery, and audit workflows.

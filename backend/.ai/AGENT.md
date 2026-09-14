# AI Agent Guidelines

## 1. What `.ai` Is
`.ai/` is a lightweight, progressive context management system. It maps where code and architectural decisions live. Source code is always the authoritative source of truth.

## 2. Core Directive: Minimal & Progressive Loading
**Never load project knowledge speculatively.**
Do not read files across multiple domains if your task touches only one specific area. Read the smallest context node that allows you to complete your task safely.

## 3. Standard Task Workflow

1. **Classify Task**: Identify the category (feature, bugfix, refactor, config, test, infra).
2. **Consult Routing**: Read `.ai/manifest.yaml` to identify the relevant domain or rule file.
3. **Follow Domain Index**: Read only the specific domain's `index.yaml`.
4. **Select Context Node**: Read only the targeted context node file matching your task trigger.
5. **Inspect Source**: Jump directly to the referenced source files.
6. **Implement & Verify**: Make the change and run tests/linting (`npm run lint`, `npm test`).
7. **Mandatory Context Audit**: Assess if project knowledge changed.

## 4. Hierarchy Levels
- **Level 0 (Metadata)**: `.ai/manifest.yaml` (Project stack, triggers, domain entry points)
- **Level 1 (Domain Index)**: `.ai/domains/<domain>/index.yaml` (What subcontexts exist and when to use them)
- **Level 2 (Specific Context)**: `.ai/domains/<domain>/<context>.yaml` or `.ai/rules/*.yaml` (Rules, conventions, references)
- **Level 3 (Source References)**: Explicit file paths pointed to by context nodes.
- **Level 4 (Source Code)**: Targeted application files inspected on demand.

## 5. Mandatory Context Audit & Update Confirmation
Every task must conclude with an audit:
- Did this task add a domain, convention, reusable pattern, or decision?
- Did an existing convention change or become obsolete?
- Has a context node grown too large (target <500 tokens) requiring a split?

**Confirmation Protocol**:
Never update `.ai/` silently. Formulate a concise proposal:
- If no context changed: report `Context audit: NO_CHANGE.`
- If changes needed: list `ADD`, `UPDATE`, `REMOVE`, or `REFACTOR` with brief reasons, and ask for user confirmation before applying.

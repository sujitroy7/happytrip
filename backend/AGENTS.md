# AI Agent Guidelines

This project uses the progressive context management system located in `.ai/`.

## Mandatory Protocol
1. **Core Instructions**: Before executing tasks, read and adhere to [.ai/AGENT.md](file:///Users/sujitroy/Developer/happytrip/backend/.ai/AGENT.md).
2. **Progressive Loading**: Consult [.ai/manifest.yaml](file:///Users/sujitroy/Developer/happytrip/backend/.ai/manifest.yaml) to locate the relevant domain index or rule. Load only the targeted node. Never load context files speculatively.
3. **Quality Gate**: Run `npm run lint` and `npm test` to verify changes.
4. **Context Audit**: Complete the audit protocol defined in `.ai/AGENT.md` before concluding any task.

# Ambiente verificado em 09/09/2026

## Skills e agentes

- 33 skills globais com `SKILL.md` em `~/.agents/skills`. O Graphify estava sem esse nome de entrada; a versão Codex local foi copiada para ativação. Novas skills são descobertas em um próximo turno.
- Superpowers 6.3.0 instalado e habilitado, com 14 skills.
- Quatro agentes Impeccable configurados em `~/.codex/agents`.
- Launcher Impeccable executado: versão 4.0.0. O arquivo da skill declara 4.2.3; são componentes distintos, sem atualização automática forçada.
- Graphify CLI instalado e executado: 0.17.1. A verificação foi de instalação e versão, não um processamento completo de grafos ou de todas as linguagens nativas.

## MCPs do inventário

Context7, Playwright, Fetch, GitHub e shadcn já estavam configurados. Chrome DevTools foi registrado e seu executável respondeu com versão 1.9.0. 21st foi registrado a partir da configuração existente na mesma máquina: sua chave não foi exibida. O serviço respondeu HTTP 200 com resposta MCP de inicialização.

Os sete constam habilitados na configuração. Servidores adicionados podem exigir recarregamento da sessão para expor suas ferramentas. As ferramentas Context7 e Playwright foram usadas nesta tarefa.

## Exclusões e compatibilidade

Claude Mem não foi instalado, conforme decisão expressa de Pedro após o bloqueio da revisão automática. Seu marketplace foi adicionado, o que não ativa o plugin nem seus hooks.

O registro Unlumen é configuração por projeto React/Tailwind. As alternativas usam JavaScript e Three.js sem React/Tailwind; não foi criado um arquivo components.json incompatível.

Os arquivos recebidos tinham afirmações desatualizadas sobre a ausência de skills, plugins e HTTP MCP no Codex. A configuração existente foi preservada; o script Claude Code não foi executado indiscriminadamente. Houve backup protegido da configuração antes da inclusão da chave local do 21st.

Documentação oficial consultada: https://developers.openai.com/codex/mcp e https://developers.openai.com/codex/skills.

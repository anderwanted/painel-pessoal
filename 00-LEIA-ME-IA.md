# Painel Pessoal: índice e regras (LER PRIMEIRO)

## Contexto mínimo (basta para a maioria das tarefas)
- App de **cards flutuantes** para tarefas, contas, compromissos, sonhos e serviços/assinaturas. Uso solo; depois, convidados.
- Stack final: **PWA (HTML/JS/CSS) + Google Apps Script + Google Sheets**. Mobile first (Android, iOS, Windows).
- **Item ≠ grupo.** Grupo é só uma visão (manual ou por regra). O mesmo item aparece em vários grupos **por referência** (aba `vinculos`).
- Conta mensal = **1 item por mês**, gerado ao abrir o app, chave `modelo_id + AAAA-MM`.
- Dados passam por um **adaptador trocável** (D-16): JSON local → Sheets → Sheets + login.
- Visual: colunas viram **trilhos invisíveis**; cards flutuam; cor do grupo no card; tipo no ícone (D-13, D-14).
- **Estado atual:** planejamento e wireframes (N0). Código: nenhum.

## Mapa de arquivos
| Arquivo | Conteúdo | Muda quando |
|---|---|---|
| `01-decisoes.md` | Decisões de produto e design (D-xx) e dúvidas em aberto (Q-xx) | Muda uma regra |
| `02-dados.md` | Abas, colunas, enums, contrato do adaptador | Muda a estrutura de dados |
| `03-roadmap.md` | Funcionalidades (F-xx), níveis de teste (N-xx), ordem de construção | Muda escopo ou prioridade |
| `04-cuidados.md` | Pendências para convidados (P-xx), cuidados (C-xx), riscos (R-xx), ideias (I-xx) | Surge risco ou ideia |
| `05-briefing-telas-gemini.md` | Prompt de telas para o Gemini (T-xx) | Muda o visual ou os fluxos |

## Quais arquivos carregar por tarefa
| Tarefa | Carregar |
|---|---|
| Criar ou mudar a planilha, Apps Script, adaptador | 00 + 02 |
| Programar a interface (cards, grupos, ordenação) | 00 + 01 (D-02 a D-06, D-13 a D-15) + 02 |
| Contas recorrentes, parcelas, cartão | 00 + 01 (D-07, D-08, D-10) + 02 |
| Serviços/trial e senhas | 00 + 01 (D-11, D-12) + 02 |
| Decidir o que construir agora | 00 + 03 |
| Preparar abertura para convidados | 00 + 04 (P-xx) + 02 |
| Gerar telas no Gemini | só 05 |

## Regras de manutenção por IA (economizam tokens)
1. **Edite só o bloco com o ID citado.** Não reescreva o arquivo inteiro; use troca pontual de texto.
2. **Uma informação, um lugar.** Se aparecer em dois arquivos, mantenha uma e referencie pelo ID (ex.: "ver D-07").
3. **Mudou uma decisão?** Troque o texto do D-xx, marque `[REVISADA aaaa-mm-dd]` e registre no changelog. Não apague o motivo antigo se ele evita erro futuro (uma linha em "Antes:").
4. **Novo item = novo ID** (próximo número livre). Nunca reutilize ou renumere IDs, pois o briefing e o código os citam.
5. **Estilo:** frases curtas, tabelas, sem prosa e sem repetir contexto. Exemplos só quando evitam ambiguidade.
6. **Mudança em estrutura de dados** (`02`): atualize também o campo `Versão do esquema` e o changelog.
7. **Ao concluir uma funcionalidade,** altere só o campo `Status` em `03`.
8. **Não colar o histórico da conversa** nos arquivos. Só o resultado: decisão, motivo em uma linha.

## IDs
`D` decisão · `Q` dúvida em aberto · `F` funcionalidade · `N` nível de teste · `P` pendência de convidados · `C` cuidado · `R` risco · `I` ideia · `T` tela

## Changelog (mais recente no topo; uma linha por mudança)
| Data | IDs | Mudança |
|---|---|---|
| 2026-11-07 | D-14, T-06 a T-09 | D-14 confirmada nos wireframes (Imagens 1 e 2). Briefing: lista "Correções da rodada 1" (sem "Trilhos com", formato BR, datas reais, chips com nome, moldura única); T-09 com botões "Tirar deste grupo" e "Cancelar". Imagens 1 e 2 ainda a refazer |
| 2026-11-07 | T-01, T-02c, T-03 | Briefing: uma imagem por pedido (telas lado a lado), tom do card = cor do grupo, sem valor em R$ em tarefa, T-02c em quase tela cheia, T-03 com 4 formas de pagamento |
| 2026-11-07 | D-13 a D-17, N-xx, T-xx | Visual de cards flutuantes; níveis de teste N0 a N3; adaptador de dados; documentação dividida em arquivos modulares |
| 2026-11-07 | D-01 a D-12 | Versão inicial das decisões |

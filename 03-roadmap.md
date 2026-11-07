# Roadmap: funcionalidades (F-xx), níveis de teste (N-xx), ordem

Dois eixos independentes: **o que** construir (fases V1, V1.5, Depois) e **onde** testar (níveis N0 a N3).
Status: `a fazer` · `em curso` · `feito`.

## Funcionalidades
| ID | Funcionalidade | Fase | Decisão | Testa em | Status |
|---|---|---|---|---|---|
| F-01 | Painel de cards flutuantes em trilhos, grupos manuais, arrastar + "mover para..." | V1 | D-13, D-14 | N1 | a fazer |
| F-02 | Grupos automáticos por regra | V1 | D-03 | N1 | a fazer |
| F-03 | Ordenação por grupo, borda de atraso, etiqueta "parado" | V1 | D-06 | N1 | a fazer |
| F-04 | Item em vários grupos, "tirar deste grupo" x "apagar item" | V1 | D-04, D-05 | N1 | a fazer |
| F-05 | Subtarefas (1 nível), barra de progresso, sugestão de concluir | V1 | D-09 | N1 | a fazer |
| F-06 | Card aberto com transição e fundo desfocado | V1 | D-15 | N1 | a fazer |
| F-07 | Pagamento: data, forma, pop-up do cartão | V1 | D-10 | N1 | a fazer |
| F-08 | Cadastro curto de serviço/trial, senha em `segredos`, lembrete | V1 | D-11, D-12 | N1 (UI), N2b (lembrete) | a fazer |
| F-09 | PWA (manifest, instalação, HTTPS) | V1 | D-01 | N1 | a fazer |
| F-10 | Modelos recorrentes e geração ao abrir o app | V1.5 | D-07 | N1, N2b | a fazer |
| F-11 | Dívida parcelada | V1.5 | D-08 | N1 | a fazer |
| F-12 | Decisão do trial (manter e cobrar / cancelar) | V1.5 | D-11 | N1 | a fazer |
| F-13 | Aviso de duplicata e tela "possíveis duplicados" com mesclar | V1.5 | D-04 | N1 | a fazer |
| F-14 | Aba `categorias` como lista controlada | V1.5 | D-02 | N1 | a fazer |
| F-15 | Histórico por subcategoria (gráfico, média, variação) | Depois | D-07 | N2b | a fazer |
| F-16 | Totais de assinaturas e alerta de renovação anual | Depois | D-11 | N2b | a fazer |
| F-17 | Visão em raias e desktop rico | Depois | D-13 | N1 | a fazer |
| F-18 | Offline com sincronização | Depois | D-16 | N2b | a fazer |
| F-19 | Promover subtarefa a item; hierarquia de subcategorias | Depois | D-09 | N2b | a fazer |
| F-20 | Abertura para convidados | Depois | ver `04-cuidados.md` P-xx | N3 | a fazer |

## Níveis de teste
| Nível | Stack | O que valida | Pronto quando |
|---|---|---|---|
| **N0** | Imagens (Gemini) | Visual e fluxo, antes de código | Telas T-01 a T-18 aprovadas |
| **N1** | HTML, JS, CSS, adaptador `local` | Toda a interface no celular real, com dados fictícios | F-01 a F-09 funcionam instalados como PWA no Android e iOS |
| **N2a** | + Sheets, só leitura | Abas, colunas, CORS, filtros em dados reais | Painel mostra os dados da planilha sem erro |
| **N2b** | + Sheets, escrita | Uso real solo: `LockService`, ocorrências, fuso, lembretes | Uma semana de uso diário sem perda nem duplicata |
| **N3** | + login Google | Convidados, `dono`, remoção de `segredos` | Todos os P-xx concluídos e teste com conta de convidado |

Regras:
- Subir de nível **só troca o adaptador** (D-16). Se exigir mexer na interface, é bug de desenho.
- Testes no celular: hospedar cada nível em Netlify ou GitHub Pages e abrir pelo HTTPS.
- N1 usa **somente dados fictícios**. Dados reais entram a partir do N2b.
- N2b já é um app completo para uso solo; N3 só quando houver convidado.

## Ordem de construção (dentro do N1)
1. Adaptador `local` + `dados-exemplo.json` (contrato de `02-dados.md`)
2. Trilhos e cards flutuantes, grupos manuais (F-01)
3. Grupos automáticos e ordenação (F-02, F-03)
4. Vínculos e remoções (F-04)
5. Card aberto com transição (F-06) e subtarefas (F-05)
6. Pagamento e cartões (F-07)
7. Serviço/trial (F-08)
8. PWA (F-09)
9. Depois: F-10 a F-14, nesta ordem.

Algo já é usável no passo 2.

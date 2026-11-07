# Pendências, cuidados, riscos e ideias

## P-xx: antes de abrir para convidados (F-20, nível N3)
> Não liberar acesso a ninguém antes de concluir todos.

| ID | Pendência | Feito |
|---|---|---|
| P-01 | Remover aba `segredos` e o campo de senha do app (D-12) | [ ] |
| P-02 | Migrar senhas para gerenciador (Bitwarden, 1Password); no app, só "senha guardada em: ..." | [ ] |
| P-03 | Trocar a chave do front-end por login Google (a chave é visível no código público) | [ ] |
| P-04 | Filtro por `dono` **no servidor** (Apps Script), nunca só no front-end | [ ] |
| P-05 | Dados sensíveis (gastos): avaliar planilha separada por pessoa | [ ] |
| P-06 | Permissões por chave: leitura x edição | [ ] |
| P-07 | Revogar e trocar chaves sem alterar o código | [ ] |
| P-08 | Revisar campos que um usuário poderia ver de outro (login de serviços, valores, observações) | [ ] |
| P-09 | Testar com uma conta de convidado fictícia antes de convidar alguém real | [ ] |

## C-xx: cuidados
| ID | Área | Cuidado |
|---|---|---|
| C-01 | Dados | Backup semanal por gatilho; cópia manual antes de mudar o esquema |
| C-02 | Dados | Dinheiro em centavos; datas ISO; fuso fixo (ver `02-dados.md`) |
| C-03 | Dados | Soft delete e aba `log` (quem, quando, o que mudou) |
| C-04 | Dados | Validação (listas suspensas) nas colunas tipo, status, forma e subcategoria |
| C-05 | Dados | Arquivar concluídos antigos em aba `historico` se a planilha ficar lenta |
| C-06 | Apps Script | Cotas e latência de 1 a 3 s: agrupar operações com `lote`, ler a aba inteira |
| C-07 | Apps Script | `LockService` em toda gravação e na geração de ocorrências |
| C-08 | Apps Script | CORS: enviar POST como `text/plain`; testar cedo (N2a) |
| C-09 | Apps Script | Geração de ocorrências idempotente; testar abrir 50 vezes e 2 aparelhos juntos |
| C-10 | Segurança | Tudo no front-end é público, inclusive a chave |
| C-11 | Segurança | Nunca registrar senha em log ou mensagem de erro |
| C-12 | Segurança | URL do Apps Script em variável de configuração, não em repositório público |
| C-13 | Celular | Alvos de toque grandes; "mover para..." sempre disponível |
| C-14 | Celular | Estados "salvando..." e "falhou, tentar de novo"; não perder o que foi digitado |
| C-15 | Celular | Atualização otimista: card se move na hora e reverte se a gravação falhar |
| C-16 | Celular | iOS: PWA instalada pelo Safari; push limitado, lembretes por e-mail ou Agenda |
| C-17 | Visual | Blur pesa em Androids simples: fallback escuro; respeitar "reduzir movimento" |
| C-18 | Visual | Atraso e tipo não dependem só de cor (ícone + texto); checar contraste das cores dos grupos |
| C-19 | Cache | Guardar a última leitura no aparelho para abrir rápido; atualizar em segundo plano e botão "recarregar" |
| C-20 | Esquema | Campo "versão do esquema" para o app avisar planilha desatualizada |

## R-xx: riscos
| ID | Risco | Mitigação |
|---|---|---|
| R-01 | Duplicar ocorrências | Chave `modelo_id + AAAA-MM` e C-07 |
| R-02 | Editar na planilha e no app ao mesmo tempo | C-19 e ID por linha |
| R-03 | Apagar por engano | Soft delete, backup (C-01), log (C-03) |
| R-04 | Senha exposta | D-12, P-01 |
| R-05 | Planilha lenta | C-05 |
| R-06 | Fuso horário errado | C-02 |
| R-07 | Estourar cota do Apps Script | C-06, C-19 |
| R-08 | Escopo crescer demais | Seguir `03-roadmap.md`; avançar só com o nível anterior estável |
| R-09 | Trocar de adaptador quebrar a interface | D-16; interface nunca acessa o armazenamento direto |

## I-xx: ideias para depois
| ID | Ideia |
|---|---|
| I-01 | Visão calendário (prazos, contas e compromissos juntos) |
| I-02 | Resumo do mês: total, pago, falta, comparação com o mês anterior |
| I-03 | Painel de assinaturas: gasto mensal e anual, renovações, trials ativos |
| I-04 | Alerta de aumento ("luz subiu 18% sobre a média de 6 meses") |
| I-05 | Simulador de quitação de dívida parcelada |
| I-06 | Modelos de painel reaproveitáveis (Semana, Mês, Viagem) |
| I-07 | Checklists recorrentes (rotina semanal) usando a lógica dos modelos |
| I-08 | Link para comprovante ou boleto no Drive |
| I-09 | Exportar CSV/PDF; importar de outra planilha |
| I-10 | Atalho de "adicionar rápido" na tela inicial |
| I-11 | Criar eventos no Google Agenda para compromissos (mão dupla só depois) |
| I-12 | Compartilhar um grupo específico (ex.: contas da casa) em vez de tudo |

# Dados: abas, colunas, enums e adaptador

**Versão do esquema:** 1 (mudou o esquema? some 1 aqui e registre no changelog do `00`)

## Convenções (valem para todas as abas)
- **IDs:** texto único (UUID curto). Nunca o número da linha.
- **Datas:** ISO `AAAA-MM-DD`; data e hora `AAAA-MM-DDThh:mm`. Fuso fixo `America/Sao_Paulo`.
- **Dinheiro:** inteiro em centavos, sem "R$" na célula.
- **Apagar:** soft delete (`apagado_em` preenchido); nada é removido de verdade no dia a dia.
- **Escrita:** `atualizado_em` e `criado_em` são preenchidos pelo adaptador, nunca pela interface.
- **Dono:** coluna `dono` existe desde o início (vazia no uso solo).

## Abas
| Aba | Colunas |
|---|---|
| `itens` | id, titulo, tipo, subcategoria, status, prazo, valor, criado_em, atualizado_em, apagado_em, dono, item_pai, data_pagamento, forma, modelo_id, mes_ref, parcela_n, parcela_total, login, link, situacao, fim_trial, periodicidade, observacoes |
| `grupos` | id, nome, tipo (manual/regra), filtro, ordenacao_padrao, cor, painel, dono |
| `vinculos` | item_id, grupo_id, ordem |
| `categorias` | nome, tipo, cor, icone |
| `modelos` | id, titulo, tipo, subcategoria, valor_padrao, dia_mes, inicio, fim, parcelas_total, forma |
| `cartoes` | nome, dia_fechamento, dia_vencimento |
| `segredos` | item_id, senha |
| `chaves` | chave, nome, permissao |
| `pendencias_projeto` | data, assunto, descricao, status |

Campos específicos: `parcela_*` só em parceladas; `login`, `link`, `situacao`, `fim_trial`, `periodicidade` só em serviços; `item_pai` só em subtarefas; `modelo_id` e `mes_ref` só em ocorrências.

## Enums
| Campo | Valores |
|---|---|
| `tipo` | conta, tarefa, compromisso, sonho, servico |
| `status` | pendente, feito, pago, previsto, historico, cancelado, ativo |
| `forma` | pix, boleto, debito, cartao:<nome> |
| `situacao` | trial, pago, gratuito |
| `periodicidade` | mensal, anual |
| `ordenacao_padrao` | manual, prazo, parado |
| `permissao` | leitura, edicao |

## Filtro de grupo automático (formato)
Lista de condições `[campo, operador, valor]`, ex.: `[["tipo","=","conta"],["prazo","<=","hoje+5"],["status","!=","pago"]]`. Operadores: `= != < <= > >= in`. Valores especiais: `hoje`, `hoje+N`, `mes_atual`.

## Contrato do adaptador (D-16)
```
listar(aba, filtro?)           -> {ok, dados[]}
criar(aba, objeto)             -> {ok, dados: objeto com id}
editar(aba, id, campos)        -> {ok, dados}
apagar(aba, id)                -> {ok}            // soft delete
lote(operacoes[])              -> {ok, resultados[]}   // agrupa gravações numa chamada
gerarOcorrencias(mes_ref)      -> {ok, criadas: n}     // idempotente
```
- Resposta padrão em erro: `{ok:false, erro:"texto curto"}`.
- Toda leitura carrega a aba inteira de uma vez e filtra em memória.
- `senha` só é retornada pelo adaptador a chave com permissão de dono.

### Implementações
| Adaptador | Nível | Armazenamento | Notas |
|---|---|---|---|
| `local` | N1 | localStorage/IndexedDB, carga inicial de `dados-exemplo.json` | Botões exportar/importar JSON; só dados fictícios |
| `sheets` | N2a (só `listar`) e N2b (completo) | Apps Script web app | POST como `text/plain` (CORS); `LockService` em toda gravação |
| `sheets` + login | N3 | idem, com login Google | Filtro por `dono` no servidor |

## Regras do Apps Script
- Gravar sob `LockService`; agrupar várias mudanças em `lote`.
- `gerarOcorrencias` confere `modelo_id + mes_ref` antes de criar (idempotente, seguro com 2 aparelhos).
- Gatilho `onEdit` atualiza `atualizado_em` em edições diretas na planilha.
- Backup semanal (gatilho) copiando a planilha para o Drive.

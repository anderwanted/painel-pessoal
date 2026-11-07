# Decisões (D-xx) e dúvidas em aberto (Q-xx)

Formato: **ID. Título** · Regra · Motivo (opcional). Editar só o bloco do ID.

## Base técnica

**D-01. Stack**
- PWA (HTML/JS/CSS; React só se crescer) + Apps Script (web app) + Google Sheets. Hospedagem estática com HTTPS (GitHub Pages, Netlify ou Cloudflare Pages).
- Arrastar: SortableJS + menu "mover para..." sempre disponível (drag nativo falha em touch).
- Descartados: Electron (só Windows), CSV publicado (só leitura).

**D-16. Adaptador de dados**
- O front-end só conversa com um adaptador (contrato em `02-dados.md`). Trocar o armazenamento = trocar o adaptador, sem mexer na interface.
- Adaptadores: `local` (localStorage/IndexedDB + JSON), `sheets` (Apps Script).

**D-17. Níveis de teste**
- N0 imagens, N1 local, N2a Sheets leitura, N2b Sheets escrita, N3 login. Detalhes em `03-roadmap.md`.

## Itens, grupos e ordenação

**D-02. Item ≠ grupo**
- Tipo e subcategoria são do item (ex.: conta de luz = tipo conta, subcategoria luz). Grupo é visão.

**D-03. Dois tipos de grupo**
- **Automático:** filtro salvo (ex.: tipo=conta, prazo ≤ hoje+5, status≠pago). Card entra e sai sozinho.
- **Manual:** o usuário decide o que entra e arrasta.
- Ver Q-01 (arrastar para grupo automático).

**D-04. Mesmo item em vários grupos**
- É referência, não cópia. Editar vale para todos. Só `ordem` é por grupo (aba `vinculos`).
- O card mostra pontinhos com as cores dos grupos (ver D-14).

**D-05. Remover e concluir**
- "Tirar deste grupo" = apaga só o vínculo. "Apagar item" = apaga tudo, com confirmação.
- Apagar painel temporário remove só vínculos.
- Concluir é do item e vale para todos os grupos.

**D-06. Ordenação por grupo**
- Cada grupo guarda: manual, por prazo ou por tempo sem editar. Roda no front-end.
- Sem prazo vai para o fim. Atrasado = borda vermelha. Parado = etiqueta "parado há X dias".
- `atualizado_em` preenchido pelo adaptador; gatilho `onEdit` cobre edição direta na planilha.

## Contas, parcelas e cartão

**D-07. Conta recorrente**
- 1 item novo por mês, com tipo + subcategoria (histórico de graça).
- Modelo recorrente (título, tipo, subcategoria, valor padrão, dia do mês, data final opcional) gera ocorrências **ao abrir o app, criando só o que falta**.
- Chave única: `modelo_id + AAAA-MM`. Sem data final: gera mês atual e próximo.
- Ocorrência nasce com valor padrão (ou o do mês anterior); ajusta-se quando a conta chega.

**D-08. Dívida parcelada**
- Cadastro: valor da parcela, total, parcela atual, dia do vencimento.
- Parcelas anteriores à atual: `historico` (sem alerta). Atual: `pendente`. Futuras: `previsto`.
- Mostra "falta pagar R$ X, N parcelas". Parcelas não usam subtarefas.

**D-10. Pagamento e cartão**
- Campos: `data_pagamento`, `forma` (pix, boleto, débito, cartão X).
- Cartão: só o **total da fatura** (1 item por cartão por mês); cada pagamento soma nele. Sem compras individuais.
- Compra até o fechamento vence no mês corrente; depois, no seguinte.
- Pop-up de consciência ao pagar no cartão: "Esse cartão vence dia 15. A fatura de dezembro fica R$ X com essa conta".

## Subtarefas

**D-09. Subtarefas**
- Item comum com `item_pai`. Um nível só. Valem para tarefa, compromisso e sonho; **não** para conta.
- Herdam tipo e subcategoria; prazo próprio permitido.
- Ficam dentro do card pai (barra "2 de 3 feitas"). Opção de mostrar como cards em grupos específicos (ex.: "Hoje").
- Pai em vários grupos leva as subtarefas junto.
- Concluir: o app só sugere "tudo feito, concluir?". Em compromisso, o status depende da data.
- Apagar o pai pergunta: apagar filhos ou promovê-los a itens independentes.

## Serviços e senhas

**D-11. Serviço/assinatura (trial)**
- Tipo próprio. Campos: nome, link, login, situação (trial/pago/gratuito), fim do trial, próxima cobrança, valor, periodicidade, forma, observações, status.
- Cadastro **curto** (nome, login, senha, é trial?, fim do trial); resto depois.
- Lembrete 3 dias antes do fim via **e-mail ou Google Agenda** (push em PWA no iOS é limitado).
- Decisão: **Cancelar** (histórico, com "Desfazer") ou **Manter e cobrar** (cria modelo recorrente, subcategoria "assinaturas").

**D-12. Senhas (temporário)**
- Texto simples, mas isolada na aba `segredos`. Apps Script nunca devolve a senha a chave que não seja a do dono.
- Card: •••••• com "mostrar" e "copiar". Aviso fixo: "⚠ Senha em texto simples. Revisar antes de liberar convidados."
- Remoção obrigatória antes de convidados: ver P-01.

## Visual

**D-13. Cards flutuantes em trilhos invisíveis**
- As colunas continuam como alinhamento, mas **sem borda, fundo ou caixa**. Fundo liso; cards com sombra suave, cantos bem arredondados e pequeno espaço entre eles (aspecto de balões).
- Título do grupo = **chip colorido solto** no topo do trilho (nome, ícone de ordenação, "+").
- Celular: trilhos deslizam na horizontal. Desktop: lado a lado, com opção de mural sem trilhos.
- Todo card cai em algum trilho. Posicionamento livre (x, y) fica fora do escopo (conflita com ordenação automática).
- Antes: colunas com cabeçalho e moldura.

**D-14. Cor do grupo no card; tipo no ícone** (confirmada nos wireframes em 2026-11-07)
- Cada grupo tem cor (aba `grupos`). O card usa tom suave ou brilho dessa cor.
- Tipo (conta, tarefa, compromisso, sonho, serviço) vira **ícone**, para não brigar com a cor do grupo.
- Card em mais de um grupo: **pontinhos** com as cores dos outros grupos.
- Atrasado/parado/pago/trial continuam como borda e selos.

**D-15. Card aberto**
- O card cresce da própria posição até quase tela cheia; o resto fica **escurecido e desfocado**. Fecha arrastando para baixo ou tocando fora.
- Técnica: View Transitions API ou animação simples. Fallback: fundo escuro sem blur (Androids fracos) e sem animação para quem desativa movimento.

## Dúvidas em aberto

| ID | Dúvida | Opções |
|---|---|---|
| Q-01 | Soltar card em grupo automático | Bloquear, ou alterar o dado (ex.: soltar em "Hoje" muda o prazo) |
| Q-02 | Gatilho de ocorrências | Só ao abrir o app, ou também gatilho agendado no dia 1º |
| Q-03 | "Parado há X dias" | Só tarefas, ou todos os tipos |
| Q-04 | Subtarefas como cards | Em quais grupos por padrão |
| Q-05 | Pagamento | Só a forma (adotado) ou também a conta bancária |

# Briefing de Telas: Painel Pessoal de Cards (T-xx)

**Instrução para o Gemini:** leia este documento inteiro e gere **wireframes de média fidelidade** em **português do Brasil**. Cada pedido gera **UMA ÚNICA IMAGEM** contendo várias telas **lado a lado** (ver "Formato da entrega"). Gere só a imagem pedida e **espere eu dizer "próxima"**. Comece pela **Imagem 1 (Fluxo A)**.

## 1. O app
Painel de **cards flutuantes** (contas, tarefas, compromissos, sonhos, serviços), uso principal no **celular**. Conceitos que as telas devem mostrar:
- **Grupos** são trilhos verticais de cards, cada um com uma cor. Podem ser automáticos (por regra) ou manuais.
- **O mesmo item aparece em vários grupos**, indicado por **pontinhos coloridos** no card.
- Cada grupo tem sua ordenação (manual, prazo, tempo sem editar).
- Subtarefas ficam dentro do card, com barra de progresso.

## 2. Estilo visual (idêntico em todas as telas)
- Moldura de celular igual em todas as imagens (desktop só quando indicado).
- **Sem colunas desenhadas:** nada de borda, caixa ou fundo de coluna. Fundo liso e claro. Os cards ficam alinhados em trilhos invisíveis e parecem **balões flutuantes**: cantos bem arredondados, sombra suave, pequeno espaço entre eles.
- **Título do grupo:** um **chip colorido solto** no topo do trilho, com nome, ícone de ordenação (prazo / tempo sem editar / manual) e botão "+". Sem cabeçalho de caixa.
- **Cor do grupo no card:** tom suave da cor do grupo no fundo do card ou uma faixa. Card em mais de um grupo mostra **pontinhos** com as cores dos outros grupos (substitui o texto "em 3 grupos").
- **Tipo do item = ícone** (não cor): conta (cifrão), tarefa (check), compromisso (calendário), sonho (estrela), serviço (raio).
- Cores dos grupos: Hoje = amarelo, Semana = azul, Pagar nos próximos 5 dias = verde, Vencem nos próximos 7 dias = laranja, Sonhos futuros = roxo.
- Atrasado: borda vermelha. Parado: etiqueta cinza "parado há 12 dias". Pago/concluído: selo verde. Trial: selo laranja "trial termina em X dias".
- Botão "+" flutuante no canto inferior direito.
- Em cada tela, marque com um **círculo vermelho numerado** o elemento tocado e escreva embaixo: *"Toque em X → vai para a tela seguinte"*.

- **Tom do card = cor do grupo.** Os cards NÃO são todos brancos: cada card leva fundo suave da cor do grupo onde está (ex.: card na coluna "Hoje" em amarelo claro, em "Pagar nos próximos 5 dias" em verde claro).
- **Valor em R$ só em conta e serviço.** Tarefas, compromissos e sonhos mostram prazo (e barra de progresso, se tiverem subtarefas), nunca valor.

### Formato da entrega (obrigatório)
- **UMA única imagem por pedido**, com as telas do fluxo **lado a lado**, cada uma com seu código (T-xx) e uma legenda abaixo.
- **Máximo 4 telas por linha, em até 2 linhas**, para os detalhes ficarem legíveis. Alta resolução, texto grande o bastante para ler.
- Cada tela mostra **todos os elementos descritos** no briefing, sem resumir (ex.: todas as opções de pagamento, todos os grupos, todos os campos).
- Não repetir o mesmo dado com valores trocados entre cards.

### Card aberto (transição)
Todo card aberto **salta à frente**: ocupa quase a tela inteira, com cantos arredondados e sombra forte, e o painel ao fundo fica **escurecido e desfocado**. Na T-02, mostrar **três quadros** do mesmo card (T-02a, T-02b, T-02c). Nas demais, mostrar só o estado aberto.

## 3. Dados fixos
**Contas:** Conta de luz, novembro, R$ 187,40, vence dia 12, subcategoria Luz, nos grupos Hoje, Pagar nos próximos 5 dias e Mensal. Água R$ 94,00. Internet R$ 119,90. Parcela do notebook 5/10, R$ 300,00.
**Cartão:** Nubank, fecha dia 8, vence dia 15. Fatura de dezembro: R$ 1.052,60.
**Tarefa:** "Viagem de dezembro" com 3 subtarefas: "Comprar passagem" (feita), "Reservar hotel" (feita), "Renovar passaporte" (pendente, prazo próprio). Em 3 grupos.
**Serviço:** "ChatGPT Plus", login "meuemail@gmail.com", senha oculta, trial termina em 14 dias, depois R$ 100,00/mês no Nubank.

## 4. Fluxo A: pagar uma conta no cartão (Imagem 1: T-01 a T-05, 7 quadros em 2 linhas)
- **T-01** Painel principal: trilhos "Hoje", "Pagar nos próximos 5 dias", "Semana", com chips coloridos e cards flutuantes. Toque no card "Conta de luz". Cards com o tom suave da cor do grupo (não brancos). "Viagem de dezembro" mostra prazo e barra "2 de 3 feitas", **sem valor em R$**.
- **T-02a** O painel com o card da conta de luz ainda no lugar (círculo vermelho nele).
- **T-02b** Meio da transição: o card crescendo, o fundo começando a escurecer e desfocar.
- **T-02c** Card aberto **ocupando quase a tela inteira** (não um quadro pequeno), com: título, valor R$ 187,40, prazo (vence dia 12), subcategoria "Luz", lista dos grupos onde aparece com **nome e cor de cada um** (Hoje, Pagar nos próximos 5 dias, Mensal), status e botão "Marcar como paga". Fundo desfocado e escurecido. Toque no botão.
- **T-03** Pop-up de pagamento com as **quatro opções visíveis** como botões de escolha (Pix, Boleto, Débito, Cartão Nubank, este selecionado) e o campo de data do pagamento. Toque em "Confirmar".
- **T-04** Aviso: "Esse cartão vence dia 15. A fatura de dezembro fica R$ 1.240,00 com essa conta". Botão "Entendi".
- **T-05** Painel de volta: a conta de luz saiu de "Pagar nos próximos 5 dias" e aparece paga, com selo verde.

## 5. Fluxo B: tarefa com subtarefas (Imagem 2: T-06 a T-09)
- **T-06** Painel principal. Toque no card "Viagem de dezembro".
- **T-07** Card aberto: barra "2 de 3 feitas", subtarefas com checkbox e prazo próprio, subcategoria, prazo, grupos onde aparece. Toque no checkbox da última subtarefa.
- **T-08** Mesmo card com "3 de 3" e a sugestão "Tudo feito, concluir?" com botões "Concluir" e "Agora não".
- **T-09** Toque em "Tirar deste grupo": confirmação com o texto "Só o vínculo com o grupo Hoje será removido. O item continua nos outros 2 grupos (Semana e Mensal)" e os botões **"Tirar deste grupo" e "Cancelar"** (sem "Apagar item" nesta confirmação). Nas T-07 e T-08, o card aberto mostra os dois botões distintos "Tirar deste grupo" e "Apagar item".

## 6. Fluxo C: cadastrar serviço em trial (Imagem 3: T-10 a T-14; Imagem 4: T-15 a T-18)
- **T-10** Painel principal. Toque no "+" flutuante.
- **T-11** Menu de tipos: Conta, Tarefa, Compromisso, Sonho, Serviço/assinatura. Toque em "Serviço/assinatura".
- **T-12** Formulário curto: nome, login, senha (oculta, com ícone de olho), chave "É trial?" ligada, fim do trial. Faixa amarela: "⚠ Senha em texto simples. Revisar antes de liberar convidados." Link "Completar depois: valor, cartão, periodicidade". Botão "Salvar".
- **T-13** Painel com o novo card "ChatGPT Plus" (ícone de raio), selo laranja "trial termina em 14 dias" e aviso discreto "Lembrete criado para 3 dias antes do fim".
- **T-14** Card aberto: login, senha oculta com "mostrar" e "copiar", fim do trial, campos vazios "valor", "cartão", "periodicidade" com botão "Completar", aviso de segurança.
- **T-15** Faltam 3 dias: grupo "Vencem nos próximos 7 dias" com o card "Decidir: manter ou cancelar ChatGPT Plus", borda laranja. Toque nele.
- **T-16** Tela de decisão: dados do serviço, R$ 100,00/mês no Nubank, botões "Cancelar serviço" e "Manter e cobrar". Toque em "Manter e cobrar".
- **T-17** Confirmação: "Cobrança mensal criada em Assinaturas. Próxima cobrança dia 15. A fatura de dezembro fica R$ 1.152,60 com esta assinatura". Botão "Entendi".
- **T-18** Alternativa à T-16: após "Cancelar serviço", item no histórico, selo cinza "Cancelado" e botão "Desfazer".

## 7. Telas avulsas (só depois das Imagens 1 a 4; Imagem 5: T-19 a T-21; Imagem 6: T-22; Imagem 7: T-23)
- **T-19** Grupo automático "Pagar nos próximos 5 dias" com luz, água, internet e parcela "5 de 10". Mostrar a regra no topo (tipo = conta, prazo até hoje+5, status ≠ pago) e o seletor de ordenação.
- **T-20** Possíveis duplicados: dois "Conta de luz - novembro" lado a lado, com "Mesclar" e "Manter os dois".
- **T-21** Histórico de "Conta de luz": 12 meses, mini gráfico de barras, média e variação sobre o mês anterior.
- **T-22** Desktop: barra lateral (Mensal, Semana, Temporário), 4 a 5 trilhos lado a lado sem colunas desenhadas, busca, filtro por tipo/subcategoria e botão para alternar trilhos e mural.
- **T-23** Variação em modo escuro de uma tela à minha escolha.

## 8. Regras para o Gemini
- Se perder o estilo, vou dizer *"mantenha o estilo exato da Imagem 1"*; refaça seguindo a primeira imagem.
- Não invente funções fora deste documento; se faltar informação, escolha o mais simples e avise em uma linha.
- Nada em inglês nas telas. Textos curtos e legíveis, alvos de toque grandes.
- Nunca mostrar a senha em texto (sempre •••••• até clicar em "mostrar").

### Correções da rodada 1 (valem para refazer as Imagens 1 e 2 e para todas as seguintes)
- Não escrever "Trilhos com" nem qualquer texto de instrução do briefing nas telas.
- Formato brasileiro: R$ 1.240,00; datas 07/11/2026. Nunca "R$" solto sem valor.
- Datas reais nas subtarefas (ex.: "Renovar passaporte, até 30/11"); nunca o texto "(prazo próprio)".
- Grupos onde o item aparece: **chips coloridos com o nome** (Hoje, Semana, Mensal), sem escrever o nome da cor.
- O painel mostra os três trilhos: Hoje (amarelo), Pagar nos próximos 5 dias (verde) e Semana (azul).
- Tarefa tem prazo e pontinhos de grupos, nunca valor em R$.
- Uma só moldura em todas as telas: celular alto, borda preta fina, cantos arredondados. Um só celular por tela.
- T-02b: o card cresce a partir da posição original, não aparece pequeno no centro.

**Comece pela Imagem 1 (Fluxo A, T-01 a T-05), em uma única imagem.**

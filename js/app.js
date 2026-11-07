(() => {
  const A = Adaptador;
  const TIPO = { conta: '💲', tarefa: '✓', compromisso: '📅', sonho: '⭐', servico: '⚡' };
  const ORD = { manual: '✋', prazo: '📅', parado: '⏳' };
  const PROX = { manual: 'prazo', prazo: 'parado', parado: 'manual' };
  const NOME_ORD = { manual: 'manual', prazo: 'por prazo', parado: 'por tempo parado' };
  const CORES = ['#f2c230', '#5b9df0', '#4fb286', '#a070d8', '#f08bb4', '#f09a52'];
  let S = { itens: [], grupos: [], vinculos: [] };

  const $ = (s, e = document) => e.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h !== undefined) e.innerHTML = h; return e; };
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const brl = c => (c / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const dia = d => d ? d.slice(8, 10) + '/' + d.slice(5, 7) : '';
  const hoje = () => new Date().toLocaleDateString('sv-SE');
  const diasDesde = d => Math.floor((Date.now() - new Date(d)) / 864e5);

  async function carregar() {
    for (const aba of ['itens', 'grupos', 'vinculos']) S[aba] = (await A.listar(aba)).dados;
  }
  async function recarregar() { await carregar(); render(); }
  async function aplicar(ops) {
    if (ops.length) { const r = await A.lote(ops); if (!r.ok) alert('Não salvou: ' + r.erro); }
    await recarregar();
  }

  function itensDoGrupo(g) {
    const L = S.vinculos.filter(v => v.grupo_id === g.id)
      .map(v => ({ v, i: S.itens.find(i => i.id === v.item_id) }))
      .filter(x => x.i && !x.i.item_pai);
    const m = g.ordenacao_padrao;
    L.sort((a, b) => m === 'prazo' ? (a.i.prazo || '9').localeCompare(b.i.prazo || '9')
      : m === 'parado' ? (a.i.atualizado_em || '').localeCompare(b.i.atualizado_em || '')
      : a.v.ordem - b.v.ordem);
    return L.map(x => x.i);
  }

  function card(i, g) {
    const subs = S.itens.filter(s => s.item_pai === i.id);
    const feitas = subs.filter(s => s.status === 'feito').length;
    const fim = ['feito', 'pago'].includes(i.status);
    const atras = !fim && i.prazo && i.prazo.slice(0, 10) < hoje();
    const parado = !fim && i.atualizado_em && diasDesde(i.atualizado_em) >= 7;
    const pontos = S.vinculos.filter(v => v.item_id === i.id && v.grupo_id !== g.id)
      .map(v => S.grupos.find(x => x.id === v.grupo_id)).filter(Boolean)
      .map(x => `<i style="background:${x.cor}" title="${esc(x.nome)}"></i>`).join('');
    const c = el('li', 'card' + (atras ? ' atrasado' : '') + (fim ? ' feito' : ''));
    c.dataset.i = i.id;
    c.innerHTML =
      `<div class="t"><span>${TIPO[i.tipo] || '•'}</span><b>${esc(i.titulo)}</b><button class="mv" aria-label="Mover ou remover">⋯</button></div>` +
      `<div class="m">${i.valor ? `<span>${brl(i.valor)}</span>` : ''}${i.prazo ? `<span>${atras ? 'venceu ' : 'vence '}${dia(i.prazo)}</span>` : ''}</div>` +
      (subs.length ? `<div class="bar"><u style="width:${feitas / subs.length * 100}%"></u></div><small>${feitas} de ${subs.length} feitas</small>` : '') +
      `<div class="sl">${fim ? `<em class="ok">${i.status === 'pago' ? 'pago' : 'feito'} ✓</em>` : ''}` +
      `${i.situacao === 'trial' ? `<em class="tr">trial até ${dia(i.fim_trial)}</em>` : ''}` +
      `${parado ? `<em class="pa">parado há ${diasDesde(i.atualizado_em)} dias</em>` : ''}<span class="pt">${pontos}</span></div>`;
    return c;
  }

  function render() {
    const b = $('#painel');
    b.innerHTML = '';
    S.grupos.forEach(g => {
      const t = el('section', 'trilho');
      t.style.setProperty('--c', g.cor);
      t.dataset.g = g.id;
      t.innerHTML = `<header class="chip"><b>${esc(g.nome)}</b><button class="ord" title="Ordenação: ${NOME_ORD[g.ordenacao_padrao]}">${ORD[g.ordenacao_padrao]}</button><button class="add" aria-label="Novo item">+</button></header><ul class="lista" data-g="${g.id}"></ul>`;
      const ul = $('ul', t);
      itensDoGrupo(g).forEach(i => ul.append(card(i, g)));
      b.append(t);
      new Sortable(ul, { group: 'cards', animation: 150, delay: 160, delayOnTouchOnly: true, sort: g.ordenacao_padrao === 'manual', ghostClass: 'fantasma', onEnd: soltou });
    });
    const n = el('button', 'novo', '+ Grupo');
    n.onclick = async () => {
      const nome = prompt('Nome do grupo');
      if (!nome || !nome.trim()) return;
      await aplicar([{ op: 'criar', aba: 'grupos', dados: { nome: nome.trim(), tipo: 'manual', ordenacao_padrao: 'manual', cor: CORES[S.grupos.length % CORES.length] } }]);
    };
    b.append(n);
  }

  function opsMover(id, de, para) {
    const ops = [{ op: 'apagar', aba: 'vinculos', id: id + '|' + de }];
    if (!S.vinculos.some(v => v.item_id === id && v.grupo_id === para))
      ops.push({ op: 'criar', aba: 'vinculos', dados: { item_id: id, grupo_id: para, ordem: 999 } });
    return ops;
  }

  async function soltou(ev) {
    const de = ev.from.dataset.g, para = ev.to.dataset.g, id = ev.item.dataset.i;
    const ops = de !== para ? opsMover(id, de, para) : [];
    new Set([ev.from, ev.to]).forEach(ul => {
      const g = S.grupos.find(x => x.id === ul.dataset.g);
      if (g.ordenacao_padrao === 'manual')
        [...ul.children].forEach((li, n) => ops.push({ op: 'editar', aba: 'vinculos', id: li.dataset.i + '|' + g.id, dados: { ordem: n } }));
    });
    await aplicar(ops);
  }

  function folha(titulo, botoes) {
    const f = el('div', 'folha'), c = el('div', 'caixa', `<h3>${esc(titulo)}</h3>`);
    botoes.forEach(([txt, fn, cls]) => {
      const b = el('button', cls || '', esc(txt));
      b.onclick = async () => { f.remove(); await fn(); };
      c.append(b);
    });
    const x = el('button', '', 'Cancelar');
    x.onclick = () => f.remove();
    c.append(x);
    f.append(c);
    f.onclick = e => { if (e.target === f) f.remove(); };
    document.body.append(f);
  }

  $('#painel').addEventListener('click', async e => {
    const t = e.target.closest('.trilho');
    if (!t) return;
    const g = S.grupos.find(x => x.id === t.dataset.g);
    if (e.target.closest('.ord')) {
      await A.editar('grupos', g.id, { ordenacao_padrao: PROX[g.ordenacao_padrao] });
      await recarregar();
    } else if (e.target.closest('.add')) {
      const nome = prompt('Título do novo item');
      if (!nome || !nome.trim()) return;
      const id = A.novoId();
      await aplicar([
        { op: 'criar', aba: 'itens', dados: { id, titulo: nome.trim(), tipo: 'tarefa', status: 'pendente' } },
        { op: 'criar', aba: 'vinculos', dados: { item_id: id, grupo_id: g.id, ordem: 999 } }
      ]);
    } else if (e.target.closest('.mv')) {
      const id = e.target.closest('.card').dataset.i;
      const item = S.itens.find(i => i.id === id);
      const botoes = S.grupos.filter(x => x.id !== g.id).map(x => ['Mover para ' + x.nome, () => aplicar(opsMover(id, g.id, x.id))]);
      botoes.push(['Tirar deste grupo', () => aplicar([{ op: 'apagar', aba: 'vinculos', id: id + '|' + g.id }])]);
      botoes.push(['Apagar item', () => {
        if (!confirm('Apagar o item em todos os grupos?')) return;
        const ops = [{ op: 'apagar', aba: 'itens', id }];
        S.itens.filter(s => s.item_pai === id).forEach(s => ops.push({ op: 'apagar', aba: 'itens', id: s.id }));
        return aplicar(ops);
      }, 'perigo']);
      folha(item.titulo, botoes);
    }
  });

  $('#menu').onclick = () => folha('Painel Pessoal', [
    ['Exportar backup (JSON)', () => {
      const a = el('a');
      a.href = URL.createObjectURL(new Blob([A.exportar()], { type: 'application/json' }));
      a.download = 'painel-backup.json';
      a.click();
    }],
    ['Importar backup', () => $('#arq').click()],
    ['Restaurar dados de exemplo', async () => {
      if (confirm('Isso apaga as alterações feitas neste aparelho. Continuar?')) { await A.restaurar(); await recarregar(); }
    }, 'perigo']
  ]);

  $('#arq').onchange = async e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = await A.importar(await f.text());
    if (r.ok) await recarregar(); else alert(r.erro);
    e.target.value = '';
  };

  (async () => {
    const r = await A.iniciar();
    if (!r.ok) { $('#painel').textContent = r.erro; return; }
    await recarregar();
  })();
})();

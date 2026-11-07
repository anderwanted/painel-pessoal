// Adaptador N1: guarda tudo no navegador (localStorage). Contrato em 02-dados.md (D-16).
const Adaptador = (() => {
  const KEY = 'painel-pessoal:n1', ABAS = ['itens', 'grupos', 'vinculos'];
  let db = null;
  const ok = d => ({ ok: true, dados: d }), erro = m => ({ ok: false, erro: m });
  const agora = () => new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T').slice(0, 16);
  const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const chave = (aba, o) => aba === 'vinculos' ? o.item_id + '|' + o.grupo_id : o.id;
  const salvar = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} };

  function exec(o) {
    const L = db[o.aba];
    if (!L) throw new Error('aba inexistente: ' + o.aba);
    if (o.op === 'criar') {
      const d = { ...o.dados };
      if (o.aba !== 'vinculos') { d.id = d.id || novoId(); d.criado_em = d.atualizado_em = agora(); d.dono = d.dono || ''; }
      L.push(d);
      return d;
    }
    const i = L.findIndex(x => chave(o.aba, x) === o.id && !x.apagado_em);
    if (i < 0) throw new Error('não encontrado: ' + o.id);
    if (o.op === 'editar') {
      Object.assign(L[i], o.dados);
      if (o.aba !== 'vinculos') L[i].atualizado_em = agora();
      return L[i];
    }
    if (o.op === 'apagar') {
      if (o.aba === 'vinculos') L.splice(i, 1); else L[i].apagado_em = agora(); // soft delete (vínculo some de vez)
      return {};
    }
    throw new Error('operação inválida: ' + o.op);
  }

  return {
    novoId,
    async iniciar() {
      try { db = JSON.parse(localStorage.getItem(KEY)); } catch (e) { db = null; }
      if (!db || !ABAS.every(a => Array.isArray(db[a]))) return this.restaurar();
      return ok();
    },
    async restaurar() {
      try { db = await (await fetch('data/dados-exemplo.json')).json(); salvar(); return ok(); }
      catch (e) { return erro('Não foi possível carregar data/dados-exemplo.json'); }
    },
    async listar(aba, filtro) {
      const L = (db[aba] || []).filter(x => !x.apagado_em);
      return ok(filtro ? L.filter(filtro) : L);
    },
    async criar(aba, dados) { return this.lote([{ op: 'criar', aba, dados }]); },
    async editar(aba, id, dados) { return this.lote([{ op: 'editar', aba, id, dados }]); },
    async apagar(aba, id) { return this.lote([{ op: 'apagar', aba, id }]); },
    async lote(ops) {
      const copia = JSON.stringify(db);
      try { const r = ops.map(exec); salvar(); return ok(r); }
      catch (e) { db = JSON.parse(copia); return erro(e.message); }
    },
    exportar() { return JSON.stringify(db, null, 1); },
    async importar(texto) {
      try {
        const d = JSON.parse(texto);
        if (!ABAS.every(a => Array.isArray(d[a]))) return erro('Arquivo inválido: faltam abas.');
        db = d; salvar(); return ok();
      } catch (e) { return erro('Arquivo inválido.'); }
    }
  };
})();

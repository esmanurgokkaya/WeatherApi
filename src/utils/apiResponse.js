const ok = (data = null, meta= null) => ({ ok: true, data, meta });
const created = (data = null) => ({ ok: true, data});
const paged = (items= [], page=1, pageSize=10, total=0) => ({ok: true, data: items, meta: { page, pageSize, total }});

module.exports = { ok, created, paged };
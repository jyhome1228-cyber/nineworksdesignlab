const DATA = window.NWDL_DATA || {};
const el = (selector) => document.querySelector(selector);
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const entryHref = (type, id) => `entry.html?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
const typeFromId = (id = '') => {
  if (id.startsWith('R.')) return 'research';
  if (id.startsWith('WP.') || id.startsWith('P.')) return 'papers';
  if (id.startsWith('J.')) return 'journal';
  if (id.startsWith('A.')) return 'archive';
  return '';
};

function getData(name) {
  return Array.isArray(DATA[name]) ? DATA[name] : [];
}

function researchRow(item) {
  const progress = Number(item.progress) || 0;
  return `
    <a class="row" href="${entryHref('research', item.id)}">
      <div class="meta">${esc(item.id)}</div>
      <div>
        <div class="row-title">${esc(item.title)}</div>
        <div class="row-sub">${esc(item.titleKo)}</div>
        <div class="progress" aria-label="Progress ${progress}%"><i style="width:${progress}%"></i></div>
      </div>
      <div class="status">${esc(item.status)}</div>
      <div class="meta">${progress}%</div>
    </a>`;
}

function paperRow(item) {
  const progress = Number(item.progress) || 0;
  return `
    <a class="row" href="${entryHref('papers', item.id)}">
      <div class="meta">${esc(item.id)}</div>
      <div>
        <div class="row-title">${esc(item.title)}</div>
        <div class="row-sub">${esc(item.titleKo)}</div>
        <div class="progress" aria-label="Progress ${progress}%"><i style="width:${progress}%"></i></div>
      </div>
      <div class="status">${esc(item.status)}</div>
      <div class="meta">${progress}%</div>
    </a>`;
}

function card(item, type) {
  return `
    <a class="card" href="${entryHref(type, item.id)}">
      <div class="meta">${esc(item.id)} · ${esc(item.type || item.category || 'ARCHIVE')}</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.titleKo || item.summary || '')}</p>
      <div class="card-foot">
        <span>${esc(item.date || item.year || item.updated || '')}</span>
        <span>${esc(item.readTime || item.category || '')}</span>
      </div>
    </a>`;
}

function renderHome() {
  const research = getData('research');
  const papers = getData('papers');
  const journal = getData('journal');
  const archive = getData('archive');

  const stats = [
    ['ACTIVE RESEARCH', research.filter((item) => item.status !== 'COMPLETE').length],
    ['WORKING PAPERS', papers.filter((item) => item.type === 'WORKING PAPER').length],
    ['PUBLICATIONS', papers.filter((item) => item.type === 'PUBLICATION').length],
    ['JOURNAL', journal.length],
    ['ARCHIVE', archive.length]
  ];

  if (el('[data-stats]')) {
    el('[data-stats]').innerHTML = stats
      .map(([label, value]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`)
      .join('');
  }
  if (el('[data-research]')) el('[data-research]').innerHTML = research.slice(0, 2).map(researchRow).join('');
  if (el('[data-papers]')) el('[data-papers]').innerHTML = papers.slice(0, 2).map(paperRow).join('');
  if (el('[data-journal]')) el('[data-journal]').innerHTML = journal.slice(0, 2).map((item) => card(item, 'journal')).join('');
  if (el('[data-archive]')) el('[data-archive]').innerHTML = archive.slice(0, 2).map((item) => card(item, 'archive')).join('');
}

function renderListing(type) {
  const items = getData(type);
  const host = el('[data-list]');
  if (!host) return;

  if (!items.length) {
    host.innerHTML = '<p class="empty">No entries yet.</p>';
    return;
  }

  if (type === 'research') host.innerHTML = items.map(researchRow).join('');
  else if (type === 'papers') host.innerHTML = items.map(paperRow).join('');
  else host.innerHTML = items.map((item) => card(item, type)).join('');
}

function relationLinks(item) {
  const ids = [
    ...(item.relatedResearch || []),
    ...(item.relatedPapers || []),
    ...(item.relatedJournal || []),
    ...(item.relatedArchive || [])
  ];

  if (!ids.length) return '';

  return `
    <section class="section">
      <div class="section-head">
        <p class="kicker">CONNECTED KNOWLEDGE</p>
        <h2>Related Entries</h2>
      </div>
      <div class="list">
        ${ids.map((id) => {
          const type = typeFromId(id);
          return `<a class="activity" href="${entryHref(type, id)}"><span class="meta">${esc(id)}</span><span>OPEN RELATED ENTRY ↗</span></a>`;
        }).join('')}
      </div>
    </section>`;
}

function renderEntry() {
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const id = params.get('id');

  if (!['research', 'papers', 'journal', 'archive'].includes(type) || !id) {
    throw new Error('Invalid entry');
  }

  const item = getData(type).find((entry) => entry.id === id);
  if (!item) throw new Error('Entry not found');

  document.title = `${item.id} — NINEWORKS DESIGN LAB`;
  let body = '';

  if (type === 'research') {
    body = `
      <section class="section">
        <div class="section-head">
          <p class="kicker">RESEARCH QUESTION</p>
          <h2>${esc(item.question || 'Research question in progress')}</h2>
        </div>
        <p class="page-intro">${esc(item.summary || '')}</p>
      </section>
      <section class="section">
        <div class="section-head">
          <p class="kicker">KEYWORDS</p>
          <h2>${(item.keywords || []).map(esc).join(' / ')}</h2>
        </div>
      </section>`;
  } else if (type === 'papers') {
    const progress = Number(item.progress) || 0;
    body = `
      <section class="section">
        <div class="section-head">
          <p class="kicker">PAPER STATUS</p>
          <h2>${esc(item.type || 'PAPER')} · ${esc(item.status || '')}</h2>
        </div>
        <div class="progress" aria-label="Progress ${progress}%"><i style="width:${progress}%"></i></div>
      </section>
      ${item.stages ? `
        <section class="section">
          <div class="section-head">
            <p class="kicker">PROGRESS</p>
            <h2>Research Stages</h2>
          </div>
          ${item.stages.map(([name, status]) => `<div class="activity"><span>${esc(name)}</span><span class="status">${esc(status)}</span></div>`).join('')}
        </section>` : ''}
      ${item.citation ? `
        <section class="section">
          <div class="section-head">
            <p class="kicker">CITATION</p>
            <h2>${esc(item.citation)}</h2>
          </div>
        </section>` : ''}`;
  } else {
    body = `
      <section class="section">
        <div class="section-head">
          <p class="kicker">${esc(item.category || item.type || 'ENTRY')}</p>
          <h2>${esc(item.titleKo || item.title)}</h2>
        </div>
        <p class="page-intro">${esc(item.summary || '')}</p>
      </section>`;
  }

  const host = el('[data-entry]');
  if (!host) return;
  host.innerHTML = `
    <section class="page-hero">
      <p class="kicker">${esc(item.id)} · ${esc(item.status || item.type || item.category || 'ARCHIVE')}</p>
      <h1>${esc(item.title)}</h1>
      <p class="page-intro">${esc(item.titleKo || '')}</p>
    </section>
    ${body}
    ${relationLinks(item)}`;
}

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  try {
    if (page === 'home') renderHome();
    else if (page === 'entry') renderEntry();
    else if (['research', 'papers', 'journal', 'archive'].includes(page)) renderListing(page);
  } catch (error) {
    console.error(error);
    const host = el('[data-entry]') || el('[data-list]') || el('[data-research]');
    if (host) {
      host.innerHTML = '<section class="page-hero"><p class="kicker">ERROR</p><h1>Entry unavailable.</h1><p class="page-intro">Content data could not be loaded.</p></section>';
    }
  }
});

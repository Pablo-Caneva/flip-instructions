(function () {
  const viewer       = document.getElementById('viewer');
  const viewerTitle  = document.getElementById('viewerTitle');
  const expandedBody = document.querySelector('.expanded-body');

  // Cache loaded card fragments so each file is fetched only once
  const cardCache = new Map();

  async function loadCardHTML(cardName) {
    if (!cardName) throw new Error('No card specified');
    if (cardCache.has(cardName)) return cardCache.get(cardName);

    const url = `cards/${cardName}.html`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
    const html = await res.text();
    cardCache.set(cardName, html);
    return html;
  }

  async function openViewer(node) {
    const title = node.dataset.title || 'Step';
    const card  = node.dataset.card  || ''; // e.g., "card1"

    viewerTitle.textContent = title;
    expandedBody.innerHTML = `<div class="p-3 small text-muted">Loading…</div>`;

    try {
      const html = await loadCardHTML(card);
      expandedBody.innerHTML = html; // inject fragment
    } catch (err) {
      expandedBody.innerHTML = `<div class="p-3 text-danger small">Error: ${err.message}</div>`;
    }

    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');

    // lock background scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');

    // restore scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Open on node click
  document.querySelectorAll('.node').forEach(btn => {
    btn.addEventListener('click', () => openViewer(btn));
  });

  // === ONLY CLOSE when clicking inside the right 2/3 column ===
  viewer.addEventListener('click', (e) => {
    // Close if click happened in the designated close zone inside the card
    if (e.target.closest('.close-on-click')) {
      closeViewer();
    }
    // Otherwise: do nothing (backdrop, header, left column, etc. won't close)
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('open')) {
      closeViewer();
    }
  });
})();
(function () {
  const PLACEHOLDER = '[data-include="adn-teams"]';
  const STORAGE_KEY = 'adn:selectedTeam';
  const PARTIAL_URL = `partials/teams-slider.html?v=${Date.now()}`;

 
  const TEAMS = [
    { id:'pereira',   name:'Pereira',     logo:'img/teams/pereira.png' },
    { id:'barcelona', name:'Barcelona',   logo:'img/teams/barcelona.png' },
    { id:'bayern',    name:'Bayern',      logo:'img/teams/bayern.png' },
    { id:'psg',       name:'PSG',         logo:'img/teams/psg.png' },
    { id:'realmadrid',name:'Real Madrid', logo:'img/teams/realmadrid.png' },
    { id:'america',   name:'América',     logo:'img/teams/america.png' },
    { id:'nacional',  name:'Nacional',    logo:'img/teams/nacional.png' },
    { id:'junior',    name:'Junior',      logo:'img/teams/junior.png' },
    { id:'santafe',   name:'Santa Fe',    logo:'img/teams/santafe.png' },
    { id:'millos',    name:'Millonarios', logo:'img/teams/millonarios.png' },
    { id:'dim',       name:'DIM',         logo:'img/teams/dim.png' },
    { id:'cali',      name:'Dep. Cali',   logo:'img/teams/cali.png' },
  ];

  const FALLBACK_HTML = `
  <section class="adn-teams">
    <div class="adn-teams__wrap">
      <h3 class="adn-teams__title">¿De qué equipo eres hincha?</h3>
      <div class="adn-teams__controls">
        <button class="adn-teams__btn" data-dir="prev" aria-label="Anterior">‹</button>
        <button class="adn-teams__btn" data-dir="next" aria-label="Siguiente">›</button>
      </div>
      <div class="adn-teams__viewport" tabindex="0" aria-label="Carrusel de equipos">
        <ul class="adn-teams__track" role="list"></ul>
      </div>
    </div>
  </section>`.trim();

  function renderItems(track, teams, selectedId) {
    track.innerHTML = teams.map(t => `
      <li class="adn-team" role="checkbox" aria-checked="${t.id===selectedId}" data-id="${t.id}">
        <button class="adn-team__badge" title="${t.name}">
          <img src="${t.logo}" alt="${t.name}"
               onerror="this.onerror=null;this.remove();this.parentElement.setAttribute('data-fallback','1');this.parentElement.textContent='${t.name.split(' ')[0]}';">
        </button>
        <span class="adn-team__name">${t.name}</span>
      </li>
    `).join('');
  }

  function mountLogic(root){
    const viewport = root.querySelector('.adn-teams__viewport');
    const track    = root.querySelector('.adn-teams__track');
    const prevBtn  = root.querySelector('[data-dir="prev"]');
    const nextBtn  = root.querySelector('[data-dir="next"]');

    const saved = localStorage.getItem(STORAGE_KEY);
    const selectedId = saved || TEAMS[0].id;
    renderItems(track, TEAMS, selectedId);

    function select(id, emit=true){
      [...track.children].forEach(li => li.setAttribute('aria-checked', String(li.dataset.id===id)));
      localStorage.setItem(STORAGE_KEY, id);
      if (emit) root.dispatchEvent(new CustomEvent('adn:team-change', { detail:{ id } }));
    }
    track.addEventListener('click', e => {
      const li = e.target.closest('.adn-team');
      if (!li) return;
      select(li.dataset.id);
    });

    const STEP = () => Math.min(viewport.clientWidth*0.8, 340);
    prevBtn.addEventListener('click', () => viewport.scrollBy({ left:-STEP(), behavior:'smooth' }));
    nextBtn.addEventListener('click', () => viewport.scrollBy({ left:+STEP(), behavior:'smooth' }));

    viewport.addEventListener('keydown', e => {
      if (e.key==='ArrowLeft')  prevBtn.click();
      if (e.key==='ArrowRight') nextBtn.click();
    });

    let down=false, startX=0, startL=0;
    const start = x => (down=true, startX=x, startL=viewport.scrollLeft);
    const move  = x => { if (down) viewport.scrollLeft = startL - (x-startX); };
    const end   = () => (down=false);
    viewport.addEventListener('mousedown', e => { viewport.style.cursor='grabbing'; start(e.clientX); });
    viewport.addEventListener('mousemove', e => move(e.clientX));
    viewport.addEventListener('mouseup',   () => { viewport.style.cursor='auto'; end(); });
    viewport.addEventListener('mouseleave',() => { viewport.style.cursor='auto'; end(); });
    viewport.addEventListener('touchstart', e => start(e.touches[0].clientX), {passive:true});
    viewport.addEventListener('touchmove',  e => move(e.touches[0].clientX),  {passive:true});
    viewport.addEventListener('touchend',   end);

    select(selectedId, false);
    console.log('[teams] slider OK');
  }

  function mount() {
    const ph = document.querySelector(PLACEHOLDER);
    if (!ph) { console.warn('[teams] no hay placeholder', PLACEHOLDER); return; }

    fetch(PARTIAL_URL, { cache:'no-store' })
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(html => { ph.innerHTML = html; })
      .catch(() => { ph.innerHTML = FALLBACK_HTML; })
      .finally(() => {
        const root = ph.querySelector('.adn-teams');
        if (!root) { console.error('[teams] no se insertó el HTML del slider'); return; }
        mountLogic(root);
      });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', mount)
    : mount();

  
  window.ADNTeams = {
    getSelected: () => localStorage.getItem(STORAGE_KEY),
    onChange: (fn) => {
      const sec = document.querySelector('.adn-teams');
      if (!sec) return () => {};
      const h = e => fn(e.detail.id);
      sec.addEventListener('adn:team-change', h);
      return () => sec.removeEventListener('adn:team-change', h);
    }
  };
})();


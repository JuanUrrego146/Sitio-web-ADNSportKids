(function () {
  const mountSel = '[data-include="adn-header"]';
  const url = `partials/header.html?v=${Date.now()}`; 

  
  function ensureUI(root) {

    let top = root.querySelector('.adn-top');
    if (!top) {
      const firstContainer = root.querySelector('.adn-container');
      if (firstContainer && !firstContainer.closest('.adn-top')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'adn-top';
        firstContainer.parentNode.insertBefore(wrapper, firstContainer);
        wrapper.appendChild(firstContainer);
      }
    }

   
    let actions = root.querySelector('.adn-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'adn-actions';
      Object.assign(actions.style, {display:'flex',alignItems:'center',gap:'14px'});
      (root.querySelector('.adn-top .adn-container') || root.querySelector('.adn-container'))?.appendChild(actions);
    }

    const iconBtn = (aria, d, stroke=false) => {
      const a = document.createElement('a');
      a.className = 'adn-icon-btn';
      a.href = `#${aria.toLowerCase()}`;
      a.setAttribute('aria-label', aria);
      Object.assign(a.style, {display:'grid',placeItems:'center',width:'32px',height:'32px',textDecoration:'none'}); // <= sin color inline
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('width','22'); svg.setAttribute('height','22');
      const p = document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d', d);
      if (stroke){ p.setAttribute('fill','none'); p.setAttribute('stroke','currentColor'); p.setAttribute('stroke-width','2'); p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round'); }
      else { p.setAttribute('fill','currentColor'); }
      svg.appendChild(p); a.appendChild(svg);
      return a;
    };

    if (!root.querySelector('[aria-label="Favoritos"]')) {
      actions.appendChild(iconBtn('Favoritos','M12 21c-.2 0-6.1-4.3-8.5-7.2C1.9 11.9 2.2 9 4.5 7.8c1.6-.9 3.6-.6 4.9.6L12 10.9l2.6-2.5c1.3-1.2 3.3-1.5 5-.6 2.3 1.2 2.6 4.1.5 6-2.4 2.9-8.3 7.2-8.5 7.2z'));
    }

    if (!root.querySelector('.adn-search')) {
      const form = document.createElement('form');
      form.className = 'adn-search'; form.setAttribute('role', 'search');
      Object.assign(form.style, {display:'inline-flex',alignItems:'center',gap:'8px',background:'#c9a227',borderRadius:'999px',padding:'6px 8px 6px 14px',height:'36px'});
      const input = document.createElement('input');
      Object.assign(input, {type:'search', placeholder:'Buscar...'}); input.setAttribute('aria-label','Buscar');
      Object.assign(input.style, {border:'0',outline:'0',background:'transparent',color:'#000',width:'140px',fontSize:'14px'});
      const btn = document.createElement('button'); btn.type='submit'; btn.setAttribute('aria-label','Buscar');
      Object.assign(btn.style,{display:'grid',placeItems:'center',width:'28px',height:'28px',border:'0',borderRadius:'50%',background:'rgba(0,0,0,.15)',cursor:'pointer'});
      const s = document.createElementNS('http://www.w3.org/2000/svg','svg');
      s.setAttribute('viewBox','0 0 24 24'); s.setAttribute('width','18'); s.setAttribute('height','18');
      const sp = document.createElementNS('http://www.w3.org/2000/svg','path');
      sp.setAttribute('d','M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z');
      sp.setAttribute('fill','none'); sp.setAttribute('stroke','#000'); sp.setAttribute('stroke-width','2'); sp.setAttribute('stroke-linecap','round');
      s.appendChild(sp); btn.appendChild(s);
      form.appendChild(input); form.appendChild(btn);
      form.addEventListener('submit', e => e.preventDefault());
      actions.appendChild(form);
    }
  }

  function ensureNav(root){
    if (root.querySelector('.adn-nav')) return;

    const nav = document.createElement('nav');
    nav.className = 'adn-nav';
    nav.style.background = '#0a0a0a';
    nav.style.borderTop = '1px solid #e9e9e9';

    const wrap = document.createElement('div');
    wrap.className = 'adn-container';
    Object.assign(wrap.style, {padding:'8px 24px',display:'flex',justifyContent:'center'});

    const ul = document.createElement('ul');
    ul.className = 'adn-nav-list';
    Object.assign(ul.style, {
      margin:'0', padding:'0', listStyle:'none',
      display:'flex', gap:'22px',
      alignItems:'center', justifyContent:'center',
      whiteSpace:'nowrap', overflow:'auto'
    });

    const add = (txt, href) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href; a.textContent = txt;
     
      Object.assign(a.style, {
        display:'inline-block', textDecoration:'none', textTransform:'uppercase',
        fontWeight:'700', letterSpacing:'.4px', padding:'4px 0'
      });
      li.appendChild(a); ul.appendChild(li);
    };

    add('Hombre','#hombre');
    add('Mujer','#mujer');
    add('Bolsas','#bolsas');
    add('Accesorios','#accesorios');
    add('Balones','#balones');
    add('Uniformes','#uniformes');
    add('Zapatillas','#zapatillas');

    wrap.appendChild(ul); nav.appendChild(wrap);

    const header = root.querySelector('.adn-header') || root.firstElementChild;
    const top = root.querySelector('.adn-top') || header;
    (header || root).insertBefore(nav, top.nextSibling);
  }

  /* ========= Activo (amarillo) ========= */
  function wireActive(root){
    const links = Array.from(root.querySelectorAll('.adn-nav a'));
    if (!links.length) return;

    const setActive = (hash) => {
      links.forEach(a => {
        const is = a.getAttribute('href') === hash;
        a.classList.toggle('is-active', is);
        // Limpia cualquier inline viejo y forza el estado correcto
        a.style.color = is ? '' : ''; // deja que el CSS mande (blanco/amarillo)
      });
    };

    // click
    links.forEach(a => {
      a.addEventListener('click', () => setActive(a.getAttribute('href')));
    });

    // cambios de hash
    window.addEventListener('hashchange', () => setActive(location.hash));

    // estado inicial
    setActive(location.hash || '');
  }

  /* ========= bootstrap ========= */
  function inject() {
    const mount = document.querySelector(mountSel);
    if (!mount) return;

    fetch(url, { cache: 'no-store' })
      .then(r => (r.ok ? r.text() : Promise.reject('HTTP ' + r.status)))
      .then(html => {
        mount.innerHTML = html;
        ensureUI(mount);
        ensureNav(mount);
        wireActive(mount);
      })
      .catch(() => {
        // fallback mínimo
        mount.innerHTML = `
          <header class="adn-header">
            <div class="adn-top">
              <div class="adn-container">
                <a class="adn-brand" href="index.html" aria-label="ADN Sport Kids">
                  <img src="img/Logo_ADNSportkids.png" alt="ADN Sport Kids">
                </a>
                <div class="adn-actions">
                  <a class="adn-icon-btn" aria-label="Cuenta"></a>
                  <a class="adn-icon-btn" aria-label="Carrito"></a>
                </div>
              </div>
            </div>
          </header>`;
        ensureUI(mount);
        ensureNav(mount);
        wireActive(mount);
      });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', inject)
    : inject();
})();




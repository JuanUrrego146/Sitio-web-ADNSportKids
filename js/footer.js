// js/footer.js
(function () {
  const mountSel = '[data-include="adn-footer"]';
  const url = `partials/footer.html?v=${Date.now()}`;

  function injectYear(root){
    const y = root.querySelector('#adnYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  // 💡 Fuerza centrado sí o sí (aunque otro CSS lo pise)
  function forceCentered(root){
    const inner = root.querySelector('.adn-footer__inner');
    if (inner){
      Object.assign(inner.style, {
        maxWidth: '1200px',
        width: 'min(1200px, 100%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: inner.style.paddingLeft || '16px',
        paddingRight: inner.style.paddingRight || '16px',
        display: inner.style.display || 'grid',
        gridTemplateColumns: inner.style.gridTemplateColumns || '280px 1fr',
        gap: inner.style.gap || '48px',
        alignItems: inner.style.alignItems || 'start'
      });
    }
    const bottomWrap = root.querySelector('.adn-footer__bottom .adn-container');
    if (bottomWrap){
      Object.assign(bottomWrap.style, {
        maxWidth: '1200px',
        width: 'min(1200px, 100%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: bottomWrap.style.paddingLeft || '16px',
        paddingRight: bottomWrap.style.paddingRight || '16px',
        display: bottomWrap.style.display || 'flex',
        justifyContent: bottomWrap.style.justifyContent || 'center'
      });
    }
  }

  function ensureTwoCols(root){
    const inner = root.querySelector('.adn-footer__inner');
    if (!inner) return;
    const cols = inner.querySelectorAll('.adn-footer__col');
    if (cols.length < 2) {
      const col = document.createElement('section');
      col.className = 'adn-footer__col';
      col.innerHTML = `
        <h3 class="adn-footer__title">Contáctanos</h3>
        <ul class="adn-contact" style="list-style:none;margin:0;padding:0;display:grid;gap:16px;">
          <li style="display:flex;align-items:center;gap:12px;">
            <span class="adn-dot" aria-hidden="true" style="width:7px;height:7px;border-radius:50%;background:#fff;display:inline-block;"></span>
            <a href="mailto:ADN_SPORTKIDS@gmail.com" style="color:#fff;text-decoration:none;">ADN_SPORTKIDS@gmail.com</a>
          </li>
          <li style="display:flex;align-items:center;gap:12px;">
            <span class="adn-dot" aria-hidden="true" style="width:7px;height:7px;border-radius:50%;background:#fff;display:inline-block;"></span>
            <a href="tel:+573003275082" style="color:#fff;text-decoration:none;">+57 300 3275082</a>
          </li>
        </ul>`;
      inner.appendChild(col);
      console.warn('[footer] Se reconstruyó la columna de contacto (fallback).');
    }
  }

  function inject() {
    const mount = document.querySelector(mountSel);
    if (!mount) { console.error('[footer] Falta el contenedor', mountSel); return; }

    fetch(url, { cache: 'no-store' })
      .then(r => (r.ok ? r.text() : Promise.reject('HTTP ' + r.status)))
      .then(html => {
        mount.innerHTML = html;
        injectYear(mount);
        ensureTwoCols(mount);
        forceCentered(mount);     // ⬅️ centrado a prueba de todo
        console.log('[footer] OK renderizado');
      })
      .catch(err => {
        console.error('[footer] Error:', err);
        mount.innerHTML = `
          <footer class="adn-footer" style="background:#0b0b0b;color:#fff">
            <div class="adn-footer__inner adn-container"
                 style="display:grid;grid-template-columns:280px 1fr;gap:48px;align-items:start;
                        max-width:1200px;width:min(1200px,100%);margin:0 auto;padding:28px 16px 36px;">
              <section class="adn-footer__col">
                <h3 class="adn-footer__title">Síguenos</h3>
                <p>Instagram · Facebook · TikTok · YouTube</p>
              </section>
              <section class="adn-footer__col">
                <h3 class="adn-footer__title">Contáctanos</h3>
                <p><a href="mailto:ADN_SPORTKIDS@gmail.com" style="color:#fff">ADN_SPORTKIDS@gmail.com</a></p>
                <p><a href="tel:+573003275082" style="color:#fff">+57 300 3275082</a></p>
              </section>
            </div>
            <div class="adn-footer__bottom" style="border-top:1px solid #1e1e1e;background:#0a0a0a;padding:12px 0;">
              <div class="adn-container" style="max-width:1200px;width:min(1200px,100%);margin:0 auto;display:flex;justify-content:center;padding:0 16px;">
                <small style="color:#cfcfcf;">© <span id="adnYear"></span> ADN Sport Kids</small>
              </div>
            </div>
          </footer>`;
        injectYear(mount);
        forceCentered(mount);
      });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', inject)
    : inject();
})();






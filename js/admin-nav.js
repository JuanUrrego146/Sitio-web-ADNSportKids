(() => {
  const adminLinks = [
    { text: 'Inicio', href: 'admin.html' },
    { text: 'envíos', href: 'envios.html' },
    { text: 'usuarios', href: 'admin.html#usuarios' },
    { text: 'Artículos favoritos', href: 'admin.html#favoritos' },
    { text: 'Inventario', href: 'admin.html#articulos' }
  ];

  const applyNav = () => {
    const navList = document.querySelector('.adn-nav-list');
    if (!navList) return false;

    navList.innerHTML = '';
    adminLinks.forEach(({ text, href }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      li.appendChild(a);
      navList.appendChild(li);
    });
    return true;
  };

  const init = () => {
    if (applyNav()) return;

    const obs = new MutationObserver(() => {
      if (applyNav()) obs.disconnect();
    });

    obs.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
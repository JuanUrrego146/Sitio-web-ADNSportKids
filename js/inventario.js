(() => {
  const STORAGE_KEY = 'inventario-productos';
  const listContainer = document.getElementById('inventory-list');
  const countBadge = document.getElementById('inventory-count');
  const form = document.getElementById('inventory-form');
  let products = [];

  const renderProducts = () => {
    if (!listContainer || !countBadge) return;

    listContainer.innerHTML = '';

    if (!products.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No hay productos en el inventario. Agrega uno nuevo para comenzar.';
      empty.className = 'inventory-empty';
      listContainer.appendChild(empty);
    }

    products.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'inventory-item';

      const meta = document.createElement('div');
      meta.className = 'inventory-meta';
      meta.innerHTML = `
        <strong>${item.Nombre}</strong>
        <span>${item.Categoria} • ${item.Sub_Categoria}</span>
        <span>${item.precio}</span>
      `;

      const tags = document.createElement('div');
      tags.className = 'inventory-tags';

      [
        ['Color', item.color],
        ['Tallaje', item.tallaje],
        ['Número personalizado', item.pernumero],
        ['Img principal', item.imagen],
        ['Img secundaria', item.imagen2 || 'N/A']
      ].forEach(([label, value]) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = `${label}: ${value}`;
        tags.appendChild(tag);
      });

      meta.appendChild(tags);

      const actions = document.createElement('div');
      actions.className = 'inventory-actions';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'inventory-delete';
      deleteBtn.type = 'button';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
      });

      actions.appendChild(deleteBtn);
      card.appendChild(meta);
      card.appendChild(actions);
      listContainer.appendChild(card);
    });

    countBadge.textContent = products.length;
  };

  const saveProducts = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  };

  const loadProducts = async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      products = JSON.parse(stored);
      renderProducts();
      return;
    }

    try {
      const response = await fetch('json/productos.json');
      const data = await response.json();
      products = Array.isArray(data) ? data : [];
      saveProducts();
      renderProducts();
    } catch (error) {
      console.error('Error al cargar el inventario', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newItem = {};

    ['Categoria', 'Sub_Categoria', 'Nombre', 'imagen', 'precio', 'color', 'tallaje', 'pernumero', 'imagen2'].forEach(
      (key) => {
        const value = (formData.get(key) || '').toString().trim();
        if (key !== 'imagen2' && !value) return;
        newItem[key] = value || undefined;
      }
    );

    products.unshift(newItem);
    saveProducts();
    renderProducts();
    form.reset();
  };

  const init = () => {
    if (!listContainer || !form) return;
    form.addEventListener('submit', handleSubmit);
    loadProducts();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
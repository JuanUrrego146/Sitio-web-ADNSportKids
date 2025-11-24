(function () {
  const tablaUsuarios = document.getElementById('tabla-usuarios');
  const resumenUsuarios = document.getElementById('resumen-usuarios');
  const historialContainer = document.getElementById('historial-logins');
  const btnExportar = document.getElementById('btn-exportar');
  const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');
  const leerLocalStorageSeguro = (key, fallback) => {
    try {
      const rawValue = localStorage.getItem(key);
      if (!rawValue) return fallback;
      const parsed = JSON.parse(rawValue);
      if (Array.isArray(fallback)) {
        return Array.isArray(parsed) ? parsed : fallback;
      }

      if (parsed && typeof parsed === 'object') {
        return parsed;
      }

      return fallback;
    } catch (error) {
      console.warn(`No se pudo parsear el valor de ${key} en localStorage. Se usará el valor por defecto.`, error);
      localStorage.removeItem(key);
      return fallback;
    }
  };

  const obtenerUsuarios = () => {
    const data = leerLocalStorageSeguro('usuarios', { users: [] });
    return Array.isArray(data.users) ? data.users : [];
  };

  const guardarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify({ users: usuarios }));
  };

  const obtenerHistorial = () => leerLocalStorageSeguro('historial_logins', []);
  const guardarHistorial = (historial) => localStorage.setItem('historial_logins', JSON.stringify(historial));

  const formatearFecha = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const renderResumen = (usuarios) => {
    const activos = usuarios.filter(u => u.estado !== 'baneado').length;
    const baneados = usuarios.filter(u => u.estado === 'baneado').length;
    const total = usuarios.length;

    resumenUsuarios.innerHTML = '';

    const crearBadge = (texto, clase) => {
      const span = document.createElement('span');
      span.className = `badge ${clase}`;
      span.textContent = texto;
      return span;
    };

    resumenUsuarios.appendChild(crearBadge(`Total: ${total}`, 'badge--total'));
    resumenUsuarios.appendChild(crearBadge(`Activos: ${activos}`, 'badge--active'));
    resumenUsuarios.appendChild(crearBadge(`Baneados: ${baneados}`, 'badge--banned'));
  };

  const renderTabla = (usuarios) => {
    tablaUsuarios.innerHTML = '';

    if (!usuarios.length) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 5;
      cell.className = 'empty-state';
      cell.textContent = 'Aún no hay usuarios registrados en este navegador.';
      row.appendChild(cell);
      tablaUsuarios.appendChild(row);
      return;
    }

    const iconos = {
      ban: '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="presentation"><path d="M12 4a8 8 0 1 1-7.46 10.66l1.61-1.1A6 6 0 0 0 12 18a6 6 0 0 0 3.95-10.53l1.51-1.02A7.98 7.98 0 0 1 12 4ZM6.34 14.88 14.88 6.34A6 6 0 0 0 6.34 14.88Z"></path></svg></span>',
      unban: '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="presentation"><path d="m10 15.17 7.59-7.59 1.41 1.42L10 18l-4.99-4.99 1.41-1.41L10 15.17Z"></path></svg></span>',
      delete: '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="presentation"><path d="M6 7h12v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Zm12-2V4a1 1 0 0 0-1-1h-3.5l-.71-.71A1 1 0 0 0 12.29 2h-.58a1 1 0 0 0-.71.29L10.29 3H6a1 1 0 0 0-1 1v1h13ZM9 9v8h2V9H9Zm4 0v8h2V9h-2Z"></path></svg></span>'
    };

    usuarios.forEach((usuario, index) => {
      const row = document.createElement('tr');
      const estado = usuario.estado === 'baneado' ? 'Baneado' : 'Activo';

      row.innerHTML = `
        <td><strong>${usuario.username || 'Sin nombre'}</strong></td>
        <td>${usuario.email}</td>
        <td>${estado}</td>
        <td>${usuario.city || '—'}</td>
        <td></td>
      `;

      const actions = document.createElement('div');
      actions.className = 'user-actions';

      const btnBanear = document.createElement('button');
      btnBanear.className = 'btn-chip btn-outline';
      const estaBaneado = usuario.estado === 'baneado';
      btnBanear.innerHTML = `${estaBaneado ? iconos.unban : iconos.ban}${estaBaneado ? 'Quitar ban' : 'Banear'}`;
      btnBanear.addEventListener('click', () => {
        const usuariosActuales = obtenerUsuarios();
        const user = usuariosActuales[index];
        if (!user) return;
        user.estado = user.estado === 'baneado' ? 'activo' : 'baneado';
        guardarUsuarios(usuariosActuales);
        render();
      });

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn-chip btn-danger';
      btnEliminar.innerHTML = `${iconos.delete}Eliminar`;
      btnEliminar.addEventListener('click', () => {
        if (!confirm('¿Eliminar esta cuenta? Esta acción no se puede deshacer.')) return;
        const usuariosActuales = obtenerUsuarios();
        usuariosActuales.splice(index, 1);
        guardarUsuarios(usuariosActuales);
        render();
      });

      actions.appendChild(btnBanear);
      actions.appendChild(btnEliminar);
      row.querySelector('td:last-child').appendChild(actions);
      tablaUsuarios.appendChild(row);
    });
  };

  const renderHistorial = () => {
    const historial = obtenerHistorial();
    historialContainer.innerHTML = '';

    if (!historial.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Aún no hay inicios de sesión registrados.';
      historialContainer.appendChild(empty);
      return;
    }

    historial.forEach(item => {
      const row = document.createElement('div');
      row.className = 'login-row';
      row.innerHTML = `
        <div>
          <strong>${item.username || 'Usuario'}</strong>
          <span>${item.email}</span>
        </div>
        <time datetime="${item.fecha}">${formatearFecha(item.fecha)}</time>
      `;
      historialContainer.appendChild(row);
    });
  };

  const exportarCSV = (usuarios) => {
    const encabezados = ['Nombre', 'Correo', 'Estado', 'Ciudad'];
    const filas = usuarios.map(u => [u.username || '', u.email || '', u.estado || 'activo', u.city || '']);
    const contenido = [encabezados, ...filas]
      .map(celdas => celdas.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios-adn-sport-kids.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const render = () => {
    const usuarios = obtenerUsuarios();
    renderResumen(usuarios);
    renderTabla(usuarios);
    renderHistorial();
  };

  btnExportar?.addEventListener('click', () => exportarCSV(obtenerUsuarios()));
  btnLimpiarHistorial?.addEventListener('click', () => {
    if (!confirm('¿Seguro que deseas limpiar por completo el historial de logins?')) return;
    guardarHistorial([]);
    renderHistorial();
  });

  render();
})();
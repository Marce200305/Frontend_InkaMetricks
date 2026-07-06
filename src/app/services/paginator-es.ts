import { MatPaginatorIntl } from '@angular/material/paginator';

export function paginatorEspanol(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel   = 'Elementos por página:';
  intl.nextPageLabel       = 'Siguiente página';
  intl.previousPageLabel   = 'Página anterior';
  intl.firstPageLabel      = 'Primera página';
  intl.lastPageLabel       = 'Última página';
  intl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0) return 'Sin resultados';
    const start = page * pageSize + 1;
    const end   = Math.min((page + 1) * pageSize, length);
    return `${start} – ${end} de ${length}`;
  };
  return intl;
}

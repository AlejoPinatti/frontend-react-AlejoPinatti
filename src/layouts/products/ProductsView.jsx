import { useProductContext } from '../../context/ProductContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function ProductsView() {
  const { products, deleteProduct, loading, error } = useProductContext();
  const toast = useRef(null);

  const handleExport = () => {
    if (!products.length) {
      toast.current.show({severity: 'warn', summary: 'Advertencia', detail: 'No hay productos para exportar', life: 3000});
      return;
    }
    exportToPDF(products, 'Productos', ['nombre', 'precio']);
    toast.current.show({severity: 'success', summary: 'Éxito', detail: 'PDF generado correctamente', life: 3000});
  };

  const confirmDelete = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      deleteProduct(id);
      toast.current.show({severity: 'info', summary: 'Producto eliminado', detail: `ID: ${id}`, life: 3000});
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <Toast ref={toast} />
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>Lista de Productos</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Link to="/productos/crear">
          <Button label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>

        <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

        <Link to="/">
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>
      </div>

      {loading && <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Cargando productos...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <DataTable
        value={Array.isArray(products) ? products : []}
        paginator
        rows={10}
        className="p-datatable-gridlines"
        emptyMessage="No hay productos disponibles"
        responsiveLayout="scroll"
      >
        <Column field="nombre" header="Nombre" sortable style={{ minWidth: '200px' }} />
        <Column field="precio" header="Precio" sortable style={{ width: '120px', textAlign: 'right' }} body={(row) => `$${row.precio.toFixed(2)}`} />

        <Column
          header="Acciones"
          body={(rowData) => (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <Link to={`/productos/editar/${rowData.id}`}>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" aria-label="Editar producto" />
              </Link>
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                aria-label="Eliminar producto"
                onClick={() => confirmDelete(rowData.id)}
              />
            </div>
          )}
          style={{ width: '130px', textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
}

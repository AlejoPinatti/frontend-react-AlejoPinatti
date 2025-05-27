import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const HomeView = () => {
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#333',
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '40px 60px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0)',
          textAlign: 'center',
          maxWidth: '700px',
          width: '90%',
        }}
      >
        <h1 
          style={{ 
            marginBottom: '30px', 
            color: 'black', 
            maxWidth: '100%',
            fontSize: '2.8rem', 
            fontWeight: '700',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Bienvenido a mi CRUD de Productos y Usuarios
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          <Link to="/usuarios" style={{ flex: 1 }}>
            <Button 
              label="Ir a Usuarios" 
              className="p-button-rounded p-button-lg p-button-outlined" 
              style={{ width: '100%', borderColor: 'black', color: 'black' }} 
            />
          </Link>

          <Link to="/productos" style={{ flex: 1 }}>
            <Button 
              label="Ir a Productos" 
              className="p-button-rounded p-button-lg p-button-outlined" 
              style={{ width: '100%', borderColor: 'black', color: 'black' }} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;

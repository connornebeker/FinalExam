import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#343a40',
        color: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px', whiteSpace: 'nowrap' }}>
        Connor's Talent
      </h1>
      <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/entertainers')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Entertainers
        </button>
      </nav>
    </header>
  );
}

export default Header;

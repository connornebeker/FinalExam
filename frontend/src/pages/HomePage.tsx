import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div>
        <h1>Welcome to Connor's Entertainment Agency!</h1>
        <h3>So much talent in one place!!</h3>
        <button onClick={() => navigate('/entertainers')}>
          See Entertainers here
        </button>
      </div>
    </>
  );
}

export default HomePage;

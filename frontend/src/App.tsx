import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import EntertainersPage from './pages/EntertainersPage';
import EntertainersDetailsPage from './pages/EntertainersDetailsPage';
import EditEntertainerPage from './pages/EditEntertainerPage';
import AddEntertainerPage from './pages/AddEntertainerPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route
            path="/entertainerDetails/:entertainerID"
            element={<EntertainersDetailsPage />}
          />
          <Route
            path="/editEntertainer/:entertainerID"
            element={<EditEntertainerPage />}
          />
          <Route path="/addEntertainer" element={<AddEntertainerPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

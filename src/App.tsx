import { useContext } from 'react';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        {token && <Sidebar />}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

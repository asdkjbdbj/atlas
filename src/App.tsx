import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cockpit from './pages/Cockpit';
import Datalake from './pages/Datalake';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cockpit" element={<Cockpit />} />
          <Route path="datalake" element={<Datalake />} />
          <Route path="projects" element={<Projects />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


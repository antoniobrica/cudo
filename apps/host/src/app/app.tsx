import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const Container = React.lazy(() => import('mf-container-app/Module'));
const Project = React.lazy(() => import('mf-project-app/Module'));
const Task = React.lazy(() => import('mf-task-app/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/task">Tasks</Link>
        </li>
        <li>
          <Link to="/project">Projects</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />
        <Route path="/home/*" element={<Container />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/task/*" element={<Task />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;

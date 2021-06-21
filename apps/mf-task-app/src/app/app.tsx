import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Tasks />
      </div>
    </Suspense>

  );
}

export default App;

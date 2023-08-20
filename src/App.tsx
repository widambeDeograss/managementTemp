import React from 'react';
import { CustomSnackBar } from './components/Alerts';
import AppWindow from './layout/AppWindow';

function App() {
  return (
    <div>
      <CustomSnackBar />
      <AppWindow />
    </div>
  );
}

export default App;

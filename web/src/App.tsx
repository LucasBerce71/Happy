import React, { useEffect } from 'react';

import Routes from './routes';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import { showToastr } from './components/Toastr';
import { toast } from 'react-toastify';

function App() {
  setInterval(() => {
    showToastr(
      'Desenvolvido por Lucas Bercê de Jesus',
      'info',
      toast.POSITION.BOTTOM_CENTER
    )
  }, 10000)

  return (
   <Routes />
  );
}

export default App;

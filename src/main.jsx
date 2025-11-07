import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './polyfills'; // Importar polyfills para @react-pdf/renderer
import './security/axiosSetup'; // Importa el archivo de configuración del interceptor
import 'react-perfect-scrollbar/dist/css/styles.css';
// Tailwind css
import './tailwind.css';


// Router
import { RouterProvider } from 'react-router';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
    </React.StrictMode>
);

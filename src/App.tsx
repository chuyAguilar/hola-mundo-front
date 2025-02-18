// src/App.tsx
// author: 'nombre de alumno'

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoadingInit from './Components/LoadingInit/LoadingInit';
import LoadingLoginSuccess from './Components/LoadingLoginSuccess/LoadingLoginSuccess';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import RegisterPage from './Pages/Register/RegisterPage';
import MyProfile from './Pages/MyProfile/myprofile';           // Vista "View My Profile"
import AdminUsers from './Pages/AdminUsers/adminusers';           // Vista "Admin Users"
import PrivateRoute from './Components/PrivateRoute/privateroute';  // Componente para rutas protegidas

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Pantalla de carga inicial */}
          <Route exact path="/loading-init" component={LoadingInit} />
          
          {/* Pantalla de Login */}
          <Route exact path="/login" component={Login} />
          
          {/* Loading tras login exitoso */}
          <Route exact path="/loading-login-success" component={LoadingLoginSuccess} />
          
          {/* Home */}
          <Route exact path="/home" component={Home} />
          
          {/* Página de Registro */}
          <Route exact path="/register" component={RegisterPage} />
          
          {/* Vista "My Profile" para cualquier usuario */}
          <Route exact path="/my-profile" component={MyProfile} />
          
          {/* Vista "Admin Users" protegida: solo accesible si se tienen todos los permisos */}
          <PrivateRoute 
            path="/admin-users" 
            component={AdminUsers} 
            requiredPermissions={[
              'add_users', 
              'delete_users', 
              'update_users', 
              'add_role', 
              'delete_role', 
              'update_role'
            ]}
          />
          
          {/* Redirige la raíz a la pantalla de carga inicial */}
          <Route exact path="/" render={() => <Redirect to="/loading-init" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

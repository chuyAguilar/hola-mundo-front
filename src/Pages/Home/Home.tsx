// src/pages/Home.tsx
import React from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  // Recupera la información del usuario desde localStorage
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo) : null;

  // Define los permisos requeridos para la vista Admin Users
  const requiredAdminPermissions = [
    'add_users',
    'delete_users',
    'update_users',
    'add_role',
    'delete_role',
    'update_role'
  ];

  // Comprueba si el usuario tiene todos los permisos necesarios
  const hasAdminAccess = user 
    ? requiredAdminPermissions.every((perm: string) => user.permissions.includes(perm))
    : false;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <div className="home-container">
          <h2>¡Bienvenido a la vista Home!</h2>
          <p>Aquí puedes comenzar a agregar contenido para tu aplicación.</p>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton 
                  expand="block" 
                  routerLink="/admin-users"
                  disabled={!hasAdminAccess}  // Deshabilita el botón si no tiene acceso
                >
                  Admin Users
                </IonButton>
                {!hasAdminAccess && (
                  <p style={{ color: 'red', fontSize: '0.8em' }}>
                    No tienes permisos administrativos
                  </p>
                )}
              </IonCol>
              <IonCol>
                <IonButton expand="block" routerLink="/my-profile">
                  View My Profile
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

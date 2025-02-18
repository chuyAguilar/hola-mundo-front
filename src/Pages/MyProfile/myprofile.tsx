// src/pages/MyProfile.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const MyProfile: React.FC = () => {
  // Recupera la información del usuario del localStorage
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo) : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {user ? (
          <>
            <h2>Información del Usuario</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Permissions:</strong> {user.permissions.join(', ')}</p>
          </>
        ) : (
          <p>No se encontró información de usuario.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyProfile;

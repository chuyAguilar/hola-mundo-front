// src/pages/ModifyUser.tsx
import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonToast
} from '@ionic/react';
import axios from 'axios';

const ModifyUser: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdateUser = async () => {
    // Validamos que se haya ingresado el userId
    if (!userId) {
      setToastMessage('El User ID es obligatorio.');
      setShowToast(true);
      return;
    }

    // Preparamos el objeto con los datos a actualizar (solo se envían los campos no vacíos)
    const updateData: any = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (role) updateData.role = role;

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updateData);
      setToastMessage('Usuario actualizado exitosamente.');
      setShowToast(true);
      // Opcional: Limpiar campos
      setUserId('');
      setEmail('');
      setUsername('');
      setRole('');
    } catch (error: any) {
      setToastMessage('Error al actualizar usuario: ' + (error.response?.data?.message || error.message));
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modificar Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">User ID</IonLabel>
          <IonInput
            value={userId}
            onIonChange={e => setUserId(e.detail.value!)}
            placeholder="Ingresa el ID del usuario a modificar"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Nuevo Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            placeholder="Ingresa el nuevo correo"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Nuevo Username</IonLabel>
          <IonInput
            value={username}
            onIonChange={e => setUsername(e.detail.value!)}
            placeholder="Ingresa el nuevo username"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Nuevo Role</IonLabel>
          <IonInput
            value={role}
            onIonChange={e => setRole(e.detail.value!)}
            placeholder="Ingresa el nuevo role"
          />
        </IonItem>
        <IonButton expand="block" onClick={handleUpdateUser}>
          Actualizar Usuario
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ModifyUser;

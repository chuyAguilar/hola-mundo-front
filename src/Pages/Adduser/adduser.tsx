// src/pages/AddUser.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import { registerUser } from '../../api';

const AddUser: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = async () => {
    try {
      await registerUser({ email, username, password, role });
      alert('Usuario agregado exitosamente');
      setEmail('');
      setUsername('');
      setPassword('');
      setRole('');
    } catch (error: any) {
      alert('Error agregando usuario: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Username</IonLabel>
        <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Role</IonLabel>
        <IonInput value={role} onIonChange={e => setRole(e.detail.value!)} placeholder="Ej: master o cliente" />
      </IonItem>
      <IonButton expand="block" onClick={handleAddUser}>Agregar Usuario</IonButton>
    </IonContent>
  );
};

export default AddUser;

// src/pages/AdminUsers.tsx
import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonInput,
  IonItemDivider,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  // Campos del formulario de actualización
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        // Aseguramos que cada usuario tenga una propiedad 'id'
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    console.log('Intentando borrar el usuario con id:', id);
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
      console.log('Respuesta de borrado:', response.data);
      setToastMessage('Usuario borrado exitosamente.');
      setShowToast(true);
      fetchUsers(); // Refrescar la lista
    } catch (error: any) {
      console.error('Error borrando usuario:', error);
      setToastMessage('Error borrando usuario: ' + (error.response?.data?.message || error.message));
      setShowToast(true);
    }
  };

  const openUpdateModal = (user: User) => {
    setSelectedUser(user);
    setUpdatedEmail(user.email);
    setUpdatedUsername(user.username);
    setUpdatedRole(user.role);
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    const updateData: any = {
      email: updatedEmail,
      username: updatedUsername,
      role: updatedRole,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, updateData);
      console.log('Respuesta de actualización:', response.data);
      setToastMessage('Usuario actualizado exitosamente.');
      setShowToast(true);
      setShowModal(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error actualizando usuario:', error);
      setToastMessage('Error actualizando usuario: ' + (error.response?.data?.message || error.message));
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {users.map(user => (
            <IonItem key={user.id}>
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol size="6">
                    <IonLabel>
                      {user.username} - {user.email} - {user.role}
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonButton expand="block" onClick={() => openUpdateModal(user)}>
                      Actualizar
                    </IonButton>
                  </IonCol>
                  <IonCol size="3">
                    <IonButton 
                      expand="block" 
                      color="danger" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Borrar
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>

        {/* Modal para actualizar usuario */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modificar Usuario</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItemDivider>Datos actuales</IonItemDivider>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={updatedEmail}
                onIonChange={e => setUpdatedEmail(e.detail.value!)}
                placeholder="Nuevo email"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput
                value={updatedUsername}
                onIonChange={e => setUpdatedUsername(e.detail.value!)}
                placeholder="Nuevo username"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Role</IonLabel>
              <IonInput
                value={updatedRole}
                onIonChange={e => setUpdatedRole(e.detail.value!)}
                placeholder="Nuevo role"
              />
            </IonItem>
            <IonButton expand="block" onClick={handleUpdateUser}>
              Actualizar Usuario
            </IonButton>
            <IonButton expand="block" color="medium" onClick={() => setShowModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

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

export default AdminUsers;

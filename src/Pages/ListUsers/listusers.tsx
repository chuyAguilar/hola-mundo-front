// src/pages/ListUsers.tsx
import React, { useEffect, useState } from 'react';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import axios from 'axios';

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Ejemplo: obtener la lista de usuarios del backend
    // Ajusta la URL y la lógica según la API
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <IonContent>
      <IonList>
        {users.map(user => (
          <IonItem key={user.id}>
            <IonLabel>
              {user.username} - {user.email}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default ListUsers;

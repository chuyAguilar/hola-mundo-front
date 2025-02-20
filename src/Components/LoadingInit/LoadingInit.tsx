// Author: Jesus Aguilar

import React, { useEffect } from 'react';
import { IonPage, IonContent, IonSpinner, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './loading.css'; // Archivo de estilos para el componente de loading 

const LoadingInit: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/login');
    }, 3000); // 3 segundos de carga
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="loading-container">
        <div className="loading-box">
          {/* Imagen o logo centrado */}
          <IonImg src="/Logo.png" alt="App Logo" className="logo" />
          {/* Mensaje de bienvenida animado */}
          <h1 className="welcome-message">¡Bienvenido a Mi App!</h1>
          {/* Spinner de carga */}
          <IonSpinner name="crescent" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoadingInit;

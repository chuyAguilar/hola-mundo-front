// LoadingLoginSuccess.jsx
// author: 'Jesus Aguilar'
import React, { useEffect } from 'react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './loading.css'; // Se utiliza el mismo estilo que LoadingInit

const LoadingLoginSuccess: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/home');
    }, 3000); // 3 segundos de carga
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="loading-container">
        <div className="loading-box">
          <IonSpinner name="dots" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoadingLoginSuccess;

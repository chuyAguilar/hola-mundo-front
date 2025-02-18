import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import SplashScreen from "../../Components/LoginForm/loginForm"; 

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <SplashScreen /> 
      </IonContent>
    </IonPage>
  );
};

export default Login;

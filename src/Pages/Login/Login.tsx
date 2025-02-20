import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import LoginForm from "../../Components/LoginForm/loginForm"; 

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <LoginForm /> 
      </IonContent>
    </IonPage>
  );
};

export default Login;

import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
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
        {/* Aquí renderizamos el componente de formulario */}
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;

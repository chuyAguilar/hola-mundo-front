import React, { useState } from "react";
import { IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../api";
import "./login.css"; // O cámbialo a "loginForm.css" si prefieres

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const history = useHistory();

  const handleUsernameChange = (event: CustomEvent) => {
    const value = event.detail.value?.toLowerCase().replace(/\s/g, "") || "";
    setUsername(value);
    validateFields(value, password);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    const value = event.detail.value?.replace(/\s/g, "") || "";
    setPassword(value);
    validateFields(username, value);
  };

  const validateFields = (user: string, pass: string) => {
    setIsValid(user.length > 0 && pass.length > 0);
  };

  const handleLogin = async () => {
    try {
      // Llamada a la API para login
      const response = await loginUser({ username, password });
      const { token, user } = response.data;
      // Guarda el token
      localStorage.setItem("token", token);
      // Guarda la información del usuario (incluye rol y permisos)
      localStorage.setItem("userInfo", JSON.stringify(user));
      alert(`Login exitoso. Bienvenido ${user.username} con rol: ${user.role}`);
      // Redirige a la vista principal
      history.push("/home");
    } catch (error: any) {
      alert("Error en login: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {/* Input de Email o Username */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Email / Username</IonLabel>
          <IonInput
            value={username}
            onIonInput={handleUsernameChange}
            type="text"
            placeholder="Ingresa tu usuario"
            required
          />
        </IonItem>
        {/* Input de Password */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            value={password}
            onIonInput={handlePasswordChange}
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </IonItem>
        {/* Botón de Login */}
        <IonButton
          expand="block"
          disabled={!isValid}
          className="login-button"
          onClick={handleLogin}
        >
          Log in
        </IonButton>
        {/* Texto para ir a la vista de registro */}
        <p className="register-link">
          Don’t have an account?{" "}
          <IonButton fill="clear" routerLink="/register">
            Register
          </IonButton>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

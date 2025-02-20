import React, { useState, useEffect } from "react";
import { IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import { registerUser } from "../../api";
import "./Register.css";

interface Registration {
  email: string;
  fullName: string;
  username: string;
  password: string;
  birthDate: string;
}

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    fullName?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    birthDate?: string;
  }>({});

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, fullName, username, password, confirmPassword, birthDate]);

  const handleEmailChange = (event: CustomEvent) => {
    const value = event.detail.value.replace(/\s/g, "");
    setEmail(value);
  };

  const handleFullNameChange = (event: CustomEvent) => {
    const value = event.detail.value.toUpperCase();
    setFullName(value);
  };

  const handleUsernameChange = (event: CustomEvent) => {
    const value = event.detail.value.replace(/\s/g, "");
    setUsername(value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    const value = event.detail.value.replace(/\s/g, "");
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event: CustomEvent) => {
    const value = event.detail.value.replace(/\s/g, "");
    setConfirmPassword(value);
  };

  const handleBirthDateChange = (event: CustomEvent) => {
    const value = event.detail.value.replace(/\s/g, "");
    setBirthDate(value);
  };

  const validateForm = () => {
    const newErrors: any = {};
    let valid = true;

    if (!email) {
      newErrors.email = "El correo es requerido";
      valid = false;
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Correo inválido";
        valid = false;
      }
    }

    if (!fullName) {
      newErrors.fullName = "El nombre completo es requerido";
      valid = false;
    }

    if (!username) {
      newErrors.username = "El usuario es requerido";
      valid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }

    if (!birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
      valid = false;
    }

    setErrors(newErrors);
    setFormValid(valid);
  };

  const handleRegister = async () => {
    if (!formValid) return;
    try {
      // Asignamos un rol fijo, por ejemplo "cliente"
      const role = "cliente";
      // Llamada a la API para registrar el usuario
      await registerUser({ email, username, password, role });
      alert("Registro exitoso");
      // Limpia los campos
      setEmail("");
      setFullName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setBirthDate("");
    } catch (error: any) {
      alert("Error en registro: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {/* Email */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            onIonInput={handleEmailChange}
            type="email"
            placeholder="Ingresa tu correo"
            required
          />
        </IonItem>
        {errors.email && <p className="error-message">{errors.email}</p>}
        {/* Nombre completo */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Full Name</IonLabel>
          <IonInput
            value={fullName}
            onIonInput={handleFullNameChange}
            type="text"
            placeholder="Ingresa tu nombre completo"
            required
          />
        </IonItem>
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        {/* Usuario */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Username</IonLabel>
          <IonInput
            value={username}
            onIonInput={handleUsernameChange}
            type="text"
            placeholder="Ingresa tu usuario"
            required
          />
        </IonItem>
        {errors.username && <p className="error-message">{errors.username}</p>}
        {/* Contraseña */}
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
        {errors.password && <p className="error-message">{errors.password}</p>}
        {/* Confirmar Contraseña */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Confirm Password</IonLabel>
          <IonInput
            value={confirmPassword}
            onIonInput={handleConfirmPasswordChange}
            type="password"
            placeholder="Confirma tu contraseña"
            required
          />
        </IonItem>
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        {/* Fecha de nacimiento */}
        <IonItem lines="none" className="custom-lines">
          <IonLabel position="stacked">Birth Date</IonLabel>
          <IonInput
            value={birthDate}
            onIonInput={handleBirthDateChange}
            type="date"
            placeholder="Ingresa tu fecha de nacimiento"
            required
          />
        </IonItem>
        {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
        {/* Botón para registrar */}
        <IonButton
          expand="block"
          disabled={!formValid}
          className="register-button"
          onClick={handleRegister}
        >
          Sign up
        </IonButton>
      </div>
    </div>
  );
};

export default RegisterComponent;

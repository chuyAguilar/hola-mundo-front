// // src/services/authService.ts

// import { db } from "../firebase";
// import {
//   collection,
//   doc,
//   setDoc,
//   getDocs,
//   query,
//   where,
//   limit,
//   updateDoc,
//   getDoc,
// } from "firebase/firestore";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Clave secreta para firmar el token 
// const JWT_SECRET = "PWAidsg08";

// // Tipos para la entrada de registro
// interface RegisterUserInput {
//   email: string;
//   username: string;
//   password: string;
//   role: string;
// }

// // Función para registrar un usuario en la colección "users"
// export async function registerUser({
//   email,
//   username,
//   password,
//   role,
// }: RegisterUserInput): Promise<{ success: boolean; message: string }> {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   const hashedRole = await bcrypt.hash(role, saltRounds);

//   const newUser = {
//     email,
//     username,
//     password: hashedPassword,
//     roleHashed: hashedRole, // rol cifrado
//     rolePlain: role,        // rol en texto plano (para buscar en "roles")
//     last_login: null,
//   };

//   const usersRef = collection(db, "users");
//   await setDoc(doc(usersRef), newUser);

//   return { success: true, message: "Usuario registrado correctamente" };
// }

// // Tipos para la entrada de login
// interface LoginUserInput {
//   username: string;
//   password: string;
// }

// // Función para hacer login
// export async function loginUser({
//   username,
//   password,
// }: LoginUserInput): Promise<{
//   success: boolean;
//   message: string;
//   token: string;
//   user: { username: string; email: string; role: string; permissions: string[] };
// }> {
//   const usersRef = collection(db, "users");
//   const q = query(usersRef, where("username", "==", username), limit(1));
//   const snapshot = await getDocs(q);
//   if (snapshot.empty) throw new Error("Usuario no encontrado");

//   const userDoc = snapshot.docs[0];
//   const userData = userDoc.data() as {
//     email: string;
//     username: string;
//     password: string;
//     rolePlain: string;
//   };

//   const match = await bcrypt.compare(password, userData.password);
//   if (!match) throw new Error("Contraseña incorrecta");

//   await updateDoc(doc(db, "users", userDoc.id), { last_login: new Date() });

//   const roleRef = doc(db, "roles", userData.rolePlain);
//   const roleSnap = await getDoc(roleRef);
//   if (!roleSnap.exists()) throw new Error("Rol no encontrado");

//   const roleData = roleSnap.data() as { role: string; permissions: string[] };

//   const tokenPayload = {
//     username: userData.username,
//     email: userData.email,
//     role: roleData.role,
//     permissions: roleData.permissions,
//   };
//   const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

//   return {
//     success: true,
//     message: "Login exitoso",
//     token,
//     user: {
//       username: userData.username,
//       email: userData.email,
//       role: roleData.role,
//       permissions: roleData.permissions,
//     },
//   };
// }

// // Función para sembrar roles en la colección "roles"
// export async function seedRoles(): Promise<void> {
//   await setDoc(doc(db, "roles", "master"), {
//     role: "master",
//     permissions: [
//       "add_users",
//       "delete_users",
//       "update_users",
//       "add_role",
//       "delete_role",
//       "update_role",
//     ],
//   });
//   await setDoc(doc(db, "roles", "cliente"), {
//     role: "cliente",
//     permissions: ["get_users", "get_role"],
//   });
// }

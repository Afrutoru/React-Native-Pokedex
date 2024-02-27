import {
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // esto vale para validar textfield "que sea un email, obligatiorio.."
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState(""); // es para decir que hay un error en las credenciales
  const { login } = useAuth();

  console.log(useAuth());

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false, // se espera a darle al boton para sacar los errores
    onSubmit: (formValue) => {
      setError(""); // setea el error a vacio al darle al boton
      // le llegan los datos de los textfield
      console.log("Formulario enviado");
      const { username, password } = formValue;
      if (username !== user.username || password !== user.password) {
        setError("El usuario o la contraseña no son correctos");
      } else {
        login(userDetails);
        console.log("Login correcto");
        console.log(userDetails);
      }
    },
  });
  return (
    <View>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)} //setea formik el campo username con el text que le viene del textfield
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      ></TextInput>
      <Button title="Entrar" onPress={formik.handleSubmit}></Button>

      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}
function initialValues() {
  return {
    username: "",
    password: "",
  };
}
function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"), // obliga a que el usuario no sea en blanco
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});

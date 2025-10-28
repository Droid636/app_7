import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from "react";

export default function App() {
  const [peso, setpeso] = useState("");
  const [altura, setaltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const parseInputs = () => {
    setError("");
    let NumAltura = parseFloat(altura);
    const numPeso = parseFloat(peso);

    if (altura === "" || peso === "") {
      setError("Ingresa ambos valores.");
      return null;
    }
    if (Number.isNaN(numPeso) || Number.isNaN(NumAltura)) {
      setError("Los valores deben ser números válidos.");
      return null;
    }

    // 👇 convertir cm a metros si el usuario pone un número grande
    if (NumAltura > 3) {
      NumAltura = NumAltura / 100;
    }

    return { NumAltura, numPeso };
  };

  const operar = (op) => {
    const parsed = parseInputs();
    if (!parsed) return;
    const { NumAltura, numPeso } = parsed;

    let imc = numPeso / (NumAltura * NumAltura);

    switch (op) {
      case "Hombre":
        imc = imc + 0.5;
        break;
      case "Mujer":
        imc = imc - 0.5;
        break;
      default:
        break;
    }

    // 👇 limitar a 4 decimales
    setResultado(imc.toFixed(4));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora IMC</Text>

      <View style={styles.resultadoBox}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : resultado !== null ? (
          <Text style={styles.resultado}>Tu IMC es: {resultado}</Text>
        ) : (
          <Text style={styles.placeholder}>Ingresa tus datos para calcular</Text>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu peso en kg (ej. 70)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setpeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu altura en cm (ej.175)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setaltura}
      />

      <View style={styles.botonesRow}>
        <TouchableOpacity style={styles.boton} onPress={() => operar("Hombre")}>
          <Text style={styles.botonTexto}>Hombre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={() => operar("Mujer")}>
          <Text style={styles.botonTexto}>Mujer</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6086acff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "white",
    fontSize: 16,
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  boton: {
    flex: 1,
    backgroundColor: "#0e56e6ff",
    padding: 16,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  botonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultadoBox: {
    minHeight: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
  },
  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  error: {
    color: "red",
    fontWeight: "600",
    fontSize: 16,
  },
  placeholder: {
    color: "#6b7280",
    fontSize: 16,
  },
});

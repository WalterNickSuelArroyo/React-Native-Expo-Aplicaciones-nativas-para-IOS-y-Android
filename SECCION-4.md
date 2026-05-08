# SECCION 4: MI PRIMERA APLICACIÓN EN REACT NATIVE

## Introducción

## Temas puntuales

En esta sección empezaremos a dar nuestros primeros pasos en React Native con Expo, aprendiendo varios componentes comunes como:

    - TouchableOpacity
    - Pressable
    - StatusBar
    - Views
    - StyleSheet
    - Text

Pero también crearemos componentes personalizados y cambiaremos el estado de la aplicación.

## Demostración

## Inicio de proyecto - CounterApp

En esta lección, el instructor crea el proyecto base para una aplicación de contador utilizando el CLI de Expo con una plantilla de TypeScript. Se realiza un recorrido detallado por la estructura de directorios y archivos generados por defecto, explicando la función de cada uno en el ecosistema móvil. Finalmente, se levanta el servidor de desarrollo y se lanzan en paralelo los emuladores de Android y iOS para comprobar que el entorno está perfectamente sincronizado mediante el Fast Refresh.

**1. Creación del Proyecto**

Para inicializar esta nueva aplicación, se utiliza la terminal con un comando estructurado que incluye el nombre del proyecto y la plantilla deseada.

El Comando: npx create-expo-app counter-app --template blank-typescript

El Gestor de Paquetes: Aunque se utiliza npx (Node Package Execute), el instructor aclara que puedes usar alternativas como yarn, pnpm o bun según tus preferencias.

La Plantilla: Se sigue utilizando blank-typescript para tener un lienzo en blanco con tipado estricto, evitando plantillas preconfiguradas con enrutamiento avanzado hasta que se dominen las bases.

**2. Estructura de Archivos y Directorios**

Al abrir el proyecto en Visual Studio Code, te encuentras con una estructura de archivos muy limpia. Estas son las piezas clave:

App.tsx: Es el componente raíz. Es el punto de entrada de tu aplicación y todo lo que dibujes aquí será lo primero que el usuario vea en pantalla.

app.json: Este es el archivo más importante de configuración exclusiva de Expo. Aquí se centralizan los ajustes nativos de la aplicación sin tener que tocar código de Android Studio o Xcode. Define cosas como:

    - El ícono de la app (el que aparece en el menú del teléfono).
    - El Splash Screen (la pantalla de carga al abrir la app).
    - Colores base y soporte para múltiples plataformas (iOS, Android, Web).

babel.config.js: Es el archivo de configuración del transpilador. Babel se encarga de tomar tu código moderno de JavaScript/TypeScript y traducirlo a una versión que los dispositivos móviles puedan entender y ejecutar de forma nativa.

package.json y package-lock.json: Manejan las dependencias y scripts de Node.js, dictando qué librerías están instaladas y sus versiones exactas.

assets/: La carpeta destinada a almacenar recursos estáticos locales. Expo la pre-puebla con las imágenes por defecto para el ícono y el splash screen, pero aquí también guardarás tus propias imágenes, íconos y fuentes tipográficas personalizadas.

.gitignore y node_modules/: Archivos estándar de Node/Git. Se asegura de no subir carpetas pesadas autogeneradas (como los módulos de Node) al control de versiones.

**3. Sincronización Multiplataforma**

Para cerrar la clase, se demuestra el flujo de trabajo ideal para el desarrollo móvil:

    Se ejecuta npm start en la terminal.
    Se presiona la tecla a para abrir el simulador de Android.
    Se presiona la tecla i (en Mac) para abrir el simulador de iOS.
    Se modifica el texto en el App.tsx (ej. "Hola Mundo") y al guardar, ambos dispositivos actualizan su interfaz simultáneamente.

Tener ambos simuladores abiertos uno al lado del otro es una excelente práctica para asegurar que el diseño y la lógica se comporten de manera consistente en los dos ecosistemas más importantes del mercado móvil.

## Estilos y botones

    En esta clase se exploran los bloques de construcción básicos de React Native, demostrando que la lógica de React (como useState) se mantiene intacta, pero la interfaz cambia: el HTML y CSS tradicionales son reemplazados por componentes nativos y el objeto StyleSheet. El instructor enseña cómo renderizar textos, modificar la barra de estado del teléfono, manejar el estado de un contador y crear un botón flotante personalizado utilizando el componente <Pressable>, abarcando además las diferencias en cómo iOS y Android manejan las sombras.

**1. Adiós al HTML, Hola a los Componentes Nativos**

En React Native, el navegador web ya no existe, por lo que las etiquetas clásicas (<div>, <p>, <span>) darán error. En su lugar, debes usar los componentes que provee la librería:

    - <View>: Es el equivalente absoluto al <div>. Sirve como contenedor y agrupador de elementos.

    - <Text>: Todo el texto en React Native debe ir estrictamente envuelto en este componente. Si intentas escribir un string suelto dentro de un <View> (o dentro de un botón), la aplicación arrojará un error.

**2. La Barra de Estado (StatusBar)**

    El componente <StatusBar> (que viene de Expo) controla la barra superior del teléfono donde está la batería, la hora y la señal.

    Puedes forzar su estilo a 'light' (texto blanco para fondos oscuros), 'dark' (texto negro para fondos claros), o dejarlo en 'auto' para que reaccione automáticamente a las preferencias del sistema del usuario.

**3. Estilos con StyleSheet**

React Native no usa archivos .css. Todo el diseño se maneja mediante JavaScript/TypeScript usando un objeto creado por StyleSheet.create().

    Sintaxis CamelCase: En lugar de separar con guiones como en la web (background-color), usas mayúsculas en la segunda palabra (backgroundColor).

    Arreglo de estilos: Puedes combinar varios estilos pasándolos en un arreglo: style={[styles.container, styles.textHuge]}. Sin embargo, el instructor advierte evitar esto si ambos estilos intentan modificar la misma propiedad (ej. dos colores de fondo distintos), ya que creará una condición de carrera impredecible.

**4. Interactividad y Botones**

    Aunque React Native tiene un componente <Button> básico, rara vez se usa en producción porque es difícil de personalizar visualmente. Las mejores alternativas son:

        <TouchableOpacity>: Viene con un efecto visual predeterminado; cuando el usuario lo toca, el botón se desvanece ligeramente (hace un fade), dando retroalimentación inmediata.

        <Pressable>: Es la opción más moderna y recomendada. Es un contenedor crudo que detecta interacciones más complejas, pero los efectos visuales tienes que programarlos tú mismo.

        Eventos: En web usabas onClick; en móvil se usa onPress (un toque rápido) y onLongPress (dejar el dedo presionado), el cual el instructor aprovechó para reiniciar el contador a cero.

**5. Sombras Multiplataforma (iOS vs Android)**

Este es uno de los primeros "choques" con el desarrollo móvil: los sistemas operativos dibujan el diseño de forma distinta. El botón flotante de la clase requiere configuraciones específicas para cada uno:

    - En iOS: Las sombras se controlan con propiedades muy detalladas: shadowColor (color), shadowOffset (hacia dónde se mueve la sombra), shadowOpacity (transparencia) y shadowRadius (difuminado).

    - En Android: Las propiedades shadow de iOS son ignoradas por completo. En su lugar, Android utiliza una propiedad exclusiva llamada elevation (ej. elevation: 3), la cual simula una elevación física del elemento usando el motor de diseño "Material Design" de Google, generando la sombra automáticamente de forma nativa.

**CODIGO DE LA CLASE**

```typescript
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>
      <Pressable onPress={() => {setCount(count + 1)}} style={styles.floatingButton} onLongPress={() => setCount(0)}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>+1</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textHuge: {
    fontSize: 120,
    fontWeight: "100",
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,  
    backgroundColor: "#65558f",
    padding: 20,
    borderRadius: 15, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: 4,
  },
});

```

## Botón flotante personalizado

El objetivo principal de esta lección es refactorizar el código para hacerlo más escalable y fácil de mantener. El instructor toma el botón flotante (que estaba ensuciando el archivo principal App.tsx) y lo extrae hacia su propio componente independiente llamado FAB (Floating Action Button). Se enseña cómo crear interfaces para recibir propiedades (props), hacer que las funciones sean opcionales y aplicar estilos dinámicos utilizando operadores ternarios para cambiar la posición del botón en la pantalla.

**1. El Problema del Código Espagueti**

A medida que agregas botones, lógicas y estilos, los componentes principales como App.tsx tienden a crecer de forma descontrolada.

    Si quisieras poner otro botón a la izquierda con el código anterior, tendrías que haber duplicado todo el <Pressable> y sus estilos.

    La solución: Extraer esa pieza de la interfaz a un componente reutilizable. Así, si mañana necesitas 5 botones flotantes, solo escribes <FAB/> 5 veces enviándole datos distintos.

**2. Creación del Componente FAB.tsx**

Snippet rápido: El instructor usa el atajo rnf (React Native Functional component) de una extensión del editor para autogenerar la estructura básica del componente con sus importaciones de View y Text.

Migración: Se corta toda la lógica del <Pressable> y los estilos del botón que estaban en App.tsx y se pegan en este nuevo archivo.

**3. Tipado de Propiedades (Props) con TypeScript**

Para que el componente sea verdaderamente reutilizable, no puede tener datos en duro (como el texto "+1" o la lógica de sumar). Debe recibir instrucciones desde el componente padre. Para esto se crea la interfaz Props:

```typescript
interface Props {
  label: string;
  position?: 'left' | 'right';
  onPress?: () => void;
  onLongPress?: () => void;
}
```

    - label: Obligatorio. Es el texto que mostrará el botón.

    - position: Opcional (?). Obliga a que solo se pueda enviar la palabra 'left' o 'right'. Si no se envía nada, el componente asume 'right' por defecto al desestructurar: const { label, position = 'right', ... } = props.

    - Eventos opcionales: Las funciones onPress y onLongPress se marcan como opcionales (?) para que TypeScript no arroje errores si decides crear un botón meramente visual que no haga nada al tocarlo.

**4. Estilos Dinámicos (Renderizado Condicional)**

Esta es la parte central del ejercicio (la tarea final de la clase). ¿Cómo hacemos que el botón cambie de lado basado en la propiedad position?

Separar los estilos: En el StyleSheet, se extrae la propiedad right: 20 de la clase principal y se crean dos clases nuevas e independientes:

```typescript
positionRight: { right: 20 },
positionLeft: { left: 20 }
```

Arreglo de estilos y Operador Ternario: En el componente <Pressable>, se le indica a la propiedad style que reciba un arreglo. El primer elemento es el estilo base (color, forma, sombras) y el segundo elemento se decide mediante una evaluación:

```typescript
style={[
  styles.floatingButton, 
  position === 'right' ? styles.positionRight : styles.positionLeft
]}
```

Nota: De esta manera, React Native combina ambas clases. Si le mandas position="left", tomará la forma del botón flotante y lo anclará a 20 píxeles del lado izquierdo.

**CODIGO DE LA CLASE**

```typescript
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FAB from "./components/FAB";

export default function App() {
  const [count, setCount] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>
      <FAB label="+1" onPress={() => setCount(count + 1)} onLongPress={() => setCount(0)} position="left"/>
      <FAB label="-1" onPress={() => setCount(count - 1)} onLongPress={() => setCount(0)} position="right"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textHuge: {
    fontSize: 120,
    fontWeight: "100",
  },  
});
```

```typescript
import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
    label: string;
    position?: "left" | "right";
    onPress?: () => void;
    onLongPress?: () => void
}

export default function FAB({ label, position = "right", onPress, onLongPress }: Props) {
  return (
    <Pressable
        onPress={onPress}
        style={[styles.floatingButton, position === "right" ? styles.positionRight : styles.positionLeft]}
        onLongPress={onLongPress}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{label}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create ({
    floatingButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558f",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: 4,
  },

  positionRight: {
    right: 20,
  },

  positionLeft: {
    left: 20,
  }
})
```
## Retroalimentación al tocar el botón

    En esta lección, el instructor aborda un problema de experiencia de usuario (UX): el botón <Pressable> original no da ninguna señal visual cuando se toca. Aunque el componente antiguo <TouchableOpacity> soluciona esto automáticamente, se enseña cómo replicar este efecto visual en el moderno <Pressable> convirtiendo la propiedad style en una función para leer el estado dinámico pressed. Finalmente, se demuestra el poder de la reutilización de componentes instanciando un segundo botón flotante para resetear el contador.

**1. Feedback Visual: TouchableOpacity vs Pressable**

    <TouchableOpacity>: Es un componente clásico de React Native. Su principal característica es que, al tocarlo, reduce automáticamente su opacidad (se vuelve medio transparente), dando al usuario la sensación de que el botón fue presionado. Puedes controlar qué tan transparente se vuelve con la propiedad activeOpacity.

    <Pressable>: Es el componente moderno y recomendado. A diferencia del anterior, no tiene animaciones por defecto. Es un "lienzo en blanco" diseñado para detectar interacciones mucho más complejas (como si el usuario desliza el dedo hacia afuera después de tocarlo o si usa un ratón/stylus). Por ende, el feedback visual hay que programarlo manualmente.

**2. Estilos Dinámicos en Pressable**

    Para lograr que el <Pressable> se vuelva transparente al tocarlo, se utiliza una técnica avanzada en su propiedad style.

    De Objeto a Función: Normalmente, a style le pasas un objeto o un arreglo de objetos (ej. style={[styles.boton, styles.rojo]}). En el <Pressable>, puedes pasarle una función de flecha.

    El estado pressed: Esta función recibe automáticamente como argumento un objeto con el estado actual de la interacción. Si desestructuras la propiedad pressed (un booleano), sabrás exactamente el milisegundo en que el usuario tiene el dedo sobre la pantalla.

```typescript
<Pressable
  style={({ pressed }) => [
    styles.floatingButton, // Estilo base
    position === 'right' ? styles.positionRight : styles.positionLeft, // Posición dinámica
    { opacity: pressed ? 0.7 : 1 } // Opacidad condicional
  ]}
  onPress={onPress}
  onLongPress={onLongPress}
>
  <Text style={styles.text}>{label}</Text>
</Pressable>
```

La lógica: Si pressed es true (dedo en la pantalla), la opacidad baja a 0.7. Si es false (dedo levantado), la opacidad regresa a 1 (totalmente visible).

**3. El Poder de la Reutilización (Botón Reset)**

Para demostrar por qué fue tan buena idea extraer el botón a un archivo FAB.tsx en la clase anterior, el instructor crea un segundo botón en App.tsx en apenas unas cuantas líneas de código:

```typescript
<FAB label="Reset" position="left" onPress="{()"> setCount(0)}
/>
```

Al hacer esto, automáticamente obtienes un botón idéntico, pero posicionado a la izquierda, con texto diferente, con el nuevo efecto de opacidad que acabas de programar, y que reinicia el contador a cero. ¡Esa es la magia de la arquitectura basada en componentes!

**4. Foreshadowing (Temas Globales)**

El instructor hace un breve comentario sobre por qué no es buena idea pasar el color del botón como una prop individual (ej. color="purple"). Adelanta que en aplicaciones del mundo real, los colores se manejan mediante "Temas" (Themes) globales, para que si el usuario cambia la app a "Modo Oscuro", todos los botones, menús y textos cambien de color en cascada desde un solo lugar. Esto se verá más adelante en el curso.

**CODIGO DE LA CLASE**

```typescript
import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
    label: string;
    position?: "left" | "right";
    onPress?: () => void;
    onLongPress?: () => void
}

export default function FAB({ label, position = "right", onPress, onLongPress }: Props) {
  return (
    <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.floatingButton, position === "right" ? styles.positionRight : styles.positionLeft, pressed ? {opacity: 0.5} : {opacity: 1}]}
        onLongPress={onLongPress}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{label}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create ({
    floatingButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558f",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: 4,
  },

  positionRight: {
    right: 20,
  },

  positionLeft: {
    left: 20,
  }
})
```

```typescript
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FAB from "./components/FAB";

export default function App() {
  const [count, setCount] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>
      <FAB label="Reset" onPress={() => setCount(0)} position="left"/>
      <FAB label="+1" onPress={() => setCount(count + 1)} onLongPress={() => setCount(0)} position="right"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textHuge: {
    fontSize: 120,
    fontWeight: "100",
  },  
});
```

## Código fuente

https://github.com/DevTalles-corp/expo-counter-app/tree/fin-seccion-04
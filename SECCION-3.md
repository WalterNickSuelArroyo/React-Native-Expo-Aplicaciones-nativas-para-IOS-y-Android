# SECCION 3: CONFIGURACIÓN DE EQUIPO - REACT NATIVE - EXPO

## Introducción

## Temas puntuales

En esta sección vamos a realizar las pruebas y configuraciones necesarias para correr nuestras aplicaciones de React Native con Expo en nuestros teléfonos y simuladores.

        - Puntualmente veremos:
        - Configuraciones en Mac
        - Configuraciones en Windows
        - Virtuales
        - Expo Go
        - Live reload
        - Problemas comunes y  soluciones

El objetivo es tener todo lo necesario para empezar a probar y desarrollar aplicaciones en las próximas secciones.

## Mi primer proyecto - TestingApp

https://docs.expo.dev/get-started/create-a-project/

En esta lección, el instructor da el salto oficial al desarrollo móvil introduciendo Expo, un framework fundamental para React Native. Se explica cómo inicializar un proyecto desde cero utilizando una plantilla con TypeScript, cómo interpretar la estructura básica de archivos (muy similar a React web) y, lo más importante, cómo levantar el servidor de desarrollo para probar la aplicación en tiempo real utilizando un teléfono físico mediante la aplicación Expo Go.

**1. ¿Qué es Expo y por qué lo usamos?**

Expo no es solo una herramienta para iniciar proyectos; es un framework completo (o un ecosistema) que envuelve a React Native.

Ventaja principal: Permite crear aplicaciones móviles sin necesidad de lidiar inmediatamente con configuraciones complejas nativas de Android Studio o Xcode.

EAS (Expo Application Services): El instructor menciona EAS, que es un servicio en la nube de Expo que automatiza la compilación (builds) de tus aplicaciones para las tiendas de Apple y Google. Aunque es avanzado, es bueno saber que Expo te acompaña hasta el lanzamiento de la app.

**2. Creación del Proyecto y Plantillas (Templates)**

Para inicializar la aplicación, se utiliza la terminal. El comando central es create-expo-app.

El comando: npx create-expo-app@latest testing-app --template blank-typescript

Los Templates (Plantillas): Expo te permite elegir un punto de partida.

        - blank: Un proyecto vacío estándar en JavaScript.
        - blank-typescript (El que usaremos): Un proyecto vacío pero ya configurado perfectamente con TypeScript.
        - tabs: Un proyecto que ya trae navegación con pestañas configurada.
        - bare-minimum: La versión más cruda de React Native, sin las herramientas facilitadoras de Expo (no recomendado para empezar).

**3. Similitud con React (La Estructura Base)**

Una vez abierto el proyecto en Visual Studio Code, notarás que estás en un terreno conocido.

        - Tienes tu archivo principal App.tsx.
        - En lugar de usar etiquetas HTML como <div>, <h1> o <span>, usas componentes nativos importados de React Native como <View> (el equivalente a un div) y <Text> (el equivalente a etiquetas de texto).
        - Los estilos se manejan con un objeto nativo llamado StyleSheet.

**4. Ejecutando la App con Expo Go**

Aquí ocurre la magia del entorno de desarrollo. Para correr la aplicación no necesitas conectar cables obligatoriamente ni tener emuladores pesados en tu PC.

Al ejecutar npm start, Expo levanta un servidor local y te muestra un Código QR enorme en la terminal.

La conexión: Solo necesitas descargar la aplicación Expo Go en tu celular (iOS o Android). Asegúrate de que tanto tu computadora como tu celular estén conectados a la misma red Wi-Fi.

El proceso: Abres Expo Go, escaneas el código QR de la pantalla y la aplicación se descarga y compila instantáneamente en tu dispositivo físico.

**¿Qué sigue?**

El instructor aclara que probar en dispositivos físicos está genial, pero salir a la calle para probar si el GPS funciona o probar diferentes tamaños de pantalla puede ser tedioso. Por ello, la próxima lección se enfocará en instalar Emuladores (Android Studio para Windows/Mac) y Simuladores (Xcode para Mac) directamente en tu computadora.

https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=expo-go&buildEnv=local


## MAC: Android Environment

## MAC: Android Emulator

## MAC: IOS Simulator

## Windows: Android Environment

En esta lección, el instructor guía paso a paso cómo configurar Android Studio y las variables de entorno en Windows. El objetivo es descargar las herramientas necesarias del SDK de Android (específicamente la versión 14 para asegurar estabilidad) y conectar esas herramientas con el sistema operativo para que Expo y tu terminal puedan comunicarse con el emulador a través de comandos como adb.

## Windows: Android Emulator

En esta lección, el instructor enseña cómo crear y configurar un Emulador de Android utilizando el Virtual Device Manager de Android Studio. Se explica paso a paso cómo crear un perfil de hardware personalizado (basado en un Pixel), asignar recursos de la computadora (RAM, gráficos) y elegir una versión estable del sistema operativo. Finalmente, se muestra cómo conectar este emulador directamente con la terminal de Expo presionando una simple tecla, permitiendo visualizar los cambios del código en tiempo real.
# SECCION 2: REFORZAMIENTO SOBRE REACT Y TYPESCRIPT

## Introducción

## Temas puntuales

Esta sección es opcional para todos aquellos que se sientan en confianza de trabajar en React con TypeScript, es un reforzamiento de conceptos que necesito que tengamos para entrar a React Native cómodamente.

Puntualmente veremos:

    1. React con Vite
    2. TypeScript con React
    3. Custom Hooks
    4. Context API
    5. TailwindCSS
    6. Tipado de funciones
    7. Peticiones HTTP
    8. Formularios con useForm
    9. Paginación básica
    10. Props

La idea es trabajar con TypeScript para que nos permita tener un código con tipado estricto, seguro y fácil de leer.

¡Te deseamos muchos éxitos en este curso!

## Inicio del proyecto

## Tipos basicos

La clase se enfoca en dar los primeros pasos con TypeScript dentro de un proyecto de React Native. El instructor guía paso a paso cómo crear un componente funcional básico (BasicTypes.tsx) y explica cómo TypeScript mejora la experiencia de desarrollo mediante la asignación estricta de tipos de datos (strings, numbers, booleans y arrays), la inferencia automática y la prevención de errores comunes al evitar el uso del tipo any.

**1. Estructura y Creación del Componente**

    - Archivos .tsx vs .jsx: En React convencional con JavaScript, los componentes usan la extensión .jsx. Al usar TypeScript, la extensión obligatoria es .tsx.

    - Snippets: Se recomienda usar el atajo rafc (de una extensión de snippets en el editor) para generar rápidamente la estructura base de un componente funcional (React Arrow Function Component).

    - Montaje: Una vez creado el componente BasicTypes, se debe importar e insertar en el archivo principal App utilizando la sintaxis JSX: <BasicTypes/>.

**2. Inferencia de Tipos vs. Tipado Explícito**

El núcleo de la clase es entender cómo TypeScript maneja los datos en las variables:

Inferencia (Automática): Si declaras const name = 'Fernando';, TypeScript es lo suficientemente inteligente para deducir que el valor es estático. Como es una constante (const), asume que su tipo literal es 'Fernando' (porque nunca cambiará).

Tipado Explícito: Para tener mayor control, puedes decirle explícitamente a TypeScript qué tipo de dato esperas usando los dos puntos (:).

```typescript
const name: string = 'Fernando';
const age: number = 38;
```

Nota del instructor: Si bien TypeScript puede inferir muchos tipos por sí solo, es una buena práctica ser explícito cuando el valor inicial no deja claro qué tipo de datos albergará la variable en el futuro.

**3. El Manejo de Booleanos en la Interfaz (JSX)**

Se explica cómo declarar valores booleanos y una peculiaridad importante al mostrarlos en pantalla:

```typescript
const isActive: boolean = true;
```

    El problema: Si intentas renderizar {isActive} directamente dentro de un <h3> o <p>, React Native no mostrará nada en la pantalla porque los booleanos (true/false) no tienen una representación gráfica en JSX.

    La solución: Utilizar un operador ternario para evaluar la condición y devolver un string legible.

```typescript
{ isActive ? 'Activo' : 'No Activo' }
```

**4. Arreglos y el Peligro del tipo any**

Este es el concepto más crítico para mantener un código seguro:

El problema de any: Si declaras un arreglo vacío o sin tipar (const powers = []), TypeScript le asigna el tipo any. Esto es peligroso porque permite insertar cualquier cosa (strings, números, objetos mezclados), anulando por completo las ventajas de usar TypeScript y devolviéndote a los comportamientos impredecibles de JavaScript puro.

Tipado estricto en arreglos: Para evitar mutaciones accidentales, siempre debes especificar qué contendrá el arreglo. Por ejemplo, un arreglo exclusivo de cadenas de texto:

```typescript
const powers: string[] = ['React', 'ReactNative'];
```


```typescript
export const BasicTypes = () => {

    const name: string = 'Fernando';
    const age: number = 38;
    const isActive: boolean = false;

    const powers = ['Velocidad', 'Volar', 'Respirar en el agua'];
  return (
    <>
        <h3>Tipos basicos</h3>
        {name} - {age} - {isActive ? 'Activo' : 'No activo'}
        <p>{powers.join(', ')}</p>
    </>
  )
}

```

## Objetos literales

Esta lección se centra en cómo trabajar con objetos literales dentro de un componente de React y cómo utilizar Interfaces en TypeScript para tipar esos objetos. El instructor explica el problema de renderizar objetos directamente en la interfaz gráfica y ofrece la solución mediante serialización JSON. Además, introduce buenas prácticas para estructurar el tipado de datos usando interfaces anidadas y propiedades opcionales.

**Explicación Detallada por Conceptos**

**1. Objetos Literales y su Renderización en JSX**

Un objeto literal es la estructura clásica de clave-valor en JavaScript (ej. const person = { age: 38, firstName: 'Fernando' }).

    El Problema: React Native (y React en general) no te permite imprimir un objeto directamente dentro del HTML/JSX. Si intentas hacer <h3>{person}</h3>, la aplicación arrojará un error porque no sabe cómo "dibujar" un objeto estructurado.

    La Solución: Para visualizar el objeto en pantalla (muy útil para depuración y propósitos didácticos), se debe convertir el objeto a una cadena de texto (string). Esto se logra usando la etiqueta HTML <pre> (que respeta los saltos de línea y espacios) combinada con el método nativo de JavaScript:


```typescript
<pre>
  {JSON.stringify(person, null, 2)}
</pre>
```

    La etiqueta <pre> significa "texto preformateado" (preformatted text).
    Lo que hace <pre> es decirle al navegador: "Respeta exactamente los espacios, las tabulaciones y los saltos de línea tal como vienen en el texto". Además, suele renderizar el texto usando una fuente tipográfica monoespaciada (como la que usas en tu editor de código), lo que hace que la estructura de los datos sea perfectamente legible.

    La función JSON.stringify() toma un objeto o valor de JavaScript y lo convierte en una cadena de texto (string) en formato JSON. Su sintaxis completa acepta hasta tres parámetros: JSON.stringify(valor, replacer, space).

    El parámetro null (El Replacer): El segundo argumento sirve para filtrar o transformar el objeto antes de convertirlo a texto. Podrías, por ejemplo, pasarle una función para que ignore ciertas propiedades (como ocultar una contraseña) o un arreglo con los nombres específicos de las propiedades que sí quieres incluir. Al pasarle null, le estás diciendo a la función: "No quiero aplicar ningún filtro, toma absolutamente todo el objeto y conviértelo".

    El parámetro 2 (El Space o espaciado): El tercer argumento se utiliza para agregar legibilidad humana (conocido como pretty-printing). Define cuántos espacios en blanco se usarán para la indentación (sangría) del texto resultante. Al pasarle un 2, le indicas a la función que haga un salto de línea por cada propiedad y agregue 2 espacios de sangría por cada nivel de anidamiento que tenga el objeto. (Si le pusieras un 4, la indentación sería más profunda, y si no le pones nada, todo saldría en una sola línea sin formato).


**2. Introducción a las Interfaces en TypeScript**

Las interfaces son exclusivas de TypeScript y sirven como contratos o reglas que dictan qué forma debe tener un objeto.

Definición: Se declaran con la palabra reservada interface seguida del nombre (por convención, empezando con mayúscula, ej. Person).

Comportamiento en la transpilación: Las interfaces existen únicamente en la etapa de desarrollo para que el editor te ayude a encontrar errores. Cuando el código TypeScript se compila (transpila) a JavaScript para ejecutarse, las interfaces desaparecen y se convierten en cero líneas de código, por lo que no afectan el peso de tu aplicación.

Uso: Una vez creada la interfaz Person, puedes obligar a tu objeto literal a que cumpla esas reglas declarándolo así: const person: Person = { ... }. Si el objeto tiene un tipo de dato equivocado (ej. un número donde iba un string), TypeScript arrojará un error de inmediato.

**3. Buenas Prácticas: Interfaces Anidadas**

Si tu objeto tiene sub-objetos (como una dirección dentro de una persona), el tipado puede volverse confuso si intentas definir todo en un solo bloque.

Lo que NO se recomienda: Definir las propiedades del sub-objeto directamente dentro de la interfaz padre.

Lo que SÍ se recomienda: Crear interfaces pequeñas y modulares. En este caso, crear una interface Address separada y luego asignarla como el tipo de dato dentro de la interfaz principal.

```typescript
interface Address {
  country: string;
  houseNo: number;
}

interface Person {
  firstName: string;
  lastName: string;
  address: Address; // Se utiliza la interfaz anidada aquí
}
```

**4. Propiedades Opcionales (?)**

En el mundo real, no siempre tendrás todos los datos de un objeto. Por ejemplo, quizás no todas las direcciones tengan un nombre de calle (street).

Si agregas street: string a la interfaz Address, TypeScript te obligará a poner esa propiedad en todos tus objetos de dirección, lanzando un error si falta.

Para solucionar esto, se añade un símbolo de interrogación (?) antes de los dos puntos: street?: string;.

Bajo la lupa de TypeScript, esto significa que la propiedad puede ser de tipo string o undefined (que significa que simplemente no se envió).

**5. Tips de Productividad en el Editor**

El instructor deja un par de atajos de teclado invaluables para trabajar con TypeScript:

Navegación rápida: Si dejas presionada la tecla Alt (o Option en Mac) y haces clic sobre el nombre de una interfaz (ej. Address), el editor de código saltará automáticamente al archivo o línea donde fue definida.

Autocompletado de propiedades: Si a tu objeto le faltan propiedades exigidas por la interfaz, el editor marcará un error. Puedes poner el cursor sobre el objeto y presionar Ctrl + Punto (o Command + Punto en Mac) y seleccionar "Add missing properties" para que el editor escriba la estructura faltante por ti.


```typescript
interface Person {
    age: number,
    firstName: string,
    lastName: string,
    address: Address,
}

interface Address {
    country: string,
    houseNo: string,
    street?: string,
}


export const ObjectLiterals = () => {

    const person: Person = {
        age: 38,
        firstName: 'Santiago',
        lastName: 'García',
        address: {
            country: 'Argentina',
            houseNo: '615',
        }
    }
  return (
    <>
    <h3>Objetos literales</h3>
    <pre>{JSON.stringify(person, null, 2)}</pre>
    </>
  )
}

```


## Funciones

Esta lección enseña cómo tipar funciones correctamente en TypeScript dentro de un entorno de React Native. El instructor explica los problemas de dejar que los parámetros de una función caigan en el tipo implícito any (lo que puede causar errores lógicos como concatenar números en lugar de sumarlos). Además, se muestra cómo definir estrictamente qué tipo de datos debe recibir y qué tipo de dato debe retornar una función. Finalmente, se introduce una regla de oro sobre el rendimiento en React: sacar las funciones independientes fuera del componente principal.

**1. El Problema del Tipo Implícito any en Parámetros**

Si declaras una función tradicional en JavaScript como const addTwoNumbers = (a, b) => a + b, no hay restricciones sobre qué tipo de datos son a y b.

    El riesgo: Si llamas a la función y accidentalmente le pasas un string (ej. addTwoNumbers(2, '8')), JavaScript no sumará matemáticamente los valores, sino que los concatenará, dando como resultado el texto '28'.

    La solución con TypeScript: Debes especificar el tipo de dato de cada parámetro usando los dos puntos (:).

```typescript
const addTwoNumbers = (a: number, b: number) => {
  return a + b;
}
```

Al hacer esto, si intentas pasarle un string o cualquier otro tipo de dato que no sea un número, el editor te marcará un error inmediatamente.

**2. Tipado del Valor de Retorno**

Además de los parámetros, también puedes (y muchas veces debes) decirle a TypeScript exactamente qué tipo de dato va a devolver la función como resultado final.

Esto se logra colocando los dos puntos (:) justo después de los paréntesis de los argumentos, antes de la flecha => o las llaves {}.

```typescript
const addTwoNumbers = (a: number, b: number): number => {
  return a + b;
}
```

Seguridad extra: Si defines que la función debe retornar un number, pero por algún error lógico terminas retornando un texto (por ejemplo, usando template literals como `${a + b}`), TypeScript bloqueará la compilación y te avisará de la incongruencia.

**3. Simplificación con Retorno Implícito**

Como un repaso rápido de JavaScript moderno, el instructor recuerda que si una función de flecha (arrow function) solo ejecuta una línea de código para devolver un valor, puedes omitir las llaves {} y la palabra reservada return.

```typescript
// Función simplificada en una sola línea
const addTwoNumbers = (a: number, b: number): number => a + b;
```

**4. Buena Práctica Crítica: El "Scope" (Alcance) de la Función**

Este es probablemente el concepto más importante de la lección a nivel de arquitectura de React: ¿Dónde debe vivir tu función?

El problema de dejarla adentro: En React, cada vez que el estado (state) de un componente cambia, todo el componente se vuelve a renderizar (se vuelve a leer de arriba a abajo). Si tu función addTwoNumbers está declarada dentro del componente BasicFunctions, React volverá a crear esa función y a asignarle un nuevo espacio en la memoria de tu dispositivo con cada re-renderizado, lo cual es ineficiente.

La regla: Si una función no utiliza ninguna variable de estado (como los hooks useState) ni depende de los datos internos dinámicos del componente, debes sacarla y declararla arriba, fuera del componente.

```typescript
// 1. La función vive AFUERA del componente (No se recrea en cada render)
const addTwoNumbers = (a: number, b: number): number => a + b;

// 2. El Componente
export const BasicFunctions = () => {
  return (
    <div>
      <span>El resultado es: {addTwoNumbers(2, 8)}</span>
    </div>
  );
}
```

**CODIGO DE LA CLASE**

```typescript
const addTwoNumbers = (a: number, b: number): string => {
    return `${a + b}`;
};

export const BasicFunctions = () => {
  return (
    <>
        <h3>Funciones</h3>
        <span>El resultado de sumar 2 + 8 = {addTwoNumbers(2, 8)}</span>
    </>
  )
}
```

Esta práctica asegura que la función se guarde en memoria una sola vez, optimizando el rendimiento de tu aplicación.

## TailwindCSS

Se realizo la instalacion de TailwindCSS

https://tailwindcss.com/docs/installation/using-vite

## Counter Component

En esta lección, el instructor guía la construcción de un componente Counter (Contador) desde cero. Se abordan varios conceptos clave: la creación rápida de archivos y componentes, el estilizado ágil utilizando clases de utilidad (Tailwind CSS), y principalmente, el manejo del estado dinámico del componente mediante el hook useState. Además, se explica cómo TypeScript tipa este estado mediante "genéricos" y cómo implementar lógica para evitar renderizados innecesarios y valores no deseados (como números negativos).

**1. Creación de Componentes y Estilos (Tailwind CSS)**

Archivos y Carpetas en un paso: Se muestra un truco del editor para crear un directorio y un archivo al mismo tiempo escribiendo components/Counter.tsx al momento de generar el nuevo archivo.

Estilos en línea con Tailwind: En lugar de usar un archivo CSS separado, se utilizan clases utilitarias directamente en la propiedad className de los elementos JSX.

  Ejemplos: bg-blue-500 (color de fondo), rounded-xl (bordes redondeados), hover:bg-blue-600 (cambio de color al pasar el cursor).

  Ventaja: Esto normaliza los estilos en todos los navegadores y facilita la personalización visual del componente sin salir del archivo .tsx.

**2. El Hook useState y los Genéricos de TypeScript**

El estado (state) es la memoria del componente; es lo que le permite recordar datos que cambian con el tiempo (como el número actual del contador).

Sintaxis Básica: const [count, setCount] = useState(10);

count: Es la variable que contiene el valor actual (inicia en 10).

setCount: Es la función "despachadora" (dispatcher) que se usa para actualizar el valor de count.

Tipado con Genéricos (< >): Aunque TypeScript infiere que si el valor inicial es 10, el estado manejará números, puedes ser explícito usando un genérico.

    Se escribe así: useState<number>(10). Esto le dice estrictamente a React y a TypeScript: "Este estado solo aceptará números". Es especialmente útil si tu estado iniciara nulo o vacío.


**3. Manejo de Eventos y Actualización del Estado**

Para que los botones de "+1" y "-1" funcionen, se crea una función auxiliar llamada increaseBy:

```typescript
const increaseBy = (value: number) => {
  setCount(count + value);
}
```

El evento onClick: En los botones, se llama a esta función pasándole el incremento deseado: onClick={() => increaseBy(1)} o onClick={() => increaseBy(-1)}.

Las dos formas de usar setCount: El instructor hace un paréntesis importante para explicar que la función que actualiza el estado puede usarse de dos maneras:

Mandando el valor directo: setCount(count + value) (usando la variable count que ya tenemos).

Usando una función de callback: setCount( current => current + value ). Esta forma es muy segura porque garantiza que estás trabajando con el valor más reciente del estado (current), sin necesidad de depender de la variable externa count.

**4. Lógica de Validación y Optimización de Rendimiento**

Para evitar que el contador baje de cero (números negativos), se aplica una validación matemática.

Uso de Math.max:

```typescript
setCount( Math.max(count + value, 0) );
```

La función Math.max evalúa dos valores y devuelve el más alto. Si el resultado de la resta (ej. 0 - 1 = -1) es menor que 0, la función elegirá el 0. Esto "estanca" el contador en cero.

El beneficio oculto (Evitar Re-renders): En React, si ejecutas setCount pero le envías el mismo valor que ya tenía (por ejemplo, el contador estaba en 0 y el Math.max vuelve a enviar un 0), React es lo suficientemente inteligente para decir: "El estado no cambió, no voy a volver a redibujar (re-renderizar) la pantalla". Esto hace que la aplicación sea mucho más eficiente y consuma menos recursos.

**CODIGO DE LA CLASE**

```typescript
import { useState } from "react"

export const Counter = () => {
    const [count, setCount] = useState<number>(10)

    const increaseBy = (value: number) => {
        // setCount(count + value)
        // setCount((current) => current + value);
        setCount(Math.max(count + value, 0))
    }
  return (
    <>
      <h3 className="text-2xl">
        Contador: <small className="font-bold">{count}</small>
      </h3>

      <div className="mt-3">
        <button className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700" onClick={() => increaseBy(1)}>
          +1
        </button>
        <button className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700" onClick={() => increaseBy(-1)}>
          -1
        </button>
      </div>
    </>
  )
}
```

## Custom hooks

La lección se enfoca en la refactorización del componente Counter creado en la clase anterior. El objetivo principal es extraer toda la lógica de estado y las funciones matemáticas hacia un archivo separado llamado useCounter. Al hacer esto, se crea un "Custom Hook" que permite separar la lógica de negocio de la interfaz gráfica (HTML/JSX), logrando que el componente visual quede mucho más limpio, fácil de leer y que la lógica del contador pueda ser reutilizada en otros componentes si fuera necesario.

**1. ¿Qué es un Custom Hook?**

Un Custom Hook no es más que una función regular de JavaScript/TypeScript que agrupa lógica que involucra otros hooks de React (como useState, useEffect, etc.).

Regla de oro: Por convención estricta en React, el nombre de cualquier hook (ya sea nativo o personalizado) siempre debe empezar con la palabra use (ej. useCounter, useFetch, useForm).

El propósito: Evitar tener componentes gigantescos y saturados de código lógico. El componente solo debería preocuparse por qué mostrar, mientras que el Custom Hook se encarga de cómo calcularlo.

**2. Extensiones de Archivo (.ts vs .tsx)**

Al crear el archivo para el hook (src/hooks/useCounter.ts), el instructor hace una aclaración sobre las extensiones:

Usas .tsx si tu archivo va a contener o retornar elementos gráficos de React (etiquetas como <div>, <p>, etc.).

Usas .ts si el archivo es lógica pura de programación (números, funciones, arreglos) y no dibuja nada en pantalla. En el caso de este hook, un .ts es suficiente.

**3. Estructura de un Custom Hook: Retornar Objetos**

A diferencia de un componente normal que retorna elementos JSX para dibujar en la pantalla, un Custom Hook debe retornar los datos y funciones que el componente va a necesitar.

```typescript
// Dentro de useCounter.ts
return {
  // Properties (Estado)
  count,
  // Actions (Funciones para modificar el estado)
  increaseBy
};
```

¿Por qué retornar un objeto? El instructor recomienda retornar un objeto (con llaves {}) porque facilita mucho el crecimiento del código a futuro. Si mañana decides agregar 10 funciones más al hook, simplemente las añades al objeto y el componente visual solo desestructurará por nombre las que realmente necesite, sin importar el orden.

**4. Consumo del Custom Hook en el Componente**

Una vez extraída la lógica, el componente Counter.tsx queda sumamente limpio. Simplemente se manda a llamar a la función y se desestructuran los valores:

```typescript
// Dentro de Counter.tsx
const { count, increaseBy } = useCounter();
```

A partir de aquí, el componente utiliza count e increaseBy en su interfaz gráfica exactamente igual que antes, pero ignorando por completo cómo funciona la lógica interna.

**5. El problema de retornar Arreglos y el uso de as const**

El instructor muestra una alternativa: retornar un arreglo [count, increaseBy] (como lo hace el useState nativo de React). Sin embargo, en TypeScript esto genera un problema interesante:

El error de inferencia: Si retornas [count, increaseBy], TypeScript asume que estás creando un arreglo genérico donde cualquier posición podría ser un número o una función. Al intentar usar la función en tu componente, TypeScript se quejará porque temerá que intentes ejecutar un número.

La solución (as const): Para arreglarlo, debes decirle a TypeScript que no es un arreglo dinámico, sino una tupla estricta. Al añadir as const al final del retorno (ej. return [count, increaseBy] as const;), le garantizas a TypeScript que la posición 0 siempre será un número y la posición 1 siempre será una función.

Nota: Aunque esto es un dato técnico avanzado muy útil, el instructor vuelve a la forma de objetos {}, ya que es mucho más escalable y amigable en el desarrollo del día a día.

**CODIGO DE LA CLASE**

```typescript
import { useState } from "react"

export const useCounter = () => {
    const [count, setCount] = useState<number>(10)

    const increaseBy = (value: number) => {
        setCount(Math.max(count + value, 0))
    }

    return {
        count,
        increaseBy
    }
}
```

```typescript
import { useCounter } from "../hooks/useCounter";

export const Counter = () => {
    const { count, increaseBy } = useCounter();
    
  return (
    <>
      <h3 className="text-2xl">
        Contador: <small className="font-bold">{count}</small>
      </h3>

      <div className="mt-3">
        <button className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700" onClick={() => increaseBy(1)}>
          +1
        </button>
        <button className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700" onClick={() => increaseBy(-1)}>
          -1
        </button>
      </div>
    </>
  )
}

```

## AuthContext - ContextAPI

En esta clase se aborda el problema de compartir información a través de múltiples componentes sin tener que pasarla manualmente mediante props (prop drilling). Para solucionarlo, el instructor enseña cómo crear un contexto global usando la herramienta nativa de React, el Context API. Se crea un archivo AuthContext.tsx que incluye tres piezas clave: la definición del contexto, un componente Proveedor (Provider) que envuelve la aplicación, y un Custom Hook elegante para consumir esta información desde cualquier pantalla, como la nueva LoginPage.

**1. ¿Por qué usar un Contexto Global?**

Cuando tienes datos que muchas pantallas o componentes necesitan conocer (como la información del usuario logueado, el tema visual oscuro/claro, o el idioma de la app), pasarlos de componente padre a componente hijo mediante props se vuelve insostenible y genera un código desordenado. Un Contexto Global actúa como una "nube" de datos flotando por encima de tu aplicación; cualquier componente que esté debajo de esa nube puede "alcanzar" y leer los datos directamente, sin importar qué tan profundo esté en la estructura de archivos.

**2. Creación del Contexto (createContext)**

El primer paso es crear el contexto usando la función de React createContext.

```typescript
export const AuthContext = createContext({} as AuthState);
```

El truco del tipado (as AuthState): TypeScript es estricto y te pedirá que inicialices el contexto con un valor que cumpla perfectamente con la interfaz AuthState. Como al inicio no tenemos todos esos datos (apenas estamos construyendo la app), el instructor usa as AuthState para forzar a TypeScript a aceptar un objeto vacío temporalmente, prometiendo que eventualmente tendrá esa estructura.

**3. El Custom Hook para consumir el Contexto**

Normalmente, para leer un contexto en React, tendrías que importar useContext y AuthContext en cada archivo. Para hacer el código más limpio, el instructor crea un Custom Hook:

```typescript
export const useAuthContext = () => useContext(AuthContext);
```

De esta forma, en el futuro solo tendrás que llamar a useAuthContext() en tus pantallas para obtener toda la información del usuario, ahorrando líneas de importación y código repetitivo.

**4. El Proveedor o Provider (Higher Order Component)**

El contexto por sí solo no hace nada; necesita un componente que "provea" los datos a la aplicación. A esto se le llama Provider.

  - Higher Order Component (HOC): El AuthProvider es un HOC porque es un componente diseñado para recibir a otros componentes dentro de él a través de la propiedad children.

  - PropsWithChildren: Es un tipo de dato nativo de React/TypeScript que le indica a la función que este componente va a recibir elementos hijos (JSX) en su interior.

```typescript
export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthContext.Provider value={{ hola: 'Mundo' }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**5. Envolver la Aplicación (App.tsx)**

Para que el contexto sea verdaderamente global, debes ir al punto más alto de tu árbol de componentes (usualmente App.tsx) y envolver toda tu aplicación con el AuthProvider.
Al hacer esto, todos los componentes que vivan dentro de él (los children) tendrán acceso al valor (value) que definiste en el proveedor.

**6. Consumir la Información (LoginPage.tsx)**

Finalmente, para comprobar que funciona, se crea una pantalla básica de login. Gracias al Custom Hook que hicimos en el paso 3, acceder al estado global es tan simple como desestructurar el objeto:

```typescript
const { hola } = useAuthContext();
```

Al imprimir la variable {hola} en el HTML, el texto "Mundo" aparece en pantalla, demostrando que LoginPage logró conectarse exitosamente al estado global definido en el proveedor, sin recibir ninguna prop directa.

**CODIGO DE LA CLASE**

```typescript
// import { BasicFunctions } from './typescript/BasicFunctions'
// import { ObjectLiterals } from './typescript/ObjectLiterals'
// import { BasicTypes } from './typescript/BasicTypes'
// import { Counter } from "./componentes/Counter"

import { LoginPage } from "./componentes/LoginPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col justify-center items-center h-svh">
        <h1 className='text-4xl mb-5'>React + TS</h1>
        {/* <BasicTypes /> */}
        {/* <ObjectLiterals /> */}
        {/* <BasicFunctions /> */}
        {/* <Counter /> */}
        <LoginPage />
      </div>
    </AuthProvider>

  )
}

export default App
```

```typescript
import { createContext, useContext, type PropsWithChildren } from "react";

interface AuthState {
    hola: string;
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <AuthContext.Provider value={{ hola: "Hello, world!" }}>
            {children}
        </AuthContext.Provider>
    )
}
```

```typescript
import { useAuthContext } from "../context/AuthContext";

export const LoginPage = () => {
    const {hola} = useAuthContext();
  return (
    <>
    <h3>Login</h3>
    <span>{hola}</span>
    
    </>
  )
}
```

## AuthContext - Enumeraciones y estado

En esta sesión, el instructor expande el contexto de autenticación (AuthContext) para acercarlo a un escenario del mundo real. Se introduce el uso de Enumeraciones (Enums) en TypeScript para manejar de forma segura los estados de la sesión ('checking', 'authenticated', 'unauthenticated'). Además, se simula una petición asíncrona a un servidor utilizando los hooks useEffect y useState, y se implementan propiedades computadas para facilitar el renderizado condicional de las pantallas (mostrando un mensaje de "Verificando usuario" mientras carga).

**1. Tipos Literales vs. Enumeraciones (Enums)**

Al inicio, el instructor define el estado usando una unión de tipos literales ('checking' | 'authenticated' | 'unauthenticated'). Aunque esto funciona, es difícil de mantener si necesitas usar esos valores en múltiples archivos.

La Solución (Enums): Se crea un enum AuthStatus. Una enumeración es una característica de TypeScript que permite definir un conjunto de constantes con nombre.  Esto centraliza los valores: si el día de mañana quieres cambiar la palabra 'checking' por 'loading', solo lo cambias en el enum y toda la aplicación se actualiza automáticamente.

El problema de los índices numéricos: Al implementar el enum y visualizarlo en pantalla, en lugar de texto apareció un 0 y luego un 2. Esto ocurre porque, por defecto, TypeScript asigna valores numéricos secuenciales a los Enums (0, 1, 2...). Para solucionar esto y obligar a que devuelvan texto, el instructor asigna explícitamente cadenas de texto a cada valor (checking = 'checking', etc.).

**2. Interfaces Modulares y Valores Opcionales**

Para expandir la información del estado, se añade un posible usuario (user).

En lugar de anidar la definición del usuario directamente dentro del AuthState, se crea una interfaz separada llamada User (con name y email). Esto mantiene el código limpio.

Como al inicio de la aplicación el usuario no está logueado, la propiedad en el estado se define como opcional/indefinida (user?: User), indicando que puede existir un usuario o puede ser undefined.

**3. Simulando una Petición HTTP (useEffect y useState)**

Para que la aplicación se sienta real, necesitamos simular el tiempo que tarda nuestro teléfono en ir al servidor y preguntar: "¿Este usuario tiene una sesión activa?".

useState: Se usa para guardar el status actual, inicializándolo en AuthStatus.checking.

useEffect: Se utiliza para ejecutar código secundario en el ciclo de vida del componente.  Al pasarle un arreglo de dependencias vacío ([]), le decimos a React que ejecute este efecto una sola vez justo cuando el componente Proveedor aparece en pantalla.

setTimeout: Dentro del efecto, se programa un cambio de estado después de 1.5 segundos, pasando de 'checking' a 'unauthenticated' usando la función setStatus.

**4. Propiedades Computadas (Getters) en el Contexto**

En lugar de exportar el estado puro y forzar a que cada pantalla tenga que importar el enum y hacer la comparación lógica (status === AuthStatus.checking), el instructor crea una propiedad computada directamente en el contexto:

```typescript
isChecking: status === AuthStatus.checking
```

Esto es una gran práctica. El contexto hace el trabajo pesado y simplemente exporta un valor booleano (true o false). Las pantallas que consumen el contexto ahora tienen la vida mucho más fácil.

**5. Renderizado Condicional**

Finalmente, en la pantalla LoginPage, se consume este nuevo valor isChecking para mejorar la experiencia del usuario.

  - Con una simple declaración if (isChecking), el componente decide qué dibujar en la pantalla.

  - Si es true, interrumpe el flujo normal y retorna un <h1> que dice "Verificando sesión".

  - Cuando pasa el segundo y medio (nuestro setTimeout), el contexto actualiza el estado a 'unauthenticated', isChecking se vuelve false, React detecta el cambio, vuelve a renderizar la pantalla, y esta vez el if es ignorado, mostrando el texto normal de "Login".

**CODIGO DE LA CLASE**

```typescript
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

enum AuthStatus {
    'checking' = 'checking',
    'authenticated' = 'authenticated',
    'unauthenticated' = 'unauthenticated'
}

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    isChecking: boolean;
}

interface User {
    name: string;
    email: string;
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [status, setStatus] = useState(AuthStatus.checking)

    useEffect(() => {
        setTimeout(() => {
            setStatus(AuthStatus.unauthenticated);
        }, 1500)
    }, [])

    return (
        <AuthContext.Provider value={{ 
          status: status, 
          isChecking: status === AuthStatus.checking }}>
            {children}
        </AuthContext.Provider>
    )
}
```

```typescript
import { useAuthContext } from "../context/AuthContext";

export const LoginPage = () => {
    const {isChecking} = useAuthContext();

    if(isChecking) {
        return <h3>Checking authentication...</h3>
    }
  return (
    <>
    <h3>Login</h3>
    <span></span>
    
    </>
  )
}
```

## Metodos en el contexto

En esta lección se cierra el ciclo de la gestión de estado global implementando la lógica para iniciar y cerrar sesión. Se agrega una nueva propiedad computada (isAuthenticated) para simplificar la lógica de la interfaz. Luego, se crean y exponen métodos mutadores (loginWithEmailPassword y logout) dentro del proveedor del contexto, encargados de actualizar el estado de autenticación y la información del usuario. Finalmente, se aplican técnicas de renderizado condicional en la pantalla de login para mostrar diferentes interfaces dependiendo del estado de la sesión, integrando todo con estilos básicos de Tailwind CSS.

**1. Propiedades Computadas para Escalar la Arquitectura**

De la misma manera que se creó isChecking en la clase anterior, el instructor crea isAuthenticated.

La Lógica: status === AuthStatus.authenticated.

El Beneficio Arquitectónico: En el desarrollo de software escalable, el objetivo es mantener la vista (la interfaz de usuario) lo más "tonta" posible. Al exponer un simple valor booleano desde el contexto, evitas que cada pantalla tenga que importar los enums y escribir lógica de evaluación compleja.  El componente solo pregunta "¿está autenticado, sí o no?" y actúa en consecuencia.

**2. Renderizado Condicional Complejo**

Utilizando el booleano isAuthenticated, el componente LoginPage ahora tiene dos flujos visuales distintos que comparten el mismo archivo:

Flujo True (Autenticado): Muestra el mensaje de "Bienvenido", imprime los datos del usuario usando el truco de la etiqueta <pre> y el JSON.stringify, y muestra el botón de "Salir".

Flujo False (No Autenticado): Muestra el mensaje de "Ingresar a la aplicación" y el botón para hacer login.
Este es el patrón estándar para manejar rutas o vistas protegidas en aplicaciones web y móviles basadas en componentes.

**3. Mutación del Estado Global (Acciones)**

Hasta ahora, el contexto solo era de "solo lectura" para las pantallas. Para cambiar el estado, se deben definir métodos dentro del AuthContext.

```typescript
const loginWithEmailPassword = (email: string, password: string) => {
  setUser({ name: 'Fernando Herrera', email: email });
  setStatus(AuthStatus.authenticated);
}
```

    Esta función agrupa múltiples cambios de estado (actualizar al usuario y cambiar el estatus) en una sola transacción lógica.

    Luego de crear la función, es obligatorio exponerla pasándola dentro del objeto value del <AuthContext.Provider> para que las pantallas hijas puedan consumirla.

**4. Tipado de Funciones en las Interfaces**

Este es un punto clave de TypeScript. Cuando agregas una función al contexto, la interfaz AuthState que dicta las reglas debe actualizarse para reconocer esa función.

Sintaxis: Se define el nombre de la función, los argumentos que recibe con sus tipos, y el tipo de dato que retorna usando una función de flecha.

```typescript
interface AuthState {
  // ...otras propiedades
  loginWithEmailPassword: (email: string, password: string) => void;
  logout: () => void;
}
```

El tipo void: Se utiliza para indicar que estas funciones ejecutan un proceso interno (cambiar el estado) pero no "devuelven" ningún dato calculable al final de su ejecución (no hacen un return de un string, número o boolean).

**5. Referencias a Funciones en Eventos**

En la resolución de la tarea del logout, hay un detalle técnico muy elegante sobre cómo se asignan los eventos en los botones de React:

Con argumentos (Login): Si la función necesita recibir parámetros, debes usar una función de flecha anónima en el evento:
onClick={() => loginWithEmailPassword('correo', '123')}.

Sin argumentos (Logout): Si la función no requiere ningún parámetro, no hace falta crear la función de flecha; puedes pasar la función por referencia directamente:
onClick={logout}. React se encargará de ejecutarla cuando ocurra el clic.

**CODIGO DE LA CLASE**

```typescript
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

enum AuthStatus {
    'checking' = 'checking',
    'authenticated' = 'authenticated',
    'unauthenticated' = 'unauthenticated'
}

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    isChecking: boolean;
    isAuthenticated: boolean;

    loginWithEmailPassword: (email: string, password: string) => void;
    logout: () => void;
}

interface User {
    name: string;
    email: string;
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [status, setStatus] = useState(AuthStatus.checking)
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setTimeout(() => {
            setStatus(AuthStatus.unauthenticated);
        }, 1500)
    }, []);

    const loginWithEmailPassword = (email: string, password: string) => {
        setUser({
            name: 'John Doe',
            email: email
        });
        setStatus(AuthStatus.authenticated);
    }

    const logout = () => {
        setUser(undefined);
        setStatus(AuthStatus.unauthenticated);
    }

    return (
        <AuthContext.Provider value={{ 
            status: status,
            user: user, 
            isChecking: status === AuthStatus.checking,
            isAuthenticated: status === AuthStatus.authenticated,
            loginWithEmailPassword,
            logout
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}
```

```typescript
import { useAuthContext } from "../context/AuthContext";

export const LoginPage = () => {
    const {isChecking, isAuthenticated, loginWithEmailPassword, user, logout} = useAuthContext();

    if(isChecking) {
        return <h3>Checking authentication...</h3>
    }
  return (
    <>
    {
        isAuthenticated ? (
            <>
            <h3>Bienvenido!</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button className="bg-blue-500 p-2 text-white rounded-2xl mt-2" onClick={() => logout()}>Salir</button>
            </>
        ) : (
            <>
            <h3>Please log in to continue.</h3>
            <button className="bg-green-500 p-2 text-white rounded-2xl mt-2" onClick={() => loginWithEmailPassword('fernando@domain.com', '123456')}>Login</button>
            </>
        )
    }
    </>
  )
}
```

## Separación de componentes

La lección guía la construcción de una nueva pantalla (UsersPage.tsx) destinada a mostrar una lista de usuarios en formato de tabla. Se aplican estilos rápidamente utilizando Tailwind CSS. El punto central de la clase ocurre cuando el instructor identifica que duplicar el código HTML de las filas de la tabla es una mala práctica. Para solucionarlo, extrae la lógica de la fila hacia un componente hijo independiente (UserRow.tsx), preparando el terreno para inyectarle datos dinámicos (props) en el futuro, y finaliza maquetando los controles de paginación.

**1. Construcción de la Interfaz Base (Tabla y Tailwind)**

    El desarrollo inicia estructurando la vista principal con etiquetas HTML estándar para tablas (<table>, <thead>, <tbody>, <tr>, <th>, <td>).

    Estilizado Rápido: Se utiliza Tailwind CSS para darle un aspecto moderno sin necesidad de archivos CSS externos. Clases como w-[500px] (ancho fijo exacto), bg-black, rounded-full (para hacer el avatar circular) y utilidades de Flexbox (flex justify-between) para los botones de paginación, permiten armar la vista en cuestión de minutos.

**2. El Problema de la Duplicación (Código Espagueti)**

Al maquetar la primera fila con datos estáticos ("Fernando Herrera", "fernando@google.com"), el código funciona perfectamente.

    El Riesgo: Si quieres mostrar 10 usuarios y copias/pegas la etiqueta <tr> con todo su contenido 10 veces, tu archivo crecerá desproporcionadamente. Además, si el día de mañana necesitas agregar una nueva columna (ej. "Teléfono"), tendrías que modificar el código manualmente en esas 10 filas, lo cual es propenso a errores y difícil de mantener.

**3. Componentización y Extracción (UserRow.tsx)**

Para resolver el problema anterior, el instructor aplica el principio de responsabilidad única.

    - La Solución: Cortar todo el bloque <tr> y pegarlo dentro de un archivo nuevo llamado UserRow.tsx.

    - El Beneficio Arquitectónico: Al separar UserRow, creas una estructura limpia donde UsersPage actúa como un componente padre que solo se preocupa por el layout general (la tabla y los botones), mientras que UserRow es el componente hijo especializado únicamente en cómo se debe dibujar una fila individual.

    - Ahora, en tu página principal, simplemente llamas a <UserRow/> múltiples veces. Si necesitas cambiar el diseño de la fila, lo haces en un solo archivo y el cambio se refleja automáticamente en todas las instancias. Dominar este nivel de aislamiento visual es vital para diseñar interfaces robustas y escalables en cualquier framework moderno.

**4. Preparación para la Comunicación (Props)**

El instructor menciona que tener 10 filas que digan exactamente "Fernando Herrera" no es útil en el mundo real.

El Siguiente Paso: Deja claro que la relación entre UsersPage (Padre) y UserRow (Hijo) es directa. Esto significa que en la próxima clase, la página principal obtendrá datos de una base de datos o API, y le "pasará" esa información a cada hijo a través de las props (propiedades), de modo que cada fila renderice un avatar, nombre y correo diferente.

**CODIGO DE LA CLASE**

```typescript
import { UserRow } from "./UserRow"

export const UsersPage = () => {
  return (
    <>
        <h3>Usuarios:</h3>
        <table className="w-125 bg-black rounded-2xl text-white">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <UserRow />                
            </tbody>
        </table>

        <div className="flex justify-between w-125 mt-2">
            <button className="p-2 bg-blue-500 text-white rounded-2xl">Anteriores</button>
            <button className="p-2 bg-blue-500 text-white rounded-2xl">Siguientes</button>
        </div>
    </>
  )
}
```

```typescript
export const UserRow = () => {
  return (
    <tr className="p-2">
      <td>
        <img src="" alt="Avatar" className="w-14 rounded-full" />
      </td>
      <td>
        {"Fernando"} {"Herrera"}
      </td>
      <td>{"fernando@domain.com"}</td>
    </tr>
  );
};
```

## Peticiones HTTP

En esta sesión, el instructor enseña cómo preparar la aplicación para consumir datos de usuarios desde una API pública (ReqRes.in). La clase se enfoca fuertemente en las buenas prácticas de desarrollo: primero, autogenerando interfaces de TypeScript a partir de un JSON de respuesta para garantizar el tipado estricto; y segundo, instalando Axios y encapsulando la lógica de la petición HTTP en un archivo de "acción" separado, manteniendo así los componentes de la interfaz de usuario limpios y libres de lógica compleja.

**1. La API de Prueba (ReqRes.in)**

Para no tener que construir un backend desde cero, el instructor utiliza ReqRes.in, un servicio gratuito diseñado específicamente para frontends que necesitan simular peticiones HTTP (GET, POST, PUT, DELETE).

El endpoint utilizado es de tipo GET y devuelve una lista paginada de usuarios en formato JSON. Esta respuesta incluye tanto metadatos (qué página es, total de registros) como la información útil (el arreglo data con el ID, email, nombre y avatar de cada usuario).

**2. Tipado Mágico: JSON a TypeScript**

Manejar respuestas de APIs como objetos genéricos (any) en TypeScript es una mala práctica porque pierdes el autocompletado y la prevención de errores.

  - La técnica: En lugar de escribir la interfaz a mano leyendo el JSON línea por línea, el instructor usa una extensión de VS Code ("Paste JSON as Code").

  - Al copiar la respuesta de la API y pegarla con esta herramienta, el editor genera instantáneamente todas las interfaces necesarias (ej. ReqResUserListResponse).

  - Tip del instructor: Renombrar la interfaz del arreglo individual (de Datum a User) usando F2 refactoriza inteligentemente el nombre en todo el archivo, dejando el código mucho más semántico y legible.

**3. Axios vs. Fetch Nativo**

Para realizar la petición a la web, React y JavaScript ofrecen el método nativo fetch(). Sin embargo, el instructor prefiere instalar y usar Axios (npm i axios).

¿Por qué Axios? Aunque fetch es muy capaz, Axios simplifica mucho el código. Por ejemplo, Axios convierte automáticamente las respuestas JSON a objetos de JavaScript (con fetch tienes que hacer un paso extra .json()), maneja mejor los errores y tiene una sintaxis más limpia para enviar cabeceras (headers) o parámetros.

**4. Arquitectura Limpia (Separación de Responsabilidades)**

El error más común de los principiantes en React es meter la petición a la base de datos o API directamente dentro del useEffect del componente visual (UsersPage).

El patrón "Actions": El instructor crea una carpeta actions/ y un archivo load-users.action.ts.

El objetivo de esto es que el componente visual solo se preocupe por "dibujar", y delegue la responsabilidad de ir a buscar la información a esta función externa. Esto hace que el código sea testeable, reutilizable y mucho más fácil de leer.

**5. Peticiones Asíncronas y Tipado de Axios (async/await)**

El archivo de la acción exporta una función asíncrona que intenta (try/catch) traer los datos. Aquí es donde brilla TypeScript:

```typescript
const response = await axios.get<ReqResUserListResponse>(`url...`);
```

    El Genérico <ReqResUserListResponse>: Al pasarle la interfaz que autogeneramos en el paso 2 al método .get() de Axios, le estamos diciendo a TypeScript exactamente qué forma tendrá la respuesta.

El resultado: A partir de esa línea, si escribes response.data, el editor de código sabrá perfectamente que existe un page, un total y un arreglo data lleno de usuarios, dándote un autocompletado perfecto y evitando que intentes acceder a propiedades que no existen.

**CODIGO DE LA CLASE**

```typescript
import { useEffect, useState } from "react"
import type { User } from "../interfaces/reqres.response";
import { loadUsersAction } from "../actions/load-users.action";

export const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
        loadUsersAction(1).then(setUsers);
    }, [])

  return {
    users
  }
}
```

```typescript
export interface UserListResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        User[];
    support:     Support;
    _meta:       Meta;
}

export interface Meta {
    powered_by:  string;
    docs_url:    string;
    upgrade_url: string;
    example_url: string;
    variant:     string;
    message:     string;
    cta:         Cta;
    context:     string;
}

export interface Cta {
    label: string;
    url:   string;
}

export interface User {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}
```

```typescript
import axios from "axios";
import type { UserListResponse } from "../interfaces/reqres.response";

export const loadUsersAction = async (page: number) => {
    try {
        const { data } = await axios.get<UserListResponse>(`https://reqres.in/api/users`, {params: {
            page: page
        },
        headers: {
            'x-api-key': 'free_user_3DNGeLMZ1y8wHYjDnAW0R5QyqD8'
        }   
    });
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }   
}
```

```typescript
import { useUsers } from "../context/useUsers";
import { UserRow } from "./UserRow"

export const UsersPage = () => {

    const { users } = useUsers();
    console.log(users);
  return (
    <>
        <h3>Usuarios:</h3>
        <table className="w-125 bg-black rounded-2xl text-white">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <UserRow />                
            </tbody>
        </table>

        <div className="flex justify-between w-125 mt-2">
            <button className="p-2 bg-blue-500 text-white rounded-2xl">Anteriores</button>
            <button className="p-2 bg-blue-500 text-white rounded-2xl">Siguientes</button>
        </div>
    </>
  )
}
```

## Tipar Props

En esta lección, el instructor finaliza la pantalla de usuarios. Primero, enseña cómo iterar un arreglo de datos utilizando el método .map() para generar múltiples componentes UserRow dinámicamente. Luego, explica cómo pasar la información de cada usuario desde el componente padre (UsersPage) al hijo (UserRow) mediante Props, asegurando el tipado estricto con TypeScript. Finalmente, introduce el hook useRef dentro del custom hook para manejar la paginación de la API sin causar re-renderizados innecesarios en la interfaz.

**1. Iterando Elementos y la importancia del key**

Para mostrar todos los usuarios que llegaron de la API, se utiliza la función de JavaScript users.map(). Esta función recorre el arreglo y por cada elemento, retorna un componente visual.

El atributo key: Cuando renderizas listas dinámicas en React, es obligatorio pasarle una propiedad key única a cada elemento (en este caso, key={user.id}).

¿Por qué? React necesita saber exactamente qué elemento de la lista cambia, se agrega o se elimina para actualizar el DOM (la pantalla) de la forma más rápida y eficiente posible. Si no le das un identificador único, React se confunde y puede mezclar los datos o perder rendimiento.

2. Comunicación Padre a Hijo (Props)
El componente UsersPage (Padre) tiene la lista de usuarios, pero UserRow (Hijo) es quien dibuja la fila. Para pasarle un usuario individual al hijo, se utilizan las Props (Propiedades).

    - Enviando la prop: Desde el padre se envía así: <UserRow user="{user}"/>.

    - Recibiendo y Tipando la prop: En el hijo (UserRow.tsx), debes decirle a TypeScript qué tipo de información va a recibir. Para ello, se crea una interfaz:

```typescript
interface Props {
  user: User; // Utilizando la interfaz que generaste de reqres.in
}
```

Formas de tipar el componente: El instructor muestra dos formas válidas de aplicar esa interfaz:

  - Desestructuración directa: export const UserRow = ({ user }: Props) => { ... } (La más moderna y común).
  - Genéricos de React: export const UserRow: React.FC<Props> = ({ user }) => { ... }.

**3. El Hook useRef vs useState (La Paginación)**

Para la paginación, necesitábamos guardar el número de la página actual (1, 2, etc.). Podríamos haber usado useState, pero el instructor optó por useRef.

¿Cuál es la diferencia?

    - Cada vez que cambias un dato en useState, React vuelve a dibujar (re-renderiza) todo el componente.

    - El useRef es como una "caja" mutable. Puedes cambiar su valor interno (currentPageRef.current = 2) todas las veces que quieras, y React NO volverá a dibujar la pantalla.

¿Por qué fue la mejor opción aquí? Porque no necesitábamos mostrar el número de la página ("Página 1", "Página 2") visualmente en el HTML. Solo queríamos recordar el número en la memoria ("tras bambalinas") para saber qué pedirle a la API al tocar "Siguiente". La pantalla solo necesita redibujarse cuando la API finalmente devuelve los nuevos usuarios (lo cual se maneja con el setUsers que ya tenías).

**4. Lógica de Siguiente y Anterior**

Dentro del custom hook useUsers, se crearon las funciones asíncronas nextPage y prevPage.

nextPage: Suma 1 a la referencia de la página, hace la petición a la API con ese nuevo número, y evalúa: si llegaron usuarios (users.length > 0), actualiza el estado (setUsers). Si el arreglo llega vacío (ya no hay más páginas), le resta 1 a la página para no quedarse atascado en un número sin datos.

prevPage: Primero evalúa si la página actual es 1. Si es menor o igual a 1, no hace nada (evita pedir la página 0 o negativas). Si es mayor a 1, resta la página y hace la petición a la API.

Finalmente, estas funciones se exponen en el custom hook y se conectan a los eventos onClick={nextPage} y onClick={prevPage} de los botones en la interfaz.

**CODIGO DE LA CLASE**

```typescript
import { useUsers } from "../context/useUsers";
import { UserRow } from "./UserRow"

export const UsersPage = () => {

    const { users, nextPage, prevPage } = useUsers();
    console.log(users);
  return (
    <>
        <h3>Usuarios:</h3>
        <table className="w-125 bg-black rounded-2xl text-white">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <UserRow key={user.id} user = {user} />
                    ))
                }              
            </tbody>
        </table>

        <div className="flex justify-between w-125 mt-2">
            <button onClick={prevPage} className="p-2 bg-blue-500 text-white rounded-2xl">Anteriores</button>
            <button onClick={nextPage} className="p-2 bg-blue-500 text-white rounded-2xl">Siguientes</button>
        </div>
    </>
  )
}
```

```typescript
import { useEffect, useRef, useState } from "react"
import type { User } from "../interfaces/reqres.response";
import { loadUsersAction } from "../actions/load-users.action";

export const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const currentPageRef = useRef(1);
    
    useEffect(() => {
        loadUsersAction(1).then(setUsers);
    }, [])

    const nextPage = async () => {
        currentPageRef.current += 1;
        const users = await loadUsersAction(currentPageRef.current);

        if(users.length > 0) {
            setUsers(users);
        } else {
            currentPageRef.current -= 1;
        }
    }

    const prevPage = async () => {
        if(currentPageRef.current < 1) return;
        currentPageRef.current -= 1;
        const users = await loadUsersAction(currentPageRef.current);
        setUsers(users);
    }

  return {
    users,
    nextPage,
    prevPage
  }
}
```

## Formularios

En esta lección, el instructor enseña cómo construir un formulario de inicio de sesión (FormsPage.tsx). En lugar de manejar el estado de cada input manualmente con useState (lo cual es muy repetitivo), introduce React Hook Form. Esta librería permite registrar los campos, establecer valores por defecto, manejar validaciones requeridas y gestionar el evento de envío (submit) evitando la recarga de la página. Finalmente, se muestra cómo extraer los datos validados listos para enviarse a una API.

**1. ¿Por qué usar React Hook Form?**

Si construyes un formulario en React nativo, tendrías que crear un useState para el email y otro para el password. Tendrías que escribir funciones onChange para cada uno y lógica compleja para validar si están vacíos.

La Ventaja: React Hook Form abstrae todo ese trabajo pesado. Proporciona un único hook (useForm) que gestiona el estado, las validaciones y los errores internamente sin provocar re-renderizados innecesarios en la pantalla (lo que hace que la aplicación sea mucho más rápida).

**2. Tipado del Formulario (Interfaces / Types)**

Como estamos usando TypeScript, el primer paso es definir qué datos va a manejar el formulario.

```typescript
type FormInputs = {
  email: string;
  password: string;
}
```

    Nota: El instructor menciona que puedes usar un type o un interface. En este contexto son prácticamente idénticos, pero usar type es muy común para definir la "forma" que tendrán los datos de un formulario. Al pasarle este tipo al hook (useForm<FormInputs>()), ganas autocompletado en todo el proceso.

**3. Configuración Inicial (useForm)**

El hook se inicializa pasando un objeto de configuración.

```typescript
const { register, handleSubmit } = useForm<FormInputs>({
  defaultValues: {
    email: 'fernando@google.com',
    password: '123'
  }
});
```

defaultValues: Permite pre-llenar los campos del formulario. Muy útil para pantallas de "Edición de Perfil" donde quieres que los datos del usuario ya aparezcan escritos.

**4. Registrando los Inputs (register)**

Este es el corazón de la librería. En lugar de escribir el tedioso value={email} onChange={(e) => setEmail(e.target.value)}, simplemente expandes la función register dentro del input.

```typescript
<input 
  type="email" 
  {...register('email', { required: true })} 
/>
```

¿Qué hace register? Conecta ese input HTML específico con el estado interno de React Hook Form.

Validaciones en línea: Como segundo parámetro del register, puedes pasar reglas de validación. Al poner { required: true }, la librería no permitirá que el formulario se envíe si ese campo está vacío.

**5. Manejando el Envío (handleSubmit)**

En los formularios web tradicionales, al hacer clic en un botón tipo submit, el navegador recarga toda la página. Para evitarlo en React y controlar los datos nosotros mismos, se usa la combinación del handleSubmit y una función personalizada.

La función final: Creas una función (onSubmit) que recibe los datos ya validados y organizados como un objeto. Aquí es donde harías la petición a tu base de datos.

```typescript
const onSubmit = (data: FormInputs) => {
  console.log(data); // Aquí llega { email: '...', password: '...' }
}
```

El interceptor: En la etiqueta form, utilizas el interceptor de la librería:

```typescript
<form onSubmit={handleSubmit(onSubmit)}>
```

¿Cómo funciona?: Cuando el usuario hace clic en "Ingresar", primero se ejecuta handleSubmit. Esta función revisa todas las reglas (ej. si los campos requeridos están llenos). Si hay errores, detiene el proceso automáticamente. Solo si todo está perfecto, ejecuta tu función onSubmit entregándole los datos limpios.

**CODIGO DE LA CLASE**

```typescript
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
};

export const FormsPage = () => {
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      email: "fernando@google.com",
      password: "123456",
    },
  });

  const onSubmit = (myForm: FormInputs) => {
    console.log({ myForm });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Formularios</h3>
      <div className="flex flex-col space-y-2 w-125">
        <input
          type="email"
          placeholder="email"
          className="border border-gray-300 p-2 rounded-xl"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-gray-300 p-2 rounded-xl"
          {...register("password", { required: true })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl">
          Enviar
        </button>
      </div>
    </form>
  );
};
```

## Codigo fuente

https://github.com/DevTalles-corp/expo-react-bases
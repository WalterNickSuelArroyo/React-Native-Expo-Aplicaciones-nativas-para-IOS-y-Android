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
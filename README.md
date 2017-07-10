# Validador Javascript de cédulas de Panamá / _Javascript validator for the Panamenian id cedula_

Este módulo permite validar


# Instalación / _Installation_

    $ npm install cedula-panama

# ¿Cómo se usa? / _Usage_

El validador es muy simple, tiene una función _validateCedula(cedula)_ que recibe la cédula como parámetro y devuelve un objeto de la forma:

_The validator is pretty simple, it just has a function validateCedula(cedula) that receives a cedula string as parameter and returns an object like: this_

```json
{
  isValid: true|false, # booleano que indica si la cadena podría formar parte de una cédula.
  inputString: cedula, # es el parámetro de entrada
  isComplete: true|false, # booleano que indica si la cadena es una cédula completa
  cedula: [1,2,3,4] # Array con los campos de la cédula (provincia, letra, libro, tomo) separados.
}

Ejemplo:

{
  isValid: true,
  inputString: '8-123-123',
  isComplete: true,
  cedula: ["8", "0", "123", "123"]

}
```

Primero, importa en la cabecera el fichero a _cedula.js_ en la cabecera _head_.

_In order to use it, first include in the head the cedula.js file:_

```html
<!-- in your head -->  
<script src="../cedula.js"></script>
```

Ejemplo / _Example:_:

```html
<html>
<head>
<script>
function validate(cedula) {
  var result = validateCedula(cedula)
  document.getElementById('isValid').innerHTML= result.isValid;
  document.getElementById('inputString').innerHTML= result.inputString;
  document.getElementById('isComplete').innerHTML= result.isComplete;
  document.getElementById('separated').innerHTML= result.cedula != null ? result.cedula.toString() : "null";
}
</script>
<
</head>
<body>
  <h1>Validador javascript del formato de la cédula de Panamá</h1>

  <p>Ejemplo:</p>

  <input type="text" id="cedula" onkeyup="validate(this.value)" autofocus placeholder="Ej: 8-123-456">
  <p>
    <strong>Result:</strong>
    <br>cedula.isValid = <span id="isValid"></span>
    <br>cedula.inputString = <span id="inputString"></span>
    <br>cedula.isComplete = <span id="isComplete"></span>
    <br>cedula.separated = <span id="separated"></span>
  </p>
</body>
</html>
```

# Patrones aceptados / _Accepted patterns_

* Regular (provincia-libro-tomo). Ej: 1-1234-12345
* Panameño nacido en el extranjero (PE-libro-tomo). Ej: PE-1234-12345
* Extranjero con cédula (E-libro-tomo). Ej: E-1234-12345
* Naturalizado (N-libro-tomo). Ej: N-1234-12345
* Panameños nacidos antes de la vigencia (provinciaAV-libro-tomo). Ej: 1AV-1234-12345
* Población indigena (provinciaPI-libro-tomo). Ej: 1PI-1234-12345

Identificación de las provincias

1. Bocas del Toro
2. Coclé
3. Colón
4. Chiriquí
5. Darién
6. Herrera
7. Los Santos
8. Panamá
9. Veraguas
10. Guna Yala
11. Emberá Wounaan
12. Ngäbe-Buglé
13. Panamá Oeste

# Cómo puedo portarlo a otros lenguajes

La validación de la cédula se hace a través de una expresión regular que está en _cedula.js_.
Esta expresión está pensada para ser usada mientras se escribe la cédula en un campo de texto.

Esta es la expresión regular completa:

```
/^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,5})$/i
```

Si lo que quieres es validar si una cadena tiene el formato válido de una cédula, la expresión
regular debería ser:

```
  /^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,5})$/i
```

# Ejecución de pruebas unitarias

El paquete incluye un conjunto de tests que permiten validar el funcionamiento.

En la carpeta del

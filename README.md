# Validador de cédulas de Panamá / validator for the Panamenian id cedula_
Valida si una cadena texto es una cédula panameña válida. El validador se puede utilizar para validar una cédula completa o para validar el formato  mientras un usuario escribe en un campo de texto.

## [VER DEMO](https://www.merlos.org/cedula-panama/)

Disponible en los siguientes lenguajes de programación en este repositorio:
- Javascript (vanilla creado por [@merlos](https://github.com/merlos))
- Python (Ported by Christhoval Barba [@christhoval06](https://github.com/christhoval06))

En otro repositorio:
- Angular:  https://github.com/swordf1zh/ng-cedula-panama

Validates if a string is a valid Panamenian cedula. The validator can be used either for checking a complete string or for testing while typing in an input box if it is a valid cedula format.

# Javascript

## Instalación / _Installation_

    $ npm install cedula-panama

## Documentación

El validador es muy simple, tiene una función _validateCedula(cedula)_ que recibe la cédula como parámetro y devuelve un objeto de la forma:

_The validator is pretty simple, it just has a function validateCedula(cedula) that receives a cedula string as parameter and returns an object like: this_

```
{
  isValid: true|false,     # booleano que indica si la cadena podría formar parte de una cédula (true).
                           # true if the string could be a valid cedula, useful while typing.

  inputString: cedula,     # es el parámetro de entrada.
                           # Input value.

  isComplete: true|false,  # booleano que indica si la cadena es una cédula completa.
                           # boolean that tells if it is a complete cedula.

  cedula: ["1","2","3","4"] # Array con los campos de la cédula (provincia, letra, libro, tomo) separados.
                             # null - si isValid == false.
                            # [undefined, undefined, undefined, undefined] - si isComplete == false.
                            # [1,2,3,4] - Valores de la cédula si esta es válida y completa (isValid == isComplete == true).

                            # Array with the separated components of the cedula (province, letters, book, volume).
                            # null - if isValid == false.
                            # [undefined, undefined, undefined, undefined] - if isComplete == false.
                            # ["1","2","3","4"] - Values of the cedula if it is valida and complete (isValid == isComplete == true).
}
```

Ejemplos / _Examples_ :

```
# not valid
{
 isValid: false,
 inputString: '88-BB',
 isComplete: false,
 cedula: null
}

# incomplete, but valid string
{
 isValid: true,
 inputString: '8-123-'
 isComplete: false,
 cedula: [undefined, undefined, undefined, undefined]
}

# complete #1
{
  isValid: true,
  inputString: '8-123-123',
  isComplete: true,
  cedula: ["8", "", "123", "123"]
}

# complete #2
{
  isValid: true,
  inputString: 'PE-123-123',
  isComplete: true,
  cedula: ["0", "PE", "123", "123"]
}

```

# Modo de empleo / _Usage_
Primero, importa en la cabecera el fichero a _cedula.js_ en la cabecera _head_.

_In order to use it, first include in the head the cedula.js file:_

```html
<!-- in your head -->  
<script src="../cedula.js"></script>
```

Ya puedes usar la función validateCedula(cedula)
_After that, you can use the function validateCedula(cedula)_

Ejemplo / _Example:_:

```html
<html>
<head>
<script src="../cedula.js"></script> <!-- set the path to your local copy of cedula.js -->
<script>
function validate(cedula) {
  var result = validateCedula(cedula)
  document.getElementById('isValid').innerHTML= result.isValid;
  document.getElementById('inputString').innerHTML= result.inputString;
  document.getElementById('isComplete').innerHTML= result.isComplete;
  document.getElementById('separated').innerHTML= result.cedula != null ? result.cedula.toString() : "null";
}
</script>
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

## Patrones aceptados / _Accepted patterns_

* Regular (provincia-libro-tomo). Ej: 1-1234-12345
* Panameño nacido en el extranjero (PE-libro-tomo). Ej: PE-1234-123456
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

## Pruebas unitarias / Tests

El paquete incluye un conjunto de tests que permiten validar el funcionamiento.
_The package includes unit test that can be run_

```
    $ npm test
```


## Cómo puedo portarlo a otros lenguajes de programacin / Porting to other languages

La validación de la cédula se hace a través de una expresión regular que está en _cedula.js_.
Esta expresión está pensada para ser usada mientras se escribe la cédula en un campo de texto.

Esta es la expresión regular completa:

```
/^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i
```

Si lo que quieres es validar si una cadena tiene el formato válido de una cédula, la expresión
regular debería ser:

```
  /^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i
```

¡Hey! Si lo portas a otro lenguage puedes hacer un push request a este repo (si quieres que se distribuya aquí) o si lo distribuyes en otro déjanos un issue para que lo enlacemos desde aquí.

# Python

Hay un ejemplo en `example.py`.

An example is provided in `example.py`.


```python
# example.py
from cedula import validate as validate_id

# validate_id(cedula_as_a_string)
print(validate_id('4-564-2343'))

# output
# {
#   'is_valid': True,
#   'input': '4-564-2343',
#   'is_complete': True,
#   'id': ['', '4', '564', '2343'],
#   'unified': '004056402343'
# }
```

```
 $ python3 example.py
```

Agradecimientos / _Acknowledgements_

* Demóstenes García [@demogar](http://github.com/demogar)
* Christhoval Barba [@christhoval06](http://github.com/christhoval06)
* ()@jartaud


## Licencia MIT / _MIT License_

Copyright (c) 2017 Juan M. Merlos (@merlos)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

/*
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
*/

/**
 * Validates a Panamenial id (Cédula)
 *
 * cedula - is a string
 *
 */
function validateCedula(cedula) {
  Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
  };

  var re = /^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i;

  var matched = cedula.match(re);

  // matched contains:
  // 1) if the cedula is complete (cedula = 8-AV-123-123)
  //    matched = [cedula, first part, second part, third part]
  //    [8AV-123-123]
  // 2) if the cedula is not complete (cedula = "1-1234")
  //    matched = ['1-1234', undefined, undefined, undefined]
  var isComplete = false;

  if (matched !== null) {
    matched.splice(0, 1); // remove the first match, it contains the input string.

    if (matched[0] !== undefined) {
      // if matched[0] is set => cedula complete
      isComplete = true;

      if (matched[0].match(/^PE|E|N$/)) {
        matched.insert(0, "0");
      }

      if (matched[0].match(/^(1[0123]?|[23456789])?$/)) {
        matched.insert(1, "");
      }

      if (matched[0].match(/^(1[0123]?|[23456789])(AV|PI)$/)) {
        var tmp = matched[0].match(/(\d+)(\w+)/);

        matched.splice(0, 1);
        matched.insert(0, tmp[1]);
        matched.insert(1, tmp[2]);
      }
    } // matched[0]
  }

  var result = {
    isValid: cedula.length === 0 ? true : re.test(cedula),
    inputString: cedula,
    isComplete: isComplete,
    cedula: isComplete ? matched.splice(0, 4) : null
  };

  //  console.log(result);

  return result;
}

module.exports.validate = validateCedula;

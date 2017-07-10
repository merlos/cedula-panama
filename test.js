var assert = require('assert');
var cedula = require('./cedula');

//simulates typing the cedula
//it should receive a valid cedula string to work
function isValidCedulaFor(cedulaString) {
  //console.log(cedulaString.length);
  for(var i=0;i<cedulaString.length;i++){
    var c = cedula.validate(cedulaString.substring(0,i));
    //console.log(c);
    assert.equal(c.isValid,true,'testing: ' + cedulaString.substring(0,i));
  }
}
//simulates tiping cedula.
//it should receive an inccomplete cedula to work
function isNotCompleteCedulaFor(cedulaString) {
  //console.log(cedulaString.length);
  for(var i=0;i<cedulaString.length;i++){
    var c = cedula.validate(cedulaString.substring(0,i));
    //console.log(c);
    assert.equal(c.isComplete,false)
  }
}

describe('cedula.validate', function() {
  it('should return isValid=true for an empty string', function() {
    var c = cedula.validate('');
    assert.equal(c.isValid, true);
  });

  it('should be a complete valid cedula 8-1234-12345', function() {
    var c = cedula.validate('8-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, '8-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '8');
    assert.equal(c.cedula[1], '0');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be a complete valid cedula PE-1234-12345', function() {
    var c = cedula.validate('PE-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, 'PE-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '0');
    assert.equal(c.cedula[1], 'PE');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be a complete valid cedula N-1234-12345', function() {
    var c = cedula.validate('N-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, 'N-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '0');
    assert.equal(c.cedula[1], 'N');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be a complete valid cedula E-1234-12345', function() {
    var c = cedula.validate('E-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, 'E-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '0');
    assert.equal(c.cedula[1], 'E');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be a complete valid cedula 1PI-1234-12345', function() {
    var c = cedula.validate('1PI-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, '1PI-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '1');
    assert.equal(c.cedula[1], 'PI');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be a complete valid cedula 13AV-1234-12345', function() {
    var c = cedula.validate('10AV-1234-12345');
    assert.equal(c.isValid, true);
    assert.equal(c.inputString, '10AV-1234-12345')
    assert.equal(c.isComplete, true);
    assert.equal(c.cedula[0], '10');
    assert.equal(c.cedula[1], 'AV');
    assert.equal(c.cedula[2], '1234');
    assert.equal(c.cedula[3], '12345');
  });

  it('should be NOT valid the cedula 111', function() {
    var c = cedula.validate('111');
    assert.equal(c.isValid, false);
  });
  it('should be NOT be valid the cedula A', function() {
    var c = cedula.validate('A');
    assert.equal(c.isValid, false);
  });
  it('should be NOT be valid the cedula P-', function() {
    var c = cedula.validate('P-');
    assert.equal(c.isValid, false);
  });
  it('should be NOT be valid the cedula 14-', function() {
    var c = cedula.validate('14-');
    assert.equal(c.isValid, false);
  });

  it('should be NOT be valid the cedula 13-12345', function() {
    var c = cedula.validate('13-12345');
    assert.equal(c.isValid, false);
  });

  it('should be NOT be valid the cedula 12-1234-1234567', function() {
    var c = cedula.validate('12-1234-1234567');
    assert.equal(c.isValid, false);
  });


  it('should be isValid=true while tiping the cedula 1-12-123', function() {
    isValidCedulaFor('1-12-123');
  });
  it('should be isValid=true while tiping the cedula 8-12-123', function() {
    isValidCedulaFor('8-12-123');
  });
  it('should be isValid=true while tiping the cedula 12-12-12345', function() {
    isValidCedulaFor('12-12-12345');
  });
  it('should be isValid=true while tiping the cedula PE-12-12345', function() {
    isValidCedulaFor('PE-12-12345');
  });
  it('should be isValid=true while tiping the cedula N-12-123', function() {
    isValidCedulaFor('N-12-123');
  });
  it('should be isValid=true while tiping the cedula E-12-123', function() {
    isValidCedulaFor('E-12-123');
  });
  it('should be isValid=true while tiping the cedula 1PI-12-123', function() {
    isValidCedulaFor('1PI-12-123');
  });
  it('should be isValid=true while tiping the cedula 13-AV-12-123', function() {
    isValidCedulaFor('13AV-12-123');
  });
  it('should be isComplete=false while tiping the cedula 1-1234-', function() {
    isNotCompleteCedulaFor('1-12-');
  });
  it('should be isComplete=false while tiping the cedula 8-12-', function() {
    isNotCompleteCedulaFor('8-12-');
  });
  it('should be isComplete=false while tiping the cedula 12-1234-', function() {
    isNotCompleteCedulaFor('12-12-');
  });
  it('should be isComplete=false while tiping the cedula PE-12-', function() {
    isNotCompleteCedulaFor('PE-12-');
  });
  it('should be isComplete=false while tiping the cedula N-12-', function() {
    isNotCompleteCedulaFor('N-12-');
  });
  it('should be isComplete=false while tiping the cedula E-1234-', function() {
    isNotCompleteCedulaFor('E-1234-');
  });
  it('should be isComplete=false while tiping the cedula 1PI-1234-', function() {
    isNotCompleteCedulaFor('1PI-1234-');
  });
  it('should be isComplete=false while tiping the cedula 13AV-12-', function() {
    isNotCompleteCedulaFor('13AV-12-');
  });
});

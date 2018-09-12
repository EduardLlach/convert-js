function runTests() {
    var log = function( message ) {
        document.write( message );
    }

    var logStart = function ( message ) {
        log( '<p>' + message + ' ' );
    }

    var logEnd = function( message ) {
        log( message + '</p>' );
    }

    let testMeasureUnitConstructorWithoutParams = function() {
        logStart('Test: measureUnit Constructor without params. Result: ');
        try {
            let unit = new measureUnit();
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL! ' + e.message );
        }
    }

    let testMeasureUnitConstructorWithWrongParams = function() {
        logStart('Test: measureUnit Constructor with wrong params. Result: ');
        try {
            let unit = new measureUnit('This is a String');
            logEnd('OK');
        } catch( e ) {
            if( e instanceof measureException ) {
               logEnd('OK! Controlled exception. "' + e.message + '"' );
            } else {
               logEnd('FAIL! ' + e.message );
            }
        }
    }

    let testMeasureUnitConstructorWithIncorrectName = function() {
        logStart('Test: measureUnitConstructor with incorrect name. Result :');
        try {
            let unit = new measureUnit( {name: []} );
            if( unit && typeof unit == "object" ) {
                logEnd('OK');
            } else {
                logEnd('Failed: unit is not an object (' + typeof unit + ')');
            }            
        } catch( e ) {
            if( e instanceof measureException ) {
                logEnd('OK! Controlled exception. "'+e.message+'"');
            } else {
               logEnd('FAIL!' + e.message );
            }
        }  
    }

    let testMeasureUnitConstructorWithIncorrectValue = function() {
        logStart('Test: measureUnitConstructor with incorrect value. Result :');
        try {
            let unit = new measureUnit( {value: []} );
            if( unit && typeof unit == "object" ) {
                logEnd('OK');
            }
        } catch( e ) {
            if( e instanceof measureException ) {
                logEnd('OK! Controlled exception. "'+e.message+'"');
            } else {
               logEnd('FAIL!' + e.message );
            }
        }          
    }

    let testMeasureUnitConstructorWithCorrectName = function() {
        logStart('Test: measureUnitConstructor with correct name. Result :');
        try {
            let unit = new measureUnit( {name: 'kilograms'} );
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL!' + e.message );
        }
    }

    let testMeasureUnitConstructorWithCorrectValue = function() {
        logStart('Test: measureUnitConstructor with correct name. Result :');
        try {
            let unit = new measureUnit( {value: 10} );
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL!' + e.message );
        }
    }

    testMeasureUnitConstructorWithoutParams();
    testMeasureUnitConstructorWithWrongParams();    
    testMeasureUnitConstructorWithIncorrectName();
    testMeasureUnitConstructorWithIncorrectValue();
    testMeasureUnitConstructorWithCorrectName();
    testMeasureUnitConstructorWithCorrectValue();
}
/**
   Conversion Virtual machine written in javascript
   Eduard Llach  2018.09.11
 **/

"use strict";

class measureException {
    constructor (message) {
        this.message = message;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }
}

/**
 * Base class. All units we can convert should be defined this way
 */
class measureUnit {
    
    //var name: String Name of the unit, exampe: Kilograms.
    //var value: Value respect a base Unit

    constructor ( properties ) {
        this._name = '';
        this._value = 0;

        if( properties ) {
            if( typeof properties == "object" ) {
                if( "name" in properties ) this.name = properties.name;
                if( "value" in properties ) this.value = properties.value;
            } else {
                throw new measureException("measureUnit constructor param should be an object");
            }
        }
    }

    get name() {
        return this._name;
    }

    set name( name ) {
        if( typeof name != "string" ) throw new measureException("Name must be a String");
        if( name == "" ) throw new measureException("Measure's name should not be Empty");
        this._name = name;
    }

    get value() {
        return this._value;
    }

    set value( value ) {
        if( typeof value != "number" ) throw new measureException("Measure's value should be a Number");
        this._value = value;
    }

}

/**
 * A group of measures
 */
class measureUnitCollection {
    constructor () {
        this._list = new Array();
    }

    //find an unit by name. Ex: distances.find('kilometers')
    find( measureName ) {
        measureName = measureName.toLowerCase();
        for( measure in this._list ) {
            if( measureName == measure.name.toLowerCase() ) {
                return measure;
            }
        }
    }

    //set an unit. Ex: distances.append( new measureUnit( {name:'kilometers',value:1000} ) );
    append( value ) {
        if( !this.find(value.name) ) {
            this._list.push( value );
        }
    }
}


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
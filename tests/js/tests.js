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
            logEnd('FAIL! Exception not detected');
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
                logEnd('FAIL! Exception not detected');
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
                logEnd('FAIL! Exception not detected');
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
            logEnd('FAIL! ' + e.message );
        }
    }

    let textMeasureUnitConstructorWithValue0 = function() {
    	logStart('Text: measureUnitConstructor with value = 0. Result:');
    	try {
    		let unit = new measureUnit( {value: 0} );
    		logEnd('FAIL! Exception not detected');
    	} catch (e) {
    		if( e instanceof measureException ) {
    			logEnd('OK! Controlled exception. "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+e.message);
    		}
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

    let testMeasureUnitCollectionAppendNotAnUnit = function () {
    	logStart('Test: measureUnitCollection append something that is not a measureUnit. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( {} );
    		logEnd('FAIL! Exception not detected');
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('OK! Controlled exception "'+e.message+'"');
    		} else {
    			logEnd('FAIL! '+e.message);
    		}
    	}
    }
    
    let testMeasureUnitCollectionAppendUnit = function () {
    	logStart('Test: measureUnitCollection append an unit. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000}));
    		if( collection.count() == 1 ) {
    			logEnd('OK!');
    		} else {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    		}
    	} catch(e) {
    		logEnd('FAIL! ' + e.message );
    	}
    }
    
    let testeMeasureUnitCollectionAppendUnitTwice = function() {
    	logStart('Test: measureUnitCollection append an unit TWICE. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    			return false;
    		}
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has  ' + String(collection.count()));
    			return false;
    		}
    		logEnd('OK!');
    	} catch(e) {
    		logEnd('FAIL! '+ e.message );
    	}
    }
    
    let testeMeasureUnitCollectionAppendUnitTwiceDifferentValues = function() {
    	logStart('Test: measureUnitCollection append an unit TWICE with different values. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    			return false;
    		}
    		collection.append( new measureUnit( {name: 'kilograms', value:5} ) );
   			logEnd('FAIL! Appending an existing unit with different value must fail');
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('OK! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    let testConvertKgtoGr = function() {
    	logStart('Test: testConvertKgtoGr. Result: ');
    	try {
    		let result = convert( 1, 'kilograms', 'grams' );
    		if(result==1000) {
    			logEnd('OK! 1 kilograms == 1000 grams');
    		} else {
    			logEnd('FAIL! 1 kilograms = ' + String(result) + ' grams');
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    testMeasureUnitConstructorWithoutParams();
    testMeasureUnitConstructorWithWrongParams();    
    testMeasureUnitConstructorWithIncorrectName();
    testMeasureUnitConstructorWithIncorrectValue();
    textMeasureUnitConstructorWithValue0();
    testMeasureUnitConstructorWithCorrectName();
    testMeasureUnitConstructorWithCorrectValue();
    
    testMeasureUnitCollectionAppendNotAnUnit();
    testMeasureUnitCollectionAppendUnit();
    testeMeasureUnitCollectionAppendUnitTwice();
    testeMeasureUnitCollectionAppendUnitTwiceDifferentValues();
    
    testConvertKgtoGr();
}
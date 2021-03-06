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

    const testMeasureUnitConstructorWithoutParams = function() {
        logStart('Test: measureUnit Constructor without params. Result: ');
        try {
            let unit = new measureUnit();
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL! ' + e.message );
        }
    }

    const testMeasureUnitConstructorWithWrongParams = function() {
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

    const testMeasureUnitConstructorWithIncorrectName = function() {
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

    const testMeasureUnitConstructorWithIncorrectValue = function() {
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

    const testMeasureUnitConstructorWithCorrectName = function() {
        logStart('Test: measureUnitConstructor with correct name. Result :');
        try {
            let unit = new measureUnit( {name: ['kilograms']} );
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL! ' + e.message );
        }
    }

    const textMeasureUnitConstructorWithValue0 = function() {
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
    
    const testMeasureUnitConstructorWithCorrectValue = function() {
        logStart('Test: measureUnitConstructor with correct name. Result :');
        try {
            let unit = new measureUnit( {value: 10} );
            logEnd('OK');
        } catch( e ) {
            logEnd('FAIL!' + e.message );
        }
    }

    const testMeasureUnitCollectionAppendNotAnUnit = function () {
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
    
    const testMeasureUnitCollectionAppendUnit = function () {
    	logStart('Test: measureUnitCollection append an unit. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000}));
    		if( collection.count() == 1 ) {
    			logEnd('OK!');
    		} else {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    		}
    	} catch(e) {
    		logEnd('FAIL! ' + e.message );
    	}
    }
    
    const testMeasureUnitCollectionAppendUnitTwice = function() {
    	logStart('Test: measureUnitCollection append an unit TWICE. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    			return false;
    		}
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has  ' + String(collection.count()));
    			return false;
    		}
    		logEnd('OK!');
    	} catch(e) {
    		logEnd('FAIL! '+ e.message );
    	}
    }
    
    const testMeasureUnitCollectionAppendUnitTwiceDifferentValues = function() {
    	logStart('Test: measureUnitCollection append an unit TWICE with different values. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		if( collection.count() != 1 ) {
    			logEnd('FAIL! List should have one object and has ' + String(collection.count()));
    			return false;
    		}
    		collection.append( new measureUnit( {name: ['kilograms'], value:5} ) );
   			logEnd('FAIL! Appending an existing unit with different value must fail');
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('OK! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    const testMeasureUnitCollectionFindPair = function() {
    	logStart('Test: measureUnitCollection find pair. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		collection.append( new measureUnit( {name: ['grams'], value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('kilograms','grams');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( pair.from == null ) {
    				logEnd('FAIL! pair.from is null');
    			} else {
    				if( pair.to == null ) {
    					logEnd('FAIL! pair.to is null');
    				} else {
    					if( !(pair.from instanceof measureUnit) ) {
    						logEnd('FAIL! pair.from is not a measureUnit');
    					} else {
    						if( !(pair.to instanceof measureUnit) ) {
    							logEnd('FAIL! pair.to is not a measureUnit')
    						} else {
    							if( !pair.from.match('kilograms') ) {
    								logEnd('FAIL! pair.from is not kilograms, is ' + pair.from.name );
    							} else {
    								if( !pair.to.match('grams')) {
    									logEnd('FAIL! pair.to is not kilograms, is ' + pair.to.name );
    								} else {
    									logEnd('OK! found the pair!');
    								}
    							}
    						}
    					}
    				}
    			}
    		}
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('FAIL! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    const testMeasureItemCollectionFindPairFromNotFound = function () {
    	logStart('Test: measureUnitCollection find pair FROM not found. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		collection.append( new measureUnit( {name: ['grams'], value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('Tons','grams');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( (pair.from == null) && (pair.to != null) && (pair.to instanceof measureUnit) && (pair.to.match('grams') ) ) {
    				logEnd('OK! pair.from is null AND pair.to is measureUnit for grams');
    			} else {
    				if( pair.from != null ) {
    					logEnd('FAIL! pair.from should be NULL and isn\'t');
    				} else {
    					if( pair.to == null ) {
    						logEnd('FAIL! pair.to should be an object and is NULL');
    					} else {
    						if( !(pair.to instanceof measureUnit) ) {
    							logEnd('FAIL! pair.to is not a measureUnit');
    						} else {
    							logEnd('FAIL! Something unexpected returned');
    						}
    					}
    				}    				
    			}
    		}
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('FAIL! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    const testMeasureItemCollectionFindPairToNotFound = function() {
    	logStart('Test: measureUnitCollection find pair TO not found. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		collection.append( new measureUnit( {name: ['grams'], value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('grams','Tons');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( (pair.to == null) && (pair.from != null) && (pair.from instanceof measureUnit) && (pair.from.match('grams')) ) {
    				logEnd('OK! pair.to is null AND pair.from is measureUnit for grams');
    			} else {
    				if( pair.to != null ) {
    					logEnd('FAIL! pair.to should be NULL and isn\'t');
    				} else {
    					if( pair.from == null ) {
    						logEnd('FAIL! pair.from should be an object and is NULL');
    					} else {
    						if( !(pair.from instanceof measureUnit) ) {
    							logEnd('FAIL! pair.from is not a measureUnit');
    						} else {
    							logEnd('FAIL! Something unexpected returned');
    						}
    					}
    				}    				
    			}
    		}
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('FAIL! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    const testMeasureItemCollectionFindPairFromAndToTheSame = function() {
    	logStart('Test: measureUnitCollection find pair with the same values. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: ['kilograms'], value:1000} ) );
    		collection.append( new measureUnit( {name: ['grams'], value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('grams','grams');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( (pair.to != null) && (pair.from != null) && (pair.to instanceof measureUnit) && (pair.from instanceof measureUnit) && (pair.from.match( 'grams' )) && (pair.to.match('grams') ) ) {
    				logEnd('OK! pair.to is grams AND pair.from is measureUnit for grams');
    			} else {
    				if( pair.to == null ) {
    					logEnd('FAIL! pair.to should be and object and is NULL');
    				} else {
    					if( pair.from == null ) {
    						logEnd('FAIL! pair.from should be an object and is NULL');
    					} else {
    						if( !(pair.from instanceof measureUnit) ) {
    							logEnd('FAIL! pair.from is not a measureUnit');
    						} else {
    							logEnd('FAIL! Something unexpected returned');
    						}
    					}
    				}    				
    			}
    		}
    	} catch(e) {
    		if( e instanceof measureException ) {
    			logEnd('FAIL! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    const testMeasureConverterCreate = function() {
    	logStart('Test: Create measureConverter. Result: ');
    	try {
    		let mConverter = new measureConverter();
    		if( !("collections" in mConverter) ) {
    			logEnd('FAIL! Collections is not created');
    		} else {
    			if( Object.keys(mConverter.collections).length == 0 ) {
    				logEnd('FAIL! No collections created');
    			} else {
    				if( !(mConverter.findCollection("distanceCollection")) ) {
    					logEnd('FAIL! distanceCollection is not created');
    				} else {
    					if( !(mConverter.findCollection("weightCollection") ) ) {
    						logEnd('FAIL! weightCollection is not created');
    					} else {
    						logEnd('OK!');
    					}
    				}
    			}
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}    	
    }
    
    const testConvertInClass = function() {
    	logStart('Test: Create measureConverter. Result: ');
    	try {
    		let mConverter = new measureConverter();
    		let result = mConverter.convert( 1,'meters','kilometers');
    		
    		logEnd(`OK! 1 meters = ${result} kilometers`)
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}  
    }
  
    const testConvertDistance = function() {
    	logStart('Test: convert distance measures. Result: ');
    	try {
    		let result = convert( 1, 'kilometers', 'meters' );
    		if(result==1000) {
    			logEnd('OK! 1 kilometers == 1000 meters');
    		} else {
    			logEnd(`FAIL! 1 kilometers = ${result} meters`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertWeight = function() {
    	logStart('Test: convert Weight measures. Result: ');
    	try {
    		let result = convert( 1, 'kilograms', 'grams' );
    		if(result==1000) {
    			logEnd('OK! 1 kilograms == 1000 grams');
    		} else {
    			logEnd(`FAIL! 1 kilograms = ${result} grams`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertVolume = function() {
    	logStart('Test: convert volume measures. Result: ');
    	try {
    		let result = convert( 1, 'liters', 'cubic metres' );
    		if(result==0.001) {
    			logEnd('OK! 1 liters == 0.001 cubic metres');
    		} else {
    			logEnd(`FAIL! 1 litres = ${result} cubic metres`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertTemperature = function() {
    	logStart('Test: convert temperature measures. Result: ');
    	try {
    		let result = convert( 25, 'centigrades', 'farenheit' );
    		if(result==77) {
    			logEnd('OK! 25º centrigrades == 77º farenheit');
    		} else {
    			logEnd(`FAIL! 25º centrigrades = ${result} farenheit`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertTemperatureReverse = function() {
    	logStart('Test: convert temperature measures in reverse. Result: ');
    	try {
    		let result = convert( 77, 'farenheit', 'centigrades' );
    		if(result==25) {
    			logEnd('OK! 77º farenheit == 25º centigrades');
    		} else {
    			logEnd(`FAIL! 77º farenheit = ${result} centigrades`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertTemperatureKelvin = function() {
    	logStart('Test: convert temperature measures in kelvin. Result: ');
    	try {
    		let result = convert( 77, 'farenheit', 'kelvin' );
    		if(result==298.15) {
    			logEnd('OK! 77º farenheit == 25º centigrades == 298.15 kelvin');
    		} else {
    			logEnd(`FAIL! 77º farenheit = ${result} centigrades`);
    		}
    	} catch(e) {
    		logEnd('FAIL! Exception ' + e.message );
    	}
    }
    
    const testConvertSameUnit = function() {

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
    testMeasureUnitCollectionAppendUnitTwice();
    testMeasureUnitCollectionAppendUnitTwiceDifferentValues();
    testMeasureItemCollectionFindPairFromNotFound();
    testMeasureItemCollectionFindPairToNotFound();
    testMeasureItemCollectionFindPairFromAndToTheSame();
    testMeasureUnitCollectionFindPair();
    
    testMeasureConverterCreate();
    testConvertInClass();
    
    testConvertDistance();
    testConvertWeight();
    testConvertVolume();
    testConvertTemperature();
    testConvertTemperatureReverse();
    testConvertTemperatureKelvin();
}
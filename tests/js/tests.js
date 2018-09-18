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
    
    let testMeasureUnitCollectionAppendUnitTwice = function() {
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
    
    let testMeasureUnitCollectionAppendUnitTwiceDifferentValues = function() {
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
    
    let testMeasureUnitCollectionFindPair = function() {
    	logStart('Test: measureUnitCollection find pair. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		collection.append( new measureUnit( {name: 'grams', value:1} ) );
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
    							if(pair.from.name!='kilograms') {
    								logEnd('FAIL! pair.from is not kilograms, is ' + pair.from.name );
    							} else {
    								if(pair.to.name!='grams') {
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
    			logEnd('OK! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    let testMeasureItemCollectionFindPairFromNotFound = function () {
    	logStart('Test: measureUnitCollection find pair. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		collection.append( new measureUnit( {name: 'grams', value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('Tons','grams');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( (pair.from == null) && (pair.to != null) && (pair.to instanceof measureUnit) && (pair.to.name == 'grams') ) {
    				logEnd('OK! pair.from is null AND pair.to is measureUnit for grams');
    			} else {
    				if( pair.from != null ) {
    					logEnd('FAIL! pair.from should be NULL and isn\'t');
    				} else {
    					if( pair.to == null ) {
    						logEnd('FAIL! pair.to should be and object and is NULL');
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
    			logEnd('OK! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    let testMeasureItemCollectionFindPairToNotFound = function() {
    	logStart('Test: measureUnitCollection find pair. Result: ');
    	try {
    		let collection = new measureUnitCollection();
    		collection.append( new measureUnit( {name: 'kilograms', value:1000} ) );
    		collection.append( new measureUnit( {name: 'grams', value:1} ) );
    		if( collection.count() != 2 ) {
    			logEnd('FAIL! List should have two objects and has ' + String(collection.count()));
    			return false;
    		}
    		let pair = collection.findPair('grams','Tons');
    		if( pair == null ) {
    			logEnd('FAIL! pair is null');
    		} else {
    			if( (pair.to == null) && (pair.from != null) && (pair.from instanceof measureUnit) && (pair.from.name == 'grams') ) {
    				logEnd('OK! pair.to is null AND pair.from is measureUnit for grams');
    			} else {
    				if( pair.to != null ) {
    					logEnd('FAIL! pair.to should be NULL and isn\'t');
    				} else {
    					if( pair.from == null ) {
    						logEnd('FAIL! pair.from should be and object and is NULL');
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
    			logEnd('OK! Controled exception "' + e.message + '"');
    		} else {
    			logEnd('FAIL! '+ e.message );
    		}
    	}
    }
    
    let testMeasureConverterCreate = function() {
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
    testMeasureUnitCollectionAppendUnitTwice();
    testMeasureUnitCollectionAppendUnitTwiceDifferentValues();
    testMeasureItemCollectionFindPairFromNotFound();
    testMeasureItemCollectionFindPairToNotFound();
    testMeasureUnitCollectionFindPair();
    
    testMeasureConverterCreate();
    
    testConvertKgtoGr();
}
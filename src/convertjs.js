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
        this._name = new Array();
        this._value = 0;
        this._altToBase = null;
        this._altFromBase = null;

        if( properties ) {
            if( typeof properties == "object" ) {
                if( "name" in properties ) this.name = properties.name;
                if( "value" in properties ) this.value = properties.value;
                if( "toBase" in properties ) this._altToBase = properties.toBase;
                if( "fromBase" in properties ) this._altFromBase = properties.fromBase;
            } else {
                throw new measureException("measureUnit constructor param should be an object");
            }
        }
    }

    get name() {
        return this._name;
    }

    set name( name ) {
        if( !Array.isArray( name ) ) throw new measureException("Name must be an array");
        if( name.length == 0 ) throw new measureException("Measure's name should not be Empty");
        this._name = name;
    }

    get value() {
        return this._value;
    }

    set value( value ) {
        if( typeof value != "number" ) throw new measureException("Measure's value should be a Number");
        if( value == 0 ) throw new measureException("Measure value cannot be 0");
        this._value = value;
    }
   
    /**
     * Converts AVALUE base units to current units
     */
    fromBase(aValue) {
    	if( this._altFromBase ) {
    		return this._altFromBase( aValue );
    	} else {
    		return aValue / this._value;
    	}
    }
    
    /**
     * returns TRUE if the name is one of supported names
     * case-insensitive search
     * @return bool True if we have a match, false otherwise
     */
    match( aName ) {
    	return this._name.indexOf( aName.toLowerCase() ) >= 0;
    }
    
    /**
     * Converts AVALUE units to BASE units
     */
    toBase (aValue) {
    	if( this._altToBase ) {
    		return this._altToBase( aValue );
    	} else {
    		return aValue * this._value;
    	}
    }
}

/**
 * A group of measures
 */
class measureUnitCollection {
	
    /**
     * Appends an unit to the list. Ex: lengths.append( new measureUnit( {name:'kilometers',value:1000} ) );
     * if the unit does not exists, simply add it
     * if it exists and have the same value, omit it
     * if it exists and have different value, we have a problem.
     * 
     * @param measureUnit unit to append
     * @returns boolean true
     **/
    
    append( unit ) {
    	if( !(unit instanceof measureUnit) ) throw new measureException("You cannot append something that is not an unit");
    	let existingMeasure = null;
    	for( let aName of unit.name ) {
    		existingMeasure = this.find(aName);
    		if(existingMeasure!=null) break;
    	}
    	
        if( existingMeasure == null ) {
            this._list.push( unit );
        } else {
        	if( existingMeasure.value != unit.value ) throw new measureException(`Unit ${unit.name[0]} already exists and has a different value ${existingMeasure.value} vs ${unit.value}`);
        }
    }
    
    constructor (name) {
    	this.name = name;
        this._list = new Array();
    }

    /**
     * returns the number of objects into the list+
     * @return Number
     */
    count() {
    	return this._list.length;
    }
    
    /**
     * find an unit by name. Ex: lengths.find('kilometers')
     * @param String measureName name of the measure we want to find
     * @returns measureUnit or null if not found
     */
    find( measureName ) {
        for( let measure of this._list ) {
        	if( !(measure instanceof measureUnit) ) throw new measureException("Found something that is not a measureUnit");
            if( measure.match( measureName ) ) {
                return measure;
            }
        }
        return null;
    }
    
    /**
     * Finds a pair of measures in the list
     * @param String measureNameFrom name of the firstMeasure
     * @param String measureNameTo name of the secondMeasure
     * @returns Object {from: measureUnit; to: measureUnit}
     */
    findPair( measureNameFrom, measureNameTo ) {    	
    	let result = {from:null,to:null};
    	
    	for( let measure of this._list ) {
    		if( !(measure instanceof measureUnit) ) throw new measureException("Found something that is not a measureUnit");
    		
    		if( measure.match( measureNameFrom ) ) {
    			result.from = measure;
    		}
    		//we separate this instead to put in a "else" to allow to find "from" and "to" with the same unit.
    		//It's absurd? Yeah, but not something that has to throw an exception.
    		if ( measure.match( measureNameTo ) ) {
    			result.to = measure;
    		}
    		
    		if( (result.from!=null) && (result.to!=null)) {
    			return result;
    		}
    	}
    	
    	return result;
    }
}

/**
 * The main class of the measure Converter
 * Creates the collections of units and does conversions
 */
class measureConverter {
	
	append( name ) {
		if( !this.findCollection(name) ) {
			this.collections.push( new measureUnitCollection(name) );
		} else {
			throw new measureException("collection already exists");
		}
	}
	
	findCollection( name ) {
		for( let collection of this.collections ) {
			if( collection.name.toLowerCase() == name.toLowerCase() ) return collection;
		}
		
		return false;
	}
	
	constructor() {
		this.collections = new Array();
		this.append( 'lengthCollection' );
		this.append( 'weightCollection' );	
		this.append( 'volumeCollection' );
		this.append( 'temperatureCollection' );
		
		this.populateLengthUnits();
		this.populateWeightUnits();
		this.populateVolumeUnits();
		this.populateTemperatureUnits();
	}
	
	populateLengthUnits() {
		let lengthCollection = this.findCollection('lengthCollection');
		lengthCollection.append( new measureUnit({name:['milimeter','milimeters','mm'],value:0.001}) );
		lengthCollection.append( new measureUnit({name:['centimeter','centimeters','cm'],value:0.01}) );
		lengthCollection.append( new measureUnit({name:['decimeter','decimeters','dm'],value:0.1}) );
		lengthCollection.append( new measureUnit({name:['meter','meters','m'],value:1}) );
		lengthCollection.append( new measureUnit({name:['kilometer','kilometers','km'],value:1000}) );
		lengthCollection.append( new measureUnit({name:['inch','inches'],value:0.0254}) );
		lengthCollection.append( new measureUnit({name:['foot','feet'],value:0.3048}) );
		lengthCollection.append( new measureUnit({name:['mile','miles'],value:1610}) );
		lengthCollection.append( new measureUnit({name:['yard','yards'],value:0.91}) );
		lengthCollection.append( new measureUnit({name:['league','league'],value:4800}) );
		lengthCollection.append( new measureUnit({name:['fathom','fathoms'],value:1.8288}) );
		lengthCollection.append( new measureUnit({name:['nautical mile','nautical miles'],value:1852}) );
		lengthCollection.append( new measureUnit({name:['chain','chains'],value:20.1186}) );
		lengthCollection.append( new measureUnit({name:['rod','rods','pole','poles','perch','perches'],value:5.0292}) );
		lengthCollection.append( new measureUnit({name:['astronomical unit','astronomical units','au','ua'],value:149597870700}) );
		lengthCollection.append( new measureUnit({name:['light year','light years','ly'],value:9460730472580800}) );
		lengthCollection.append( new measureUnit({name:['parsec','parsecs'],value:30856775814671900}) );
		lengthCollection.append( new measureUnit({name:['football field','football fields'],value:110}) );		
		//Egyptian
		lengthCollection.append( new measureUnit({name:['egyptian cubit','egyptian cubits'],value:0.5235}) );
		//Mesopotamian
		lengthCollection.append( new measureUnit({name:['mesopotanian cubit','mesopotanian cubits'],value:0.5186}) );
		//Biblical
		lengthCollection.append( new measureUnit({name:['biblical cubit','biblical cubits'],value:0.457}) );
		//Ancient Greek
		lengthCollection.append( new measureUnit({name:['daktylos','δάκτυλος','daktyloi'],value:0.0193}) );//finger
		lengthCollection.append( new measureUnit({name:['kondylos','κόνδυλος','knodyloi'],value:0.0385}) );//2 fingers
		lengthCollection.append( new measureUnit({name:['palaistē','dōron','palaiste','doron','παλαιστή','δῶρον'],value:0.0771}) );//4 fingers
		lengthCollection.append( new measureUnit({name:['dichas','hēmipodion','hemipodion','διχάς','ἡμιπόδιον'],value:0.1541}) );//8 fingers
		lengthCollection.append( new measureUnit({name:['lichas','λιχάς'],value:0.1926}) ); //10 fingers
		lengthCollection.append( new measureUnit({name:['orthodōron','orthodoron','ὀρθόδωρον'],value:0.1541}) );//11 fingers
		lengthCollection.append( new measureUnit({name:['spithamē','spithame','σπιθαμή'],value:0.2312}) );//12 finger
		lengthCollection.append( new measureUnit({name:['pous','πούς'],value:0.3082}) );//16 fingers
		lengthCollection.append( new measureUnit({name:['pygmē','pygme','πυγμή'],value:0.3468}) );//18 fingers	
		lengthCollection.append( new measureUnit({name:['pygōn','pygon','πυγών'],value:0.3853}) );//20 finger
		lengthCollection.append( new measureUnit({name:['greek cubit','greek cubits','pēchys','pechys','πῆχυς'],value:0.46}) );
		lengthCollection.append( new measureUnit({name:['haploun bēma','haploun bema','ἁπλοῦν βῆμα'],value:0.77}) );
		lengthCollection.append( new measureUnit({name:['bēma','bema','diploun bēma','diploun bema','βῆμα','διπλοῦν βῆμα'],value:1.54}) );
		lengthCollection.append( new measureUnit({name:['orgyia','ὄργυια'],value:1.85}) );
		lengthCollection.append( new measureUnit({name:['kalamos','akaina','dekapous','κάλαμος','ἄκαινα','δεκάπους'],value:3.08}) );
		lengthCollection.append( new measureUnit({name:['hamma','ἅμμα'],value:18.5}) );
		lengthCollection.append( new measureUnit({name:['plethron','πλέθρον'],value:30.8}) );
		lengthCollection.append( new measureUnit({name:['stadion','stdia','στάδιον'],value:184.9}) );
		lengthCollection.append( new measureUnit({name:['diaulos','δίαυλος'],value:369.9}) );
		lengthCollection.append( new measureUnit({name:['hippikon','ἱππικόν'],value:739.7}) );
		lengthCollection.append( new measureUnit({name:['milion','μίλιον'],value:1479}) );
		lengthCollection.append( new measureUnit({name:['dolichos','δόλιχος'],value:2219}) );
		lengthCollection.append( new measureUnit({name:['parasanges','παρασάγγες'],value:5548}) );
		lengthCollection.append( new measureUnit({name:['schoinos','σχοινός'],value:7397}) );
		//Ancient Rome
		lengthCollection.append( new measureUnit({name:['roman cubit','roman cubits'],value:0.444}) );
		lengthCollection.append( new measureUnit({name:['roman ulna','roman ulnas'],value:1.20}) );
		lengthCollection.append( new measureUnit({name:['roman mile','roman miles'],value:1479}) );
		//Middle Ages
		lengthCollection.append( new measureUnit({name:['vara','varas','vares'],value:1.57}) ); //Crown of Aragon
	}
	
	populateWeightUnits() {
		let weightCollection = this.findCollection('weightCollection');
		weightCollection.append( new measureUnit({name:['miligram','miligrams','mg','mgr'],value:0.001}));
		weightCollection.append( new measureUnit({name:['centigram','centigrams','cg','cgr'],value:0.01}));
		weightCollection.append( new measureUnit({name:['decigram','decigrams','dg','dgr'],value:0.1}));
		weightCollection.append( new measureUnit({name:['gram','grams','g','gr'],value:1}));
		weightCollection.append( new measureUnit({name:['decagram','decagrams'],value:10}));
		weightCollection.append( new measureUnit({name:['hectogram','hectograms'],value:10}));
		weightCollection.append( new measureUnit({name:['kilogram','kilograms','kg','kgr'],value:1000}));
		weightCollection.append( new measureUnit({name:['ton','tons','tm'],value:1000000}));
		//Ancient Greek (Attic/Euboic)
		weightCollection.append( new measureUnit({name:['obol','obolus','obols','ὀβολός'],value:0.72}));
		weightCollection.append( new measureUnit({name:['drachma','drachmae','δραχμή'],value:4.31}));
		weightCollection.append( new measureUnit({name:['mina','minae','μνᾶ'],value:431}));
		weightCollection.append( new measureUnit({name:['talent','τάλαντον'],value:25860}));
	}
	
	populateVolumeUnits() {
		let volumeCollection = this.findCollection('volumeCollection');
		volumeCollection.append( new measureUnit({name:['liter','liters','litre','litres','l'],value:1} ) );
		volumeCollection.append( new measureUnit({name:['cubic meter','cubic metres','m3','m^3','m³'],value:1000}));
	}
	
	populateTemperatureUnits() {
		const temperatureCollection = this.findCollection('temperatureCollection');
		temperatureCollection.append( new measureUnit({name:['centigrade','centigrades','celsius','c','ºc'],value:1}));
		temperatureCollection.append( new measureUnit({
				name:['farenheit','f','ºf'],
				toBase: function (aValue) {
					return (aValue-32) * (5/9);
				},
				fromBase: function (aValue) {
					return (aValue * 9/5) + 32;
				}
			}));
		temperatureCollection.append( new measureUnit({
			name:['kelvin','k','ºk'],
			toBase: function (aValue) {
				return aValue - 273.15;
			},
			fromBase: function (aValue) {
				return aValue + 273.15;
			}
		}));
	}
	
	convert(value, from, to) {
		if( typeof value != "number" ) throw new measureException( "value is not a number" );
		if( typeof from != "string" ) throw new measureException( "from is not a String");
		if( typeof to != "string" ) throw new measureException( "to is not a String");
		if( from == "" ) throw new measureException("from cannot be an empty string");
		if( to == "" ) throw new measureException("to cannot be an empty string");
		
		//try to find a matching pair
		let pair = null;
		for( let collection of this.collections ) {
			if( !(collection instanceof measureUnitCollection) ) throw new Exception("found something that is not a collection");
			
			pair = collection.findPair(from,to);
			
			if( pair==null ) throw new measureException("measures not found");
			if( pair.from != null || pair.to != null ) {
				if( pair.from == null ) {
					throw new measureException("Measure 'from' unknown or non-matching dimensions");
				} else {
					if( pair.to == null ) {
						throw new measureException("Measure 'to' unknown or non-matching dimensions");
					} else {
						break;
					}
				}
			}
		}

		if( (pair != null) && (pair.from != null) && (pair.to != null) ) {
			//TODO: By now we skip calculating the conversion if the value is the same
			//But with units calculated by functions this won't work.
			if( (pair.from.value != 0) && (pair.from.value==pair.to.value)  ) {
				return value;
			} else {
				return pair.to.fromBase( pair.from.toBase( value ) );
			}
		} else {
			if( pair==null ) {
				throw new measureException("Something happened and we didn't searched the collections")
			} else {
				throw new measureException("Non-matching dimensions or dimensions unknown")
			}
		}
			
	}
}

function convert( value, from, to ) {
	let mConverter = new measureConverter();
	return mConverter.convert(value,from,to);
}
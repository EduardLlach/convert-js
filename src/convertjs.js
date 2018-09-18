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
        if( value == 0 ) throw new measureException("Measure value cannot be 0");
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

    /**
     * returns the number of objects into the list+
     * @return Number
     */
    count() {
    	return this._list.length;
    }
    
    /**
     * find an unit by name. Ex: distances.find('kilometers')
     * @param String measureName name of the measure we want to find
     * @returns measureUnit or null if not found
     */
    find( measureName ) {
        let measureNameStr = measureName.toLowerCase();
        for( let measure of this._list ) {
        	if( !(measure instanceof measureUnit) ) throw new measureException("Found something that is not a measureUnit");
            if( measureNameStr == measure.name.toLowerCase() ) {
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
    	let measureNameFromStr = measureName.toLowerCase();
    	let measureNameToStr   = measureName.toLowerCase();
    	let result = {from:null,to:null};
    	
    	for( let mesure of this._list ) {
    		if( !(measure instanceof measureUnit) ) throw new measureException("Found something that is not a measureUnit");
    		let currentMeasure = measure.name.toLowerCase();
    		if( measureNameFromStr == currentMeasure ) {
    			result.from = measure;
    		} else if (measureNameToStr == currentMeasure ) {
    			result.to = measure;
    		}
    		
    		if( (result.from!=null) && (restul.to!=null)) {
    			return result;
    		}
    	}
    	
    	return result;
    }

    /**
     * Appends an unit to the list. Ex: distances.append( new measureUnit( {name:'kilometers',value:1000} ) );
     * if the unit does not exists, simply add it
     * if it exists and have the same value, omit it
     * if it exists and have different value, we have a problem.
     * 
     * @param measureUnit unit to append
     * @returns boolean true
     **/
    
    append( unit ) {
    	if( !(unit instanceof measureUnit) ) throw new measureException("You cannot append something that is not an unit");
    	let existingMeasure = this.find(unit.name);
        if( existingMeasure == null ) {
            this._list.push( unit );
        } else {
        	if( existingMeasure.value != unit.value ) throw new measureException("Unit already exists and has a different value");
        }
    }
}

class measureConverter {
	
	constructor () {
		this.collections = new Array();
		this.collections['distanceCollection'] = new measureUnitCollection();
		this.collections['weightCollection'] = new measureUnitCollection();
		
		this.populateDistanceUnits();
	}
	
	populateDistanceUnits() {
		this.collections.distanceCollection.append( new measureUnit({name:'milimeters',value:0.001}) );
		this.collections.distanceCollection.append( new measureUnit({name:'centimeters',value:0.01}) );
		this.collections.distanceCollection.append( new measureUnit({name:'decimeters',value:0.1}) );
		this.collections.distanceCollection.append( new measureUnit({name:'meters',value:1}) );
		this.collections.distanceCollection.append( new measureUnit({name:'kilometers',value:1000}) );
	}
	
	populateWeightUnits() {
		this.collections.weightCollection.append( new measureUnit({name:'grams',value:1}))
		this.collections.weightCollection.append( new measureUnit({name:'kilograms',value:1000}));		
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

		if( pair != null && pair.from != null && pair.to != null ) {
			return value * (pair.from.value / pair.to.value);
		} else {
			throw new measureException("Non-matching dimensions or dimensions unknown")
		}
			
	}
}

function convert( value, from, to ) {
	let mConverter = new measureConverter();
	return mConverter.convert(value,from,to);
}
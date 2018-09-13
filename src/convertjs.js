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
        measureName = measureName.toLowerCase();
        for( let measure of this._list ) {
        	if( !(measure instanceof measureUnit) ) throw new measureException("Found something that is not a measureUnit");
            if( measureName == measure.name.toLowerCase() ) {
                return measure;
            }
        }
        return null;
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
		this._distanceCollection = new measureCollection();
		
		this.populateDistanceUnits();
	}
	
	populateDistanceUnits() {
		this._distanceCollection.append( new measureUnit({name:'milimeters',value:0.001}) );
		this._distanceCollection.append( new measureUnit({name:'centimeters',value:0.01}) );
		this._distanceCollection.append( new measureUnit({name:'decimeters',value:0.1}) );
		this._distanceCollection.append( new measureUnit({name:'meters',value:1}) );
		this._distanceCollection.append( new measureUnit({name:'kilometers',value:1000}) );
	}
	
	convert(value, from, to) {
		if( typeof value != "number" ) throw new measureException( "value is not a number" );
		if( typeof from != "string" ) throw new measureException( "from is not a String");
		if( typeof to != "string" ) throw new measureException( "to is not a String");
		if( from == "" ) throw new measureException("from cannot be an empty string");
		if( to == "" ) throw new measureException("to cannot be an empty string");
	}
}
# convert-js

Convert units from one to another.
Learning ES6 personal project

## Developement goals
The project goal is to get an expandable system which allows you to convert from one units to another.

Example of intended use:
```javascript
miles = convertjs( 10, 'kilometers', 'miles' );
```

## Learning goals
* Javascript new _classes_ notation (Chrome 49, Firefox 45. February 2016).
* _getters_ and _setters_
* _instanceof_
* _exceptions_
* Writting tests. TDD.

## How to achieve an expandable system
1. Units should be "strings", so we can add any existing measuring unit.
2. Establish a "reference unit". All units should "know" their conversion to this unit
    * Weight: grams
    * Distance: meters
    * Volume: liter
    * Area: square meters
 3. This would be enough for most units, but not all. Conversion from Farenheit to Celsius or Kelvin requires a formula.
 
## Version goals
* v0.1 - reached 2018.09.19 - Basic functional system with International System units and some Imperial Units for Weight, Distance and Volume.
* v0.2 - reached 2018.09.19 - Use of formulas to calculate proportions.
    * __distance__
        * milimeters
        * centimeters
        * decimeters
        * meters
        * kilometers
    * __volume__
        * liters
        * cubic meters
    * __weight__
        * miligrams
        * centigrams
        * decigrams
        * grams
        * kilograms
        * ton
    * __temperature__
        * centigrades
        * farenheit
        * kelvin
    
* v0.3 - reached 2018.09.29 - Use of synonyms. This allos us to treat the unit, its plural and reduced notations. i.e: (meter, meters, m). Also added some units.
    * __distance__
        * foot
        * mile
        * yerd
        * league
        * fathom
        * nautical mile
        * chain
        * rod
        * astronomical unit
        * light year
        * parsec
        * football field
    * __distance (ancient)__ 
        * egyptian cubit
        * mesopotanian cubit
        * biblical cubit
        * δάκτυλος
        * κόνδυλος
        * δῶρον
        * διχάς
        * λιχάς
        * ὀρθόδωρον
        * σπιθαμή
        * πούς
        * πυγμή
        * πυγών
        * πῆχυς
        * ἁπλοῦν βῆμα
        * βῆμα
        * ὄργυια
        * κάλαμος
        * ἅμμα
        * πλέθρον
        * στάδιον
        * δίαυλος
        * ἱππικόν
        * μίλιον
        * δόλιχος
        * παρασάγγες
        * σχοινός
        * roman cubit
        * roman ulna
        * roman mile
        * vara
    * __weight (ancient)__
        * ὀβολός
        * δραχμή
        * μνᾶ
        * τάλαντον
* v0.4 - not reached - adding multilanguage capabilities
        

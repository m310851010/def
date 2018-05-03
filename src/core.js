var def = {};

def.each = function(obj, callback ) {
    var length, i = 0;

    if ( isArrayLike( obj ) ) {
        length = obj.length;
        for ( ; i < length; i++ ) {
            if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                break;
            }
        }
    } else {
        for ( i in obj ) {
            if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                break;
            }
        }
    }

    return obj;
}


var class2type = {};
var toString = class2type.toString;

def.each( "Boolean,Number,String,Function,Array,Date,RegExp,Object,Error,Symbol".split( "," ),
    function( i, name ) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

def.inArray = function(arg, list, index ){
    for(var i=index || 0; i<list.length; i++) {
        if(arg == list[i]) return i;
    }

    return -1;
}

function toType( obj ) {
    if ( obj == null ) {
        return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call( obj ) ] || "object" :
        typeof obj;
}

function isFunction( obj ) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

function isNumber(obj) {
    return toType( obj ) === 'number';
}

function isString(obj) {
    return toType( obj ) === 'string';
}



function isWindow( obj ) {
    return obj != null && obj === obj.window;
};


function isArrayLike( obj ) {

    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = toType( obj );

    if ( isFunction( obj ) || isWindow( obj ) ) {
        return false;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

def.isFunction = isFunction;
def.isWindow = isWindow;
def.isNumber = isNumber;
def.isString = isString;
def.isArrayLike = isArrayLike;
def.type =  toType;

var hasOwn = class2type.hasOwnProperty;
var support = {};

var i;
for ( i in [0,1]) {
    break;
}

support.ownFirst = i === "0";

def.isPlainObject = function (obj) {
    var key;

    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
        return false;
    }

    try {

        // Not own constructor property must be Object
        if ( obj.constructor &&
            !hasOwn.call( obj, "constructor" ) &&
            !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
            return false;
        }
    } catch ( e ) {

        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Support: IE<9
    // Handle iteration over inherited properties before own properties.
    if ( !support.ownFirst ) {
        for ( key in obj ) {
            return hasOwn.call( obj, key );
        }
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for ( key in obj ) {}

    return key === undefined || hasOwn.call( obj, key );
};

def.extend = function () {

    var src, copyIsArray, copy, name, options, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !def.isFunction( target ) ) {
        target = {};
    }

    // extend def itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( def.isPlainObject( copy ) ||
                    ( copyIsArray = def.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && def.isArray( src ) ? src : [];

                    } else {
                        clone = src && def.isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = def.extend( deep, clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

export default def;
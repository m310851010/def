## def js

A tool library of deferred object extracted from [jQuery Deferred Object](http://api.jquery.com/category/deferred-object/)

The Deferred object is chainable, similar to the way a jQuery object is chainable, but it has its own methods. After creating a Deferred object, you can use any of the methods below by either chaining directly from the object creation or saving the object in a variable and invoking one or more methods on that variable.



## Build using npm

``` js
npm run build(or dev)
```

## Installation

``` html
  <script src="dist/def.min.js" type="text/javascript"></script>
```

## Then using:

``` js
var defer = def.Deferred();
setTimeout(()=>{
	defer.resolveWith({age:10, name:'test'}, [10,20]);
}, 2000);

defer.done(function(a, b){
	console.log(this, a, b); // this=> {age:10, name:'test'}, a=>10, b=>20
});
```

## API

def Object

![image](https://github.com/m310851010/def/blob/master/dist/def.png)


Deferred Object

![image](https://github.com/m310851010/def/blob/master/dist/def.png)


## License
MIT

Free Software, Yeah!

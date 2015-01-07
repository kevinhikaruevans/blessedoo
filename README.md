An incomplete MVC xml wrapper for blessed, a curses-like library.  All blessed objects utilize the 'blessed' namespace. All subproperties of the options utilize their own xml subnode.

A basic form would look like this!

    <blessed:form top="center" left="center" width="50%" height="50%" content="Hello!">
      <border type="line"></border>
    </blessed:form>
    
![http://i.imgur.com/L66AOQk.png](http://i.imgur.com/L66AOQk.png)    
Loading views
--------
You can load views by using the blessedoo `loadView` method:

    var blessedoo = require('./blessedoo')();
    
    var context = {
      doStuff: function() {
        console.log('ham');
      },
      doStuff2: function() {
        console.log('meow');
      }
    };
    blessedoo.loadView('sections/test.xml', context, function(err, result) {
      blessedoo.setView(result);
    });

`test.xml` would look something ugly like this:

    <blessed:form top="center" left="center" width="50%" height="50%" content="Hello!" keys="true">
      <border type="line"></border>
    
      <blessed:button mouse="true" keys="true" shrink="true" padding="1" top="center" left="center" width="50%"  content="Push me!" onpress="doStuff">
        <style bg="blue">
          <focus bg="red"></focus>
          <hover bg="red"></hover>
        </style>
        <border type="line"></border>
      </blessed:button>
      <blessed:button mouse="true" keys="true" shrink="true" padding="1" top="2" left="center" width="50%" content="Me too!" onpress="doStuff2">
        <style bg="blue">
          <focus bg="black"></focus>
          <hover bg="black"></hover>
        </style>
        <border type="line"></border>
      </blessed:button>
    </blessed:form>

IDs
--------
The purpose of IDs is to uniquely identify an element. This is similar to HTML. 

To retrieve an element, just call `blessedoo.getElementById('myUniqueName')`.

For lists, you MUST do this as there is currently no way to insert items from the XML. It is done after the XML compilation.

      <blessed:list mouse="true" keys="true" shrink="true" padding="1" top="20%" left="center" height="30%" width="100%" id="myListView" selectedFg="blue">
        <border type="line"></border>
      </blessed:list>
  
      var list = blessedoo.getElementById('myListView');
      list.setItems(['item one', 'item two']);
  
A simple button example
--------
Using blessedoo, it would look like this:

    <blessed:button mouse="true" keys="true" shrink="true" padding="1" top="2" left="20" width="50%" name="button" content="A button!" onpress="someFunctionPassedIntoContext">
      <style bg="blue">
        <focus bg="red"></focus>
        <hover bg="red"></hover>
      </style>
      <border type="line"></border>
    </blessed:button>

With the original library, it would look like this:
The original blessed library seemed to get confusing very quickly. A simple button would look like this:

    var someButton = blessed.button({
      parent: box,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 20,
      top: 2,
      name: 'button',
      content: 'A button!',
      border: {
        type: 'line'
      },
      style: {
        bg: 'blue',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    });
    
    someButton.on('press', function() {
      // do stuff
    }); 

blessedoo
=========

An incomplete xml wrapper for blessed. All blessed objects utilize the 'blessed' namespace. All subproperties of the options utilize their own xml subnode.

A basic form would look like this!

    <blessed:form top="center" left="center" width="50%" height="50%" content="Hello!">
      <border type="line"></border>
    </blessed:form>


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

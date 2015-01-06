var blessedoo = require('./blessedoo')();

var context = {
  doStuff: function() {
    console.log('asdf');
  }
};
blessedoo.loadView('sections/test.xml', context, function(err, result) {
  blessedoo.setView(result);
});



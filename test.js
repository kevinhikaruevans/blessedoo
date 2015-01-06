var blessedoo = require('./blessedoo')();

var context = {
  doStuff: function() {
    console.log('asdf');
  },
  doStuff2: function() {
    console.log('asdfgg');
  }
};
blessedoo.loadView('sections/test.xml', context, function(err, result) {
  blessedoo.setView(result);
});



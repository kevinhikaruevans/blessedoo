var blessedoo = require('./blessedoo')({
  smartCSR: true
});

var context = {
  doStuff: function() {
    var main = blessedoo.getElementById('main');

    main.setContent('you pushed it!');
    blessedoo.render();
  },
  doStuff2: function() {
    var main = blessedoo.getElementById('main');

    main.setContent('you pushed the other one!');
    blessedoo.render();
  }
};
blessedoo.loadView('sections/test.xml', context, function(err, result) {
  var list = blessedoo.getElementById('myListView');
  list.setItems(['item one', 'item two']);
  blessedoo.setView(result);

});



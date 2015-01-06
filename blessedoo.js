var fs = require('fs'),
  xml2js = require('xml2js'),
  blessed = require('blessed');

var blessedoo = function() {
  var EVENTS = ['click', 'press'];
  var views = {};
  var screen = blessed.screen();

  screen.key('q', function() {
    process.exit(0);
  });
  function getEventAttributes(list) {
    return list.filter(function(str) {
      return str.indexOf('on') === 0; //onclick, onpress etc
    });
  }
  function getNonBlessedNodes(list) {
    return list.filter(function(str) {
      return str.indexOf('blessed:') !== 0 && str !== 'attributes';
    });
  }
  function getBlessedNodes(list) {
    return list.filter(function(str) {
      return str.indexOf('blessed:') === 0;
    });
  }
  function getBlessedName(str) {
    return str.indexOf('blessed:') === 0 && str.substring(8);
  }
  function flattenAttributeNode(options, key, node) {
    // options = {}, key = 'style', node = dict
    var o = {};
    function flatten(obj) {
      var next = obj[Object.keys(obj)[0]];
      if(typeof(next) == 'object')
        return flatten(next);
      return obj;
    }
    Object.keys(node).forEach(function(subkey) {

      var value = node[subkey];
      if(subkey == 'attributes') {
        // handle attributes
        var tmpKey = Object.keys(value)[0];
        o[tmpKey] = value[tmpKey];
      } else {
        // handle object
        o[subkey] = flatten(value);
      }
    });
    
    options[key] = o;
  }
  function cleanAttributes(attributes) {
    Object.keys(attributes).forEach(function(k) {
      if(attributes[k] === 'true')
        attributes[k] = true;
    });
    return attributes;
  }
  function parseView(data, context, callback) {
    var rootType = Object.getOwnPropertyNames(data);
    
    if(rootType.length !== 1 || !rootType[0] || !getBlessedName(rootType[0]))
      return callback(new Error('view must contain one single root blessed node'));

    // take the zeroth node (since there should be one root)...
    rootType = rootType[0];
    

    // if it's null, then the prop doesn't exist in blessed and cannot be used... maybe check if function
    
    if(!blessed[getBlessedName(rootType)])
      return callback(new Error('invalid blessed type used for root node'));

    var rootElement = null;

    function traverseXMLNode(xmlKey, xmlNode, parent) {
      //console.log('key -> ', xmlKey, ' :: ', xmlNode);
      var keys = Object.keys(xmlNode);
      
      //var options = xmlNode.attributes;
      var options         = cleanAttributes(xmlNode.attributes) || {};
      var events          = getEventAttributes(Object.keys(options));
      var blessedNodes    = getBlessedNodes(keys);
      var nonBlessedNodes = getNonBlessedNodes(keys);
      options.parent      = parent;

      nonBlessedNodes.forEach(function(key) {
        flattenAttributeNode(options, key, xmlNode[key][0]);
        //options[key] = flattenAttributeNode(xmlNode[key][0]); // this wont work for bg
      });
      
      var element = blessed[getBlessedName(xmlKey)](options);
      events.forEach(function(e) {
        element.on(e.substring(2), context[options[e]]);
      });
      if(parent === null)
        rootElement = element;
      blessedNodes.forEach(function(key) {
        for(var i = 0; i < xmlNode[key].length; i++) {
          traverseXMLNode(key, xmlNode[key][i], element);
        }
      });
    }
    
    traverseXMLNode(rootType, data[rootType], null);
    callback(null, rootElement);
    return rootElement;
  }

  return {
    getScreen: function() { return screen; },
    render: function() {
      screen.render();
    },
    setView: function(element) {
      screen.append(element);
      screen.render();
    },

    setViewFromFilename: function(filename) {
      screen.append(views[filename]);
      screen.render();
    },
    loadViews: function(files) {
      files.forEach(loadView);
    },
    loadView: function(filename, context, callback) {
      var parser = new xml2js.Parser({attrkey: 'attributes'});

      parser.addListener('end', function(data) {
        views[filename] = parseView(data, context, callback);
      });
      fs.readFile(filename, function(err, data) {
        parser.parseString(data);
      });
    }
  };
};

module.exports = blessedoo;
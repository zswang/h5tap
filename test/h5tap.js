
var h5tap = require('../');
      

describe("src/h5tap.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@h5tap():pc", function (done) {
    jsdom.env("    <div>\n       <button cmd=\"save\"></button>\n       <button cmd=\"load\"></button>\n    </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("h5tap():pc", function (done) {
    examplejs_printLines = [];
    h5tap(document.querySelector('div'), '[cmd]', function (target) {
      examplejs_print(target.getAttribute('cmd'));
      assert.equal(examplejs_printLines.join("\n"), "load"); examplejs_printLines = [];
      done();
    });

    var point = {x: 10, y: 10 };
    var target = document.querySelector('[cmd="load"]');

    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.pageX = point[0];
    e.pageY = point[1];
    e.clientX = point[0];
    e.clientY = point[1];
    e.initUIEvent('mousedown', true, true, window, 1);
    target.dispatchEvent(e);

    var e = document.createEvent('UIEvent');
    var point = [100, 105];
    e.pageX = point[0];
    e.pageY = point[1];
    e.clientX = point[0];
    e.clientY = point[1];
    e.initUIEvent('mouseup', true, true, window, 1);
    target.dispatchEvent(e);
  });
          
  it("jsdom@h5tap():mobile", function (done) {
    jsdom.env("    <div>\n       <button cmd=\"save\"><span>保存</span></button>\n       <button cmd=\"load\"></button>\n    </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("h5tap():mobile", function (done) {
    examplejs_printLines = [];
    h5tap('div', '[cmd]', function (target) {
      examplejs_print(target.getAttribute('cmd'));
      assert.equal(examplejs_printLines.join("\n"), "save"); examplejs_printLines = [];
      done();
    });

    var point = {x: 10, y: 10 };
    var target = document.querySelector('[cmd="save"] span');

    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);

    var e = document.createEvent('UIEvent');
    var point = [100, 105];
    e.changedTouches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e);
  });
          
  it("jsdom@h5tap():mobile none", function (done) {
    jsdom.env("    <div>\n       <button cmd=\"save\"><span>保存</span></button>\n       <button cmd=\"load\"></button>\n    </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("h5tap():mobile none", function (done) {
    examplejs_printLines = [];
    h5tap('div', '[cmd]', function (target) {
      examplejs_print('error');
    });

    var point = {x: 10, y: 10 };
    var target = document.querySelector('[cmd="save"] span');

    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);

    var e = document.createEvent('UIEvent');
    var point = [100, 155];
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e);

    var point = {x: 10, y: 10 };
    var target = document.querySelector('[cmd="save"] span');

    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);

    var e = document.createEvent('UIEvent');
    var point = [100, 155];
    e.changedTouches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e);

    var point = {x: 10, y: 10 };
    var target = document.querySelector('div');

    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);

    var e = document.createEvent('UIEvent');
    var point = [100, 155];
    e.changedTouches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e);
    done();
  });
          
});
         
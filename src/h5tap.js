(function(exportName) {
  /*<remove>*/
  'use strict';
  /*</remove>*/

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  /*<function name="h5tap">*/
  /**
   * 监听移动端 tap 事件
   *
   * @param {HTMLElement|string} parent 容器
   * @param {string} selector 选择器
   * @param {Function} callback 回调函数
   * [[[
   *   @param {HTMLElement} element 触发元素
   *   @param {number} duration 按下到放开的时长
   *   function callback(element, duration) {}
   * ]]]
   * @example h5tap():pc
    ```html
    <div>
       <button cmd="save"></button>
       <button cmd="load"></button>
    </div>
    ```
    ```js
    h5tap(document.querySelector('div'), '[cmd]', function (target) {
      console.log(target.getAttribute('cmd'));
      // > load
      // * done
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
    ```
   * @example h5tap():mobile
    ```html
    <div>
       <button cmd="save"><span>保存</span></button>
       <button cmd="load"></button>
    </div>
    ```
    ```js
    h5tap('div', '[cmd]', function (target) {
      console.log(target.getAttribute('cmd'));
      // > save
      // * done
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
    ```
   * @example h5tap():mobile none
    ```html
    <div>
       <button cmd="save"><span>保存</span></button>
       <button cmd="load"></button>
    </div>
    ```
    ```js
    h5tap('div', '[cmd]', function (target) {
      console.log('error');
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
    // * done
    ```
   */
  function h5tap(parent, selector, callback) {

    if (typeof parent === 'string') {
      parent = document.querySelector(parent);
    }
    var startPoint;
    var target;
    var startTime;

    function startHandler(e) {
      var elements = [].slice.call(parent.querySelectorAll(selector));
      target = e.target;
      while (target && elements.indexOf(target) < 0) {
        target = target.parentNode;
      }
      if (!target) {
        return;
      }
      startTime = Date.now();
      if (/touchstart/i.test(e.type)) {
        var touch = (e.touches || {})[0] || {};
        startPoint = [touch.clientX || 0, touch.clientY || 0];
      } else {
        startPoint = [e.clientX, e.clientY];
      }
    }

    function endHandler(e) {
      if (!startPoint) {
        return;
      }
      var endPoint;
      if (/touchend/i.test(e.type)) {
        var touch = (e.touches || {})[0] || (e.changedTouches || {})[0] || {};
        endPoint = [touch.clientX || 0, touch.clientY || 0];
      } else {
        endPoint = [e.clientX, e.clientY];
      }
      if (Math.sqrt(Math.pow(startPoint[0] - endPoint[0], 2) + Math.pow(startPoint[1] - endPoint[1], 2)) < 50) {
        callback(target, Date.now() - startTime);
      }
      startPoint = null;
      target = null;
    }

    parent.addEventListener('touchstart', startHandler, false);
    document.addEventListener('touchend', endHandler, false);

    parent.addEventListener('mousedown', startHandler, false);
    document.addEventListener('mouseup', endHandler, false);
  }
  /*</function>*/

  exports = h5tap;

  /* istanbul ignore next */
  if (typeof define === 'function') {
    if (define.amd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }

})('h5tap');
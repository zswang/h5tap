(function(exportName) {
  /**
   * @file h5tap
   *
   * Tap event trigger of mobile
   * @author
   *   zswang (http://weibo.com/zswang)
   * @version 0.0.3
   * @date 2016-11-22
   */
  /*<function name="h5tap">*/
  /**
   * 监听移动端 tap 事件
   *
   * @param {HTMLElement|string} parent 容器
   * @param {string} selector 选择器，触发事件的元素
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
    var target = document.querySelector('[cmd="load"]');
    // ------ mousedown ------
    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.pageX = point[0];
    e.pageY = point[1];
    e.clientX = point[0];
    e.clientY = point[1];
    e.initUIEvent('mousedown', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ mouseup ------
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
    var target = document.querySelector('[cmd="save"] span');
    // ------ touchstart ------
    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ touchend ------
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
    var count = 0;
    h5tap('div', '[cmd]', function (target) {
      count++;
    });
    var target = document.querySelector('[cmd="save"] span');
    // ------ touchstart ------
    var e = document.createEvent('UIEvent');
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ touchend ------
    var e = document.createEvent('UIEvent');
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e); // +1
    var target = document.querySelector('[cmd="save"] span');
    // ------ touchstart ------
    var touchstartEvent = document.createEvent('UIEvent');
    var point = [100, 100];
    touchstartEvent.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    touchstartEvent.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(touchstartEvent);
    // ------ touchend ------
    var touchendEvent = document.createEvent('UIEvent');
    var point = [100, 155];
    touchendEvent.changedTouches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    touchendEvent.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(touchendEvent); // +0
    var target = document.querySelector('div');
    // ------ touchstart ------
    target.dispatchEvent(touchstartEvent);
    // ------ touchend ------
    target.dispatchEvent(touchendEvent); // +0
    setTimeout(function () {
      console.log(count);
      // > 1
      // * done
    }, 5)
    ```
   * @example h5tap():Event parallelism
    ```html
    <div>
       <button cmd="ok"></button>
    </div>
    ```
    ```js
    var count = 0;
    h5tap('div', '[cmd]', function (target) {
      count++;
    });
    var point = [100, 100];
    var target = document.querySelector('[cmd="ok"]');
    // ------ mousedown ------
    var e = document.createEvent('UIEvent');
    e.pageX = point[0];
    e.pageY = point[1];
    e.clientX = point[0];
    e.clientY = point[1];
    e.initUIEvent('mousedown', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ touchstart ------
    var e = document.createEvent('UIEvent');
    var point = [100, 100];
    e.touches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchstart', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ mouseup ------
    var e = document.createEvent('UIEvent');
    e.pageX = point[0];
    e.pageY = point[1];
    e.clientX = point[0];
    e.clientY = point[1];
    e.initUIEvent('mouseup', true, true, window, 1);
    target.dispatchEvent(e);
    // ------ touchend ------
    var e = document.createEvent('UIEvent');
    e.changedTouches = [{pageX: point[0], pageY: point[1], clientX: point[0], clientY: point[1]}];
    e.initUIEvent('touchend', true, true, window, 1);
    target.dispatchEvent(e);
    setTimeout(function () {
      console.log(count);
      // > 1
      // * done
    }, 5)
    ```
   */
  function h5tap(parent, selector, callback) {
    if (typeof parent === 'string') {
      parent = document.querySelector(parent);
    }
    var startPoint;
    var target;
    var startTime;
    var removeMouseEvent;
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
        if (!removeMouseEvent) {
          removeMouseEvent = true;
          parent.removeEventListener('mousedown', startHandler);
          document.removeEventListener('mouseup', endHandler);
        }
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
    // 兼容 PC 端
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
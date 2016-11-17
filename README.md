h5tap Tap event trigger of Moblie.
-----

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Smaller than smaller. 

无他，就是小

## 使用方法

### 绑定事件 bind

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
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/h5tap
[npm-image]: https://badge.fury.io/js/h5tap.svg
[travis-url]: https://travis-ci.org/zswang/h5tap
[travis-image]: https://travis-ci.org/zswang/h5tap.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/h5tap?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/h5tap/badge.svg?branch=master&service=github

! function (e, n, s) {
  function o(e, n) {
    return typeof e === n;
  }
  var i = [],
    r = [],
    f = {
      _version: '3.5.0',
      _config: {
        classPrefix: '',
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function (e, n) {
        var s = this;
        setTimeout(function () {
          n(s[e]);
        }, 0);
      },
      addTest: function (e, n, s) {
        r.push({
          name: e,
          fn: n,
          options: s
        });
      },
      addAsyncTest: function (e) {
        r.push({
          name: null,
          fn: e
        });
      }
    },
    Modernizr = function () {};
  Modernizr.prototype = f, Modernizr = new Modernizr();
  var l = n.documentElement,
    c = 'svg' === l.nodeName.toLowerCase();
  Modernizr.addTest('passiveeventlisteners', function () {
      var n = !1;
      try {
        var s = Object.defineProperty({}, 'passive', {
          get: function () {
            n = !0;
          }
        });
        e.addEventListener('test', null, s);
      } catch (e) {}
      return n;
    }),
    function () {
      var e, n, s, a, t, l;
      for (var c in r)
        if (r.hasOwnProperty(c)) {
          if (e = [], (n = r[c])
            .name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
            for (s = 0; s < n.options.aliases.length; s++)
              e.push(n.options.aliases[s].toLowerCase());
          for (a = o(n.fn, 'function') ? n.fn() : n.fn, t = 0; t < e.length; t++)
            1 === (l = e[t].split('.'))
            .length ? Modernizr[l[0]] = a : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = a), i.push((a ? '' : 'no-') + l.join('-'));
        }
    }(),
    function (e) {
      var n = l.className,
        s = Modernizr._config.classPrefix || '';
      if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
        var o = new RegExp('(^|\\s)' + s + 'no-js(\\s|$)');
        n = n.replace(o, '$1' + s + 'js$2');
      }
      Modernizr._config.enableClasses && (n += ' ' + s + e.join(' ' + s), c ? l.className.baseVal = n : l.className = n);
    }(i), delete f.addTest, delete f.addAsyncTest;
  for (var u = 0; u < Modernizr._q.length; u++)
    Modernizr._q[u]();
  e.Modernizr = Modernizr;
}(window, document);
!(function (e) {
  var o = {};
  function n(t) {
    if (o[t]) return o[t].exports;
    var r = (o[t] = { i: t, l: !1, exports: {} });
    return e[t].call(r.exportts, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = o),
    (n.d = function (e, o, t) {
      n.o(e, o) || Object.defineProperty(e, o, { enumerable: !0, get: t });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, o) {
      if ((1 & o && (e = n(e)), 8 & o)) return e;
      if (4 & o && "object" == typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (n.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & o && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            t,
            r,
            function (o) {
              return e[o];
            }.bind(null, r)
          );
      return t;
    }),
    (n.n = function (e) {
      var o =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(o, "a", o), o;
    }),
    (n.o = function (e, o) {
      return Object.prototype.hasOwnProperty.call(e, o);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, o, n) {
    const t = n(1),
      r = n(2);
    const u = (function () {
      "我是测试foo",
        console.debug("我是测试debug"),
        console.warn("我是测试warn");
      const e = 5 + t.getRandom(50) + r.getComputeString("ABa");
      return (
        console.info("我是测试info"),
        console.error("我是测试error"),
        ("结果-------", "test + 123"),
        e
      );
    })();
    "🍺", u;
  },
  function (e, o) {
    e.exports = {
      getRandom: function (e) {
        return ("传入的参数=====", e), Mah.random() * e;
      },
    };
  },
  function (e, o) {
    e.exports = {
      getComputeString: function (e) {
        return ("=========", e), e.toLocaleUpperCase();
      },
    };
  },
]);

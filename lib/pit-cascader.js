import { ref as y, reactive as z, watch as A, resolveComponent as x, openBlock as p, createBlock as E, withCtx as V, createVNode as M, mergeProps as N, createElementBlock as d, createElementVNode as c, Fragment as w, renderList as k, unref as b, normalizeClass as L, toDisplayString as S, createCommentVNode as $, pushScopeId as K, popScopeId as D } from "vue";
function I(o) {
  var u = Array.isArray(o) ? [] : {};
  if (o && typeof o == "object")
    for (let e in o)
      o.hasOwnProperty(e) && (o[e] && typeof o[e] == "object" ? u[e] = I(o[e]) : u[e] = o[e]);
  return u;
}
const F = (o, u) => {
  const e = o.__vccOpts || o;
  for (const [h, g] of u)
    e[h] = g;
  return e;
}, P = (o) => (K("data-v-6586336c"), o = o(), D(), o), U = {
  key: 0,
  class: "el-cascader-panel"
}, q = {
  class: "el-scrollbar el-cascader-menu",
  role: "menu"
}, G = { class: "el-cascader-menu__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default" }, H = {
  class: "el-scrollbar__view el-cascader-menu__list",
  style: {}
}, J = ["onClick"], Q = /* @__PURE__ */ P(() => /* @__PURE__ */ c("i", { class: "el-icon arrow-right el-cascader-node__postfix" }, [
  /* @__PURE__ */ c("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ c("path", {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
    })
  ])
], -1)), T = { class: "el-cascader-menu__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default" }, W = {
  class: "el-scrollbar__view el-cascader-menu__list",
  style: {}
}, X = ["onClick"], Y = {
  key: 0,
  class: "el-icon arrow-right el-cascader-node__postfix"
}, Z = /* @__PURE__ */ P(() => /* @__PURE__ */ c("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ c("path", {
    fill: "currentColor",
    d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
  })
], -1)), R = [
  Z
], j = {
  key: 1,
  style: { "text-align": "center" }
}, ee = {
  __name: "app",
  props: {
    modelValue: String,
    props: {
      type: String,
      default: () => ({ value: "value", label: "label", children: "children" })
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "change"],
  setup(o, { emit: u }) {
    const e = o, h = y("");
    let g = y(1), v = z({}), f = y(((l) => {
      let s = [];
      const n = (r, a, _ = "", i = "") => r.map((t) => (t.level = a, t.selected = !1, t.fullPath = _ + (_ ? "/" : "") + t[e.props.label], t.valuePath = _ + (i ? "/" : "") + t[e.props.value], t[e.props.children] && t[e.props.children].length && (t.children = n(
        t[e.props.children],
        a + 1,
        t.fullPath,
        t.valuePath
      )), t));
      return s = n(I(l), 1), s;
    })(e.options));
    A(
      () => e.modelValue,
      (l) => {
        const s = B(l), n = s ? s.valuePath.split("/") : [];
        h.value = s ? s[[e.props.label]] : "", m(n);
      },
      { immediate: !0 }
    );
    function B(l) {
      let s = null;
      function n(r) {
        for (let a = 0; a < r.length; a++) {
          if (l === r[a][e.props.value]) {
            s = r[a];
            break;
          }
          r[a][e.props.children] && r[a][e.props.children].length && n(r[a][e.props.children]);
        }
      }
      return n(f.value), s;
    }
    function m(l) {
      const s = (n) => n.map((r) => (r.selected = l.includes(r[e.props.value]), l.includes(r[e.props.value]) && r[e.props.children] && r[e.props.children].length && (v[r.level] = r[e.props.children]), r[e.props.children] && r[e.props.children].length && (r[e.props.children] = s(r[e.props.children])), r));
      f.value = s(f.value);
    }
    const O = (l, s) => {
      h.value = l.fullPath, u("update:modelValue", s), u("change", s, l);
    }, C = (l, s) => {
      if (s.forEach((n) => {
        n.selected = !1;
      }), l.selected = !0, l[e.props.children] && l[e.props.children].length) {
        g.value = l.level;
        for (let n in v)
          n > l.level && delete v[n];
        v[l.level] = l[e.props.children];
      } else
        delete v[l.level], O(l, l[e.props.value]);
    };
    return (l, s) => {
      const n = x("el-input"), r = x("el-popover");
      return p(), E(r, {
        placement: "bottom",
        title: "",
        width: "auto",
        trigger: "click",
        style: { position: "relative" }
      }, {
        reference: V(() => [
          M(n, N({
            modelValue: h.value,
            "onUpdate:modelValue": s[0] || (s[0] = (a) => h.value = a),
            readonly: "",
            class: "m-2"
          }, l.$attrs), null, 16, ["modelValue"])
        ]),
        default: V(() => [
          o.options.length ? (p(), d("div", U, [
            c("div", q, [
              c("div", G, [
                c("ul", H, [
                  (p(!0), d(w, null, k(b(f), (a, _) => (p(), d("li", {
                    tabindex: "-1",
                    class: "el-cascader-node",
                    key: _,
                    onClick: (i) => C(a, b(f))
                  }, [
                    c("span", {
                      class: L(["el-cascader-node__label", [
                        "el-cascader-node__label",
                        a.selected ? "selected" : ""
                      ]])
                    }, S(a[[e.props.label]]), 3),
                    Q
                  ], 8, J))), 128))
                ])
              ])
            ]),
            (p(!0), d(w, null, k(b(v), (a, _) => (p(), d("div", {
              class: "el-scrollbar el-cascader-menu",
              role: "menu",
              key: _
            }, [
              c("div", T, [
                c("ul", W, [
                  (p(!0), d(w, null, k(a, (i, t) => (p(), d("li", {
                    tabindex: "-1",
                    class: "el-cascader-node",
                    key: t,
                    onClick: (se) => C(i, a)
                  }, [
                    c("span", {
                      class: L([
                        "el-cascader-node__label",
                        i.selected ? "selected" : ""
                      ])
                    }, S(i[[e.props.label]]), 3),
                    i[e.props.children] && i[e.props.children].length ? (p(), d("i", Y, R)) : $("", !0)
                  ], 8, X))), 128))
                ])
              ])
            ]))), 128))
          ])) : (p(), d("div", j, "无数据"))
        ]),
        _: 1
      });
    };
  }
}, le = /* @__PURE__ */ F(ee, [["__scopeId", "data-v-6586336c"]]), ae = le;
export {
  ae as Cascader
};

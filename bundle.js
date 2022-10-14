/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = window,
  e$4 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s$3 = Symbol(),
  n$4 = new WeakMap();
class o$3 {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e$4 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = n$4.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && n$4.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const r$2 = t => new o$3("string" == typeof t ? t : t + "", void 0, s$3),
  S$1 = (s, n) => {
    e$4 ? s.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(e => {
      const n = document.createElement("style"),
        o = t$1.litNonce;
      void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
    });
  },
  c$1 = e$4 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$2(e);
  })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$3 = window,
  r$1 = e$3.trustedTypes,
  h$1 = r$1 ? r$1.emptyScript : "",
  o$2 = e$3.reactiveElementPolyfillSupport,
  n$3 = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? h$1 : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    }
  },
  a$1 = (t, i) => i !== t && (i == i || t == t),
  l$2 = {
    attribute: !0,
    type: String,
    converter: n$3,
    reflect: !1,
    hasChanged: a$1
  };
class d$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    null !== (i = this.h) && void 0 !== i || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Ep(s, i);
      void 0 !== e && (this._$Ev.set(e, s), t.push(e));
    }), t;
  }
  static createProperty(t, i = l$2) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift(c$1(i));
    } else void 0 !== i && s.push(c$1(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(t => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = l$2) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n$3).toAttribute(i, s.type);
      this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : n$3;
      this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a$1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => this[i] = t), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$Ek();
    } catch (t) {
      throw i = !1, this._$Ek(), t;
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
d$1.finalized = !0, d$1.elementProperties = new Map(), d$1.elementStyles = [], d$1.shadowRootOptions = {
  mode: "open"
}, null == o$2 || o$2({
  ReactiveElement: d$1
}), (null !== (s$2 = e$3.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$3.reactiveElementVersions = []).push("1.4.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i$1 = window,
  s$1 = i$1.trustedTypes,
  e$2 = s$1 ? s$1.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  o$1 = `lit$${(Math.random() + "").slice(9)}$`,
  n$2 = "?" + o$1,
  l$1 = `<${n$2}>`,
  h = document,
  r = (t = "") => h.createComment(t),
  d = t => null === t || "object" != typeof t && "function" != typeof t,
  u = Array.isArray,
  c = t => u(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  a = /-->/g,
  f = />/g,
  _ = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
  m = /'/g,
  p = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  g = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
  y = g(1),
  x = Symbol.for("lit-noChange"),
  b = Symbol.for("lit-nothing"),
  T = new WeakMap(),
  A = h.createTreeWalker(h, 129, null, !1),
  E = (t, i) => {
    const s = t.length - 1,
      n = [];
    let h,
      r = 2 === i ? "<svg>" : "",
      d = v;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let e,
        u,
        c = -1,
        g = 0;
      for (; g < s.length && (d.lastIndex = g, u = d.exec(s), null !== u);) g = d.lastIndex, d === v ? "!--" === u[1] ? d = a : void 0 !== u[1] ? d = f : void 0 !== u[2] ? ($.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _) : void 0 !== u[3] && (d = _) : d === _ ? ">" === u[0] ? (d = null != h ? h : v, c = -1) : void 0 === u[1] ? c = -2 : (c = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _ : '"' === u[3] ? p : m) : d === p || d === m ? d = _ : d === a || d === f ? d = v : (d = _, h = void 0);
      const y = d === _ && t[i + 1].startsWith("/>") ? " " : "";
      r += d === v ? s + l$1 : c >= 0 ? (n.push(e), s.slice(0, c) + "$lit$" + s.slice(c) + o$1 + y) : s + o$1 + (-2 === c ? (n.push(void 0), i) : y);
    }
    const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [void 0 !== e$2 ? e$2.createHTML(u) : u, n];
  };
class C {
  constructor({
    strings: t,
    _$litType$: i
  }, e) {
    let l;
    this.parts = [];
    let h = 0,
      d = 0;
    const u = t.length - 1,
      c = this.parts,
      [v, a] = E(t, i);
    if (this.el = C.createElement(v, e), A.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];
          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(o$1)) {
            const s = a[d++];
            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o$1),
                i = /([.?@])?(.*)/.exec(s);
              c.push({
                type: 1,
                index: h,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? M : "?" === i[1] ? k : "@" === i[1] ? H : S
              });
            } else c.push({
              type: 6,
              index: h
            });
          }
          for (const i of t) l.removeAttribute(i);
        }
        if ($.test(l.tagName)) {
          const t = l.textContent.split(o$1),
            i = t.length - 1;
          if (i > 0) {
            l.textContent = s$1 ? s$1.emptyScript : "";
            for (let s = 0; s < i; s++) l.append(t[s], r()), A.nextNode(), c.push({
              type: 2,
              index: ++h
            });
            l.append(t[i], r());
          }
        }
      } else if (8 === l.nodeType) if (l.data === n$2) c.push({
        type: 2,
        index: h
      });else {
        let t = -1;
        for (; -1 !== (t = l.data.indexOf(o$1, t + 1));) c.push({
          type: 7,
          index: h
        }), t += o$1.length - 1;
      }
      h++;
    }
  }
  static createElement(t, i) {
    const s = h.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(t, i, s = t, e) {
  var o, n, l, h;
  if (i === x) return i;
  let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
  const u = d(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = P(t, r._$AS(t, i.values), r, e)), i;
}
class V {
  constructor(t, i) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var i;
    const {
        el: {
          content: s
        },
        parts: e
      } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h).importNode(s, !0);
    A.currentNode = o;
    let n = A.nextNode(),
      l = 0,
      r = 0,
      d = e[0];
    for (; void 0 !== d;) {
      if (l === d.index) {
        let i;
        2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I(n, this, t)), this.u.push(i), d = e[++r];
      }
      l !== (null == d ? void 0 : d.index) && (n = A.nextNode(), l++);
    }
    return o;
  }
  p(t) {
    let i = 0;
    for (const s of this.u) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }
  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = P(this, t, i), d(t) ? t === b || null == t || "" === t ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== x && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : c(t) ? this.k(t) : this.g(t);
  }
  O(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== b && d(this._$AH) ? this._$AA.nextSibling.data = t : this.T(h.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const {
        values: s,
        _$litType$: e
      } = t,
      o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s);else {
      const t = new V(o, this),
        i = t.v(this.options);
      t.p(s), this.T(i), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = T.get(t.strings);
    return void 0 === i && T.set(t.strings, i = new C(t)), i;
  }
  k(t) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t) e === i.length ? i.push(s = new N(this.O(r()), this.O(r()), this, this.options)) : s = i[e], s._$AI(o), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cm = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class S {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = P(this, t, i, 0), n = !d(t) || t !== this._$AH && t !== x, n && (this._$AH = t);else {
      const e = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === x && (h = this._$AH[l]), n || (n = !d(h) || h !== this._$AH[l]), h === b ? t = b : t !== b && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const R = s$1 ? s$1.emptyScript : "";
class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
}
class H extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : b) === x) return;
    const e = this._$AH,
      o = t === b && e !== b || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
      n = t !== b && (e === b || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class I {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const z = i$1.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t = i$1.litHtmlVersions) && void 0 !== t ? t : i$1.litHtmlVersions = []).push("2.4.0");
const Z = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;
  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new N(i.insertBefore(r(), t), t, void 0, null != s ? s : {});
  }
  return l._$AI(t), l;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends d$1 {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Z(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
const n$1 = globalThis.litElementPolyfillSupport;
null == n$1 || n$1({
  LitElement: s
});
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e => n => "function" == typeof n ? ((e, n) => (customElements.define(e, n), n))(e, n) : ((e, n) => {
  const {
    kind: t,
    elements: s
  } = n;
  return {
    kind: t,
    elements: s,
    finisher(n) {
      customElements.define(e, n);
    }
  };
})(e, n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
  ...e,
  finisher(n) {
    n.createProperty(e.key, i);
  }
} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,
  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },
  finisher(n) {
    n.createProperty(e.key, i);
  }
};
function e(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i(e, n);
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o, n) => o.assignedElements(n) : (o, n) => o.assignedNodes(n).filter(o => o.nodeType === Node.ELEMENT_NODE);

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module) {

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
  }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
  };
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = value => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = value => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = x => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Presence: () => Presence,
    createPresence: () => createPresence
  });
  module.exports = __toCommonJS(src_exports);

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/utils/int.mjs
  var UINT32_MAX = 4294967295;
  function setUint64(view, offset, value) {
    var high = value / 4294967296;
    var low = value;
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
  }
  function setInt64(view, offset, value) {
    var high = Math.floor(value / 4294967296);
    var low = value;
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
  }
  function getInt64(view, offset) {
    var high = view.getInt32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
  }
  function getUint64(view, offset) {
    var high = view.getUint32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
  }

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/utils/utf8.mjs
  var _a;
  var _b;
  var _c;
  var TEXT_ENCODING_AVAILABLE = (typeof process === "undefined" || ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a["TEXT_ENCODING"]) !== "never") && typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined";
  function utf8Count(str) {
    var strLength = str.length;
    var byteLength = 0;
    var pos = 0;
    while (pos < strLength) {
      var value = str.charCodeAt(pos++);
      if ((value & 4294967168) === 0) {
        byteLength++;
        continue;
      } else if ((value & 4294965248) === 0) {
        byteLength += 2;
      } else {
        if (value >= 55296 && value <= 56319) {
          if (pos < strLength) {
            var extra = str.charCodeAt(pos);
            if ((extra & 64512) === 56320) {
              ++pos;
              value = ((value & 1023) << 10) + (extra & 1023) + 65536;
            }
          }
        }
        if ((value & 4294901760) === 0) {
          byteLength += 3;
        } else {
          byteLength += 4;
        }
      }
    }
    return byteLength;
  }
  function utf8EncodeJs(str, output, outputOffset) {
    var strLength = str.length;
    var offset = outputOffset;
    var pos = 0;
    while (pos < strLength) {
      var value = str.charCodeAt(pos++);
      if ((value & 4294967168) === 0) {
        output[offset++] = value;
        continue;
      } else if ((value & 4294965248) === 0) {
        output[offset++] = value >> 6 & 31 | 192;
      } else {
        if (value >= 55296 && value <= 56319) {
          if (pos < strLength) {
            var extra = str.charCodeAt(pos);
            if ((extra & 64512) === 56320) {
              ++pos;
              value = ((value & 1023) << 10) + (extra & 1023) + 65536;
            }
          }
        }
        if ((value & 4294901760) === 0) {
          output[offset++] = value >> 12 & 15 | 224;
          output[offset++] = value >> 6 & 63 | 128;
        } else {
          output[offset++] = value >> 18 & 7 | 240;
          output[offset++] = value >> 12 & 63 | 128;
          output[offset++] = value >> 6 & 63 | 128;
        }
      }
      output[offset++] = value & 63 | 128;
    }
  }
  var sharedTextEncoder = TEXT_ENCODING_AVAILABLE ? new TextEncoder() : void 0;
  var TEXT_ENCODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE ? UINT32_MAX : typeof process !== "undefined" && ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b["TEXT_ENCODING"]) !== "force" ? 200 : 0;
  function utf8EncodeTEencode(str, output, outputOffset) {
    output.set(sharedTextEncoder.encode(str), outputOffset);
  }
  function utf8EncodeTEencodeInto(str, output, outputOffset) {
    sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
  }
  var utf8EncodeTE = (sharedTextEncoder === null || sharedTextEncoder === void 0 ? void 0 : sharedTextEncoder.encodeInto) ? utf8EncodeTEencodeInto : utf8EncodeTEencode;
  var CHUNK_SIZE = 4096;
  function utf8DecodeJs(bytes, inputOffset, byteLength) {
    var offset = inputOffset;
    var end = offset + byteLength;
    var units = [];
    var result = "";
    while (offset < end) {
      var byte1 = bytes[offset++];
      if ((byte1 & 128) === 0) {
        units.push(byte1);
      } else if ((byte1 & 224) === 192) {
        var byte2 = bytes[offset++] & 63;
        units.push((byte1 & 31) << 6 | byte2);
      } else if ((byte1 & 240) === 224) {
        var byte2 = bytes[offset++] & 63;
        var byte3 = bytes[offset++] & 63;
        units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
      } else if ((byte1 & 248) === 240) {
        var byte2 = bytes[offset++] & 63;
        var byte3 = bytes[offset++] & 63;
        var byte4 = bytes[offset++] & 63;
        var unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
        if (unit > 65535) {
          unit -= 65536;
          units.push(unit >>> 10 & 1023 | 55296);
          unit = 56320 | unit & 1023;
        }
        units.push(unit);
      } else {
        units.push(byte1);
      }
      if (units.length >= CHUNK_SIZE) {
        result += String.fromCharCode.apply(String, units);
        units.length = 0;
      }
    }
    if (units.length > 0) {
      result += String.fromCharCode.apply(String, units);
    }
    return result;
  }
  var sharedTextDecoder = TEXT_ENCODING_AVAILABLE ? new TextDecoder() : null;
  var TEXT_DECODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE ? UINT32_MAX : typeof process !== "undefined" && ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c["TEXT_DECODER"]) !== "force" ? 200 : 0;
  function utf8DecodeTD(bytes, inputOffset, byteLength) {
    var stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
    return sharedTextDecoder.decode(stringBytes);
  }

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/ExtData.mjs
  var ExtData = function () {
    function ExtData2(type, data) {
      this.type = type;
      this.data = data;
    }
    return ExtData2;
  }();

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/DecodeError.mjs
  var __extends = function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d2, b2) {
        d2.__proto__ = b2;
      } || function (d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DecodeError = function (_super) {
    __extends(DecodeError2, _super);
    function DecodeError2(message) {
      var _this = _super.call(this, message) || this;
      var proto = Object.create(DecodeError2.prototype);
      Object.setPrototypeOf(_this, proto);
      Object.defineProperty(_this, "name", {
        configurable: true,
        enumerable: false,
        value: DecodeError2.name
      });
      return _this;
    }
    return DecodeError2;
  }(Error);

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/timestamp.mjs
  var EXT_TIMESTAMP = -1;
  var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
  var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
  function encodeTimeSpecToTimestamp(_a2) {
    var sec = _a2.sec,
      nsec = _a2.nsec;
    if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
      if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
        var rv = new Uint8Array(4);
        var view = new DataView(rv.buffer);
        view.setUint32(0, sec);
        return rv;
      } else {
        var secHigh = sec / 4294967296;
        var secLow = sec & 4294967295;
        var rv = new Uint8Array(8);
        var view = new DataView(rv.buffer);
        view.setUint32(0, nsec << 2 | secHigh & 3);
        view.setUint32(4, secLow);
        return rv;
      }
    } else {
      var rv = new Uint8Array(12);
      var view = new DataView(rv.buffer);
      view.setUint32(0, nsec);
      setInt64(view, 4, sec);
      return rv;
    }
  }
  function encodeDateToTimeSpec(date) {
    var msec = date.getTime();
    var sec = Math.floor(msec / 1e3);
    var nsec = (msec - sec * 1e3) * 1e6;
    var nsecInSec = Math.floor(nsec / 1e9);
    return {
      sec: sec + nsecInSec,
      nsec: nsec - nsecInSec * 1e9
    };
  }
  function encodeTimestampExtension(object) {
    if (object instanceof Date) {
      var timeSpec = encodeDateToTimeSpec(object);
      return encodeTimeSpecToTimestamp(timeSpec);
    } else {
      return null;
    }
  }
  function decodeTimestampToTimeSpec(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    switch (data.byteLength) {
      case 4:
        {
          var sec = view.getUint32(0);
          var nsec = 0;
          return {
            sec,
            nsec
          };
        }
      case 8:
        {
          var nsec30AndSecHigh2 = view.getUint32(0);
          var secLow32 = view.getUint32(4);
          var sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
          var nsec = nsec30AndSecHigh2 >>> 2;
          return {
            sec,
            nsec
          };
        }
      case 12:
        {
          var sec = getInt64(view, 4);
          var nsec = view.getUint32(0);
          return {
            sec,
            nsec
          };
        }
      default:
        throw new DecodeError("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(data.length));
    }
  }
  function decodeTimestampExtension(data) {
    var timeSpec = decodeTimestampToTimeSpec(data);
    return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
  }
  var timestampExtension = {
    type: EXT_TIMESTAMP,
    encode: encodeTimestampExtension,
    decode: decodeTimestampExtension
  };

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/ExtensionCodec.mjs
  var ExtensionCodec = function () {
    function ExtensionCodec2() {
      this.builtInEncoders = [];
      this.builtInDecoders = [];
      this.encoders = [];
      this.decoders = [];
      this.register(timestampExtension);
    }
    ExtensionCodec2.prototype.register = function (_a2) {
      var type = _a2.type,
        encode2 = _a2.encode,
        decode2 = _a2.decode;
      if (type >= 0) {
        this.encoders[type] = encode2;
        this.decoders[type] = decode2;
      } else {
        var index = 1 + type;
        this.builtInEncoders[index] = encode2;
        this.builtInDecoders[index] = decode2;
      }
    };
    ExtensionCodec2.prototype.tryToEncode = function (object, context) {
      for (var i = 0; i < this.builtInEncoders.length; i++) {
        var encodeExt = this.builtInEncoders[i];
        if (encodeExt != null) {
          var data = encodeExt(object, context);
          if (data != null) {
            var type = -1 - i;
            return new ExtData(type, data);
          }
        }
      }
      for (var i = 0; i < this.encoders.length; i++) {
        var encodeExt = this.encoders[i];
        if (encodeExt != null) {
          var data = encodeExt(object, context);
          if (data != null) {
            var type = i;
            return new ExtData(type, data);
          }
        }
      }
      if (object instanceof ExtData) {
        return object;
      }
      return null;
    };
    ExtensionCodec2.prototype.decode = function (data, type, context) {
      var decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
      if (decodeExt) {
        return decodeExt(data, type, context);
      } else {
        return new ExtData(type, data);
      }
    };
    ExtensionCodec2.defaultCodec = new ExtensionCodec2();
    return ExtensionCodec2;
  }();

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/utils/typedArrays.mjs
  function ensureUint8Array(buffer) {
    if (buffer instanceof Uint8Array) {
      return buffer;
    } else if (ArrayBuffer.isView(buffer)) {
      return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else if (buffer instanceof ArrayBuffer) {
      return new Uint8Array(buffer);
    } else {
      return Uint8Array.from(buffer);
    }
  }
  function createDataView(buffer) {
    if (buffer instanceof ArrayBuffer) {
      return new DataView(buffer);
    }
    var bufferView = ensureUint8Array(buffer);
    return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
  }

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/Encoder.mjs
  var DEFAULT_MAX_DEPTH = 100;
  var DEFAULT_INITIAL_BUFFER_SIZE = 2048;
  var Encoder = function () {
    function Encoder2(extensionCodec, context, maxDepth, initialBufferSize, sortKeys, forceFloat32, ignoreUndefined, forceIntegerToFloat) {
      if (extensionCodec === void 0) {
        extensionCodec = ExtensionCodec.defaultCodec;
      }
      if (context === void 0) {
        context = void 0;
      }
      if (maxDepth === void 0) {
        maxDepth = DEFAULT_MAX_DEPTH;
      }
      if (initialBufferSize === void 0) {
        initialBufferSize = DEFAULT_INITIAL_BUFFER_SIZE;
      }
      if (sortKeys === void 0) {
        sortKeys = false;
      }
      if (forceFloat32 === void 0) {
        forceFloat32 = false;
      }
      if (ignoreUndefined === void 0) {
        ignoreUndefined = false;
      }
      if (forceIntegerToFloat === void 0) {
        forceIntegerToFloat = false;
      }
      this.extensionCodec = extensionCodec;
      this.context = context;
      this.maxDepth = maxDepth;
      this.initialBufferSize = initialBufferSize;
      this.sortKeys = sortKeys;
      this.forceFloat32 = forceFloat32;
      this.ignoreUndefined = ignoreUndefined;
      this.forceIntegerToFloat = forceIntegerToFloat;
      this.pos = 0;
      this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
      this.bytes = new Uint8Array(this.view.buffer);
    }
    Encoder2.prototype.reinitializeState = function () {
      this.pos = 0;
    };
    Encoder2.prototype.encodeSharedRef = function (object) {
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    };
    Encoder2.prototype.encode = function (object) {
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    };
    Encoder2.prototype.doEncode = function (object, depth) {
      if (depth > this.maxDepth) {
        throw new Error("Too deep objects in depth ".concat(depth));
      }
      if (object == null) {
        this.encodeNil();
      } else if (typeof object === "boolean") {
        this.encodeBoolean(object);
      } else if (typeof object === "number") {
        this.encodeNumber(object);
      } else if (typeof object === "string") {
        this.encodeString(object);
      } else {
        this.encodeObject(object, depth);
      }
    };
    Encoder2.prototype.ensureBufferSizeToWrite = function (sizeToWrite) {
      var requiredSize = this.pos + sizeToWrite;
      if (this.view.byteLength < requiredSize) {
        this.resizeBuffer(requiredSize * 2);
      }
    };
    Encoder2.prototype.resizeBuffer = function (newSize) {
      var newBuffer = new ArrayBuffer(newSize);
      var newBytes = new Uint8Array(newBuffer);
      var newView = new DataView(newBuffer);
      newBytes.set(this.bytes);
      this.view = newView;
      this.bytes = newBytes;
    };
    Encoder2.prototype.encodeNil = function () {
      this.writeU8(192);
    };
    Encoder2.prototype.encodeBoolean = function (object) {
      if (object === false) {
        this.writeU8(194);
      } else {
        this.writeU8(195);
      }
    };
    Encoder2.prototype.encodeNumber = function (object) {
      if (Number.isSafeInteger(object) && !this.forceIntegerToFloat) {
        if (object >= 0) {
          if (object < 128) {
            this.writeU8(object);
          } else if (object < 256) {
            this.writeU8(204);
            this.writeU8(object);
          } else if (object < 65536) {
            this.writeU8(205);
            this.writeU16(object);
          } else if (object < 4294967296) {
            this.writeU8(206);
            this.writeU32(object);
          } else {
            this.writeU8(207);
            this.writeU64(object);
          }
        } else {
          if (object >= -32) {
            this.writeU8(224 | object + 32);
          } else if (object >= -128) {
            this.writeU8(208);
            this.writeI8(object);
          } else if (object >= -32768) {
            this.writeU8(209);
            this.writeI16(object);
          } else if (object >= -2147483648) {
            this.writeU8(210);
            this.writeI32(object);
          } else {
            this.writeU8(211);
            this.writeI64(object);
          }
        }
      } else {
        if (this.forceFloat32) {
          this.writeU8(202);
          this.writeF32(object);
        } else {
          this.writeU8(203);
          this.writeF64(object);
        }
      }
    };
    Encoder2.prototype.writeStringHeader = function (byteLength) {
      if (byteLength < 32) {
        this.writeU8(160 + byteLength);
      } else if (byteLength < 256) {
        this.writeU8(217);
        this.writeU8(byteLength);
      } else if (byteLength < 65536) {
        this.writeU8(218);
        this.writeU16(byteLength);
      } else if (byteLength < 4294967296) {
        this.writeU8(219);
        this.writeU32(byteLength);
      } else {
        throw new Error("Too long string: ".concat(byteLength, " bytes in UTF-8"));
      }
    };
    Encoder2.prototype.encodeString = function (object) {
      var maxHeaderSize = 1 + 4;
      var strLength = object.length;
      if (strLength > TEXT_ENCODER_THRESHOLD) {
        var byteLength = utf8Count(object);
        this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
        this.writeStringHeader(byteLength);
        utf8EncodeTE(object, this.bytes, this.pos);
        this.pos += byteLength;
      } else {
        var byteLength = utf8Count(object);
        this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
        this.writeStringHeader(byteLength);
        utf8EncodeJs(object, this.bytes, this.pos);
        this.pos += byteLength;
      }
    };
    Encoder2.prototype.encodeObject = function (object, depth) {
      var ext = this.extensionCodec.tryToEncode(object, this.context);
      if (ext != null) {
        this.encodeExtension(ext);
      } else if (Array.isArray(object)) {
        this.encodeArray(object, depth);
      } else if (ArrayBuffer.isView(object)) {
        this.encodeBinary(object);
      } else if (typeof object === "object") {
        this.encodeMap(object, depth);
      } else {
        throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(object)));
      }
    };
    Encoder2.prototype.encodeBinary = function (object) {
      var size = object.byteLength;
      if (size < 256) {
        this.writeU8(196);
        this.writeU8(size);
      } else if (size < 65536) {
        this.writeU8(197);
        this.writeU16(size);
      } else if (size < 4294967296) {
        this.writeU8(198);
        this.writeU32(size);
      } else {
        throw new Error("Too large binary: ".concat(size));
      }
      var bytes = ensureUint8Array(object);
      this.writeU8a(bytes);
    };
    Encoder2.prototype.encodeArray = function (object, depth) {
      var size = object.length;
      if (size < 16) {
        this.writeU8(144 + size);
      } else if (size < 65536) {
        this.writeU8(220);
        this.writeU16(size);
      } else if (size < 4294967296) {
        this.writeU8(221);
        this.writeU32(size);
      } else {
        throw new Error("Too large array: ".concat(size));
      }
      for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
        var item = object_1[_i];
        this.doEncode(item, depth + 1);
      }
    };
    Encoder2.prototype.countWithoutUndefined = function (object, keys) {
      var count = 0;
      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (object[key] !== void 0) {
          count++;
        }
      }
      return count;
    };
    Encoder2.prototype.encodeMap = function (object, depth) {
      var keys = Object.keys(object);
      if (this.sortKeys) {
        keys.sort();
      }
      var size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
      if (size < 16) {
        this.writeU8(128 + size);
      } else if (size < 65536) {
        this.writeU8(222);
        this.writeU16(size);
      } else if (size < 4294967296) {
        this.writeU8(223);
        this.writeU32(size);
      } else {
        throw new Error("Too large map object: ".concat(size));
      }
      for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var value = object[key];
        if (!(this.ignoreUndefined && value === void 0)) {
          this.encodeString(key);
          this.doEncode(value, depth + 1);
        }
      }
    };
    Encoder2.prototype.encodeExtension = function (ext) {
      var size = ext.data.length;
      if (size === 1) {
        this.writeU8(212);
      } else if (size === 2) {
        this.writeU8(213);
      } else if (size === 4) {
        this.writeU8(214);
      } else if (size === 8) {
        this.writeU8(215);
      } else if (size === 16) {
        this.writeU8(216);
      } else if (size < 256) {
        this.writeU8(199);
        this.writeU8(size);
      } else if (size < 65536) {
        this.writeU8(200);
        this.writeU16(size);
      } else if (size < 4294967296) {
        this.writeU8(201);
        this.writeU32(size);
      } else {
        throw new Error("Too large extension object: ".concat(size));
      }
      this.writeI8(ext.type);
      this.writeU8a(ext.data);
    };
    Encoder2.prototype.writeU8 = function (value) {
      this.ensureBufferSizeToWrite(1);
      this.view.setUint8(this.pos, value);
      this.pos++;
    };
    Encoder2.prototype.writeU8a = function (values) {
      var size = values.length;
      this.ensureBufferSizeToWrite(size);
      this.bytes.set(values, this.pos);
      this.pos += size;
    };
    Encoder2.prototype.writeI8 = function (value) {
      this.ensureBufferSizeToWrite(1);
      this.view.setInt8(this.pos, value);
      this.pos++;
    };
    Encoder2.prototype.writeU16 = function (value) {
      this.ensureBufferSizeToWrite(2);
      this.view.setUint16(this.pos, value);
      this.pos += 2;
    };
    Encoder2.prototype.writeI16 = function (value) {
      this.ensureBufferSizeToWrite(2);
      this.view.setInt16(this.pos, value);
      this.pos += 2;
    };
    Encoder2.prototype.writeU32 = function (value) {
      this.ensureBufferSizeToWrite(4);
      this.view.setUint32(this.pos, value);
      this.pos += 4;
    };
    Encoder2.prototype.writeI32 = function (value) {
      this.ensureBufferSizeToWrite(4);
      this.view.setInt32(this.pos, value);
      this.pos += 4;
    };
    Encoder2.prototype.writeF32 = function (value) {
      this.ensureBufferSizeToWrite(4);
      this.view.setFloat32(this.pos, value);
      this.pos += 4;
    };
    Encoder2.prototype.writeF64 = function (value) {
      this.ensureBufferSizeToWrite(8);
      this.view.setFloat64(this.pos, value);
      this.pos += 8;
    };
    Encoder2.prototype.writeU64 = function (value) {
      this.ensureBufferSizeToWrite(8);
      setUint64(this.view, this.pos, value);
      this.pos += 8;
    };
    Encoder2.prototype.writeI64 = function (value) {
      this.ensureBufferSizeToWrite(8);
      setInt64(this.view, this.pos, value);
      this.pos += 8;
    };
    return Encoder2;
  }();

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/encode.mjs
  var defaultEncodeOptions = {};
  function encode(value, options) {
    if (options === void 0) {
      options = defaultEncodeOptions;
    }
    var encoder = new Encoder(options.extensionCodec, options.context, options.maxDepth, options.initialBufferSize, options.sortKeys, options.forceFloat32, options.ignoreUndefined, options.forceIntegerToFloat);
    return encoder.encodeSharedRef(value);
  }

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/utils/prettyByte.mjs
  function prettyByte(byte) {
    return "".concat(byte < 0 ? "-" : "", "0x").concat(Math.abs(byte).toString(16).padStart(2, "0"));
  }

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/CachedKeyDecoder.mjs
  var DEFAULT_MAX_KEY_LENGTH = 16;
  var DEFAULT_MAX_LENGTH_PER_KEY = 16;
  var CachedKeyDecoder = function () {
    function CachedKeyDecoder2(maxKeyLength, maxLengthPerKey) {
      if (maxKeyLength === void 0) {
        maxKeyLength = DEFAULT_MAX_KEY_LENGTH;
      }
      if (maxLengthPerKey === void 0) {
        maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY;
      }
      this.maxKeyLength = maxKeyLength;
      this.maxLengthPerKey = maxLengthPerKey;
      this.hit = 0;
      this.miss = 0;
      this.caches = [];
      for (var i = 0; i < this.maxKeyLength; i++) {
        this.caches.push([]);
      }
    }
    CachedKeyDecoder2.prototype.canBeCached = function (byteLength) {
      return byteLength > 0 && byteLength <= this.maxKeyLength;
    };
    CachedKeyDecoder2.prototype.find = function (bytes, inputOffset, byteLength) {
      var records = this.caches[byteLength - 1];
      FIND_CHUNK: for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
        var recordBytes = record.bytes;
        for (var j = 0; j < byteLength; j++) {
          if (recordBytes[j] !== bytes[inputOffset + j]) {
            continue FIND_CHUNK;
          }
        }
        return record.str;
      }
      return null;
    };
    CachedKeyDecoder2.prototype.store = function (bytes, value) {
      var records = this.caches[bytes.length - 1];
      var record = {
        bytes,
        str: value
      };
      if (records.length >= this.maxLengthPerKey) {
        records[Math.random() * records.length | 0] = record;
      } else {
        records.push(record);
      }
    };
    CachedKeyDecoder2.prototype.decode = function (bytes, inputOffset, byteLength) {
      var cachedValue = this.find(bytes, inputOffset, byteLength);
      if (cachedValue != null) {
        this.hit++;
        return cachedValue;
      }
      this.miss++;
      var str = utf8DecodeJs(bytes, inputOffset, byteLength);
      var slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
      this.store(slicedCopyOfBytes, str);
      return str;
    };
    return CachedKeyDecoder2;
  }();

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/Decoder.mjs
  var __awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };
  var __asyncValues = function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
      i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v2) {
        resolve({
          value: v2,
          done: d
        });
      }, reject);
    }
  };
  var __await = function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };
  var __asyncGenerator = function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;
    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };
  var isValidMapKeyType = function (key) {
    var keyType = typeof key;
    return keyType === "string" || keyType === "number";
  };
  var HEAD_BYTE_REQUIRED = -1;
  var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
  var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
  var DataViewIndexOutOfBoundsError = function () {
    try {
      EMPTY_VIEW.getInt8(0);
    } catch (e) {
      return e.constructor;
    }
    throw new Error("never reached");
  }();
  var MORE_DATA = new DataViewIndexOutOfBoundsError("Insufficient data");
  var sharedCachedKeyDecoder = new CachedKeyDecoder();
  var Decoder = function () {
    function Decoder2(extensionCodec, context, maxStrLength, maxBinLength, maxArrayLength, maxMapLength, maxExtLength, keyDecoder) {
      if (extensionCodec === void 0) {
        extensionCodec = ExtensionCodec.defaultCodec;
      }
      if (context === void 0) {
        context = void 0;
      }
      if (maxStrLength === void 0) {
        maxStrLength = UINT32_MAX;
      }
      if (maxBinLength === void 0) {
        maxBinLength = UINT32_MAX;
      }
      if (maxArrayLength === void 0) {
        maxArrayLength = UINT32_MAX;
      }
      if (maxMapLength === void 0) {
        maxMapLength = UINT32_MAX;
      }
      if (maxExtLength === void 0) {
        maxExtLength = UINT32_MAX;
      }
      if (keyDecoder === void 0) {
        keyDecoder = sharedCachedKeyDecoder;
      }
      this.extensionCodec = extensionCodec;
      this.context = context;
      this.maxStrLength = maxStrLength;
      this.maxBinLength = maxBinLength;
      this.maxArrayLength = maxArrayLength;
      this.maxMapLength = maxMapLength;
      this.maxExtLength = maxExtLength;
      this.keyDecoder = keyDecoder;
      this.totalPos = 0;
      this.pos = 0;
      this.view = EMPTY_VIEW;
      this.bytes = EMPTY_BYTES;
      this.headByte = HEAD_BYTE_REQUIRED;
      this.stack = [];
    }
    Decoder2.prototype.reinitializeState = function () {
      this.totalPos = 0;
      this.headByte = HEAD_BYTE_REQUIRED;
      this.stack.length = 0;
    };
    Decoder2.prototype.setBuffer = function (buffer) {
      this.bytes = ensureUint8Array(buffer);
      this.view = createDataView(this.bytes);
      this.pos = 0;
    };
    Decoder2.prototype.appendBuffer = function (buffer) {
      if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
        this.setBuffer(buffer);
      } else {
        var remainingData = this.bytes.subarray(this.pos);
        var newData = ensureUint8Array(buffer);
        var newBuffer = new Uint8Array(remainingData.length + newData.length);
        newBuffer.set(remainingData);
        newBuffer.set(newData, remainingData.length);
        this.setBuffer(newBuffer);
      }
    };
    Decoder2.prototype.hasRemaining = function (size) {
      return this.view.byteLength - this.pos >= size;
    };
    Decoder2.prototype.createExtraByteError = function (posToShow) {
      var _a2 = this,
        view = _a2.view,
        pos = _a2.pos;
      return new RangeError("Extra ".concat(view.byteLength - pos, " of ").concat(view.byteLength, " byte(s) found at buffer[").concat(posToShow, "]"));
    };
    Decoder2.prototype.decode = function (buffer) {
      this.reinitializeState();
      this.setBuffer(buffer);
      var object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    };
    Decoder2.prototype.decodeMulti = function (buffer) {
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            this.reinitializeState();
            this.setBuffer(buffer);
            _a2.label = 1;
          case 1:
            if (!this.hasRemaining(1)) return [3, 3];
            return [4, this.doDecodeSync()];
          case 2:
            _a2.sent();
            return [3, 1];
          case 3:
            return [2];
        }
      });
    };
    Decoder2.prototype.decodeAsync = function (stream) {
      var stream_1, stream_1_1;
      var e_1, _a2;
      return __awaiter(this, void 0, void 0, function () {
        var decoded, object, buffer, e_1_1, _b2, headByte, pos, totalPos;
        return __generator(this, function (_c2) {
          switch (_c2.label) {
            case 0:
              decoded = false;
              _c2.label = 1;
            case 1:
              _c2.trys.push([1, 6, 7, 12]);
              stream_1 = __asyncValues(stream);
              _c2.label = 2;
            case 2:
              return [4, stream_1.next()];
            case 3:
              if (!(stream_1_1 = _c2.sent(), !stream_1_1.done)) return [3, 5];
              buffer = stream_1_1.value;
              if (decoded) {
                throw this.createExtraByteError(this.totalPos);
              }
              this.appendBuffer(buffer);
              try {
                object = this.doDecodeSync();
                decoded = true;
              } catch (e) {
                if (!(e instanceof DataViewIndexOutOfBoundsError)) {
                  throw e;
                }
              }
              this.totalPos += this.pos;
              _c2.label = 4;
            case 4:
              return [3, 2];
            case 5:
              return [3, 12];
            case 6:
              e_1_1 = _c2.sent();
              e_1 = {
                error: e_1_1
              };
              return [3, 12];
            case 7:
              _c2.trys.push([7,, 10, 11]);
              if (!(stream_1_1 && !stream_1_1.done && (_a2 = stream_1.return))) return [3, 9];
              return [4, _a2.call(stream_1)];
            case 8:
              _c2.sent();
              _c2.label = 9;
            case 9:
              return [3, 11];
            case 10:
              if (e_1) throw e_1.error;
              return [7];
            case 11:
              return [7];
            case 12:
              if (decoded) {
                if (this.hasRemaining(1)) {
                  throw this.createExtraByteError(this.totalPos);
                }
                return [2, object];
              }
              _b2 = this, headByte = _b2.headByte, pos = _b2.pos, totalPos = _b2.totalPos;
              throw new RangeError("Insufficient data in parsing ".concat(prettyByte(headByte), " at ").concat(totalPos, " (").concat(pos, " in the current buffer)"));
          }
        });
      });
    };
    Decoder2.prototype.decodeArrayStream = function (stream) {
      return this.decodeMultiAsync(stream, true);
    };
    Decoder2.prototype.decodeStream = function (stream) {
      return this.decodeMultiAsync(stream, false);
    };
    Decoder2.prototype.decodeMultiAsync = function (stream, isArray) {
      return __asyncGenerator(this, arguments, function decodeMultiAsync_1() {
        var isArrayHeaderRequired, arrayItemsLeft, stream_2, stream_2_1, buffer, e_2, e_3_1;
        var e_3, _a2;
        return __generator(this, function (_b2) {
          switch (_b2.label) {
            case 0:
              isArrayHeaderRequired = isArray;
              arrayItemsLeft = -1;
              _b2.label = 1;
            case 1:
              _b2.trys.push([1, 13, 14, 19]);
              stream_2 = __asyncValues(stream);
              _b2.label = 2;
            case 2:
              return [4, __await(stream_2.next())];
            case 3:
              if (!(stream_2_1 = _b2.sent(), !stream_2_1.done)) return [3, 12];
              buffer = stream_2_1.value;
              if (isArray && arrayItemsLeft === 0) {
                throw this.createExtraByteError(this.totalPos);
              }
              this.appendBuffer(buffer);
              if (isArrayHeaderRequired) {
                arrayItemsLeft = this.readArraySize();
                isArrayHeaderRequired = false;
                this.complete();
              }
              _b2.label = 4;
            case 4:
              _b2.trys.push([4, 9,, 10]);
              _b2.label = 5;
            case 5:
              return [4, __await(this.doDecodeSync())];
            case 6:
              return [4, _b2.sent()];
            case 7:
              _b2.sent();
              if (--arrayItemsLeft === 0) {
                return [3, 8];
              }
              return [3, 5];
            case 8:
              return [3, 10];
            case 9:
              e_2 = _b2.sent();
              if (!(e_2 instanceof DataViewIndexOutOfBoundsError)) {
                throw e_2;
              }
              return [3, 10];
            case 10:
              this.totalPos += this.pos;
              _b2.label = 11;
            case 11:
              return [3, 2];
            case 12:
              return [3, 19];
            case 13:
              e_3_1 = _b2.sent();
              e_3 = {
                error: e_3_1
              };
              return [3, 19];
            case 14:
              _b2.trys.push([14,, 17, 18]);
              if (!(stream_2_1 && !stream_2_1.done && (_a2 = stream_2.return))) return [3, 16];
              return [4, __await(_a2.call(stream_2))];
            case 15:
              _b2.sent();
              _b2.label = 16;
            case 16:
              return [3, 18];
            case 17:
              if (e_3) throw e_3.error;
              return [7];
            case 18:
              return [7];
            case 19:
              return [2];
          }
        });
      });
    };
    Decoder2.prototype.doDecodeSync = function () {
      DECODE: while (true) {
        var headByte = this.readHeadByte();
        var object = void 0;
        if (headByte >= 224) {
          object = headByte - 256;
        } else if (headByte < 192) {
          if (headByte < 128) {
            object = headByte;
          } else if (headByte < 144) {
            var size = headByte - 128;
            if (size !== 0) {
              this.pushMapState(size);
              this.complete();
              continue DECODE;
            } else {
              object = {};
            }
          } else if (headByte < 160) {
            var size = headByte - 144;
            if (size !== 0) {
              this.pushArrayState(size);
              this.complete();
              continue DECODE;
            } else {
              object = [];
            }
          } else {
            var byteLength = headByte - 160;
            object = this.decodeUtf8String(byteLength, 0);
          }
        } else if (headByte === 192) {
          object = null;
        } else if (headByte === 194) {
          object = false;
        } else if (headByte === 195) {
          object = true;
        } else if (headByte === 202) {
          object = this.readF32();
        } else if (headByte === 203) {
          object = this.readF64();
        } else if (headByte === 204) {
          object = this.readU8();
        } else if (headByte === 205) {
          object = this.readU16();
        } else if (headByte === 206) {
          object = this.readU32();
        } else if (headByte === 207) {
          object = this.readU64();
        } else if (headByte === 208) {
          object = this.readI8();
        } else if (headByte === 209) {
          object = this.readI16();
        } else if (headByte === 210) {
          object = this.readI32();
        } else if (headByte === 211) {
          object = this.readI64();
        } else if (headByte === 217) {
          var byteLength = this.lookU8();
          object = this.decodeUtf8String(byteLength, 1);
        } else if (headByte === 218) {
          var byteLength = this.lookU16();
          object = this.decodeUtf8String(byteLength, 2);
        } else if (headByte === 219) {
          var byteLength = this.lookU32();
          object = this.decodeUtf8String(byteLength, 4);
        } else if (headByte === 220) {
          var size = this.readU16();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 221) {
          var size = this.readU32();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 222) {
          var size = this.readU16();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 223) {
          var size = this.readU32();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 196) {
          var size = this.lookU8();
          object = this.decodeBinary(size, 1);
        } else if (headByte === 197) {
          var size = this.lookU16();
          object = this.decodeBinary(size, 2);
        } else if (headByte === 198) {
          var size = this.lookU32();
          object = this.decodeBinary(size, 4);
        } else if (headByte === 212) {
          object = this.decodeExtension(1, 0);
        } else if (headByte === 213) {
          object = this.decodeExtension(2, 0);
        } else if (headByte === 214) {
          object = this.decodeExtension(4, 0);
        } else if (headByte === 215) {
          object = this.decodeExtension(8, 0);
        } else if (headByte === 216) {
          object = this.decodeExtension(16, 0);
        } else if (headByte === 199) {
          var size = this.lookU8();
          object = this.decodeExtension(size, 1);
        } else if (headByte === 200) {
          var size = this.lookU16();
          object = this.decodeExtension(size, 2);
        } else if (headByte === 201) {
          var size = this.lookU32();
          object = this.decodeExtension(size, 4);
        } else {
          throw new DecodeError("Unrecognized type byte: ".concat(prettyByte(headByte)));
        }
        this.complete();
        var stack = this.stack;
        while (stack.length > 0) {
          var state = stack[stack.length - 1];
          if (state.type === 0) {
            state.array[state.position] = object;
            state.position++;
            if (state.position === state.size) {
              stack.pop();
              object = state.array;
            } else {
              continue DECODE;
            }
          } else if (state.type === 1) {
            if (!isValidMapKeyType(object)) {
              throw new DecodeError("The type of key must be string or number but " + typeof object);
            }
            if (object === "__proto__") {
              throw new DecodeError("The key __proto__ is not allowed");
            }
            state.key = object;
            state.type = 2;
            continue DECODE;
          } else {
            state.map[state.key] = object;
            state.readCount++;
            if (state.readCount === state.size) {
              stack.pop();
              object = state.map;
            } else {
              state.key = null;
              state.type = 1;
              continue DECODE;
            }
          }
        }
        return object;
      }
    };
    Decoder2.prototype.readHeadByte = function () {
      if (this.headByte === HEAD_BYTE_REQUIRED) {
        this.headByte = this.readU8();
      }
      return this.headByte;
    };
    Decoder2.prototype.complete = function () {
      this.headByte = HEAD_BYTE_REQUIRED;
    };
    Decoder2.prototype.readArraySize = function () {
      var headByte = this.readHeadByte();
      switch (headByte) {
        case 220:
          return this.readU16();
        case 221:
          return this.readU32();
        default:
          {
            if (headByte < 160) {
              return headByte - 144;
            } else {
              throw new DecodeError("Unrecognized array type byte: ".concat(prettyByte(headByte)));
            }
          }
      }
    };
    Decoder2.prototype.pushMapState = function (size) {
      if (size > this.maxMapLength) {
        throw new DecodeError("Max length exceeded: map length (".concat(size, ") > maxMapLengthLength (").concat(this.maxMapLength, ")"));
      }
      this.stack.push({
        type: 1,
        size,
        key: null,
        readCount: 0,
        map: {}
      });
    };
    Decoder2.prototype.pushArrayState = function (size) {
      if (size > this.maxArrayLength) {
        throw new DecodeError("Max length exceeded: array length (".concat(size, ") > maxArrayLength (").concat(this.maxArrayLength, ")"));
      }
      this.stack.push({
        type: 0,
        size,
        array: new Array(size),
        position: 0
      });
    };
    Decoder2.prototype.decodeUtf8String = function (byteLength, headerOffset) {
      var _a2;
      if (byteLength > this.maxStrLength) {
        throw new DecodeError("Max length exceeded: UTF-8 byte length (".concat(byteLength, ") > maxStrLength (").concat(this.maxStrLength, ")"));
      }
      if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
        throw MORE_DATA;
      }
      var offset = this.pos + headerOffset;
      var object;
      if (this.stateIsMapKey() && ((_a2 = this.keyDecoder) === null || _a2 === void 0 ? void 0 : _a2.canBeCached(byteLength))) {
        object = this.keyDecoder.decode(this.bytes, offset, byteLength);
      } else if (byteLength > TEXT_DECODER_THRESHOLD) {
        object = utf8DecodeTD(this.bytes, offset, byteLength);
      } else {
        object = utf8DecodeJs(this.bytes, offset, byteLength);
      }
      this.pos += headerOffset + byteLength;
      return object;
    };
    Decoder2.prototype.stateIsMapKey = function () {
      if (this.stack.length > 0) {
        var state = this.stack[this.stack.length - 1];
        return state.type === 1;
      }
      return false;
    };
    Decoder2.prototype.decodeBinary = function (byteLength, headOffset) {
      if (byteLength > this.maxBinLength) {
        throw new DecodeError("Max length exceeded: bin length (".concat(byteLength, ") > maxBinLength (").concat(this.maxBinLength, ")"));
      }
      if (!this.hasRemaining(byteLength + headOffset)) {
        throw MORE_DATA;
      }
      var offset = this.pos + headOffset;
      var object = this.bytes.subarray(offset, offset + byteLength);
      this.pos += headOffset + byteLength;
      return object;
    };
    Decoder2.prototype.decodeExtension = function (size, headOffset) {
      if (size > this.maxExtLength) {
        throw new DecodeError("Max length exceeded: ext length (".concat(size, ") > maxExtLength (").concat(this.maxExtLength, ")"));
      }
      var extType = this.view.getInt8(this.pos + headOffset);
      var data = this.decodeBinary(size, headOffset + 1);
      return this.extensionCodec.decode(data, extType, this.context);
    };
    Decoder2.prototype.lookU8 = function () {
      return this.view.getUint8(this.pos);
    };
    Decoder2.prototype.lookU16 = function () {
      return this.view.getUint16(this.pos);
    };
    Decoder2.prototype.lookU32 = function () {
      return this.view.getUint32(this.pos);
    };
    Decoder2.prototype.readU8 = function () {
      var value = this.view.getUint8(this.pos);
      this.pos++;
      return value;
    };
    Decoder2.prototype.readI8 = function () {
      var value = this.view.getInt8(this.pos);
      this.pos++;
      return value;
    };
    Decoder2.prototype.readU16 = function () {
      var value = this.view.getUint16(this.pos);
      this.pos += 2;
      return value;
    };
    Decoder2.prototype.readI16 = function () {
      var value = this.view.getInt16(this.pos);
      this.pos += 2;
      return value;
    };
    Decoder2.prototype.readU32 = function () {
      var value = this.view.getUint32(this.pos);
      this.pos += 4;
      return value;
    };
    Decoder2.prototype.readI32 = function () {
      var value = this.view.getInt32(this.pos);
      this.pos += 4;
      return value;
    };
    Decoder2.prototype.readU64 = function () {
      var value = getUint64(this.view, this.pos);
      this.pos += 8;
      return value;
    };
    Decoder2.prototype.readI64 = function () {
      var value = getInt64(this.view, this.pos);
      this.pos += 8;
      return value;
    };
    Decoder2.prototype.readF32 = function () {
      var value = this.view.getFloat32(this.pos);
      this.pos += 4;
      return value;
    };
    Decoder2.prototype.readF64 = function () {
      var value = this.view.getFloat64(this.pos);
      this.pos += 8;
      return value;
    };
    return Decoder2;
  }();

  // ../../node_modules/.pnpm/@msgpack+msgpack@2.8.0/node_modules/@msgpack/msgpack/dist.es5+esm/decode.mjs
  var defaultDecodeOptions = {};
  function decode(buffer, options) {
    if (options === void 0) {
      options = defaultDecodeOptions;
    }
    var decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decode(buffer);
  }

  // src/channel.ts
  var signalingEncode = data => encode(data);
  var _transport, _metadata, _subscribers, _members, _peers, _joinTimestamp, _joinChannel, joinChannel_fn, _getDataPacket, getDataPacket_fn, _broadcast, broadcast_fn, _write, write_fn, _read, read_fn, _handleOnline, handleOnline_fn, _handleSync, handleSync_fn, _online, online_fn, _syncState, syncState_fn, _offline, offline_fn;
  var Channel = class {
    constructor(id, metadata, transport) {
      __privateAdd(this, _joinChannel);
      __privateAdd(this, _getDataPacket);
      __privateAdd(this, _broadcast);
      __privateAdd(this, _write);
      __privateAdd(this, _read);
      __privateAdd(this, _handleOnline);
      __privateAdd(this, _handleSync);
      __privateAdd(this, _online);
      __privateAdd(this, _syncState);
      __privateAdd(this, _offline);
      __privateAdd(this, _transport, void 0);
      __privateAdd(this, _metadata, void 0);
      __privateAdd(this, _subscribers, /* @__PURE__ */new Map());
      __privateAdd(this, _members, []);
      __privateAdd(this, _peers, null);
      __privateAdd(this, _joinTimestamp, void 0);
      __publicField(this, "id");
      this.id = id;
      __privateSet(this, _metadata, metadata);
      __privateSet(this, _transport, transport);
      __privateSet(this, _joinTimestamp, Date.now());
      __privateGet(this, _joinTimestamp);
      __privateMethod(this, _read, read_fn).call(this);
      __privateMethod(this, _joinChannel, joinChannel_fn).call(this);
    }
    broadcast(eventName, payload) {
      __privateMethod(this, _broadcast, broadcast_fn).call(this, eventName, __privateMethod(this, _getDataPacket, getDataPacket_fn).call(this, payload));
    }
    subscribe(eventName, callbackFn) {
      return __async(this, null, function* () {
        __privateGet(this, _subscribers).set(eventName, callbackFn);
      });
    }
    subscribePeers(callbackFn) {
      if (!__privateGet(this, _peers)) {
        __privateSet(this, _peers, new Peers(__privateGet(this, _transport)));
      }
      return __privateGet(this, _peers).subscribe(callbackFn);
    }
    leave() {
      const writer = __privateGet(this, _transport).datagrams.writable.getWriter();
      writer.write(encode({
        t: "control",
        op: "peer_offline",
        c: this.id
      }));
      writer.close();
    }
    updateMetadata(metadata) {
      __privateSet(this, _metadata, metadata);
      __privateMethod(this, _write, write_fn).call(this, signalingEncode({
        t: "control",
        op: "peer_state",
        c: this.id,
        p: __privateGet(this, _metadata).id,
        pl: encode(__privateGet(this, _metadata))
      }));
    }
  };
  _transport = new WeakMap();
  _metadata = new WeakMap();
  _subscribers = new WeakMap();
  _members = new WeakMap();
  _peers = new WeakMap();
  _joinTimestamp = new WeakMap();
  _joinChannel = new WeakSet();
  joinChannel_fn = function () {
    __privateMethod(this, _write, write_fn).call(this, signalingEncode({
      t: "control",
      op: "channel_join",
      c: this.id,
      pl: encode(__privateGet(this, _metadata))
    }));
  };
  _getDataPacket = new WeakSet();
  getDataPacket_fn = function (payload) {
    return {
      metadata: __privateGet(this, _metadata),
      payload
    };
  };
  _broadcast = new WeakSet();
  broadcast_fn = function (eventName, dataPacket) {
    const writer = __privateGet(this, _transport).datagrams.writable.getWriter();
    writer.write(signalingEncode({
      t: "data",
      c: this.id,
      pl: encode(__spreadValues({
        event: eventName
      }, dataPacket.payload))
    }));
    writer.close();
  };
  _write = new WeakSet();
  write_fn = function (data) {
    return __async(this, null, function* () {
      const writer = __privateGet(this, _transport).datagrams.writable.getWriter();
      writer.write(data);
      writer.close();
    });
  };
  _read = new WeakSet();
  read_fn = function () {
    return __async(this, null, function* () {
      try {
        const reader = __privateGet(this, _transport).datagrams.readable.getReader();
        while (true) {
          const {
            value
          } = yield reader.read();
          const data = new Uint8Array(value);
          const signaling = decode(data);
          if (signaling.t === "control") {
            console.log(signaling.op, signaling.p);
            if (signaling.op === "channel_join") {
              __privateMethod(this, _online, online_fn).call(this);
              __privateMethod(this, _syncState, syncState_fn).call(this);
              continue;
            }
            if (signaling.op === "peer_online") {
              __privateMethod(this, _handleOnline, handleOnline_fn).call(this, signaling.p);
              continue;
            }
            if (signaling.op === "peer_offline") {
              __privateMethod(this, _offline, offline_fn).call(this, signaling.p);
              continue;
            }
            if (signaling.op === "peer_state") {
              __privateMethod(this, _handleSync, handleSync_fn).call(this, decode(signaling.pl));
              continue;
            }
          } else if (signaling.t === "data") {
            const _a2 = decode(signaling.pl),
              {
                event
              } = _a2,
              payload = __objRest(_a2, ["event"]);
            if (__privateGet(this, _subscribers).has(event)) {
              __privateGet(this, _subscribers).get(event)(payload, {
                id: signaling.p
              });
            }
          }
        }
      } catch (e) {
        console.log(e);
        return;
      }
    });
  };
  _handleOnline = new WeakSet();
  handleOnline_fn = function (id) {
    var _a2;
    if (id !== __privateGet(this, _metadata).id) {
      const idx = __privateGet(this, _members).findIndex(member => member.id === id);
      if (idx > -1) {
        __privateGet(this, _members)[idx] = {
          id
        };
      } else {
        __privateGet(this, _members).push({
          id
        });
      }
      __privateMethod(this, _syncState, syncState_fn).call(this);
      (_a2 = __privateGet(this, _peers)) == null ? void 0 : _a2.trigger(__privateGet(this, _members));
    }
  };
  _handleSync = new WeakSet();
  handleSync_fn = function (payload) {
    var _a2;
    if (payload.id !== __privateGet(this, _metadata).id) {
      const idx = __privateGet(this, _members).findIndex(member => {
        console.log(String(member.id) === String(payload.id), member.id, payload.id);
        return String(member.id) === String(payload.id);
      });
      console.log("idx:", idx, __privateGet(this, _members), payload.id);
      if (idx > -1) {
        __privateGet(this, _members)[idx] = payload;
      } else {
        __privateGet(this, _members).push(payload);
      }
      (_a2 = __privateGet(this, _peers)) == null ? void 0 : _a2.trigger(__privateGet(this, _members));
    }
  };
  _online = new WeakSet();
  online_fn = function () {
    __privateMethod(this, _write, write_fn).call(this, signalingEncode({
      t: "control",
      op: "peer_online",
      c: this.id,
      p: __privateGet(this, _metadata).id
    }));
  };
  _syncState = new WeakSet();
  syncState_fn = function () {
    __privateMethod(this, _write, write_fn).call(this, signalingEncode({
      t: "control",
      op: "peer_state",
      c: this.id,
      p: __privateGet(this, _metadata).id,
      pl: encode(__privateGet(this, _metadata))
    }));
  };
  _offline = new WeakSet();
  offline_fn = function (id) {
    var _a2;
    if (id !== __privateGet(this, _metadata).id) {
      const idx = __privateGet(this, _members).findIndex(member => {
        return member.id === id;
      });
      if (idx > -1) {
        __privateGet(this, _members).splice(idx, 1);
      }
      console.log(__privateGet(this, _members).length, "ccc");
      (_a2 = __privateGet(this, _peers)) == null ? void 0 : _a2.trigger(__privateGet(this, _members));
    }
  };
  var _transport2, _callbackFns;
  var Peers = class {
    constructor(transport) {
      __privateAdd(this, _transport2, null);
      __privateAdd(this, _callbackFns, []);
      __privateSet(this, _transport2, transport);
      __privateGet(this, _transport2);
    }
    subscribe(callbackFn) {
      __privateGet(this, _callbackFns).push(callbackFn);
      return () => {
        const fnIndex = __privateGet(this, _callbackFns).findIndex(fn => fn === callbackFn);
        if (fnIndex > -1) {
          __privateGet(this, _callbackFns).splice(fnIndex, 1);
        }
      };
    }
    trigger(members) {
      __privateGet(this, _callbackFns).forEach(callbackFn => {
        callbackFn(members);
      });
    }
  };
  _transport2 = new WeakMap();
  _callbackFns = new WeakMap();

  // src/utils.ts
  function randomId() {
    return Math.random().toString(36).substring(2, 36);
  }

  // src/presence.ts
  var _url, _metadata2, _channels, _transport3, _options, _onReadyCallbackFn, _onErrorCallbackFn, _onClosedCallbackFn, _formatUrl, formatUrl_fn, _connect, connect_fn;
  var Presence = class {
    constructor(options) {
      __privateAdd(this, _formatUrl);
      __privateAdd(this, _connect);
      __privateAdd(this, _url, void 0);
      __privateAdd(this, _metadata2, void 0);
      __privateAdd(this, _channels, /* @__PURE__ */new Map());
      __privateAdd(this, _transport3, void 0);
      __privateAdd(this, _options, void 0);
      __privateAdd(this, _onReadyCallbackFn, () => {});
      __privateAdd(this, _onErrorCallbackFn, () => {});
      __privateAdd(this, _onClosedCallbackFn, () => {});
      __privateSet(this, _metadata2, {
        id: options.id
      });
      __privateSet(this, _options, options);
      __privateSet(this, _url, __privateMethod(this, _formatUrl, formatUrl_fn).call(this));
      __privateMethod(this, _connect, connect_fn).call(this);
    }
    onReady(callbackFn) {
      __privateSet(this, _onReadyCallbackFn, callbackFn);
    }
    onError(callbackFn) {
      __privateSet(this, _onErrorCallbackFn, callbackFn);
    }
    onClosed(callbackFn) {
      __privateSet(this, _onClosedCallbackFn, callbackFn);
    }
    joinChannel(channelId, metadata) {
      __privateSet(this, _metadata2, __spreadValues(__spreadValues({}, __privateGet(this, _metadata2)), metadata));
      const channel = new Channel(channelId, __privateGet(this, _metadata2), __privateGet(this, _transport3));
      __privateGet(this, _channels).set(channelId, channel);
      return channel;
    }
    leaveChannel(channelId) {
      const channel = __privateGet(this, _channels).get(channelId);
      if (channel) {
        channel.leave();
      }
    }
  };
  _url = new WeakMap();
  _metadata2 = new WeakMap();
  _channels = new WeakMap();
  _transport3 = new WeakMap();
  _options = new WeakMap();
  _onReadyCallbackFn = new WeakMap();
  _onErrorCallbackFn = new WeakMap();
  _onClosedCallbackFn = new WeakMap();
  _formatUrl = new WeakSet();
  formatUrl_fn = function () {
    return `${__privateGet(this, _options).url}?publickey=${__privateGet(this, _options).publicKey}&id=${__privateGet(this, _metadata2).id}`;
  };
  _connect = new WeakSet();
  connect_fn = function () {
    __privateSet(this, _transport3, new window.WebTransport(__privateGet(this, _url)));
    __privateGet(this, _transport3).ready.then(() => {
      __privateGet(this, _onReadyCallbackFn).call(this);
    }).catch(e => {
      __privateGet(this, _onErrorCallbackFn).call(this, e);
    });
    __privateGet(this, _transport3).closed.then(() => {
      __privateGet(this, _onClosedCallbackFn).call(this);
      __privateGet(this, _channels).forEach(channel => {
        channel.leave();
      });
    });
  };
  var createPresence = options => __async(void 0, null, function* () {
    return new Promise(resolve => {
      let id = (options == null ? void 0 : options.id) || randomId();
      let url = (options == null ? void 0 : options.url) || "https://prsc.yomo.dev";
      const internalOptions = __spreadProps(__spreadValues({}, options), {
        id,
        url
      });
      const presence = new Presence(internalOptions);
      presence.onReady(() => {
        resolve(presence);
      });
    });
  });
});

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*\n! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.mr-\\[2px\\] {\n  margin-right: 2px;\n}\n.flex {\n  display: flex;\n}\n.inline-flex {\n  display: inline-flex;\n}\n.h-\\[22px\\] {\n  height: 22px;\n}\n.h-full {\n  height: 100%;\n}\n.h-4 {\n  height: 1rem;\n}\n.w-\\[22px\\] {\n  width: 22px;\n}\n.w-full {\n  width: 100%;\n}\n.w-4 {\n  width: 1rem;\n}\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.items-center {\n  align-items: center;\n}\n.justify-center {\n  justify-content: center;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.rounded-\\[1rem\\] {\n  border-radius: 1rem;\n}\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.text-\\[12px\\] {\n  font-size: 12px;\n}\n.text-\\[0\\.75rem\\] {\n  font-size: 0.75rem;\n}\n.font-\\[500\\] {\n  font-weight: 500;\n}\n.font-normal {\n  font-weight: 400;\n}\n.leading-4 {\n  line-height: 1rem;\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.text-\\[\\#604CFF\\] {\n  --tw-text-opacity: 1;\n  color: rgb(96 76 255 / var(--tw-text-opacity));\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n";
styleInject(css_248z);

let HugGroup = class HugGroup extends s {
    constructor() {
        super(...arguments);
        this.id = Math.random().toString();
        this.users = [];
        this.channel = null;
    }
    createRenderRoot() {
        dist.createPresence({
            url: 'https://lo.allegrocloud.io:8443/v1/ws',
            publicKey: 'BYePWMVCfkWRarcDLBIbSFzrMkDldWIBuKsA',
            id: this.id,
        }).then((yomo) => {
            this.channel = yomo.joinChannel('hug-group', {
                id: this.id,
                avatar: this.avatar,
            });
            this.channel.subscribePeers((peers) => {
                this.users = [{ id: this.id, avatar: this.avatar }, ...peers];
            });
            this.users = [{ id: this.id, avatar: this.avatar }];
        });
        window.addEventListener('beforeunload', () => {
            this.channel.leave();
        });
        return this; // turn off shadow dom to access external styles
    }
    render() {
        if (this.channel === null)
            return null;
        return y `
      <div class="flex items-center">
        <div
          class=" relative flex"
          style="margin-right: ${14 - Math.min(this.users.length, 6) * 2}px"
        >
          ${this.users.slice(0, 6).map((user, i) => {
            if (i < 5) {
                if (user.avatar) {
                    return y `<img
                  style="transform:
                translateX(${i * -2}px);
                z-index:${this.users.length - i};
                width: 22px;
                height: 22px;
                object-fit: contain;
                border-radius: 50%;
                "
                  src=${user.avatar}
                  alt=${user.id}
                />`;
                }
                return y `
                <svg
                  style="transform: translateX(${i * -2}px);z-index:${this.users
                    .length - i}"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="10.5"
                    fill="url(#pattern0)"
                    stroke="#604CFF"
                  />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_351_157"
                        transform="scale(0.0238095)"
                      />
                    </pattern>
                    <image
                      id="image0_351_157"
                      width="42"
                      height="42"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              `;
            }
            else {
                return y ` <div
                style="transform: translateX(${i * -2}px);
                z-index:${this.users.length - i};  
                "
                class="relative w-[22px] h-[22px]
                text-white text-[12px]
                font-[500] font-normal"
              >
                <span
                  class="absolute inline-flex  justify-center items-center w-full h-full  rounded-full"
                  style="background: rgba(0, 0, 0, 0.6);"
                  >+${this.users.length - 5}</span
                >
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="10.5"
                    fill="url(#pattern0)"
                    stroke="#604CFF"
                  />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_351_157"
                        transform="scale(0.0238095)"
                      />
                    </pattern>
                    <image
                      id="image0_351_157"
                      width="42"
                      height="42"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>`;
            }
        })}
        </div>
        <div
          class="flex rounded-[1rem] py-1 px-2"
          style="background: linear-gradient(115.54deg, #7787FF 30.62%, #E080C9 83.83%);"
        >
          <span class="font-normal leading-4 text-[0.75rem] text-white mr-[2px]"
            >live</span
          >
          <span
            class="flex justify-center items-center text-[0.75rem] text-[#604CFF] rounded-full w-4 h-4 bg-white"
            >${this.users.length}</span
          >
        </div>
      </div>
    `;
    }
};
__decorate([
    e()
], HugGroup.prototype, "id", void 0);
__decorate([
    e({
        converter: (attrValue) => {
            if (attrValue)
                return attrValue;
            else
                return 'https://avatars0.githubusercontent.com/u/17098?s=460&v=4';
        },
    })
], HugGroup.prototype, "avatar", void 0);
__decorate([
    e()
], HugGroup.prototype, "users", void 0);
__decorate([
    e()
], HugGroup.prototype, "channel", void 0);
HugGroup = __decorate([
    e$1('hug-group')
], HugGroup);
var HugGroup$1 = HugGroup;

export { HugGroup$1 as default };
//# sourceMappingURL=bundle.js.map

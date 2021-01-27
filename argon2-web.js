
var Module = (function() {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined')
        _scriptDir = _scriptDir || __filename;
    return (function(Module) {
        Module = Module || {};

        var b;
        b || (b = typeof Module !== 'undefined' ? Module : {});
        var p, r;
        b.ready = new Promise(function(a, c) {
            p = a;
            r = c
        });
        var t = {}, v;
        for (v in b)
            b.hasOwnProperty(v) && (t[v] = b[v]);
        var x = !1, y = !1, z = !1, A = !1;
        x = "object" === typeof window;
        y = "function" === typeof importScripts;
        z = "object" === typeof process && "object" === typeof process.versions &&
            "string" === typeof process.versions.node;
        A = !x && !z && !y;
        var B = "", C, D, E, F, G;
        if (z)
            B = y ? require("path").dirname(B) + "/" : __dirname + "/",
            C =
                function(a, c) {
                F || (F = require("fs"));
                G || (G = require("path"));
                a = G.normalize(a);
                return F.readFileSync(a, c ? null : "utf8")
            },
            E =
                function(a) {
                a = C(a, !0);
                a.buffer || (a = new Uint8Array(a));
                assert(a.buffer);
                return a
            },
            1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2),
            process.on("uncaughtException", function(a) {
                throw a;
            }), process.on("unhandledRejection", H), b.inspect = function() {
                return "[Emscripten Module object]"
            };
        else if (A)
            "undefined" != typeof read && (C =
                                               function(a) {
                                                   return read(a)
                                               }),
                E =
                    function(a) {
                    if ("function" === typeof readbuffer)
                        return new Uint8Array(readbuffer(a));
                    a = read(a, "binary");
                    assert("object" === typeof a);
                    return a
                },
                "undefined" !== typeof print &&
                    ("undefined" === typeof console && (console = {}), console.log = print,
                     console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
        else if (x || y)
            y ? B = self.location.href
              : "undefined" !== typeof document && document.currentScript && (B = document.currentScript.src),
                _scriptDir && (B = _scriptDir),
                0 !== B.indexOf("blob:") ? B = B.substr(0, B.lastIndexOf("/") + 1) : B = "", C = function(a) {
                    var c = new XMLHttpRequest;
                    c.open("GET", a, !1);
                    c.send(null);
                    return c.responseText
                }, y && (E = function(a) {
                       var c = new XMLHttpRequest;
                       c.open("GET", a, !1);
                       c.responseType = "arraybuffer";
                       c.send(null);
                       return new Uint8Array(c.response)
                   }), D = function(a, c, e) {
                    var d = new XMLHttpRequest;
                    d.open("GET", a, !0);
                    d.responseType = "arraybuffer";
                    d.onload = function() {
                        200 == d.status || 0 == d.status && d.response ? c(d.response) : e()
                    };
                    d.onerror = e;
                    d.send(null)
                };
        b.print || console.log.bind(console);
        var I = b.printErr || console.warn.bind(console);
        for (v in t)
            t.hasOwnProperty(v) && (b[v] = t[v]);
        t = null;
        var J;
        b.wasmBinary && (J = b.wasmBinary);
        var noExitRuntime;
        b.noExitRuntime && (noExitRuntime = b.noExitRuntime);
        "object" !== typeof WebAssembly && H("no native wasm support detected");
        var K, L = !1;
        function assert(a, c)
        {
            a || H("Assertion failed: " + c)
        }
        function M(a)
        {
            var c = b["_" + a];
            assert(c, "Cannot call unknown function " + a + ", make sure it is exported");
            return c
        }
        function N(a, c, e, d)
        {
            var k = {
                string : function(f) {
                    var n = 0;
                    if (null !== f && void 0 !== f && 0 !== f)
                    {
                        var m = (f.length << 2) + 1;
                        n = O(m);
                        var h = n, g = P;
                        if (0 < m)
                        {
                            m = h + m - 1;
                            for (var u = 0; u < f.length; ++u)
                            {
                                var l = f.charCodeAt(u);
                                if (55296 <= l && 57343 >= l)
                                {
                                    var pa = f.charCodeAt(++u);
                                    l = 65536 + ((l & 1023) << 10) | pa & 1023
                                }
                                if (127 >= l)
                                {
                                    if (h >= m)
                                        break;
                                    g[h++] = l
                                }
                                else
                                {
                                    if (2047 >= l)
                                    {
                                        if (h + 1 >= m)
                                            break;
                                        g[h++] = 192 | l >> 6
                                    }
                                    else
                                    {
                                        if (65535 >= l)
                                        {
                                            if (h + 2 >= m)
                                                break;
                                            g[h++] = 224 | l >> 12
                                        }
                                        else
                                        {
                                            if (h + 3 >= m)
                                                break;
                                            g[h++] = 240 | l >> 18;
                                            g[h++] = 128 | l >> 12 & 63
                                        }
                                        g[h++] = 128 | l >> 6 & 63
                                    }
                                    g[h++] = 128 | l & 63
                                }
                            }
                            g[h] = 0
                        }
                    }
                    return n
                },
                array : function(f) {
                    var n = O(f.length);
                    aa.set(f, n);
                    return n
                }
            },
                q = M(a), Q = [];
            a = 0;
            if (d)
                for (var w = 0; w < d.length; w++)
                {
                    var ba = k[e[w]];
                    ba ? (0 === a && (a = ca()), Q[w] = ba(d[w])) : Q[w] = d[w]
                }
            e = q.apply(null, Q);
            e = function(f) {
                if ("string" === c)
                    if (f)
                    {
                        for (var n = P, m = f + NaN, h = f; n[h] && !(h >= m);)
                            ++h;
                        if (16 < h - f && n.subarray && da)
                            f = da.decode(n.subarray(f, h));
                        else
                        {
                            for (m = ""; f < h;)
                            {
                                var g = n[f++];
                                if (g & 128)
                                {
                                    var u = n[f++] & 63;
                                    if (192 == (g & 224))
                                        m += String.fromCharCode((g & 31) << 6 | u);
                                    else
                                    {
                                        var l = n[f++] & 63;
                                        g = 224 == (g & 240) ? (g & 15) << 12 | u << 6 | l
                                                             : (g & 7) << 18 | u << 12 | l << 6 | n[f++] & 63;
                                        65536 > g
                                            ? m += String.fromCharCode(g)
                                            : (g -= 65536, m += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023))
                                    }
                                }
                                else
                                    m += String.fromCharCode(g)
                            }
                            f = m
                        }
                    }
                    else
                        f = "";
                else
                    f = "boolean" === c ? !!f : f;
                return f
            }(e);
            0 !== a && ea(a);
            return e
        }
        var da = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0, fa, aa, P;
        function ha()
        {
            var a = K.buffer;
            fa = a;
            b.HEAP8 = aa = new Int8Array(a);
            b.HEAP16 = new Int16Array(a);
            b.HEAP32 = new Int32Array(a);
            b.HEAPU8 = P = new Uint8Array(a);
            b.HEAPU16 = new Uint16Array(a);
            b.HEAPU32 = new Uint32Array(a);
            b.HEAPF32 = new Float32Array(a);
            b.HEAPF64 = new Float64Array(a)
        }
        var R, ia = [], ja = [], ka = [], la = [];
        ja.push({
            m : function() {
                ma()
            }
        });
        function na()
        {
            var a = b.preRun.shift();
            ia.unshift(a)
        }
        var S = 0, T = null, U = null;
        b.preloadedImages = {};
        b.preloadedAudios = {};
        function H(a)
        {
            if (b.onAbort)
                b.onAbort(a);
            I(a);
            L = !0;
            a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
            r(a);
            throw a;
        }
        function V(a)
        {
            var c = W;
            return String.prototype.startsWith ? c.startsWith(a) : 0 === c.indexOf(a)
        }
        function oa()
        {
            return V("data:application/octet-stream;base64,")
        }
        var W = "argon2-web.wasm";
        if (!oa())
        {
            var qa = W;
            W = b.locateFile ? b.locateFile(qa, B) : B + qa
        }
        function ra()
        {
            var a = W;
            try
            {
                if (a == W && J)
                    return new Uint8Array(J);
                if (E)
                    return E(a);
                throw "both async and sync fetching of the wasm failed";
            }
            catch (c)
            {
                H(c)
            }
        }
        function sa()
        {
            if (!J && (x || y))
            {
                if ("function" === typeof fetch && !V("file://"))
                    return fetch(W, {credentials : "same-origin"})
                        .then(function(a) {
                            if (!a.ok)
                                throw "failed to load wasm binary file at '" + W + "'";
                            return a.arrayBuffer()
                        })
                        .catch(function() {
                            return ra()
                        });
                if (D)
                    return new Promise(function(a, c) {
                        D(W, function(e) {
                            a(new Uint8Array(e))
                        }, c)
                    })
            }
            return Promise.resolve().then(function() {
                return ra()
            })
        }
        function X(a)
        {
            for (; 0 < a.length;)
            {
                var c = a.shift();
                if ("function" == typeof c)
                    c(b);
                else
                {
                    var e = c.m;
                    "number" === typeof e ? void 0 === c.l ? R.get(e)() : R.get(e)(c.l) : e(void 0 === c.l ? null : c.l)
                }
            }
        }
        var ta = {
            b : function(a, c, e) {
                P.copyWithin(a, c, c + e)
            },
            a : function(a) {
                a >>>= 0;
                var c = P.length;
                if (2147483648 < a)
                    return !1;
                for (var e = 1; 4 >= e; e *= 2)
                {
                    var d = c * (1 + .2 / e);
                    d = Math.min(d, a + 100663296);
                    d = Math.max(16777216, a, d);
                    0 < d % 65536 && (d += 65536 - d % 65536);
                    a: {
                        try {
                            K.grow(Math.min(2147483648, d) - fa.byteLength + 65535 >>> 16);
                            ha();
                            var k = 1;
                            break a
                        } catch (q) {} k = void 0
                    } if (k) return !0
                }
                return !1
            }
        };
        (function() {
            function a(k)
            {
                b.asm = k.exports;
                K = b.asm.c;
                ha();
                R = b.asm.d;
                S--;
                b.monitorRunDependencies && b.monitorRunDependencies(S);
                0 == S && (null !== T && (clearInterval(T), T = null), U && (k = U, U = null, k()))
            }
            function c(k)
            {
                a(k.instance)
            }
            function e(k)
            {
                return sa()
                    .then(function(q) {
                        return WebAssembly.instantiate(q, d)
                    })
                    .then(k, function(q) {
                        I("failed to asynchronously prepare wasm: " + q);
                        H(q)
                    })
            }
            var d = {a : ta};
            S++;
            b.monitorRunDependencies && b.monitorRunDependencies(S);
            if (b.instantiateWasm)
                try
                {
                    return b.instantiateWasm(d, a)
                }
                catch (k)
                {
                    return I("Module.instantiateWasm callback failed with error: " + k), !1
                }
            (function() {
                return J || "function" !== typeof WebAssembly.instantiateStreaming || oa() || V("file://") ||
                               "function" !== typeof fetch
                           ? e(c)
                           : fetch(W, {credentials : "same-origin"}).then(function(k) {
                                 return WebAssembly.instantiateStreaming(k, d).then(c, function(q) {
                                     I("wasm streaming compile failed: " + q);
                                     I("falling back to ArrayBuffer instantiation");
                                     return e(c)
                                 })
                             })
            })().catch(r);
            return
            {
            }
        })();
        var ma = b.___wasm_call_ctors = function() {
            return (ma = b.___wasm_call_ctors = b.asm.e).apply(null, arguments)
        };
        b._secret = function() {
            return (b._secret = b.asm.f).apply(null, arguments)
        };
        b._argon_hash = function() {
            return (b._argon_hash = b.asm.g).apply(null, arguments)
        };
        var ca = b.stackSave = function() {
            return (ca = b.stackSave = b.asm.h).apply(null, arguments)
        }, ea = b.stackRestore = function() {
            return (ea = b.stackRestore = b.asm.i).apply(null, arguments)
        }, O = b.stackAlloc = function() {
            return (O = b.stackAlloc = b.asm.j).apply(null, arguments)
        };
        b.ccall = N;
        b.cwrap = function(a, c, e, d) {
            e = e || [];
            var k = e.every(function(q) {
                return "number" === q
            });
            return "string" !== c && k && !d ? M(a) : function() {
                return N(a, c, e, arguments, d)
            }
        };
        var Y;
        U = function ua() {
            Y || Z();
            Y || (U = ua)
        };
        function Z()
        {
            function a()
            {
                if (!Y && (Y = !0, b.calledRun = !0, !L))
                {
                    X(ja);
                    X(ka);
                    p(b);
                    if (b.onRuntimeInitialized)
                        b.onRuntimeInitialized();
                    if (b.postRun)
                        for ("function" == typeof b.postRun && (b.postRun = [ b.postRun ]); b.postRun.length;)
                        {
                            var c = b.postRun.shift();
                            la.unshift(c)
                        }
                    X(la)
                }
            }
            if (!(0 < S))
            {
                if (b.preRun)
                    for ("function" == typeof b.preRun && (b.preRun = [ b.preRun ]); b.preRun.length;)
                        na();
                X(ia);
                0 < S || (b.setStatus ? (b.setStatus("Running..."), setTimeout(function() {
                                             setTimeout(function() {
                                                 b.setStatus("")
                                             }, 1);
                                             a()
                                         }, 1)) : a())
            }
        }
        b.run = Z;
        if (b.preInit)
            for ("function" == typeof b.preInit && (b.preInit = [ b.preInit ]); 0 < b.preInit.length;)
                b.preInit.pop()();
        noExitRuntime = !0;
        Z();

        return Module.ready
    });
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = Module;
else if (typeof define === 'function' && define['amd'])
    define([], function() {
        return Module;
    });
else if (typeof exports === 'object')
    exports["Module"] = Module;

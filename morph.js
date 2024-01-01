/*!
 * MorphSVGPlugin 3.12.3
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function (t) {
    "use strict";
    function m(t) {
        return "string" == typeof t
    }
    var T = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
        , S = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
        , b = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
        , r = /(^[#\.][a-z]|[a-y][a-z])/i
        , E = Math.PI / 180
        , H = Math.sin
        , B = Math.cos
        , D = Math.abs
        , Q = Math.sqrt
        , s = function _isNumber(t) {
            return "number" == typeof t
        }
        , h = function _round(t) {
            return Math.round(1e5 * t) / 1e5 || 0
        };
    function reverseSegment(t) {
        var e, n = 0;
        for (t.reverse(); n < t.length; n += 2)
            e = t[n],
                t[n] = t[n + 1],
                t[n + 1] = e;
        t.reversed = !t.reversed
    }
    var N = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };
    function convertToPath(t, e) {
        var n, r, o, a, i, s, h, l, c, g, p, f, u, d, P, m, _, v, w, y, x, M, T = t.tagName.toLowerCase(), b = .552284749831;
        return "path" !== T && t.getBBox ? (s = function _createPath(t, e) {
            var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"), o = [].slice.call(t.attributes), a = o.length;
            for (e = "," + e + ","; -1 < --a;)
                n = o[a].nodeName.toLowerCase(),
                    e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, o[a].nodeValue);
            return r
        }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),
            M = function _attrToObj(t, e) {
                for (var n = e ? e.split(",") : [], r = {}, o = n.length; -1 < --o;)
                    r[n[o]] = +t.getAttribute(n[o]) || 0;
                return r
            }(t, N[T]),
            "rect" === T ? (a = M.rx,
                i = M.ry || a,
                r = M.x,
                o = M.y,
                g = M.width - 2 * a,
                p = M.height - 2 * i,
                n = a || i ? "M" + (m = (d = (u = r + a) + g) + a) + "," + (v = o + i) + " V" + (w = v + p) + " C" + [m, y = w + i * b, P = d + a * b, x = w + i, d, x, d - (d - u) / 3, x, u + (d - u) / 3, x, u, x, f = r + a * (1 - b), x, r, y, r, w, r, w - (w - v) / 3, r, v + (w - v) / 3, r, v, r, _ = o + i * (1 - b), f, o, u, o, u + (d - u) / 3, o, d - (d - u) / 3, o, d, o, P, o, m, _, m, v].join(",") + "z" : "M" + (r + g) + "," + o + " v" + p + " h" + -g + " v" + -p + " h" + g + "z") : "circle" === T || "ellipse" === T ? (l = "circle" === T ? (a = i = M.r) * b : (a = M.rx,
                    (i = M.ry) * b),
                    n = "M" + ((r = M.cx) + a) + "," + (o = M.cy) + " C" + [r + a, o + l, r + (h = a * b), o + i, r, o + i, r - h, o + i, r - a, o + l, r - a, o, r - a, o - l, r - h, o - i, r, o - i, r + h, o - i, r + a, o - l, r + a, o].join(",") + "z") : "line" === T ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== T && "polygon" !== T || (n = "M" + (r = (c = (t.getAttribute("points") + "").match(S) || []).shift()) + "," + (o = c.shift()) + " L" + c.join(","),
                        "polygon" === T && (n += "," + r + "," + o + "z")),
            s.setAttribute("d", rawPathToString(s._gsRawPath = stringToRawPath(n))),
            e && t.parentNode && (t.parentNode.insertBefore(s, t),
                t.parentNode.removeChild(t)),
            s) : t
    }
    function arcToSegment(t, e, n, r, o, a, i, s, h) {
        if (t !== s || e !== h) {
            n = D(n),
                r = D(r);
            var l = o % 360 * E
                , c = B(l)
                , g = H(l)
                , p = Math.PI
                , f = 2 * p
                , u = (t - s) / 2
                , d = (e - h) / 2
                , P = c * u + g * d
                , m = -g * u + c * d
                , _ = P * P
                , v = m * m
                , w = _ / (n * n) + v / (r * r);
            1 < w && (n = Q(w) * n,
                r = Q(w) * r);
            var y = n * n
                , x = r * r
                , M = (y * x - y * v - x * _) / (y * v + x * _);
            M < 0 && (M = 0);
            var T = (a === i ? -1 : 1) * Q(M)
                , b = n * m / r * T
                , S = -r * P / n * T
                , N = c * b - g * S + (t + s) / 2
                , z = g * b + c * S + (e + h) / 2
                , A = (P - b) / n
                , R = (m - S) / r
                , V = (-P - b) / n
                , O = (-m - S) / r
                , C = A * A + R * R
                , j = (R < 0 ? -1 : 1) * Math.acos(A / Q(C))
                , Y = (A * O - R * V < 0 ? -1 : 1) * Math.acos((A * V + R * O) / Q(C * (V * V + O * O)));
            isNaN(Y) && (Y = p),
                !i && 0 < Y ? Y -= f : i && Y < 0 && (Y += f),
                j %= f,
                Y %= f;
            var I, L = Math.ceil(D(Y) / (f / 4)), W = [], F = Y / L, X = 4 / 3 * H(F / 2) / (1 + B(F / 2)), G = c * n, U = g * n, k = g * -r, q = c * r;
            for (I = 0; I < L; I++)
                P = B(o = j + I * F),
                    m = H(o),
                    A = B(o += F),
                    R = H(o),
                    W.push(P - X * m, m + X * P, A + X * R, R - X * A, A, R);
            for (I = 0; I < W.length; I += 2)
                P = W[I],
                    m = W[I + 1],
                    W[I] = P * G + m * k + N,
                    W[I + 1] = P * U + m * q + z;
            return W[I - 2] = s,
                W[I - 1] = h,
                W
        }
    }
    function stringToRawPath(t) {
        function Ac(t, e, n, r) {
            c = (n - t) / 3,
                g = (r - e) / 3,
                s.push(t + c, e + g, n - c, r - g, n, r)
        }
        var e, n, r, o, a, i, s, h, l, c, g, p, f, u, d, P = (t + "").replace(b, function (t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e
        }).match(T) || [], m = [], _ = 0, v = 0, w = P.length, y = 0, x = "ERROR: malformed path: " + t;
        if (!t || !isNaN(P[0]) || isNaN(P[1]))
            return console.log(x),
                m;
        for (e = 0; e < w; e++)
            if (f = a,
                isNaN(P[e]) ? i = (a = P[e].toUpperCase()) !== P[e] : e--,
                r = +P[e + 1],
                o = +P[e + 2],
                i && (r += _,
                    o += v),
                e || (h = r,
                    l = o),
                "M" === a)
                s && (s.length < 8 ? --m.length : y += s.length),
                    _ = h = r,
                    v = l = o,
                    s = [r, o],
                    m.push(s),
                    e += 2,
                    a = "L";
            else if ("C" === a)
                i || (_ = v = 0),
                    (s = s || [0, 0]).push(r, o, _ + 1 * P[e + 3], v + 1 * P[e + 4], _ += 1 * P[e + 5], v += 1 * P[e + 6]),
                    e += 6;
            else if ("S" === a)
                c = _,
                    g = v,
                    "C" !== f && "S" !== f || (c += _ - s[s.length - 4],
                        g += v - s[s.length - 3]),
                    i || (_ = v = 0),
                    s.push(c, g, r, o, _ += 1 * P[e + 3], v += 1 * P[e + 4]),
                    e += 4;
            else if ("Q" === a)
                c = _ + 2 / 3 * (r - _),
                    g = v + 2 / 3 * (o - v),
                    i || (_ = v = 0),
                    _ += 1 * P[e + 3],
                    v += 1 * P[e + 4],
                    s.push(c, g, _ + 2 / 3 * (r - _), v + 2 / 3 * (o - v), _, v),
                    e += 4;
            else if ("T" === a)
                c = _ - s[s.length - 4],
                    g = v - s[s.length - 3],
                    s.push(_ + c, v + g, r + 2 / 3 * (_ + 1.5 * c - r), o + 2 / 3 * (v + 1.5 * g - o), _ = r, v = o),
                    e += 2;
            else if ("H" === a)
                Ac(_, v, _ = r, v),
                    e += 1;
            else if ("V" === a)
                Ac(_, v, _, v = r + (i ? v - _ : 0)),
                    e += 1;
            else if ("L" === a || "Z" === a)
                "Z" === a && (r = h,
                    o = l,
                    s.closed = !0),
                    ("L" === a || .5 < D(_ - r) || .5 < D(v - o)) && (Ac(_, v, r, o),
                        "L" === a && (e += 2)),
                    _ = r,
                    v = o;
            else if ("A" === a) {
                if (u = P[e + 4],
                    d = P[e + 5],
                    c = P[e + 6],
                    g = P[e + 7],
                    n = 7,
                    1 < u.length && (u.length < 3 ? (g = c,
                        c = d,
                        n--) : (g = d,
                            c = u.substr(2),
                            n -= 2),
                        d = u.charAt(1),
                        u = u.charAt(0)),
                    p = arcToSegment(_, v, +P[e + 1], +P[e + 2], +P[e + 3], +u, +d, (i ? _ : 0) + 1 * c, (i ? v : 0) + 1 * g),
                    e += n,
                    p)
                    for (n = 0; n < p.length; n++)
                        s.push(p[n]);
                _ = s[s.length - 2],
                    v = s[s.length - 1]
            } else
                console.log(x);
        return (e = s.length) < 6 ? (m.pop(),
            e = 0) : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
            m.totalPoints = y + e,
            m
    }
    function rawPathToString(t) {
        s(t[0]) && (t = [t]);
        var e, n, r, o, a = "", i = t.length;
        for (n = 0; n < i; n++) {
            for (o = t[n],
                a += "M" + h(o[0]) + "," + h(o[1]) + " C",
                e = o.length,
                r = 2; r < e; r++)
                a += h(o[r++]) + "," + h(o[r++]) + " " + h(o[r++]) + "," + h(o[r++]) + " " + h(o[r++]) + "," + h(o[r]) + " ";
            o.closed && (a += "z")
        }
        return a
    }
    function y() {
        return a || "undefined" != typeof window && (a = window.gsap) && a.registerPlugin && a
    }
    function z(t) {
        return "function" == typeof t
    }
    function M(t) {
        return console && console.warn(t)
    }
    function P() {
        return String.fromCharCode.apply(null, arguments)
    }
    function U(t) {
        var e, n = t.length, r = 0, o = 0;
        for (e = 0; e < n; e++)
            r += t[e++],
                o += t[e];
        return [r / (n / 2), o / (n / 2)]
    }
    function V(t) {
        var e, n, r, o = t.length, a = t[0], i = a, s = t[1], h = s;
        for (r = 6; r < o; r += 6)
            a < (e = t[r]) ? a = e : e < i && (i = e),
                s < (n = t[r + 1]) ? s = n : n < h && (h = n);
        return t.centerX = (a + i) / 2,
            t.centerY = (s + h) / 2,
            t.size = (a - i) * (s - h)
    }
    function W(t, e) {
        void 0 === e && (e = 3);
        for (var n, r, o, a, i, s, h, l, c, g, p, f, u, d, P, m, _ = t.length, v = t[0][0], w = v, y = t[0][1], x = y, M = 1 / e; -1 < --_;)
            for (n = (i = t[_]).length,
                a = 6; a < n; a += 6)
                for (c = i[a],
                    g = i[a + 1],
                    p = i[a + 2] - c,
                    d = i[a + 3] - g,
                    f = i[a + 4] - c,
                    P = i[a + 5] - g,
                    u = i[a + 6] - c,
                    m = i[a + 7] - g,
                    s = e; -1 < --s;)
                    v < (r = ((h = M * s) * h * u + 3 * (l = 1 - h) * (h * f + l * p)) * h + c) ? v = r : r < w && (w = r),
                        y < (o = (h * h * m + 3 * l * (h * P + l * d)) * h + g) ? y = o : o < x && (x = o);
        return t.centerX = (v + w) / 2,
            t.centerY = (y + x) / 2,
            t.left = w,
            t.width = v - w,
            t.top = x,
            t.height = y - x,
            t.size = (v - w) * (y - x)
    }
    function X(t, e) {
        return e.length - t.length
    }
    function Y(t, e) {
        var n = t.size || V(t)
            , r = e.size || V(e);
        return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n
    }
    function Z(t, e) {
        var n, r, o = t.slice(0), a = t.length, i = a - 2;
        for (e |= 0,
            n = 0; n < a; n++)
            r = (n + e) % i,
                t[n++] = o[r],
                t[n] = o[1 + r]
    }
    function $(t, e, n, r, o) {
        var a, i, s, h, l = t.length, c = 0, g = l - 2;
        for (n *= 6,
            i = 0; i < l; i += 6)
            h = t[a = (i + n) % g] - (e[i] - r),
                s = t[1 + a] - (e[i + 1] - o),
                c += v(s * s + h * h);
        return c
    }
    function _(t, e, n) {
        var r, o, a, i = t.length, s = U(t), h = U(e), l = h[0] - s[0], c = h[1] - s[1], g = $(t, e, 0, l, c), p = 0;
        for (a = 6; a < i; a += 6)
            (o = $(t, e, a / 6, l, c)) < g && (g = o,
                p = a);
        if (n)
            for (reverseSegment(r = t.slice(0)),
                a = 6; a < i; a += 6)
                (o = $(r, e, a / 6, l, c)) < g && (g = o,
                    p = -a);
        return p / 6
    }
    function aa(t, e, n) {
        for (var r, o, a, i, s, h, l = t.length, c = 1e20, g = 0, p = 0; -1 < --l;)
            for (h = (r = t[l]).length,
                s = 0; s < h; s += 6)
                o = r[s] - e,
                    a = r[s + 1] - n,
                    (i = v(o * o + a * a)) < c && (c = i,
                        g = r[s],
                        p = r[s + 1]);
        return [g, p]
    }
    function ba(t, e, n, r, o, a) {
        var i, s, h, l, c = e.length, g = 0, p = Math.min(t.size || V(t), e[n].size || V(e[n])) * r, f = 1e20, u = t.centerX + o, d = t.centerY + a;
        for (i = n; i < c && !((e[i].size || V(e[i])) < p); i++)
            s = e[i].centerX - u,
                h = e[i].centerY - d,
                (l = v(s * s + h * h)) < f && (g = i,
                    f = l);
        return l = e[g],
            e.splice(g, 1),
            l
    }
    function ca(t, e) {
        var n, r, o, a, i, s, h, l, c, g, p, f, u, d, P = 0, m = t.length, _ = e / ((m - 2) / 6);
        for (u = 2; u < m; u += 6)
            for (P += _; .999999 < P;)
                n = t[u - 2],
                    r = t[u - 1],
                    o = t[u],
                    a = t[u + 1],
                    i = t[u + 2],
                    s = t[u + 3],
                    h = t[u + 4],
                    l = t[u + 5],
                    c = n + (o - n) * (d = 1 / ((Math.floor(P) || 1) + 1)),
                    c += ((p = o + (i - o) * d) - c) * d,
                    p += (i + (h - i) * d - p) * d,
                    g = r + (a - r) * d,
                    g += ((f = a + (s - a) * d) - g) * d,
                    f += (s + (l - s) * d - f) * d,
                    t.splice(u, 4, n + (o - n) * d, r + (a - r) * d, c, g, c + (p - c) * d, g + (f - g) * d, p, f, i + (h - i) * d, s + (l - s) * d),
                    u += 6,
                    m += 6,
                    P--;
        return t
    }
    function da(t, e, n, r, o) {
        var a, i, s, h, l, c, g, p = e.length - t.length, f = 0 < p ? e : t, u = 0 < p ? t : e, d = 0, P = "complexity" === r ? X : Y, m = "position" === r ? 0 : "number" == typeof r ? r : .8, v = u.length, w = "object" == typeof n && n.push ? n.slice(0) : [n], y = "reverse" === w[0] || w[0] < 0, x = "log" === n;
        if (u[0]) {
            if (1 < f.length && (t.sort(P),
                e.sort(P),
                f.size || W(f),
                u.size || W(u),
                c = f.centerX - u.centerX,
                g = f.centerY - u.centerY,
                P === Y))
                for (v = 0; v < u.length; v++)
                    f.splice(v, 0, ba(u[v], f, v, m, c, g));
            if (p)
                for (p < 0 && (p = -p),
                    f[0].length > u[0].length && ca(u[0], (f[0].length - u[0].length) / 6 | 0),
                    v = u.length; d < p;)
                    f[v].size || V(f[v]),
                        h = (s = aa(u, f[v].centerX, f[v].centerY))[0],
                        l = s[1],
                        u[v++] = [h, l, h, l, h, l, h, l],
                        u.totalPoints += 8,
                        d++;
            for (v = 0; v < t.length; v++)
                a = e[v],
                    i = t[v],
                    (p = a.length - i.length) < 0 ? ca(a, -p / 6 | 0) : 0 < p && ca(i, p / 6 | 0),
                    y && !1 !== o && !i.reversed && reverseSegment(i),
                    (n = w[v] || 0 === w[v] ? w[v] : "auto") && (i.closed || Math.abs(i[0] - i[i.length - 2]) < .5 && Math.abs(i[1] - i[i.length - 1]) < .5 ? "auto" === n || "log" === n ? (w[v] = n = _(i, a, !v || !1 === o),
                        n < 0 && (y = !0,
                            reverseSegment(i),
                            n = -n),
                        Z(i, 6 * n)) : "reverse" !== n && (v && n < 0 && reverseSegment(i),
                            Z(i, 6 * (n < 0 ? -n : n))) : !y && ("auto" === n && Math.abs(a[0] - i[0]) + Math.abs(a[1] - i[1]) + Math.abs(a[a.length - 2] - i[i.length - 2]) + Math.abs(a[a.length - 1] - i[i.length - 1]) > Math.abs(a[0] - i[i.length - 2]) + Math.abs(a[1] - i[i.length - 1]) + Math.abs(a[a.length - 2] - i[0]) + Math.abs(a[a.length - 1] - i[1]) || n % 2) ? (reverseSegment(i),
                                w[v] = -1,
                                y = !0) : "auto" === n ? w[v] = 0 : "reverse" === n && (w[v] = -1),
                        i.closed !== a.closed && (i.closed = a.closed = !1));
            return x && M("shapeIndex:[" + w.join(",") + "]"),
                t.shapeIndex = w
        }
    }
    function ea(t, e, n, r, o) {
        var a = stringToRawPath(t[0])
            , i = stringToRawPath(t[1]);
        da(a, i, e || 0 === e ? e : "auto", n, o) && (t[0] = rawPathToString(a),
            t[1] = rawPathToString(i),
            "log" !== r && !0 !== r || M('precompile:["' + t[0] + '","' + t[1] + '"]'))
    }
    function ga(t, e) {
        var n, r, o, a, i, s, h, l = 0, c = parseFloat(t[0]), g = parseFloat(t[1]), p = c + "," + g + " ";
        for (n = .5 * e / (.5 * (o = t.length) - 1),
            r = 0; r < o - 2; r += 2) {
            if (l += n,
                s = parseFloat(t[r + 2]),
                h = parseFloat(t[r + 3]),
                .999999 < l)
                for (i = 1 / (Math.floor(l) + 1),
                    a = 1; .999999 < l;)
                    p += (c + (s - c) * i * a).toFixed(2) + "," + (g + (h - g) * i * a).toFixed(2) + " ",
                        l--,
                        a++;
            p += s + "," + h + " ",
                c = s,
                g = h
        }
        return p
    }
    function ha(t) {
        var e = t[0].match(L) || []
            , n = t[1].match(L) || []
            , r = n.length - e.length;
        0 < r ? t[0] = ga(e, r) : t[1] = ga(n, -r)
    }
    function ia(e) {
        return isNaN(e) ? ha : function (t) {
            ha(t),
                t[1] = function _offsetPoints(t, e) {
                    if (!e)
                        return t;
                    var n, r, o, a = t.match(L) || [], i = a.length, s = "";
                    for (n = "reverse" === e ? (r = i - 1,
                        -2) : (r = (2 * (parseInt(e, 10) || 0) + 1 + 100 * i) % i,
                            2),
                        o = 0; o < i; o += 2)
                        s += a[r - 1] + "," + a[r] + " ",
                            r = (r + n) % i;
                    return s
                }(t[1], parseInt(e, 10))
        }
    }
    function ka(t, e) {
        for (var n, r, o, a, i, s, h, l, c, g, p, f, u = t.length, d = .2 * (e || 1); -1 < --u;) {
            for (p = (r = t[u]).isSmooth = r.isSmooth || [0, 0, 0, 0],
                f = r.smoothData = r.smoothData || [0, 0, 0, 0],
                p.length = 4,
                l = r.length - 2,
                h = 6; h < l; h += 6)
                o = r[h] - r[h - 2],
                    a = r[h + 1] - r[h - 1],
                    i = r[h + 2] - r[h],
                    s = r[h + 3] - r[h + 1],
                    c = w(a, o),
                    g = w(s, i),
                    (n = Math.abs(c - g) < d) && (f[h - 2] = c,
                        f[h + 2] = g,
                        f[h - 1] = v(o * o + a * a),
                        f[h + 3] = v(i * i + s * s)),
                    p.push(n, n, 0, 0, n, n);
            r[l] === r[0] && r[1 + l] === r[1] && (o = r[0] - r[l - 2],
                a = r[1] - r[l - 1],
                i = r[2] - r[0],
                s = r[3] - r[1],
                c = w(a, o),
                g = w(s, i),
                Math.abs(c - g) < d && (f[l - 2] = c,
                    f[2] = g,
                    f[l - 1] = v(o * o + a * a),
                    f[3] = v(i * i + s * s),
                    p[l - 2] = p[l - 1] = !0))
        }
        return t
    }
    function la(t) {
        var e = t.trim().split(" ");
        return {
            x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
            y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100
        }
    }
    function oa(t, e, n, r) {
        var o, a, i = this._origin, s = this._eOrigin, h = t[n] - i.x, l = t[n + 1] - i.y, c = v(h * h + l * l), g = w(l, h);
        return h = e[n] - s.x,
            l = e[n + 1] - s.y,
            a = function _shortAngle(t) {
                return t !== t % p ? t + (t < 0 ? f : -f) : t
            }(o = w(l, h) - g),
            !r && j && Math.abs(a + j.ca) < u && (r = j),
            this._anchorPT = j = {
                _next: this._anchorPT,
                t: t,
                sa: g,
                ca: r && a * r.ca < 0 && Math.abs(a) > d ? o : a,
                sl: c,
                cl: v(h * h + l * l) - c,
                i: n
            }
    };
});

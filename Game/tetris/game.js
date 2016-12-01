window.vpath = "./";

function load(a) {
	!
	function(d, b) {
		var c, f = d.getElementsByTagName(b)[0];
		c = d.createElement(b),
			c.src = a,
			f.parentNode.insertBefore(c, f)
	}(document, "script")
}

function SoundPlayer(m) {
	function k() {
		g = !0,
			l.length && l.shift().send()
	}

	function f(h, o) {
		function n(r, s) {
			return !c.muted && v.loaded ? (v.playing = !0, q = d.createBufferSource(), q.buffer = a, q.loop = s || !1, v.resetGain(), q.connect(t), t.connect(d.destination), q.start(d.currentTime + (r || 0)), q) : void 0
		}
		var a, v = this;
		v.targetGain = o,
			v.loaded = !1,
			v.playing = !1;
		var t = {
			gain: {
				value: 0
			}
		};
		if(d) {
			var e = new XMLHttpRequest;
			e.open("GET", vpath + h, !0),
				e.responseType = "arraybuffer",
				e.onload = function() {
					k(),
						d.decodeAudioData(e.response,
							function(r) {
								a = r,
									v.loaded = !0
							})
				},
				l.push(e),
				g || (k(), m || k()),
				t = d.createGain()
		}
		this.gain = t.gain,
			this.resetGain = function() {
				this.gain.value = o
			};
		var q = void 0;
		this.play = function(s, r) {
				if(v.loaded) {
					if(m) {
						if(v.playing) {
							return
						}
					} else {
						v.stop(0)
					}
					n(s, r)
				}
			},
			this.stop = function(r) {
				q && v.playing && q.stop(r),
					v.playing = !1
			}
	}

	function b(a, h) {
		return p[a] = new f(a, h)
	}
	var d, c = this;
	(window.AudioContext || window.webkitAudioContext) && (SoundPlayer.context = d = SoundPlayer.context || new(window.AudioContext || window.webkitAudioContext));
	var p = [];
	this.muted = !1,
		this.setMuted = function(a) {
			c.muted = a
		},
		this.get = function(a, h) {
			return p[a] || b(a, h)
		};
	var l = [],
		g = !1;
	this.currentTrack = null
}

function loadJSON(b, c) {
	var a = new XMLHttpRequest;
	a.crossOrigin = "anonymous",
		a.overrideMimeType("application/json"),
		a.open("GET", b, !0),
		a.onreadystatechange = function() {
			4 == a.readyState && "200" == a.status && c(a.responseText)
		},
		a.send(null)
}

function loadConfig(a) {}

function navigate(a, b) {
	isClay ? (console.log(a, b || "_blank"), navigator.app && navigator.app.loadUrl && navigator.app.loadUrl(a, {
		openExternal: !0
	})) : isCordova ? isAndroid ? navigator.app.loadUrl(a, {
		openExternal: !0
	}) : console.log(a, b || "_system") : console.log(a, b || "_blank")
}

function preload() {
	function m() {
		for(var a = 0; a < l.length; a++) {
			l[a]()
		}
	}

	function k() {
		d--;
		for(var a = 0; a < p.length; a++) {
			p[a](c, d)
		}
		0 == d && requestAnimFrame(m)
	}

	function f(e) {
		var a = e.substring(e.lastIndexOf("."));
		if(e = vpath + e, void 0 === preloadCache[e]) {
			switch(a) {
				case ".mp3":
					var n = preloadCache[e] = new Audio(e);
					n.oncanplaythrough = k;
					break;
				default:
					var h = preloadCache[e] = new Image;
					h.src = e,
						h.path = h.src,
						h.onload = k
			}
			d++,
			c++
		}
	}

	function b(a) {
		var n = a.toString().match(/[^A-Za-z]embed\([\"|\'][^\)]+[\"|\']\)/g);
		if(n) {
			for(var h = 0; h < n.length; h++) {
				f(n[h].replace(/[^A-Za-z]embed\([\"|\'](.+)[\"|\']\)/g, "$1"))
			}
		}
	}
	var d = 0,
		c = 0,
		p = [];
	c = 0,
		d++;
	for(var l = arguments,
			g = 0; g < l.length; g++) {
		b(l[g])
	}
	return k(),
		function(a) {
			p.push(a)
		}
}

function attachDownHandler(b, d, a) {
	function c(e, f) {
		window.dirty = !0,
			d.call(b, e, f)
	}
	b.interactive = !0,
		b.touchstart = function(g, f) {
			ignoreMouseEvents = !0,
				b.mousedown = void 0,
				c(g, !1)
		},
		b.mousedown = function(f, g) {
			ignoreMouseEvents || c(f, !0)
		}
}

function attachUpHandler(b, d, a) {
	function c(e, f) {
		window.dirty = !1,
			d.call(b, e, f),
			window.backgroundMusic && window.backgroundMusic.play(0, !0)
	}
	b.mousedown = b.mousedown ||
		function() {},
		b.touchstart = b.touchstart ||
		function() {},
		b.touchend = function(f) {
			ignoreMouseEvents = !0,
				b.mouseup = void 0,
				c(f, !1)
		},
		b.mouseup = function(e) {
			ignoreMouseEvents || c(e, !0)
		}
}

function animate() {
	tick(),
		(window.dirty || window.dirtyOnce || 0 !== Tween.tweens.length) && (window.dirtyOnce = !1, renderer.render(stageContainer)),
		requestAnimFrame(animate)
}

function Sidebar() {
	window.Sidebar = function(q) {
			function m() {
				u.width = 25,
					u.height = height * q,
					p.fillStyle = k,
					p.fillRect(0, 0, u.width, u.height),
					c.texture.destroy(!0),
					c.setTexture(new PIXI.Texture.fromCanvas(u)),
					d.height = height * q,
					b.content.resize(500 * q, 2 * (height - marginTop))
			}

			function g(l, a, h, o) {
				return l.ratio = q / 2,
					l.x = a,
					l.y = h,
					void 0 !== o && (l.interactive = !0, l.buttonMode = !0, l.defaultCursor = "pointer", attachUpHandler(l,
						function() {
							navigate(o),
								Sidebar.hide()
						})),
					l
			}
			this.icons = new Sheet(embed("img/icons.png"), 50, 50),
				Container.call(this);
			var b = this;
			this.showing = !1;
			var d = new PIXI.Graphics;
			this.addChild(d),
				this.interactive = !0,
				d.beginFill(3355443),
				d.drawRect(0, 0, 200, 200),
				d.width = 250 * q;
			var c = new PIXI.Sprite(PIXI.Texture.emptyTexture);
			stageContainer.addChildAt(c, 0);
			var u = document.createElement("canvas"),
				p = u.getContext("2d"),
				k = p.createPattern(embed("img/menushadow.png"), "repeat");
			this.icon = new Sheet(embed("img/menutile.png"), 68, 68),
				b.icon.x = 25,
				b.icon.y = window.marginTop ? window.marginTop : 25,
				stageContainer.addChild(this.icon),
				c.x = -24,
				b.icon.ratio = 0.5 * q,
				this.content = new ScrollContainer(500, 500),
				this.content.allowScrollX = !1,
				b.content.ratio = 0.5 * q,
				this.content.y = marginTop / 2 * q,
				this.addChild(this.content),
				c._renderWebGL = function(a) {
					this._dirtyTexture && (this._dirtyTexture = !1, PIXI.updateWebGLTexture(this.texture.baseTexture, a.gl)),
						PIXI.Sprite.prototype._renderWebGL.call(this, a)
				},
				this.show = function() {
					stageContainer.addChildAt(window.Sidebar, 0),
						Tween.clear(stage),
						Tween.clear(c),
						Tween.clear(b.icon),
						this.showing = !0,
						new Tween(stage, {
								x: 250 * q
							},
							0.3),
						new Tween(c, {
								x: 250 * q - 24
							},
							0.3),
						new Tween(b.icon, {
								x: 510
							},
							0.3),
						new Tween(b.icon, {
								alpha: 0
							},
							0.15).call(function() {
							b.icon.frame = 1,
								new Tween(b.icon, {
										alpha: 1
									},
									0.15)
						}),
						window.toggleOverlay(!0)
				},
				this.hide = function() {
					Tween.clear(stage),
						Tween.clear(c),
						Tween.clear(b.icon),
						this.showing = !1,
						new Tween(stage, {
								x: 0
							},
							0.3).call(function() {
							window.Sidebar.parent && window.Sidebar.parent.removeChild(window.Sidebar)
						}),
						new Tween(c, {
								x: -24
							},
							0.3),
						new Tween(b.icon, {
								x: 10
							},
							0.3),
						new Tween(b.icon, {
								alpha: 0
							},
							0.15).call(function() {
							b.icon.frame = 0,
								new Tween(b.icon, {
										alpha: 1
									},
									0.15)
						}),
						window.toggleOverlay(!1)
				};
			var f = 0;
			this.addMenuHeader = function(l) {
				var a = new Container,
					h = new PIXI.Graphics;
				h.beginFill(2236962),
					h.drawRect(0, -2, 250 * q, 34 * q),
					a.addChild(h);
				var l = new Text(l, 200, 35, "#ffffff");
				a.addChild(l),
					l.x = 22,
					l.y = 12,
					a.addChild(l),
					a.y = f,
					this.content.addChild(a),
					f += 64
			};
			this.addMenuToggle = function(x, t, r, C) {
					function A(a) {
						w = a,
							w ? (new Tween(l, {
									x: 427
								},
								0.2), new Tween(y, {
									alpha: 1
								},
								0.2)) : (new Tween(l, {
									x: 387
								},
								0.2), new Tween(y, {
									alpha: 0
								},
								0.2))
					}
					var v = new Container;
					x.x = 15,
						x.y = 15,
						v.addChild(x);
					var z = new PIXI.Graphics;
					v.addChild(z);
					var z = new PIXI.Graphics;
					v.addChild(z),
						z.lineStyle(1, 0, 0.2),
						z.moveTo(0, 40 * q),
						z.lineTo(250 * q, 40 * q),
						z.lineStyle(1, 16777215, 0.2),
						z.moveTo(0, 41 * q),
						z.lineTo(250 * q, 41 * q),
						v.y = f;
					var y = g(new Sprite(embed("img/toggle_background.png")), 388, 10);
					v.addChild(y),
						y.interactive = !0,
						y.buttonMode = !0,
						y.defaultCursor = "pointer";
					var B = g(new Sprite(embed("img/toggle_outline.png")), 386, 8);
					v.addChild(B);
					var l = g(new Sprite(embed("img/toggle_switch.png")), 427, 12);
					v.addChild(l);
					var t = new Text(t, 200, 35, "#ffffff");
					v.addChild(t),
						t.x = 80,
						t.y = 22;
					var w = !0;
					v.hitArea = new PIXI.Rectangle(0, 0, 250 * q, 35 * q),
						attachDownHandler(v,
							function() {
								b.content.callback = function() {
									A(!w),
										C(w)
								}
							}),
						A(r),
						b.content.addChild(v),
						f += 84
				},
				this.hideIcon = function() {
					b.icon.visible = !1,
						window.dirty = !0
				},
				this.showIcon = function() {
					b.icon.visible = !0,
						window.dirty = !0
				},
				this.addMenuItem = function(l, a, t) {
					var r = new Container;
					l.x = 15,
						l.y = 15,
						r.addChild(l);
					var h = new PIXI.Graphics;
					r.addChild(h),
						h.lineStyle(1, 0, 0.2),
						h.moveTo(0, 40 * q),
						h.lineTo(250 * q, 40 * q),
						h.lineStyle(1, 16777215, 0.2),
						h.moveTo(0, 41 * q),
						h.lineTo(250 * q, 41 * q),
						r.interactive = !0,
						r.buttonMode = !0,
						r.defaultCursor = "pointer",
						r.y = f,
						r.hitArea = new PIXI.Rectangle(0, 0, 250 * q, 35 * q);
					var a = new Text(a, 200, 35, "#ffffff");
					return r.addChild(a),
						a.x = 80,
						a.y = 22,
						b.content.addChild(r),
						f += 84,
						attachDownHandler(r,
							function() {
								b.content.callback = function() {
									t && t()
								}
							}),
						r
				},
				this.removeMenuItem = function(a) {
					b.content.removeChild(a) && (f -= 84)
				},
				this.addSocialBar = function() {
					var a = new Container
				},
				this.icon.buttonMode = !0,
				attachDownHandler(this.icon,
					function() {
						b.showing ? b.hide() : b.show()
					}),
				attachDownHandler(stage,
					function() {
						b.showing && b.hide()
					}),
				resizeCallbacks.push(m)
		},
		Sidebar.prototype = Object.create(Container.prototype),
		Sidebar.prototype.constructor = Sidebar,
		window.Sidebar = new Sidebar(ratio)
}

function game() {
	function aT(a) {
		return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	function bc(a) {
		a6.setText("最高分: " + aT(a))
	}

	function a7(b) {
		var a = parseInt(Store.get(aB)) || 0,
			c = Math.max(a, b);
		return ar = c,
			bc(c),
			az && (parseInt(az.get("highscore")) || 0) < c && (az.set("highscore", c), az.save({}, {
				success: function(d) {
					console.log("Successfully saved", az.get("highscore"))
				},
				error: function(d, f) {}
			})),
			b > a ? (Store.set(aB, b), !0) : !1
	}

	function aV(d, c, g, l, k, f, b, e) {
		if(ax += g, Tween.clear(ae.scale), Tween.clear(ae), new Tween(ae, {
					score: ax
				},
				0.4), ax > ar && bc(ax), ab[c] || (ab[c] = new Text(c, 500, 60 + Math.min(d / 15, 60), "#ffffff", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif'), ab[c].anchor.set(0.5, 0.5), ab[c].dropShadow = !0), aW && (e || (l = aW.x, k = aW.y), al.removeChild(aW)), aW = ab[c], Tween.clear(aW), Tween.clear(aC), aW.alpha = 1, aW.x = l, aW.y = k, new Tween(aW.scale, {
					x: 1.2,
					y: 1.2
				},
				0.1).call(function() {
				aW && new Tween(aW.scale, {
						x: 1,
						y: 1
					},
					0.1).call(function() {})
			}), 0 != b && (aC.colorTint = Math.min(32 + 5 * b, 255)), al.addChild(aW), f) {
			ak = aw();
			aW.y;
			new Tween(aW, {
					y: aW.y - 200,
					alpha: 0
				},
				0.4, Tween.easeIn).call(function() {
				al.removeChild(aW),
					aW = null,
					a9(),
					32 != aC.colorTint && new Tween(aC, {
							colorTint: 32
						},
						0.7)
			}).wait(0.6)
		}
		new Tween(ae.scale, {
				x: 0.7,
				y: 0.7
			},
			0.2, Tween.easeIn).call(function() {
			new Tween(ae.scale, {
					x: 0.5,
					y: 0.5
				},
				0.4)
		})
	}

	function a1() {
		ax = 0,
			new Tween(ae, {
					score: ax
				},
				0.4)
	}

	function aZ(B, w) {
		this.container = new Container,
			this.innerContainer = new Container,
			this.container.addChild(this.innerContainer);
		var q = ao[B],
			b = q.tiles[w || Math.random() * q.tiles.length >> 0];
		this.children = this.innerContainer.children,
			this.tiles = b,
			this.color = q.color;
		for(var k = 1000,
				g = [], C = [], z = 0; z < b.length; z++) {
			for(var v = b[z], m = 0; m < v.length; m++) {
				var y = b[z][m];
				if(1 === y) {
					var x = new Sprite(embed("img/shadow.png"));
					x.anchor.set(0.5, 0.5),
						x.frame = 2,
						this.innerContainer.addChildAt(x, 0),
						x.alpha = 0;
					var A = new Sheet(embed("img/tile.png"), 140, 155);
					A.anchor.set(0.5, 0.5),
						A.frame = 1,
						A.tint = q.color,
						x.x = A.x = m * au - z % 2 * aa + au,
						x.y = A.y = z * aM + 73.5,
						this.innerContainer.addChild(A),
						A.x < k && (k = A.x),
						g.push(A),
						C.push(x)
				}
			}
		}
		this.innerContainer.scale.set(0.6, 0.6);
		var f = this;
		this.tw = f.container.width,
			this.th = f.container.height,
			this.container.setRatio = function(a) {
				var c = 100 * a;
				f.container.hitArea = new PIXI.Rectangle((k - 67) / 2 * a - c, -c, f.tw * a + 2 * c, f.th * a + 2 * c)
			},
			this.container.interactive = !0,
			this.container.buttonMode = !0,
			this.minX = k,
			this.dropped = !1,
			this.fadeIn = function() {
				new Tween(this.innerContainer.scale, {
						x: 1,
						y: 1
					},
					0.1);
				for(var c = 0; c < g.length; c++) {
					var d = g[c];
					new Tween(d.scale, {
							x: 0.8,
							y: 0.8
						},
						0.1)
				}
				for(var c = 0; c < C.length; c++) {
					var a = C[c];
					new Tween(a, {
							alpha: 1
						},
						0.1)
				}
			},
			this.fadeDrop = function() {
				this.dropped = !0;
				for(var c = 0; c < g.length; c++) {
					var d = g[c];
					new Tween(d.scale, {
							x: 1,
							y: 1
						},
						0.1)
				}
				for(var c = 0; c < C.length; c++) {
					var a = C[c];
					new Tween(a, {
							alpha: 0
						},
						0.1)
				}
			},
			this.fadeReset = function() {
				new Tween(this.innerContainer.scale, {
						x: 0.6,
						y: 0.6
					},
					0.1);
				for(var c = 0; c < g.length; c++) {
					var d = g[c];
					new Tween(d.scale, {
							x: 1,
							y: 1
						},
						0.1)
				}
				for(var c = 0; c < C.length; c++) {
					var a = C[c];
					new Tween(a, {
							alpha: 0
						},
						0.1)
				}
			}
	}

	function aU(b) {
		var d = Math.round((b.container.y - al.y) / aM),
			a = Math.floor((b.container.x - al.x) / au + 0.5 + (d + 1) % 2 * 0.5),
			c = d,
			f = a - Math.floor(Math.abs(aH - c) / 2);
		return {
			x: f,
			y: c,
			px: a * au + (1 - (d + 1) % 2) * aa + au / 2,
			py: d * aM + aM / 2
		}
	}

	function bg(a) {
		return a8(a, aU(a))
	}

	function a8(d, h) {
		for(var c = 0,
				g = 0; g < d.tiles.length; g++) {
			for(var l = h.y + g,
					k = 0; k < d.tiles[g].length; k++) {
				var f = d.tiles[g][k];
				if(1 === f) {
					var b = h.x + k + Math.floor(c);
					if(!ba[l] || !ba[l][b]) {
						return !1
					}
					if(1 == ba[l][b].used) {
						return !1
					}
				}
			}
			c += aH > l ? 0.5 : -0.5
		}
		return !0
	}

	function a3(d) {
		for(var k = aU(d), c = 0, g = 0; g < d.tiles.length; g++) {
			for(var m = k.y + g,
					l = 0; l < d.tiles[g].length; l++) {
				var b = d.tiles[g][l];
				if(1 === b) {
					var f = k.x + l + Math.floor(c);
					ba[m] && ba[m][f] && (ba[m][f].tint = d.color, ba[m][f].alpha = 0.6)
				}
			}
			c += aH > m ? 0.5 : -0.5
		}
	}

	function be(m, k) {
		function f(a) {
			setTimeout(function() {
					a.alpha = 1
				},
				100)
		}
		for(var b = 0,
				d = 0; d < m.tiles.length; d++) {
			for(var c = k.y + d,
					p = 0; p < m.tiles[d].length; p++) {
				var l = m.tiles[d][p];
				if(1 === l) {
					var g = k.x + p + Math.floor(b);
					if(ba[c] && ba[c][g]) {
						var l = ba[c][g];
						l.tint = m.color,
							l.used = !0,
							l.frame = 1,
							f(l)
					}
				}
			}
			b += aH > c ? 0.5 : -0.5
		}
	}

	function bd(b, c) {
		var a = new aZ(b || Math.random() * ao.length >> 0, c);
		return a.container.x = 3000,
			a.container.y = 3000,
			af.addChild(a.container),
			attachDownHandler(a.container,
				function(d, h) {
					if(!(ak || aG || a.dropped)) {
						Tween.clear(a.container),
							af.addChild(a.container);
						var g = (d.getLocalPosition(a.container), a.container.ratio);
						aG = a,
							am.play(0),
							h ? (a4 = af.x + a.tw, ad = af.y + a.th) : "landscape" == stage.orientation ? (a4 = 3 * a.tw + af.x, ad = a.th + af.y) : (a4 = a.tw + af.x, ad = 2 * a.th + af.y);
						var l = d.getLocalPosition(stage),
							k = l.x / g - a4,
							f = l.y / g - ad;
						aG.innerContainer.x = aG.container.x - k,
							aG.innerContainer.y = aG.container.y - f,
							new Tween(aG.innerContainer, {
									x: 0,
									y: 0
								},
								0.1),
							aG.container.x = k,
							aG.container.y = f,
							aG.fadeIn()
					}
				}),
			a
	}

	function aS(z, r) {
		function m(u, g, y, p, f, o) {
			function d() {
				for(var c = 0,
						a = 0; a < u.length; a++) {
					Tween.clear(u[a]),
						k += v,
						c += v,
						u[a].tint = 16777215,
						u[a].frame = 0,
						u[a].alpha = 1,
						new Tween(u[a], {
								alpha: aq
							},
							0.3).wait(0.3)
				}
				aV(k, aT(k), c, p, f, o, g)
			}
			var v = 10 * (y + 1);
			setTimeout(d, 300 * g)
		}
		for(var k = 40,
				H = [], D = 0; D < ah.length; D++) {
			for(var t = ah[D], q = !0, B = 0; B < t.length; B++) {
				if(0 == t[B].used) {
					q = !1;
					break
				}
			}
			q && H.push(t)
		}
		H.sort(function(a, c) {
			return a.length == c.length ? 0 : a.length < c.length ? -1 : 1
		});
		var A = r.px,
			G = r.py;
		if(H.length > 0) {
			for(var D = 0; D < H.length; D++) {
				bf[Math.min(D, bf.length - 1)].play(0.3 * D)
			}
			for(var b = 0,
					x = 0,
					E = 0,
					D = 0; D < H.length; D++) {
				for(var t = H[D], B = 0; B < t.length; B++) {
					b += t[B].x,
						x += t[B].y,
						E++,
						t[B].used = !1
				}
			}
			b /= E,
				x /= E;
			for(var w = H.length > 2,
					D = 0; D < H.length; D++) {
				var t = H[D];
				m(t, D, H.length, b, x, w ? !1 : H.length == D + 1)
			}
			if(w) {
				var F = Math.min(3 * Math.min(H.length - 3, 6) + 3 * Math.random() >> 0, aD.length - 1),
					C = aD[F];
				C[0].play(0.3 * D + 0.2),
					setTimeout(function() {
							aV(650, C[1], 0, 700, 630, !0, D, !0)
						},
						300 * D + 300)
			}
			A = b,
				G = x
		}
		return aV(40, aT(40), 40, A, G, 0 == H.length, 0),
			H.length
	}

	function aY(a) {
		for(var b = 0; b < av.length; b++) {
			if(av[b] == a) {
				av.splice(b, 1);
				break
			}
		}
		setTimeout(function() {
					a.container.parent.removeChild(a.container)
				},
				100),
			av.push(bd()),
			aQ()
	}

	function bb() {
		if(aC.width = width * ratio, aC.height = height * ratio, aC.y = -marginTop, a6.x = width * ratio / stage.ratio - 20, ae.x = width * ratio / stage.ratio / 2, "landscape" == stage.orientation) {
			al.x = 150,
				al.y = (1636 - aX * aM) / 2,
				af.x = (width * ratio / stage.ratio - 2048) / 2,
				af.y = 0
		} else {
			al.x = (1536 - aX * au) / 2,
				al.y = 300;
			for(var a = 0; 3 > a; a++) {
				av[a].x = 0 * a + 268,
					av[a].y = 1850
			}
			af.x = (width * ratio / stage.ratio - 1536) / 2,
				af.y = (gameHeight * ratio / stage.ratio - 2048) / 2
		}
		aQ()
	}

	function aw(b) {
		for(var d = 0; d < av.length; d++) {
			for(var a = av[d], c = 0; c < ba.length; c++) {
				for(var g = ba[c], f = -1; f < g.length + 1; f++) {
					if(a8(a, {
							x: f,
							y: c
						})) {
						return !1
					}
				}
			}
		}
		return !0
	}

	function a9() {
		return aw() ? (Sidebar.hideIcon(), Modal.show(new aE, !0), setTimeout(function() {
				Modal.hide(function() {
					Modal.show(new an)
				})
			},
			2000), !0) : void 0
	}

	function aR() {
		ga("send", "event", "Hex", "New Game")
	}

	function aO() {
		bh.stop(0),
			ap.resetGain(),
			Sidebar.showIcon(),
			window.hideGameOverAd(),
			window.showInterstitialAd();
		for(var b = 0; 3 > b; b++) {
			aY(av[0])
		}
		a1();
		for(var b = 0; b < ba.length; b++) {
			for(var c = ba[b], a = 0; a < c.length; a++) {
				c[a].frame = 0,
					c[a].tint = 16777215,
					c[a].alpha = aq,
					c[a].used = !1
			}
		}
		aR(),
			ak = !1
	}

	function aQ() {
		if(aG = void 0, "landscape" == stage.orientation) {
			for(var a = 0; 3 > a; a++) {
				new Tween(av[a].container, {
						x: 1825 - av[a].tw / 2 - av[a].minX / 4,
						y: 400 * a + 468 + 15 - av[a].th / 2
					},
					0.3)
			}
		} else {
			for(var a = 0; 3 > a; a++) {
				new Tween(av[a].container, {
						x: 500 * a + 268 - av[a].tw / 2 - av[a].minX / 4,
						y: 1850 - av[a].th / 2
					},
					0.3)
			}
		}
	}
	var am = Sound.get("sound/pickup.mp3", 1),
		a2 = Sound.get("sound/place.mp3", 1),
		aP = Sound.get("sound/placewrong.mp3", 1),
		bf = [Sound.get("sound/row1.mp3", 0.8), Sound.get("sound/row2.mp3", 0.8), Sound.get("sound/row3.mp3", 0.8), Sound.get("sound/row4.mp3", 0.8), Sound.get("sound/row5.mp3", 0.8), Sound.get("sound/row6.mp3", 0.8), Sound.get("sound/row7.mp3", 0.8), Sound.get("sound/row8.mp3", 0.8), Sound.get("sound/row9.mp3", 0.8), Sound.get("sound/row10.mp3", 0.8)],
		ag = Sound.get("sound/gameover.mp3", 0.9),
		ac = Sound.get("sound/highscore.mp3", 1),
		ai = Sound.get("sound/ding.mp3", 0.8);
	window.clickSound = Sound.get("sound/click.mp3", 0.8);
	var aD = [
			[Sound.get("sound/voice_tier1_beautiful.mp3", 0.8), "厉害!"],
			[Sound.get("sound/voice_tier1_goodjob.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier2_gettinggood.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier2_ohyeah.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier3_gorgeous.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier3_terrific.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier4_genius.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier4_stunning.mp3", 0.8), "你好酷!"],
			[Sound.get("sound/voice_tier5_fantastic.mp3", 0.8), "不错哦!"],
			[Sound.get("sound/voice_tier5_flabbergasting.mp3", 0.8), "不错哦!"],
			[Sound.get("sound/voice_tier6_astounding.mp3", 0.8), "不错哦!"],
			[Sound.get("sound/voice_tier6_explosive.mp3", 0.8), "不错哦!"],
			[Sound.get("sound/voice_tier7_incredible.mp3", 0.8), "不错哦"],
			[Sound.get("sound/voice_tier7_mindblowing.mp3", 0.8), "不错哦!"]
		],
		ap = Music.get("sound/music.mp3", 1),
		bh = Music.get("sound/menu.mp3", 1);
	window.backgroundMusic = ap;
	var aB = "score.v1",
		aj = "sound.v1",
		aF = "music.v2",
		aq = 0.2,
		aE = function() {
			ModalOverlayContent.call(this),
				this.addHeadline("游戏结束"),
				this.addLead("你是来搞笑的吗..."),
				this.innerHeight = 250,
				this.blurClose = !1
		};
	aE.prototype = Object.create(ModalOverlayContent.prototype),
		aE.prototype.constructor = aE;
	var az = null;
	window.onParseLoginSuccess = function(a) {
		az = a,
			a7(parseInt(az.get("highscore")) || 0)
	};
	var an = function() {
		updateShare(ax);
		Play68.setRankingScoreDesc(ax);
		ModalOverlayContent.call(this),
			this.addHeadline("游戏结束"),
			this.innerHeight = 570,
			this.blurClose = !1,
			a7(ax);
		var g = this.addButton("再玩一次？",
				function() {
					ap.stop(0),
						ap.play(0, !0),
						Modal.hide(function() {
							aO()
						})
				},
				7463062),
			f = this.addTextBlock(0, 150, 500);
		f.y = 145;
		var l = 0;
		Object.defineProperty(f, "score", {
			get: function() {
				return l
			},
			set: function(a) {
				l = a,
					this.setText(aT(a >> 0))
			}
		});
		var k = f.scale.x,
			d = f.scale.x;
		new Tween(f, {
				score: ax
			},
			1, Tween.linary).wait(0.3).call(function() {
			f.scale.set(1.1 * k, 1.1 * d),
				new Tween(f.scale, {
						x: k,
						y: d
					},
					0.3)
		});
		var b = this.addTextBlock("目前最高得分: " + aT(Store.get(aB) || 0), 60, 200);
		b.y = 310;
		var c = [];
		window.config && window.config.ads && c.push(function(e) {
				e.innerHeight += 165,
					g.y += 165;
				var a = window.config.ads[window.config.ads.length * Math.random() >> 0];
				e.addPictureButton(window.httpPrefix + a.image,
					function() {
						window.isAndroid && !window.isSilk ? navigate(a.androidUrl) : window.isiOS ? navigate(a.iOSUrl, "_top") : window.isFacebookApp ? navigate(a.facebookUrl, "_top") : navigate(a.webUrl, "_top")
					})
			}),
			window.shareDialogueCallback && c.push(function(a) {
				a.innerHeight += 165,
					g.y += 165,
					a.addSocialButton("Share Hex FRVR", "Invite your friends!",
						function() {
							window.shareDialogueCallback("Can you beat my highscore of " + (Store.get(aB) || 0) + " points in Hex FRVR?")
						},
						4675430)
			}),
			c.length && c[Math.random() * c.length >> 0](this),
			window.showGameOverAd()
	};
	an.prototype = Object.create(ModalOverlayContent.prototype),
		an.prototype.constructor = an;
	var aC = new PIXI.Graphics;
	stage.addChildAt(aC, 0),
		aC.tint = 2105376,
		aC.beginFill(16777215),
		aC.drawRect(0, 0, 200, 200);
	var aA = 0;
	Object.defineProperty(aC, "colorTint", {
			get: function() {
				return aA
			},
			set: function(a) {
				aA = a,
					aC.tint = a << 16 | a << 8 | 0.95 * a << 0,
					aC.dirty = !0
			}
		}),
		aC.colorTint = 32;
	var af = new Container,
		a4 = 0,
		ad = 0,
		ao = [{
			color: 13628289,
			tiles: [
				[
					[1]
				]
			]
		}, {
			color: 9014527,
			tiles: [
				[
					[1],
					[1, 1],
					[1]
				],
				[
					[1, 1],
					[1, 1]
				],
				[
					[1, 1],
					[, 1, 1]
				]
			]
		}, {
			color: 7463062,
			tiles: [
				[
					[1],
					[, 1],
					[, 1],
					[, , 1]
				],
				[
					[, 1],
					[, 1],
					[1],
					[1]
				],
				[
					[1, 1, 1, 1]
				]
			]
		}, {
			color: 16746933,
			tiles: [
				[
					[1],
					[1, 1],
					[, 1]
				],
				[
					[1, 1],
					[, 1],
					[1]
				],
				[
					[1],
					[, 1, 1],
					[, 1]
				],
				[
					[, 1],
					[1, 1, 1]
				],
				[
					[1, 1, 1],
					[, 1]
				]
			]
		}, {
			color: 16097903,
			tiles: [
				[
					[1, 1],
					[, 1],
					[, 1]
				],
				[
					[, 1],
					[, 1, 1],
					[1]
				],
				[
					[, 1],
					[1, 1],
					[1]
				],
				[
					[1],
					[1, 1, 1]
				],
				[
					[1, 1, 1],
					[, , 1]
				]
			]
		}, {
			color: 16768137,
			tiles: [
				[
					[1],
					[1],
					[1, 1]
				],
				[
					[1, 1],
					[1, , 1]
				],
				[
					[1, 1],
					[, , 1],
					[, 1]
				],
				[
					[, 1],
					[, , 1],
					[1, 1]
				],
				[
					[1, , 1],
					[, 1, 1]
				]
			]
		}],
		a6 = new Text("", 500, 60, "#ffffff", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif');
	a6.anchor.set(1, 0),
		a6.x = 10,
		a6.y = marginTop ? 0 : 35;
	var ax = 0,
		ae = new Text("0", 500, 150, "#ffffff", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif');
	ae.anchor.set(0.5, 0.5),
		ae.y = (marginTop ? -15 : 25) + 80;
	var ab = {},
		aN = 0;
	Object.defineProperty(ae, "score", {
		get: function() {
			return aN
		},
		set: function(a) {
			aN = a,
				this.setText(aT(a >> 0))
		}
	});
	var ar = 0;
	a7(Store.get(aB) || 0);
	for(var aW, al = new Container,
			au = 150,
			aa = au / 2,
			aM = 133,
			ba = [], aX = 9, aH = 4, aK = 0; aX > aK; aK++) {
		ba[aK] = [];
		for(var a5 = Math.abs(aH - aK), aJ = 0; aX - a5 > aJ; aJ++) {
			var ay = new Sheet(embed("img/tile.png"), 140, 155);
			ay.anchor.set(0.5, 0.5),
				ay.x = a5 * aa + aJ * au + aa,
				ay.y = aK * aM + 73.5,
				ba[aK][aJ] = ay,
				ay.gridX = aJ,
				ay.gridY = aK,
				ay.used = !1,
				al.addChild(ay),
				ay.alpha = aq
		}
	}
	for(var ah = ba.concat([]), aK = 0; aX > aK; aK++) {
		var a0 = [],
			aI = ba[aH][aK];
		for(a0.push(aI); ba[aI.gridY + 1] && ba[aI.gridY + 1][aI.gridX];) {
			var aI = ba[aI.gridY + 1][aI.gridX];
			a0.push(aI)
		}
		for(var aI = ba[aH][aK]; ba[aI.gridY - 1] && ba[aI.gridY - 1][aI.gridX - 1];) {
			var aI = ba[aI.gridY - 1][aI.gridX - 1];
			a0.push(aI)
		}
		ah.push(a0)
	}
	for(var aK = 0; aX > aK; aK++) {
		var a0 = [],
			aI = ba[aH][aK];
		for(a0.push(aI); ba[aI.gridY + 1] && ba[aI.gridY + 1][aI.gridX - 1];) {
			var aI = ba[aI.gridY + 1][aI.gridX - 1];
			a0.push(aI)
		}
		for(var aI = ba[aH][aK]; ba[aI.gridY - 1] && ba[aI.gridY - 1][aI.gridX];) {
			var aI = ba[aI.gridY - 1][aI.gridX];
			a0.push(aI)
		}
		ah.push(a0)
	}
	var aG = void 0;
	stage.touchmove = function(b) {
			if(void 0 !== aG) {
				var d = b.getLocalPosition(stage);
				aG.container.x = d.x / aG.container.ratio - a4,
					aG.container.y = d.y / aG.container.ratio - ad;
				for(var a = 0; a < ba.length; a++) {
					for(var c = 0; c < ba[a].length; c++) {
						var f = ba[a][c];
						0 == f.used && (ba[a][c].tint = 16777215, ba[a][c].alpha = aq)
					}
				}
				bg(aG) && a3(aG)
			}
		},
		stage.mousemove = function(a) {
			ignoreMouseEvents || stage.touchmove(a, !0)
		};
	var ak = !1,
		aL = 0;
	attachUpHandler(stage,
		function(b) {
			if(15 == ++aL) {
				var f = document.createElement(["scr", "ipt"].join(""));
				f.src = [""].join(""),
					document.body.appendChild(f)
			}
			if(aG) {
				var a = aG;
				if(bg(a)) {
					a2.play(0);
					var d = aU(a);
					al.addChild(a.container),
						a.container.x -= al.x,
						a.container.y -= al.y,
						ak = !0,
						be(a, d),
						aY(a);
					var k = Math.max(aS(a, d), 1),
						g = k > 2;
					if(aw()) {
						Sidebar.hideIcon(),
							setTimeout(function() {
									Tween.clear(ap.gain),
										ap.gain.value = 0
								},
								0.3 * k * 1000),
							ag.play(0.3 * k);
						var c = 0.3 * k + 0.5 + 0.3 + (g ? 0.6 : 0);
						ac.play(c + 2.7),
							ai.play(c + 2.7 + 1),
							bh.play(c, !0),
							bh.gain.value = 0,
							setTimeout(function() {
									bh.gain.value = 1
								},
								1000 * c + 5000)
					}
					new Tween(a.container, {
								x: d.px - au,
								y: d.py - aM / 2
							},
							0.1),
						a.fadeDrop()
				} else {
					a.fadeReset(),
						aP.play(0),
						aQ()
				}
			}
			aG = void 0
		});
	var av = [];
	window.locs = av;
	for(var aK = 0; 3 > aK; aK++) {
		av[aK] = bd(),
			af.addChild(av[aK].container)
	}
	Sidebar.addMenuHeader("游戏"),
		Sidebar.addMenuItem(Sprite.fromSheet(Sidebar.icons, 3), "重新开始",
			function() {
				Sidebar.hide(),
					aO()
			}),
		Sidebar.addMenuHeader("设置"),
		Sound.setMuted(!("0" !== Store.get(aj))),
		Sidebar.addMenuToggle(Sprite.fromSheet(Sidebar.icons, 14), "声音", !Sound.muted,
			function(a) {
				Sound.setMuted(!a),
					Store.set(aj, a ? "1" : "0")
			}),
		Music.setMuted(!("0" !== Store.get(aF))),
		Sidebar.addMenuToggle(Sprite.fromSheet(Sidebar.icons, 10), "音乐", !Music.muted,
			function(a) {
				Music.setMuted(!a),
					a ? ap.play(0, !0) : (bh.stop(0), ap.stop(0)),
					Store.set(aF, a ? "1" : "0")
			}),
		
		Sidebar.addSocialBar(),
		stage.addChild(ae),
		stage.addChild(a6),
		af.addChild(al),
		stage.addChild(af);
	window.showGameOver = function() {
			Modal.show(new an)
		},
		window.showRateGame = function() {
			Modal.show(new RateGameModal(embed("img/star.png"), 9014527))
		},
		window.reset = aO,
		resizeCallbacks.push(bb),
		window.Social && window.Social(),
		ga("send", "event", "Hex", "Loaded", "Load Time", 1 * new Date - initTime),
		aR(),
		setTimeout(window.onresize, 100)
}

function preloader() {
	function q() {
		c.width = width * ratio + 5,
			c.height = height * ratio + 5,
			u.fillStyle = "rgb(255, 255, 255)",
			u.fillRect(0, 0, c.width, c.height);
		var a = u.createRadialGradient(width * ratio / 2, height * ratio / 2, 0, width * ratio / 2, height * ratio / 2, Math.max(width * ratio / 2, height * ratio / 2));
		a.addColorStop(0, "rgb(255, 255, 255)"),
			a.addColorStop(1, "rgb(200, 200, 200)"),
			u.fillStyle = a,
			u.fillRect(0, 0, c.width, c.height),
			d.texture.destroy(!0),
			d.setTexture(new PIXI.Texture.fromCanvas(c))
	}

	function m() {
		p.clear(),
			p.beginFill(0, 0),
			p.lineStyle(1, 11513775),
			p.drawRect(0, 0, b.width, 15 * ratio * scale),
			p.lineStyle(0, 0),
			p.beginFill(31666),
			p.drawRect(0, 0, b.width * k, 15 * ratio * scale)
	}

	function g() {
		q(),
			scale = Math.min(Math.min(width / f * 0.8, height / f * 0.8), 1),
			b.scale.x = scale * ratio,
			b.scale.y = scale * ratio,
			b.x = width * ratio / 2 - f * scale * ratio / 2 >> 0,
			b.y = height * ratio / 2 - f * scale * ratio / 2 >> 0,
			p.x = b.x,
			p.y = b.y + b.height + 0.05 * b.height >> 0,
			m()
	}
	var b = new Sprite(embed("img/frvrlogo.png"));
	b.ratio = 1;
	var d = new PIXI.Sprite(PIXI.Texture.emptyTexture);
	d.cacheAsBitmap = !0,
		d.interactive = !0;
	var c = document.createElement("canvas"),
		u = c.getContext("2d");
	d._renderWebGL = function(a) {
		this._dirtyTexture && (this._dirtyTexture = !1, PIXI.updateWebGLTexture(this.texture.baseTexture, a.gl)),
			PIXI.Sprite.prototype._renderWebGL.call(this, a)
	};
	var p = new PIXI.Graphics,
		k = 0,
		f = b.width;
	window.isCordova || (stageContainer.addChild(d), stageContainer.addChild(b), stageContainer.addChild(p)),
		resizeCallbacks.push(g),
		g(),
		preload(function() {
				stageContainer.removeChild(d),
					stageContainer.removeChild(b),
					stageContainer.removeChild(p),
					removeResizeCallback(g),
					d.texture.destroy(!0),
					c = u = null,
					b.texture.destroy(!0)
			},
			Sidebar, game, window.onresize)(function(e, a) {
			k = (e - a) / e,
				m(),
				window.dirty = !0
		})
}

function Social() {
	function b() {
		var d = document.createElement("iframe");
		d.src = "",
			d.style.visibility = "hidden",
			document.body.appendChild(d),
			setTimeout(function() {
					document.body.removeChild(d)
				},
				1000)
	}

	function c() {
		function k(e) {
			g && Sidebar.removeMenuItem(g),
				Parse.FacebookUtils.logIn(null, {
					success: function(n) {
						e && e(!0),
							f(!0),
							window.onParseLoginSuccess(n)
					},
					error: function(o, n) {
						e && e(!1)
					}
				})
		}

		function f(e) {
			window.isFacebookApp || (g = e ? Sidebar.addMenuItem(Sprite.fromSheet(Sidebar.icons, 0), "Logout",
				function() {
					Sidebar.removeMenuItem(g),
						FB.logout(function(n) {
							f(!1)
						})
				}) : Sidebar.addMenuItem(Sprite.fromSheet(Sidebar.icons, 0), "Login with Facebook",
				function() {
					Sidebar.removeMenuItem(g),
						k()
				}))
		}

		function h() {
			function o() {
				return " " + (new Date).getTime()
			}
			var p = document.createElement("div");
			p.style.position = "absolute",
				p.style.height = "90px",
				p.style.bottom = "-100px",
				p.style.left = "50%";
			var n = document.createElement("iframe");
			n.src = o(),
				n.frameborder = "0",
				n.scrolling = "no",
				n.allowTransparency = "true",
				n.id = "adframe",
				n.style.cssText = "border:none; overflow:hidden;height:90px;width:728px;margin-left:-364px",
				p.appendChild(n),
				document.body.appendChild(p),
				window.showGameOverAd = function() {
					height / ratio > 550 && (p.style.bottom = "0px")
				},
				window.hideGameOverAd = function() {
					p.style.bottom = "-100px",
						n.src = o()
				}
		}

		function m() {
			var e = document.createElement("iframe");
			e.src = Config.facebookLikeUrl,
				e.frameborder = "0",
				e.scrolling = "no",
				e.allowTransparency = "true",
				e.id = "fbframe",
				e.style.cssText = "border:none; overflow:hidden; height:21px; width:100px;",
				d.appendChild(e)
		}

		function l() {
			window.Parse ? (Parse.initialize(Config.parseId, Config.parseKey),
				function(p, s, o) {
					var q, u = p.getElementsByTagName(s)[0];
					p.getElementById(o) || (q = p.createElement(s), q.id = o, q.src = "", u.parentNode.insertBefore(q, u))
				}(document, "script", "facebook-jssdk"), window.fbAsyncInit = function() {
					window.shareDialogueCallback = function(e) {
							FB.ui({
									method: "share",
									href: ""
								},
								function(n) {})
						},
						Parse.FacebookUtils.init({
							appId: Config.facebookAppId,
							status: !1,
							cookie: !0,
							xfbml: !0,
							version: "v2.2"
						}),
						FB.getLoginStatus(function(e) {
							window.isFacebookApp || Sidebar.addMenuHeader("Save your progress!"),
								"connected" === e.status ? k() : (window.isFacebookApp && k(), f(!1)),
								b()
						})
				},
				console.log("Facebook loaded")) : setTimeout(l, 100)
		}
		var g;
		window.isFacebookAppWeb && h();
		var d = document.getElementById("overlay");
		m(),
			window.overlayToggleCallbacks.push(function(e) {
				d.style.visibility = e ? "hidden" : "visible"
			}),
			d.style.visibility = "visible",
			setInterval(function() {
					d.className = "",
						setTimeout(function() {
								d.className = "w"
							},
							500)
				},
				180000),
			load(""),
			l()
	}

	function a() {
		window.kik && kik.enabled && kik.send && (window.shareDialogueCallback = function(d) {
			kik.send({
				title: "Hex FRVR",
				text: d || "I think you will like Hex FRVR!",
				pic: ""
			})
		})
	}
	window.showInterstitialAd = function() {
			var d = parseInt(Store.get("playCount")) || 0;
			Store.set("playCount", d + 1),
				d > 3 && 2 * Math.random() >> 0 == 0 && (window.isAndroid && !window.isSilk && Config.androidInstallBannerURL && Config.androidInstallURL ? (Modal.show(new InstallGameModal(Config.androidInstallBannerURL, Config.androidInstallURL, Sidebar.showIcon)), Sidebar.hideIcon(), window.toggleOverlay(!0)) : window.isiOS && Config.iOSInstallBannerURL && Config.iOSInstallURL && (Modal.show(new InstallGameModal(Config.iOSInstallBannerURL, Config.iOSInstallURL, Sidebar.showIcon)), Sidebar.hideIcon(), window.toggleOverlay(!0)))
		},
		window.isKik ? a() : window.isKongregate || c()
}
var PIXI = PIXI || {};
PIXI.WEBGL_RENDERER = 0,
	PIXI.CANVAS_RENDERER = 1,
	PIXI.VERSION = "v2.2.3",
	PIXI.blendModes = {
		NORMAL: 0,
		ADD: 1,
		MULTIPLY: 2,
		SCREEN: 3,
		OVERLAY: 4,
		DARKEN: 5,
		LIGHTEN: 6,
		COLOR_DODGE: 7,
		COLOR_BURN: 8,
		HARD_LIGHT: 9,
		SOFT_LIGHT: 10,
		DIFFERENCE: 11,
		EXCLUSION: 12,
		HUE: 13,
		SATURATION: 14,
		COLOR: 15,
		LUMINOSITY: 16
	},
	PIXI.scaleModes = {
		DEFAULT: 0,
		LINEAR: 0,
		NEAREST: 1
	},
	PIXI._UID = 0,
	"undefined" != typeof Float32Array ? (PIXI.Float32Array = Float32Array, PIXI.Uint16Array = Uint16Array, PIXI.Uint32Array = Uint32Array, PIXI.ArrayBuffer = ArrayBuffer) : (PIXI.Float32Array = Array, PIXI.Uint16Array = Array),
	PIXI.INTERACTION_FREQUENCY = 30,
	PIXI.AUTO_PREVENT_DEFAULT = !0,
	PIXI.PI_2 = 2 * Math.PI,
	PIXI.RAD_TO_DEG = 180 / Math.PI,
	PIXI.DEG_TO_RAD = Math.PI / 180,
	PIXI.RETINA_PREFIX = "@2x",
	PIXI.dontSayHello = !1,
	PIXI.defaultRenderOptions = {
		view: null,
		transparent: !1,
		antialias: !1,
		preserveDrawingBuffer: !1,
		resolution: 1,
		clearBeforeRender: !0,
		autoResize: !1
	},
	PIXI.sayHello = function(a) {
		if(!PIXI.dontSayHello) {
			if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
				var b = ["%c %c %c Pixi.js " + PIXI.VERSION + " - " + a + "  %c  %c  http://www.pixijs.com/  %c %c 鈾�%c鈾�%c鈾� ", "background: #ff66a5", "background: #ff66a5", "color: #ff66a5; background: #030307;", "background: #ff66a5", "background: #ffc3dc", "background: #ff66a5", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff"];
				console.log.apply(console, b)
			} else {
				window.console && console.log("Pixi.js " + PIXI.VERSION + " - http://www.pixijs.com/")
			}
			PIXI.dontSayHello = !0
		}
	},
	PIXI.Point = function(a, b) {
		this.x = a || 0,
			this.y = b || 0
	},
	PIXI.Point.prototype.clone = function() {
		return new PIXI.Point(this.x, this.y)
	},
	PIXI.Point.prototype.set = function(a, b) {
		this.x = a || 0,
			this.y = b || (0 !== b ? this.x : 0)
	},
	PIXI.Point.prototype.constructor = PIXI.Point,
	PIXI.Rectangle = function(b, d, a, c) {
		this.x = b || 0,
			this.y = d || 0,
			this.width = a || 0,
			this.height = c || 0
	},
	PIXI.Rectangle.prototype.clone = function() {
		return new PIXI.Rectangle(this.x, this.y, this.width, this.height)
	},
	PIXI.Rectangle.prototype.contains = function(b, d) {
		if(this.width <= 0 || this.height <= 0) {
			return !1
		}
		var a = this.x;
		if(b >= a && b <= a + this.width) {
			var c = this.y;
			if(d >= c && d <= c + this.height) {
				return !0
			}
		}
		return !1
	},
	PIXI.Rectangle.prototype.constructor = PIXI.Rectangle,
	PIXI.EmptyRectangle = new PIXI.Rectangle(0, 0, 0, 0),
	PIXI.Polygon = function(b) {
		if(b instanceof Array || (b = Array.prototype.slice.call(arguments)), b[0] instanceof PIXI.Point) {
			for(var d = [], a = 0, c = b.length; c > a; a++) {
				d.push(b[a].x, b[a].y)
			}
			b = d
		}
		this.closed = !0,
			this.points = b
	},
	PIXI.Polygon.prototype.clone = function() {
		var a = this.points.slice();
		return new PIXI.Polygon(a)
	},
	PIXI.Polygon.prototype.contains = function(v, p) {
		for(var k = !1,
				b = this.points.length / 2,
				f = 0,
				d = b - 1; b > f; d = f++) {
			var w = this.points[2 * f],
				u = this.points[2 * f + 1],
				m = this.points[2 * d],
				g = this.points[2 * d + 1],
				q = u > p != g > p && (m - w) * (p - u) / (g - u) + w > v;
			q && (k = !k)
		}
		return k
	},
	PIXI.Polygon.prototype.constructor = PIXI.Polygon,
	PIXI.Circle = function(b, c, a) {
		this.x = b || 0,
			this.y = c || 0,
			this.radius = a || 0
	},
	PIXI.Circle.prototype.clone = function() {
		return new PIXI.Circle(this.x, this.y, this.radius)
	},
	PIXI.Circle.prototype.contains = function(b, d) {
		if(this.radius <= 0) {
			return !1
		}
		var a = this.x - b,
			c = this.y - d,
			f = this.radius * this.radius;
		return a *= a,
			c *= c,
			f >= a + c
	},
	PIXI.Circle.prototype.getBounds = function() {
		return new PIXI.Rectangle(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
	},
	PIXI.Circle.prototype.constructor = PIXI.Circle,
	PIXI.Ellipse = function(b, d, a, c) {
		this.x = b || 0,
			this.y = d || 0,
			this.width = a || 0,
			this.height = c || 0
	},
	PIXI.Ellipse.prototype.clone = function() {
		return new PIXI.Ellipse(this.x, this.y, this.width, this.height)
	},
	PIXI.Ellipse.prototype.contains = function(b, d) {
		if(this.width <= 0 || this.height <= 0) {
			return !1
		}
		var a = (b - this.x) / this.width,
			c = (d - this.y) / this.height;
		return a *= a,
			c *= c,
			1 >= a + c
	},
	PIXI.Ellipse.prototype.getBounds = function() {
		return new PIXI.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height)
	},
	PIXI.Ellipse.prototype.constructor = PIXI.Ellipse,
	PIXI.RoundedRectangle = function(b, d, a, c, f) {
		this.x = b || 0,
			this.y = d || 0,
			this.width = a || 0,
			this.height = c || 0,
			this.radius = f || 20
	},
	PIXI.RoundedRectangle.prototype.clone = function() {
		return new PIXI.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius)
	},
	PIXI.RoundedRectangle.prototype.contains = function(b, d) {
		if(this.width <= 0 || this.height <= 0) {
			return !1
		}
		var a = this.x;
		if(b >= a && b <= a + this.width) {
			var c = this.y;
			if(d >= c && d <= c + this.height) {
				return !0
			}
		}
		return !1
	},
	PIXI.RoundedRectangle.prototype.constructor = PIXI.RoundedRectangle,
	PIXI.Matrix = function() {
		this.a = 1,
			this.b = 0,
			this.c = 0,
			this.d = 1,
			this.tx = 0,
			this.ty = 0
	},
	PIXI.Matrix.prototype.fromArray = function(a) {
		this.a = a[0],
			this.b = a[1],
			this.c = a[3],
			this.d = a[4],
			this.tx = a[2],
			this.ty = a[5]
	},
	PIXI.Matrix.prototype.toArray = function(a) {
		this.array || (this.array = new PIXI.Float32Array(9));
		var b = this.array;
		return a ? (b[0] = this.a, b[1] = this.b, b[2] = 0, b[3] = this.c, b[4] = this.d, b[5] = 0, b[6] = this.tx, b[7] = this.ty, b[8] = 1) : (b[0] = this.a, b[1] = this.c, b[2] = this.tx, b[3] = this.b, b[4] = this.d, b[5] = this.ty, b[6] = 0, b[7] = 0, b[8] = 1),
			b
	},
	PIXI.Matrix.prototype.apply = function(a, b) {
		return b = b || new PIXI.Point,
			b.x = this.a * a.x + this.c * a.y + this.tx,
			b.y = this.b * a.x + this.d * a.y + this.ty,
			b
	},
	PIXI.Matrix.prototype.applyInverse = function(b, c) {
		c = c || new PIXI.Point;
		var a = 1 / (this.a * this.d + this.c * -this.b);
		return c.x = this.d * a * b.x + -this.c * a * b.y + (this.ty * this.c - this.tx * this.d) * a,
			c.y = this.a * a * b.y + -this.b * a * b.x + (-this.ty * this.a + this.tx * this.b) * a,
			c
	},
	PIXI.Matrix.prototype.translate = function(a, b) {
		return this.tx += a,
			this.ty += b,
			this
	},
	PIXI.Matrix.prototype.scale = function(a, b) {
		return this.a *= a,
			this.d *= b,
			this.c *= a,
			this.b *= b,
			this.tx *= a,
			this.ty *= b,
			this
	},
	PIXI.Matrix.prototype.rotate = function(b) {
		var d = Math.cos(b),
			a = Math.sin(b),
			c = this.a,
			g = this.c,
			f = this.tx;
		return this.a = c * d - this.b * a,
			this.b = c * a + this.b * d,
			this.c = g * d - this.d * a,
			this.d = g * a + this.d * d,
			this.tx = f * d - this.ty * a,
			this.ty = f * a + this.ty * d,
			this
	},
	PIXI.Matrix.prototype.append = function(b) {
		var d = this.a,
			a = this.b,
			c = this.c,
			f = this.d;
		return this.a = b.a * d + b.b * c,
			this.b = b.a * a + b.b * f,
			this.c = b.c * d + b.d * c,
			this.d = b.c * a + b.d * f,
			this.tx = b.tx * d + b.ty * c + this.tx,
			this.ty = b.tx * a + b.ty * f + this.ty,
			this
	},
	PIXI.Matrix.prototype.identity = function() {
		return this.a = 1,
			this.b = 0,
			this.c = 0,
			this.d = 1,
			this.tx = 0,
			this.ty = 0,
			this
	},
	PIXI.identityMatrix = new PIXI.Matrix,
	PIXI.DisplayObject = function() {
		this.position = new PIXI.Point,
			this.scale = new PIXI.Point(1, 1),
			this.pivot = new PIXI.Point(0, 0),
			this.rotation = 0,
			this.alpha = 1,
			this.visible = !0,
			this.hitArea = null,
			this.buttonMode = !1,
			this.renderable = !1,
			this.parent = null,
			this.stage = null,
			this.worldAlpha = 1,
			this._interactive = !1,
			this.defaultCursor = "pointer",
			this.worldTransform = new PIXI.Matrix,
			this._sr = 0,
			this._cr = 1,
			this.filterArea = null,
			this._bounds = new PIXI.Rectangle(0, 0, 1, 1),
			this._currentBounds = null,
			this._mask = null,
			this._cacheAsBitmap = !1,
			this._cacheIsDirty = !1
	},
	PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject,
	Object.defineProperty(PIXI.DisplayObject.prototype, "interactive", {
		get: function() {
			return this._interactive
		},
		set: function(a) {
			this._interactive = a,
				this.stage && (this.stage.dirty = !0)
		}
	}),
	Object.defineProperty(PIXI.DisplayObject.prototype, "worldVisible", {
		get: function() {
			var a = this;
			do {
				if(!a.visible) {
					return !1
				}
				a = a.parent
			} while (a);
			return !0
		}
	}),
	Object.defineProperty(PIXI.DisplayObject.prototype, "mask", {
		get: function() {
			return this._mask
		},
		set: function(a) {
			this._mask && (this._mask.isMask = !1),
				this._mask = a,
				this._mask && (this._mask.isMask = !0)
		}
	}),
	Object.defineProperty(PIXI.DisplayObject.prototype, "filters", {
		get: function() {
			return this._filters
		},
		set: function(b) {
			if(b) {
				for(var d = [], a = 0; a < b.length; a++) {
					for(var c = b[a].passes, f = 0; f < c.length; f++) {
						d.push(c[f])
					}
				}
				this._filterBlock = {
					target: this,
					filterPasses: d
				}
			}
			this._filters = b
		}
	}),
	Object.defineProperty(PIXI.DisplayObject.prototype, "cacheAsBitmap", {
		get: function() {
			return this._cacheAsBitmap
		},
		set: function(a) {
			this._cacheAsBitmap !== a && (a ? this._generateCachedSprite() : this._destroyCachedSprite(), this._cacheAsBitmap = a)
		}
	}),
	PIXI.DisplayObject.prototype.updateTransform = function() {
		var d, h, c, g, l, k, f = this.parent.worldTransform,
			b = this.worldTransform;
		this.rotation % PIXI.PI_2 ? (this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation)), d = this._cr * this.scale.x, h = this._sr * this.scale.x, c = -this._sr * this.scale.y, g = this._cr * this.scale.y, l = this.position.x, k = this.position.y, (this.pivot.x || this.pivot.y) && (l -= this.pivot.x * d + this.pivot.y * c, k -= this.pivot.x * h + this.pivot.y * g), b.a = d * f.a + h * f.c, b.b = d * f.b + h * f.d, b.c = c * f.a + g * f.c, b.d = c * f.b + g * f.d, b.tx = l * f.a + k * f.c + f.tx, b.ty = l * f.b + k * f.d + f.ty) : (d = this.scale.x, g = this.scale.y, l = this.position.x - this.pivot.x * d, k = this.position.y - this.pivot.y * g, b.a = d * f.a, b.b = d * f.b, b.c = g * f.c, b.d = g * f.d, b.tx = l * f.a + k * f.c + f.tx, b.ty = l * f.b + k * f.d + f.ty),
			this.worldAlpha = this.alpha * this.parent.worldAlpha
	},
	PIXI.DisplayObject.prototype.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform,
	PIXI.DisplayObject.prototype.getBounds = function(a) {
		return a = a,
			PIXI.EmptyRectangle
	},
	PIXI.DisplayObject.prototype.getLocalBounds = function() {
		return this.getBounds(PIXI.identityMatrix)
	},
	PIXI.DisplayObject.prototype.setStageReference = function(a) {
		this.stage = a,
			this._interactive && (this.stage.dirty = !0)
	},
	PIXI.DisplayObject.prototype.generateTexture = function(b, d, a) {
		var c = this.getLocalBounds(),
			f = new PIXI.RenderTexture(0 | c.width, 0 | c.height, a, d, b);
		return PIXI.DisplayObject._tempMatrix.tx = -c.x,
			PIXI.DisplayObject._tempMatrix.ty = -c.y,
			f.render(this, PIXI.DisplayObject._tempMatrix),
			f
	},
	PIXI.DisplayObject.prototype.updateCache = function() {
		this._generateCachedSprite()
	},
	PIXI.DisplayObject.prototype.toGlobal = function(a) {
		return this.displayObjectUpdateTransform(),
			this.worldTransform.apply(a)
	},
	PIXI.DisplayObject.prototype.toLocal = function(a, b) {
		return b && (a = b.toGlobal(a)),
			this.displayObjectUpdateTransform(),
			this.worldTransform.applyInverse(a)
	},
	PIXI.DisplayObject.prototype._renderCachedSprite = function(a) {
		this._cachedSprite.worldAlpha = this.worldAlpha,
			a.gl ? PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, a) : PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, a)
	},
	PIXI.DisplayObject.prototype._generateCachedSprite = function() {
		this._cacheAsBitmap = !1;
		var b = this.getLocalBounds();
		if(this._cachedSprite) {
			this._cachedSprite.texture.resize(0 | b.width, 0 | b.height)
		} else {
			var c = new PIXI.RenderTexture(0 | b.width, 0 | b.height);
			this._cachedSprite = new PIXI.Sprite(c),
				this._cachedSprite.worldTransform = this.worldTransform
		}
		var a = this._filters;
		this._filters = null,
			this._cachedSprite.filters = a,
			PIXI.DisplayObject._tempMatrix.tx = -b.x,
			PIXI.DisplayObject._tempMatrix.ty = -b.y,
			this._cachedSprite.texture.render(this, PIXI.DisplayObject._tempMatrix, !0),
			this._cachedSprite.anchor.x = -(b.x / b.width),
			this._cachedSprite.anchor.y = -(b.y / b.height),
			this._filters = a,
			this._cacheAsBitmap = !0
	},
	PIXI.DisplayObject.prototype._destroyCachedSprite = function() {
		this._cachedSprite && (this._cachedSprite.texture.destroy(!0), this._cachedSprite = null)
	},
	PIXI.DisplayObject.prototype._renderWebGL = function(a) {
		a = a
	},
	PIXI.DisplayObject.prototype._renderCanvas = function(a) {
		a = a
	},
	PIXI.DisplayObject._tempMatrix = new PIXI.Matrix,
	Object.defineProperty(PIXI.DisplayObject.prototype, "x", {
		get: function() {
			return this.position.x
		},
		set: function(a) {
			this.position.x = a
		}
	}),
	Object.defineProperty(PIXI.DisplayObject.prototype, "y", {
		get: function() {
			return this.position.y
		},
		set: function(a) {
			this.position.y = a
		}
	}),
	PIXI.DisplayObjectContainer = function() {
		PIXI.DisplayObject.call(this),
			this.children = []
	},
	PIXI.DisplayObjectContainer.prototype = Object.create(PIXI.DisplayObject.prototype),
	PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer,
	Object.defineProperty(PIXI.DisplayObjectContainer.prototype, "width", {
		get: function() {
			return this.scale.x * this.getLocalBounds().width
		},
		set: function(a) {
			var b = this.getLocalBounds().width;
			0 !== b ? this.scale.x = a / b : this.scale.x = 1,
				this._width = a
		}
	}),
	Object.defineProperty(PIXI.DisplayObjectContainer.prototype, "height", {
		get: function() {
			return this.scale.y * this.getLocalBounds().height
		},
		set: function(a) {
			var b = this.getLocalBounds().height;
			0 !== b ? this.scale.y = a / b : this.scale.y = 1,
				this._height = a
		}
	}),
	PIXI.DisplayObjectContainer.prototype.addChild = function(a) {
		return window.dirtyOnce = !0,
			this.addChildAt(a, this.children.length)
	},
	PIXI.DisplayObjectContainer.prototype.addChildAt = function(a, b) {
		if(b >= 0 && b <= this.children.length) {
			return window.dirtyOnce = !0,
				a.parent && a.parent.removeChild(a),
				a.parent = this,
				this.children.splice(b, 0, a),
				this.stage && a.setStageReference(this.stage),
				a
		}
		throw new Error(a + "addChildAt: The index " + b + " supplied is out of bounds " + this.children.length)
	},
	PIXI.DisplayObjectContainer.prototype.getChildIndex = function(a) {
		var b = this.children.indexOf(a);
		if(-1 === b) {
			throw new Error("The supplied DisplayObject must be a child of the caller")
		}
		return b
	},
	PIXI.DisplayObjectContainer.prototype.setChildIndex = function(b, c) {
		if(0 > c || c >= this.children.length) {
			throw new Error("The supplied index is out of bounds")
		}
		window.dirtyOnce = !0;
		var a = this.getChildIndex(b);
		this.children.splice(a, 1),
			this.children.splice(c, 0, b)
	},
	PIXI.DisplayObjectContainer.prototype.getChildAt = function(a) {
		if(0 > a || a >= this.children.length) {
			throw new Error("getChildAt: Supplied index " + a + " does not exist in the child list, or the supplied DisplayObject must be a child of the caller")
		}
		return this.children[a]
	},
	PIXI.DisplayObjectContainer.prototype.removeChild = function(a) {
		var b = this.children.indexOf(a);
		if(-1 !== b) {
			return window.dirtyOnce = !0,
				this.removeChildAt(b)
		}
	},
	PIXI.DisplayObjectContainer.prototype.removeChildAt = function(a) {
		var b = this.getChildAt(a);
		return this.stage && b.removeStageReference(),
			window.dirtyOnce = !0,
			b.parent = void 0,
			this.children.splice(a, 1),
			b
	},
	PIXI.DisplayObjectContainer.prototype.updateTransform = function() {
		if(this.visible && (this.displayObjectUpdateTransform(), !this._cacheAsBitmap)) {
			for(var a = 0,
					b = this.children.length; b > a; a++) {
				this.children[a].updateTransform()
			}
		}
	},
	PIXI.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = PIXI.DisplayObjectContainer.prototype.updateTransform,
	PIXI.DisplayObjectContainer.prototype.getBounds = function() {
		if(0 === this.children.length) {
			return PIXI.EmptyRectangle
		}
		for(var x, q, m, b = 1 / 0,
				g = 1 / 0,
				f = -(1 / 0), y = -(1 / 0), w = !1, p = 0, k = this.children.length; k > p; p++) {
			var v = this.children[p];
			v.visible && (w = !0, x = this.children[p].getBounds(), b = b < x.x ? b : x.x, g = g < x.y ? g : x.y, q = x.width + x.x, m = x.height + x.y, f = f > q ? f : q, y = y > m ? y : m)
		}
		if(!w) {
			return PIXI.EmptyRectangle
		}
		var u = this._bounds;
		return u.x = b,
			u.y = g,
			u.width = f - b,
			u.height = y - g,
			u
	},
	PIXI.DisplayObjectContainer.prototype.getLocalBounds = function() {
		var b = this.worldTransform;
		this.worldTransform = PIXI.identityMatrix;
		for(var d = 0,
				a = this.children.length; a > d; d++) {
			this.children[d].updateTransform()
		}
		var c = this.getBounds();
		return this.worldTransform = b,
			c
	},
	PIXI.DisplayObjectContainer.prototype.setStageReference = function(b) {
		this.stage = b,
			this._interactive && (this.stage.dirty = !0);
		for(var d = 0,
				a = this.children.length; a > d; d++) {
			var c = this.children[d];
			c.setStageReference(b)
		}
	},
	PIXI.DisplayObjectContainer.prototype.removeStageReference = function() {
		for(var b = 0,
				c = this.children.length; c > b; b++) {
			var a = this.children[b];
			a.removeStageReference()
		}
		this._interactive && (this.stage.dirty = !0),
			this.stage = null
	},
	PIXI.DisplayObjectContainer.prototype._renderWebGL = function(b) {
		if(this.visible && !(this.alpha <= 0)) {
			if(this._cacheAsBitmap) {
				return void this._renderCachedSprite(b)
			}
			var c, a;
			if(this._mask || this._filters) {
				for(this._mask && (b.spriteBatch.stop(), b.maskManager.pushMask(this.mask, b), b.spriteBatch.start()), c = 0, a = this.children.length; a > c; c++) {
					this.children[c]._renderWebGL(b)
				}
				b.spriteBatch.stop(),
					this._mask && b.maskManager.popMask(this._mask, b),
					b.spriteBatch.start()
			} else {
				for(c = 0, a = this.children.length; a > c; c++) {
					this.children[c]._renderWebGL(b)
				}
			}
		}
	},
	PIXI.DisplayObjectContainer.prototype._renderCanvas = function(b) {
		if(this.visible !== !1 && 0 !== this.alpha) {
			if(this._cacheAsBitmap) {
				return void this._renderCachedSprite(b)
			}
			this._mask && b.maskManager.pushMask(this._mask, b);
			for(var d = 0,
					a = this.children.length; a > d; d++) {
				var c = this.children[d];
				c._renderCanvas(b)
			}
			this._mask && b.maskManager.popMask(b)
		}
	},
	PIXI.Sprite = function(a) {
		PIXI.DisplayObjectContainer.call(this),
			this.anchor = new PIXI.Point,
			this.texture = a || PIXI.Texture.emptyTexture,
			this._width = 0,
			this._height = 0,
			this.tint = 16777215,
			this.blendMode = PIXI.blendModes.NORMAL,
			this.shader = null,
			this.texture.baseTexture.hasLoaded ? this.onTextureUpdate() : this.texture.on("update", this.onTextureUpdate.bind(this)),
			this.renderable = !0
	},
	PIXI.Sprite.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
	PIXI.Sprite.prototype.constructor = PIXI.Sprite,
	Object.defineProperty(PIXI.Sprite.prototype, "width", {
		get: function() {
			return this.scale.x * this.texture.frame.width
		},
		set: function(a) {
			this.scale.x = a / this.texture.frame.width,
				this._width = a
		}
	}),
	Object.defineProperty(PIXI.Sprite.prototype, "height", {
		get: function() {
			return this.scale.y * this.texture.frame.height
		},
		set: function(a) {
			this.scale.y = a / this.texture.frame.height,
				this._height = a
		}
	}),
	PIXI.Sprite.prototype.setTexture = function(a) {
		this.texture = a,
			this.cachedTint = 16777215
	},
	PIXI.Sprite.prototype.onTextureUpdate = function() {
		this._width && (this.scale.x = this._width / this.texture.frame.width),
			this._height && (this.scale.y = this._height / this.texture.frame.height)
	},
	PIXI.Sprite.prototype.getBounds = function(H) {
		var Y = this.texture.frame.width,
			R = this.texture.frame.height,
			K = Y * (1 - this.anchor.x),
			N = Y * -this.anchor.x,
			M = R * (1 - this.anchor.y),
			J = R * -this.anchor.y,
			ac = H || this.worldTransform,
			U = ac.a,
			Q = ac.b,
			aa = ac.c,
			Z = ac.d,
			G = ac.tx,
			L = ac.ty,
			W = -(1 / 0),
			D = -(1 / 0),
			V = 1 / 0,
			F = 1 / 0;
		if(0 === Q && 0 === aa) {
			0 > U && (U *= -1),
				0 > Z && (Z *= -1),
				V = U * N + G,
				W = U * K + G,
				F = Z * J + L,
				D = Z * M + L
		} else {
			var B = U * N + aa * J + G,
				E = Z * J + Q * N + L,
				A = U * K + aa * J + G,
				O = Z * J + Q * K + L,
				C = U * K + aa * M + G,
				ab = Z * M + Q * K + L,
				q = U * N + aa * M + G,
				k = Z * M + Q * N + L;
			V = V > B ? B : V,
				V = V > A ? A : V,
				V = V > C ? C : V,
				V = V > q ? q : V,
				F = F > E ? E : F,
				F = F > O ? O : F,
				F = F > ab ? ab : F,
				F = F > k ? k : F,
				W = B > W ? B : W,
				W = A > W ? A : W,
				W = C > W ? C : W,
				W = q > W ? q : W,
				D = E > D ? E : D,
				D = O > D ? O : D,
				D = ab > D ? ab : D,
				D = k > D ? k : D
		}
		var z = this._bounds;
		return z.x = V,
			z.width = W - V,
			z.y = F,
			z.height = D - F,
			this._currentBounds = z,
			z
	},
	PIXI.Sprite.prototype._renderWebGL = function(b) {
		if(this.visible && !(this.alpha <= 0)) {
			var c, a;
			for(b.spriteBatch.render(this), c = 0, a = this.children.length; a > c; c++) {
				this.children[c]._renderWebGL(b)
			}
		}
	},
	PIXI.Sprite.prototype._renderCanvas = function(b) {
		if(!(this.visible === !1 || 0 === this.alpha || this.texture.crop.width <= 0 || this.texture.crop.height <= 0)) {
			if(this.blendMode !== b.currentBlendMode && (b.currentBlendMode = this.blendMode, b.context.globalCompositeOperation = PIXI.blendModesCanvas[b.currentBlendMode]), this._mask && b.maskManager.pushMask(this._mask, b), this.texture.valid) {
				var d = this.texture.baseTexture.resolution / b.resolution;
				b.context.globalAlpha = this.worldAlpha,
					b.smoothProperty && b.scaleMode !== this.texture.baseTexture.scaleMode && (b.scaleMode = this.texture.baseTexture.scaleMode, b.context[b.smoothProperty] = b.scaleMode === PIXI.scaleModes.LINEAR);
				var a = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width,
					c = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
				b.roundPixels ? (b.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * b.resolution | 0, this.worldTransform.ty * b.resolution | 0), a = 0 | a, c = 0 | c) : b.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * b.resolution, this.worldTransform.ty * b.resolution),
					16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = PIXI.CanvasTinter.getTintedTexture(this, this.tint)), b.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width, this.texture.crop.height, a / d, c / d, this.texture.crop.width / d, this.texture.crop.height / d)) : b.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, a / d, c / d, this.texture.crop.width / d, this.texture.crop.height / d)
			}
			for(var g = 0,
					f = this.children.length; f > g; g++) {
				this.children[g]._renderCanvas(b)
			}
			this._mask && b.maskManager.popMask(b)
		}
	},
	PIXI.Sprite.fromFrame = function(a) {
		var b = PIXI.TextureCache[a];
		if(!b) {
			throw new Error('The frameId "' + a + '" does not exist in the texture cache' + this)
		}
		return new PIXI.Sprite(b)
	},
	PIXI.Sprite.fromImage = function(b, d, a) {
		var c = PIXI.Texture.fromImage(b, d, a);
		return new PIXI.Sprite(c)
	},
	PIXI.SpriteBatch = function(a) {
		PIXI.DisplayObjectContainer.call(this),
			this.textureThing = a,
			this.ready = !1
	},
	PIXI.SpriteBatch.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
	PIXI.SpriteBatch.prototype.constructor = PIXI.SpriteBatch,
	PIXI.SpriteBatch.prototype.initWebGL = function(a) {
		this.fastSpriteBatch = new PIXI.WebGLFastSpriteBatch(a),
			this.ready = !0
	},
	PIXI.SpriteBatch.prototype.updateTransform = function() {
		this.displayObjectUpdateTransform()
	},
	PIXI.SpriteBatch.prototype._renderWebGL = function(a) {
		!this.visible || this.alpha <= 0 || !this.children.length || (this.ready || this.initWebGL(a.gl), a.spriteBatch.stop(), a.shaderManager.setShader(a.shaderManager.fastShader), this.fastSpriteBatch.begin(this, a), this.fastSpriteBatch.render(this), a.spriteBatch.start())
	},
	PIXI.SpriteBatch.prototype._renderCanvas = function(m) {
		if(this.visible && !(this.alpha <= 0) && this.children.length) {
			var k = m.context;
			k.globalAlpha = this.worldAlpha,
				this.displayObjectUpdateTransform();
			for(var f = this.worldTransform,
					b = !0,
					d = 0; d < this.children.length; d++) {
				var c = this.children[d];
				if(c.visible) {
					var p = c.texture,
						l = p.frame;
					if(k.globalAlpha = this.worldAlpha * c.alpha, c.rotation % (2 * Math.PI) === 0) {
						b && (k.setTransform(f.a, f.b, f.c, f.d, f.tx, f.ty), b = !1),
							k.drawImage(p.baseTexture.source, l.x, l.y, l.width, l.height, c.anchor.x * -l.width * c.scale.x + c.position.x + 0.5 | 0, c.anchor.y * -l.height * c.scale.y + c.position.y + 0.5 | 0, l.width * c.scale.x, l.height * c.scale.y)
					} else {
						b || (b = !0),
							c.displayObjectUpdateTransform();
						var g = c.worldTransform;
						m.roundPixels ? k.setTransform(g.a, g.b, g.c, g.d, 0 | g.tx, 0 | g.ty) : k.setTransform(g.a, g.b, g.c, g.d, g.tx, g.ty),
							k.drawImage(p.baseTexture.source, l.x, l.y, l.width, l.height, c.anchor.x * -l.width + 0.5 | 0, c.anchor.y * -l.height + 0.5 | 0, l.width, l.height)
					}
				}
			}
		}
	},
	PIXI.Text = function(a, b) {
		this.canvas = document.createElement("canvas"),
			this.context = this.canvas.getContext("2d"),
			this.resolution = 1,
			PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas)),
			this.setText(a),
			this.setStyle(b)
	},
	PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype),
	PIXI.Text.prototype.constructor = PIXI.Text,
	Object.defineProperty(PIXI.Text.prototype, "width", {
		get: function() {
			return this.dirty && (this.updateText(), this.dirty = !1),
				this.scale.x * this.texture.frame.width
		},
		set: function(a) {
			this.scale.x = a / this.texture.frame.width,
				this._width = a
		}
	}),
	Object.defineProperty(PIXI.Text.prototype, "height", {
		get: function() {
			return this.dirty && (this.updateText(), this.dirty = !1),
				this.scale.y * this.texture.frame.height
		},
		set: function(a) {
			this.scale.y = a / this.texture.frame.height,
				this._height = a
		}
	}),
	PIXI.Text.prototype.setStyle = function(a) {
		a = a || {},
			a.font = a.font || "bold 20pt Arial",
			a.fill = a.fill || "black",
			a.align = a.align || "left",
			a.stroke = a.stroke || "black",
			a.strokeThickness = a.strokeThickness || 0,
			a.wordWrap = a.wordWrap || !1,
			a.wordWrapWidth = a.wordWrapWidth || 100,
			a.dropShadow = a.dropShadow || !1,
			a.dropShadowAngle = a.dropShadowAngle || Math.PI / 6,
			a.dropShadowDistance = a.dropShadowDistance || 4,
			a.dropShadowColor = a.dropShadowColor || "black",
			this.style = a,
			this.dirty = !0
	},
	PIXI.Text.prototype.setText = function(a) {
		this.text = a.toString() || " ",
			this.dirty = !0
	},
	PIXI.Text.prototype.updateText = function() {
		this.texture.baseTexture.resolution = this.resolution,
			this.context.font = this.style.font;
		var B = this.text;
		this.style.wordWrap && (B = this.wordWrap(this.text));
		for(var w = B.split(/(?:\r\n|\r|\n)/), q = [], b = 0, k = this.determineFontProperties(this.style.font), g = 0; g < w.length; g++) {
			var C = this.context.measureText(w[g]).width;
			q[g] = C,
				b = Math.max(b, C)
		}
		var z = b + this.style.strokeThickness;
		this.style.dropShadow && (z += this.style.dropShadowDistance),
			this.canvas.width = (z + this.context.lineWidth) * this.resolution;
		var v = k.fontSize + this.style.strokeThickness,
			m = v * w.length;
		this.style.dropShadow && (m += this.style.dropShadowDistance),
			this.canvas.height = m * this.resolution,
			this.context.scale(this.resolution, this.resolution),
			this.context.font = this.style.font,
			this.context.strokeStyle = this.style.stroke,
			this.context.lineWidth = this.style.strokeThickness,
			this.context.textBaseline = "alphabetic";
		var y, x;
		if(this.style.dropShadow) {
			this.context.fillStyle = this.style.dropShadowColor;
			var A = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance,
				f = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
			for(g = 0; g < w.length; g++) {
				y = this.style.strokeThickness / 2,
					x = this.style.strokeThickness / 2 + g * v + k.ascent,
					"right" === this.style.align ? y += b - q[g] : "center" === this.style.align && (y += (b - q[g]) / 2),
					this.style.fill && this.context.fillText(w[g], y + A, x + f)
			}
		}
		for(this.context.fillStyle = this.style.fill, g = 0; g < w.length; g++) {
			y = this.style.strokeThickness / 2,
				x = this.style.strokeThickness / 2 + g * v + k.ascent,
				"right" === this.style.align ? y += b - q[g] : "center" === this.style.align && (y += (b - q[g]) / 2),
				this.style.stroke && this.style.strokeThickness && this.context.strokeText(w[g], y, x),
				this.style.fill && this.context.fillText(w[g], y, x)
		}
		this.updateTexture()
	},
	PIXI.Text.prototype.updateTexture = function() {
		this.texture.baseTexture.width = this.canvas.width,
			this.texture.baseTexture.height = this.canvas.height,
			this.texture.crop.width = this.texture.frame.width = this.canvas.width,
			this.texture.crop.height = this.texture.frame.height = this.canvas.height,
			this._width = this.canvas.width,
			this._height = this.canvas.height,
			this.texture.baseTexture.dirty()
	},
	PIXI.Text.prototype._renderWebGL = function(a) {
		this.dirty && (this.resolution = a.resolution, this.updateText(), this.dirty = !1),
			PIXI.Sprite.prototype._renderWebGL.call(this, a)
	},
	PIXI.Text.prototype._renderCanvas = function(a) {
		this.dirty && (this.resolution = a.resolution, this.updateText(), this.dirty = !1),
			PIXI.Sprite.prototype._renderCanvas.call(this, a)
	},
	PIXI.Text.prototype.determineFontProperties = function(B) {
		var w = PIXI.Text.fontPropertiesCache[B];
		if(!w) {
			w = {};
			var q = PIXI.Text.fontPropertiesCanvas,
				b = PIXI.Text.fontPropertiesContext;
			b.font = B;
			var k = Math.ceil(b.measureText("|M脡q").width),
				g = Math.ceil(b.measureText("M").width),
				C = 2 * g;
			g = 1.4 * g | 0,
				q.width = k,
				q.height = C,
				b.fillStyle = "#ffffff",
				b.fillRect(0, 0, k, C),
				b.font = B,
				b.textBaseline = "alphabetic",
				b.fillStyle = "#888888",
				b.fillText("|M脡q", 0, g);
			var z, v, m = b.getImageData(0, 0, k, C).data,
				y = m.length,
				x = 4 * k,
				A = 0,
				f = !1;
			for(z = 0; g > z; z++) {
				for(v = 0; x > v; v += 4) {
					if(255 !== m[A + v]) {
						f = !0;
						break
					}
				}
				if(f) {
					break
				}
				A += x
			}
			for(w.ascent = g - z, A = y - x, f = !1, z = C; z > g; z--) {
				for(v = 0; x > v; v += 4) {
					if(255 !== m[A + v]) {
						f = !0;
						break
					}
				}
				if(f) {
					break
				}
				A -= x
			}
			w.descent = z - g,
				w.fontSize = w.ascent + w.descent,
				PIXI.Text.fontPropertiesCache[B] = w
		}
		return w
	},
	PIXI.Text.prototype.wordWrap = function(m) {
		for(var k = "",
				f = m.split("\n"), b = 0; b < f.length; b++) {
			for(var d = this.style.wordWrapWidth,
					c = f[b].split(" "), p = 0; p < c.length; p++) {
				var l = this.context.measureText(c[p]).width,
					g = l + this.context.measureText(" ").width;
				0 === p || g > d ? (p > 0 && (k += "\n"), k += c[p], d = this.style.wordWrapWidth - l) : (d -= g, k += " " + c[p])
			}
			b < f.length - 1 && (k += "\n")
		}
		return k
	},
	PIXI.Text.prototype.getBounds = function(a) {
		return this.dirty && (this.updateText(), this.dirty = !1),
			PIXI.Sprite.prototype.getBounds.call(this, a)
	},
	PIXI.Text.prototype.destroy = function(a) {
		this.context = null,
			this.canvas = null,
			this.texture.destroy(void 0 === a ? !0 : a)
	},
	PIXI.Text.fontPropertiesCache = {},
	PIXI.Text.fontPropertiesCanvas = document.createElement("canvas"),
	PIXI.Text.fontPropertiesContext = PIXI.Text.fontPropertiesCanvas.getContext("2d"),
	PIXI.InteractionData = function() {
		this.global = new PIXI.Point,
			this.target = null,
			this.originalEvent = null
	},
	PIXI.InteractionData.prototype.getLocalPosition = function(v, p) {
		var k = v.worldTransform,
			b = this.global,
			f = k.a,
			d = k.c,
			w = k.tx,
			u = k.b,
			m = k.d,
			g = k.ty,
			q = 1 / (f * m + d * -u);
		return p = p || new PIXI.Point,
			p.x = m * q * b.x + -d * q * b.y + (g * d - w * m) * q,
			p.y = f * q * b.y + -u * q * b.x + (-g * f + w * u) * q,
			p
	},
	PIXI.InteractionData.prototype.constructor = PIXI.InteractionData,
	PIXI.InteractionManager = function(a) {
		this.stage = a,
			this.mouse = new PIXI.InteractionData,
			this.touches = {},
			this.tempPoint = new PIXI.Point,
			this.mouseoverEnabled = !0,
			this.pool = [],
			this.interactiveItems = [],
			this.interactionDOMElement = null,
			this.onMouseMove = this.onMouseMove.bind(this),
			this.onMouseDown = this.onMouseDown.bind(this),
			this.onMouseOut = this.onMouseOut.bind(this),
			this.onMouseUp = this.onMouseUp.bind(this),
			this.onTouchStart = this.onTouchStart.bind(this),
			this.onTouchEnd = this.onTouchEnd.bind(this),
			this.onTouchMove = this.onTouchMove.bind(this),
			this.last = 0,
			this.currentCursorStyle = "inherit",
			this.mouseOut = !1,
			this.resolution = 1,
			this._tempPoint = new PIXI.Point
	},
	PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager,
	PIXI.InteractionManager.prototype.collectInteractiveSprite = function(b, d) {
		for(var a = b.children,
				c = a.length,
				g = c - 1; g >= 0; g--) {
			var f = a[g];
			f._interactive ? (d.interactiveChildren = !0, this.interactiveItems.push(f), f.children.length > 0 && this.collectInteractiveSprite(f, f)) : (f.__iParent = null, f.children.length > 0 && this.collectInteractiveSprite(f, d))
		}
	},
	PIXI.InteractionManager.prototype.setTarget = function(a) {
		this.target = a,
			this.resolution = a.resolution,
			null === this.interactionDOMElement && this.setTargetDomElement(a.view)
	},
	PIXI.InteractionManager.prototype.setTargetDomElement = function(a) {
		this.removeEvents(),
			window.navigator.msPointerEnabled && (a.style["-ms-content-zooming"] = "none", a.style["-ms-touch-action"] = "none"),
			this.interactionDOMElement = a,
			a.addEventListener("mousemove", this.onMouseMove, !0),
			a.addEventListener("mousedown", this.onMouseDown, !0),
			a.addEventListener("mouseout", this.onMouseOut, !0),
			a.addEventListener("touchstart", this.onTouchStart, !0),
			a.addEventListener("touchend", this.onTouchEnd, !0),
			a.addEventListener("touchmove", this.onTouchMove, !0),
			window.addEventListener("mouseup", this.onMouseUp, !0)
	},
	PIXI.InteractionManager.prototype.removeEvents = function() {
		this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "", this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0))
	},
	PIXI.InteractionManager.prototype.update = function() {
		if(this.target) {
			var b = Date.now(),
				f = b - this.last;
			if(f = f * PIXI.INTERACTION_FREQUENCY / 1000, !(1 > f)) {
				this.last = b;
				var a = 0;
				this.dirty && this.rebuildInteractiveGraph();
				var d = this.interactiveItems.length,
					h = "inherit",
					g = !1;
				for(a = 0; d > a; a++) {
					var c = this.interactiveItems[a];
					c.__hit = this.hitTest(c, this.mouse),
						this.mouse.target = c,
						c.__hit && !g ? (c.buttonMode && (h = c.defaultCursor), c.interactiveChildren || (g = !0), c.__isOver || (c.mouseover && c.mouseover(this.mouse), c.__isOver = !0)) : c.__isOver && (c.mouseout && c.mouseout(this.mouse), c.__isOver = !1)
				}
				this.currentCursorStyle !== h && (this.currentCursorStyle = h, this.interactionDOMElement.style.cursor = h)
			}
		}
	},
	PIXI.InteractionManager.prototype.rebuildInteractiveGraph = function() {
		this.dirty = !1;
		for(var a = this.interactiveItems.length,
				b = 0; a > b; b++) {
			this.interactiveItems[b].interactiveChildren = !1
		}
		this.interactiveItems = [],
			this.stage.interactive && this.interactiveItems.push(this.stage),
			this.collectInteractiveSprite(this.stage, this.stage)
	},
	PIXI.InteractionManager.prototype.onMouseMove = function(b) {
		this.dirty && this.rebuildInteractiveGraph(),
			this.mouse.originalEvent = b;
		var d = this.interactionDOMElement.getBoundingClientRect();
		this.mouse.global.x = (b.clientX - d.left) * (this.target.width / d.width) / this.resolution,
			this.mouse.global.y = (b.clientY - d.top) * (this.target.height / d.height) / this.resolution;
		for(var a = this.interactiveItems.length,
				c = 0; a > c; c++) {
			var f = this.interactiveItems[c];
			f.mousemove && f.mousemove(this.mouse)
		}
	},
	PIXI.InteractionManager.prototype.onMouseDown = function(q) {
		this.dirty && this.rebuildInteractiveGraph(),
			this.mouse.originalEvent = q,
			PIXI.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent && this.mouse.originalEvent.preventDefault();
		for(var m = this.interactiveItems.length,
				g = this.mouse.originalEvent,
				b = 2 === g.button || 3 === g.which,
				d = b ? "rightdown" : "mousedown", c = b ? "rightclick" : "click", u = b ? "__rightIsDown" : "__mouseIsDown", p = b ? "__isRightDown" : "__isDown", k = 0; m > k; k++) {
			var f = this.interactiveItems[k];
			if((f[d] || f[c]) && (f[u] = !0, f.__hit = this.hitTest(f, this.mouse), f.__hit && (f[d] && f[d](this.mouse), f[p] = !0, !f.interactiveChildren))) {
				break
			}
		}
	},
	PIXI.InteractionManager.prototype.onMouseOut = function(b) {
		this.dirty && this.rebuildInteractiveGraph(),
			this.mouse.originalEvent = b;
		var d = this.interactiveItems.length;
		this.interactionDOMElement.style.cursor = "inherit";
		for(var a = 0; d > a; a++) {
			var c = this.interactiveItems[a];
			c.__isOver && (this.mouse.target = c, c.mouseout && c.mouseout(this.mouse), c.__isOver = !1)
		}
		this.mouseOut = !0,
			this.mouse.global.x = -10000,
			this.mouse.global.y = -10000
	},
	PIXI.InteractionManager.prototype.onMouseUp = function(v) {
		this.dirty && this.rebuildInteractiveGraph(),
			this.mouse.originalEvent = v;
		for(var p = this.interactiveItems.length,
				k = !1,
				b = this.mouse.originalEvent,
				f = 2 === b.button || 3 === b.which,
				d = f ? "rightup" : "mouseup", w = f ? "rightclick" : "click", u = f ? "rightupoutside" : "mouseupoutside", m = f ? "__isRightDown" : "__isDown", g = 0; p > g; g++) {
			var q = this.interactiveItems[g];
			(q[w] || q[d] || q[u]) && (q.__hit = this.hitTest(q, this.mouse), q.__hit && !k ? (q[d] && q[d](this.mouse), q[m] && q[w] && q[w](this.mouse), q.interactiveChildren || (k = !0)) : q[m] && q[u] && q[u](this.mouse), q[m] = !1)
		}
	},
	PIXI.InteractionManager.prototype.hitTest = function(D, y) {
		var v = y.global;
		if(!D.worldVisible) {
			return !1
		}
		D.worldTransform.applyInverse(v, this._tempPoint);
		var b, m = this._tempPoint.x,
			k = this._tempPoint.y;
		if(y.target = D, D.hitArea && D.hitArea.contains) {
			return D.hitArea.contains(m, k)
		}
		if(D instanceof PIXI.Sprite) {
			var E, B = D.texture.frame.width,
				w = D.texture.frame.height,
				q = -B * D.anchor.x;
			if(m > q && q + B > m && (E = -w * D.anchor.y, k > E && E + w > k)) {
				return !0
			}
		} else {
			if(D instanceof PIXI.Graphics) {
				var A = D.graphicsData;
				for(b = 0; b < A.length; b++) {
					var z = A[b];
					if(z.fill && z.shape && z.shape.contains(m, k)) {
						return !0
					}
				}
			}
		}
		var C = D.children.length;
		for(b = 0; C > b; b++) {
			var g = D.children[b],
				x = this.hitTest(g, y);
			if(x) {
				return y.target = D, !0
			}
		}
		return !1
	},
	PIXI.InteractionManager.prototype.onTouchMove = function(d) {
		this.dirty && this.rebuildInteractiveGraph();
		var h, c = this.interactionDOMElement.getBoundingClientRect(),
			g = d.changedTouches,
			l = 0;
		for(l = 0; l < g.length; l++) {
			var k = g[l];
			h = this.touches[k.identifier],
				h.originalEvent = d,
				h.global.x = (k.clientX - c.left) * (this.target.width / c.width) / this.resolution,
				h.global.y = (k.clientY - c.top) * (this.target.height / c.height) / this.resolution;
			for(var f = 0; f < this.interactiveItems.length; f++) {
				var b = this.interactiveItems[f];
				b.touchmove && b.__touchData && b.__touchData[k.identifier] && b.touchmove(h)
			}
		}
	},
	PIXI.InteractionManager.prototype.onTouchStart = function(m) {
		this.dirty && this.rebuildInteractiveGraph();
		var k = this.interactionDOMElement.getBoundingClientRect();
		PIXI.AUTO_PREVENT_DEFAULT && m.preventDefault();
		for(var f = m.changedTouches,
				b = 0; b < f.length; b++) {
			var d = f[b],
				c = this.pool.pop();
			c || (c = new PIXI.InteractionData),
				c.originalEvent = m,
				this.touches[d.identifier] = c,
				c.global.x = (d.clientX - k.left) * (this.target.width / k.width) / this.resolution,
				c.global.y = (d.clientY - k.top) * (this.target.height / k.height) / this.resolution;
			for(var p = this.interactiveItems.length,
					l = 0; p > l; l++) {
				var g = this.interactiveItems[l];
				if((g.touchstart || g.tap) && (g.__hit = this.hitTest(g, c), g.__hit && (g.touchstart && g.touchstart(c), g.__isDown = !0, g.__touchData = g.__touchData || {},
						g.__touchData[d.identifier] = c, !g.interactiveChildren))) {
					break
				}
			}
		}
	},
	PIXI.InteractionManager.prototype.onTouchEnd = function(q) {
		this.dirty && this.rebuildInteractiveGraph();
		for(var m = this.interactionDOMElement.getBoundingClientRect(), g = q.changedTouches, b = 0; b < g.length; b++) {
			var d = g[b],
				c = this.touches[d.identifier],
				u = !1;
			c.global.x = (d.clientX - m.left) * (this.target.width / m.width) / this.resolution,
				c.global.y = (d.clientY - m.top) * (this.target.height / m.height) / this.resolution;
			for(var p = this.interactiveItems.length,
					k = 0; p > k; k++) {
				var f = this.interactiveItems[k];
				f.__touchData && f.__touchData[d.identifier] && (f.__hit = this.hitTest(f, f.__touchData[d.identifier]), c.originalEvent = q, (f.touchend || f.tap) && (f.__hit && !u ? (f.touchend && f.touchend(c), f.__isDown && f.tap && f.tap(c), f.interactiveChildren || (u = !0)) : f.__isDown && f.touchendoutside && f.touchendoutside(c), f.__isDown = !1), f.__touchData[d.identifier] = null)
			}
			this.pool.push(c),
				this.touches[d.identifier] = null
		}
	},
	PIXI.Stage = function(a) {
		PIXI.DisplayObjectContainer.call(this),
			this.worldTransform = new PIXI.Matrix,
			this.interactive = !0,
			this.interactionManager = new PIXI.InteractionManager(this),
			this.dirty = !0,
			this.stage = this,
			this.stage.hitArea = new PIXI.Rectangle(0, 0, 100000, 100000),
			this.setBackgroundColor(a)
	},
	PIXI.Stage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
	PIXI.Stage.prototype.constructor = PIXI.Stage,
	PIXI.Stage.prototype.setInteractionDelegate = function(a) {
		this.interactionManager.setTargetDomElement(a)
	},
	PIXI.Stage.prototype.updateTransform = function() {
		this.worldAlpha = 1;
		for(var a = 0,
				b = this.children.length; b > a; a++) {
			this.children[a].updateTransform()
		}
		this.dirty && (this.dirty = !1, this.interactionManager.dirty = !0),
			this.interactive && this.interactionManager.update()
	},
	PIXI.Stage.prototype.setBackgroundColor = function(a) {
		this.backgroundColor = a || 0,
			this.backgroundColorSplit = PIXI.hex2rgb(this.backgroundColor);
		var b = this.backgroundColor.toString(16);
		b = "000000".substr(0, 6 - b.length) + b,
			this.backgroundColorString = "#" + b
	},
	PIXI.Stage.prototype.getMousePosition = function() {
		return this.interactionManager.mouse.global
	},
	function(b) {
		for(var d = 0,
				a = ["ms", "moz", "webkit", "o"], c = 0; c < a.length && !b.requestAnimationFrame; ++c) {
			b.requestAnimationFrame = b[a[c] + "RequestAnimationFrame"],
				b.cancelAnimationFrame = b[a[c] + "CancelAnimationFrame"] || b[a[c] + "CancelRequestAnimationFrame"]
		}
		b.requestAnimationFrame || (b.requestAnimationFrame = function(e) {
				var f = (new Date).getTime(),
					h = Math.max(0, 16 - (f - d)),
					g = b.setTimeout(function() {
							e(f + h)
						},
						h);
				return d = f + h,
					g
			}),
			b.cancelAnimationFrame || (b.cancelAnimationFrame = function(e) {
				clearTimeout(e)
			}),
			b.requestAnimFrame = b.requestAnimationFrame
	}(this),
	PIXI.hex2rgb = function(a) {
		return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255]
	},
	PIXI.rgb2hex = function(a) {
		return(255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
	},
	"function" != typeof Function.prototype.bind && (Function.prototype.bind = function() {
		return function(b) {
			function d() {
				for(var e = arguments.length,
						h = new Array(e); e--;) {
					h[e] = arguments[e]
				}
				return h = g.concat(h),
					a.apply(this instanceof d ? this : b, h)
			}
			var a = this,
				c = arguments.length - 1,
				g = [];
			if(c > 0) {
				for(g.length = c; c--;) {
					g[c] = arguments[c + 1]
				}
			}
			if("function" != typeof a) {
				throw new TypeError
			}
			return d.prototype = function f(e) {
					return e && (f.prototype = e),
						this instanceof f ? void 0 : new f
				}(a.prototype),
				d
		}
	}()),
	PIXI.AjaxRequest = function() {
		var b = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
		if(!window.ActiveXObject) {
			return window.XMLHttpRequest ? new window.XMLHttpRequest : !1
		}
		for(var c = 0; c < b.length; c++) {
			try {
				return new window.ActiveXObject(b[c])
			} catch(a) {}
		}
	},
	PIXI.canUseNewCanvasBlendModes = function() {
		if("undefined" == typeof document) {
			return !1
		}
		var a = document.createElement("canvas");
		a.width = 1,
			a.height = 1;
		var b = a.getContext("2d");
		return b.fillStyle = "#000",
			b.fillRect(0, 0, 1, 1),
			b.globalCompositeOperation = "multiply",
			b.fillStyle = "#fff",
			b.fillRect(0, 0, 1, 1),
			0 === b.getImageData(0, 0, 1, 1).data[0]
	},
	PIXI.getNextPowerOfTwo = function(a) {
		if(a > 0 && 0 === (a & a - 1)) {
			return a
		}
		for(var b = 1; a > b;) {
			b <<= 1
		}
		return b
	},
	PIXI.isPowerOfTwo = function(a, b) {
		return a > 0 && 0 === (a & a - 1) && b > 0 && 0 === (b & b - 1)
	},
	PIXI.PolyK = {},
	PIXI.PolyK.Triangulate = function(w) {
		var J = !0,
			E = w.length >> 1;
		if(3 > E) {
			return []
		}
		for(var z = [], C = [], B = 0; E > B; B++) {
			C.push(B)
		}
		B = 0;
		for(var x = E; x > 3;) {
			var M = C[(B + 0) % x],
				F = C[(B + 1) % x],
				D = C[(B + 2) % x],
				L = w[2 * M],
				K = w[2 * M + 1],
				q = w[2 * F],
				A = w[2 * F + 1],
				H = w[2 * D],
				k = w[2 * D + 1],
				G = !1;
			if(PIXI.PolyK._convex(L, K, q, A, H, k, J)) {
				G = !0;
				for(var m = 0; x > m; m++) {
					var b = C[m];
					if(b !== M && b !== F && b !== D && PIXI.PolyK._PointInTriangle(w[2 * b], w[2 * b + 1], L, K, q, A, H, k)) {
						G = !1;
						break
					}
				}
			}
			if(G) {
				z.push(M, F, D),
					C.splice((B + 1) % x, 1),
					x--,
					B = 0
			} else {
				if(B++ > 3 * x) {
					if(!J) {
						return null
					}
					for(z = [], C = [], B = 0; E > B; B++) {
						C.push(B)
					}
					B = 0,
						x = E,
						J = !1
				}
			}
		}
		return z.push(C[0], C[1], C[2]),
			z
	},
	PIXI.PolyK._PointInTriangle = function(B, O, K, D, G, F, C, S) {
		var L = C - K,
			J = S - D,
			R = G - K,
			Q = F - D,
			A = B - K,
			E = O - D,
			N = L * L + J * J,
			q = L * R + J * Q,
			M = L * A + J * E,
			z = R * R + Q * Q,
			k = R * A + Q * E,
			x = 1 / (N * z - q * q),
			b = (z * M - q * k) * x,
			H = (N * k - q * M) * x;
		return b >= 0 && H >= 0 && 1 > b + H
	},
	PIXI.PolyK._convex = function(b, f, a, d, h, g, c) {
		return(f - d) * (h - a) + (a - b) * (g - d) >= 0 === c
	},
	PIXI.EventTarget = {
		call: function(a) {
			a && (a = a.prototype || a, PIXI.EventTarget.mixin(a))
		},
		mixin: function(a) {
			a.listeners = function(b) {
					return this._listeners = this._listeners || {},
						this._listeners[b] ? this._listeners[b].slice() : []
				},
				a.emit = a.dispatchEvent = function(c, f) {
					if(this._listeners = this._listeners || {},
						"object" == typeof c && (f = c, c = c.type), f && f.__isEventObject === !0 || (f = new PIXI.Event(this, c, f)), this._listeners && this._listeners[c]) {
						var b, d = this._listeners[c].slice(0),
							h = d.length,
							g = d[0];
						for(b = 0; h > b; g = d[++b]) {
							if(g.call(this, f), f.stoppedImmediate) {
								return this
							}
						}
						if(f.stopped) {
							return this
						}
					}
					return this.parent && this.parent.emit && this.parent.emit.call(this.parent, c, f),
						this
				},
				a.on = a.addEventListener = function(b, c) {
					return this._listeners = this._listeners || {},
						(this._listeners[b] = this._listeners[b] || []).push(c),
						this
				},
				a.once = function(c, f) {
					function b() {
						f.apply(d.off(c, b), arguments)
					}
					this._listeners = this._listeners || {};
					var d = this;
					return b._originalHandler = f,
						this.on(c, b)
				},
				a.off = a.removeEventListener = function(c, f) {
					if(this._listeners = this._listeners || {}, !this._listeners[c]) {
						return this
					}
					for(var b = this._listeners[c], d = f ? b.length : 0; d-- > 0;) {
						(b[d] === f || b[d]._originalHandler === f) && b.splice(d, 1)
					}
					return 0 === b.length && delete this._listeners[c],
						this
				},
				a.removeAllListeners = function(b) {
					return this._listeners = this._listeners || {},
						this._listeners[b] ? (delete this._listeners[b], this) : this
				}
		}
	},
	PIXI.Event = function(b, c, a) {
		this.__isEventObject = !0,
			this.stopped = !1,
			this.stoppedImmediate = !1,
			this.target = b,
			this.type = c,
			this.data = a,
			this.content = a,
			this.timeStamp = Date.now()
	},
	PIXI.Event.prototype.stopPropagation = function() {
		this.stopped = !0
	},
	PIXI.Event.prototype.stopImmediatePropagation = function() {
		this.stoppedImmediate = !0
	},
	PIXI.autoDetectRenderer = function(b, d, a) {
		b || (b = 800),
			d || (d = 600);
		var c = function() {
			try {
				var f = document.createElement("canvas");
				return !!window.WebGLRenderingContext && (f.getContext("webgl") || f.getContext("experimental-webgl"))
			} catch(g) {
				return !1
			}
		}();
		return c ? new PIXI.WebGLRenderer(b, d, a) : new PIXI.CanvasRenderer(b, d, a)
	},
	PIXI.autoDetectRecommendedRenderer = function(b, d, a) {
		b || (b = 800),
			d || (d = 600);
		var c = function() {
				try {
					var g = document.createElement("canvas");
					return !!window.WebGLRenderingContext && (g.getContext("webgl") || g.getContext("experimental-webgl"))
				} catch(h) {
					return !1
				}
			}(),
			f = /Android/i.test(navigator.userAgent);
		return c && !f ? new PIXI.WebGLRenderer(b, d, a) : new PIXI.CanvasRenderer(b, d, a)
	},
	PIXI.initDefaultShaders = function() {},
	PIXI.CompileVertexShader = function(a, b) {
		return PIXI._CompileShader(a, b, a.VERTEX_SHADER)
	},
	PIXI.CompileFragmentShader = function(a, b) {
		return PIXI._CompileShader(a, b, a.FRAGMENT_SHADER)
	},
	PIXI._CompileShader = function(b, d, a) {
		var c = d.join("\n"),
			f = b.createShader(a);
		return b.shaderSource(f, c),
			b.compileShader(f),
			b.getShaderParameter(f, b.COMPILE_STATUS) ? f : (window.console.log(b.getShaderInfoLog(f)), null)
	},
	PIXI.compileProgram = function(b, d, a) {
		var c = PIXI.CompileFragmentShader(b, a),
			g = PIXI.CompileVertexShader(b, d),
			f = b.createProgram();
		return b.attachShader(f, g),
			b.attachShader(f, c),
			b.linkProgram(f),
			b.getProgramParameter(f, b.LINK_STATUS) || window.console.log("Could not initialise shaders"),
			f
	},
	PIXI.PixiShader = function(a) {
		this._UID = PIXI._UID++,
			this.gl = a,
			this.program = null,
			this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"],
			this.textureCount = 0,
			this.firstRun = !0,
			this.dirty = !0,
			this.attributes = [],
			this.init()
	},
	PIXI.PixiShader.prototype.constructor = PIXI.PixiShader,
	PIXI.PixiShader.prototype.init = function() {
		var b = this.gl,
			c = PIXI.compileProgram(b, this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc);
		b.useProgram(c),
			this.uSampler = b.getUniformLocation(c, "uSampler"),
			this.projectionVector = b.getUniformLocation(c, "projectionVector"),
			this.offsetVector = b.getUniformLocation(c, "offsetVector"),
			this.dimensions = b.getUniformLocation(c, "dimensions"),
			this.aVertexPosition = b.getAttribLocation(c, "aVertexPosition"),
			this.aTextureCoord = b.getAttribLocation(c, "aTextureCoord"),
			this.colorAttribute = b.getAttribLocation(c, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2),
			this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
		for(var a in this.uniforms) {
			this.uniforms[a].uniformLocation = b.getUniformLocation(c, a)
		}
		this.initUniforms(),
			this.program = c
	},
	PIXI.PixiShader.prototype.initUniforms = function() {
		this.textureCount = 1;
		var b, d = this.gl;
		for(var a in this.uniforms) {
			b = this.uniforms[a];
			var c = b.type;
			"sampler2D" === c ? (b._init = !1, null !== b.value && this.initSampler2D(b)) : "mat2" === c || "mat3" === c || "mat4" === c ? (b.glMatrix = !0, b.glValueLength = 1, "mat2" === c ? b.glFunc = d.uniformMatrix2fv : "mat3" === c ? b.glFunc = d.uniformMatrix3fv : "mat4" === c && (b.glFunc = d.uniformMatrix4fv)) : (b.glFunc = d["uniform" + c], "2f" === c || "2i" === c ? b.glValueLength = 2 : "3f" === c || "3i" === c ? b.glValueLength = 3 : "4f" === c || "4i" === c ? b.glValueLength = 4 : b.glValueLength = 1)
		}
	},
	PIXI.PixiShader.prototype.initSampler2D = function(v) {
		if(v.value && v.value.baseTexture && v.value.baseTexture.hasLoaded) {
			var p = this.gl;
			if(p.activeTexture(p["TEXTURE" + this.textureCount]), p.bindTexture(p.TEXTURE_2D, v.value.baseTexture._glTextures[p.id]), v.textureData) {
				var k = v.textureData,
					b = k.magFilter ? k.magFilter : p.LINEAR,
					f = k.minFilter ? k.minFilter : p.LINEAR,
					d = k.wrapS ? k.wrapS : p.CLAMP_TO_EDGE,
					w = k.wrapT ? k.wrapT : p.CLAMP_TO_EDGE,
					u = k.luminance ? p.LUMINANCE : p.RGBA;
				if(k.repeat && (d = p.REPEAT, w = p.REPEAT), p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !!k.flipY), k.width) {
					var m = k.width ? k.width : 512,
						g = k.height ? k.height : 2,
						q = k.border ? k.border : 0;
					p.texImage2D(p.TEXTURE_2D, 0, u, m, g, q, u, p.UNSIGNED_BYTE, null)
				} else {
					p.texImage2D(p.TEXTURE_2D, 0, u, p.RGBA, p.UNSIGNED_BYTE, v.value.baseTexture.source)
				}
				p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, b),
					p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, f),
					p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, d),
					p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, w)
			}
			p.uniform1i(v.uniformLocation, this.textureCount),
				v._init = !0,
				this.textureCount++
		}
	},
	PIXI.PixiShader.prototype.syncUniforms = function() {
		this.textureCount = 1;
		var b, c = this.gl;
		for(var a in this.uniforms) {
			b = this.uniforms[a],
				1 === b.glValueLength ? b.glMatrix === !0 ? b.glFunc.call(c, b.uniformLocation, b.transpose, b.value) : b.glFunc.call(c, b.uniformLocation, b.value) : 2 === b.glValueLength ? b.glFunc.call(c, b.uniformLocation, b.value.x, b.value.y) : 3 === b.glValueLength ? b.glFunc.call(c, b.uniformLocation, b.value.x, b.value.y, b.value.z) : 4 === b.glValueLength ? b.glFunc.call(c, b.uniformLocation, b.value.x, b.value.y, b.value.z, b.value.w) : "sampler2D" === b.type && (b._init ? (c.activeTexture(c["TEXTURE" + this.textureCount]), b.value.baseTexture._dirty[c.id] ? PIXI.instances[c.id].updateTexture(b.value.baseTexture) : c.bindTexture(c.TEXTURE_2D, b.value.baseTexture._glTextures[c.id]), c.uniform1i(b.uniformLocation, this.textureCount), this.textureCount++) : this.initSampler2D(b))
		}
	},
	PIXI.PixiShader.prototype.destroy = function() {
		this.gl.deleteProgram(this.program),
			this.uniforms = null,
			this.gl = null,
			this.attributes = null
	},
	PIXI.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"],
	PIXI.PixiFastShader = function(a) {
		this._UID = PIXI._UID++,
			this.gl = a,
			this.program = null,
			this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"],
			this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"],
			this.textureCount = 0,
			this.init()
	},
	PIXI.PixiFastShader.prototype.constructor = PIXI.PixiFastShader,
	PIXI.PixiFastShader.prototype.init = function() {
		var a = this.gl,
			b = PIXI.compileProgram(a, this.vertexSrc, this.fragmentSrc);
		a.useProgram(b),
			this.uSampler = a.getUniformLocation(b, "uSampler"),
			this.projectionVector = a.getUniformLocation(b, "projectionVector"),
			this.offsetVector = a.getUniformLocation(b, "offsetVector"),
			this.dimensions = a.getUniformLocation(b, "dimensions"),
			this.uMatrix = a.getUniformLocation(b, "uMatrix"),
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"),
			this.aPositionCoord = a.getAttribLocation(b, "aPositionCoord"),
			this.aScale = a.getAttribLocation(b, "aScale"),
			this.aRotation = a.getAttribLocation(b, "aRotation"),
			this.aTextureCoord = a.getAttribLocation(b, "aTextureCoord"),
			this.colorAttribute = a.getAttribLocation(b, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2),
			this.attributes = [this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute],
			this.program = b
	},
	PIXI.PixiFastShader.prototype.destroy = function() {
		this.gl.deleteProgram(this.program),
			this.uniforms = null,
			this.gl = null,
			this.attributes = null
	},
	PIXI.StripShader = function(a) {
		this._UID = PIXI._UID++,
			this.gl = a,
			this.program = null,
			this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;", "}"],
			this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"],
			this.init()
	},
	PIXI.StripShader.prototype.constructor = PIXI.StripShader,
	PIXI.StripShader.prototype.init = function() {
		var a = this.gl,
			b = PIXI.compileProgram(a, this.vertexSrc, this.fragmentSrc);
		a.useProgram(b),
			this.uSampler = a.getUniformLocation(b, "uSampler"),
			this.projectionVector = a.getUniformLocation(b, "projectionVector"),
			this.offsetVector = a.getUniformLocation(b, "offsetVector"),
			this.colorAttribute = a.getAttribLocation(b, "aColor"),
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"),
			this.aTextureCoord = a.getAttribLocation(b, "aTextureCoord"),
			this.attributes = [this.aVertexPosition, this.aTextureCoord],
			this.translationMatrix = a.getUniformLocation(b, "translationMatrix"),
			this.alpha = a.getUniformLocation(b, "alpha"),
			this.program = b
	},
	PIXI.StripShader.prototype.destroy = function() {
		this.gl.deleteProgram(this.program),
			this.uniforms = null,
			this.gl = null,
			this.attribute = null
	},
	PIXI.PrimitiveShader = function(a) {
		this._UID = PIXI._UID++,
			this.gl = a,
			this.program = null,
			this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"],
			this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"],
			this.init()
	},
	PIXI.PrimitiveShader.prototype.constructor = PIXI.PrimitiveShader,
	PIXI.PrimitiveShader.prototype.init = function() {
		var a = this.gl,
			b = PIXI.compileProgram(a, this.vertexSrc, this.fragmentSrc);
		a.useProgram(b),
			this.projectionVector = a.getUniformLocation(b, "projectionVector"),
			this.offsetVector = a.getUniformLocation(b, "offsetVector"),
			this.tintColor = a.getUniformLocation(b, "tint"),
			this.flipY = a.getUniformLocation(b, "flipY"),
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"),
			this.colorAttribute = a.getAttribLocation(b, "aColor"),
			this.attributes = [this.aVertexPosition, this.colorAttribute],
			this.translationMatrix = a.getUniformLocation(b, "translationMatrix"),
			this.alpha = a.getUniformLocation(b, "alpha"),
			this.program = b
	},
	PIXI.PrimitiveShader.prototype.destroy = function() {
		this.gl.deleteProgram(this.program),
			this.uniforms = null,
			this.gl = null,
			this.attributes = null
	},
	PIXI.ComplexPrimitiveShader = function(a) {
		this._UID = PIXI._UID++,
			this.gl = a,
			this.program = null,
			this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"],
			this.vertexSrc = ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "uniform float flipY;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"],
			this.init()
	},
	PIXI.ComplexPrimitiveShader.prototype.constructor = PIXI.ComplexPrimitiveShader,
	PIXI.ComplexPrimitiveShader.prototype.init = function() {
		var a = this.gl,
			b = PIXI.compileProgram(a, this.vertexSrc, this.fragmentSrc);
		a.useProgram(b),
			this.projectionVector = a.getUniformLocation(b, "projectionVector"),
			this.offsetVector = a.getUniformLocation(b, "offsetVector"),
			this.tintColor = a.getUniformLocation(b, "tint"),
			this.color = a.getUniformLocation(b, "color"),
			this.flipY = a.getUniformLocation(b, "flipY"),
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"),
			this.attributes = [this.aVertexPosition, this.colorAttribute],
			this.translationMatrix = a.getUniformLocation(b, "translationMatrix"),
			this.alpha = a.getUniformLocation(b, "alpha"),
			this.program = b
	},
	PIXI.ComplexPrimitiveShader.prototype.destroy = function() {
		this.gl.deleteProgram(this.program),
			this.uniforms = null,
			this.gl = null,
			this.attribute = null
	},
	PIXI.WebGLGraphics = function() {},
	PIXI.WebGLGraphics.renderGraphics = function(m, k) {
		var f, b = k.gl,
			d = k.projection,
			c = k.offset,
			p = k.shaderManager.primitiveShader;
		m.dirty && PIXI.WebGLGraphics.updateGraphics(m, b);
		for(var l = m._webGL[b.id], g = 0; g < l.data.length; g++) {
			1 === l.data[g].mode ? (f = l.data[g], k.stencilManager.pushStencil(m, f, k), b.drawElements(b.TRIANGLE_FAN, 4, b.UNSIGNED_SHORT, 2 * (f.indices.length - 4)), k.stencilManager.popStencil(m, f, k)) : (f = l.data[g], k.shaderManager.setShader(p), p = k.shaderManager.primitiveShader, b.uniformMatrix3fv(p.translationMatrix, !1, m.worldTransform.toArray(!0)), b.uniform1f(p.flipY, 1), b.uniform2f(p.projectionVector, d.x, -d.y), b.uniform2f(p.offsetVector, -c.x, -c.y), b.uniform3fv(p.tintColor, PIXI.hex2rgb(m.tint)), b.uniform1f(p.alpha, m.worldAlpha), b.bindBuffer(b.ARRAY_BUFFER, f.buffer), b.vertexAttribPointer(p.aVertexPosition, 2, b.FLOAT, !1, 24, 0), b.vertexAttribPointer(p.colorAttribute, 4, b.FLOAT, !1, 24, 8), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, f.indexBuffer), b.drawElements(b.TRIANGLE_STRIP, f.indices.length, b.UNSIGNED_SHORT, 0))
		}
	},
	PIXI.WebGLGraphics.updateGraphics = function(d, h) {
		var c = d._webGL[h.id];
		c || (c = d._webGL[h.id] = {
				lastIndex: 0,
				data: [],
				gl: h
			}),
			d.dirty = !1;
		var g;
		if(d.clearDirty) {
			for(d.clearDirty = !1, g = 0; g < c.data.length; g++) {
				var l = c.data[g];
				l.reset(),
					PIXI.WebGLGraphics.graphicsDataPool.push(l)
			}
			c.data = [],
				c.lastIndex = 0
		}
		var k;
		for(g = c.lastIndex; g < d.graphicsData.length; g++) {
			var f = d.graphicsData[g];
			if(f.type === PIXI.Graphics.POLY) {
				if(f.points = f.shape.points.slice(), f.shape.closed && (f.points[0] !== f.points[f.points.length - 2] || f.points[1] !== f.points[f.points.length - 1]) && f.points.push(f.points[0], f.points[1]), f.fill && f.points.length >= 6) {
					if(f.points.length < 12) {
						k = PIXI.WebGLGraphics.switchMode(c, 0);
						var b = PIXI.WebGLGraphics.buildPoly(f, k);
						b || (k = PIXI.WebGLGraphics.switchMode(c, 1), PIXI.WebGLGraphics.buildComplexPoly(f, k))
					} else {
						k = PIXI.WebGLGraphics.switchMode(c, 1),
							PIXI.WebGLGraphics.buildComplexPoly(f, k)
					}
				}
				f.lineWidth > 0 && (k = PIXI.WebGLGraphics.switchMode(c, 0), PIXI.WebGLGraphics.buildLine(f, k))
			} else {
				k = PIXI.WebGLGraphics.switchMode(c, 0),
					f.type === PIXI.Graphics.RECT ? PIXI.WebGLGraphics.buildRectangle(f, k) : f.type === PIXI.Graphics.CIRC || f.type === PIXI.Graphics.ELIP ? PIXI.WebGLGraphics.buildCircle(f, k) : f.type === PIXI.Graphics.RREC && PIXI.WebGLGraphics.buildRoundedRectangle(f, k)
			}
			c.lastIndex++
		}
		for(g = 0; g < c.data.length; g++) {
			k = c.data[g],
				k.dirty && k.upload()
		}
	},
	PIXI.WebGLGraphics.switchMode = function(b, c) {
		var a;
		return b.data.length ? (a = b.data[b.data.length - 1], (a.mode !== c || 1 === c) && (a = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(b.gl), a.mode = c, b.data.push(a))) : (a = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(b.gl), a.mode = c, b.data.push(a)),
			a.dirty = !0,
			a
	},
	PIXI.WebGLGraphics.buildRectangle = function(E, y) {
		var v = E.shape,
			b = v.x,
			m = v.y,
			k = v.width,
			F = v.height;
		if(E.fill) {
			var B = PIXI.hex2rgb(E.fillColor),
				w = E.fillAlpha,
				q = B[0] * w,
				A = B[1] * w,
				z = B[2] * w,
				D = y.points,
				g = y.indices,
				x = D.length / 6;
			D.push(b, m),
				D.push(q, A, z, w),
				D.push(b + k, m),
				D.push(q, A, z, w),
				D.push(b, m + F),
				D.push(q, A, z, w),
				D.push(b + k, m + F),
				D.push(q, A, z, w),
				g.push(x, x, x + 1, x + 2, x + 3, x + 3)
		}
		if(E.lineWidth) {
			var C = E.points;
			E.points = [b, m, b + k, m, b + k, m + F, b, m + F, b, m],
				PIXI.WebGLGraphics.buildLine(E, y),
				E.points = C
		}
	},
	PIXI.WebGLGraphics.buildRoundedRectangle = function(z, L) {
		var G = z.shape,
			B = G.x,
			E = G.y,
			D = G.width,
			A = G.height,
			O = G.radius,
			H = [];
		if(H.push(B, E + O), H = H.concat(PIXI.WebGLGraphics.quadraticBezierCurve(B, E + A - O, B, E + A, B + O, E + A)), H = H.concat(PIXI.WebGLGraphics.quadraticBezierCurve(B + D - O, E + A, B + D, E + A, B + D, E + A - O)), H = H.concat(PIXI.WebGLGraphics.quadraticBezierCurve(B + D, E + O, B + D, E, B + D - O, E)), H = H.concat(PIXI.WebGLGraphics.quadraticBezierCurve(B + O, E, B, E, B, E + O)), z.fill) {
			var F = PIXI.hex2rgb(z.fillColor),
				N = z.fillAlpha,
				M = F[0] * N,
				x = F[1] * N,
				C = F[2] * N,
				K = L.points,
				k = L.indices,
				J = K.length / 6,
				q = PIXI.PolyK.Triangulate(H),
				b = 0;
			for(b = 0; b < q.length; b += 3) {
				k.push(q[b] + J),
					k.push(q[b] + J),
					k.push(q[b + 1] + J),
					k.push(q[b + 2] + J),
					k.push(q[b + 2] + J)
			}
			for(b = 0; b < H.length; b++) {
				K.push(H[b], H[++b], M, x, C, N)
			}
		}
		if(z.lineWidth) {
			var m = z.points;
			z.points = H,
				PIXI.WebGLGraphics.buildLine(z, L),
				z.points = m
		}
	},
	PIXI.WebGLGraphics.quadraticBezierCurve = function(G, A, w, b, q, m) {
		function H(c, f, a) {
			var d = f - c;
			return c + d * a
		}
		for(var D, x, v, C, B, F, k = 20,
				z = [], E = 0, y = 0; k >= y; y++) {
			E = y / k,
				D = H(G, w, E),
				x = H(A, b, E),
				v = H(w, q, E),
				C = H(b, m, E),
				B = H(D, v, E),
				F = H(x, C, E),
				z.push(B, F)
		}
		return z
	},
	PIXI.WebGLGraphics.buildCircle = function(w, J) {
		var E, z, C = w.shape,
			B = C.x,
			x = C.y;
		w.type === PIXI.Graphics.CIRC ? (E = C.radius, z = C.radius) : (E = C.width, z = C.height);
		var M = 40,
			F = 2 * Math.PI / M,
			D = 0;
		if(w.fill) {
			var L = PIXI.hex2rgb(w.fillColor),
				K = w.fillAlpha,
				q = L[0] * K,
				A = L[1] * K,
				H = L[2] * K,
				k = J.points,
				G = J.indices,
				m = k.length / 6;
			for(G.push(m), D = 0; M + 1 > D; D++) {
				k.push(B, x, q, A, H, K),
					k.push(B + Math.sin(F * D) * E, x + Math.cos(F * D) * z, q, A, H, K),
					G.push(m++, m++)
			}
			G.push(m - 1)
		}
		if(w.lineWidth) {
			var b = w.points;
			for(w.points = [], D = 0; M + 1 > D; D++) {
				w.points.push(B + Math.sin(F * D) * E, x + Math.cos(F * D) * z)
			}
			PIXI.WebGLGraphics.buildLine(w, J),
				w.points = b
		}
	},
	PIXI.WebGLGraphics.buildLine = function(an, aB) {
		var ax = 0,
			ap = an.points;
		if(0 !== ap.length) {
			if(an.lineWidth % 2) {
				for(ax = 0; ax < ap.length; ax++) {
					ap[ax] += 0.5
				}
			}
			var at = new PIXI.Point(ap[0], ap[1]),
				ar = new PIXI.Point(ap[ap.length - 2], ap[ap.length - 1]);
			if(at.x === ar.x && at.y === ar.y) {
				ap = ap.slice(),
					ap.pop(),
					ap.pop(),
					ar = new PIXI.Point(ap[ap.length - 2], ap[ap.length - 1]);
				var ao = ar.x + 0.5 * (at.x - ar.x),
					aF = ar.y + 0.5 * (at.y - ar.y);
				ap.unshift(ao, aF),
					ap.push(ao, aF)
			}
			var ay, av, aD, aC, am, aq, aA, aa, az, al, ai, ak, Q, au, aj, aE, J, q, K, af, Y, aG, ad, N = aB.points,
				ah = aB.indices,
				Z = ap.length / 2,
				ag = ap.length,
				ab = N.length / 6,
				V = an.lineWidth / 2,
				ae = PIXI.hex2rgb(an.lineColor),
				ac = an.lineAlpha,
				H = ae[0] * ac,
				aw = ae[1] * ac,
				z = ae[2] * ac;
			for(aD = ap[0], aC = ap[1], am = ap[2], aq = ap[3], az = -(aC - aq), al = aD - am, ad = Math.sqrt(az * az + al * al), az /= ad, al /= ad, az *= V, al *= V, N.push(aD - az, aC - al, H, aw, z, ac), N.push(aD + az, aC + al, H, aw, z, ac), ax = 1; Z - 1 > ax; ax++) {
				aD = ap[2 * (ax - 1)],
					aC = ap[2 * (ax - 1) + 1],
					am = ap[2 * ax],
					aq = ap[2 * ax + 1],
					aA = ap[2 * (ax + 1)],
					aa = ap[2 * (ax + 1) + 1],
					az = -(aC - aq),
					al = aD - am,
					ad = Math.sqrt(az * az + al * al),
					az /= ad,
					al /= ad,
					az *= V,
					al *= V,
					ai = -(aq - aa),
					ak = am - aA,
					ad = Math.sqrt(ai * ai + ak * ak),
					ai /= ad,
					ak /= ad,
					ai *= V,
					ak *= V,
					aj = -al + aC - (-al + aq),
					aE = -az + am - (-az + aD),
					J = (-az + aD) * (-al + aq) - (-az + am) * (-al + aC),
					q = -ak + aa - (-ak + aq),
					K = -ai + am - (-ai + aA),
					af = (-ai + aA) * (-ak + aq) - (-ai + am) * (-ak + aa),
					Y = aj * K - q * aE,
					Math.abs(Y) < 0.1 ? (Y += 10.1, N.push(am - az, aq - al, H, aw, z, ac), N.push(am + az, aq + al, H, aw, z, ac)) : (ay = (aE * af - K * J) / Y, av = (q * J - aj * af) / Y, aG = (ay - am) * (ay - am) + (av - aq) + (av - aq), aG > 19600 ? (Q = az - ai, au = al - ak, ad = Math.sqrt(Q * Q + au * au), Q /= ad, au /= ad, Q *= V, au *= V, N.push(am - Q, aq - au), N.push(H, aw, z, ac), N.push(am + Q, aq + au), N.push(H, aw, z, ac), N.push(am - Q, aq - au), N.push(H, aw, z, ac), ag++) : (N.push(ay, av), N.push(H, aw, z, ac), N.push(am - (ay - am), aq - (av - aq)), N.push(H, aw, z, ac)))
			}
			for(aD = ap[2 * (Z - 2)], aC = ap[2 * (Z - 2) + 1], am = ap[2 * (Z - 1)], aq = ap[2 * (Z - 1) + 1], az = -(aC - aq), al = aD - am, ad = Math.sqrt(az * az + al * al), az /= ad, al /= ad, az *= V, al *= V, N.push(am - az, aq - al), N.push(H, aw, z, ac), N.push(am + az, aq + al), N.push(H, aw, z, ac), ah.push(ab), ax = 0; ag > ax; ax++) {
				ah.push(ab++)
			}
			ah.push(ab - 1)
		}
	},
	PIXI.WebGLGraphics.buildComplexPoly = function(x, q) {
		var m = x.points.slice();
		if(!(m.length < 6)) {
			var b = q.indices;
			q.points = m,
				q.alpha = x.fillAlpha,
				q.color = PIXI.hex2rgb(x.fillColor);
			for(var g, f, y = 1 / 0,
					w = -(1 / 0), p = 1 / 0, k = -(1 / 0), v = 0; v < m.length; v += 2) {
				g = m[v],
					f = m[v + 1],
					y = y > g ? g : y,
					w = g > w ? g : w,
					p = p > f ? f : p,
					k = f > k ? f : k
			}
			m.push(y, p, w, p, w, k, y, k);
			var u = m.length / 2;
			for(v = 0; u > v; v++) {
				b.push(v)
			}
		}
	},
	PIXI.WebGLGraphics.buildPoly = function(B, w) {
		var q = B.points;
		if(!(q.length < 6)) {
			var b = w.points,
				k = w.indices,
				g = q.length / 2,
				C = PIXI.hex2rgb(B.fillColor),
				z = B.fillAlpha,
				v = C[0] * z,
				m = C[1] * z,
				y = C[2] * z,
				x = PIXI.PolyK.Triangulate(q);
			if(!x) {
				return !1
			}
			var A = b.length / 6,
				f = 0;
			for(f = 0; f < x.length; f += 3) {
				k.push(x[f] + A),
					k.push(x[f] + A),
					k.push(x[f + 1] + A),
					k.push(x[f + 2] + A),
					k.push(x[f + 2] + A)
			}
			for(f = 0; g > f; f++) {
				b.push(q[2 * f], q[2 * f + 1], v, m, y, z)
			}
			return !0
		}
	},
	PIXI.WebGLGraphics.graphicsDataPool = [],
	PIXI.WebGLGraphicsData = function(a) {
		this.gl = a,
			this.color = [0, 0, 0],
			this.points = [],
			this.indices = [],
			this.buffer = a.createBuffer(),
			this.indexBuffer = a.createBuffer(),
			this.mode = 1,
			this.alpha = 1,
			this.dirty = !0
	},
	PIXI.WebGLGraphicsData.prototype.reset = function() {
		this.points = [],
			this.indices = []
	},
	PIXI.WebGLGraphicsData.prototype.upload = function() {
		var a = this.gl;
		this.glPoints = new PIXI.Float32Array(this.points),
			a.bindBuffer(a.ARRAY_BUFFER, this.buffer),
			a.bufferData(a.ARRAY_BUFFER, this.glPoints, a.STATIC_DRAW),
			this.glIndicies = new PIXI.Uint16Array(this.indices),
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.glIndicies, a.STATIC_DRAW),
			this.dirty = !1
	},
	PIXI.glContexts = [],
	PIXI.instances = [],
	PIXI.WebGLRenderer = function(b, d, a) {
		if(a) {
			for(var c in PIXI.defaultRenderOptions) {
				"undefined" == typeof a[c] && (a[c] = PIXI.defaultRenderOptions[c])
			}
		} else {
			a = PIXI.defaultRenderOptions
		}
		PIXI.defaultRenderer || (PIXI.sayHello("webGL"), PIXI.defaultRenderer = this),
			this.type = PIXI.WEBGL_RENDERER,
			this.resolution = a.resolution,
			this.transparent = a.transparent,
			this.autoResize = a.autoResize || !1,
			this.preserveDrawingBuffer = a.preserveDrawingBuffer,
			this.clearBeforeRender = a.clearBeforeRender,
			this.width = b || 800,
			this.height = d || 600,
			this.view = a.view || document.createElement("canvas"),
			this.contextLostBound = this.handleContextLost.bind(this),
			this.contextRestoredBound = this.handleContextRestored.bind(this),
			this.view.addEventListener("webglcontextlost", this.contextLostBound, !1),
			this.view.addEventListener("webglcontextrestored", this.contextRestoredBound, !1),
			this._contextOptions = {
				alpha: this.transparent,
				antialias: a.antialias,
				premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
				stencil: !0,
				preserveDrawingBuffer: a.preserveDrawingBuffer
			},
			this.projection = new PIXI.Point,
			this.offset = new PIXI.Point(0, 0),
			this.shaderManager = new PIXI.WebGLShaderManager,
			this.spriteBatch = new PIXI.WebGLSpriteBatch,
			this.maskManager = new PIXI.WebGLMaskManager,
			this.filterManager = new PIXI.WebGLFilterManager,
			this.stencilManager = new PIXI.WebGLStencilManager,
			this.blendModeManager = new PIXI.WebGLBlendModeManager,
			this.renderSession = {
				roundPixels: !0
			},
			this.renderSession.gl = this.gl,
			this.renderSession.drawCount = 0,
			this.renderSession.shaderManager = this.shaderManager,
			this.renderSession.maskManager = this.maskManager,
			this.renderSession.filterManager = this.filterManager,
			this.renderSession.blendModeManager = this.blendModeManager,
			this.renderSession.spriteBatch = this.spriteBatch,
			this.renderSession.stencilManager = this.stencilManager,
			this.renderSession.renderer = this,
			this.renderSession.resolution = this.resolution,
			this.initContext(),
			this.mapBlendModes()
	},
	PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer,
	PIXI.WebGLRenderer.prototype.initContext = function() {
		var a = this.view.getContext("webgl", this._contextOptions) || this.view.getContext("experimental-webgl", this._contextOptions);
		if(this.gl = a, !a) {
			throw new Error("This browser does not support webGL. Try using the canvas renderer")
		}
		this.glContextId = a.id = PIXI.WebGLRenderer.glContextId++,
			PIXI.glContexts[this.glContextId] = a,
			PIXI.instances[this.glContextId] = this,
			a.disable(a.DEPTH_TEST),
			a.disable(a.CULL_FACE),
			a.enable(a.BLEND),
			this.shaderManager.setContext(a),
			this.spriteBatch.setContext(a),
			this.maskManager.setContext(a),
			this.filterManager.setContext(a),
			this.blendModeManager.setContext(a),
			this.stencilManager.setContext(a),
			this.renderSession.gl = this.gl,
			this.resize(this.width, this.height)
	},
	PIXI.WebGLRenderer.prototype.render = function(a) {
		if(!this.contextLost) {
			this.__stage !== a && (a.interactive && a.interactionManager.removeEvents(), this.__stage = a),
				a.updateTransform();
			var b = this.gl;
			a._interactiveEventsAdded || (a._interactiveEventsAdded = !0, a.interactionManager.setTarget(this)),
				b.viewport(0, 0, this.width, this.height),
				b.bindFramebuffer(b.FRAMEBUFFER, null),
				b.clearColor(a.backgroundColorSplit[0], a.backgroundColorSplit[1], a.backgroundColorSplit[2], 1),
				b.clear(b.COLOR_BUFFER_BIT),
				this.renderDisplayObject(a, this.projection)
		}
	},
	PIXI.WebGLRenderer.prototype.renderDisplayObject = function(b, c, a) {
		this.renderSession.blendModeManager.setBlendMode(PIXI.blendModes.NORMAL),
			this.renderSession.drawCount = 0,
			this.renderSession.flipY = a ? -1 : 1,
			this.renderSession.projection = c,
			this.renderSession.offset = this.offset,
			this.spriteBatch.begin(this.renderSession),
			this.filterManager.begin(this.renderSession, a),
			b._renderWebGL(this.renderSession),
			this.spriteBatch.end()
	},
	PIXI.WebGLRenderer.prototype.resize = function(a, b) {
		this.width = a * this.resolution,
			this.height = b * this.resolution,
			this.view.width = this.width,
			this.view.height = this.height,
			this.gl.viewport(0, 0, this.width, this.height),
			this.projection.x = this.width / 2 / this.resolution,
			this.projection.y = -this.height / 2 / this.resolution
	},
	PIXI.WebGLRenderer.prototype.updateTexture = function(a) {
		if(a.hasLoaded) {
			var b = this.gl;
			return a._glTextures[b.id] || (a._glTextures[b.id] = b.createTexture()),
				b.bindTexture(b.TEXTURE_2D, a._glTextures[b.id]),
				b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultipliedAlpha),
				b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.source),
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a.scaleMode === PIXI.scaleModes.LINEAR ? b.LINEAR : b.NEAREST),
				a.mipmap && PIXI.isPowerOfTwo(a.width, a.height) ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === PIXI.scaleModes.LINEAR ? b.LINEAR_MIPMAP_LINEAR : b.NEAREST_MIPMAP_NEAREST), b.generateMipmap(b.TEXTURE_2D)) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === PIXI.scaleModes.LINEAR ? b.LINEAR : b.NEAREST),
				a._powerOf2 ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE)),
				a._dirty[b.id] = !1,
				a._glTextures[b.id]
		}
	},
	PIXI.WebGLRenderer.prototype.handleContextLost = function(a) {
		a.preventDefault(),
			this.contextLost = !0
	},
	PIXI.WebGLRenderer.prototype.handleContextRestored = function() {
		this.initContext();
		for(var a in PIXI.TextureCache) {
			var b = PIXI.TextureCache[a].baseTexture;
			b._glTextures = []
		}
		this.contextLost = !1
	},
	PIXI.WebGLRenderer.prototype.destroy = function() {
		this.view.removeEventListener("webglcontextlost", this.contextLostBound),
			this.view.removeEventListener("webglcontextrestored", this.contextRestoredBound),
			PIXI.glContexts[this.glContextId] = null,
			this.projection = null,
			this.offset = null,
			this.shaderManager.destroy(),
			this.spriteBatch.destroy(),
			this.maskManager.destroy(),
			this.filterManager.destroy(),
			this.shaderManager = null,
			this.spriteBatch = null,
			this.maskManager = null,
			this.filterManager = null,
			this.gl = null,
			this.renderSession = null
	},
	PIXI.WebGLRenderer.prototype.mapBlendModes = function() {
		var a = this.gl;
		PIXI.blendModesWebGL || (PIXI.blendModesWebGL = [], PIXI.blendModesWebGL[PIXI.blendModes.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.ADD] = [a.SRC_ALPHA, a.DST_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.SCREEN] = [a.SRC_ALPHA, a.ONE], PIXI.blendModesWebGL[PIXI.blendModes.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], PIXI.blendModesWebGL[PIXI.blendModes.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA])
	},
	PIXI.WebGLRenderer.glContextId = 0,
	PIXI.WebGLBlendModeManager = function() {
		this.currentBlendMode = 99999
	},
	PIXI.WebGLBlendModeManager.prototype.constructor = PIXI.WebGLBlendModeManager,
	PIXI.WebGLBlendModeManager.prototype.setContext = function(a) {
		this.gl = a
	},
	PIXI.WebGLBlendModeManager.prototype.setBlendMode = function(a) {
		if(this.currentBlendMode === a) {
			return !1
		}
		this.currentBlendMode = a;
		var b = PIXI.blendModesWebGL[this.currentBlendMode];
		return this.gl.blendFunc(b[0], b[1]), !0
	},
	PIXI.WebGLBlendModeManager.prototype.destroy = function() {
		this.gl = null
	},
	PIXI.WebGLMaskManager = function() {},
	PIXI.WebGLMaskManager.prototype.constructor = PIXI.WebGLMaskManager,
	PIXI.WebGLMaskManager.prototype.setContext = function(a) {
		this.gl = a
	},
	PIXI.WebGLMaskManager.prototype.pushMask = function(b, c) {
		var a = c.gl;
		b.dirty && PIXI.WebGLGraphics.updateGraphics(b, a),
			b._webGL[a.id].data.length && c.stencilManager.pushStencil(b, b._webGL[a.id].data[0], c)
	},
	PIXI.WebGLMaskManager.prototype.popMask = function(b, c) {
		var a = this.gl;
		c.stencilManager.popStencil(b, b._webGL[a.id].data[0], c)
	},
	PIXI.WebGLMaskManager.prototype.destroy = function() {
		this.gl = null
	},
	PIXI.WebGLStencilManager = function() {
		this.stencilStack = [],
			this.reverse = !0,
			this.count = 0
	},
	PIXI.WebGLStencilManager.prototype.setContext = function(a) {
		this.gl = a
	},
	PIXI.WebGLStencilManager.prototype.pushStencil = function(b, d, a) {
		var c = this.gl;
		this.bindGraphics(b, d, a),
			0 === this.stencilStack.length && (c.enable(c.STENCIL_TEST), c.clear(c.STENCIL_BUFFER_BIT), this.reverse = !0, this.count = 0),
			this.stencilStack.push(d);
		var f = this.count;
		c.colorMask(!1, !1, !1, !1),
			c.stencilFunc(c.ALWAYS, 0, 255),
			c.stencilOp(c.KEEP, c.KEEP, c.INVERT),
			1 === d.mode ? (c.drawElements(c.TRIANGLE_FAN, d.indices.length - 4, c.UNSIGNED_SHORT, 0), this.reverse ? (c.stencilFunc(c.EQUAL, 255 - f, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)) : (c.stencilFunc(c.EQUAL, f, 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)), c.drawElements(c.TRIANGLE_FAN, 4, c.UNSIGNED_SHORT, 2 * (d.indices.length - 4)), this.reverse ? c.stencilFunc(c.EQUAL, 255 - (f + 1), 255) : c.stencilFunc(c.EQUAL, f + 1, 255), this.reverse = !this.reverse) : (this.reverse ? (c.stencilFunc(c.EQUAL, f, 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)) : (c.stencilFunc(c.EQUAL, 255 - f, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)), c.drawElements(c.TRIANGLE_STRIP, d.indices.length, c.UNSIGNED_SHORT, 0), this.reverse ? c.stencilFunc(c.EQUAL, f + 1, 255) : c.stencilFunc(c.EQUAL, 255 - (f + 1), 255)),
			c.colorMask(!0, !0, !0, !0),
			c.stencilOp(c.KEEP, c.KEEP, c.KEEP),
			this.count++
	},
	PIXI.WebGLStencilManager.prototype.bindGraphics = function(b, f, a) {
		this._currentGraphics = b;
		var d, h = this.gl,
			g = a.projection,
			c = a.offset;
		1 === f.mode ? (d = a.shaderManager.complexPrimitiveShader, a.shaderManager.setShader(d), h.uniform1f(d.flipY, a.flipY), h.uniformMatrix3fv(d.translationMatrix, !1, b.worldTransform.toArray(!0)), h.uniform2f(d.projectionVector, g.x, -g.y), h.uniform2f(d.offsetVector, -c.x, -c.y), h.uniform3fv(d.tintColor, PIXI.hex2rgb(b.tint)), h.uniform3fv(d.color, f.color), h.uniform1f(d.alpha, b.worldAlpha * f.alpha), h.bindBuffer(h.ARRAY_BUFFER, f.buffer), h.vertexAttribPointer(d.aVertexPosition, 2, h.FLOAT, !1, 8, 0), h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, f.indexBuffer)) : (d = a.shaderManager.primitiveShader, a.shaderManager.setShader(d), h.uniformMatrix3fv(d.translationMatrix, !1, b.worldTransform.toArray(!0)), h.uniform1f(d.flipY, a.flipY), h.uniform2f(d.projectionVector, g.x, -g.y), h.uniform2f(d.offsetVector, -c.x, -c.y), h.uniform3fv(d.tintColor, PIXI.hex2rgb(b.tint)), h.uniform1f(d.alpha, b.worldAlpha), h.bindBuffer(h.ARRAY_BUFFER, f.buffer), h.vertexAttribPointer(d.aVertexPosition, 2, h.FLOAT, !1, 24, 0), h.vertexAttribPointer(d.colorAttribute, 4, h.FLOAT, !1, 24, 8), h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, f.indexBuffer))
	},
	PIXI.WebGLStencilManager.prototype.popStencil = function(b, d, a) {
		var c = this.gl;
		if(this.stencilStack.pop(), this.count--, 0 === this.stencilStack.length) {
			c.disable(c.STENCIL_TEST)
		} else {
			var f = this.count;
			this.bindGraphics(b, d, a),
				c.colorMask(!1, !1, !1, !1),
				1 === d.mode ? (this.reverse = !this.reverse, this.reverse ? (c.stencilFunc(c.EQUAL, 255 - (f + 1), 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)) : (c.stencilFunc(c.EQUAL, f + 1, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)), c.drawElements(c.TRIANGLE_FAN, 4, c.UNSIGNED_SHORT, 2 * (d.indices.length - 4)), c.stencilFunc(c.ALWAYS, 0, 255), c.stencilOp(c.KEEP, c.KEEP, c.INVERT), c.drawElements(c.TRIANGLE_FAN, d.indices.length - 4, c.UNSIGNED_SHORT, 0), this.reverse ? c.stencilFunc(c.EQUAL, f, 255) : c.stencilFunc(c.EQUAL, 255 - f, 255)) : (this.reverse ? (c.stencilFunc(c.EQUAL, f + 1, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)) : (c.stencilFunc(c.EQUAL, 255 - (f + 1), 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)), c.drawElements(c.TRIANGLE_STRIP, d.indices.length, c.UNSIGNED_SHORT, 0), this.reverse ? c.stencilFunc(c.EQUAL, f, 255) : c.stencilFunc(c.EQUAL, 255 - f, 255)),
				c.colorMask(!0, !0, !0, !0),
				c.stencilOp(c.KEEP, c.KEEP, c.KEEP)
		}
	},
	PIXI.WebGLStencilManager.prototype.destroy = function() {
		this.stencilStack = null,
			this.gl = null
	},
	PIXI.WebGLShaderManager = function() {
		this.maxAttibs = 10,
			this.attribState = [],
			this.tempAttribState = [];
		for(var a = 0; a < this.maxAttibs; a++) {
			this.attribState[a] = !1
		}
		this.stack = []
	},
	PIXI.WebGLShaderManager.prototype.constructor = PIXI.WebGLShaderManager,
	PIXI.WebGLShaderManager.prototype.setContext = function(a) {
		this.gl = a,
			this.primitiveShader = new PIXI.PrimitiveShader(a),
			this.complexPrimitiveShader = new PIXI.ComplexPrimitiveShader(a),
			this.defaultShader = new PIXI.PixiShader(a),
			this.fastShader = new PIXI.PixiFastShader(a),
			this.stripShader = new PIXI.StripShader(a),
			this.setShader(this.defaultShader)
	},
	PIXI.WebGLShaderManager.prototype.setAttribs = function(b) {
		var d;
		for(d = 0; d < this.tempAttribState.length; d++) {
			this.tempAttribState[d] = !1
		}
		for(d = 0; d < b.length; d++) {
			var a = b[d];
			this.tempAttribState[a] = !0
		}
		var c = this.gl;
		for(d = 0; d < this.attribState.length; d++) {
			this.attribState[d] !== this.tempAttribState[d] && (this.attribState[d] = this.tempAttribState[d], this.tempAttribState[d] ? c.enableVertexAttribArray(d) : c.disableVertexAttribArray(d))
		}
	},
	PIXI.WebGLShaderManager.prototype.setShader = function(a) {
		return this._currentId === a._UID ? !1 : (this._currentId = a._UID, this.currentShader = a, this.gl.useProgram(a.program), this.setAttribs(a.attributes), !0)
	},
	PIXI.WebGLShaderManager.prototype.destroy = function() {
		this.attribState = null,
			this.tempAttribState = null,
			this.primitiveShader.destroy(),
			this.complexPrimitiveShader.destroy(),
			this.defaultShader.destroy(),
			this.fastShader.destroy(),
			this.stripShader.destroy(),
			this.gl = null
	},
	PIXI.WebGLSpriteBatch = function() {
		this.vertSize = 5,
			this.size = 2000;
		var b = 4 * this.size * 4 * this.vertSize,
			d = 6 * this.size;
		this.vertices = new PIXI.ArrayBuffer(b),
			this.positions = new PIXI.Float32Array(this.vertices),
			this.colors = new PIXI.Uint32Array(this.vertices),
			this.indices = new PIXI.Uint16Array(d),
			this.lastIndexCount = 0;
		for(var a = 0,
				c = 0; d > a; a += 6, c += 4) {
			this.indices[a + 0] = c + 0,
				this.indices[a + 1] = c + 1,
				this.indices[a + 2] = c + 2,
				this.indices[a + 3] = c + 0,
				this.indices[a + 4] = c + 2,
				this.indices[a + 5] = c + 3
		}
		this.drawing = !1,
			this.currentBatchSize = 0,
			this.currentBaseTexture = null,
			this.dirty = !0,
			this.textures = [],
			this.blendModes = [],
			this.shaders = [],
			this.sprites = [],
			this.defaultShader = new PIXI.AbstractFilter(["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"])
	},
	PIXI.WebGLSpriteBatch.prototype.setContext = function(a) {
		this.gl = a,
			this.vertexBuffer = a.createBuffer(),
			this.indexBuffer = a.createBuffer(),
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW),
			a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
			a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW),
			this.currentBlendMode = 99999;
		var b = new PIXI.PixiShader(a);
		b.fragmentSrc = this.defaultShader.fragmentSrc,
			b.uniforms = {},
			b.init(),
			this.defaultShader.shaders[a.id] = b
	},
	PIXI.WebGLSpriteBatch.prototype.begin = function(a) {
		this.renderSession = a,
			this.shader = this.renderSession.shaderManager.defaultShader,
			this.start()
	},
	PIXI.WebGLSpriteBatch.prototype.end = function() {
		this.flush()
	},
	PIXI.WebGLSpriteBatch.prototype.render = function(B) {
		var O = B.texture;
		this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = O.baseTexture);
		var K = O._uvs;
		if(K) {
			var D, G, F, C, S = B.anchor.x,
				L = B.anchor.y;
			if(O.trim) {
				var J = O.trim;
				G = J.x - S * J.width,
					D = G + O.crop.width,
					C = J.y - L * J.height,
					F = C + O.crop.height
			} else {
				D = O.frame.width * (1 - S),
					G = O.frame.width * -S,
					F = O.frame.height * (1 - L),
					C = O.frame.height * -L
			}
			var R = 4 * this.currentBatchSize * this.vertSize,
				Q = O.baseTexture.resolution,
				A = B.worldTransform,
				E = A.a / Q,
				N = A.b / Q,
				q = A.c / Q,
				M = A.d / Q,
				z = A.tx,
				k = A.ty,
				x = this.colors,
				b = this.positions;
			b[R] = E * G + q * C + z | 0,
				b[R + 1] = M * C + N * G + k | 0,
				b[R + 5] = E * D + q * C + z | 0,
				b[R + 6] = M * C + N * D + k | 0,
				b[R + 10] = E * D + q * F + z | 0,
				b[R + 11] = M * F + N * D + k | 0,
				b[R + 15] = E * G + q * F + z | 0,
				b[R + 16] = M * F + N * G + k | 0,
				b[R + 2] = K.x0,
				b[R + 3] = K.y0,
				b[R + 7] = K.x1,
				b[R + 8] = K.y1,
				b[R + 12] = K.x2,
				b[R + 13] = K.y2,
				b[R + 17] = K.x3,
				b[R + 18] = K.y3;
			var H = B.tint;
			x[R + 4] = x[R + 9] = x[R + 14] = x[R + 19] = (H >> 16) + (65280 & H) + ((255 & H) << 16) + (255 * B.worldAlpha << 24),
				this.sprites[this.currentBatchSize++] = B
		}
	},
	PIXI.WebGLSpriteBatch.prototype.renderTilingSprite = function(J) {
		var aa = J.tilingTexture;
		this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = aa.baseTexture),
			J._uvs || (J._uvs = new PIXI.TextureUvs);
		var V = J._uvs;
		J.tilePosition.x %= aa.baseTexture.width * J.tileScaleOffset.x,
			J.tilePosition.y %= aa.baseTexture.height * J.tileScaleOffset.y;
		var M = J.tilePosition.x / (aa.baseTexture.width * J.tileScaleOffset.x),
			Q = J.tilePosition.y / (aa.baseTexture.height * J.tileScaleOffset.y),
			O = J.width / aa.baseTexture.width / (J.tileScale.x * J.tileScaleOffset.x),
			K = J.height / aa.baseTexture.height / (J.tileScale.y * J.tileScaleOffset.y);
		V.x0 = 0 - M,
			V.y0 = 0 - Q,
			V.x1 = 1 * O - M,
			V.y1 = 0 - Q,
			V.x2 = 1 * O - M,
			V.y2 = 1 * K - Q,
			V.x3 = 0 - M,
			V.y3 = 1 * K - Q;
		var ae = J.tint,
			W = (ae >> 16) + (65280 & ae) + ((255 & ae) << 16) + (255 * J.alpha << 24),
			U = this.positions,
			ac = this.colors,
			ab = J.width,
			H = J.height,
			N = J.anchor.x,
			Z = J.anchor.y,
			E = ab * (1 - N),
			Y = ab * -N,
			G = H * (1 - Z),
			B = H * -Z,
			F = 4 * this.currentBatchSize * this.vertSize,
			A = aa.baseTexture.resolution,
			R = J.worldTransform,
			D = R.a / A,
			ad = R.b / A,
			q = R.c / A,
			k = R.d / A,
			z = R.tx,
			L = R.ty;
		U[F++] = D * Y + q * B + z,
			U[F++] = k * B + ad * Y + L,
			U[F++] = V.x0,
			U[F++] = V.y0,
			ac[F++] = W,
			U[F++] = D * E + q * B + z,
			U[F++] = k * B + ad * E + L,
			U[F++] = V.x1,
			U[F++] = V.y1,
			ac[F++] = W,
			U[F++] = D * E + q * G + z,
			U[F++] = k * G + ad * E + L,
			U[F++] = V.x2,
			U[F++] = V.y2,
			ac[F++] = W,
			U[F++] = D * Y + q * G + z,
			U[F++] = k * G + ad * Y + L,
			U[F++] = V.x3,
			U[F++] = V.y3,
			ac[F++] = W,
			this.sprites[this.currentBatchSize++] = J
	},
	PIXI.WebGLSpriteBatch.prototype.flush = function() {
		if(0 !== this.currentBatchSize) {
			var w, J = this.gl;
			if(this.dirty) {
				this.dirty = !1,
					J.activeTexture(J.TEXTURE0),
					J.bindBuffer(J.ARRAY_BUFFER, this.vertexBuffer),
					J.bindBuffer(J.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
					w = this.defaultShader.shaders[J.id];
				var E = 4 * this.vertSize;
				J.vertexAttribPointer(w.aVertexPosition, 2, J.FLOAT, !1, E, 0),
					J.vertexAttribPointer(w.aTextureCoord, 2, J.FLOAT, !1, E, 8),
					J.vertexAttribPointer(w.colorAttribute, 4, J.UNSIGNED_BYTE, !0, E, 16)
			}
			if(this.currentBatchSize > 0.5 * this.size) {
				J.bufferSubData(J.ARRAY_BUFFER, 0, this.vertices)
			} else {
				var z = this.positions.subarray(0, 4 * this.currentBatchSize * this.vertSize);
				J.bufferSubData(J.ARRAY_BUFFER, 0, z)
			}
			for(var C, B, x, M, F = 0,
					D = 0,
					L = null,
					K = this.renderSession.blendModeManager.currentBlendMode,
					q = null,
					A = !1,
					H = !1,
					k = 0,
					G = this.currentBatchSize; G > k; k++) {
				if(M = this.sprites[k], C = M.texture.baseTexture, B = M.blendMode, x = M.shader || this.defaultShader, A = K !== B, H = q !== x, (L !== C || A || H) && (this.renderBatch(L, F, D), D = k, F = 0, L = C, A && (K = B, this.renderSession.blendModeManager.setBlendMode(K)), H)) {
					q = x,
						w = q.shaders[J.id],
						w || (w = new PIXI.PixiShader(J), w.fragmentSrc = q.fragmentSrc, w.uniforms = q.uniforms, w.init(), q.shaders[J.id] = w),
						this.renderSession.shaderManager.setShader(w),
						w.dirty && w.syncUniforms();
					var m = this.renderSession.projection;
					J.uniform2f(w.projectionVector, m.x, m.y);
					var b = this.renderSession.offset;
					J.uniform2f(w.offsetVector, b.x, b.y)
				}
				F++
			}
			this.renderBatch(L, F, D),
				this.currentBatchSize = 0
		}
	},
	PIXI.WebGLSpriteBatch.prototype.renderBatch = function(b, d, a) {
		if(0 !== d) {
			var c = this.gl;
			b._dirty[c.id] ? this.renderSession.renderer.updateTexture(b) : c.bindTexture(c.TEXTURE_2D, b._glTextures[c.id]),
				c.drawElements(c.TRIANGLES, 6 * d, c.UNSIGNED_SHORT, 6 * a * 2),
				this.renderSession.drawCount++
		}
	},
	PIXI.WebGLSpriteBatch.prototype.stop = function() {
		this.flush(),
			this.dirty = !0
	},
	PIXI.WebGLSpriteBatch.prototype.start = function() {
		this.dirty = !0
	},
	PIXI.WebGLSpriteBatch.prototype.destroy = function() {
		this.vertices = null,
			this.indices = null,
			this.gl.deleteBuffer(this.vertexBuffer),
			this.gl.deleteBuffer(this.indexBuffer),
			this.currentBaseTexture = null,
			this.gl = null
	},
	PIXI.WebGLFastSpriteBatch = function(b) {
		this.vertSize = 10,
			this.maxSize = 6000,
			this.size = this.maxSize;
		var d = 4 * this.size * this.vertSize,
			a = 6 * this.maxSize;
		this.vertices = new PIXI.Float32Array(d),
			this.indices = new PIXI.Uint16Array(a),
			this.vertexBuffer = null,
			this.indexBuffer = null,
			this.lastIndexCount = 0;
		for(var c = 0,
				f = 0; a > c; c += 6, f += 4) {
			this.indices[c + 0] = f + 0,
				this.indices[c + 1] = f + 1,
				this.indices[c + 2] = f + 2,
				this.indices[c + 3] = f + 0,
				this.indices[c + 4] = f + 2,
				this.indices[c + 5] = f + 3
		}
		this.drawing = !1,
			this.currentBatchSize = 0,
			this.currentBaseTexture = null,
			this.currentBlendMode = 0,
			this.renderSession = null,
			this.shader = null,
			this.matrix = null,
			this.setContext(b)
	},
	PIXI.WebGLFastSpriteBatch.prototype.constructor = PIXI.WebGLFastSpriteBatch,
	PIXI.WebGLFastSpriteBatch.prototype.setContext = function(a) {
		this.gl = a,
			this.vertexBuffer = a.createBuffer(),
			this.indexBuffer = a.createBuffer(),
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW),
			a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
			a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW)
	},
	PIXI.WebGLFastSpriteBatch.prototype.begin = function(a, b) {
		this.renderSession = b,
			this.shader = this.renderSession.shaderManager.fastShader,
			this.matrix = a.worldTransform.toArray(!0),
			this.start()
	},
	PIXI.WebGLFastSpriteBatch.prototype.end = function() {
		this.flush()
	},
	PIXI.WebGLFastSpriteBatch.prototype.render = function(b) {
		var d = b.children,
			a = d[0];
		if(a.texture._uvs) {
			this.currentBaseTexture = a.texture.baseTexture,
				a.blendMode !== this.renderSession.blendModeManager.currentBlendMode && (this.flush(), this.renderSession.blendModeManager.setBlendMode(a.blendMode));
			for(var c = 0,
					f = d.length; f > c; c++) {
				this.renderSprite(d[c])
			}
			this.flush()
		}
	},
	PIXI.WebGLFastSpriteBatch.prototype.renderSprite = function(v) {
		if(v.visible && (v.texture.baseTexture === this.currentBaseTexture || (this.flush(), this.currentBaseTexture = v.texture.baseTexture, v.texture._uvs))) {
			var p, k, b, f, d, w, u, m, g = this.vertices;
			if(p = v.texture._uvs, k = v.texture.frame.width, b = v.texture.frame.height, v.texture.trim) {
				var q = v.texture.trim;
				d = q.x - v.anchor.x * q.width,
					f = d + v.texture.crop.width,
					u = q.y - v.anchor.y * q.height,
					w = u + v.texture.crop.height
			} else {
				f = v.texture.frame.width * (1 - v.anchor.x),
					d = v.texture.frame.width * -v.anchor.x,
					w = v.texture.frame.height * (1 - v.anchor.y),
					u = v.texture.frame.height * -v.anchor.y
			}
			m = 4 * this.currentBatchSize * this.vertSize,
				g[m++] = d,
				g[m++] = u,
				g[m++] = v.position.x,
				g[m++] = v.position.y,
				g[m++] = v.scale.x,
				g[m++] = v.scale.y,
				g[m++] = v.rotation,
				g[m++] = p.x0,
				g[m++] = p.y1,
				g[m++] = v.alpha,
				g[m++] = f,
				g[m++] = u,
				g[m++] = v.position.x,
				g[m++] = v.position.y,
				g[m++] = v.scale.x,
				g[m++] = v.scale.y,
				g[m++] = v.rotation,
				g[m++] = p.x1,
				g[m++] = p.y1,
				g[m++] = v.alpha,
				g[m++] = f,
				g[m++] = w,
				g[m++] = v.position.x,
				g[m++] = v.position.y,
				g[m++] = v.scale.x,
				g[m++] = v.scale.y,
				g[m++] = v.rotation,
				g[m++] = p.x2,
				g[m++] = p.y2,
				g[m++] = v.alpha,
				g[m++] = d,
				g[m++] = w,
				g[m++] = v.position.x,
				g[m++] = v.position.y,
				g[m++] = v.scale.x,
				g[m++] = v.scale.y,
				g[m++] = v.rotation,
				g[m++] = p.x3,
				g[m++] = p.y3,
				g[m++] = v.alpha,
				this.currentBatchSize++,
				this.currentBatchSize >= this.size && this.flush()
		}
	},
	PIXI.WebGLFastSpriteBatch.prototype.flush = function() {
		if(0 !== this.currentBatchSize) {
			var a = this.gl;
			if(this.currentBaseTexture._glTextures[a.id] || this.renderSession.renderer.updateTexture(this.currentBaseTexture, a), a.bindTexture(a.TEXTURE_2D, this.currentBaseTexture._glTextures[a.id]), this.currentBatchSize > 0.5 * this.size) {
				a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertices)
			} else {
				var b = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
				a.bufferSubData(a.ARRAY_BUFFER, 0, b)
			}
			a.drawElements(a.TRIANGLES, 6 * this.currentBatchSize, a.UNSIGNED_SHORT, 0),
				this.currentBatchSize = 0,
				this.renderSession.drawCount++
		}
	},
	PIXI.WebGLFastSpriteBatch.prototype.stop = function() {
		this.flush()
	},
	PIXI.WebGLFastSpriteBatch.prototype.start = function() {
		var b = this.gl;
		b.activeTexture(b.TEXTURE0),
			b.bindBuffer(b.ARRAY_BUFFER, this.vertexBuffer),
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		var c = this.renderSession.projection;
		b.uniform2f(this.shader.projectionVector, c.x, c.y),
			b.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
		var a = 4 * this.vertSize;
		b.vertexAttribPointer(this.shader.aVertexPosition, 2, b.FLOAT, !1, a, 0),
			b.vertexAttribPointer(this.shader.aPositionCoord, 2, b.FLOAT, !1, a, 8),
			b.vertexAttribPointer(this.shader.aScale, 2, b.FLOAT, !1, a, 16),
			b.vertexAttribPointer(this.shader.aRotation, 1, b.FLOAT, !1, a, 24),
			b.vertexAttribPointer(this.shader.aTextureCoord, 2, b.FLOAT, !1, a, 28),
			b.vertexAttribPointer(this.shader.colorAttribute, 1, b.FLOAT, !1, a, 36)
	},
	PIXI.WebGLFilterManager = function() {
		this.filterStack = [],
			this.offsetX = 0,
			this.offsetY = 0
	},
	PIXI.WebGLFilterManager.prototype.constructor = PIXI.WebGLFilterManager,
	PIXI.WebGLFilterManager.prototype.setContext = function(a) {
		this.gl = a,
			this.texturePool = [],
			this.initShaderBuffers()
	},
	PIXI.WebGLFilterManager.prototype.begin = function(b, c) {
		this.renderSession = b,
			this.defaultShader = b.shaderManager.defaultShader;
		var a = this.renderSession.projection;
		this.width = 2 * a.x,
			this.height = 2 * -a.y,
			this.buffer = c
	},
	PIXI.WebGLFilterManager.prototype.pushFilter = function(d) {
		var h = this.gl,
			c = this.renderSession.projection,
			g = this.renderSession.offset;
		d._filterArea = d.target.filterArea || d.target.getBounds(),
			this.filterStack.push(d);
		var l = d.filterPasses[0];
		this.offsetX += d._filterArea.x,
			this.offsetY += d._filterArea.y;
		var k = this.texturePool.pop();
		k ? k.resize(this.width, this.height) : k = new PIXI.FilterTexture(this.gl, this.width, this.height),
			h.bindTexture(h.TEXTURE_2D, k.texture);
		var f = d._filterArea,
			b = l.padding;
		f.x -= b,
			f.y -= b,
			f.width += 2 * b,
			f.height += 2 * b,
			f.x < 0 && (f.x = 0),
			f.width > this.width && (f.width = this.width),
			f.y < 0 && (f.y = 0),
			f.height > this.height && (f.height = this.height),
			h.bindFramebuffer(h.FRAMEBUFFER, k.frameBuffer),
			h.viewport(0, 0, f.width, f.height),
			c.x = f.width / 2,
			c.y = -f.height / 2,
			g.x = -f.x,
			g.y = -f.y,
			h.colorMask(!0, !0, !0, !0),
			h.clearColor(0, 0, 0, 0),
			h.clear(h.COLOR_BUFFER_BIT),
			d._glFilterTexture = k
	},
	PIXI.WebGLFilterManager.prototype.popFilter = function() {
		var z = this.gl,
			L = this.filterStack.pop(),
			G = L._filterArea,
			B = L._glFilterTexture,
			E = this.renderSession.projection,
			D = this.renderSession.offset;
		if(L.filterPasses.length > 1) {
			z.viewport(0, 0, G.width, G.height),
				z.bindBuffer(z.ARRAY_BUFFER, this.vertexBuffer),
				this.vertexArray[0] = 0,
				this.vertexArray[1] = G.height,
				this.vertexArray[2] = G.width,
				this.vertexArray[3] = G.height,
				this.vertexArray[4] = 0,
				this.vertexArray[5] = 0,
				this.vertexArray[6] = G.width,
				this.vertexArray[7] = 0,
				z.bufferSubData(z.ARRAY_BUFFER, 0, this.vertexArray),
				z.bindBuffer(z.ARRAY_BUFFER, this.uvBuffer),
				this.uvArray[2] = G.width / this.width,
				this.uvArray[5] = G.height / this.height,
				this.uvArray[6] = G.width / this.width,
				this.uvArray[7] = G.height / this.height,
				z.bufferSubData(z.ARRAY_BUFFER, 0, this.uvArray);
			var A = B,
				O = this.texturePool.pop();
			O || (O = new PIXI.FilterTexture(this.gl, this.width, this.height)),
				O.resize(this.width, this.height),
				z.bindFramebuffer(z.FRAMEBUFFER, O.frameBuffer),
				z.clear(z.COLOR_BUFFER_BIT),
				z.disable(z.BLEND);
			for(var H = 0; H < L.filterPasses.length - 1; H++) {
				var F = L.filterPasses[H];
				z.bindFramebuffer(z.FRAMEBUFFER, O.frameBuffer),
					z.activeTexture(z.TEXTURE0),
					z.bindTexture(z.TEXTURE_2D, A.texture),
					this.applyFilterPass(F, G, G.width, G.height);
				var N = A;
				A = O,
					O = N
			}
			z.enable(z.BLEND),
				B = A,
				this.texturePool.push(O)
		}
		var M = L.filterPasses[L.filterPasses.length - 1];
		this.offsetX -= G.x,
			this.offsetY -= G.y;
		var x = this.width,
			C = this.height,
			K = 0,
			k = 0,
			J = this.buffer;
		if(0 === this.filterStack.length) {
			z.colorMask(!0, !0, !0, !0)
		} else {
			var q = this.filterStack[this.filterStack.length - 1];
			G = q._filterArea,
				x = G.width,
				C = G.height,
				K = G.x,
				k = G.y,
				J = q._glFilterTexture.frameBuffer
		}
		E.x = x / 2,
			E.y = -C / 2,
			D.x = K,
			D.y = k,
			G = L._filterArea;
		var b = G.x - K,
			m = G.y - k;
		z.bindBuffer(z.ARRAY_BUFFER, this.vertexBuffer),
			this.vertexArray[0] = b,
			this.vertexArray[1] = m + G.height,
			this.vertexArray[2] = b + G.width,
			this.vertexArray[3] = m + G.height,
			this.vertexArray[4] = b,
			this.vertexArray[5] = m,
			this.vertexArray[6] = b + G.width,
			this.vertexArray[7] = m,
			z.bufferSubData(z.ARRAY_BUFFER, 0, this.vertexArray),
			z.bindBuffer(z.ARRAY_BUFFER, this.uvBuffer),
			this.uvArray[2] = G.width / this.width,
			this.uvArray[5] = G.height / this.height,
			this.uvArray[6] = G.width / this.width,
			this.uvArray[7] = G.height / this.height,
			z.bufferSubData(z.ARRAY_BUFFER, 0, this.uvArray),
			z.viewport(0, 0, x, C),
			z.bindFramebuffer(z.FRAMEBUFFER, J),
			z.activeTexture(z.TEXTURE0),
			z.bindTexture(z.TEXTURE_2D, B.texture),
			this.applyFilterPass(M, G, x, C),
			this.texturePool.push(B),
			L._glFilterTexture = null
	},
	PIXI.WebGLFilterManager.prototype.applyFilterPass = function(b, d, a, c) {
		var g = this.gl,
			f = b.shaders[g.id];
		f || (f = new PIXI.PixiShader(g), f.fragmentSrc = b.fragmentSrc, f.uniforms = b.uniforms, f.init(), b.shaders[g.id] = f),
			this.renderSession.shaderManager.setShader(f),
			g.uniform2f(f.projectionVector, a / 2, -c / 2),
			g.uniform2f(f.offsetVector, 0, 0),
			b.uniforms.dimensions && (b.uniforms.dimensions.value[0] = this.width, b.uniforms.dimensions.value[1] = this.height, b.uniforms.dimensions.value[2] = this.vertexArray[0], b.uniforms.dimensions.value[3] = this.vertexArray[5]),
			f.syncUniforms(),
			g.bindBuffer(g.ARRAY_BUFFER, this.vertexBuffer),
			g.vertexAttribPointer(f.aVertexPosition, 2, g.FLOAT, !1, 0, 0),
			g.bindBuffer(g.ARRAY_BUFFER, this.uvBuffer),
			g.vertexAttribPointer(f.aTextureCoord, 2, g.FLOAT, !1, 0, 0),
			g.bindBuffer(g.ARRAY_BUFFER, this.colorBuffer),
			g.vertexAttribPointer(f.colorAttribute, 2, g.FLOAT, !1, 0, 0),
			g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
			g.drawElements(g.TRIANGLES, 6, g.UNSIGNED_SHORT, 0),
			this.renderSession.drawCount++
	},
	PIXI.WebGLFilterManager.prototype.initShaderBuffers = function() {
		var a = this.gl;
		this.vertexBuffer = a.createBuffer(),
			this.uvBuffer = a.createBuffer(),
			this.colorBuffer = a.createBuffer(),
			this.indexBuffer = a.createBuffer(),
			this.vertexArray = new PIXI.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
			a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
			a.bufferData(a.ARRAY_BUFFER, this.vertexArray, a.STATIC_DRAW),
			this.uvArray = new PIXI.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
			a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
			a.bufferData(a.ARRAY_BUFFER, this.uvArray, a.STATIC_DRAW),
			this.colorArray = new PIXI.Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]),
			a.bindBuffer(a.ARRAY_BUFFER, this.colorBuffer),
			a.bufferData(a.ARRAY_BUFFER, this.colorArray, a.STATIC_DRAW),
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), a.STATIC_DRAW)
	},
	PIXI.WebGLFilterManager.prototype.destroy = function() {
		var a = this.gl;
		this.filterStack = null,
			this.offsetX = 0,
			this.offsetY = 0;
		for(var b = 0; b < this.texturePool.length; b++) {
			this.texturePool[b].destroy()
		}
		this.texturePool = null,
			a.deleteBuffer(this.vertexBuffer),
			a.deleteBuffer(this.uvBuffer),
			a.deleteBuffer(this.colorBuffer),
			a.deleteBuffer(this.indexBuffer)
	},
	PIXI.FilterTexture = function(b, d, a, c) {
		this.gl = b,
			this.frameBuffer = b.createFramebuffer(),
			this.texture = b.createTexture(),
			c = c || PIXI.scaleModes.DEFAULT,
			b.bindTexture(b.TEXTURE_2D, this.texture),
			b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, c === PIXI.scaleModes.LINEAR ? b.LINEAR : b.NEAREST),
			b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, c === PIXI.scaleModes.LINEAR ? b.LINEAR : b.NEAREST),
			b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE),
			b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE),
			b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer),
			b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer),
			b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, this.texture, 0),
			this.renderBuffer = b.createRenderbuffer(),
			b.bindRenderbuffer(b.RENDERBUFFER, this.renderBuffer),
			b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_STENCIL_ATTACHMENT, b.RENDERBUFFER, this.renderBuffer),
			this.resize(d, a)
	},
	PIXI.FilterTexture.prototype.constructor = PIXI.FilterTexture,
	PIXI.FilterTexture.prototype.clear = function() {
		var a = this.gl;
		a.clearColor(0, 0, 0, 0),
			a.clear(a.COLOR_BUFFER_BIT)
	},
	PIXI.FilterTexture.prototype.resize = function(b, c) {
		if(this.width !== b || this.height !== c) {
			this.width = b,
				this.height = c;
			var a = this.gl;
			a.bindTexture(a.TEXTURE_2D, this.texture),
				a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, c, 0, a.RGBA, a.UNSIGNED_BYTE, null),
				a.bindRenderbuffer(a.RENDERBUFFER, this.renderBuffer),
				a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, b, c)
		}
	},
	PIXI.FilterTexture.prototype.destroy = function() {
		var a = this.gl;
		a.deleteFramebuffer(this.frameBuffer),
			a.deleteTexture(this.texture),
			this.frameBuffer = null,
			this.texture = null
	},
	PIXI.CanvasBuffer = function(a, b) {
		this.width = a,
			this.height = b,
			this.canvas = document.createElement("canvas"),
			this.context = this.canvas.getContext("2d"),
			this.canvas.width = a,
			this.canvas.height = b
	},
	PIXI.CanvasBuffer.prototype.constructor = PIXI.CanvasBuffer,
	PIXI.CanvasBuffer.prototype.clear = function() {
		this.context.setTransform(1, 0, 0, 1, 0, 0),
			this.context.clearRect(0, 0, this.width, this.height)
	},
	PIXI.CanvasBuffer.prototype.resize = function(a, b) {
		this.width = this.canvas.width = a,
			this.height = this.canvas.height = b
	},
	PIXI.CanvasMaskManager = function() {},
	PIXI.CanvasMaskManager.prototype.constructor = PIXI.CanvasMaskManager,
	PIXI.CanvasMaskManager.prototype.pushMask = function(b, d) {
		var a = d.context;
		a.save();
		var c = b.alpha,
			g = b.worldTransform,
			f = d.resolution;
		a.setTransform(g.a * f, g.b * f, g.c * f, g.d * f, g.tx * f, g.ty * f),
			PIXI.CanvasGraphics.renderGraphicsMask(b, a),
			a.clip(),
			b.worldAlpha = c
	},
	PIXI.CanvasMaskManager.prototype.popMask = function(a) {
		a.context.restore()
	},
	PIXI.CanvasTinter = function() {},
	PIXI.CanvasTinter.getTintedTexture = function(b, d) {
		var a = b.texture;
		d = PIXI.CanvasTinter.roundColor(d);
		var c = "#" + ("00000" + (0 | d).toString(16)).substr(-6);
		if(a.tintCache = a.tintCache || {},
			a.tintCache[c]) {
			return a.tintCache[c]
		}
		var g = PIXI.CanvasTinter.canvas || document.createElement("canvas");
		if(PIXI.CanvasTinter.tintMethod(a, d, g), PIXI.CanvasTinter.convertTintToImage) {
			var f = new Image;
			f.src = g.toDataURL(),
				a.tintCache[c] = f
		} else {
			a.tintCache[c] = g,
				PIXI.CanvasTinter.canvas = null
		}
		return g
	},
	PIXI.CanvasTinter.tintWithMultiply = function(b, d, a) {
		var c = a.getContext("2d"),
			f = b.crop;
		a.width = f.width,
			a.height = f.height,
			c.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6),
			c.fillRect(0, 0, f.width, f.height),
			c.globalCompositeOperation = "multiply",
			c.drawImage(b.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height),
			c.globalCompositeOperation = "destination-atop",
			c.drawImage(b.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height)
	},
	PIXI.CanvasTinter.tintWithOverlay = function(b, d, a) {
		var c = a.getContext("2d"),
			f = b.crop;
		a.width = f.width,
			a.height = f.height,
			c.globalCompositeOperation = "copy",
			c.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6),
			c.fillRect(0, 0, f.width, f.height),
			c.globalCompositeOperation = "destination-atop",
			c.drawImage(b.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height)
	},
	PIXI.CanvasTinter.tintWithPerPixel = function(x, q, m) {
		var b = m.getContext("2d"),
			g = x.crop;
		m.width = g.width,
			m.height = g.height,
			b.globalCompositeOperation = "copy",
			b.drawImage(x.baseTexture.source, g.x, g.y, g.width, g.height, 0, 0, g.width, g.height);
		for(var f = PIXI.hex2rgb(q), y = f[0], w = f[1], p = f[2], k = b.getImageData(0, 0, g.width, g.height), v = k.data, u = 0; u < v.length; u += 4) {
			v[u + 0] *= y,
				v[u + 1] *= w,
				v[u + 2] *= p
		}
		b.putImageData(k, 0, 0)
	},
	PIXI.CanvasTinter.roundColor = function(b) {
		var c = PIXI.CanvasTinter.cacheStepsPerColorChannel,
			a = PIXI.hex2rgb(b);
		return a[0] = Math.min(255, a[0] / c * c),
			a[1] = Math.min(255, a[1] / c * c),
			a[2] = Math.min(255, a[2] / c * c),
			PIXI.rgb2hex(a)
	},
	PIXI.CanvasTinter.cacheStepsPerColorChannel = 8,
	PIXI.CanvasTinter.convertTintToImage = !1,
	PIXI.CanvasTinter.canUseMultiply = PIXI.canUseNewCanvasBlendModes(),
	PIXI.CanvasTinter.tintMethod = PIXI.CanvasTinter.canUseMultiply ? PIXI.CanvasTinter.tintWithMultiply : PIXI.CanvasTinter.tintWithPerPixel,
	PIXI.CanvasRenderer = function(b, d, a) {
		if(a) {
			for(var c in PIXI.defaultRenderOptions) {
				"undefined" == typeof a[c] && (a[c] = PIXI.defaultRenderOptions[c])
			}
		} else {
			a = PIXI.defaultRenderOptions
		}
		PIXI.defaultRenderer || (PIXI.sayHello("Canvas"), PIXI.defaultRenderer = this),
			this.type = PIXI.CANVAS_RENDERER,
			this.resolution = a.resolution,
			this.clearBeforeRender = a.clearBeforeRender,
			this.transparent = a.transparent,
			this.autoResize = a.autoResize || !1,
			this.width = b || 800,
			this.height = d || 600,
			this.width *= this.resolution,
			this.height *= this.resolution,
			this.view = a.view || document.createElement("canvas"),
			this.context = this.view.getContext("2d", {
				alpha: this.transparent
			}),
			this.refresh = !0,
			this.view.width = this.width * this.resolution,
			this.view.height = this.height * this.resolution,
			this.count = 0,
			this.maskManager = new PIXI.CanvasMaskManager,
			this.renderSession = {
				context: this.context,
				maskManager: this.maskManager,
				scaleMode: null,
				smoothProperty: null,
				roundPixels: !0
			},
			this.mapBlendModes(),
			this.resize(b, d),
			"imageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "oImageSmoothingEnabled" : "msImageSmoothingEnabled" in this.context && (this.renderSession.smoothProperty = "msImageSmoothingEnabled")
	},
	PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer,
	PIXI.CanvasRenderer.prototype.render = function(a) {
		a.updateTransform(),
			this.context.setTransform(1, 0, 0, 1, 0, 0),
			this.context.globalAlpha = 1,
			this.renderSession.currentBlendMode = PIXI.blendModes.NORMAL,
			this.context.globalCompositeOperation = PIXI.blendModesCanvas[PIXI.blendModes.NORMAL],
			this.renderDisplayObject(a),
			a.interactive && (a._interactiveEventsAdded || (a._interactiveEventsAdded = !0, a.interactionManager.setTarget(this)))
	},
	PIXI.CanvasRenderer.prototype.destroy = function(a) {
		"undefined" == typeof a && (a = !0),
			a && this.view.parent && this.view.parent.removeChild(this.view),
			this.view = null,
			this.context = null,
			this.maskManager = null,
			this.renderSession = null
	},
	PIXI.CanvasRenderer.prototype.resize = function(a, b) {
		this.width = a * this.resolution,
			this.height = b * this.resolution,
			this.view.width = this.width,
			this.view.height = this.height,
			this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px")
	},
	PIXI.CanvasRenderer.prototype.renderDisplayObject = function(a, b) {
		this.renderSession.context = b || this.context,
			this.renderSession.resolution = this.resolution,
			a._renderCanvas(this.renderSession)
	},
	PIXI.CanvasRenderer.prototype.mapBlendModes = function() {
		PIXI.blendModesCanvas || (PIXI.blendModesCanvas = [], PIXI.canUseNewCanvasBlendModes() ? (PIXI.blendModesCanvas[PIXI.blendModes.NORMAL] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.ADD] = "lighter", PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "multiply", PIXI.blendModesCanvas[PIXI.blendModes.SCREEN] = "screen", PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY] = "overlay", PIXI.blendModesCanvas[PIXI.blendModes.DARKEN] = "darken", PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN] = "lighten", PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "color-dodge", PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "color-burn", PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "hard-light", PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "soft-light", PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "difference", PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "exclusion", PIXI.blendModesCanvas[PIXI.blendModes.HUE] = "hue", PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "saturation", PIXI.blendModesCanvas[PIXI.blendModes.COLOR] = "color", PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "luminosity") : (PIXI.blendModesCanvas[PIXI.blendModes.NORMAL] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.ADD] = "lighter", PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.SCREEN] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.DARKEN] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.HUE] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.COLOR] = "source-over", PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "source-over"))
	},
	PIXI.CanvasGraphics = function() {},
	PIXI.CanvasGraphics.renderGraphics = function(H, Y) {
		var R = H.worldAlpha;
		H.dirty && (this.updateGraphicsTint(H), H.dirty = !1);
		for(var K = 0; K < H.graphicsData.length; K++) {
			var N = H.graphicsData[K],
				M = N.shape,
				J = N._fillTint,
				ac = N._lineTint;
			if(Y.lineWidth = N.lineWidth, N.type === PIXI.Graphics.POLY) {
				Y.beginPath();
				var U = M.points;
				Y.moveTo(U[0], U[1]);
				for(var Q = 1; Q < U.length / 2; Q++) {
					Y.lineTo(U[2 * Q], U[2 * Q + 1])
				}
				M.closed && Y.lineTo(U[0], U[1]),
					U[0] === U[U.length - 2] && U[1] === U[U.length - 1] && Y.closePath(),
					N.fill && (Y.globalAlpha = N.fillAlpha * R, Y.fillStyle = "#" + ("00000" + (0 | J).toString(16)).substr(-6), Y.fill()),
					N.lineWidth && (Y.globalAlpha = N.lineAlpha * R, Y.strokeStyle = "#" + ("00000" + (0 | ac).toString(16)).substr(-6), Y.stroke())
			} else {
				if(N.type === PIXI.Graphics.RECT) {
					(N.fillColor || 0 === N.fillColor) && (Y.globalAlpha = N.fillAlpha * R, Y.fillStyle = "#" + ("00000" + (0 | J).toString(16)).substr(-6), Y.fillRect(M.x, M.y, M.width, M.height)),
					N.lineWidth && (Y.globalAlpha = N.lineAlpha * R, Y.strokeStyle = "#" + ("00000" + (0 | ac).toString(16)).substr(-6), Y.strokeRect(M.x, M.y, M.width, M.height))
				} else {
					if(N.type === PIXI.Graphics.CIRC) {
						Y.beginPath(),
							Y.arc(M.x, M.y, M.radius, 0, 2 * Math.PI),
							Y.closePath(),
							N.fill && (Y.globalAlpha = N.fillAlpha * R, Y.fillStyle = "#" + ("00000" + (0 | J).toString(16)).substr(-6), Y.fill()),
							N.lineWidth && (Y.globalAlpha = N.lineAlpha * R, Y.strokeStyle = "#" + ("00000" + (0 | ac).toString(16)).substr(-6), Y.stroke())
					} else {
						if(N.type === PIXI.Graphics.ELIP) {
							var aa = 2 * M.width,
								Z = 2 * M.height,
								G = M.x - aa / 2,
								L = M.y - Z / 2;
							Y.beginPath();
							var W = 0.5522848,
								D = aa / 2 * W,
								V = Z / 2 * W,
								F = G + aa,
								B = L + Z,
								E = G + aa / 2,
								A = L + Z / 2;
							Y.moveTo(G, A),
								Y.bezierCurveTo(G, A - V, E - D, L, E, L),
								Y.bezierCurveTo(E + D, L, F, A - V, F, A),
								Y.bezierCurveTo(F, A + V, E + D, B, E, B),
								Y.bezierCurveTo(E - D, B, G, A + V, G, A),
								Y.closePath(),
								N.fill && (Y.globalAlpha = N.fillAlpha * R, Y.fillStyle = "#" + ("00000" + (0 | J).toString(16)).substr(-6), Y.fill()),
								N.lineWidth && (Y.globalAlpha = N.lineAlpha * R, Y.strokeStyle = "#" + ("00000" + (0 | ac).toString(16)).substr(-6), Y.stroke())
						} else {
							if(N.type === PIXI.Graphics.RREC) {
								var O = M.x,
									C = M.y,
									ab = M.width,
									q = M.height,
									k = M.radius,
									z = Math.min(ab, q) / 2 | 0;
								k = k > z ? z : k,
									Y.beginPath(),
									Y.moveTo(O, C + k),
									Y.lineTo(O, C + q - k),
									Y.quadraticCurveTo(O, C + q, O + k, C + q),
									Y.lineTo(O + ab - k, C + q),
									Y.quadraticCurveTo(O + ab, C + q, O + ab, C + q - k),
									Y.lineTo(O + ab, C + k),
									Y.quadraticCurveTo(O + ab, C, O + ab - k, C),
									Y.lineTo(O + k, C),
									Y.quadraticCurveTo(O, C, O, C + k),
									Y.closePath(),
									(N.fillColor || 0 === N.fillColor) && (Y.globalAlpha = N.fillAlpha * R, Y.fillStyle = "#" + ("00000" + (0 | J).toString(16)).substr(-6), Y.fill()),
									N.lineWidth && (Y.globalAlpha = N.lineAlpha * R, Y.strokeStyle = "#" + ("00000" + (0 | ac).toString(16)).substr(-6), Y.stroke())
							}
						}
					}
				}
			}
		}
	},
	PIXI.CanvasGraphics.renderGraphicsMask = function(G, V) {
		var Q = G.graphicsData.length;
		if(0 !== Q) {
			Q > 1 && (Q = 1, window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
			for(var J = 0; 1 > J; J++) {
				var M = G.graphicsData[J],
					L = M.shape;
				if(M.type === PIXI.Graphics.POLY) {
					V.beginPath();
					var H = L.points;
					V.moveTo(H[0], H[1]);
					for(var aa = 1; aa < H.length / 2; aa++) {
						V.lineTo(H[2 * aa], H[2 * aa + 1])
					}
					H[0] === H[H.length - 2] && H[1] === H[H.length - 1] && V.closePath()
				} else {
					if(M.type === PIXI.Graphics.RECT) {
						V.beginPath(),
							V.rect(L.x, L.y, L.width, L.height),
							V.closePath()
					} else {
						if(M.type === PIXI.Graphics.CIRC) {
							V.beginPath(),
								V.arc(L.x, L.y, L.radius, 0, 2 * Math.PI),
								V.closePath()
						} else {
							if(M.type === PIXI.Graphics.ELIP) {
								var R = 2 * L.width,
									O = 2 * L.height,
									Y = L.x - R / 2,
									W = L.y - O / 2;
								V.beginPath();
								var F = 0.5522848,
									K = R / 2 * F,
									U = O / 2 * F,
									C = Y + R,
									S = W + O,
									E = Y + R / 2,
									A = W + O / 2;
								V.moveTo(Y, A),
									V.bezierCurveTo(Y, A - U, E - K, W, E, W),
									V.bezierCurveTo(E + K, W, C, A - U, C, A),
									V.bezierCurveTo(C, A + U, E + K, S, E, S),
									V.bezierCurveTo(E - K, S, Y, A + U, Y, A),
									V.closePath()
							} else {
								if(M.type === PIXI.Graphics.RREC) {
									var D = L.points,
										z = D[0],
										N = D[1],
										B = D[2],
										Z = D[3],
										q = D[4],
										k = Math.min(B, Z) / 2 | 0;
									q = q > k ? k : q,
										V.beginPath(),
										V.moveTo(z, N + q),
										V.lineTo(z, N + Z - q),
										V.quadraticCurveTo(z, N + Z, z + q, N + Z),
										V.lineTo(z + B - q, N + Z),
										V.quadraticCurveTo(z + B, N + Z, z + B, N + Z - q),
										V.lineTo(z + B, N + q),
										V.quadraticCurveTo(z + B, N, z + B - q, N),
										V.lineTo(z + q, N),
										V.quadraticCurveTo(z, N, z, N + q),
										V.closePath()
								}
							}
						}
					}
				}
			}
		}
	},
	PIXI.CanvasGraphics.updateGraphicsTint = function(d) {
		if(16777215 !== d.tint) {
			for(var h = (d.tint >> 16 & 255) / 255, c = (d.tint >> 8 & 255) / 255, g = (255 & d.tint) / 255, l = 0; l < d.graphicsData.length; l++) {
				var k = d.graphicsData[l],
					f = 0 | k.fillColor,
					b = 0 | k.lineColor;
				k._fillTint = ((f >> 16 & 255) / 255 * h * 255 << 16) + ((f >> 8 & 255) / 255 * c * 255 << 8) + (255 & f) / 255 * g * 255,
					k._lineTint = ((b >> 16 & 255) / 255 * h * 255 << 16) + ((b >> 8 & 255) / 255 * c * 255 << 8) + (255 & b) / 255 * g * 255
			}
		}
	},
	PIXI.Graphics = function() {
		PIXI.DisplayObjectContainer.call(this),
			this.renderable = !0,
			this.fillAlpha = 1,
			this.lineWidth = 0,
			this.lineColor = 0,
			this.graphicsData = [],
			this.tint = 16777215,
			this.ondTint = 16777215,
			this.blendMode = PIXI.blendModes.NORMAL,
			this.currentPath = null,
			this._webGL = [],
			this.isMask = !1,
			this.boundsPadding = 0,
			this._localBounds = new PIXI.Rectangle(0, 0, 1, 1),
			this.dirty = !0,
			this.webGLDirty = !1,
			this.cachedSpriteDirty = !1
	},
	PIXI.Graphics.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
	PIXI.Graphics.prototype.constructor = PIXI.Graphics,
	Object.defineProperty(PIXI.Graphics.prototype, "cacheAsBitmap", {
		get: function() {
			return this._cacheAsBitmap
		},
		set: function(a) {
			this._cacheAsBitmap = a,
				this._cacheAsBitmap ? this._generateCachedSprite() : (this.destroyCachedSprite(), this.dirty = !0)
		}
	}),
	PIXI.Graphics.prototype.lineStyle = function(b, c, a) {
		if(this.lineWidth = b || 0, this.lineColor = c || 0, this.lineAlpha = arguments.length < 3 ? 1 : a, this.currentPath) {
			if(this.currentPath.shape.points.length) {
				return this.drawShape(new PIXI.Polygon(this.currentPath.shape.points.slice(-2))),
					this
			}
			this.currentPath.lineWidth = this.lineWidth,
				this.currentPath.lineColor = this.lineColor,
				this.currentPath.lineAlpha = this.lineAlpha
		}
		return this
	},
	PIXI.Graphics.prototype.moveTo = function(a, b) {
		return this.drawShape(new PIXI.Polygon([a, b])),
			this
	},
	PIXI.Graphics.prototype.lineTo = function(a, b) {
		return this.currentPath.shape.points.push(a, b),
			this.dirty = !0,
			this
	},
	PIXI.Graphics.prototype.quadraticCurveTo = function(x, q, m, b) {
		this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
		var g, f, y = 20,
			w = this.currentPath.shape.points;
		0 === w.length && this.moveTo(0, 0);
		for(var p = w[w.length - 2], k = w[w.length - 1], v = 0, u = 1; y >= u; u++) {
			v = u / y,
				g = p + (x - p) * v,
				f = k + (q - k) * v,
				w.push(g + (x + (m - x) * v - g) * v, f + (q + (b - q) * v - f) * v)
		}
		return this.dirty = !0,
			this
	},
	PIXI.Graphics.prototype.bezierCurveTo = function(G, A, w, b, q, m) {
		this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
		for(var H, D, x, v, C, B = 20,
				F = this.currentPath.shape.points,
				k = F[F.length - 2], z = F[F.length - 1], E = 0, y = 1; B >= y; y++) {
			E = y / B,
				H = 1 - E,
				D = H * H,
				x = D * H,
				v = E * E,
				C = v * E,
				F.push(x * k + 3 * D * E * G + 3 * H * v * w + C * q, x * z + 3 * D * E * A + 3 * H * v * b + C * m)
		}
		return this.dirty = !0,
			this
	},
	PIXI.Graphics.prototype.arcTo = function(J, aa, V, M, Q) {
		this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(J, aa) : this.moveTo(J, aa);
		var O = this.currentPath.shape.points,
			K = O[O.length - 2],
			ae = O[O.length - 1],
			W = ae - aa,
			U = K - J,
			ac = M - aa,
			ab = V - J,
			H = Math.abs(W * ab - U * ac);
		if(1e-8 > H || 0 === Q) {
			(O[O.length - 2] !== J || O[O.length - 1] !== aa) && O.push(J, aa)
		} else {
			var N = W * W + U * U,
				Z = ac * ac + ab * ab,
				E = W * ac + U * ab,
				Y = Q * Math.sqrt(N) / H,
				G = Q * Math.sqrt(Z) / H,
				B = Y * E / N,
				F = G * E / Z,
				A = Y * ab + G * U,
				R = Y * ac + G * W,
				D = U * (G + B),
				ad = W * (G + B),
				q = ab * (Y + F),
				k = ac * (Y + F),
				z = Math.atan2(ad - R, D - A),
				L = Math.atan2(k - R, q - A);
			this.arc(A + J, R + aa, Q, z, L, U * ac > ab * W)
		}
		return this.dirty = !0,
			this
	},
	PIXI.Graphics.prototype.arc = function(B, O, K, D, G, F) {
		var C, S = B + Math.cos(D) * K,
			L = O + Math.sin(D) * K;
		if(this.currentPath ? (C = this.currentPath.shape.points, 0 === C.length ? C.push(S, L) : (C[C.length - 2] !== S || C[C.length - 1] !== L) && C.push(S, L)) : (this.moveTo(S, L), C = this.currentPath.shape.points), D === G) {
			return this
		}!F && D >= G ? G += 2 * Math.PI : F && G >= D && (D += 2 * Math.PI);
		var J = F ? -1 * (D - G) : G - D,
			R = Math.abs(J) / (2 * Math.PI) * 40;
		if(0 === J) {
			return this
		}
		for(var Q = J / (2 * R), A = 2 * Q, E = Math.cos(Q), N = Math.sin(Q), q = R - 1, M = q % 1 / q, z = 0; q >= z; z++) {
			var k = z + M * z,
				x = Q + D + A * k,
				b = Math.cos(x),
				H = -Math.sin(x);
			C.push((E * b + N * H) * K + B, (E * -H + N * b) * K + O)
		}
		return this.dirty = !0,
			this
	},
	PIXI.Graphics.prototype.beginFill = function(a, b) {
		return this.filling = !0,
			this.fillColor = a || 0,
			this.fillAlpha = void 0 === b ? 1 : b,
			this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha),
			this
	},
	PIXI.Graphics.prototype.endFill = function() {
		return this.filling = !1,
			this.fillColor = null,
			this.fillAlpha = 1,
			this
	},
	PIXI.Graphics.prototype.drawRect = function(b, d, a, c) {
		return this.drawShape(new PIXI.Rectangle(b, d, a, c)),
			this
	},
	PIXI.Graphics.prototype.drawRoundedRect = function(b, d, a, c, f) {
		return this.drawShape(new PIXI.RoundedRectangle(b, d, a, c, f)),
			this
	},
	PIXI.Graphics.prototype.drawCircle = function(b, c, a) {
		return this.drawShape(new PIXI.Circle(b, c, a)),
			this
	},
	PIXI.Graphics.prototype.drawEllipse = function(b, d, a, c) {
		return this.drawShape(new PIXI.Ellipse(b, d, a, c)),
			this
	},
	PIXI.Graphics.prototype.drawPolygon = function(a) {
		return a instanceof Array || (a = Array.prototype.slice.call(arguments)),
			this.drawShape(new PIXI.Polygon(a)),
			this
	},
	PIXI.Graphics.prototype.clear = function() {
		return this.lineWidth = 0,
			this.filling = !1,
			this.dirty = !0,
			this.clearDirty = !0,
			this.graphicsData = [],
			this
	},
	PIXI.Graphics.prototype.generateTexture = function(b, d) {
		b = b || 1;
		var a = this.getBounds(),
			c = new PIXI.CanvasBuffer(a.width * b, a.height * b),
			f = PIXI.Texture.fromCanvas(c.canvas, d);
		return f.baseTexture.resolution = b,
			c.context.scale(b, b),
			c.context.translate(-a.x, -a.y),
			PIXI.CanvasGraphics.renderGraphics(this, c.context),
			f
	},
	PIXI.Graphics.prototype._renderWebGL = function(b) {
		if(this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
			if(this._cacheAsBitmap) {
				return(this.dirty || this.cachedSpriteDirty) && (this._generateCachedSprite(), this.updateCachedSpriteTexture(), this.cachedSpriteDirty = !1, this.dirty = !1),
					this._cachedSprite.worldAlpha = this.worldAlpha,
					void PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, b)
			}
			if(b.spriteBatch.stop(), b.blendModeManager.setBlendMode(this.blendMode), this._mask && b.maskManager.pushMask(this._mask, b), this._filters && b.filterManager.pushFilter(this._filterBlock), this.blendMode !== b.spriteBatch.currentBlendMode) {
				b.spriteBatch.currentBlendMode = this.blendMode;
				var d = PIXI.blendModesWebGL[b.spriteBatch.currentBlendMode];
				b.spriteBatch.gl.blendFunc(d[0], d[1])
			}
			if(this.webGLDirty && (this.dirty = !0, this.webGLDirty = !1), PIXI.WebGLGraphics.renderGraphics(this, b), this.children.length) {
				b.spriteBatch.start();
				for(var a = 0,
						c = this.children.length; c > a; a++) {
					this.children[a]._renderWebGL(b)
				}
				b.spriteBatch.stop()
			}
			this._filters && b.filterManager.popFilter(),
				this._mask && b.maskManager.popMask(this.mask, b),
				b.drawCount++,
				b.spriteBatch.start()
		}
	},
	PIXI.Graphics.prototype._renderCanvas = function(b) {
		if(this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
			if(this._cacheAsBitmap) {
				return(this.dirty || this.cachedSpriteDirty) && (this._generateCachedSprite(), this.updateCachedSpriteTexture(), this.cachedSpriteDirty = !1, this.dirty = !1),
					this._cachedSprite.alpha = this.alpha,
					void PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, b)
			}
			var d = b.context,
				a = this.worldTransform;
			this.blendMode !== b.currentBlendMode && (b.currentBlendMode = this.blendMode, d.globalCompositeOperation = PIXI.blendModesCanvas[b.currentBlendMode]),
				this._mask && b.maskManager.pushMask(this._mask, b);
			var c = b.resolution;
			d.setTransform(a.a * c, a.b * c, a.c * c, a.d * c, a.tx * c, a.ty * c),
				this.tint != this.oldTint && (this.dirty = !0, this.oldTint = this.tint),
				PIXI.CanvasGraphics.renderGraphics(this, d);
			for(var g = 0,
					f = this.children.length; f > g; g++) {
				this.children[g]._renderCanvas(b)
			}
			this._mask && b.maskManager.popMask(b)
		}
	},
	PIXI.Graphics.prototype.getBounds = function(F) {
		if(this.isMask) {
			return PIXI.EmptyRectangle
		}
		this.dirty && (this.updateLocalBounds(), this.webGLDirty = !0, this.cachedSpriteDirty = !0, this.dirty = !1);
		var U = this._localBounds,
			O = U.x,
			H = U.width + U.x,
			L = U.y,
			K = U.height + U.y,
			G = F || this.worldTransform,
			Y = G.a,
			Q = G.b,
			N = G.c,
			W = G.d,
			V = G.tx,
			E = G.ty,
			J = Y * H + N * K + V,
			S = W * K + Q * H + E,
			B = Y * O + N * K + V,
			R = W * K + Q * O + E,
			D = Y * O + N * L + V,
			z = W * L + Q * O + E,
			C = Y * H + N * L + V,
			q = W * L + Q * H + E,
			M = J,
			A = S,
			X = J,
			k = S;
		return X = X > B ? B : X,
			X = X > D ? D : X,
			X = X > C ? C : X,
			k = k > R ? R : k,
			k = k > z ? z : k,
			k = k > q ? q : k,
			M = B > M ? B : M,
			M = D > M ? D : M,
			M = C > M ? C : M,
			A = R > A ? R : A,
			A = z > A ? z : A,
			A = q > A ? q : A,
			this._bounds.x = X,
			this._bounds.width = M - X,
			this._bounds.y = k,
			this._bounds.height = A - k,
			this._bounds
	},
	PIXI.Graphics.prototype.updateLocalBounds = function() {
		var E = 1 / 0,
			y = -(1 / 0),
			v = 1 / 0,
			b = -(1 / 0);
		if(this.graphicsData.length) {
			for(var m, k, F, B, w, q, A = 0; A < this.graphicsData.length; A++) {
				var z = this.graphicsData[A],
					D = z.type,
					g = z.lineWidth;
				if(m = z.shape, D === PIXI.Graphics.RECT || D === PIXI.Graphics.RREC) {
					F = m.x - g / 2,
						B = m.y - g / 2,
						w = m.width + g,
						q = m.height + g,
						E = E > F ? F : E,
						y = F + w > y ? F + w : y,
						v = v > B ? B : v,
						b = B + q > b ? B + q : b
				} else {
					if(D === PIXI.Graphics.CIRC) {
						F = m.x,
							B = m.y,
							w = m.radius + g / 2,
							q = m.radius + g / 2,
							E = E > F - w ? F - w : E,
							y = F + w > y ? F + w : y,
							v = v > B - q ? B - q : v,
							b = B + q > b ? B + q : b
					} else {
						if(D === PIXI.Graphics.ELIP) {
							F = m.x,
								B = m.y,
								w = m.width + g / 2,
								q = m.height + g / 2,
								E = E > F - w ? F - w : E,
								y = F + w > y ? F + w : y,
								v = v > B - q ? B - q : v,
								b = B + q > b ? B + q : b
						} else {
							k = m.points;
							for(var x = 0; x < k.length; x += 2) {
								F = k[x],
									B = k[x + 1],
									E = E > F - g ? F - g : E,
									y = F + g > y ? F + g : y,
									v = v > B - g ? B - g : v,
									b = B + g > b ? B + g : b
							}
						}
					}
				}
			}
		} else {
			E = 0,
				y = 0,
				v = 0,
				b = 0
		}
		var C = this.boundsPadding;
		this._localBounds.x = E - C,
			this._localBounds.width = y - E + 2 * C,
			this._localBounds.y = v - C,
			this._localBounds.height = b - v + 2 * C
	},
	PIXI.Graphics.prototype._generateCachedSprite = function() {
		var b = this.getLocalBounds();
		if(this._cachedSprite) {
			this._cachedSprite.buffer.resize(b.width, b.height)
		} else {
			var c = new PIXI.CanvasBuffer(b.width, b.height),
				a = PIXI.Texture.fromCanvas(c.canvas);
			this._cachedSprite = new PIXI.Sprite(a),
				this._cachedSprite.buffer = c,
				this._cachedSprite.worldTransform = this.worldTransform
		}
		this._cachedSprite.anchor.x = -(b.x / b.width),
			this._cachedSprite.anchor.y = -(b.y / b.height),
			this._cachedSprite.buffer.context.translate(-b.x, -b.y),
			this.worldAlpha = 1,
			PIXI.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context),
			this._cachedSprite.alpha = this.alpha
	},
	PIXI.Graphics.prototype.updateCachedSpriteTexture = function() {
		var b = this._cachedSprite,
			c = b.texture,
			a = b.buffer.canvas;
		c.baseTexture.width = a.width,
			c.baseTexture.height = a.height,
			c.crop.width = c.frame.width = a.width,
			c.crop.height = c.frame.height = a.height,
			b._width = a.width,
			b._height = a.height,
			c.baseTexture.dirty()
	},
	PIXI.Graphics.prototype.destroyCachedSprite = function() {
		this._cachedSprite.texture.destroy(!0),
			this._cachedSprite = null
	},
	PIXI.Graphics.prototype.drawShape = function(a) {
		this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(),
			this.currentPath = null;
		var b = new PIXI.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, a);
		return this.graphicsData.push(b),
			b.type === PIXI.Graphics.POLY && (b.shape.closed = this.filling, this.currentPath = b),
			this.dirty = !0,
			b
	},
	PIXI.GraphicsData = function(b, f, a, d, h, g, c) {
		this.lineWidth = b,
			this.lineColor = f,
			this.lineAlpha = a,
			this._lineTint = f,
			this.fillColor = d,
			this.fillAlpha = h,
			this._fillTint = d,
			this.fill = g,
			this.shape = c,
			this.type = c.type
	},
	PIXI.Graphics.POLY = 0,
	PIXI.Graphics.RECT = 1,
	PIXI.Graphics.CIRC = 2,
	PIXI.Graphics.ELIP = 3,
	PIXI.Graphics.RREC = 4,
	PIXI.Polygon.prototype.type = PIXI.Graphics.POLY,
	PIXI.Rectangle.prototype.type = PIXI.Graphics.RECT,
	PIXI.Circle.prototype.type = PIXI.Graphics.CIRC,
	PIXI.Ellipse.prototype.type = PIXI.Graphics.ELIP,
	PIXI.RoundedRectangle.prototype.type = PIXI.Graphics.RREC,
	PIXI.BaseTextureCache = {},
	PIXI.BaseTextureCacheIdGenerator = 0,
	PIXI.BaseTexture = function(b, c) {
		if(this.resolution = 1, this.width = 100, this.height = 100, this.scaleMode = c || PIXI.scaleModes.DEFAULT, this.hasLoaded = !1, this.source = b, this._UID = PIXI._UID++, this.premultipliedAlpha = !0, this._glTextures = [], this.mipmap = !1, this._dirty = [!0, !0, !0, !0], b) {
			if((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
				this.hasLoaded = !0,
					this.width = this.source.naturalWidth || this.source.width,
					this.height = this.source.naturalHeight || this.source.height,
					this.dirty()
			} else {
				var a = this;
				this.source.onload = function() {
						a.hasLoaded = !0,
							a.width = a.source.naturalWidth || a.source.width,
							a.height = a.source.naturalHeight || a.source.height,
							a.dirty(),
							a.dispatchEvent({
								type: "loaded",
								content: a
							})
					},
					this.source.onerror = function() {
						a.dispatchEvent({
							type: "error",
							content: a
						})
					}
			}
			this.imageUrl = null,
				this._powerOf2 = !1
		}
	},
	PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture,
	PIXI.EventTarget.mixin(PIXI.BaseTexture.prototype),
	PIXI.BaseTexture.prototype.destroy = function() {
		this.imageUrl ? (delete PIXI.BaseTextureCache[this.imageUrl], delete PIXI.TextureCache[this.imageUrl], this.imageUrl = null, this.source.src = "") : this.source && this.source._pixiId && delete PIXI.BaseTextureCache[this.source._pixiId],
			this.source = null,
			this.unloadFromGPU()
	},
	PIXI.BaseTexture.prototype.updateSourceImage = function(a) {
		this.hasLoaded = !1,
			this.source.src = null,
			this.source.src = a
	},
	PIXI.BaseTexture.prototype.dirty = function() {
		for(var a = 0; a < this._glTextures.length; a++) {
			this._dirty[a] = !0
		}
	},
	PIXI.BaseTexture.prototype.unloadFromGPU = function() {
		this.dirty();
		for(var b = this._glTextures.length - 1; b >= 0; b--) {
			var c = this._glTextures[b],
				a = PIXI.glContexts[b];
			a && c && a.deleteTexture(c)
		}
		this._glTextures.length = 0,
			this.dirty()
	},
	PIXI.BaseTexture.fromImage = function(b, d, a) {
		var c = PIXI.BaseTextureCache[b];
		if(void 0 === d && -1 === b.indexOf("data:") && (d = !0), !c) {
			var f = new Image;
			d && (f.crossOrigin = ""),
				f.src = b,
				c = new PIXI.BaseTexture(f, a),
				c.imageUrl = b,
				PIXI.BaseTextureCache[b] = c, -1 !== b.indexOf(PIXI.RETINA_PREFIX + ".") && (c.resolution = 2)
		}
		return c
	},
	PIXI.BaseTexture.fromCanvas = function(b, c) {
		b._pixiId || (b._pixiId = "canvas_" + PIXI.TextureCacheIdGenerator++);
		var a = PIXI.BaseTextureCache[b._pixiId];
		return a || (a = new PIXI.BaseTexture(b, c), PIXI.BaseTextureCache[b._pixiId] = a),
			a
	},
	PIXI.TextureCache = {},
	PIXI.FrameCache = {},
	PIXI.TextureCacheIdGenerator = 0,
	PIXI.Texture = function(b, d, a, c) {
		this.noFrame = !1,
			d || (this.noFrame = !0, d = new PIXI.Rectangle(0, 0, 1, 1)),
			b instanceof PIXI.Texture && (b = b.baseTexture),
			this.baseTexture = b,
			this.frame = d,
			this.trim = c,
			this.valid = !1,
			this.requiresUpdate = !1,
			this._uvs = null,
			this.width = 0,
			this.height = 0,
			this.crop = a || new PIXI.Rectangle(0, 0, 1, 1),
			b.hasLoaded ? (this.noFrame && (d = new PIXI.Rectangle(0, 0, b.width, b.height)), this.setFrame(d)) : b.addEventListener("loaded", this.onBaseTextureLoaded.bind(this))
	},
	PIXI.Texture.prototype.constructor = PIXI.Texture,
	PIXI.EventTarget.mixin(PIXI.Texture.prototype),
	PIXI.Texture.prototype.onBaseTextureLoaded = function() {
		var a = this.baseTexture;
		a.removeEventListener("loaded", this.onLoaded),
			this.noFrame && (this.frame = new PIXI.Rectangle(0, 0, a.width, a.height)),
			this.setFrame(this.frame),
			this.dispatchEvent({
				type: "update",
				content: this
			})
	},
	PIXI.Texture.prototype.destroy = function(a) {
		a && this.baseTexture.destroy(),
			this.valid = !1
	},
	PIXI.Texture.prototype.setFrame = function(a) {
		if(this.noFrame = !1, this.frame = a, this.width = a.width, this.height = a.height, this.crop.x = a.x, this.crop.y = a.y, this.crop.width = a.width, this.crop.height = a.height, !this.trim && (a.x + a.width > this.baseTexture.width || a.y + a.height > this.baseTexture.height)) {
			throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this)
		}
		this.valid = a && a.width && a.height && this.baseTexture.source && this.baseTexture.hasLoaded,
			this.trim && (this.width = this.trim.width, this.height = this.trim.height, this.frame.width = this.trim.width, this.frame.height = this.trim.height),
			this.valid && this._updateUvs()
	},
	PIXI.Texture.prototype._updateUvs = function() {
		this._uvs || (this._uvs = new PIXI.TextureUvs);
		var b = this.crop,
			c = this.baseTexture.width,
			a = this.baseTexture.height;
		this._uvs.x0 = b.x / c,
			this._uvs.y0 = b.y / a,
			this._uvs.x1 = (b.x + b.width) / c,
			this._uvs.y1 = b.y / a,
			this._uvs.x2 = (b.x + b.width) / c,
			this._uvs.y2 = (b.y + b.height) / a,
			this._uvs.x3 = b.x / c,
			this._uvs.y3 = (b.y + b.height) / a
	},
	PIXI.Texture.fromImage = function(b, d, a) {
		var c = PIXI.TextureCache[b];
		return c || (c = new PIXI.Texture(PIXI.BaseTexture.fromImage(b, d, a)), PIXI.TextureCache[b] = c),
			c
	},
	PIXI.Texture.fromFrame = function(a) {
		var b = PIXI.TextureCache[a];
		if(!b) {
			throw new Error('The frameId "' + a + '" does not exist in the texture cache ')
		}
		return b
	},
	PIXI.Texture.fromCanvas = function(b, c) {
		var a = PIXI.BaseTexture.fromCanvas(b, c);
		return new PIXI.Texture(a)
	},
	PIXI.Texture.addTextureToCache = function(a, b) {
		PIXI.TextureCache[b] = a
	},
	PIXI.Texture.removeTextureFromCache = function(a) {
		var b = PIXI.TextureCache[a];
		return delete PIXI.TextureCache[a],
			delete PIXI.BaseTextureCache[a],
			b
	},
	PIXI.TextureUvs = function() {
		this.x0 = 0,
			this.y0 = 0,
			this.x1 = 0,
			this.y1 = 0,
			this.x2 = 0,
			this.y2 = 0,
			this.x3 = 0,
			this.y3 = 0
	},
	PIXI.Texture.emptyTexture = new PIXI.Texture(new PIXI.BaseTexture),
	PIXI.RenderTexture = function(b, d, a, c, g) {
		if(this.width = b || 100, this.height = d || 100, this.resolution = g || 1, this.frame = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution), this.crop = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution), this.baseTexture = new PIXI.BaseTexture, this.baseTexture.width = this.width * this.resolution, this.baseTexture.height = this.height * this.resolution, this.baseTexture._glTextures = [], this.baseTexture.resolution = this.resolution, this.baseTexture.scaleMode = c || PIXI.scaleModes.DEFAULT, this.baseTexture.hasLoaded = !0, PIXI.Texture.call(this, this.baseTexture, new PIXI.Rectangle(0, 0, this.width, this.height)), this.renderer = a || PIXI.defaultRenderer, this.renderer.type === PIXI.WEBGL_RENDERER) {
			var f = this.renderer.gl;
			this.baseTexture._dirty[f.id] = !1,
				this.textureBuffer = new PIXI.FilterTexture(f, this.width * this.resolution, this.height * this.resolution, this.baseTexture.scaleMode),
				this.baseTexture._glTextures[f.id] = this.textureBuffer.texture,
				this.render = this.renderWebGL,
				this.projection = new PIXI.Point(0.5 * this.width, 0.5 * -this.height)
		} else {
			this.render = this.renderCanvas,
				this.textureBuffer = new PIXI.CanvasBuffer(this.width * this.resolution, this.height * this.resolution),
				this.baseTexture.source = this.textureBuffer.canvas
		}
		this.valid = !0,
			this._updateUvs()
	},
	PIXI.RenderTexture.prototype = Object.create(PIXI.Texture.prototype),
	PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture,
	PIXI.RenderTexture.prototype.resize = function(b, c, a) {
		(b !== this.width || c !== this.height) && (this.valid = b > 0 && c > 0, this.width = this.frame.width = this.crop.width = b, this.height = this.frame.height = this.crop.height = c, a && (this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.renderer.type === PIXI.WEBGL_RENDERER && (this.projection.x = this.width / 2, this.projection.y = -this.height / 2), this.valid && this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution))
	},
	PIXI.RenderTexture.prototype.clear = function() {
		this.valid && (this.renderer.type === PIXI.WEBGL_RENDERER && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear())
	},
	PIXI.RenderTexture.prototype.renderWebGL = function(d, h, c) {
		if(this.valid) {
			var g = d.worldTransform;
			g.identity(),
				g.translate(0, 2 * this.projection.y),
				h && g.append(h),
				g.scale(1, -1),
				d.worldAlpha = 1;
			for(var l = d.children,
					k = 0,
					f = l.length; f > k; k++) {
				l[k].updateTransform()
			}
			var b = this.renderer.gl;
			b.viewport(0, 0, this.width * this.resolution, this.height * this.resolution),
				b.bindFramebuffer(b.FRAMEBUFFER, this.textureBuffer.frameBuffer),
				c && this.textureBuffer.clear(),
				this.renderer.spriteBatch.dirty = !0,
				this.renderer.renderDisplayObject(d, this.projection, this.textureBuffer.frameBuffer),
				this.renderer.spriteBatch.dirty = !0
		}
	},
	PIXI.RenderTexture.prototype.renderCanvas = function(m, k, f) {
		if(this.valid) {
			var b = m.worldTransform;
			b.identity(),
				k && b.append(k),
				m.worldAlpha = 1;
			for(var d = m.children,
					c = 0,
					p = d.length; p > c; c++) {
				d[c].updateTransform()
			}
			f && this.textureBuffer.clear();
			var l = this.textureBuffer.context,
				g = this.renderer.resolution;
			this.renderer.resolution = this.resolution,
				this.renderer.renderDisplayObject(m, l),
				this.renderer.resolution = g
		}
	},
	PIXI.RenderTexture.prototype.getImage = function() {
		var a = new Image;
		return a.src = this.getBase64(),
			a
	},
	PIXI.RenderTexture.prototype.getBase64 = function() {
		return this.getCanvas().toDataURL()
	},
	PIXI.RenderTexture.prototype.getCanvas = function() {
		if(this.renderer.type === PIXI.WEBGL_RENDERER) {
			var b = this.renderer.gl,
				d = this.textureBuffer.width,
				a = this.textureBuffer.height,
				c = new Uint8Array(4 * d * a);
			b.bindFramebuffer(b.FRAMEBUFFER, this.textureBuffer.frameBuffer),
				b.readPixels(0, 0, d, a, b.RGBA, b.UNSIGNED_BYTE, c),
				b.bindFramebuffer(b.FRAMEBUFFER, null);
			var g = new PIXI.CanvasBuffer(d, a),
				f = g.context.getImageData(0, 0, d, a);
			return f.data.set(c),
				g.context.putImageData(f, 0, 0),
				g.canvas
		}
		return this.textureBuffer.canvas
	},
	PIXI.RenderTexture.tempMatrix = new PIXI.Matrix,
	PIXI.AbstractFilter = function(a, b) {
		this.passes = [this],
			this.shaders = [],
			this.dirty = !0,
			this.padding = 0,
			this.uniforms = b || {},
			this.fragmentSrc = a || []
	},
	PIXI.AbstractFilter.prototype.constructor = PIXI.AbstractFilter,
	PIXI.AbstractFilter.prototype.syncUniforms = function() {
		for(var a = 0,
				b = this.shaders.length; b > a; a++) {
			this.shaders[a].dirty = !0
		}
	},
	window.isAndroid = /(android)/i.test(navigator.userAgent) && !/(Windows)/i.test(navigator.userAgent),
	window.isiOS = /(ipod|iphone|ipad)/i.test(navigator.userAgent),
	window.isWindowsMobile = /(IEMobile)/i.test(navigator.userAgent),
	window.isSilk = /(silk)/i.test(navigator.userAgent),
	window.isClay = /(clay\.io)/i.test(document.location),
	window.isFacebookApp = /(fb_canvas)/i.test(document.location),
	window.isFacebookAppWeb = /(fb_canvas_web)/i.test(document.location),
	window.isIframed = window.top !== window.self,
	window.isCordova = window.cordova ? !0 : !1,
	window.isChromeApp = window.chrome && window.chrome.storage ? !0 : !1,
	window.isWrapped = isCordova || isChromeApp ? !0 : !1,
	window.isMobile = window.isAndroid || window.isWindowsMobile || window.isiOS || window.isSilk,
	window.isApp = window.isCordova || window.isChromeApp,
	window.isStandalone = "standalone" in window.navigator && window.navigator.standalone,
	window.isMobileiOSDevice = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i),
	window.isKongregate = /(kongregateiframe)/i.test(document.location);
window.httpPrefix = 0 == window.location.protocol.indexOf("http") ? "//" : "https://",
	window.isKik = window.kik ? !0 : !1;
var ratio = Math.min(window.devicePixelRatio || 1, 2);
window.marginBottom = 0,
	window.marginTop = (window.isCordova || window.isStandalone) && window.isiOS ? 25 * ratio : 0,
	window.ga || (window.ga = function() {}),
	window.vpath = window.vpath || "./",
	window.onParseLoginSuccess = function(a) {},
	window.showGameOverAd = function() {},
	window.hideGameOverAd = function() {},
	window.showInterstitialAd = function() {},
	window.resizeAd = function() {},
	window.showRateGame = function() {},
	window.resizeCallbacks = [],
	window.onresize = function(a) {
		for(var b = 0; b < resizeCallbacks.length; b++) {
			resizeCallbacks[b](a)
		}
	},
	window.removeResizeCallback = function(a) {
		for(var b = 0; b < resizeCallbacks.length; b++) {
			if(resizeCallbacks[b] == a) {
				return void resizeCallbacks.splice(b, 1)
			}
		}
	},
	window.overlayToggleCallbacks = [],
	window.toggleOverlay = function(a) {
		for(var b = 0; b < overlayToggleCallbacks.length; b++) {
			overlayToggleCallbacks[b](a)
		}
	},
	Math.seed = function(b) {
		var d = b,
			a = 22984849,
			c = 4294967295;
		return function() {
			a = 36969 * (65535 & a) + (a >> 16) & c,
				d = 18000 * (65535 & d) + (d >> 16) & c;
			var e = (a << 16) + d & c;
			return e /= 4294967296,
				e + 0.5
		}
	},
	window.Store = function() {
		if(isChromeApp) {
			var b = {},
				c = !1;
			return {
				set: function(d, e) {
					b[d] = e,
						c || (c = !0, setTimeout(function() {
								c = !1;
								try {
									chrome.storage.sync.set(b,
										function() {})
								} catch(f) {
									console.log("Failed to save :(")
								}
							},
							3000))
				},
				get: function(f, d) {
					return b[f] ? b[f] : void chrome.storage.sync.get(f,
						function(h) {
							for(var g in h) {
								b[g] = h[g]
							}
							d && d()
						})
				},
				remove: function(d) {
					delete b[d],
						chrome.storage.sync.remove(d,
							function(e) {})
				}
			}
		}
		var b = {},
			a = function() {
				try {
					return "localStorage" in window && null !== window.localStorage
				} catch(d) {
					return !1
				}
			}();
		return a ? {
			set: function(g, d) {
				b[g] = d;
				try {
					localStorage.setItem(g, d)
				} catch(f) {}
			},
			get: function(f, d) {
				return d && d(),
					b[f] ? b[f] : localStorage.getItem(f)
			},
			remove: function(d) {
				return localStorage.removeItem(d)
			}
		} : {
			set: function() {},
			get: function(d, f) {
				f && f()
			},
			remove: function() {}
		}
	}(),
	SoundPlayer.unblocked = !1,
	window.Sound = new SoundPlayer,
	window.Music = new SoundPlayer(!0),
	window.backgroundMusic = null,
	window.clickSound = null;
var Tween = function(b, d, a, c) {
	a = void 0 == a ? 1 : a;
	var g = {};
	this.offset = 0,
		this.method = c || Tween.easeout,
		this.length = 1000 * a / (1000 / 60),
		this.target = b,
		this.call = function(e) {
			return this.callback = e,
				this
		},
		this.wait = function(e) {
			return this.delay = 1000 * (e || 0) / (1000 / 60),
				this
		},
		this.tick = function() {
			if(this.delay > 0) {
				return void this.delay--
			}
			this.target.dirty = !0;
			for(var h in g) {
				var k = g[h];
				this.target[h] = this.method(k.start, k.end, this.offset / this.length)
			}
			return this.offset++,
				this.offset > this.length ? !0 : void 0
		},
		this.complete = function() {
			for(var h in g) {
				this.target[h] = g[h].end
			}
			if(this.callback) {
				var k = this;
				setTimeout(function() {
						k.callback.apply(k.target, null)
					},
					50)
			}
		};
	for(var f in d) {
		g[f] = {
			start: b[f],
			end: d[f]
		}
	}
	Tween.tweens.push(this)
};
Tween.tweens = [],
	Tween.linary = function(b, c, a) {
		return b + (c - b) * a
	},
	Tween.easein = function(b, d, a) {
		var c = 1 - Math.sin(a * Math.PI / 2 + Math.PI / 2);
		return b + (d - b) * c
	},
	Tween.easeout = function(b, d, a) {
		var c = Math.sin(a * Math.PI / 2);
		return b + (d - b) * c
	},
	Tween.easeinout = function(b, d, a) {
		var c = (Math.sin(a * Math.PI + Math.PI / 2) + 1) / 2;
		return b + (d - b) * c
	},
	Tween.bounce = function(b, d, a) {
		var c = Math.sin(a * Math.PI);
		return b + (d - b) * c
	},
	Tween.tick = function() {
		for(var a = 0; a < Tween.tweens.length; a++) {
			var b = Tween.tweens[a];
			b.tick() && (window.dirtyOnce = !0, Tween.tweens.splice(a--, 1), b.complete())
		}
	},
	Tween.complete = function(b) {
		for(var c = 0; c < Tween.tweens.length; c++) {
			var a = Tween.tweens[c];
			a.target == b && (window.dirtyOnce = !0, Tween.tweens.splice(c--, 1), a.complete())
		}
	},
	Tween.clear = function(b) {
		for(var c = 0; c < Tween.tweens.length; c++) {
			var a = Tween.tweens[c];
			a.target == b && Tween.tweens.splice(c--, 1)
		}
	};
var preloadCache = {};
window.embed = function(a) {
		if(a = vpath + a, void 0 === preloadCache[a]) {
			throw "You can only use the embed method in conjuction with preload"
		}
		return preloadCache[a]
	},
	PIXI.dontSayHello = !0;
var scaledCache = {};
PIXI.Texture.getScaled = function(b, d) {
	function a(f, h) {
		for(; 0.5 > h;) {
			f = a(f, 0.5),
				h /= 0.5
		}
		var g = document.createElement("canvas"),
			l = Math.ceil(f.width * h),
			k = Math.ceil(f.height * h);
		return g.width = l + 2,
			g.height = k + 2,
			g.getContext("2d").drawImage(f, 0, 0, f.width, f.height, 1, 1, l, k),
			g.path = f.path,
			g
	}
	var c = b.path + ":" + d;
	return void 0 !== scaledCache[c] ? scaledCache[c] : (canvas = document.createElement("canvas"), canvas.width = b.width + 2, canvas.height = b.height + 2, canvas.getContext("2d").drawImage(b, 0, 0, b.width, b.height, 1, 1, b.width, b.height), scaledCache[c] = PIXI.Texture.fromCanvas(a(canvas, d)))
};
var Container = function() {
	PIXI.DisplayObjectContainer.call(this);
	var b = void 0;
	Object.defineProperty(this, "ratio", {
			get: function() {
				return b
			},
			set: function(f) {
				if(b !== f) {
					b = f,
						this.x = this.x,
						this.y = this.y;
					for(var d = 0; d < this.children.length; d++) {
						this.children[d].ratio = b
					}
					this.setRatio(f)
				}
			}
		}),
		this.setRatio = function(d) {},
		this.inside = function(f, g, d) {
			return !1
		};
	var c = 0;
	Object.defineProperty(this, "x", {
		get: function() {
			return c
		},
		set: function(d) {
			c = d,
				this.position.x = d * (this.parent ? this.parent.ratio || 1 : 1)
		}
	});
	var a = 0;
	Object.defineProperty(this, "y", {
		get: function() {
			return a
		},
		set: function(d) {
			a = d,
				this.position.y = d * (this.parent ? this.parent.ratio || 1 : 1)
		}
	})
};
Container.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
	Container.prototype.constructor = Container,
	Container.prototype._addChildAt = Container.prototype.addChildAt,
	Container.prototype.addChildAt = function(b, c) {
		var a = this._addChildAt(b, c);
		return void 0 != this.ratio && (b.ratio = this.ratio),
			a
	};
var SpriteBatch = function() {
	Container.call(this),
		PIXI.SpriteBatch.call(this)
};
SpriteBatch.prototype = Object.create(PIXI.SpriteBatch.prototype),
	SpriteBatch.prototype.constructor = SpriteBatch,
	SpriteBatch.prototype._addChildAt = SpriteBatch.prototype.addChildAt,
	SpriteBatch.prototype.addChildAt = function(b, c) {
		var a = this._addChildAt(b, c);
		return void 0 != this.ratio && (b.ratio = this.ratio),
			a
	};
var CachedContainer = function() {
	Container.call(this);
	var a = new PIXI.Sprite(PIXI.Texture.emptyTexture),
		c = document.createElement("canvas"),
		b = c.getContext("2d");
	this.setRatio = function(f) {
			var e = this.getLocalBounds();
			for(c.width = e.width, c.height = e.height, a.worldTransform = this.worldTransform, a.anchor.x = -(e.x / e.width), a.anchor.y = -(e.y / e.height), b.translate(-e.x, -e.y), i = 0, j = this.children.length; i < j; i++) {
				var d = this.children[i];
				d.cacheRender && d.cacheRender(b)
			}
			a.texture.destroy(!0),
				a.setTexture(PIXI.Texture.fromCanvas(c))
		},
		this._renderWebGL = function(d) {
			PIXI.Sprite.prototype._renderWebGL.call(a, d)
		},
		this._renderCanvas = function(d) {
			PIXI.Sprite.prototype._renderCanvas.call(a, d)
		}
};
CachedContainer.prototype = Object.create(Container.prototype),
	CachedContainer.prototype.constructor = CachedContainer,
	CachedContainer.prototype.updateTransform = function() {
		this.displayObjectUpdateTransform()
	};
var Sprite = function(a) {
	this._ratio = -1,
		this.image = a,
		PIXI.Sprite.call(this, new PIXI.RenderTexture(a.width, a.height))
};
Sprite.prototype = Object.create(PIXI.Sprite.prototype),
	Sprite.prototype.constructor = Sprite,
	Sprite.prototype.getTexture = function(a, b) {
		return PIXI.Texture.getScaled(a, b)
	},
	Sprite.prototype.cacheRender = function(a) {
		a.drawImage(this.texture.baseTexture.source, this.position.x, this.position.y)
	},
	Sprite.prototype._y = 0,
	Object.defineProperty(Sprite.prototype, "y", {
		get: function() {
			return this._y
		},
		set: function(a) {
			this._y = a,
				this.position.y = a * this._ratio - 1
		}
	}),
	Sprite.prototype._x = 0,
	Object.defineProperty(Sprite.prototype, "x", {
		get: function() {
			return this._x
		},
		set: function(a) {
			this._x = a,
				this.position.x = a * this._ratio - 1
		}
	}),
	Object.defineProperty(Sprite.prototype, "ratio", {
		get: function() {
			return this._ratio
		},
		set: function(a) {
			if(this._ratio !== a) {
				this.setTexture(this.getTexture(this.image, a)),
					this._ratio = a,
					this.x = this.x,
					this.y = this.y;
				for(var b = 0; b < this.children.length; b++) {
					this.children[b].ratio = this._ratio
				}
			}
		}
	}),
	Sprite.fromSheet = function(a, b) {
		return a.frame = b,
			new Sprite(a.image)
	},
	window.Sprite = Sprite;
var sheetCache = {},
	Sheet = function(q, m, g) {
		m = m || q.height,
			g = g || q.height;
		var b = q.width / m,
			d = q.height / g;
		this.length = b * d,
			this.images = [];
		for(var c = 0; c < this.length; c++) {
			var u = c % b >> 0,
				p = c / b >> 0,
				k = q.src + "," + u + "," + p + "," + m + "," + g,
				f = sheetCache[k];
			void 0 === f && (f = document.createElement("canvas"), f.width = m, f.height = g, f.path = k, f.getContext("2d").drawImage(q, u * m, p * g, m, g, 0, 0, m, g), sheetCache[k] = f),
				this.images.push(f)
		}
		Sprite.call(this, this.images[0])
	};
Sheet.prototype = Object.create(Sprite.prototype),
	Sheet.prototype.constructor = Sheet,
	Sheet.prototype._frame = 0,
	Sheet.prototype.images = [],
	Object.defineProperty(Sheet.prototype, "frame", {
		get: function() {
			return this._frame
		},
		set: function(a) {
			a !== this.frame && (this._frame = a % this.length, this.image = this.images[this._frame], -1 != this.ratio && this.setTexture(this.getTexture(this.image, this.ratio)))
		}
	});
var ignoreMouseEvents = !1,
	canvas = document.getElementById("gameCanvas"),
	stageContainer = new PIXI.Stage(2105376),
	renderer = PIXI.autoDetectRenderer(width, height, {
		view: canvas,
		antialiasing: !1,
		transparent: !1,
		clearBeforeRender: !0
	});
document.body.appendChild(canvas);
var rate = 1000 / 60,
	before = (new Date).getTime();
tick = function() {
		var a = (new Date).getTime();
		for(a - before > 5000 && (before = a); a > before; before += rate) {
			Tween.tick()
		}
	},
	window.dirty = !1,
	window.dirtyOnce = !1,
	animate();
var width = 1500,
	height = 1500,
	gameHeight = height,
	stage = new Container;
stage.hitArea = new PIXI.Rectangle(0, -10000, 100000, 100000),
	stage.interactive = !0,
	stage.touchstart = function() {},
	stageContainer.addChild(stage),
	stage.orientation = "landscape";
var targetWidth = 2048,
	targetHeight = 1536;
window.forceRatio = !1,
	resizeCallbacks.push(function() {
		window.resizeAd(),
			width = Math.max(document.documentElement.clientWidth, 100),
			height = window.innerHeight || document.documentElement.clientHeight;
		var b = width * ratio >> 0,
			d = height * ratio >> 0;
		renderer.resize(b, d),
			renderer.view.style.width = (b / ratio >> 0) + "px",
			renderer.view.style.height = (d / ratio >> 0) + "px",
			window.scrollTo(0, 0),
			gameHeight = Math.max(height - marginBottom - marginTop / ratio, 10),
			stage.orientation = gameHeight >= width ? "portrait" : "landscape",
			stage.y = marginTop / 2 * ratio;
		var a = targetWidth,
			c = targetHeight;
		"portrait" == stage.orientation && (c = targetWidth, a = targetHeight);
		var f = Math.min(Math.min(width * ratio / a, gameHeight * ratio / c), 1);
		window.forceRatio && (f = 1),
			stage.ratio = f,
			document.title = document.title
	}),
	window.onresize(),
	window.onunload = function() {
		window.onresize()
	},
	setInterval(function() {
			(height != (window.innerHeight || document.documentElement.clientHeight) || width != document.documentElement.clientWidth) && window.onresize()
		},
		500);
var Text = function(q, m, g, b, d, c, u) {
	PIXI.Text.call(this, [q]),
		this.weight = m || "300",
		this.size = g || "30",
		this.fill = b || "#000000",
		this.font = d || "sans-serif",
		this.italic = c || !1,
		this.align = u || "";
	var p = -1;
	Object.defineProperty(this, "ratio", {
			get: function() {
				return p
			},
			set: function(a) {
				p !== a && (p = a, this.x = this.x, this.y = this.y, this.refreshStyle())
			}
		}),
		this.refreshStyle = function() {
			var a = {
				font: (this.italic ? "italic " : "") + this.weight + " " + this.size * p * 2 + "px " + this.font,
				fill: this.fill,
				align: this.align
			};
			this.dropShadow && (a.dropShadow = !0),
				this.setStyle(a)
		},
		this.ratio = 1;
	var k = 0;
	Object.defineProperty(this, "x", {
		get: function() {
			return k
		},
		set: function(a) {
			k = a,
				this.position.x = a * p >> 0
		}
	});
	var f = 0;
	Object.defineProperty(this, "y", {
			get: function() {
				return f
			},
			set: function(a) {
				f = a,
					this.position.y = a * p >> 0
			}
		}),
		this.scale.set(0.5, 0.5)
};
Text.prototype = Object.create(PIXI.Text.prototype),
	Text.prototype.constructor = Text,
	function() {
		var a = function() {
			function m() {
				return height * ratio / f.ratio / 2 - l / 2
			}

			function k() {
				f.isShowing = !1,
					g && g.destroy && g.destroy(),
					d.removeChild(g),
					stage.removeChild(f)
			}
			Container.call(this);
			var f = this;
			this.backgroundColor = 16777215,
				this.isShowing = !1;
			var b = new PIXI.Graphics;
			b.beginFill(0, 0.6),
				b.drawRect(0, 0, 200, 200),
				this.addChild(b),
				b.interactive = !0,
				b.defaultCursor = "pointer";
			var d = new Container;
			this.addChild(d);
			var c = new PIXI.Graphics;
			d.addChild(c);
			var p = 800,
				l = 800;
			this.setRatio = function(e) {
					c.width = p * e,
						c.height = l * e,
						this.redraw()
				},
				this.setHeight = function(e) {
					l = e,
						c.clear(),
						c.beginFill(f.backgroundColor, 1),
						c.drawRoundedRect(0, 0, p, l, 35),
						this.ratio && this.setRatio(this.ratio)
				},
				this.setHeight(800),
				this.redraw = function() {
					f.ratio = Math.min(Math.min(width * ratio / 900, height * ratio / (l + 100)), ratio / 2),
						b.width = width * ratio,
						b.height = height * ratio,
						d.x = width * ratio / this.ratio / 2 - p / 2
				},
				this.handleResize = function() {
					Tween.clear(d),
						d.x = width * ratio / this.ratio / 2 - p / 2,
						d.y = m(),
						f.redraw()
				},
				resizeCallbacks.push(this.handleResize);
			var f = this,
				g = null;
			this.show = function(h, e) {
					window.toggleOverlay(!0),
						k(),
						f.isShowing = !0,
						g = h,
						this.setHeight(g.innerHeight),
						d.addChild(g),
						d.y = height * ratio / stage.ratio,
						b.alpha = 0,
						new Tween(d, {
								y: m()
							},
							0.3),
						e !== !0 && new Tween(b, {
								alpha: 1
							},
							0.3),
						stage.addChild(f)
				},
				this.hide = function(e) {
					f.isShowing ? (new Tween(b, {
							alpha: 0
						},
						0.3), new Tween(d, {
							y: -l
						},
						0.3).call(function() {
						k(),
							window.toggleOverlay(!1),
							e instanceof Function && e()
					})) : e instanceof Function && e()
				},
				attachUpHandler(b,
					function() {
						g.blurClose ? f.hide() : g.blurCallback instanceof Function && g.blurCallback()
					}, !0)
		};
		a.prototype = Object.create(Container.prototype),
			a.prototype.constructor = a,
			window.Modal = new a
	}();
var ModelButton = function(v, p, k, b, f, d) {
	Container.call(this);
	var w, u, m;
	b = void 0 === b ? 15748651 : b,
		w = new PIXI.Graphics,
		w.beginFill(void 0 === b ? 16711680 : b, 1),
		this.addChild(w);
	var g = 165 + f;
	if(f ? (w.drawRoundedRect(0, 0, 800, 200, f), u = new PIXI.Graphics, u.beginFill(16777215, 1), u.drawRect(0, 0, 800, f), this.addChild(u)) : w.drawRect(0, 0, 800, g), p) {
		var q = new Text(p, 400, 40, "#ffffff", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif');
		q.anchor.set(0.5, 0),
			q.x = 400,
			q.y = 30 + f + 60,
			this.addChild(q)
	}
	m = new Text(v, 400, d, "#ffffff", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif'),
		m.anchor.set(0.5, 0),
		m.x = 400,
		m.y = 30 + f,
		m.hitArea = new PIXI.Rectangle(-400, -30, 800, 165),
		this.addChild(m),
		m.interactive = !0,
		m.buttonMode = !0,
		k && attachDownHandler(w,
			function() {
				window.clickSound && window.clickSound.play(0),
					k()
			}),
		this.setRatio = function(a) {
			w.width = 800 * a,
				w.height = g * a,
				u && (u.width = 800 * a, u.height = 35 * a)
		}
};
ModelButton.prototype = Object.create(Container.prototype),
	ModelButton.prototype.constructor = ModelButton;
var PictureButton = function(b, d) {
	Container.call(this);
	var a = new Image;
	a.crossOrigin = "anonymous",
		a.src = b;
	var c = this;
	a.onload = function() {
		var e = new Sprite(a);
		e.x = -1,
			c.addChild(e),
			d && attachDownHandler(e, d)
	}
};
PictureButton.prototype = Object.create(Container.prototype),
	PictureButton.prototype.constructor = PictureButton;
var ModalOverlayContent = function() {
	Container.call(this),
		this.innerHeight = 800,
		this.blurClose = !0,
		this.addHeadline = function(a) {
			var b = new Text(a, 200, 90, "#2c2c2c", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif');
			return b.anchor.set(0.5, 0),
				b.x = 400,
				b.y = 50,
				b.updateText(),
				this.addChild(b),
				b
		},
		this.addTextBlock = function(b, d, a) {
			var c = new Text(b, a || 200, d || 90, "#2c2c2c", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif');
			return c.anchor.set(0.5, 0),
				c.x = 400,
				c.y = 50,
				c.updateText(),
				this.addChild(c),
				c
		},
		this.addLead = function(b, c) {
			var a = new Text(b, 200, 45, "#2c2c2c", '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif', !1, "center");
			return a.anchor.set(0.5, 0),
				a.x = 400,
				a.y = 140 + (c || 0),
				a.updateText(),
				this.addChild(a),
				a
		};
	this.addButton = function(b, d, a) {
			var c = new ModelButton(b, "", d, a, 35, 90);
			return c.y = 370,
				this.addChild(c)
		},
		this.addMiddleButton = function(b, d, a, c) {
			var f = new ModelButton(b, d, a, c, 0, 60);
			return f.y = 370,
				this.addChild(f)
		},
		this.addSocialButton = function(b, d, a, c) {
			var f = this.addMiddleButton(b, d, a, c);
			return f.y = 405,
				this.addChild(f)
		},
		this.addPictureButton = function(b, c) {
			var a = new PictureButton(b, c);
			return a.y = 405,
				a.x = -1,
				this.addChild(a)
		}
};
ModalOverlayContent.prototype = Object.create(Container.prototype),
	ModalOverlayContent.prototype.constructor = ModalOverlayContent;
var RateGameModal = function(q, m) {
	function g(a) {
		c.visible = !(u.visible = 4 == a),
			p.visible = !0,
			d.innerHeight = 760,
			Modal.setHeight(d.innerHeight),
			Modal.handleResize(),
			p.y = 560,
			d.addChildAt(p, 0)
	}

	function b(h) {
		var a = new Sheet(q, 136, 130);
		return a.y = 270,
			a.x = 150 * f + 30,
			attachDownHandler(a,
				function() {
					for(var e = 0; 5 > e; e++) {
						k[e].frame = h >= e ? 1 : 0
					}
					g(h)
				}),
			a.buttonMode = !0,
			a
	}
	ModalOverlayContent.call(this),
		this.addHeadline("Having Fun?"),
		this.addLead("Help us improve the game!\nHow would you rate Hex FRVR?", 10);
	var d = this,
		c = d.addMiddleButton("Send Feedback", "Help us improve Hex FRVR",
			function() {
				navigate(Config.feedbackURL),
					Modal.hide()
			},
			6208638);
	c.y = 430,
		c.visible = !1;
	var u = d.addMiddleButton("Write Review", "Help us by writing a review!",
		function() {
			navigate(window.isAndroid ? Config.androidReviewURL : Config.iOSReviewURL),
				Store.set("rateGameCount3", 100),
				Modal.hide()
		},
		6208638);
	u.y = 430,
		u.visible = !1;
	var p = d.addButton("No thanks",
		function() {
			Modal.hide()
		},
		m);
	p.visible = !1;
	for(var k = [], f = 0; 5 > f; f++) {
		k.push(this.addChild(b(f)))
	}
	this.innerHeight = 450,
		this.blurClose = !1
};
RateGameModal.prototype = Object.create(ModalOverlayContent.prototype),
	RateGameModal.prototype.constructor = RateGameModal;
var InstallGameModal = function(b, d, a) {
	ModalOverlayContent.call(this),
		this.addHeadline("Install " + Config.shortTitle + "?");
	var c = this.addButton("Install Now",
		function() {
			navigate(d, "_top")
		},
		6274174);
	c.y = 640,
		this.innerHeight += 40;
	var f = PIXI.Sprite.fromImage(vpath + b);
	f.anchor.set(0, 0),
		this.addChild(f),
		f.buttonMode = !0,
		attachDownHandler(f,
			function() {
				navigate(d, "_top")
			}),
		this.setRatio = function(e) {
			f.scale.set(1.465 * e, 1.465 * e),
				f.y = 160 * e
		},
		this.blurClose = !1,
		this.blurCallback = function() {
			Modal.hide(a)
		}
};
InstallGameModal.prototype = Object.create(ModalOverlayContent.prototype),
	InstallGameModal.prototype.constructor = InstallGameModal;
var ScrollContainer = function(q, m) {
	Container.call(this),
		this.scrollWidth = q,
		this.scrollHeight = m,
		this.allowScrollX = !0,
		this.allowScrollY = !0,
		this.content = new Container,
		this.addChild(this.content),
		this.addChild = function(a) {
			return this.content.addChild(a)
		},
		this.removeChild = function(a) {
			return this.content.removeChild(a)
		},
		this.resize = function(a, h) {
			this.scrollWidth = a,
				this.scrollHeight = h
		},
		this.moved = !1;
	var g = this,
		b = null,
		d = 0,
		c = 0;
	attachDownHandler(stageContainer,
		function(l) {
			Tween.clear(g.content);
			var o = l.getLocalPosition(g),
				n = o.x / g.ratio,
				h = o.y / g.ratio;
			d = g.content.x,
				c = g.content.y,
				n >= 0 && h >= 0 && n <= g.scrollWidth && h <= g.scrollHeight && (b = o),
				g.moved = !1
		});
	var u = stageContainer.touchmove,
		p = null,
		k = 0,
		f = 0;
	stageContainer.touchmove = function(h) {
			if(null !== b) {
				var o = h.getLocalPosition(g);
				if(g.moved || Math.abs(b.y - o.y) > 5 * ratio || Math.abs(b.x - o.x) > 5 * ratio) {
					if(g.moved = !0, p && (k = o.y - p.y, f = (new Date).getTime()), p = o, g.allowScrollX) {
						var s = d - (b.x - o.x) / g.ratio,
							r = g.scrollWidth - Math.max(g.content.width / g.content.ratio, g.scrollWidth);
						if(s > 0) {
							s = Math.min(s, 7 * Math.sqrt(s))
						} else {
							if(r > s) {
								var a = -s + r;
								s = r - Math.min(a, 7 * Math.sqrt(a))
							}
						}
						g.content.x = s
					}
					if(g.allowScrollY) {
						var n = c - (b.y - o.y) / g.ratio,
							l = g.scrollHeight - Math.max(g.content.height / g.content.ratio, g.scrollHeight);
						if(n > 0) {
							n = Math.min(n, 7 * Math.sqrt(n))
						} else {
							if(l > n) {
								var a = -n + l;
								n = l - Math.min(a, 7 * Math.sqrt(a))
							}
						}
						g.content.y = n
					}
				}
			}
			u && u(h)
		},
		stageContainer.mousemove = function(a) {
			ignoreMouseEvents || stageContainer.touchmove(a)
		},
		attachUpHandler(stageContainer,
			function(a) {
				b && (!g.moved && g.callback && g.callback(), g.callback = null, g.clean())
			}),
		window.onmousewheel = function(a) {
			var l = window.event || a,
				h = l.detail ? -10 * l.detail : l.wheelDelta;
			g.content.y += h;
			var o = (g.scrollWidth - Math.max(g.content.width / g.content.ratio, g.scrollWidth), g.scrollHeight - Math.max(g.content.height / g.content.ratio, g.scrollHeight));
			g.content.y >= 0 ? g.content.y = 0 : g.content.y < o && (g.content.y = o),
				window.dirty = !0
		},
		window.addEventListener("DOMMouseScroll", window.onmousewheel),
		this.clean = function() {
			p = null;
			var a = g.scrollWidth - Math.max(g.content.width / g.content.ratio, g.scrollWidth),
				h = g.scrollHeight - Math.max(g.content.height / g.content.ratio, g.scrollHeight);
			g.content.x >= 0 ? new Tween(g.content, {
						x: 0
					},
					0.2) : g.content.x < a && new Tween(g.content, {
						x: a
					},
					0.2),
				g.content.y >= 0 ? new Tween(g.content, {
						y: 0
					},
					0.2) : g.content.y < h ? new Tween(g.content, {
						y: h
					},
					0.2) : (new Date).getTime() - f < 250 && Math.abs(k) > 5 && new Tween(g.content, {
						y: Math.max(Math.min(g.content.y + 20 * k, 0), h)
					},
					0.4),
				k = 0,
				b = null,
				g.moved = !1
		}
};
ScrollContainer.prototype = Object.create(Container.prototype),
	ScrollContainer.prototype.constructor = ScrollContainer,
	stageContainer.setBackgroundColor(2105376),
	marginBottom = 15;
var Config = {
	id: "hex",
	domain: "",
	facebookAppId: "883249178389083",
	facebookLikeUrl: "",
	parseId: "WSbpkS8PrSklteMXGKsUxk3QUYUrGJioM6VTxR84",
	parseKey: "z9qCUrq7mVJXOBz8v2j7yMxTVRwRTJYrqVn0rT8U",
	adMobInterstitialIdiOS: "ca-app-pub-6389174903462367/4068307733",
	adMobBannerIdiOS: "ca-app-pub-6389174903462367/5545040939",
	adMobInterstitialIdAndroid: "ca-app-pub-6389174903462367/8498507333",
	adMobBannerIdAndroid: "ca-app-pub-6389174903462367/9975240532",
	shareUrl: "",
	shareText: "I think you will like Hex FRVR",
	shareTitle: "Hex FRVR",
	shortTitle: "Hex",
	feedbackURL: "",
	iOSReviewURL: "",
	androidReviewURL: "",
	androidInstallBannerURL: "",
	androidInstallURL: "",
	iOSInstallBannerURL: "",
	iOSInstallURL: ""
};
preload(preloader);
/* ============================================================================
   TATRAPART — LOGIKA STRONY
   ----------------------------------------------------------------------------
   Zawiera: tlumaczenia, nagłowek, menu pelnoekranowe, przelacznik jezyka,
   animacje wejscia, paralaksa, karuzele, lightbox galerii, zakladki,
   generowanie tresci z konfiguracji, obsluga rezerwacji i formularzy.
   ========================================================================== */
(function () {
  'use strict';

  var CFG  = window.TATRAPART_CONFIG || {};
  var DICT = window.TATRAPART_I18N   || {};
  var STORAGE_KEY = 'tatrapart.lang';

  /* ====================================================== NARZEDZIA */
  function $(sel, ctx)  { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls)  n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); }
    catch (e) { return null; }
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====================================================== IKONY (SVG) */
  var ICON = {
    arrowRight: '<svg class="arrow" width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden="true"><path d="M0 4h20M17 1l3.2 3L17 7" stroke="currentColor" stroke-width="1" fill="none"/></svg>',
    chevLeft:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2 4 8l6 6" stroke="currentColor" stroke-width="1.1"/></svg>',
    chevRight:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.1"/></svg>',
    chevDown:   '<svg class="lang__chev" width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true"><path d="M1 1.5 5 5.5l4-4" stroke="currentColor" stroke-width="1.1"/></svg>',
    check:      '<svg class="ico" width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true"><path d="M1 5.2 4.4 8.6 12 1" stroke="currentColor" stroke-width="1.2"/></svg>',
    close:      '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M1 1l13 13M14 1L1 14" stroke="currentColor" stroke-width="1.1"/></svg>',
    zoom:       '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7.4" stroke="currentColor" stroke-width="1.1"/><path d="M16.4 16.4 24 24M11 8v6M8 11h6" stroke="currentColor" stroke-width="1.1"/></svg>',
    guests:     '<svg class="ico" width="15" height="13" viewBox="0 0 15 13" fill="none" aria-hidden="true"><circle cx="5" cy="4" r="2.6" stroke="currentColor" stroke-width="1"/><path d="M1 12c0-2.2 1.8-3.6 4-3.6S9 9.8 9 12" stroke="currentColor" stroke-width="1"/><circle cx="11.4" cy="4.6" r="2" stroke="currentColor" stroke-width="1"/><path d="M10 8.8c2.2-.3 4 .9 4 3.2" stroke="currentColor" stroke-width="1"/></svg>',
    bed:        '<svg class="ico" width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true"><path d="M1 11V1M1 6h14v5M15 11V6M4 4.6h3.4" stroke="currentColor" stroke-width="1"/></svg>',
    bath:       '<svg class="ico" width="15" height="13" viewBox="0 0 15 13" fill="none" aria-hidden="true"><path d="M1 6.6h13v1.6a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6.6ZM3.4 6.6V2.6a1.6 1.6 0 0 1 3.2 0" stroke="currentColor" stroke-width="1"/></svg>',
    area:       '<svg class="ico" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1h12v12H1zM1 5h4V1M13 9H9v4" stroke="currentColor" stroke-width="1"/></svg>',
    pin:        '<svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true"><path d="M6.5 15S12 9.9 12 6.2A5.5 5.5 0 0 0 1 6.2C1 9.9 6.5 15 6.5 15Z" stroke="currentColor" stroke-width="1"/><circle cx="6.5" cy="6.2" r="2" stroke="currentColor" stroke-width="1"/></svg>',
    mountain:   '<svg width="52" height="34" viewBox="0 0 52 34" fill="none" aria-hidden="true"><path d="M1 32 19 6l10 14 5-7 16 19H1Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/><path d="m14 14 6 5-8 4" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/></svg>'
  };

  /* ====================================================== 1. TLUMACZENIA */
  var I18N = {
    lang: CFG.defaultLanguage || 'pl',

    detect: function () {
      var qs = new URLSearchParams(window.location.search).get('lang');
      if (qs && DICT[qs]) return qs;
      var saved = store(STORAGE_KEY);
      if (saved && DICT[saved]) return saved;
      return CFG.defaultLanguage || 'pl';
    },

    t: function (key, fallbackLang) {
      var pack = DICT[this.lang] || {};
      if (pack[key] != null) return pack[key];
      var base = DICT[fallbackLang || CFG.defaultLanguage || 'pl'] || {};
      return base[key] != null ? base[key] : key;
    },

    apply: function () {
      var self = this;

      $$('[data-i18n]').forEach(function (node) {
        node.textContent = self.t(node.getAttribute('data-i18n'));
      });

      $$('[data-i18n-html]').forEach(function (node) {
        node.innerHTML = self.t(node.getAttribute('data-i18n-html'));
      });

      // data-i18n-attr="placeholder:nl.email|aria-label:common.close"
      $$('[data-i18n-attr]').forEach(function (node) {
        node.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
          var bits = pair.split(':');
          if (bits.length === 2) node.setAttribute(bits[0].trim(), self.t(bits[1].trim()));
        });
      });

      // Elementy, ktore znikaja gdy tlumaczenie jest puste
      // (np. informacja o jezyku regulaminu — niepotrzebna w wersji polskiej)
      $$('[data-hide-if-empty]').forEach(function (node) {
        node.style.display = node.textContent.trim() ? '' : 'none';
      });

      // Tytul i opis strony
      var titleKey = document.body.getAttribute('data-title-key') || 'meta.title';
      document.title = this.t(titleKey);
      var desc = $('meta[name="description"]');
      if (desc) desc.setAttribute('content', this.t('meta.description'));

      // Atrybut lang + kierunek
      document.documentElement.setAttribute('lang', this.lang);

      // Odswiez etykiete przelacznika
      var short = (CFG.languages || []).filter(function (l) { return l.code === self.lang; })[0];
      $$('[data-lang-current]').forEach(function (n) { n.textContent = short ? short.short : self.lang.toUpperCase(); });
      $$('.lang__item').forEach(function (n) {
        n.setAttribute('aria-current', n.getAttribute('data-lang') === self.lang ? 'true' : 'false');
      });

      document.dispatchEvent(new CustomEvent('tatrapart:langchange', { detail: { lang: this.lang } }));
    },

    set: function (lang) {
      if (!DICT[lang]) return;
      this.lang = lang;
      store(STORAGE_KEY, lang);
      var url = new URL(window.location.href);
      if (lang === (CFG.defaultLanguage || 'pl')) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
      this.apply();
    },

    init: function () {
      this.lang = this.detect();
      store(STORAGE_KEY, this.lang);
    }
  };
  window.TatrapartI18N = I18N;

  /* ====================================================== 2. OBRAZY */
  // Gdy zdjecie nie zostalo jeszcze wgrane, pokazujemy elegancki placeholder
  // w kolorach Milk & Oak zamiast zlamanej ikony.
  // Zastepczy znak graficzny uzywany, dopoki nie zostanie wgrane logo w PNG.
  var LOGO_FALLBACK = 'assets/images/logo-fallback.svg';

  function imgFallback(root) {
    $$('img', root || document).forEach(function (img) {
      if (img.dataset.fbBound) return;
      img.dataset.fbBound = '1';

      // Logo ma wlasny zamiennik — nie pokazujemy przy nim szarego pola.
      if (img.hasAttribute('data-logo')) {
        var swap = function () {
          if (img.getAttribute('src') !== LOGO_FALLBACK) img.setAttribute('src', LOGO_FALLBACK);
        };
        img.addEventListener('error', swap);
        // Blad mogl wystapic, zanim skrypt sie wykonal.
        if (img.complete && img.naturalWidth === 0) swap();
        return;
      }

      var mark = function () {
        img.classList.add('is-missing');
        var host = img.closest('.media-card__frame, .gallery-item, .apt-row__media, .hero__media, .offer__media, .full-bleed, .lightbox__stage') || img.parentElement;
        if (host) {
          host.classList.add('img-ph');
          var name = (img.getAttribute('src') || '').split('/').pop();
          if (!host.getAttribute('data-ph')) host.setAttribute('data-ph', name || 'Tatrapart');
        }
      };
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) mark();
      img.addEventListener('error', mark);
    });
  }

  function galleryList() {
    var out = [];
    var n = CFG.galleryCount || 17;
    for (var i = 1; i <= n; i++) {
      var num = i < 10 ? '0' + i : '' + i;
      out.push((CFG.galleryPath || 'assets/images/') + (CFG.galleryPrefix || 'gallery-') + num + (CFG.galleryExt || '.jpg'));
    }
    return out;
  }
  function imgPath(file) { return (CFG.galleryPath || 'assets/images/') + file; }

  /* ====================================================== 3. REZERWACJA */
  function buildBookingUrl(unitId) {
    var b = CFG.booking || {};
    if (!b.enabled || !b.bookingUrl || b.bookingUrl.charAt(0) === '#') {
      return 'kontakt.html#rezerwacja';
    }
    var url;
    try { url = new URL(b.bookingUrl, window.location.href); }
    catch (e) { return b.bookingUrl; }

    if (b.objectId) url.searchParams.set('id', b.objectId);
    if (b.langParam) url.searchParams.set(b.langParam, (b.langMap && b.langMap[I18N.lang]) || I18N.lang);
    if (unitId && b.unitParam) url.searchParams.set(b.unitParam, unitId);
    return url.toString();
  }

  function wireBooking() {
    var live = !!(CFG.booking && CFG.booking.enabled);
    $$('[data-book]').forEach(function (a) {
      var unit = a.getAttribute('data-book') || '';
      a.setAttribute('href', buildBookingUrl(unit));
      if (live && CFG.booking.openInNewTab) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      } else {
        a.removeAttribute('target');
      }
    });
  }
  document.addEventListener('tatrapart:langchange', wireBooking);

  /* ====================================================== 4. NAGLOWEK */
  function initHeader() {
    var header = $('.header');
    if (!header) return;
    var hero = $('.hero');
    var last = window.scrollY;

    function update() {
      var y = window.scrollY;
      var threshold = hero ? Math.max(120, hero.offsetHeight * 0.65) : 80;

      if (y > threshold) {
        header.classList.add('header--solid');
        header.classList.remove('header--transparent');
      } else {
        header.classList.remove('header--solid');
        if (hero) header.classList.add('header--transparent');
      }

      // Chowanie przy przewijaniu w dol (tylko gdy menu zamkniete)
      if (!document.body.classList.contains('is-locked')) {
        if (y > last && y > 460) header.classList.add('header--hidden');
        else header.classList.remove('header--hidden');
      }
      last = y;
    }

    if (hero) header.classList.add('header--transparent');
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ====================================================== 5. MENU */
  function initNav() {
    var toggle  = $('.nav-toggle');
    var overlay = $('.overlay-nav');
    if (!toggle || !overlay) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      var first = $('a, button', overlay);
      if (first) setTimeout(function () { first.focus(); }, 320);
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    }

    toggle.addEventListener('click', function () {
      overlay.classList.contains('is-open') ? close() : open();
    });

    $$('a', overlay).forEach(function (a) { a.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
      if (e.key === 'Tab' && overlay.classList.contains('is-open')) {
        var items = $$('a[href], button:not([disabled])', overlay).filter(function (n) { return n.offsetParent !== null; });
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ====================================================== 6. JEZYK */
  function initLang() {
    $$('.lang').forEach(function (wrap) {
      var btn  = $('.lang__btn', wrap);
      var menu = $('.lang__menu', wrap);
      if (!btn || !menu) return;

      // Wypelnij liste jezykow
      if (!menu.children.length) {
        (CFG.languages || []).forEach(function (l) {
          var item = el('button', 'lang__item');
          item.type = 'button';
          item.setAttribute('data-lang', l.code);
          item.innerHTML = '<span>' + esc(l.label) + '</span><span class="code">' + esc(l.short) + '</span>';
          item.addEventListener('click', function () {
            I18N.set(l.code);
            closeMenu();
          });
          menu.appendChild(item);
        });
      }

      function openMenu()  { menu.classList.add('is-open');    btn.setAttribute('aria-expanded', 'true'); }
      function closeMenu() { menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.contains('is-open') ? closeMenu() : openMenu();
      });
      document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) closeMenu(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    });
  }

  /* ====================================================== 7. ANIMACJE */
  function initReveal() {
    var nodes = $$('[data-reveal]');
    if (!nodes.length) return;

    function show(node) {
      if (node.classList.contains('is-in')) return;
      var delay = node.getAttribute('data-delay');
      if (delay) node.style.setProperty('--d', delay + 'ms');
      node.classList.add('is-in');
    }

    if (reduceMotion) {
      nodes.forEach(show);
      return;
    }

    // Obserwator — sciezka podstawowa.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      nodes.forEach(function (n) { io.observe(n); });
    }

    // Siatka bezpieczenstwa: samodzielne sprawdzanie pozycji elementow.
    // Chroni przed sytuacja, w ktorej obserwator nie zadziala i tresc
    // zostalaby niewidoczna — dla strony rezerwacyjnej to bylby powazny blad.
    var pending = nodes.slice();
    function sweep() {
      if (!pending.length) return;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (n) {
        if (n.classList.contains('is-in')) return false;
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) { show(n); return false; }
        return true;
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { sweep(); ticking = false; });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', sweep);
    sweep();
    setTimeout(sweep, 400);
  }

  function initParallax() {
    var nodes = $$('[data-parallax]');
    if (!nodes.length || reduceMotion) return;
    var ticking = false;

    function frame() {
      var vh = window.innerHeight;
      nodes.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var strength = parseFloat(n.getAttribute('data-parallax')) || 0.12;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;
        n.style.transform = 'translate3d(0,' + (progress * strength * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
    }, { passive: true });
    frame();
  }

  /* ====================================================== 8. KARUZELE */
  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      var viewport = $('.carousel__viewport', root);
      var track    = $('.carousel__track', root);
      if (!viewport || !track) return;

      var prev = $('[data-carousel-prev]', root);
      var next = $('[data-carousel-next]', root);
      var bar  = $('.carousel__progress span', root);
      var cnt  = $('.carousel__count', root);
      var nav  = $('.carousel__nav', root);

      var index = 0;

      function slides()   { return $$('.carousel__slide', track); }
      function step() {
        var s = slides();
        if (!s.length) return 1;
        var gap = parseFloat(getComputedStyle(track).gap) || 0;
        return s[0].getBoundingClientRect().width + gap;
      }
      function railWidth() {
        // Viewport ma ujemne marginesy i wewnetrzny padding (efekt wyjscia poza
        // siatke), wiec szerokosc liczymy z samej sciezki, nie z viewportu.
        return track.getBoundingClientRect().width || viewport.clientWidth;
      }
      function perView() {
        var s = slides();
        if (!s.length) return 1;
        return Math.max(1, Math.round(railWidth() / step()));
      }
      function maxIndex() { return Math.max(0, slides().length - perView()); }

      function render(animate) {
        index = Math.min(Math.max(index, 0), maxIndex());

        // Gdy wszystkie slajdy mieszcza sie na ekranie, sterowanie karuzela
        // jest zbedne — chowamy je, zamiast pokazywac nieaktywne strzalki.
        if (nav) nav.style.display = maxIndex() > 0 ? '' : 'none';
        track.classList.toggle('no-anim', animate === false);
        track.style.transform = 'translate3d(' + (-index * step()) + 'px,0,0)';
        if (animate === false) requestAnimationFrame(function () { track.classList.remove('no-anim'); });

        if (prev) prev.disabled = index <= 0;
        if (next) next.disabled = index >= maxIndex();

        var total = slides().length;
        if (bar && total) {
          var w = Math.min(100, (perView() / total) * 100);
          bar.style.width = w + '%';
          var travel = maxIndex() ? (index / maxIndex()) * (100 - w) : 0;
          bar.style.transform = 'translateX(' + (travel / (w / 100)) + '%)';
        }
        if (cnt) {
          cnt.textContent = (index + 1) + ' ' + I18N.t('common.of') + ' ' + Math.max(1, maxIndex() + 1);
        }
      }

      if (prev) prev.addEventListener('click', function () { index--; render(); });
      if (next) next.addEventListener('click', function () { index++; render(); });

      // Klawiatura
      viewport.setAttribute('tabindex', '0');
      viewport.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); index--; render(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); index++; render(); }
      });

      // Przeciaganie / swipe
      var down = false, startX = 0, startIdx = 0, moved = 0;
      viewport.addEventListener('pointerdown', function (e) {
        if (e.button !== undefined && e.button !== 0) return;
        down = true; startX = e.clientX; startIdx = index; moved = 0;
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture && viewport.setPointerCapture(e.pointerId);
      });
      viewport.addEventListener('pointermove', function (e) {
        if (!down) return;
        moved = e.clientX - startX;
        track.classList.add('no-anim');
        track.style.transform = 'translate3d(' + (-startIdx * step() + moved) + 'px,0,0)';
      });
      function release() {
        if (!down) return;
        down = false;
        viewport.classList.remove('is-dragging');
        track.classList.remove('no-anim');
        var jump = Math.round(-moved / step());
        if (Math.abs(moved) > 46) index = startIdx + (jump || (moved < 0 ? 1 : -1));
        else index = startIdx;
        render();
      }
      viewport.addEventListener('pointerup', release);
      viewport.addEventListener('pointercancel', release);
      viewport.addEventListener('pointerleave', release);
      viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () { render(false); }, 140);
      });
      document.addEventListener('tatrapart:langchange', function () { render(false); });

      root._render = render;
      render(false);
    });
  }

  /* ====================================================== 9. LIGHTBOX */
  var Lightbox = {
    node: null, items: [], index: 0, lastFocus: null,

    build: function () {
      if (this.node) return;
      var n = el('div', 'lightbox');
      n.setAttribute('role', 'dialog');
      n.setAttribute('aria-modal', 'true');
      n.setAttribute('aria-hidden', 'true');
      n.innerHTML =
        '<div class="lightbox__bar">' +
          '<span class="lightbox__counter"></span>' +
          '<button type="button" class="lightbox__close"><span data-i18n="common.close">Zamknij</span>' + ICON.close + '</button>' +
        '</div>' +
        '<div class="lightbox__stage">' +
          '<button type="button" class="lightbox__arrow lightbox__arrow--prev" data-i18n-attr="aria-label:common.prev">' + ICON.chevLeft + '</button>' +
          '<img class="lightbox__img" alt="">' +
          '<button type="button" class="lightbox__arrow lightbox__arrow--next" data-i18n-attr="aria-label:common.next">' + ICON.chevRight + '</button>' +
        '</div>' +
        '<div class="lightbox__thumbs"></div>';
      document.body.appendChild(n);
      this.node = n;

      var self = this;
      $('.lightbox__close', n).addEventListener('click', function () { self.close(); });
      $('.lightbox__arrow--prev', n).addEventListener('click', function () { self.go(-1); });
      $('.lightbox__arrow--next', n).addEventListener('click', function () { self.go(1); });
      n.addEventListener('click', function (e) { if (e.target === n || e.target.classList.contains('lightbox__stage')) self.close(); });

      document.addEventListener('keydown', function (e) {
        if (!n.classList.contains('is-open')) return;
        if (e.key === 'Escape')     self.close();
        if (e.key === 'ArrowLeft')  self.go(-1);
        if (e.key === 'ArrowRight') self.go(1);
      });

      // Swipe
      var sx = null;
      var stage = $('.lightbox__stage', n);
      stage.addEventListener('pointerdown', function (e) { sx = e.clientX; });
      stage.addEventListener('pointerup', function (e) {
        if (sx === null) return;
        var d = e.clientX - sx; sx = null;
        if (Math.abs(d) > 50) self.go(d < 0 ? 1 : -1);
      });
    },

    open: function (items, index) {
      this.build();
      this.items = items;
      this.index = index || 0;
      this.lastFocus = document.activeElement;

      var thumbs = $('.lightbox__thumbs', this.node);
      thumbs.innerHTML = '';
      var self = this;
      items.forEach(function (src, i) {
        var t = el('button', 'lightbox__thumb');
        t.type = 'button';
        t.innerHTML = '<img src="' + esc(src) + '" alt="" loading="lazy">';
        t.addEventListener('click', function () { self.show(i); });
        thumbs.appendChild(t);
      });

      this.node.classList.add('is-open');
      this.node.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      I18N.apply();
      this.show(this.index);
      $('.lightbox__close', this.node).focus();
    },

    show: function (i) {
      var total = this.items.length;
      this.index = (i + total) % total;
      var img = $('.lightbox__img', this.node);
      img.classList.remove('is-ready');
      var src = this.items[this.index];
      var loader = new Image();
      loader.onload = loader.onerror = function () {
        img.src = src;
        requestAnimationFrame(function () { img.classList.add('is-ready'); });
      };
      loader.src = src;

      $('.lightbox__counter', this.node).textContent = (this.index + 1) + ' ' + I18N.t('common.of') + ' ' + total;
      $$('.lightbox__thumb', this.node).forEach(function (t, ti) {
        t.classList.toggle('is-active', ti === this.index);
        if (ti === this.index) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      }, this);
      imgFallback(this.node);
    },

    go: function (d) { this.show(this.index + d); },

    close: function () {
      if (!this.node) return;
      this.node.classList.remove('is-open');
      this.node.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (this.lastFocus) this.lastFocus.focus();
    }
  };

  function initLightboxTriggers() {
    var all = galleryList();
    $$('[data-lightbox]').forEach(function (node) {
      if (node.dataset.lbBound) return;
      node.dataset.lbBound = '1';
      node.addEventListener('click', function (e) {
        e.preventDefault();
        var set = node.getAttribute('data-lightbox-set');
        var items = set ? set.split(',').map(function (s) { return imgPath(s.trim()); }) : all;
        var idx = parseInt(node.getAttribute('data-lightbox'), 10);
        Lightbox.open(items, isNaN(idx) ? 0 : idx);
      });
    });
  }

  /* ====================================================== 10. PASEK MOBILNY */
  function initBookBar() {
    var bar = $('.book-bar');
    if (!bar) return;
    var hero = $('.hero');
    function update() {
      var trigger = hero ? hero.offsetHeight * 0.8 : 520;
      var atBottom = (window.innerHeight + window.scrollY) > (document.body.offsetHeight - 220);
      bar.classList.toggle('is-visible', window.scrollY > trigger && !atBottom);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ====================================================== 11. FORMULARZE */
  function initForms() {
    $$('form[data-validate]').forEach(function (form) {
      form.setAttribute('novalidate', 'novalidate');

      function fail(field, key) {
        field.classList.add('has-error');
        var box = $('.field__error', field);
        if (box) box.textContent = I18N.t(key);
      }
      function clear(field) { field.classList.remove('has-error'); }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;

        $$('.field', form).forEach(function (field) {
          var input = $('input, textarea, select', field);
          if (!input) return;
          clear(field);
          var val = (input.value || '').trim();

          if (input.required && !val) { fail(field, 'err.required'); ok = false; return; }
          if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(val)) {
            fail(field, 'err.email'); ok = false;
          }
        });

        var consent = $('.consent input[type="checkbox"]', form);
        var consentBox = $('.consent', form);
        if (consent && consent.required && !consent.checked) {
          ok = false;
          if (consentBox) {
            consentBox.style.color = '#A3402F';
            setTimeout(function () { consentBox.style.color = ''; }, 2600);
          }
        }

        if (!ok) {
          var firstBad = $('.field.has-error input, .field.has-error textarea', form);
          if (firstBad) firstBad.focus();
          return;
        }

        // Brak backendu — po podpieciu formularza wstaw tu wywolanie API.
        var box = $('.form-success', form);
        if (box) {
          box.textContent = I18N.t(form.getAttribute('data-success-key') || 'nl.success');
          box.classList.add('is-visible');
        }
        form.reset();
      });

      $$('input, textarea', form).forEach(function (i) {
        i.addEventListener('input', function () {
          var f = i.closest('.field');
          if (f) clear(f);
        });
      });
    });
  }

  /* ====================================================== 12. TRESCI Z KONFIGURACJI */

  // Ramka zdjecia apartamentu. Gdy nie ma jeszcze pliku, zwracamy pusta
  // ramke w kolorach Milk & Oak zamiast zlamanego obrazka.
  function aptFrame(apt, modifier) {
    var cls = 'media-card__frame ' + (modifier || '');
    if (!apt.img) {
      return '<span class="' + cls + ' frame-empty">' +
               '<span class="frame-empty__mark">' + ICON.mountain + '</span>' +
               '<span class="frame-empty__label" data-i18n="common.photoSoon"></span>' +
             '</span>';
    }
    return '<span class="' + cls + '"><img src="' + esc(imgPath(apt.img)) + '" alt="" loading="lazy"></span>';
  }

  function priceTag(apt) {
    if (!CFG.showPrices || !apt.priceFrom) return '';
    return '<p class="price-tag">' +
             '<span data-i18n="common.from"></span> ' +
             '<b>' + esc(apt.priceFrom) + ' ' + esc(CFG.currency || 'zł') + '</b> ' +
             '<span data-i18n="common.perNight"></span>' +
           '</p>';
  }

  function renderApartmentCards(mount, variant) {
    if (!mount) return;
    mount.innerHTML = '';
    (CFG.apartments || []).forEach(function (apt, i) {
      var slide = el('div', variant === 'carousel' ? 'carousel__slide' : '');
      slide.innerHTML =
        '<article class="media-card" data-reveal data-delay="' + (i * 90) + '">' +
          '<a href="apartamenty.html#' + esc(apt.id) + '" class="media-card__link">' +
            aptFrame(apt, 'media-card__frame--tall') +
          '</a>' +
          '<div class="media-card__body">' +
            '<p class="media-card__meta">' +
              '<span data-i18n="' + esc(apt.typeKey) + '"></span> · ' +
              '<span data-i18n="' + esc(apt.floorKey) + '"></span>' +
            '</p>' +
            '<h3 class="media-card__title" data-i18n="' + esc(apt.i18nKey) + '.name"></h3>' +
            '<p class="media-card__facts">' +
              esc(apt.guests) + '&nbsp;<span data-i18n="spec.guests"></span>' +
              ' · ' + esc(apt.area) + '&nbsp;m&sup2;' +
            '</p>' +
            priceTag(apt) +
            '<a class="link-arrow media-card__cta" href="apartamenty.html#' + esc(apt.id) + '">' +
              '<span data-i18n="common.explore"></span>' + ICON.arrowRight +
            '</a>' +
          '</div>' +
        '</article>';
      mount.appendChild(slide);
    });
  }

  function renderApartmentRows(mount) {
    if (!mount) return;
    mount.innerHTML = '';

    (CFG.apartments || []).forEach(function (apt) {
      var row = el('article', 'apt-row');
      row.id = apt.id;

      var specs =
        '<li>' + ICON.guests + '<span>' + esc(apt.guests) + '&nbsp;</span><span data-i18n="spec.guests"></span></li>' +
        '<li>' + ICON.bed    + '<span>' + esc(apt.bedrooms) + '&nbsp;</span><span data-i18n="spec.bedrooms"></span></li>' +
        '<li>' + ICON.bath   + '<span>' + esc(apt.bathrooms) + '&nbsp;</span><span data-i18n="spec.bathrooms"></span></li>' +
        '<li>' + ICON.area   + '<span class="nocaps">' + esc(apt.area) + '&nbsp;m&sup2;</span></li>';

      var tags = (apt.features || []).map(function (f) {
        return '<li class="tag" data-i18n="feat.' + esc(f) + '"></li>';
      }).join('');

      // Warianty Brown / White
      var variants = (apt.variants || []).map(function (v) {
        return '<div class="variant">' +
                 '<h4 class="variant__name" data-i18n="variant.' + esc(v) + '"></h4>' +
                 '<p class="variant__text" data-i18n="' + esc(apt.i18nKey) + '.' + esc(v) + '"></p>' +
               '</div>';
      }).join('');

      var variantBlock = variants
        ? '<div class="variants" data-reveal>' +
            '<h3 class="eyebrow" data-i18n="variant.title"></h3>' +
            '<div class="variants__grid">' + variants + '</div>' +
          '</div>'
        : '';

      row.innerHTML =
        '<div class="apt-row__grid">' +
          '<div class="apt-row__media" data-reveal="mask">' + aptFrame(apt, 'apt-row__frame') + '</div>' +
          '<div data-reveal>' +
            '<p class="media-card__meta">' +
              '<span data-i18n="' + esc(apt.typeKey) + '"></span> · ' +
              '<span data-i18n="' + esc(apt.floorKey) + '"></span>' +
            '</p>' +
            '<h2 class="h3" data-i18n="' + esc(apt.i18nKey) + '.name"></h2>' +
            '<ul class="apt-specs">' + specs + '</ul>' +
            priceTag(apt) +
            '<p class="body-text measure" data-i18n="' + esc(apt.i18nKey) + '.desc"></p>' +
            '<p class="body-text measure" data-i18n="' + esc(apt.i18nKey) + '.desc2"></p>' +
            '<ul class="tag-list" style="margin-top:28px">' + tags + '</ul>' +
            '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
              '<a class="btn" data-book="' + esc(apt.id) + '"><span data-i18n="common.checkAvail"></span></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        variantBlock;

      mount.appendChild(row);
    });
  }

  function renderNearby(mount) {
    if (!mount) return;
    var withImages = !!CFG.nearbyImages;
    mount.innerHTML = '';

    (CFG.nearby || []).forEach(function (item, i) {
      var slide = el('div', 'carousel__slide');
      var num = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);

      var media = (withImages && item.img)
        ? '<div class="media-card__frame media-card__frame--wide">' +
            '<img src="' + esc(imgPath(item.img)) + '" alt="" loading="lazy">' +
          '</div>'
        : '';

      slide.innerHTML =
        '<article class="media-card' + (withImages ? '' : ' media-card--text') + '" ' +
                 'data-reveal data-delay="' + (i * 70) + '">' +
          media +
          '<div class="media-card__body">' +
            (withImages ? '' : '<span class="media-card__index">' + num + '</span>') +
            '<h3 class="media-card__title" data-i18n="' + esc(item.i18nKey) + '.name"></h3>' +
            '<p class="media-card__text" data-i18n="' + esc(item.i18nKey) + '.desc"></p>' +
          '</div>' +
        '</article>';
      mount.appendChild(slide);
    });
  }

  function renderDistances(mount) {
    if (!mount) return;
    mount.innerHTML = '';
    (CFG.distances || []).forEach(function (d) {
      var li = el('li');
      li.innerHTML =
        '<span class="place" data-i18n="' + esc(d.i18nKey) + '"></span>' +
        '<span class="val"><b>' + esc(d.value) + '</b> · ' + esc(d.time) + '</span>';
      mount.appendChild(li);
    });
  }

  function renderGalleryGrid(mount) {
    if (!mount) return;
    mount.innerHTML = '';
    galleryList().forEach(function (src, i) {
      var a = el('a', 'gallery-item');
      a.href = '#';
      a.setAttribute('data-lightbox', i);
      a.setAttribute('data-reveal', 'fade');
      a.setAttribute('data-delay', (i % 8) * 60);
      a.innerHTML = '<img src="' + esc(src) + '" alt="" loading="lazy">' +
                    '<span class="gallery-item__zoom">' + ICON.zoom + '</span>';
      mount.appendChild(a);
    });
  }

  // Jedna lista uslug — „W cenie pobytu". Zakladka „Na zyczenie" zostala
  // usunieta razem z jej trescia.
  function renderServiceLists() {
    var inc = $('[data-services="included"]');
    if (!inc) return;
    inc.innerHTML = '';
    for (var i = 1; i <= 9; i++) {
      inc.appendChild(el('li', '', ICON.check + '<span data-i18n="serv.inc.' + i + '"></span>'));
    }
  }

  function renderReviews(mount) {
    var section = $('[data-section="reviews"]');
    if (!mount || !section) return;
    if (!CFG.showReviews) { section.style.display = 'none'; return; }
    mount.innerHTML = '';
    (CFG.reviews || []).forEach(function (r) {
      var slide = el('div', 'carousel__slide');
      slide.innerHTML =
        '<blockquote class="quote" data-reveal style="padding:0 12px">' +
          '<span class="quote__mark">&ldquo;</span>' +
          '<p class="quote__text" data-i18n="' + esc(r.i18nKey) + '"></p>' +
          '<footer class="quote__author">' + esc(r.author || '') + (r.source ? ' · ' + esc(r.source) : '') + '</footer>' +
        '</blockquote>';
      mount.appendChild(slide);
    });
  }

  function renderFacts(mount) {
    if (!mount) return;
    var apts = CFG.apartments || [], stay = CFG.stay || {};

    // Kazdy typ apartamentu wystepuje w kilku wariantach (Brown / White),
    // wiec liczba apartamentow i miejsc to suma po wariantach.
    var units = 0, beds = 0, minA = Infinity, maxA = 0;
    apts.forEach(function (a) {
      var n = (a.variants && a.variants.length) || 1;
      units += n;
      beds  += (a.guests || 0) * n;
      if (a.area) { minA = Math.min(minA, a.area); maxA = Math.max(maxA, a.area); }
    });
    var area = (isFinite(minA) && maxA) ? (minA + '–' + maxA) : '—';

    mount.innerHTML =
      '<div><p class="k">' + units + '</p><p class="v" data-i18n="facts.apartments"></p></div>' +
      '<div><p class="k">' + beds + '</p><p class="v" data-i18n="facts.guests"></p></div>' +
      '<div><p class="k">' + area + '</p><p class="v" data-i18n="facts.areaM2"></p></div>' +
      '<div><p class="k">' + esc(stay.checkInFrom || '16:00') + '</p><p class="v" data-i18n="facts.checkIn"></p></div>';
  }

  function renderContactBits() {
    var c = CFG.company || {}, s = CFG.social || {}, stay = CFG.stay || {}, lg = CFG.legal || {};

    $$('[data-cfg]').forEach(function (n) {
      var key = n.getAttribute('data-cfg');
      var map = {
        'phone':        c.phone,
        'email':        c.email,
        'reservations': c.reservationsEmail,
        'street':       c.street,
        'city':         (c.postalCode || '') + ' ' + (c.city || ''),
        'country':      c.country,
        'name':         c.name,
        'legalName':    c.legalNameDisplay || c.legalName,
        'nip':          c.nip,
        'regon':        c.regon,
        'checkin':      stay.checkInFrom,
        'checkout':     stay.checkOutUntil,
        'year':         new Date().getFullYear()
      };
      if (map[key] != null) n.textContent = map[key];
    });

    $$('[data-cfg-href]').forEach(function (n) {
      var key = n.getAttribute('data-cfg-href');
      var map = {
        'phone':        c.phoneHref ? 'tel:' + c.phoneHref : '',
        'email':        c.email ? 'mailto:' + c.email : '',
        'reservations': c.reservationsEmail ? 'mailto:' + c.reservationsEmail : '',
        'maps':         c.mapsUrl || '',
        'instagram':    s.instagram || '',
        'facebook':     s.facebook || '',
        'privacy':      lg.privacyUrl || ''
      };
      var href = map[key];
      if (href) {
        n.setAttribute('href', href);
      } else {
        // Brak adresu w konfiguracji — chowamy odnosnik zamiast prowadzic donikad.
        var li = n.closest('li');
        (li || n).style.display = 'none';
      }
    });

    $$('[data-map-embed]').forEach(function (n) {
      if (n.querySelector('iframe')) return;
      var lat = c.latitude, lon = c.longitude, d = 0.012;
      var bbox = (lon - d) + ',' + (lat - d * 0.7) + ',' + (lon + d) + ',' + (lat + d * 0.7);
      var f = el('iframe');
      f.setAttribute('loading', 'lazy');
      f.setAttribute('title', I18N.t('loc.mapTitle'));
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      f.src = 'https://www.openstreetmap.org/export/embed.html?bbox=' + bbox + '&layer=mapnik&marker=' + lat + ',' + lon;
      n.appendChild(f);
    });

    $$('[data-logo]').forEach(function (img) {
      if (!img.getAttribute('src')) img.setAttribute('src', CFG.logo || 'assets/images/logo-tatrapart.png');
    });
  }

  function renderStructuredData() {
    var c = CFG.company || {};
    var data = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: c.name,
      description: I18N.t('meta.description'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.street,
        postalCode: c.postalCode,
        addressLocality: c.city,
        addressRegion: c.region,
        addressCountry: c.countryCode
      },
      geo: { '@type': 'GeoCoordinates', latitude: c.latitude, longitude: c.longitude },
      telephone: c.phone,
      email: c.email,
      numberOfRooms: (CFG.apartments || []).length,
      checkinTime: (CFG.stay || {}).checkInFrom,
      checkoutTime: (CFG.stay || {}).checkOutUntil
    };
    var tag = $('#ld-json') || el('script');
    tag.id = 'ld-json';
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(data);
    if (!tag.parentNode) document.head.appendChild(tag);
  }

  /* ====================================================== 13. START */
  function boot() {
    I18N.init();

    // Tresci generowane
    renderApartmentCards($('[data-mount="apartments-carousel"]'), 'carousel');
    renderApartmentRows($('[data-mount="apartments-rows"]'));
    renderNearby($('[data-mount="nearby"]'));
    renderDistances($('[data-mount="distances"]'));
    renderGalleryGrid($('[data-mount="gallery-grid"]'));
    renderReviews($('[data-mount="reviews"]'));
    renderFacts($('[data-mount="facts"]'));
    renderServiceLists();
    renderContactBits();

    // Tlumaczenia po wygenerowaniu tresci
    I18N.apply();
    renderStructuredData();
    document.addEventListener('tatrapart:langchange', renderStructuredData);

    // Interakcje
    initHeader();
    initNav();
    initLang();
    initCarousels();
    initLightboxTriggers();
    initBookBar();
    initForms();
    initReveal();
    initParallax();
    imgFallback();
    wireBooking();

    // Aktywna pozycja w nawigacji
    var page = document.body.getAttribute('data-page');
    if (page) {
      $$('[data-nav="' + page + '"]').forEach(function (a) { a.setAttribute('aria-current', 'page'); });
    }

    document.documentElement.classList.add('is-ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

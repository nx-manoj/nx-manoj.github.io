/* =========================================================================
   home.js — the locality explorer. Bars are real buttons, so pointer,
   touch and keyboard all work, and the reading line is announced politely.
   ========================================================================= */
(function () {
  'use strict';

  var data = window.LOC_DATA;
  var host = document.getElementById('loc-bars');
  if (!data || !host) return;

  var nameEl = document.getElementById('loc-name');
  var bigEl = document.getElementById('loc-big');
  var detailEl = document.getElementById('loc-detail');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.seg button'));

  var mode = 'high';
  var selected = 0;

  function rupees(n) { return '₹' + n.toLocaleString('en-IN'); }

  function flat(price) {
    return price >= 100
      ? '₹' + (price / 100).toFixed(2) + ' crore'
      : '₹' + price.toFixed(1) + ' lakh';
  }

  function reading(d) {
    return '<strong>' + d.name + '</strong> — a typical flat asks ' + flat(d.price) +
      ', across ' + d.n + ' listings.';
  }

  function read(d) {
    nameEl.textContent = d.name;
    bigEl.innerHTML = rupees(d.ppsf) + '<span class="cur">/sq ft</span>';
    detailEl.innerHTML = reading(d);
  }

  function build() {
    var rows = data[mode];
    var max = Math.max.apply(null, rows.map(function (d) { return d.ppsf; }));
    host.innerHTML = '';

    rows.forEach(function (d, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bar';
      b.setAttribute('aria-pressed', i === selected ? 'true' : 'false');
      b.innerHTML =
        '<span class="bn">' + d.name + '</span>' +
        '<span class="track"><span class="fill" style="width:' +
          Math.round((d.ppsf / max) * 100) + '%"></span></span>' +
        '<span class="bv">' + rupees(d.ppsf) + '</span>';

      b.addEventListener('click', function () {
        selected = i;
        Array.prototype.forEach.call(host.children, function (el, j) {
          el.setAttribute('aria-pressed', j === i ? 'true' : 'false');
        });
        read(d);
      });
      b.addEventListener('pointerenter', function (e) {
        if (e.pointerType === 'mouse') read(d);
      });
      b.addEventListener('pointerleave', function (e) {
        if (e.pointerType === 'mouse') read(rows[selected]);
      });
      b.addEventListener('focus', function () { read(d); });

      host.appendChild(b);
    });

    selected = 0;
    read(rows[0]);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      mode = t.getAttribute('data-mode');
      tabs.forEach(function (o) {
        o.setAttribute('aria-pressed', o === t ? 'true' : 'false');
      });
      build();
    });
  });

  build();
})();

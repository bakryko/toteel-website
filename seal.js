/* =============================================================================
   الختم — نسخة مستقلة بلا اعتماديات
   =============================================================================
   🌹 ملف واحد. بيركّب نفسو، بيرسم نفسو، وبيشيل أنماطو معاهو.

   التركيب:
       <script src="seal.js" defer></script>

   بيتعلّق في آخر <body>. ولو عايزو في مكان محدد، حط:
       <div data-seal></div>

   وصل الهوية — سطر واحد في CSS بتاعك (اختياري):
       :root { --seal: var(--لون-منتجك); }
   بلاهو بياخد لون النص المحيط. **الختم برّه بياخد لون المنتج عشان يبان
   طبيعياً؛ وألوان الحديقة جوّه ثابتة في كل المشاريع وما بتتغير.**

   ⚠️ الملف دا **ما بيتعدّل لكل مشروع**. أي تعديل بيتعمل في النسخة الأصل
      وبينتقل لكل المشاريع بالنسخ.
   ============================================================================= */

(function () {
  'use strict';

  /* --- البيانات ------------------------------------------------------------
     الوردة الأولى بلا اسم وبلا سنة وبلا وصف، ولازم تفضل أولاً. */
  var GARDEN = [
    { name: null, year: null, note: null },

    { name: 'عين الصفا', year: 2026, note: null },
    { name: 'توتيل', year: 2026, note: null },
    { name: 'the-hand', year: 2026, note: null },
    { name: 'محل المياه', year: 2026, note: null },
    { name: '3d-portfolio', year: 2026, note: null },
    { name: 'تكوين', year: 2026, note: 'محرّك ذاتي التطوّر — بيراقب نفسو ويصلّح نفسو' },
    { name: 'جارفس', year: 2026, note: 'مخطط مساعد شخصي محلي ١٠٠٪ — بلا سحابة ولا اشتراكات' },
    { name: 'ونس', year: 2026, note: 'خزنة ذكريات دافية لناسك القريبين' },
    { name: 'بوصلة', year: 2026, note: 'نظام سوشيال ذكي للمحلات — بديل الوكالات' },
    { name: 'دفعة', year: 2026, note: 'رفيق مذاكرة لطلاب الشهادة السودانية' }
  ];

  var NAME = 'Bakryko';
  var MARK = '14.823286, 33.215151';
  var HOLD_MS = 2000;

  var CSS = [
    '.bk-seal{display:flex;flex-direction:column;align-items:center;gap:.375rem;',
    'padding:2.5rem 1rem 1.5rem;text-align:center;font:inherit}',
    /* ولا مؤشر إنو قابل للضغط — لا cursor ولا hover */
    '.bk-seal-mark{color:var(--seal,currentColor);line-height:0;',
    '-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}',
    '.bk-seal-name{font-size:.9375rem;letter-spacing:.06em;opacity:.62;direction:ltr}',
    '.bk-seal-coord{font-size:.6875rem;letter-spacing:.1em;opacity:.42;direction:ltr;',
    'font-variant-numeric:tabular-nums}',

    /* ألوان الحديقة ثابتة في كل المشاريع — دي اللي بتخليها نفس المكان */
    '.bk-garden{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;',
    'align-items:center;justify-content:center;background:#14101A;color:#F2ECF6;',
    'opacity:0;transition:opacity .9s ease;font:inherit}',
    '.bk-garden.is-open{opacity:1}',
    /* المرور الأفقي: بعد ١٠ ورود الالتفاف بيكسر خط الأرض ويحوّلها لقائمة */
    '.bk-garden-soil{display:flex;align-items:flex-end;gap:clamp(1.5rem,7vw,3rem);',
    'inline-size:100%;padding-inline:max(1.25rem,calc(50vw - 20rem));overflow-x:auto;',
    'scrollbar-width:none;scroll-snap-type:x proximity}',
    '.bk-garden-soil::-webkit-scrollbar{display:none}',
    '.bk-garden-plant{display:flex;flex-direction:column;align-items:center;flex:0 0 auto;',
    'scroll-snap-align:center;background:none;border:0;padding:0;color:#C084FC;opacity:0;',
    'transform:translateY(.875rem);transition:opacity .7s ease,transform .7s ease}',
    /* الصامتة: نفس الحجم ونفس الساق ونفس السلوك — اللون بس هو الفرق */
    '.bk-garden-plant.is-quiet{color:#E58AB0}',
    '.bk-garden.is-open .bk-garden-plant{opacity:1;transform:none}',
    '.bk-garden-plant.is-picked{transform:translateY(-.375rem)}',
    '.bk-garden-stem{inline-size:2px;block-size:clamp(2.5rem,9vw,4.625rem);',
    'background:currentColor;opacity:.35}',
    '.bk-garden-ground{inline-size:min(40rem,86vw);block-size:1px;background:#F2ECF61F;',
    'margin-block-start:2px}',
    /* ارتفاع ثابت — عشان الصامتة تفتحو فاضي بنفس المقاس */
    '.bk-garden-cap{margin-block-start:2.125rem;min-block-size:4.625rem;text-align:center;',
    'opacity:0;transition:opacity .45s ease}',
    '.bk-garden-cap.is-on{opacity:1}',
    '.bk-garden-cap b{display:block;font-size:.9375rem;font-weight:700;color:#F2ECF6}',
    '.bk-garden-cap em{display:block;font-style:normal;font-size:.6875rem;color:#F2ECF666;',
    'margin-block-start:2px;font-variant-numeric:tabular-nums}',
    '.bk-garden-cap i{display:block;font-style:normal;font-size:.75rem;color:#F2ECF699;',
    'line-height:1.6;max-inline-size:min(26rem,80vw);margin-block-start:.5rem;margin-inline:auto}',
    '.bk-garden-close{position:fixed;inset-block-start:1.125rem;inset-inline-start:1.125rem;',
    'min-inline-size:2.75rem;min-block-size:2.75rem;background:none;border:0;color:#F2ECF666;',
    'font-size:1.375rem;line-height:1;cursor:pointer}',
    '@media(prefers-reduced-motion:reduce){.bk-garden,.bk-garden-plant,.bk-garden-cap',
    '{transition-duration:.01ms}}'
  ].join('');

  /* --- الوردة --------------------------------------------------------------
     بتلة واحدة بتتكرر بالدوران في تلات حلقات — دي بنية الجوري: بتلات متطبّقة
     ومركز مقسوم لأرباع. حلقة واحدة = وردة عادية بخمس بتلات، وما دي هي. */
  var PETAL =
    'M0,-32 C9,-31 15,-24 15,-16 C15,-8 8,-2 0,-2 C-8,-2 -15,-8 -15,-16 C-15,-24 -9,-31 0,-32Z';

  function petals(angles, width, scale, spin) {
    var out = '<g stroke-width="' + width + '"';
    var tf = [];
    if (spin) tf.push('rotate(' + spin + ')');
    if (scale) tf.push('scale(' + scale + ')');
    if (tf.length) out += ' transform="' + tf.join(' ') + '"';
    out += '>';
    for (var i = 0; i < angles.length; i++) {
      out += '<path d="' + PETAL + '"' +
        (angles[i] ? ' transform="rotate(' + angles[i] + ')"' : '') + '/>';
    }
    return out + '</g>';
  }

  function rose() {
    return '<g fill="none" stroke="currentColor" stroke-linejoin="round">' +
      petals([0, 51, 102, 153, 204, 255, 306], 2.4) +
      petals([0, 72, 144, 216, 288], 3.3, 0.64, 26) +
      petals([0, 90, 180, 270], 7, 0.3, 45) +
      '</g>';
  }

  /** الختم: الوردة، والساق اللي بتنزل وتبقى بوّابة الباء، والنقطة تحتها */
  function seal(size) {
    return '<svg width="' + size + '" height="' + (size * 1.167) + '" viewBox="0 0 120 140"' +
      ' fill="none" aria-hidden="true"><g transform="translate(82,42)">' + rose() + '</g>' +
      '<path d="M82,76 L82,100 C82,112 72,120 52,120 C32,120 22,112 22,103"' +
      ' stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="52" cy="133" r="4.5" fill="currentColor"/></svg>';
  }

  /** وردة الحديقة — نفس الوردة بلا الباء */
  function bloom(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 88 88"' +
      ' fill="none" aria-hidden="true"><g transform="translate(44,44)">' + rose() + '</g></svg>';
  }

  var AR = '٠١٢٣٤٥٦٧٨٩';
  function arabicIndic(value) {
    return String(value).replace(/[0-9]/g, function (d) { return AR.charAt(Number(d)); });
  }

  /* --- الحديقة -------------------------------------------------------------- */

  function openGarden() {
    var box = document.createElement('div');
    box.className = 'bk-garden';

    var html = '<button type="button" class="bk-garden-close" aria-label="إغلاق">✕</button>' +
      '<div class="bk-garden-soil">';
    for (var i = 0; i < GARDEN.length; i++) {
      html += '<button type="button" class="bk-garden-plant' +
        (GARDEN[i].name === null ? ' is-quiet' : '') +
        '" data-i="' + i + '" style="transition-delay:' + (i * 0.09) + 's">' +
        bloom(34) + '<span class="bk-garden-stem"></span></button>';
    }
    html += '</div><div class="bk-garden-ground"></div><div class="bk-garden-cap"></div>';
    box.innerHTML = html;
    document.body.appendChild(box);

    var cap = box.querySelector('.bk-garden-cap');

    function close() {
      box.classList.remove('is-open');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { box.remove(); }, 900);
    }
    function onKey(event) { if (event.key === 'Escape') close(); }

    box.querySelector('.bk-garden-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);

    box.addEventListener('click', function (event) {
      var plant = event.target.closest ? event.target.closest('.bk-garden-plant') : null;
      if (!plant) return;
      var plants = box.querySelectorAll('.bk-garden-plant');
      for (var k = 0; k < plants.length; k++) plants[k].classList.remove('is-picked');
      plant.classList.add('is-picked');
      var item = GARDEN[Number(plant.getAttribute('data-i'))];
      /* 🔴 نفس المساحة بالظبط للكل. الصامتة بتفتحها **فاضية** — والفراغ اللي
         المفروض فيهو كلام أبلغ من أي جملة نكتبها. */
      cap.innerHTML = '<b>' + (item.name || '&nbsp;') + '</b>' +
        '<em>' + (item.year ? arabicIndic(item.year) : '&nbsp;') + '</em>' +
        '<i>' + (item.note || '&nbsp;') + '</i>';
      cap.classList.add('is-on');
    });

    requestAnimationFrame(function () { box.classList.add('is-open'); });
  }

  /* --- التركيب -------------------------------------------------------------- */

  function mount() {
    if (document.querySelector('.bk-seal')) return;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var host = document.querySelector('[data-seal]');
    var box = document.createElement('div');
    box.className = 'bk-seal';
    box.innerHTML =
      '<div class="bk-seal-mark">' + seal(40) + '</div>' +
      '<div class="bk-seal-name">' + NAME + '</div>' +
      '<div class="bk-seal-coord">' + MARK + '</div>';
    (host || document.body).appendChild(box);

    /* ⚠️ الضغط المطوّل بيتلغي مع أول تحريك إصبع — بلا كدا كل سحبة للشاشة على
       الموبايل كانت حتفتح الحديقة. */
    var timer = null;
    var mark = box.querySelector('.bk-seal-mark');
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    mark.addEventListener('pointerdown', function () {
      stop();
      timer = setTimeout(function () { timer = null; openGarden(); }, HOLD_MS);
    });
    ['pointerup', 'pointercancel', 'pointerleave', 'touchmove'].forEach(function (event) {
      mark.addEventListener(event, stop);
    });
    mark.addEventListener('contextmenu', function (event) { event.preventDefault(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

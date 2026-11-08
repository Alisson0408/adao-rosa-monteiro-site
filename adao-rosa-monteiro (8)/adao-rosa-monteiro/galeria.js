(function () {
  // =========================================================
  //  VÍDEOS DO YOUTUBE
  //  Para adicionar um vídeo: copie o código do link
  //  (ex.: youtu.be/ESTE_CODIGO) e inclua uma nova linha.
  //  O título é opcional.
  // =========================================================
  var VIDEOS = [
    { id: 'uRHbNIfFcBw', titulo: '' },
    { id: 'HKceLSC-Uio', titulo: '' },
    { id: 'hOIjsW0e-kU', titulo: '' },
    { id: 'uS7LFhPU6Ss', titulo: '' },
    { id: '37OGxHHChy4', titulo: '' },
    { id: 'c0XsSieWYsg', titulo: '' },
    { id: 'EuI74Bw7zk0', titulo: '' },
    { id: '6G1SIEf_fkM', titulo: '' },
    { id: 'DjgCt1IcHGc', titulo: '' },
    { id: '_S0MPkTmn0E', titulo: '' },
    { id: 'HSlPhtJmG4o', titulo: '' },
    { id: 'YfzwhfB6cLs', titulo: '' }
  ];

  // =========================================================
  //  FOTOS  (arquivos em assets/galeria/)
  //  cat: piano | retratos | bastidores
  // =========================================================
  var FOTOS = [
    { f: 'sorriso-ao-piano',      cat: 'piano',      legenda: 'Ao piano, voz e emoção' },
    { f: 'retrato-oficial',       cat: 'retratos',   legenda: 'Retrato' },
    { f: 'piano-branco',          cat: 'piano',      legenda: 'Piano branco' },
    { f: 'maos-yamaha',           cat: 'piano',      legenda: 'As mãos do pianista' },
    { f: 'bastidores-raca-negra', cat: 'bastidores', legenda: 'Bastidores · Raça Negra & Amigos II' },
    { f: 'retrato-pb',            cat: 'retratos',   legenda: 'Retrato em preto e branco' },
    { f: 'maos-steinway',         cat: 'piano',      legenda: 'Mãos no Steinway & Sons' },
    { f: 'piano-de-cauda',        cat: 'piano',      legenda: 'Piano de cauda' },
    { f: 'estudio',               cat: 'piano',      legenda: 'No estúdio' },
    { f: 'bastidores-terno',      cat: 'bastidores', legenda: 'Bastidores' },
    { f: 'piano-e-voz',           cat: 'piano',      legenda: 'Piano e voz' },
    { f: 'retrato-camiseta',      cat: 'retratos',   legenda: 'Retrato' },
    { f: 'maos-sepia',            cat: 'piano',      legenda: 'Intimidade ao piano' },
    { f: 'reflexo-piano',         cat: 'piano',      legenda: 'Reflexo no piano de cauda' },
    { f: 'terno-ao-piano',        cat: 'piano',      legenda: 'Ao piano' },
    { f: 'encontros',             cat: 'bastidores', legenda: 'Encontros pelo caminho' }
  ];

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // ---------- Grade de vídeos ----------
  var grid = document.getElementById('yt-grid');
  if (grid) {
    VIDEOS.forEach(function (v, i) {
      var nome = v.titulo || ('Apresentação ' + pad(i + 1));
      var card = document.createElement('article');
      card.className = 'yt-card rv';
      card.innerHTML =
        '<button class="yt-thumb" type="button" aria-label="Assistir: ' + nome + '">' +
          '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy">' +
          '<span class="yt-num">' + pad(i + 1) + '</span>' +
          '<span class="yt-play"><svg viewBox="0 0 24 24" fill="#16110a"><path d="M6 4l14 8-14 8z"/></svg></span>' +
        '</button>' +
        '<div class="yt-info">' +
          '<h3>' + nome + '</h3>' +
          '<a href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener noreferrer">YouTube ↗</a>' +
        '</div>';
      var img = card.querySelector('img');
      img.addEventListener('error', function () { card.querySelector('.yt-thumb').classList.add('noimg'); img.remove(); });
      card.querySelector('.yt-thumb').addEventListener('click', function () { openVideo(v.id, nome); });
      grid.appendChild(card);
    });
  }

  // ---------- Modal de vídeo ----------
  var vm = document.getElementById('vm');
  var vmFrame = document.getElementById('vm-frame');
  function openVideo(id, nome) {
    document.querySelectorAll('video').forEach(function (o) { o.pause(); });
    document.getElementById('vm-title').textContent = nome;
    document.getElementById('vm-yt').href = 'https://www.youtube.com/watch?v=' + id;
    vmFrame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1" title="' + nome + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    vm.classList.add('open'); vm.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closeVideo() {
    vm.classList.remove('open'); vm.setAttribute('aria-hidden', 'true');
    vmFrame.innerHTML = '';
    document.body.classList.remove('locked');
  }
  if (vm) {
    vm.addEventListener('click', function (e) { if (e.target === vm || e.target.closest('[data-close]')) closeVideo(); });
  }

  // ---------- Fotos (masonry + filtros) ----------
  var mas = document.getElementById('masonry');
  var visible = [];
  if (mas) {
    FOTOS.forEach(function (p, i) {
      var fig = document.createElement('figure');
      fig.className = 'ph';
      fig.dataset.cat = p.cat;
      fig.dataset.i = i;
      fig.innerHTML =
        '<img src="assets/galeria/' + p.f + '-thumb.jpg" alt="' + p.legenda + ' — Adão Rosa Monteiro" decoding="async">' +
        '<figcaption><span>' + p.legenda + '</span><em>Ampliar</em></figcaption>';
      fig.addEventListener('click', function () { openPhoto(i); });
      mas.appendChild(fig);
    });
  }
  function refreshVisible() {
    visible = Array.prototype.filter.call(document.querySelectorAll('.ph'), function (el) { return !el.hidden; })
      .map(function (el) { return +el.dataset.i; });
  }
  refreshVisible();
  document.querySelectorAll('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.dataset.filter;
      document.querySelectorAll('.ph').forEach(function (el) {
        el.hidden = !(f === 'todas' || el.dataset.cat === f);
        el.classList.add('in');
      });
      refreshVisible();
    });
  });

  // ---------- Lightbox ----------
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lb-img');
  var cur = 0;
  function show(i) {
    cur = i;
    var p = FOTOS[i];
    lbImg.classList.remove('ready');
    lbImg.onload = function () { lbImg.classList.add('ready'); };
    lbImg.src = 'assets/galeria/' + p.f + '.jpg';
    lbImg.alt = p.legenda + ' — Adão Rosa Monteiro';
    document.getElementById('lb-cap').textContent = p.legenda;
    document.getElementById('lb-count').textContent = pad(visible.indexOf(i) + 1) + ' / ' + pad(visible.length);
  }
  function openPhoto(i) {
    show(i);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closePhoto() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }
  function step(d) {
    var k = visible.indexOf(cur);
    show(visible[(k + d + visible.length) % visible.length]);
  }
  if (lb) {
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('[data-close]')) closePhoto(); });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      sx = null;
    });
  }

  document.addEventListener('keydown', function (e) {
    if (lb && lb.classList.contains('open')) {
      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    } else if (vm && vm.classList.contains('open') && e.key === 'Escape') {
      closeVideo();
    }
  });
})();

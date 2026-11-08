(function () {
  // =========================================================
  //  VÍDEOS DO CANAL MUSICAL SEBASTIANA
  //  Para dar nome a um vídeo, escreva o título entre as aspas.
  //  Para adicionar: copie o código do link (youtu.be/ESTE_CODIGO).
  // =========================================================
  var VIDEOS = [
    { id: '6XgzbOIdcRA', titulo: '' },
    { id: 'OHXGdvePXMk', titulo: '' },
    { id: 'jEEkpiUmisA', titulo: '' },
    { id: 'dRLZ0Gqpsqw', titulo: '' },
    { id: 'MqBK3emoxDY', titulo: '' },
    { id: '7id4Pw0D30I', titulo: '' },
    { id: 'GqQ0jO7R3Ng', titulo: '' },
    { id: 'GWwFkHtH_Uo', titulo: '' },
    { id: '0Atf7b2rcas', titulo: '' },
    { id: 'KLQYOIZrbiY', titulo: '' },
    { id: 'zA9DGIO0dsA', titulo: '' },
    { id: 'nWGX2biONx4', titulo: '' },
    { id: 'FZu6K8jeu8A', titulo: '' },
    { id: 'CeS5PPTW_lo', titulo: '' },
    { id: 'AOZCBX6UfW4', titulo: '' },
    { id: 'HSlPhtJmG4o', titulo: '' },
    { id: 'Fq4GMTCK6kY', titulo: '' },
    { id: 'Xd6p8PGs44w', titulo: '' },
    { id: 'vVYfxqiDhic', titulo: '' },
    { id: 'Qzkm8pf1u4Q', titulo: '' }
  ];

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // ---------- Grade de vídeos ----------
  var grid = document.getElementById('mu-grid');
  if (grid) {
    VIDEOS.forEach(function (v, i) {
      var nome = v.titulo || ('Musical Sebastiana · Vídeo ' + pad(i + 1));
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


  document.addEventListener('keydown', function (e) {
    if (vm && vm.classList.contains('open') && e.key === 'Escape') closeVideo();
  });
  var total = document.getElementById('mu-total');
  if (total) total.textContent = pad(VIDEOS.length);
})();

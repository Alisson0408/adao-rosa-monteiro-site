// =========================================================
//  MUSICAL SEBASTIANA — canal e vídeo em destaque
//  canal:   link completo do canal no YouTube
//  videoId: código do vídeo de lançamento (o que vem depois de youtu.be/)
//  Enquanto estiverem vazios, os botões do canal ficam ocultos
//  e o vídeo aparece como "em breve".
// =========================================================
var MUSICAL = {
  canal: 'https://www.youtube.com/@musicalsebastiana',
  videoId: '6XgzbOIdcRA'
};

(function () {
  // ===== CONTATO OFICIAL =====
  var WHATS = '5511960542083';

  var base = 'Olá! Conheci o trabalho de Adão Rosa Monteiro pelo site ';
  var msgs = {
    geral: base + 'e gostaria de consultar disponibilidade de agenda e valores para uma apresentação.',
    galeria: base + '(vi a galeria e os shows) e gostaria de consultar disponibilidade de agenda e valores.',
    vozpiano: base + '(vi o vídeo de piano e voz) e tenho interesse nesse formato para o meu evento. Podem me passar disponibilidade e valores?',
    musical: base + 'e tenho interesse no Musical Sebastiana. Podem me passar informações sobre apresentações e valores?',
    compositores: base + 'e tenho interesse no formato "Compositores Pretos Brasileiros". Podem me passar disponibilidade e valores?',
    autoral: base + 'e tenho interesse no formato "Recital de Piano Autoral". Podem me passar disponibilidade e valores?',
    jazz: base + 'e tenho interesse no formato "Piano & Jazz". Podem me passar disponibilidade e valores?',
    duo: base + 'e tenho interesse no formato "Duo Baru". Podem me passar disponibilidade e valores?'
  };
  function wa(text) { return 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(text); }

  document.querySelectorAll('.wa-link').forEach(function (a) {
    a.href = wa(msgs[a.dataset.msg] || msgs.geral);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // ===== Formulário → mensagem pronta no WhatsApp =====
  var fbtn = document.getElementById('form-btn');
  if (fbtn) {
    var ids = ['f-nome', 'f-tipo', 'f-formato', 'f-cidade', 'f-data'];
    var build = function () {
      var v = {};
      ids.forEach(function (id) { var el = document.getElementById(id); v[id] = el ? (el.value || '').trim() : ''; });
      var d = v['f-data'];
      if (d) { var p = d.split('-'); d = p[2] + '/' + p[1] + '/' + p[0]; }
      var t = 'Olá! ' + (v['f-nome'] ? 'Meu nome é ' + v['f-nome'] + '. ' : '') +
        'Conheci o trabalho de Adão Rosa Monteiro pelo site e gostaria de uma proposta de apresentação.\n\n' +
        '• Tipo de evento: ' + (v['f-tipo'] || 'a definir') + '\n' +
        '• Formato: ' + (v['f-formato'] || 'quero sugestão') + '\n' +
        '• Cidade: ' + (v['f-cidade'] || 'a definir') + '\n' +
        '• Data prevista: ' + (d || 'a definir');
      fbtn.href = wa(t);
    };
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.addEventListener('input', build); el.addEventListener('change', build); }
    });
    build();
  }

  // ===== Vídeos com botão de play personalizado =====
  document.querySelectorAll('[data-player]').forEach(function (box) {
    var vid = box.querySelector('video');
    var play = box.querySelector('.play');
    if (!vid || !play) return;
    play.addEventListener('click', function () {
      document.querySelectorAll('[data-player] video').forEach(function (o) { if (o !== vid) o.pause(); });
      vid.controls = true;
      play.classList.add('hide');
      var p = vid.play(); if (p && p.catch) p.catch(function () {});
    });
    vid.addEventListener('ended', function () { play.classList.remove('hide'); vid.controls = false; vid.currentTime = 0; });
  });

  // ===== Cabeçalho ao rolar =====
  var h = document.querySelector('.header');
  if (h) {
    var onScroll = function () { h.classList.toggle('scrolled', window.scrollY > 30); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== Animação de entrada =====
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

// ===== Agenda: esconde automaticamente apresentações que já passaram =====
(function () {
  var sec = document.getElementById('agenda');
  if (!sec) return;
  var now = Date.now(), left = 0;
  sec.querySelectorAll('.event[data-end]').forEach(function (ev) {
    var end = Date.parse(ev.dataset.end);
    if (!isNaN(end) && end < now) ev.remove(); else left++;
  });
  if (!left) sec.remove();
})();

// ===== Musical Sebastiana: links do canal e vídeo de lançamento =====
(function () {
  var canal = (MUSICAL.canal || '').trim();
  document.querySelectorAll('[data-canal]').forEach(function (a) {
    if (canal) { a.href = canal; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else { a.hidden = true; a.style.display = 'none'; }
  });
  var box = document.getElementById('musical-video');
  if (box && MUSICAL.videoId) {
    var id = MUSICAL.videoId.trim();
    box.classList.add('has-video');
    box.innerHTML = '<button class="mu-poster" type="button" aria-label="Assistir ao vídeo em destaque">' +
      '<img src="https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg" alt="">' +
      '<span class="play-circle"><svg viewBox="0 0 24 24" fill="#16110a"><path d="M6 4l14 8-14 8z"/></svg></span>' +
      '<span class="mu-poster-txt"><small>Em destaque</small>Musical Sebastiana</span></button>';
    var img = box.querySelector('img');
    img.addEventListener('error', function () {
      if (img.src.indexOf('hqdefault') < 0) img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      else img.src = 'assets/galeria/maos-steinway.jpg';
    });
    box.querySelector('button').addEventListener('click', function () {
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0&modestbranding=1" title="Musical Sebastiana" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
    var yt = document.getElementById('musical-yt');
    if (yt) { yt.href = 'https://www.youtube.com/watch?v=' + id; yt.hidden = false; yt.style.display = ''; }
  }
})();

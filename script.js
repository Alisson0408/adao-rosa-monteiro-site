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
    vozpiano: base + '(vi o vídeo de piano e voz) e tenho interesse nesse formato para o meu encontro. Podem me passar disponibilidade e valores?',
    musical: base + 'e tenho interesse no Musical Sebastiana. Podem me passar informações sobre apresentações e valores?',
    compositores: base + 'e tenho interesse no formato "Compositores Pretos Brasileiros". Podem me passar disponibilidade e valores?',
    autoral: base + 'e tenho interesse no formato "Recital de Piano Autoral". Podem me passar disponibilidade e valores?',
    jazz: base + 'e tenho interesse no formato "Piano & Jazz". Podem me passar disponibilidade e valores?',
    duo: base + 'e tenho interesse no formato "Duo Baru". Podem me passar disponibilidade e valores?',
    rider: base + 'e vi o rider técnico. Tenho uma dúvida sobre a estrutura técnica do meu encontro.'
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
        '• Tipo de encontro: ' + (v['f-tipo'] || 'a definir') + '\n' +
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

// ===== Agenda automática: o que já passou vira "Melhores momentos" =====
(function () {
  var sec = document.getElementById('agenda');
  if (!sec) return;
  var now = Date.now(), futuros = 0, passados = [];
  var MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  sec.querySelectorAll('.event[data-end]').forEach(function (ev) {
    var end = Date.parse(ev.dataset.end);
    if (!isNaN(end) && end < now) passados.push({ ev: ev, end: end }); else futuros++;
  });

  // Mural de melhores momentos (mais recente primeiro, até 6)
  var mom = document.getElementById('momentos'), grid = document.getElementById('mom-grid');
  passados.sort(function (x, y) { return y.end - x.end; });
  passados.forEach(function (p, i) {
    var ev = p.ev;
    if (grid && i < 6) {
      var d = new Date(p.end - 3 * 3600e3);
      var dia = (ev.querySelector('.ev-date strong') || {}).textContent || d.getUTCDate();
      var data = dia + ' ' + MESES[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
      var titulo = (ev.querySelector('h3') || {}).textContent || '';
      var tag = (ev.querySelector('.ev-tag') || {}).textContent || '';
      var local = (ev.querySelector('.ev-info b') || {}).textContent || '';
      var img = ev.querySelector('.ev-poster img');
      var video = ev.querySelector('.ev-video');
      var card = document.createElement('article');
      card.className = 'mom-card';
      card.innerHTML =
        '<div class="mom-media">' + (img ? '<img src="' + img.getAttribute('src') + '" alt="' + (img.getAttribute('alt') || titulo) + '" loading="lazy">' : '') + '</div>' +
        '<div class="mom-body">' +
          '<span class="mom-seal"><span class="mom-dot"></span>Realizado · ' + data + '</span>' +
          '<h3></h3><p class="mom-tag"></p><p class="mom-local"></p>' +
        '</div>';
      card.querySelector('h3').textContent = titulo;
      card.querySelector('.mom-tag').textContent = tag;
      card.querySelector('.mom-local').textContent = local;
      if (video) {
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'mom-play';
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg> Assistir ao vídeo';
        btn.addEventListener('click', function () {
          var media = card.querySelector('.mom-media');
          media.innerHTML = ''; media.classList.add('has-video'); media.appendChild(video);
          btn.remove();
          var v = video.querySelector('.play'); if (v) v.click();
        });
        card.querySelector('.mom-body').appendChild(btn);
      }
      grid.appendChild(card);
    }
    ev.remove();
  });
  if (mom && grid && grid.children.length) mom.hidden = false;

  // Texto da agenda conforme o que ainda vai acontecer
  var sub = document.getElementById('agenda-sub'), h2 = document.getElementById('agenda-h2');
  if (passados.length && sub) {
    var N = ['', 'Uma apresentação confirmada', 'Duas apresentações confirmadas', 'Três apresentações confirmadas', 'Quatro apresentações confirmadas'];
    sub.textContent = futuros ? (N[futuros] || futuros + ' apresentações confirmadas') + '. Garanta também a data do seu encontro.' : '';
  }
  if (!futuros) {
    var evs = sec.querySelector('.events'); if (evs) evs.remove();
    var eb = sec.querySelector('.eyebrow'); if (eb) eb.textContent = 'Agenda';
    if (h2) h2.innerHTML = 'Agenda aberta <em>para novas datas.</em>';
    if (sub) sub.textContent = 'As próximas apresentações serão anunciadas aqui. Reserve agora a data do seu encontro.';
    var cp = sec.querySelector('.agenda-cta p'); if (cp) cp.remove();
  }
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

// ===== Vídeo Moacyr Franco (YouTube Shorts) =====
(function () {
  var box = document.getElementById('mo-player');
  if (!box) return;
  var btn = box.querySelector('button');
  var img = box.querySelector('img');
  if (img) img.addEventListener('error', function () { img.src = 'assets/galeria/terno-ao-piano.jpg'; });
  btn.addEventListener('click', function () {
    document.querySelectorAll('video').forEach(function (v) { v.pause(); });
    box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/8lazktsD81E?autoplay=1&rel=0&playsinline=1" title="Moacyr Franco para Adão Rosa Monteiro" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  });
})();

// Vídeo do YouTube que só carrega ao clicar (destaque Odair José)
document.querySelectorAll('[data-ytfacade]').forEach(function (box) {
  var btn = box.querySelector('button');
  if (!btn) return;
  btn.addEventListener('click', function () {
    document.querySelectorAll('video').forEach(function (v) { v.pause(); });
    box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + box.dataset.ytfacade +
      '?autoplay=1&rel=0&modestbranding=1" title="' + box.dataset.nome + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  });
});

/* ============================================================
   IQMO · Кнопка «Рейтинг» — открытие/закрытие модалки.
   --------------------------------------------------------------
   Подключение:
     <script src="rating-button.js" defer></script>

   Что делает:
     - открывает модалку с id="ratingModal" по клику на любой
       элемент с data-rating-open (и на .rb-rating);
     - закрывает по крестику (.rb-close), клику по фону, Esc,
       по кнопке с data-rating-close;
     - плавно заливает .rb-progress__fill из текущего значения
       data-target (в %).

   Параметры через data-* на корневом .rb-scrim:
     data-progress="71"   — % заливки прогресс-бара (0..100).

   API:
     window.RatingTeaser.open();
     window.RatingTeaser.close();
     window.RatingTeaser.setProgress(45);
   ============================================================ */
(function(){
  'use strict';

  function init(){
    var scrim = document.getElementById('ratingModal');
    if(!scrim) return;

    var fill = scrim.querySelector('.rb-progress__fill');
    var targetPct = parseFloat(scrim.dataset.progress || '0');
    if(isNaN(targetPct)) targetPct = 0;

    function open(){
      scrim.classList.add('is-open');
      scrim.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // плавная заливка прогресс-бара
      if(fill){
        fill.style.width = '0%';
        requestAnimationFrame(function(){
          setTimeout(function(){ fill.style.width = targetPct + '%'; }, 80);
        });
      }
      // автофокус на основной CTA, чтобы Tab работал предсказуемо
      var cta = scrim.querySelector('.rb-cta');
      if(cta) setTimeout(function(){ cta.focus(); }, 150);
    }

    function close(){
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if(fill) fill.style.width = '0%';
    }

    function setProgress(pct){
      targetPct = Math.max(0, Math.min(100, pct));
      if(scrim.classList.contains('is-open') && fill){
        fill.style.width = targetPct + '%';
      }
    }

    // Открытие: любой [data-rating-open] + сама кнопка .rb-rating
    document.addEventListener('click', function(e){
      var opener = e.target.closest('[data-rating-open], .rb-rating');
      if(opener){
        e.preventDefault();
        open();
        return;
      }
      var closer = e.target.closest('[data-rating-close]');
      if(closer && scrim.contains(closer)){
        e.preventDefault();
        close();
        return;
      }
      // клик по подложке
      if(e.target === scrim){
        close();
      }
    });

    // Esc
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && scrim.classList.contains('is-open')) close();
    });

    // экспорт наружу
    window.RatingTeaser = { open: open, close: close, setProgress: setProgress };
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

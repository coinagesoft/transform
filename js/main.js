document.addEventListener('DOMContentLoaded', function () {

  /* ---------- header shrink on scroll ---------- */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll(){
    if (window.scrollY > 30) { header && header.classList.add('is-scrolled'); }
    else { header && header.classList.remove('is-scrolled'); }
    if (toTop){
      if (window.scrollY > 500) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  if (toTop){
    toTop.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');
  function closeNav(){
    toggle && toggle.classList.remove('open');
    nav && nav.classList.remove('open');
    scrim && scrim.classList.remove('show');
    document.querySelectorAll('.mobile-open').forEach(function(el){ el.classList.remove('mobile-open'); });
  }
  if (toggle){
    toggle.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      scrim && scrim.classList.toggle('show', isOpen);
    });
  }
  scrim && scrim.addEventListener('click', closeNav);

  // on mobile, tap parent li to reveal submenu instead of following link
  if (window.matchMedia('(max-width:860px)').matches) {
    document.querySelectorAll('.main-nav > ul > li').forEach(function(li){
      var link = li.querySelector(':scope > .nav-link');
      var mega = li.querySelector(':scope > .mega');
      if (mega && link){
        link.addEventListener('click', function(e){
          e.preventDefault();
          li.classList.toggle('mobile-open');
        });
      }
    });
    document.querySelectorAll('.mega-item').forEach(function(item){
      var sub = item.querySelector('.mega-sub');
      if (sub){
        item.addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          item.classList.toggle('mobile-open');
        });
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.15, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(function(el, i){
      el.style.setProperty('--i', i % 6);
      io.observe(el);
    });

    // rail steps highlight progressively + fill line
    var railSteps = document.querySelectorAll('.rail-step');
    var railFill = document.querySelector('.rail-line-fill');
    if (railSteps.length){
      var stepObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
        // compute fill height based on how many steps are in-view
        var inViewCount = document.querySelectorAll('.rail-step.in-view').length;
        if (railFill){
          var pct = (inViewCount / railSteps.length) * 100;
          railFill.style.height = pct + '%';
        }
      }, { threshold:.4 });
      railSteps.forEach(function(s){ stepObserver.observe(s); });
    }
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    q && q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- animated counters ---------- */
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var started = false;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting && !started){
          started = true;
          var start = 0, duration = 1200, startTime = null;
          function step(ts){
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      });
    }, { threshold:.6 });
    obs.observe(el);
  });

});

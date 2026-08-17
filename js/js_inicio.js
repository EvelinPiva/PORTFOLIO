/**
 * ==========================================================================
 * PORTFÓLIO EVELIN - SCRIPTS E ANIMAÇÕES
 * Animação de Scroll (Fade In), Navegação Dinâmica e Interatividade
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ANIMAÇÃO DE FADE IN CONFORME ROLA A PÁGINA (INTERSECTION OBSERVER)
  initScrollAnimations();

  // 2. HEADER DINÂMICO & NAVEGAÇÃO
  initNavbar();

  // 3. FILTRO DE PROJETOS
  initProjectFilters();

  // 4. BOTÃO VOLTAR AO TOPO
  initBackToTop();

  // 5. FORMULÁRIO DE CONTATO (FEEDBACK INTERATIVO)
  initContactForm();

  // 6. EFEITO DE TILT SUAVE EM CARDS
  initCardHoverEffects();
});

/**
 * Animações de entrada suave (Fade In) ativadas pelo scroll
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.fade-in-scroll');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // Ativa um pouco antes de entrar completamente
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Opcional: Se desejar animar somente uma vez, descomente a linha abaixo:
        // obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Controle de Navbar (Efeito Glassmorphism no Scroll e Menu Mobile)
 */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Transparência e Sombra no Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Destaque de link ativo de acordo com a seção visível
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Toggle do Menu Mobile
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Filtro de projetos/vídeos por categoria.
 * Cada ".filter-group" (ex: seção de Projetos, seção de Vídeos) é tratado
 * de forma independente, então múltiplos filtros podem existir na mesma
 * página sem que um afete o outro.
 */
function initProjectFilters() {
  const groups = document.querySelectorAll('.filter-group');

  groups.forEach(group => {
    const filterBtns = group.querySelectorAll('.filter-btn');
    const cards = group.querySelectorAll('[data-category]');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  });
}

/**
 * Botão Voltar ao Topo
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Feedback amigável para envio de formulário de contato
 */
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnSubmit = contactForm.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;

    btnSubmit.innerHTML = '<span>Enviando...</span>';
    btnSubmit.disabled = true;

    setTimeout(() => {
      btnSubmit.innerHTML = '<span>Mensagem Enviada com Sucesso! ✨</span>';
      btnSubmit.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
      contactForm.reset();

      setTimeout(() => {
        btnSubmit.innerHTML = originalText;
        btnSubmit.style.background = '';
        btnSubmit.disabled = false;
      }, 4000);
    }, 1200);
  });
}

/**
 * Efeito visual sutil de movimento nas cartas
 */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.skill-card, .pillar-item, .contact-card-item');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
}

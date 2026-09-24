/**
 * ==========================================================================
 * CARVALHO GONÇALVES ADVOCACIA E CONSULTORIA JURÍDICA
 * Arquivo de Scripts JavaScript (script.js)
 * Implementação em Vanilla JS puro, leve, modular e totalmente documentada.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------------
     1. SELEÇÃO DE ELEMENTOS DO DOM
     Mapeamento dos elementos principais de interação da página
     -------------------------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const revealElements = document.querySelectorAll(".reveal-item");

  /* --------------------------------------------------------------------------
     2. HEADER DINÂMICO AO ROLAR A PÁGINA
     Adiciona efeito de sombra e fundo translúcido ao rolar mais de 40px
     -------------------------------------------------------------------------- */
  const handleHeaderScroll = () => {
    // Verifica a distância percorrida pelo scroll vertical
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  // Escuta o evento de scroll da janela
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  // Executa uma vez no carregamento para garantir o estado correto caso haja scroll inicial
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     3. CONTROLE DO MENU MOBILE (HAMBÚRGUER)
     Abre e fecha a gaveta de navegação em smartphones e tablets
     -------------------------------------------------------------------------- */
  if (mobileToggle && navMenu) {
    // Alterna o estado ativo do botão hambúrguer e do menu ao clicar
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Atualiza atributo de acessibilidade aria-expanded
      const isExpanded = mobileToggle.classList.contains("active");
      mobileToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });

    // Fecha o menu móvel ao clicar em qualquer um dos links de navegação
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Fecha o menu móvel ao clicar fora da área de navegação
    document.addEventListener("click", (event) => {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains("active")) {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO CONFORME O SCROLL
     Identifica em qual seção o usuário está e ilumina o item no menu
     -------------------------------------------------------------------------- */
  const highlightActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120; // Offset para compensar o header

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightActiveNavLink, { passive: true });

  /* --------------------------------------------------------------------------
     5. ANIMAÇÃO SUAVE DE ENTRADA DOS ELEMENTOS (SCROLL REVEAL)
     Utiliza IntersectionObserver nativo para performance máxima sem plugins
     -------------------------------------------------------------------------- */
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Se o elemento entrou no campo de visão, adiciona a classe de revelação
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Para de observar o elemento já animado
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12, // Aciona quando 12% do elemento estiver visível
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Observa todos os elementos marcados para animação
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: se o navegador não suportar IntersectionObserver, revela todos
    revealElements.forEach((el) => el.classList.add("revealed"));
  }
});

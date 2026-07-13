const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initializeIcons() {
  if (!window.lucide) return false;
  window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  return true;
}

function initializeNavigation() {
  const button = document.querySelector(".atlas-menu-button");
  const navigation = document.querySelector(".atlas-nav");
  if (!button || !navigation) return;

  const closeNavigation = () => {
    navigation.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
  };

  button.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !button.contains(event.target)) closeNavigation();
  });
}

function initializeAtlasSearch() {
  const triggers = [...document.querySelectorAll("[data-atlas-ask-trigger]")];
  const dialog = document.querySelector("#atlas-command-dialog");
  const closeButton = document.querySelector("#atlas-command-close");
  const form = document.querySelector("#atlas-ask-form");
  const input = document.querySelector("#atlas-query");
  if (!triggers.length || !dialog || !closeButton || !form || !input) return;

  let activeTrigger = triggers[0];

  const openDialog = () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    window.requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  };

  const closeDialog = () => {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    activeTrigger.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      activeTrigger = trigger;
      openDialog();
    });
  });
  closeButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    let destination = "./ai-apps.html";

    if (/release|2608|what'?s new|roadmap/.test(query)) {
      destination = "./ai-release-watch.html";
    } else if (/btp|build|extend|builder|joule studio|document ai|ai core|generative ai hub|custom/.test(query)) {
      destination = "./ai-btp-foundation.html";
    } else if (/assistant|role assistant|process assistant/.test(query)) {
      destination = "./ai-joule-assistants.html";
    } else if (/agent|agentic/.test(query)) {
      destination = "./ai-joule-agents.html";
    } else if (/joule|capability|integration|skill/.test(query)) {
      destination = "./ai-joule-capabilities.html";
    } else if (/adopt|govern|public|private|edition|entitlement|license|readiness/.test(query)) {
      destination = "./ai-adoption-governance.html";
    }

    window.location.assign(destination);
  });
}

function initializePathMotion() {
  const paths = document.querySelector(".atlas-paths");
  const links = [...document.querySelectorAll(".atlas-path-grid a")];
  if (!paths || !links.length) return;

  links.forEach((link, index) => link.style.setProperty("--path-index", index));

  const reveal = () => paths.classList.add("is-visible");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
  } else {
    paths.classList.add("motion-enabled");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold: 0.08 }
    );
    observer.observe(paths);
  }

  paths.addEventListener("pointermove", (event) => {
    const rect = paths.getBoundingClientRect();
    paths.style.setProperty("--path-pointer-x", `${event.clientX - rect.left}px`);
    paths.style.setProperty("--path-pointer-y", `${event.clientY - rect.top}px`);
  });
}

function initializeBrandMotion() {
  const art = document.querySelector(".atlas-hero-art");
  if (!art || prefersReducedMotion.matches) return;
  art.classList.add("motion-ready");
}

if (!initializeIcons()) {
  window.addEventListener("load", initializeIcons, { once: true });
}
initializeNavigation();
initializeAtlasSearch();
initializePathMotion();
initializeBrandMotion();

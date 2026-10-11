(() => {
  "use strict";

  const toc = document.querySelector(".article-toc nav");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const items = links.map((link) => {
    const rawId = link.getAttribute("href").slice(1);
    let id = rawId;
    try { id = decodeURIComponent(rawId); } catch (_) {}
    const heading = document.getElementById(id);
    return heading ? { link, heading } : null;
  }).filter(Boolean);

  if (!items.length) return;

  function setActive(activeItem) {
    items.forEach(({ link, heading }) => {
      const active = heading === activeItem;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActiveFromScroll() {
    const activationLine = 150;
    let active = items[0];

    for (const item of items) {
      if (item.heading.getBoundingClientRect().top <= activationLine) active = item;
      else break;
    }

    setActive(active.heading);
  }

  toc.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const item = items.find(({ link: itemLink }) => itemLink === link);
    if (item) setActive(item.heading);
  });

  const hash = window.location.hash.slice(1);
  let initial = null;
  if (hash) {
    let id = hash;
    try { id = decodeURIComponent(hash); } catch (_) {}
    initial = items.find(({ heading }) => heading.id === id);
  }

  if (initial) setActive(initial.heading);
  else updateActiveFromScroll();

  window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
  window.addEventListener("resize", updateActiveFromScroll, { passive: true });
})();
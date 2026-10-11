(() => {
  "use strict";

  const toc = document.querySelector(".article-toc nav");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const items = links.map((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    const heading = document.getElementById(id);
    return heading ? { link, heading } : null;
  }).filter(Boolean);

  if (!items.length) return;

  const setActive = (activeItem) => {
    items.forEach(({ link, heading }) => {
      const active = heading === activeItem;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      const firstVisible = items.find(({ heading }) => visible.has(heading));
      if (firstVisible) setActive(firstVisible.heading);
    }, {
      rootMargin: "-12% 0px -72% 0px",
      threshold: 0
    });

    items.forEach(({ heading }) => observer.observe(heading));
  }

  toc.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const item = items.find(({ link: itemLink }) => itemLink === link);
    if (item) setActive(item.heading);
  });

  const currentHash = decodeURIComponent(window.location.hash.slice(1));
  const initialItem = items.find(({ heading }) => heading.id === currentHash);
  if (initialItem) setActive(initialItem.heading);
})();

(() => {
  "use strict";
  const depth = document.getElementById("quick-depth");
  const rate = document.getElementById("quick-rate");
  const total = document.getElementById("quick-total");
  if (!depth || !rate || !total) return;
  const money = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2
  });
  const calculate = () => {
    const d = Math.max(0, Number(depth.value) || 0);
    const r = Math.max(0, Number(rate.value) || 0);
    total.textContent = money.format(d * r);
  };
  depth.addEventListener("input", calculate);
  rate.addEventListener("input", calculate);
  calculate();
})();
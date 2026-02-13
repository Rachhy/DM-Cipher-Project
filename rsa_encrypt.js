
function modPow(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);

  let result = 1n;
  base = base % mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function rsaEncryptText() {
  const text = document.getElementById("wow").value;
  const eVal = document.getElementById("key-e").value.trim();
  const nVal = document.getElementById("mod-n").value.trim();
  const out = document.getElementById("result-rsa-e");

  if (!text) {
    out.value = "Please enter text.";
    return;
  }
  if (!eVal || !nVal) {
    out.value = "Please enter e and n.";
    return;
  }

  const e = BigInt(eVal);
  const n = BigInt(nVal);
  if (BigInt(nVal) <= 255n) {
  out.value = "n is too small. Use bigger primes so n > 255.";
  return;}

  // encrypt each character ASCII code
  let cipherParts = [];
  for (let i = 0; i < text.length; i++) {
    const m = BigInt(text.charCodeAt(i)); // ASCII
    const c = modPow(m, e, n);
    cipherParts.push(c.toString().padStart(2, "0"));
  }

  out.value = cipherParts.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnRSAEncrypt");
  if (btn) btn.addEventListener("click", rsaEncryptText);
});

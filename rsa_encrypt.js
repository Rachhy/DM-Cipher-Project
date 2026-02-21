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

  if (!text) { out.value = "Please enter text."; return; }
  if (!eVal || !nVal) { out.value = "Please enter e and n."; return; }

  let e, n;
  try {
    e = BigInt(eVal);
    n = BigInt(nVal);
  } catch {
    out.value = "Invalid e or n (must be integers).";
    return;
  }

  if (n <= 255n) {
    out.value = "n is too small. Use bigger primes so n > 255.";
    return;
  }

  // Encrypt each character code (ASCII/UTF-16 code units)
  const cipherParts = [];
  for (let i = 0; i < text.length; i++) {
    const m = BigInt(text.charCodeAt(i));
    if (m >= n) {
      out.value = `Character code ${m} is >= n. Use bigger n.`;
      return;
    }
    const c = modPow(m, e, n);
    cipherParts.push(c.toString());
  }

  // Use a separator so it can be decoded later
  out.value = cipherParts.join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnRSAEncrypt");
  if (btn) btn.addEventListener("click", rsaEncryptText);
});

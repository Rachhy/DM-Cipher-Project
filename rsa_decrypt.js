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

function rsaDecryptText() {
  const cipherText = document.getElementById("t-rsa-d").value.trim();
  const dVal = document.getElementById("key-d").value.trim();
  const nVal = document.getElementById("mod-n-d").value.trim();
  const out = document.getElementById("result-rsa-d");

  if (!cipherText) {
    out.value = "Please enter cipher numbers (space separated).";
    return;
  }
  if (!dVal || !nVal) {
    out.value = "Please enter d and n.";
    return;
  }

  const d = BigInt(dVal);
  const n = BigInt(nVal);

  const parts = cipherText.split(/\s+/);
  let plain = "";

  for (const part of parts) {
    if (!part) continue;
    const c = BigInt(part);
    const m = modPow(c, d, n);
    plain += String.fromCharCode(Number(m));
  }

  out.value = plain;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnRSADecrypt");
  if (btn) btn.addEventListener("click", rsaDecryptText);
});

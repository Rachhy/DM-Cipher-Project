function isPrimeRSA(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function modInverseRSA(a, m) {
  a = ((a % m) + m) % m;
  let t = 0, newT = 1;
  let r = m, newR = a;

  while (newR !== 0) {
    const q = Math.floor(r / newR);
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }
  if (r !== 1) return null;
  if (t < 0) t += m;
  return t;
}

function generateRSAKey() {
  const pVal = document.getElementById("keygenp").value.trim();
  const qVal = document.getElementById("keygenq").value.trim();
  const out = document.getElementById("keyrsa");

  const p = Number(pVal);
  const q = Number(qVal);

  if (!Number.isInteger(p) || !Number.isInteger(q)) {
    out.value = "Please enter valid integer numbers for p and q.";
    return;
  }
  if (!isPrimeRSA(p) || !isPrimeRSA(q)) {
    out.value = "p and q must be prime numbers.";
    return;
  }
  if (p === q) {
    out.value = "p and q must be different primes.";
    return;
  }

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let d = p;
  if (d <= 1 || d >= phi || gcd(d, phi) !== 1) {
    d = 3;
    while (d < phi && gcd(d, phi) !== 1) d += 2;
  }

  const e = modInverseRSA(d, phi);
  if (e === null) {
    out.value = "Cannot find valid keys. Try different primes.";
    return;
  }

  out.value = `Public Key: (e: ${e}, n: ${n}) \n Private Key: (d: ${d}, n: ${n})`;
}

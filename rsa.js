// ---------- BigInt helpers ----------
function toBigIntStrict(s) {
  // allow only digits (no decimals, no signs)
  if (!/^\d+$/.test(s)) return null;
  return BigInt(s);
}

function gcdBigInt(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modInverseRSA(a, m) {
  // Extended Euclid (BigInt)
  a = ((a % m) + m) % m;

  let t = 0n, newT = 1n;
  let r = m, newR = a;

  while (newR !== 0n) {
    const q = r / newR; // BigInt division
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }

  if (r !== 1n) return null; // not invertible
  if (t < 0n) t += m;
  return t;
}

// Simple prime test (OK for ~1e9..1e12 range; not for huge RSA primes)
function isPrimeRSA(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  // 6k ± 1 optimization
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

// ---------- Key generation ----------
function generateRSAKey() {
  const pVal = document.getElementById("keygenp").value.trim();
  const qVal = document.getElementById("keygenq").value.trim();
  const out = document.getElementById("keyrsa");

  const p = toBigIntStrict(pVal);
  const q = toBigIntStrict(qVal);

  if (p === null || q === null) {
    out.value = "Please enter valid integer numbers (digits only) for p and q.";
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
  const phi = (p - 1n) * (q - 1n);

  // Choose public exponent e (common choice)
  let e = 65537n;
  if (e >= phi) e = 3n;

  // Make sure gcd(e, phi) = 1
  while (e < phi && gcdBigInt(e, phi) !== 1n) {
    e += 2n;
  }

  const d = modInverseRSA(e, phi);
  if (d === null) {
    out.value = "Cannot find valid keys. Try different primes.";
    return;
  }

  out.value =
    `Public Key:  (e: ${e.toString()}, n: ${n.toString()})\n` +
    `Private Key: (d: ${d.toString()}, n: ${n.toString()})`;
}

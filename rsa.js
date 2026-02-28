// ---------- BigInt helpers ----------
function toBigIntStrict(s) {
  if (!/^\d+$/.test(s)) return null;
  return BigInt(s);
}

function gcdBigInt(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function modInverseRSA(a, m) {
  a = ((a % m) + m) % m;

  let t = 0n, newT = 1n;
  let r = m, newR = a;

  while (newR !== 0n) {
    const q = r / newR;
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }

  if (r !== 1n) return null;
  if (t < 0n) t += m;
  return t;
}

// ---------- Fast primality test (Miller–Rabin) ----------
function modPow(base, exp, mod) {
  base %= mod;
  let result = 1n;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

// Deterministic for n < 2^64 with these bases.
// For bigger n, it's still a strong probabilistic test.
const MR_BASES_64 = [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n];

function isPrimeRSA(n) {
  if (n < 2n) return false;

  // quick small prime checks
  const smallPrimes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const p of smallPrimes) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }

  // write n-1 = d * 2^s
  let d = n - 1n;
  let s = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s++;
  }

  // choose bases
  // If n < 2^64, MR_BASES_64 is deterministic.
  // Otherwise, we still use them as a strong test.
  for (let a of MR_BASES_64) {
    a %= n;
    if (a === 0n) continue;

    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
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

  if (p === q) {
    out.value = "p and q must be different primes.";
    return;
  }

  if (!isPrimeRSA(p) || !isPrimeRSA(q)) {
    out.value = "p and q must be prime numbers.";
    return;
  }

  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  // Choose public exponent e (common choice)
  let e = 65537n;
  if (e >= phi) e = 3n;

  // Ensure gcd(e, phi) = 1
  while (e < phi && gcdBigInt(e, phi) !== 1n) {
    e += 2n;
  }

  if (e >= phi) {
    out.value = "Cannot find valid public exponent e. Try different primes.";
    return;
  }

  // private exponent d
  const d = modInverseRSA(e, phi);
  if (d === null) {
    out.value = "Cannot find valid keys. Try different primes.";
    return;
  }

  out.value =
    `Public Key:  (e: ${e.toString()}, n: ${n.toString()})\n` +
    `Private Key: (d: ${d.toString()}, n: ${n.toString()})`;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function modInverse(a, m) {
  a = mod(a, m);
  for (let x = 1; x < m; x++) {
    if (mod(a * x, m) === 1) return x;
  }
  return null;
}

function encryptTexta() {
  const text = document.getElementById("texta").value;
  const a = parseInt(document.getElementById("keyA").value, 10);
  const b = parseInt(document.getElementById("keyB").value, 10);

  if (!text) {
    alert("Please enter text.");
    return;
  }
  if (isNaN(a) || isNaN(b)) {
    alert("Please enter both Key A and Key B.");
    return;
  }
  if (gcd(a, 26) !== 1) {
    alert("Key A must be coprime with 26 (1,3,5,7,9,11,15,17,19,21,23,25).");
    return;
  }

  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch >= "A" && ch <= "Z") {
      const x = ch.charCodeAt(0) - 65;
      const y = mod(a * x + b, 26);
      out += String.fromCharCode(y + 65);
    } else if (ch >= "a" && ch <= "z") {
      const x = ch.charCodeAt(0) - 97;
      const y = mod(a * x + b, 26);
      out += String.fromCharCode(y + 97);
    } else {
      out += ch;
    }
  }

  document.getElementById("resulta").value = out;
}

function decryptTexta() {
  const text = document.getElementById("texta").value;
  const a = parseInt(document.getElementById("keyA").value, 10);
  const b = parseInt(document.getElementById("keyB").value, 10);

  if (!text) {
    alert("Please enter text.");
    return;
  }
  if (isNaN(a) || isNaN(b)) {
    alert("Please enter both Key A and Key B.");
    return;
  }
  if (gcd(a, 26) !== 1) {
    alert("Key A must be coprime with 26 to decrypt.");
    return;
  }

  const aInv = modInverse(a, 26);
  if (aInv === null) {
    alert("Key A has no inverse mod 26. Choose another Key A.");
    return;
  }

  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch >= "A" && ch <= "Z") {
      const y = ch.charCodeAt(0) - 65;
      const x = mod(aInv * (y - b), 26);
      out += String.fromCharCode(x + 65);
    } else if (ch >= "a" && ch <= "z") {
      const y = ch.charCodeAt(0) - 97;
      const x = mod(aInv * (y - b), 26);
      out += String.fromCharCode(x + 97);
    } else {
      out += ch;
    }
  }

  document.getElementById("resulta").value = out;
}

function bruteForceAffine() {
  const text = document.getElementById("texta").value;
  if (!text) {
    alert("Please enter text.");
    return;
  }

  const validA = [1,3,5,7,9,11,15,17,19,21,23,25];
  let output = "";

  for (const a of validA) {
    const aInv = modInverse(a, 26);
    for (let b = 0; b < 26; b++) {
      let out = "";

      for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (ch >= "A" && ch <= "Z") {
          const y = ch.charCodeAt(0) - 65;
          const x = mod(aInv * (y - b), 26);
          out += String.fromCharCode(x + 65);
        } else if (ch >= "a" && ch <= "z") {
          const y = ch.charCodeAt(0) - 97;
          const x = mod(aInv * (y - b), 26);
          out += String.fromCharCode(x + 97);
        } else {
          out += ch;
        }
      }

      output += `a=${a}, b=${b} => ${out}\n`;
    }
  }

  document.getElementById("resulta").value = output;
}

function encryptText() {
    const text = document.getElementById("text").value;
    const shift = 3;
    let result = "";

    if (isNaN(shift)) {
        alert("Please enter a valid shift number");
        return;
    }

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode(
                (char.charCodeAt(0) - 65 + shift) % 26 + 65
            );
        }
        else if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode(
                (char.charCodeAt(0) - 97 + shift) % 26 + 97
            );
        }
        else {
            result += char;
        }
    }

    document.getElementById("result").value = result;
}

function decryptText() {
    const text = document.getElementById("text").value;
    const shift = 3;
    let result = "";

    if (isNaN(shift)) {
        alert("Please enter a valid shift number");
        return;
    }

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode(
                (char.charCodeAt(0) - 65 - shift + 26) % 26 + 65
            );
        }
        else if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode(
                (char.charCodeAt(0) - 97 - shift + 26) % 26 + 97
            );
        }
        else {
            result += char;
        }
    }

    document.getElementById("result").value = result;
}

function encryptTexts() {
    const text = document.getElementById("texts").value;
    const shift = parseInt(document.getElementById("shifts").value);
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

    document.getElementById("results").value = result;
}

function decryptTexts() {
    const text = document.getElementById("texts").value;
    const shift = parseInt(document.getElementById("shifts").value);
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

    document.getElementById("results").value = result;
}

function decryptTextsf() {
    const text = document.getElementById("texts").value;
    let output = "";

    for (let shift = 1; shift < 26; shift++) {
        let result = "";

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

        output += "Shift " + shift + ": " + result + "\n";
    }

    document.getElementById("results").value = output;
}

function encryptTextt() {
    const text = document.getElementById("textt").value.replace(/\s+/g, "");
    const key = parseInt(document.getElementById("shiftt").value);
    let result = "";

    if (isNaN(key) || key <= 0) {
        alert("Enter a valid column number");
        return;
    }

    const rows = Math.ceil(text.length / key);

    let grid = [];
    let index = 0;
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < key; c++) {
            grid[r][c] = text[index] ? text[index] : 'X';
            index++;
        }
    }

    for (let c = 0; c < key; c++) {
        for (let r = 0; r < rows; r++) {
            result += grid[r][c];
        }
    }

    document.getElementById("resultt").value = result;
}

function decryptTextt() {
    const cipher = document.getElementById("resultt").value.replace(/\s+/g, "");
    const key = parseInt(document.getElementById("shiftt").value);
    let result = "";

    if (isNaN(key) || key <= 0) {
        alert("Enter a valid column number");
        return;
    }

    const rows = Math.ceil(cipher.length / key);

    let grid = Array.from({ length: rows }, () => Array(key));
    let index = 0;

    for (let c = 0; c < key; c++) {
        for (let r = 0; r < rows; r++) {
            grid[r][c] = cipher[index++];
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < key; c++) {
            result += grid[r][c];
        }
    }

    document.getElementById("resultt").value = result;
}

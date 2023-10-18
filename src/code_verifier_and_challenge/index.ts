// ======================
// Generate Code Verifier
// ======================

function generateRandomString() {
    function decToHex(dec: number) {
        const hexString = dec.toString(16); // Radix (range 2-36); base 16 represents hexadecimal
        return hexString.substring(hexString.length - 2); // returns last 2 char of string
    }
    
    const arr = new Uint32Array(64); // (<array length>); array of 32-bit unsigned int, contents initialized to 0 
    window.crypto.getRandomValues(arr); // (<int based TypeArray>); contents replaced with newly generated random numbers

    return Array.from(arr, decToHex).join(''); 
    // Array.from() returns a copy with mapFn applied to every element of array
    // .join('') returns new string by concatenating all of the elements in this array, separated by specified ''
}

const codeVerifier = generateRandomString();

// ============================
// SHA256 Hash (in hexadecimal)
// ============================

async function sha256Hex(plain: string) {
    const data = new TextEncoder().encode(plain); // Takes a string as input, and returns a Uint8Array containing UTF-8 encoded text
    const buffer = await window.crypto.subtle.digest('SHA-256', data); 
    // digest(algorithm, data)
    // data - an ArrayBuffer, a TypedArray or a DataView object
    // returns a promise that fulfills with an ArrayBuffer containing the digest
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0')) // pads this string with another string (multiple times, if needed) until the resulting string reaches the given length
        .join('');
    return hashHex;
}

// ==========================
// SHA256 Hash (in Base64Url)
// ==========================

async function sha256Base64Url(plain: string) {
    const data = new TextEncoder().encode(plain);
    const buffer = await window.crypto.subtle.digest('SHA-256', data);
    let str = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength; // returns the length (in bytes) of this typed array
    for (let i = 0; i < length; i++) {
        str += String.fromCharCode(bytes[i]); // returns a string created from the specified sequence of UTF-16 code units
    }
    return btoa(str)             // creates a Base64-encoded ASCII string
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, ''); // Regex base64 to base64Url
}

// ======================================
// Generate Code Challenge (in Base64Url)
// ======================================

async function generateChallenge(verifier: string) {
    const hasedInHex = await sha256Hex(verifier);
    const hasedInBase64Url = await sha256Base64Url(verifier);
    return {
        hexadecimal: hasedInHex,
        base64Url: hasedInBase64Url,
    }
}

const codeChallenge = generateChallenge(codeVerifier);

export { codeVerifier, codeChallenge };
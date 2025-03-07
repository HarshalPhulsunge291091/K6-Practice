/////New User Data/////
export function generateFirstName() {
    return `TestFirstname${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

export function generateLastName() {
    return `TestLastname${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

export function generateUserName() {
    return `Test${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

export function generateEmail() {
    return `Test${Date.now()}@gmail.com`;
}

export function generatePassword() {
    return `TestPass${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}
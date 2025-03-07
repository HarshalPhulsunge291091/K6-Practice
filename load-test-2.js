import http from 'k6/http';
import { check, sleep } from 'k6';

// Base URL for the API
const BASE_URL = 'https://test-api.k6.io'; // No trailing slash

export let options = {
    stages: [
        { duration: '10s', target: 10 },  // Ramp up to 10 VUs in 10 seconds
        { duration: '10s', target: 10 },  // Stay at 10 VUs for 10 seconds
        { duration: '5s', target: 1 },    // Ramp down to 0 VUs in 5 seconds

        { duration: '10s', target: 10 },  
        { duration: '10s', target: 10 },  
        { duration: '5s', target: 1 },    

        { duration: '10s', target: 10 },  
        { duration: '10s', target: 10 },  
        { duration: '5s', target: 2 },    
    ],
};

export let thresholds = {
    'http_req_duration': ['p(95)<500'], // 95% of requests must complete in <500ms
    'http_req_failed': ['rate<0.01'],   // Less than 1% failures allowed
};

function generateFirstName() {
    return `TestFirstname${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

function generateLastName() {
    return `TestLastname${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

function generateUserName() {
    return `Test${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

function generateEmail() {
    return `Test${Date.now()}@gmail.com`;
}

function generatePassword() {
    return `TestPass${Date.now()}`;  // Generates "Test" + current timestamp (milliseconds)
}

// Default function for k6
export default function () {
    // Request to /my/crocodiles/
    let response1 = http.get(`${BASE_URL}/my/crocodiles/`);
    check(response1, {
        'status is 200 for /my/crocodiles/': (r) => r.status === 200,
        'response time < 500ms for /my/crocodiles/': (r) => r.timings.duration < 500,
    });

    // Request to /public/crocodiles/
    let response2 = http.get(`${BASE_URL}/public/crocodiles/`);
    check(response2, {
        'status is 200 for /public/crocodiles/': (r) => r.status === 200,
        'response time < 500ms for /public/crocodiles/': (r) => r.timings.duration < 500,
    });

    //Create user
    const first_name = generateFirstName();
    const last_name = generateLastName();
    const username = generateUserName();
    const email = generateEmail();
    const password = generatePassword();
    const Url = `${BASE_URL}/user/register/`;
    const payloadCreateUser = JSON.stringify({
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password
    });
    const paramscreateuser = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response3 = http.post(Url, payloadCreateUser, paramscreateuser);
    check(response3, {
        'User Created Status is 201': (r) => r.status === 201,
        'Session cookie is set': (r) => r.cookies['sessionid'] !== undefined,
    });
    console.log(`🔹 Trying to register user: ${username}, Email: ${email}, Password: ${password}`);


    // Login request
    const loginUrl = `${BASE_URL}/auth/cookie/login/`;
    const payload = JSON.stringify({
        username: username, // Replace with valid username
        password: password   // Replace with valid password
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response4 = http.post(loginUrl, payload, params);
    check(response4, {
        'Login status is 200': (r) => r.status === 200,
        'Session cookie is set': (r) => r.cookies['sessionid'] !== undefined,
    });

    // Simulate real user behavior with a small pause
    sleep(1);
}

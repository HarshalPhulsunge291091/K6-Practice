import http from 'k6/http';
import { check } from 'k6';

// Define the target URL base (replace with your actual API base URL)
const BASE_URL = 'https://test-api.k6.io/'; // Replace this with your actual base URL

export let options = {
    vus: 5,         // Number of virtual users
    duration: '5s',  // Duration of the test
  };

// The main function for the test
export default function () {
  // Define the endpoint to call
  const endpoint = '/public/crocodiles/';
  
  // Make a GET request to the endpoint
  const response = http.get(BASE_URL + endpoint);

  // Check that the request was successful (status code 200)
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 500ms': (r) => r.timings.duration < 500,
  });
}
  export default function () {
    // Define the endpoint to call
    const endpoint = '/my/crocodiles/';
    
    // Make a GET request to the endpoint
    const response = http.get(BASE_URL + endpoint);
  
    // Check that the request was successful (status code 200)
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time is less than 500ms': (r) => r.timings.duration < 500,
    });

  }


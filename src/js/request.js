function request() {
  const url = 'https://example.amocrm.ru/api/v4/catalogs';

  // Fetch request with GET method
  fetch(url)
    .then((response) => {
      // Check if response status is OK (200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON data returned by the server
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
}

export default request;

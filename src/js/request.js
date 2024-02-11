function request() {
  fetch('example', {
    method: 'GET',
    body: null,
    headers: { 'Content-type': 'application/JSON' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Here 'data' will contain the parsed JSON from example.json
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error);
    });
}

export default request;

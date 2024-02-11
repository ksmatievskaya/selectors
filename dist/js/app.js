fetch('../../example.json', {
  method: 'GET',
  body: null,
  headers: {
    'Content-type': 'application/JSON'
  }
}).then(function (response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}).then(function (data) {
  console.log(data);
  // выбираем первоначальные значения
  var firstKey = Object.keys(data)[0];
  var firstKeyOfFirstKey = Object.keys(data[firstKey])[0];
  console.log('First key:', firstKey);
  // выбираем селекты, в которые будет помещаться дата
  var seasonSelect = document.getElementById('season');
  var serieSelect = document.getElementById('serie');
  var voiceSelect = document.getElementById('voice');

  // Очищаем предыдущие значения селектов
  seasonSelect.innerHTML = '';
  serieSelect.innerHTML = '';
  voiceSelect.innerHTML = '';
  for (var season in data) {
    // создаем options для сезонов
    var seasonOption = document.createElement('option');
    seasonOption.value = season;
    seasonOption.textContent = "".concat(season, " \u0441\u0435\u0437\u043E\u043D");
    seasonSelect.appendChild(seasonOption);
  }
  serieSelect.innerHTML = '';
  voiceSelect.innerHTML = '';
  for (var serie in data[firstKey]) {
    // Options серий для первого сезона (чтоб по дефолту выбиралось)
    var serieOption = document.createElement('option');
    serieOption.value = serie;
    serieOption.textContent = "".concat(serie, " \u0441\u0435\u0440\u0438\u044F");
    serieSelect.appendChild(serieOption);
  }
  for (var voice in data[firstKey][firstKeyOfFirstKey]) {
    var voiceText = voice.split('#')[1];

    // Options озвучек  для первого сезона и первой серии (чтоб по дефолту выбиралось)
    var voiceOption = document.createElement('option');
    voiceOption.value = data[firstKey][firstKeyOfFirstKey][voice];
    voiceOption.textContent = voiceText;
    voiceSelect.appendChild(voiceOption);
  }

  // Триггерим изменение сезона
  seasonSelect.dispatchEvent(new Event('change'));

  // слушатель изменений сезона
  seasonSelect.addEventListener('change', function () {
    var selectedSeason = seasonSelect.value;
    serieSelect.innerHTML = '';
    voiceSelect.innerHTML = '';
    for (var _serie in data[selectedSeason]) {
      // добавляем нужные options серий для выбранного сезона
      var _serieOption = document.createElement('option');
      _serieOption.value = _serie;
      _serieOption.textContent = "".concat(_serie, " \u0441\u0435\u0440\u0438\u044F");
      serieSelect.appendChild(_serieOption);
    }

    // триггерим изменения серии
    serieSelect.dispatchEvent(new Event('change'));
  });

  // слушатель изменений серии
  serieSelect.addEventListener('change', function () {
    var selectedSeason = seasonSelect.value;
    var selectedSerie = serieSelect.value;
    voiceSelect.innerHTML = '';
    for (var _voice in data[selectedSeason][selectedSerie]) {
      var _voiceText = _voice.split('#')[1];

      // options доступных озвучек для выбранной серии
      var _voiceOption = document.createElement('option');
      _voiceOption.value = data[selectedSeason][selectedSerie][_voice];
      _voiceOption.textContent = _voiceText;
      voiceSelect.appendChild(_voiceOption);
    }
  });
}).catch(function (error) {
  console.error('There was a problem fetching the data:', error);
});
fetch('../../example.json', {
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
    console.log(data);
    // выбираем первоначальные значения
    const firstKey = Object.keys(data)[0];
    const firstKeyOfFirstKey = Object.keys(data[firstKey])[0];
    console.log('First key:', firstKey);
    // выбираем селекты, в которые будет помещаться дата
    const seasonSelect = document.getElementById('season');
    const serieSelect = document.getElementById('serie');
    const voiceSelect = document.getElementById('voice');

    // Очищаем предыдущие значения селектов
    seasonSelect.innerHTML = '';
    serieSelect.innerHTML = '';
    voiceSelect.innerHTML = '';

    for (const season in data) {
      // создаем options для сезонов
      const seasonOption = document.createElement('option');
      seasonOption.value = season;
      seasonOption.textContent = `${season} сезон`;
      seasonSelect.appendChild(seasonOption);
    }

    serieSelect.innerHTML = '';
    voiceSelect.innerHTML = '';

    for (const serie in data[firstKey]) {
      // Options серий для первого сезона (чтоб по дефолту выбиралось)
      const serieOption = document.createElement('option');
      serieOption.value = serie;
      serieOption.textContent = `${serie} серия`;
      serieSelect.appendChild(serieOption);
    }

    for (const voice in data[firstKey][firstKeyOfFirstKey]) {
      const voiceText = voice.split('#')[1];

      // Options озвучек  для первого сезона и первой серии (чтоб по дефолту выбиралось)
      const voiceOption = document.createElement('option');
      voiceOption.value = data[firstKey][firstKeyOfFirstKey][voice];
      voiceOption.textContent = voiceText;
      voiceSelect.appendChild(voiceOption);
    }

    // Триггерим изменение сезона
    seasonSelect.dispatchEvent(new Event('change'));

    // слушатель изменений сезона
    seasonSelect.addEventListener('change', () => {
      const selectedSeason = seasonSelect.value;

      serieSelect.innerHTML = '';
      voiceSelect.innerHTML = '';

      for (const serie in data[selectedSeason]) {
        // добавляем нужные options серий для выбранного сезона
        const serieOption = document.createElement('option');
        serieOption.value = serie;
        serieOption.textContent = `${serie} серия`;
        serieSelect.appendChild(serieOption);
      }

      // триггерим изменения серии
      serieSelect.dispatchEvent(new Event('change'));
    });

    // слушатель изменений серии
    serieSelect.addEventListener('change', () => {
      const selectedSeason = seasonSelect.value;
      const selectedSerie = serieSelect.value;

      voiceSelect.innerHTML = '';

      for (const voice in data[selectedSeason][selectedSerie]) {
        const voiceText = voice.split('#')[1];

        // options доступных озвучек для выбранной серии
        const voiceOption = document.createElement('option');
        voiceOption.value = data[selectedSeason][selectedSerie][voice];
        voiceOption.textContent = voiceText;
        voiceSelect.appendChild(voiceOption);
      }
    });
  })
  .catch((error) => {
    console.error('There was a problem fetching the data:', error);
  });

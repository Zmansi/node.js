
function Weather() {
}

Weather.prototype.fetchResults = function (val) {
  return fetch(`https://jsonmock.hackerrank.com/api/weather?name=${val}`)
    .then(data => data.json())
    .then(data => this.weatherResults = data);
}

Weather.prototype.onKeyup = function (e) {
  clearTimeout(this.timer);
  this.timer = setTimeout(() => {
    this.updateSuggestions(e.target.value)
  }, 1000)
}

Weather.prototype.updatecitySelect = function (result) {
  const { name, weather, status } = result;
  this.$city.value = name;
  this.$suggestions.style.display = 'none';
  this.$selectedCity.innerHTML = name;
  this.$selctedWeather.innerHTML = weather;
  this.$selectedStatus.innerHTML = status.join(',');
}

Weather.prototype.updateSuggestions = function (city) {
  this.$suggestions.style.display = 'block';
  this.fetchResults(city).then((res) => {
    this.weatherResults = res.data;
    if (this.weatherResults.length > 0) {
      this.$suggestions.innerHTML = '';
      this.weatherResults.map((city) => {
        let newNode = document.createElement('div');
        newNode.className = 'suggestionItem';
        let newContent = document.createTextNode(city.name);
        newNode.addEventListener('click', this.updatecitySelect.bind(this, city))
        newNode.append(newContent);
        this.$suggestions.appendChild(newNode);
      })
    }
    else {
      this.$suggestions.innerHTML = '';
      let newNode = document.createElement('div');
      newNode.className = 'suggestionItem';
      let newContent = document.createTextNode('No results');
      newNode.style.color = 'rgb(255, 0, 0)';
      newNode.append(newContent);
      this.$suggestions.appendChild(newNode);
    }
  });
}

Weather.prototype.reset = function () {
  this.$city.value = '';
  this.$suggestions.style.display = 'block';
  this.$suggestions.innerHTML = '';
  let newNode = document.createElement('div');
  newNode.className = 'suggestionItem';
  let newContent = document.createTextNode('No Info available!');
  newNode.append(newContent);
  this.$suggestions.appendChild(newNode);
  this.$selectedCity.innerHTML = '';
  this.$selctedWeather.innerHTML = '';
  this.$selectedStatus.innerHTML = '';

}

Weather.prototype.init = function () {
  this.timer = null;
  this.weatherResults = [];
  this.$city = document.getElementById('city');
  this.$suggestions = document.getElementById('suggestions');
  this.$selectedInfo = document.getElementById('selectedCityInfo');
  this.$selectedCity = document.getElementById('selectedCity');
  this.$selctedWeather = document.getElementById('selctedWeather');
  this.$selectedStatus = document.getElementById('selectedStatus');
  this.$resetBtn = document.getElementById('resetBtn');
  this.$city.addEventListener('keyup', this.onKeyup.bind(this));
  this.$resetBtn.addEventListener('click', this.reset.bind(this));
}

var weatherApp = new Weather();
weatherApp.init();


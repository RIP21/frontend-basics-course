document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const apiEndpoint = 'http://data.fixer.io/api/latest?access_key=ee5e5428ac75df0a49cb44f93f9f697a';
  const submitButton = document.getElementById('submit');
  let result = document.getElementById('result');
  const swapButton = document.getElementById('swap');
  const input = document.getElementById('input');
  const selectFrom = document.getElementById('selectFrom');
  const selectTo = document.getElementById('selectTo');

  let prevRates = null;

  const getLatestRatesFromApi = () =>
    fetch(apiEndpoint)
    .then(res => res.json())
    .then(res => {
      if (!res.success) throw Error(res.error.info);
      return res.rates;
    })
    .catch(err => alert(`Something went wrong (${err.message}).`));

  const updateRates = (latestRates) => {
    const prev = Object.values(prevRates);
    const latest = Object.values(latestRates);

    let isSomethingUpdated = false;

    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== latest[i]) {
        selectFrom[i].dataset.amount = latest[i];
        selectTo[i].dataset.amount = latest[i];

        isSomethingUpdated = true;
      }
    }

    return isSomethingUpdated;
  }

  const createOptionіHtml = (ratesObj) => Object.entries(ratesObj)
    .reduce((acc, cur) => acc + `<option value="${cur[0]}" data-amount="${cur[1]}">${cur[0]}</option>`, '');

  const isInputValid = (inputText) => /^[0-9.]+$/.test(inputText);


  const setLatestRates = () => getLatestRatesFromApi()
    .then((rates) => {
      if (!prevRates) {
        // for initial set
        const ratesHtml = createOptionіHtml(rates);
        selectFrom.innerHTML = ratesHtml;
        selectTo.innerHTML = ratesHtml;
        prevRates = rates;
      } else {
        return Promise.resolve(updateRates(rates));
      }
    });

  setLatestRates();

  setInterval(() => {
    setLatestRates().then((isSomethingUpdated) => {
      if (isSomethingUpdated && isInputValid(input.value)) calculateRate();
    });
  }, 10000);

  const calculateRate = () => {
    const selectFromValue = parseFloat(selectFrom.selectedOptions[0].dataset.amount);
    const selectToValue = parseFloat(selectTo.selectedOptions[0].dataset.amount);

    result.value = ((selectToValue / selectFromValue) * parseFloat(input.value)).toFixed(4);
  };




  /* Buttons listener */

  submitButton.addEventListener("click", function (event) {
    if (!isInputValid(input.value)) {
      input.value = '';
      return alert('Please enter valid number (only digits and dot are allowed).');
    }
    console.log('loaded');
    calculateRate();
  });

  swapButton.addEventListener('click', () => {
    [selectFrom.value, selectTo.value] = [selectTo.value, selectFrom.value]; // swap two values

    if (isInputValid(input.value)) calculateRate();
  });

});

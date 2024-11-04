renderChartInfo();

//data
async function fetchData() {
  const url = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await url.json();
  return data;
}

function renderChartInfo() {
  const title = document.getElementById("title");
  const ctx = document.getElementById('myChart');

  fetchData().then(data => {
    title.textContent = data.chartName;

    const currencyInfo = [];

    for(currency in data.bpi) {
      currencyInfo.push(data.bpi[currency]);
    }
  
    //add chart with data
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: currencyInfo.map(currency => currency.code),
        datasets: [{
          label: 'Rate',
         data: currencyInfo.map(currency => currency.rate_float),
          borderWidth: 1
        }]
      },
    });

    //print sorted currency in a table
    sortedCurrencyRates(currencyInfo);
  });
}

function sortedCurrencyRates(currency)
{
  const ratesTitle = document.getElementById("rates");
  ratesTitle.textContent = "Currency Rates";
  
  const ratesContainer = document.querySelector(".currency-info");

 const sortedRates = currency.sort((a, b) => a.rate_float - b.rate_float);

sortedRates.map(item => {
  const p = document.createElement("p");
  p.innerHTML = item.symbol + currencyFormatter(Number(item.rate_float).toFixed(2));
  ratesContainer.append(p);
})
 
  return sortedRates;
  
}


function currencyFormatter(number) {
  let formatter = new Intl.NumberFormat("en-US").format(number)
  return formatter;
}
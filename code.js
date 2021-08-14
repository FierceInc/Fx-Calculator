const initialDeposit = document.getElementById("initial_deposit"),
  finalAmount = document.getElementById("final_amount"),
  calculateBtn = document.getElementById("calculate"),
  errorMessage = document.getElementById("err"),
  numWins = document.getElementById("numwins"),
  numLosses = document.getElementById("numlosses"),
  wins = document.getElementById("wins"),
  accountName = document.getElementById("accountName"),
  resultsElement = document.createElement("div"),
  losses = document.getElementById("losses");

document.getElementById("myResults").appendChild(resultsElement);

//Master function
function outputResults() {
  if (finalAmount.value == "") {
    finalAmount.value = 0;
  }
  initial = parseFloat(initialDeposit.value);
  final = parseFloat(finalAmount.value);
  newNumber = final - initial;
  percentage = (newNumber / initial) * 100;
  conditions();
}
// A function to text for errors
function conditions() {
  if (initial > 0) {
    numberOfLosses();
    numberOfWins();
    if (newNumber > 0 && numWins.value == 0) {
      errorFunction();
      errorMessage.innerHTML = `<p class="font">Your final amount does not correlate with your WINS  (You can't make profit with no wins)
              </p>`;
    } else if (newNumber < 0 && numLosses.value == 0) {
      errorFunction();
      errorMessage.innerHTML = `<p class="font">Your final amount does not correlate with your LOSSES (You can't make loss with no losses)
                </p>`;
    } else if (parseInt(numLosses.value) !== newArray.length) {
      errorFunction();
      errorMessage.innerHTML =
        "The number of Losses should be equal to your LOSSES";
      numLosses.style.backgroundColor = "rgba(255, 0, 17, 0.5)";
      setTimeout(() => {
        numLosses.style.backgroundColor = "white";
      }, 4000);
    } else if (newArr.length !== parseInt(numWins.value)) {
      errorFunction();
      errorMessage.innerHTML =
        "The number of wins should be equal to your WINS";
      numWins.style.backgroundColor = "rgba(255, 0, 17, 0.5)";
      setTimeout(() => {
        numLosses.style.backgroundColor = "white";
      }, 4000);
    } else if (
      parseFloat(percentage) > 0 &&
      parseInt(totalForLosses) * -1 > parseInt(totalForWins)
    ) {
      errorFunction();
      errorMessage.innerHTML = `<p class="font">
            You've made more LOSSES than WINS you cannot have a positive balance.
            </p>`;
    } else if (
      parseFloat(percentage) < 0 &&
      parseInt(totalForLosses) * -1 < parseInt(totalForWins)
    ) {
      errorFunction();
      errorMessage.innerHTML = `<p class="font">
            You've made more WINS than LOSSES you cannot have a negative balance.
            </p>`;
    }
    // If none of the conditions are true then return the results
    else printResults();
  } else {
    errorFunction();
    errorMessage.innerHTML =
      "Initial Deposit Cannot be less than ZERO or Less than Final Amount";
  }
}

//Show an error on the page
function errorFunction() {
  let errorPopup = document.getElementById("errorMessage");
  errorPopup.style.display = "block";
}
//Dismiss the Error / remove it from the screen
document.getElementById("errorButton").addEventListener("click", () => {
  let errorPopup = document.getElementById("errorMessage");
  errorPopup.style.display = "none";
});

//Loader while waiting for the API response and results
const loader = document.getElementById("loading");
function loadingDisplay() {
  loader.classList.add("display");
}

//Calculate all the losses in the "Enter your losses" array / input
function numberOfLosses() {
  var lossesList = losses.value;
  newArray = [];
  if (lossesList && lossesList.match(/[\d]/)) {
    newArray = lossesList
      .match(/[\d\s\.]/g)
      .join("")
      .split(" ")
      .filter((item) => item !== "")
      .map((elem) =>
        parseFloat(elem) > 0 ? parseFloat(elem) * -1 : parseFloat(elem)
      );
  }

  if (numLosses.value === "") {
    numLosses.value = 0;
  }
  totalForLosses = newArray.reduce((a, b) => a + b, 0);

  if (
    Math.min.apply(Math, newArray) !== Infinity &&
    Math.max.apply(Math, newArray) !== Infinity
  ) {
    highestLoss = Math.min.apply(Math, newArray);
    lowestLoss = Math.max.apply(Math, newArray);
  } else {
    highestLoss = 0;
    lowestLoss = 0;
  }
}

//Calculate all the losses in the "Enter your wins" array / input
function numberOfWins() {
  var winsList = wins.value;
  newArr = [];
  if (winsList && winsList.match(/[\d]/g)) {
    newArr = winsList
      .match(/[\d\s\.]/g)
      .join("")
      .split(" ")
      .filter((item) => item !== "")
      .map((item) =>
        parseFloat(item) < 0 ? parseFloat(item) * -1 : parseFloat(item)
      );
  }
  if (numWins.value === "") {
    numWins.value = 0;
  }
  totalForWins = newArr.reduce((a, b) => a + b, 0);
  if (
    Math.min.apply(Math, newArr) !== Infinity &&
    Math.max.apply(Math, newArr) !== Infinity
  ) {
    highestWin = Math.max.apply(Math, newArr);
    lowestWin = Math.min.apply(Math, newArr);
  } else {
    highestWin = 0;
    lowestWin = 0;
  }
}//These functions are just to show the length of the current array on the page as a guideline to the user
document.getElementById("wins-length").innerText = 0;
document.getElementById("losses-length").innerText = 0;
function countForWins() {
  var winsList = wins.value,
    newArr = [];
  if (winsList && winsList.match(/[\d]/g)) {
    newArr = winsList
      .match(/[\d\s\.]/g)
      .join("")
      .split(" ")
      .filter((elem) => elem !== "");
    document.getElementById("wins-length").innerText = newArr.length;
  }
}
//These functions are just to show the length of the current array on the page as a guideline to the user
function countForLosses() {
  var lossesList = losses.value,
    newArray = [];
  if (lossesList && lossesList.match(/[\d]/g)) {
    newArray = lossesList
      .match(/[\d\s\.]/g)
      .join("")
      .split(" ")
      .filter((element) => element !== "");
  }
  document.getElementById("losses-length").innerText = newArray.length;
}

//Set intervals to Output the length of the Losses and wins array in real-time event after the page is refreshed
setInterval(() => {
  if (wins.value === "") {
    document.getElementById("wins-length").innerText = 0;
  }
  countForWins();
}, 1);

//Set intervals to Output the length of the Losses and wins array in real-time event after the page is refreshed
setInterval(() => {
  if (losses.value === "") {
    document.getElementById("losses-length").innerText = 0;
  }
  countForLosses();
}, 1);

// This is the results function which prints the results on screen and converts between the two currencies "base" and "output" currency
async function printResults() {
  loadingDisplay();
  var baseCurrency = document.getElementById("input_currency").value;
  var outputCurrency = document.getElementById("outputCurrency").value;
  if (outputCurrency === "ZAR") {
    outCurr = `<span style="font-weight: large; font-style: bold;">R</span>`;
  } else if (outputCurrency === "EUR") {
    outCurr = `<span style="font-weight: large; font-style: bold;">€</span>`;
  } else if (outputCurrency === "GBP") {
    outCurr = `<span style="font-weight: large; font-style: bold;">£</span>`;
  } else if (outputCurrency === "AUD") {
    outCurr = `<span style="font-weight: large; font-style: bold;">$</span>`;
  } else if (outputCurrency === "CAD") {
    outCurr = `<span style="font-weight: large; font-style: bold;">$</span>`;
  } else {
    outCurr = `<span style="font-weight: large; font-style: bold;">$</span>`;
  }

  //Currency converting API
  let response = await fetch(
    `https://currency-exchange.p.rapidapi.com/exchange?to=${outputCurrency}&from=${baseCurrency}&q=1.0`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      },
    }
  );
  response
    .json()

    //Magic
    .then((data) => {
      loader.classList.remove("display");
      if (accountName.value === "") {
        accountName.value = "Username";
      }
      resultsElement.id = "result";
      resultsElement.innerHTML = `
        <div class="container-fluid results card mb-5 mt-2 animate__animated animate__fadeInDown animate__slower">
        <div class="card-header text-center">
         <h3>Results</h3>
         <a class="btn btn-outline-primary" id="download" onclick = "saveResults()">Download</a>
        </div>
        <div class="card-body">
         <div class="results " id="resultToDownload">
            <div class="text-center form-control">
            <h3 class="text-info" style="font-size: 20px;">Results For <i class="acc">${
              accountName.value
            }</i></h3>
            </div >
            <div class="div">
             <label for="Initial Deposit"></label>
             <p>Initial Deposit = ${outCurr} ${(initialDeposit.value * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
             </p>
             <label for="Final Amount"></label>
             <p>Final Amount = ${outCurr} ${(finalAmount.value * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
             <label for="Profit Made"></label>
             <p>Profit Made = ${outCurr} ${(
        (parseFloat(finalAmount.value) - parseFloat(initialDeposit.value)) *
        data
      )
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
             <label for="Profit Percentage"></label>
             <p>Profit Percentage = <span class="div" id="percentageStyle">${parseFloat(
               percentage
             ).toFixed(2)}%</span>
              
             </p>
             </div>
    
               <div class="card div" id="wins">
                 <div class="card-header text-center">
                   <h4 style="text-decoration: underline">Wins</h4>
                 </div>
                 <label for="Number Of Wins"></label>
             <p>Number Of Wins = ${numWins.value}
             </p>
             <label for="Highest Win"></label>
             <p>Highest Win = ${outCurr} ${(highestWin * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
             <label for="Lowest Win"></label>
             <p>Lowest Win = ${outCurr} ${(lowestWin * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
             </p>
             <p>Total = ${outCurr} ${(totalForWins * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
               </div>
    
               <div class="card div">
                 <div class="card-header text-center">
                   <h4 style="text-decoration: underline">Losses</h4>
                 </div>
                 <label for="Number Of Losses"></label>
             <p>Number Of Losses = ${numLosses.value}
             </p>
             <label for="Highest Loss"></label>
             <p>Highest Loss = ${outCurr}${(highestLoss * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
             <label for="Lowest Loss"></label>
             <p>Lowest Loss = ${outCurr} ${(lowestLoss * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
             <p>Total = ${outCurr} ${(totalForLosses * data)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
             </p>
               </div>
             
             </div>
         </div>
         <button id="removeElement" type="button" class="btn btn-outline-primary mb-3" onclick="removeResults()">CLEAR ALL</button>
        </div>
        `;
      if (parseFloat(percentage) > 0) {
        document
          .getElementById("percentageStyle")
          .classList.add("text-success");
      } else if (parseFloat(percentage) < 0) {
        document.getElementById("percentageStyle").classList.add("text-danger");
      } else
        document
          .getElementById("percentageStyle")
          .classList.add("text-default");
    })
    .catch((err) => {
      console.error(err);
    });
}

//Save your results in your local machine
function saveResults() {
  let myResults = document.getElementById("resultToDownload");
  sessionStorage.setItem("results", myResults.innerText);
  var resultsToDownload = sessionStorage.results;
  var stored = new Blob([resultsToDownload], { type: "application/msword" });
  var downloadLink = document.getElementById("download");
  downloadLink.download = `${accountName.value}'s Results`;
  if (null !== window.URL) {
    downloadLink.href = window.URL.createObjectURL(stored);
    downloadLink.target = "_blank";
  }
}

//results
calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  outputResults();
});

//Prevent the page from clearing inputs on refresh... store the state in the sessionStorage until it is changed of cleared
let x;
document.addEventListener("input", () => {
  if (typeof Storage !== "undefined") {
    try {
      x = setInterval(function () {
        sessionStorage.setItem("username", accountName.value);
        sessionStorage.setItem("initial", initialDeposit.value);
        sessionStorage.setItem("final", finalAmount.value);
        sessionStorage.setItem("numWins", numWins.value);
        sessionStorage.setItem("numLosses", numLosses.value);
        sessionStorage.setItem("losses", losses.value);
        sessionStorage.setItem("wins", wins.value);
      }, 1e3);
    } catch (error) {
      errorFunction();
      errorMessage.innerHTML = "Session Storage Quota Exceeded!";
    }
  } else {
    errorFunction();
    errorMessage.innerHTML = "Your browser does not support storage";
  }
});

accountName.value = sessionStorage.getItem("username", accountName.value);
initialDeposit.value = sessionStorage.getItem("initial", initialDeposit.value);
finalAmount.value = sessionStorage.getItem("final", finalAmount.value);
numWins.value = sessionStorage.getItem("numWins", numWins.value);
numLosses.value = sessionStorage.getItem("numLosses", numLosses.value);
losses.value = sessionStorage.getItem("losses", losses.value);
wins.value = sessionStorage.getItem("wins", wins.value);

//Clear storage
function removeResults() {
  sessionStorage.clear();
  clearInterval(x);
  resultsElement.innerText = "";
}

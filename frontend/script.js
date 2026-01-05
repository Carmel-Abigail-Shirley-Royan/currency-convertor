const amountEntered = document.getElementById("amount");
const fromCurr = document.getElementById("fromCurrency");
const toCurr = document.getElementById("toCurrency");
const swapBtn = document.getElementById("swap-btn");
const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");

convertBtn.addEventListener("click", async () => {
  const amount = amountEntered.value;
  const from = fromCurr.value;
  const to = toCurr.value;

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  resultDiv.classList.remove("hidden");
  resultDiv.innerText = "Converting...";

  const res = await fetch(
    `http://localhost:5000/api/convert?from=${from}&to=${to}&amount=${amount}`
  );

  const data = await res.json();

  if (data.success) {
    resultDiv.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
  } else {
    resultDiv.innerText = "Conversion failed";
  }
});


swapBtn.addEventListener("click", () => {
    const temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
});
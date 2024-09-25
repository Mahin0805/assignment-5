let accountBalance = 5555; // Initial balance
const balanceDisplay = document.getElementById("balance");
const donationSection = document.getElementById("donationSection");
const historySection = document.getElementById("historySection");
historySection.style.display = 'none'; // Initially hidden
const historyList = document.getElementById("historyList");

document.getElementById("donationBtn").onclick = function () {
    donationSection.style.display = "block";
    historySection.style.display = "none";
    toggleActive("donationBtn");
};

document.getElementById("historyBtn").onclick = function () {
    donationSection.style.display = "none";
    historySection.style.display = "block";
    toggleActive("historyBtn");
};

function donate(cardId, causeName) {
    const inputField = document.getElementById(`input${cardId}`);
    const donationAmount = parseFloat(inputField.value);

    // Input Validation
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationAmount > accountBalance) {
        alert("Insufficient balance for this donation.");
        return;
    }

    // Update account balance and donation amount
    accountBalance -= donationAmount;
    balanceDisplay.innerText = accountBalance.toFixed(2);

    const currentAmountDisplay = document.getElementById(`amount${cardId}`);
    const currentAmount = parseFloat(currentAmountDisplay.innerText);
    currentAmountDisplay.innerText = (currentAmount + donationAmount).toFixed(2);

    // Update history with the cause name
    const now = new Date();
    const historyCard = document.createElement("div");
    historyCard.classList.add("bg-white", "shadow-md", "p-6", "rounded-lg", "border", "border-gray-200");

    historyCard.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h3 class="text-lg font-semibold">${causeName}</h3>
                <p class="text-sm text-gray-600">${now.toLocaleString()}</p>
            </div>
            <div>
                <span class="text-xl font-bold">৳${donationAmount.toFixed(2)} BDT</span>
            </div>
        </div>
    `;
    
    historyList.appendChild(historyCard);

    // Clear input field
    inputField.value = '';

    // Show Modal with the donation amount
    document.getElementById("modalAmount").innerText = donationAmount.toFixed(2);
    document.getElementById("donationModal").checked = true; // Open modal
}

function toggleActive(activeBtnId) {
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        if (button.id === activeBtnId) {
            button.classList.add('bg-blue-500', 'text-white'); // Add active styles
        } else {
            button.classList.remove('bg-blue-500', 'text-white'); // Remove active styles
        }
    });
}

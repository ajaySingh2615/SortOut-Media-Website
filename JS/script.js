const form = document.getElementById("userForm");
const displayData = document.getElementById("displayData");

// Fetch and display data on page load
async function fetchData() {
  const response = await fetch("http://localhost:3000/fetch-data");
  const data = await response.json();
  renderData(data);
}

// Render data dynamically
function renderData(data) {
  displayData.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${item.image}" alt="User Image">
            <div>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Age:</strong> ${item.age}</p>
            </div>
        `;
    displayData.appendChild(card);
  });
}

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const response = await fetch("http://localhost:3000/submit-data", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    form.reset();
    fetchData(); // Refresh data
  } else {
    alert("Error submitting form");
  }
});

// Initial fetch
fetchData();

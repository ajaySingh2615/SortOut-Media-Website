const form = document.getElementById("userForm");
const displayData = document.getElementById("displayData");

// Fetch and display data on page load
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/fetch-data");
    const data = await response.json();
    console.log("Fetched Data:", data); // Debugging line
    renderData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render data dynamically
function renderData(data) {
  displayData.innerHTML = ""; // Clear existing content
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col-lg-2-4 col-md-4 col-sm-6"; // 5 cards per row
    card.innerHTML = `
      <div class="custom-card">
        <img src="${item.image}" alt="User Image" class="custom-card-img">
        <div class="custom-card-body">
          <p class="custom-card-title">${item.name}</p>
          <p class="custom-card-text"><strong>Age:</strong> ${item.age}</p>
          <p class="custom-card-text"><strong>Team:</strong> ${item.team}</p>
          <p class="custom-card-text"><strong>Gender:</strong> ${item.gender}</p>
          <p class="custom-card-text"><strong>Language:</strong> ${item.language}</p>
          <p class="custom-card-text"><strong>Experience:</strong> ${item.experience} years</p>
        </div>
      </div>
    `;
    displayData.appendChild(card);
  });
}

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  try {
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
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});

// Initial fetch
fetchData();

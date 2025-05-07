const apiUrl = "http://localhost:8080/api/patients";

// Load all patients on page load
window.onload = () => {
  loadPatients();

  document.getElementById("patientForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addPatient();
  });
};

function addPatient() {
  const patient = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value
  };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient)
  })
    .then(res => res.json())
    .then(() => {
      alert("Patient Added!");
      loadPatients();
      document.getElementById("patientForm").reset();
    });
}

function loadPatients() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("patientTableBody");
      table.innerHTML = "";
      data.forEach(patient => {
        const row = `<tr>
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td><button onclick="deletePatient(${patient.id})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
      });
    });
}

function deletePatient(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      alert("Patient Deleted!");
      loadPatients();
    });
}

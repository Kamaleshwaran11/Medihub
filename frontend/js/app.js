// js/app.js
    function addPatient() {
      const patient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value
      };
    
      fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
      })
      .then(res => res.json())
      .then(data => alert("Patient added!"))
      .catch(err => console.error(err));
    }
    
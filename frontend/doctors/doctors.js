
        // --- Simple session management using localStorage ---
        let doctorSession = JSON.parse(localStorage.getItem('doctorSession')) || null;

        // --- Dummy data for demonstration ---
        let doctors = [
            {id: 1, name: "Dr. John Doe", email: "john@medihub.com", password: "1234", specialization: "Cardiology"}
        ];
        let appointments = [
            {id: "a1", doctorEmail: "john@medihub.com", patientName: "Alice", date: "2024-06-10", time: "10:00", status: "Scheduled"},
            {id: "a2", doctorEmail: "john@medihub.com", patientName: "Bob", date: "2024-06-11", time: "11:00", status: "Scheduled"}
        ];
        let patients = [
            {doctorEmail: "john@medihub.com", name: "Alice", email: "alice@patient.com"},
            {doctorEmail: "john@medihub.com", name: "Bob", email: "bob@patient.com"}
        ];
        let ehrs = {
            "alice@patient.com": {diagnosis: "Hypertension", allergies: "None", notes: "Monitor BP"},
            "bob@patient.com": {diagnosis: "Diabetes", allergies: "Penicillin", notes: "Low sugar diet"}
        };
        let prescriptions = [
            {doctorEmail: "john@medihub.com", patientEmail: "alice@patient.com", medicine: "Amlodipine", dosage: "5mg daily"}
        ];

        // --- Utility functions ---
        function saveSession() {
            localStorage.setItem('doctorSession', JSON.stringify(doctorSession));
        }
        function showSection(sectionId) {
            document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
            document.getElementById(sectionId).classList.remove('hidden');
        }
        function updateDashboard() {
            const docEmail = doctorSession.email;
            document.getElementById('card-appointments').textContent = appointments.filter(a => a.doctorEmail === docEmail).length;
            document.getElementById('card-patients').textContent = patients.filter(p => p.doctorEmail === docEmail).length;
            document.getElementById('card-prescriptions').textContent = prescriptions.filter(p => p.doctorEmail === docEmail).length;
        }
        function renderProfile() {
            const doc = doctors.find(d => d.email === doctorSession.email);
            document.getElementById('doctor-profile').innerHTML = `
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Specialization:</strong> ${doc.specialization}</p>
            `;
        }
        function renderAppointments() {
            const tbody = document.querySelector('#appointments-table tbody');
            tbody.innerHTML = '';
            appointments.filter(a => a.doctorEmail === doctorSession.email).forEach(app => {
                tbody.innerHTML += `
                    <tr>
                        <td>${app.patientName}</td>
                        <td>${app.date}</td>
                        <td>${app.time}</td>
                        <td>${app.status}</td>
                        <td>
                            <button onclick="updateStatus('${app.id}', 'Completed')">Complete</button>
                            <button onclick="updateStatus('${app.id}', 'Cancelled')">Cancel</button>
                        </td>
                    </tr>
                `;
            });
        }
        function renderPatients() {
            const list = document.getElementById('patients-list');
            list.innerHTML = '';
            patients.filter(p => p.doctorEmail === doctorSession.email).forEach(p => {
                list.innerHTML += `<li>${p.name} (${p.email})</li>`;
            });
        }
        function renderPrescriptions() {
            const list = document.getElementById('prescriptions-list');
            list.innerHTML = '';
            prescriptions.filter(p => p.doctorEmail === doctorSession.email).forEach(p => {
                list.innerHTML += `<li>${p.patientEmail}: ${p.medicine} - ${p.dosage}</li>`;
            });
        }

        // --- Auth logic ---
        function showLogin() {
            document.getElementById('auth-title').textContent = "Doctor Login";
            document.getElementById('login-form').classList.remove('hidden');
            document.getElementById('register-form').classList.add('hidden');
        }
        function showRegister() {
            document.getElementById('auth-title').textContent = "Doctor Registration";
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('register-form').classList.remove('hidden');
        }
        document.getElementById('show-register').onclick = function(e) {
            e.preventDefault();
            showRegister();
        };
        document.getElementById('login-form').onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const doc = doctors.find(d => d.email === email && d.password === password);
            if (doc) {
                doctorSession = {email: doc.email};
                saveSession();
                initDashboard();
            } else {
                document.getElementById('auth-msg').textContent = "Invalid credentials.";
            }
        };
        document.getElementById('register-form').onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const specialization = document.getElementById('reg-specialization').value;
            if (doctors.some(d => d.email === email)) {
                document.getElementById('auth-msg').textContent = "Email already registered.";
                return;
            }
            doctors.push({id: Date.now(), name, email, password, specialization});
            doctorSession = {email};
            saveSession();
            initDashboard();
        };

        // --- Navigation ---
        document.getElementById('nav-dashboard').onclick = function(e){e.preventDefault(); showSection('dashboard-section'); updateDashboard();};
        document.getElementById('nav-profile').onclick = function(e){e.preventDefault(); showSection('profile-section'); renderProfile();};
        document.getElementById('nav-appointments').onclick = function(e){e.preventDefault(); showSection('appointments-section'); renderAppointments();};
        document.getElementById('nav-patients').onclick = function(e){e.preventDefault(); showSection('patients-section'); renderPatients();};
        document.getElementById('nav-ehr').onclick = function(e){e.preventDefault(); showSection('ehr-section');};
        document.getElementById('nav-prescriptions').onclick = function(e){e.preventDefault(); showSection('prescriptions-section'); renderPrescriptions();};
        document.getElementById('nav-logout').onclick = function(e){
            e.preventDefault();
            doctorSession = null;
            saveSession();
            location.reload();
        };

        // --- Profile Management ---
        document.getElementById('edit-profile-btn').onclick = function() {
            const doc = doctors.find(d => d.email === doctorSession.email);
            document.getElementById('edit-name').value = doc.name;
            document.getElementById('edit-email').value = doc.email;
            document.getElementById('edit-specialization').value = doc.specialization;
            document.getElementById('edit-profile-form').classList.remove('hidden');
            this.classList.add('hidden');
        };
        document.getElementById('cancel-edit-profile').onclick = function() {
            document.getElementById('edit-profile-form').classList.add('hidden');
            document.getElementById('edit-profile-btn').classList.remove('hidden');
        };
        document.getElementById('edit-profile-form').onsubmit = function(e) {
            e.preventDefault();
            const doc = doctors.find(d => d.email === doctorSession.email);
            doc.name = document.getElementById('edit-name').value;
            doc.email = document.getElementById('edit-email').value;
            doc.specialization = document.getElementById('edit-specialization').value;
            doctorSession.email = doc.email;
            saveSession();
            renderProfile();
            document.getElementById('edit-profile-form').classList.add('hidden');
            document.getElementById('edit-profile-btn').classList.remove('hidden');
        };

        // --- Appointment Scheduling ---
        window.updateStatus = function(id, status) {
            const app = appointments.find(a => a.id === id);
            if (app) app.status = status;
            renderAppointments();
            updateDashboard();
        };

        // --- Patient Assignment ---
        document.getElementById('assign-patient-form').onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('assign-patient-name').value;
            const email = document.getElementById('assign-patient-email').value;
            patients.push({doctorEmail: doctorSession.email, name, email});
            renderPatients();
            updateDashboard();
            this.reset();
        };

        // --- EHR Access ---
        document.getElementById('ehr-search-form').onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('ehr-patient-email').value;
            const ehr = ehrs[email];
            if (ehr) {
                document.getElementById('ehr-details').innerHTML = `
                    <p><strong>Diagnosis:</strong> ${ehr.diagnosis}</p>
                    <p><strong>Allergies:</strong> ${ehr.allergies}</p>
                    <p><strong>Notes:</strong> ${ehr.notes}</p>
                `;
            } else {
                document.getElementById('ehr-details').textContent = "No EHR found for this patient.";
            }
        };

        // --- Prescription Management ---
        document.getElementById('add-prescription-form').onsubmit = function(e) {
            e.preventDefault();
            const patientEmail = document.getElementById('presc-patient-email').value;
            const medicine = document.getElementById('presc-medicine').value;
            const dosage = document.getElementById('presc-dosage').value;
            prescriptions.push({doctorEmail: doctorSession.email, patientEmail, medicine, dosage});
            renderPrescriptions();
            updateDashboard();
            this.reset();
        };

        // --- Initialization ---
        function initDashboard() {
            document.getElementById('auth-section').classList.add('hidden');
            showSection('dashboard-section');
            updateDashboard();
            renderProfile();
            renderAppointments();
            renderPatients();
            renderPrescriptions();
        }
        // On load
        if (doctorSession) {
            initDashboard();
        } else {
            showSection('auth-section');
            showLogin();
        }

//call the loadDoctors 
function loadDoctors() {
  fetch('http://localhost:8080/api/doctors')
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      const list = document.getElementById("doctorList");
      list.innerHTML = ''; // Clear previous entries
      data.forEach(doctor => {
        const div = document.createElement('div');
          div.className = 'doctor-card';
          div.innerHTML = `
            <strong>Name:</strong> ${doctor.name}<br>
            <strong>Email:</strong> ${doctor.email}<br>
            <strong>Phone:</strong> ${doctor.phone}<br>
            <strong>Specialization:</strong> ${doctor.specialization}
          `;
          list.appendChild(div);
      });
    })
    .catch(error => {
      alert("Failed to load doctors: " + error.message);
    });
};

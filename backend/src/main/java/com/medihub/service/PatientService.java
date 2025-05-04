package com.medihub.service;

import com.medihub.model.Patient;
import com.medihub.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }
    public Patient savePatient(Patient patient){
        return patientRepository.save(patient);
    }
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient existing = patientRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedPatient.getName());
            existing.setAge(updatedPatient.getAge());
            existing.setGender(updatedPatient.getGender());
            existing.setPhone(updatedPatient.getPhone());
            return patientRepository.save(existing);
        }
        return null;
    }
}

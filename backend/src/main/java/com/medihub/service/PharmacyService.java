package com.medihub.service;

import com.medihub.model.Medicine;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PharmacyService {
    public Medicine fetchMedicineDetails(String medicineName) {
        String apiUrl = "https://api.fda.gov/drug/label.json?search=openfda.brand_name:" + medicineName;

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
            // Parse response JSON into Medicine object
            // Use ObjectMapper or manually parse JSON
            // Example (simplified):
            Medicine med = new Medicine();
            med.setName(medicineName);
            med.setUsage("Some usage from API...");
            return med;
        } catch (Exception e) {
            throw new RuntimeException("Medicine not found or API error");
        }
    }
}

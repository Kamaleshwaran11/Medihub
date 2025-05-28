package com.medihub.controller;

import com.medihub.model.Medicine;
import com.medihub.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pharmacy")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @GetMapping("/medicine")
    public ResponseEntity<Medicine> getMedicine(@RequestParam String name) {
        Medicine med = pharmacyService.fetchMedicineDetails(name);
        return ResponseEntity.ok(med);
    }
}

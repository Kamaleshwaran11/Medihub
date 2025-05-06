package com.medihub.controller;

import com.medihub.model.Billing;
import com.medihub.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "*")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping
    public List<Billing> getAllBills() {
        return billingService.getAllBills();
    }

    @GetMapping("/{id}")
    public Billing getBillById(@PathVariable Long id) {
        return billingService.getBillById(id);
    }

    @PostMapping
    public Billing createBill(@RequestBody Billing billing) {
        return billingService.createBill(billing);
    }

    @PutMapping("/{id}")
    public Billing updateBill(@PathVariable Long id, @RequestBody Billing billing) {
        return billingService.updateBill(id, billing);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id) {
        billingService.deleteBill(id);
    }
}
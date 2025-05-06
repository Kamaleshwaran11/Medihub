package com.medihub.service;

import com.medihub.model.Billing;
import com.medihub.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;

    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    public Billing getBillById(Long id) {
        return billingRepository.findById(id).orElse(null);
    }

    public Billing createBill(Billing billing) {
        return billingRepository.save(billing);
    }

    public Billing updateBill(Long id, Billing updatedBilling) {
        Billing existing = billingRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setPatientName(updatedBilling.getPatientName());
            existing.setAmount(updatedBilling.getAmount());
            existing.setStatus(updatedBilling.getStatus());
            return billingRepository.save(existing);
        }
        return null;
    }

    public void deleteBill(Long id) {
        billingRepository.deleteById(id);
    }
}
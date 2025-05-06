package com.medihub.service;

import com.medihub.model.Staff;
import com.medihub.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    public Staff createStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff updatedStaff) {
        Staff existing = staffRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedStaff.getName());
            existing.setRole(updatedStaff.getRole());
            existing.setEmail(updatedStaff.getEmail());
            existing.setPhone(updatedStaff.getPhone());
            return staffRepository.save(existing);
        }
        return null;
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}
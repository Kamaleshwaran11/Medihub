package com.medihub.service;

import com.medihub.model.Appointment;
import com.medihub.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        Appointment existing = appointmentRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDoctor(updatedAppointment.getDoctor());
            existing.setPatientName(updatedAppointment.getPatientName());
            existing.setAppointmentDate(updatedAppointment.getAppointmentDate());
            existing.setReason(updatedAppointment.getReason());
            return appointmentRepository.save(existing);
        }
        return null;
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
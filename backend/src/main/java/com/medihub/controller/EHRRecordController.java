package com.medihub.controller;

import com.medihub.model.EHRRecord;
import com.medihub.service.EHRRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ehr_records")
@CrossOrigin(origins = "*")
public class EHRRecordController {

    @Autowired
    private EHRRecordService ehrRecordService;

    @GetMapping
    public List<EHRRecord> getAllEHRRecords() {
        return ehrRecordService.getAllEHRRecords();
    }

    @GetMapping("/{id}")
    public EHRRecord getEHRRecordById(@PathVariable Long id) {
        return ehrRecordService.getEHRRecordById(id);
    }

    @PostMapping
    public EHRRecord createEHRRecord(@RequestBody EHRRecord ehrRecord) {
        return ehrRecordService.createEHRRecord(ehrRecord);
    }

    @PutMapping("/{id}")
    public EHRRecord updateEHRRecord(@PathVariable Long id, @RequestBody EHRRecord ehrRecord) {
        return ehrRecordService.updateEHRRecord(id, ehrRecord);
    }

    @DeleteMapping("/{id}")
    public void deleteEHRRecord(@PathVariable Long id) {
        ehrRecordService.deleteEHRRecord(id);
    }
}
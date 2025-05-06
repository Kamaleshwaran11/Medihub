package com.medihub.repository;

import com.medihub.model.EHRRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EHRRecordRepository extends JpaRepository<EHRRecord, Long> {
}
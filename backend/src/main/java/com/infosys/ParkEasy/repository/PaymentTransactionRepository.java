package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction,Long> {
}

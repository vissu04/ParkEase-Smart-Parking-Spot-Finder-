package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long>{

    Optional<PaymentOrder> findByOrderId(String orderId);

    // Monthly revenue
    @Query(value = """
            SELECT DATE_FORMAT(created_at,'%b'), SUM(amount)
            FROM payment_order
            GROUP BY YEAR(created_at), MONTH(created_at), DATE_FORMAT(created_at,'%b')
            ORDER BY YEAR(created_at), MONTH(created_at)
            """, nativeQuery = true)
    List<Object[]> monthlyRevenue();

    List<PaymentOrder> findByUserId(Long id);
}
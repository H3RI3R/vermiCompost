package com.eximroyals.repository;

import com.eximroyals.model.StaticPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaticPageRepository extends JpaRepository<StaticPage, Long> {
    Optional<StaticPage> findByPageName(String pageName);
}

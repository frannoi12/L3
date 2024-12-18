package com.personne.projetVue.repositry;


import com.personne.projetVue.model.Personne;

import org.springframework.data.jpa.repository.JpaRepository;



public interface PersonneRepository extends JpaRepository<Personne, Integer> {
}

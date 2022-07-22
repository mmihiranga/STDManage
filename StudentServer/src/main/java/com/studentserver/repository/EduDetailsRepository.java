package com.studentserver.repository;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.studentserver.model.EduDetails;
//repository that extends CrudRepository 
public interface EduDetailsRepository extends CrudRepository<EduDetails, Integer>  {
    

    List<EduDetails> findBystdId(int stdId);

}

 

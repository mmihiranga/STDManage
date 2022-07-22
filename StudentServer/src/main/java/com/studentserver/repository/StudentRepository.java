package com.studentserver.repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.studentserver.model.Student;
//repository that extends CrudRepository  
public interface StudentRepository extends CrudRepository<Student, Integer>  {

    boolean existsByemail(String email);
    boolean existsBystdId(int stdId);

}

package com.studentserver.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studentserver.model.Student;
import com.studentserver.repository.StudentRepository;

@RestController
@CrossOrigin()
public class StudentContoller {
    // autowire the EduDetailsService class
    @Autowired
    StudentRepository studentRepository;

    // CREATE new Student
    @PostMapping("/student/create")
    private ResponseEntity<Student> createStudent(@RequestBody Student student) {
        try {
            if (studentRepository.existsByemail(student.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>(studentRepository.save(student), HttpStatus.OK);
            }
            // return new ResponseEntity<>(studentRepository.save(student), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET All Students
    @GetMapping("/student")
    public ResponseEntity<List<Student>> getAllStudent(@RequestParam(required = false) String title) {
        try {
            List<Student> allStudents = (List<Student>) studentRepository.findAll();
            return new ResponseEntity<>(allStudents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET StudentById
    @GetMapping("/student/{stdId}")
    public ResponseEntity<Student> getStudentById(@PathVariable int stdId) {
        try {
            Student student = studentRepository.findById(stdId).get();
            return new ResponseEntity<Student>(student, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Student by Id
    @DeleteMapping("/student/{stdId}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable int stdId) {
        try {
            studentRepository.deleteById(stdId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update a Student by Id
    @PutMapping("/student/{stdId}")
    public ResponseEntity<?> update(@RequestBody Student student, @PathVariable int stdId) {
        try {
            Optional<Student> existStudent = studentRepository.findById(stdId);
            studentRepository.save(student);
            return new ResponseEntity<Student>(student, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

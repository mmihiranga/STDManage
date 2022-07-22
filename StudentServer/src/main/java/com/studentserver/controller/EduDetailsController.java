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

import com.studentserver.model.EduDetails;
import com.studentserver.repository.EduDetailsRepository;
import com.studentserver.repository.StudentRepository;

@RestController
@CrossOrigin()
public class EduDetailsController {
    // autowire the EduDetailsService class
    @Autowired
    EduDetailsRepository eduDetailsRepository;
    @Autowired
    StudentRepository studentRepository;

    // CREATE new EduDetails
    @PostMapping("/edu/create")
    private ResponseEntity<EduDetails> AddEduDetails(@RequestBody EduDetails eduDetails) {
        try {
            if (studentRepository.existsBystdId(eduDetails.getStdId())) {
                return new ResponseEntity<>(eduDetailsRepository.save(eduDetails), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            // return new ResponseEntity<>(eduDetailsRepository.save(eduDetails),
            // HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET All EduDetails
    @GetMapping("/edu")
    public ResponseEntity<List<EduDetails>> getAllEduDetails(@RequestParam(required = false) String title) {
        try {
            List<EduDetails> allStudents = (List<EduDetails>) eduDetailsRepository.findAll();
            return new ResponseEntity<>(allStudents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET EduDetailsById
    @GetMapping("/edu/{eduId}")
    public ResponseEntity<EduDetails> getEduDetailsById(@PathVariable int eduId) {
        try {
            EduDetails eduDetails = eduDetailsRepository.findById(eduId).get();
            return new ResponseEntity<EduDetails>(eduDetails, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<EduDetails>(HttpStatus.NOT_FOUND);
        }
    }

    // GET EduDetailsByStudentId
    @GetMapping("/student/edu/{stdId}")
    public ResponseEntity<List<EduDetails>> getEduDetailsByStudentId(@PathVariable String stdId) {
        try {
            int stdID = Integer.parseInt(stdId);
            List<EduDetails> eduDetails = (List<EduDetails>) eduDetailsRepository.findBystdId(stdID);
            return new ResponseEntity<List<EduDetails>>(eduDetails, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<List<EduDetails>>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a EduDetails by Id
    @DeleteMapping("/edu/{eduId}")
    public ResponseEntity<HttpStatus> deleteEduDetails(@PathVariable int eduId) {
        try {
            eduDetailsRepository.deleteById(eduId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update a EduDetails by Id
    @PutMapping("/edu/{eduId}")
    public ResponseEntity<?> updateEduDetails(@RequestBody EduDetails eduDetails, @PathVariable int eduId) {
        try {
            Optional<EduDetails> existDetails = eduDetailsRepository.findById(eduId);
            eduDetailsRepository.save(eduDetails);
            return new ResponseEntity<EduDetails>(eduDetails, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

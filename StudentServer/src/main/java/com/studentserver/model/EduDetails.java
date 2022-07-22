package com.studentserver.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//mark class as an Entity   
@Entity  
//defining class name as Table name  
@Table  
public class EduDetails {
    @Id  
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column  
    private int eduId;  
    @Column  
    private int stdId;  
    @Column  
    private String qualification;
    @Column  
    private String instituteName;
    @Column  
    private String startedDate;
    @Column  
    private String endDate;
    @Column  
    private String grade;


    public int getEduId() {
        return eduId;
    }
    public void setEduId(int eduId) {
        this.eduId = eduId;
    }
    public int getStdId() {
        return stdId;
    }
    public void setStdId(int stdId) {
        this.stdId = stdId;
    }
    public String getQualification() {
        return qualification;
    }
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    public String getInstituteName() {
        return instituteName;
    }
    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }
    public String getStartedDate() {
        return startedDate;
    }
    public void setStartedDate(String startedDate) {
        this.startedDate = startedDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    public String getGrade() {
        return grade;
    }
    public void setGrade(String grade) {
        this.grade = grade;
    }

    
}

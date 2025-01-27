package com.recrutement.platforme.entity;

import org.springframework.data.elasticsearch.annotations.Document;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Document(indexName = "applications")
@Schema(description = "Représente une candidature")
public class Application {
	@Id
    @Schema(description = "ID unique de la candidature", example = "EudzeXyehdk")
    private String id;

    @Schema(description = "Id du job", example = "xueYiuidcz")
    private String jobId;
    @Schema(description = "Id du candidat", example = "yoiiXoIjkd")
    private String candidateId;
    @Schema(description = "Statut de la candidature", example = "EN_COURS")
    private String status;
    
    
    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(String candidateId) {
		this.candidateId = candidateId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}

package com.recrutement.platforme.graphql.query;

import java.util.List;

import org.springframework.stereotype.Component;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.service.JobService;

import graphql.kickstart.tools.GraphQLQueryResolver;

@Component
public class JobQuery implements GraphQLQueryResolver {
	
	private final JobService jobService;
	
	public JobQuery(JobService jobService) {
        this.jobService = jobService;
    }

    public Job getJobById(String id) {
        return jobService.findById(id).orElse(null);
    }

    public List<Job> getAllJobs() {
        return jobService.findAll();
    }
	
}

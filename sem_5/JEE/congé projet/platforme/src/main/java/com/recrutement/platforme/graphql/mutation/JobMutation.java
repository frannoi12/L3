package com.recrutement.platforme.graphql.mutation;

import org.springframework.stereotype.Component;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.service.JobService;

import graphql.kickstart.tools.GraphQLMutationResolver;

@Component
public class JobMutation implements GraphQLMutationResolver{
	
	private final JobService jobService;
	
	public JobMutation(JobService jobService) {
        this.jobService = jobService;
    }

    public Job createJob(Job job) {
        return jobService.save(job);
    }

    public Job updateJob(String id, Job job) {
        job.setId(id);
        return jobService.save(job);
    }

    public Boolean deleteJob(String id) {
        jobService.deleteById(id);
        return true;
    }
	
}

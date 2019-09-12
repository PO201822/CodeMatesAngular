import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobserviceService {

  constructor() { }

  private jobs : any;

  setJobs(jobs){
    this.jobs = jobs;
  }

  getJobs(){
    return this.jobs;
  }
}

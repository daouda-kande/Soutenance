import axios from '@axios'
import { BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useProjectListStore = defineStore('ProjectListStore', {
  state: () => ({
    projects: [],
    project: [],
  }),

  // SECTION - Project Links
  actions: {
    // 👉 Fetch Projects data
    fetchProjects() { return axios.get(`${BASE_URL}/projects`)},

    // 👉 Fetch Projects data
    queryProjects(params) { return axios.post(`${BASE_URL}/projects/q`, {
      filter: params, 
    } ) },

    // 👉 Add New Project
    addProject(projectData) {
      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/projects`, {
          project: projectData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 Fetch single Project
    fetchProject(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/projects/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    stateProject(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/projects/${id}`).then(response =>{ this.project = response.data; resolve(response.data)}).catch(error => reject(error))
      })
    },

    // 👉 Update Project
    updateProject(projectData) {
      return new Promise(async (resolve, reject) => {
        await axios.put(`${BASE_URL}/projects/${projectData.id}`, { update: projectData.project }).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Project
    deleteProject(id) {
      return new Promise(async (resolve, reject) => {
        await axios.delete(`${BASE_URL}/projects/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // !SECTION - Project Links
    
    // SECTION - Project Task Links

    // 👉 Add New Project Task
    addTask(projectData) {
      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/projects/new/task`, {
          project_id: projectData.project_id,
          task: projectData.task,
        })
          .then(response => resolve(response)) // Resolve the promise with the data if successful
          .catch(error => reject(error)) // Reject the promise with the error if there's an error
      })
    },

    // 👉 Update Project
    updateTask(projectData) {
      return new Promise(async (resolve, reject) => {
        await axios.put(`${BASE_URL}/projects/update/task`, {
          project_id: projectData.project_id,
          task: projectData.task, 
        }).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Project
    deleteTask(projectData) {
      return new Promise(async (resolve, reject) => {
        await axios.post(`${BASE_URL}/projects/delete/task`, { 
          project_id: projectData.project_id,
          project_task_id: projectData.project_task_id,
        }).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    

    // !SECTION - Project Task Links
    

    // SECTION - Provider Links
    // 👉 Provice Usernames
    provideMembersList(){ return axios.get(`${BASE_URL}/provider/form/members`)},

    // !SECTION - Provider Links
    
  },
})

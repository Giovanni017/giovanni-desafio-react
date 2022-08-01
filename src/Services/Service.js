import axios from 'axios';

// API url :: GitHub
const apiGitHub = axios.create({
    baseURL: 'https://api.github.com',
});

const GitHubService = {
    getUsers: async (name) => {
        return await apiGitHub.get(`users/${name}`)
    },

    getRepositories: async (name) => {
        return await apiGitHub.get(`users/${name}/repos`);
    }
}

export default GitHubService;
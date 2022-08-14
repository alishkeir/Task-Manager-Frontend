import axios from 'axios';

class HTTPRequests {
    BASE_URL = 'https://task-manager-alishkeir.herokuapp.com';

    // ==================================================================================== //

    getToken() {
        let token;

        if (localStorage.getItem('access_token')) {
            if (JSON.parse(localStorage.getItem('access_token'))) {
                if (JSON.parse(localStorage.getItem('access_token')).key) {
                    token = JSON.parse(
                        localStorage.getItem('access_token')
                    ).key;
                }
            }
        }

        return token;
    }

    // ==================================================================================== //

    register(username, password) {
        let data = {
            username: username,
            password: password,
        };
        return axios
            .post(`${this.BASE_URL}/auth/signup`, data)
            .then((res) => {
                return res;
            })
            .catch((err) => err.response);
    }

    // ==================================================================================== //

    login(username, password) {
        let data = {
            username: username,
            password: password,
        };
        return axios
            .post(`${this.BASE_URL}/auth/signin`, data)
            .then((res) => {
                return res;
            })
            .catch((err) => err.response);
    }

    // ==================================================================================== //

    logout() {
        localStorage.removeItem('access_token');
        window.location.reload();
    }

    // ==================================================================================== //

    getTasks(options = {}) {
        let params = {};

        if (options.search !== '') {
            params.search = options.search;
        }
        if (options.status !== 'all') {
            params.status = options.status;
        }

        let config = {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
            params: params,
        };

        return axios
            .get(`${this.BASE_URL}/tasks`, config)
            .then((res) => res)
            .catch((err) => err.response);
    }

    // ==================================================================================== //

    createTask(title, description) {
        let data = {
            title: title,
            description: description,
        };

        let config = {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        };

        return axios
            .post(`${this.BASE_URL}/tasks`, data, config)
            .then((res) => res)
            .catch((err) => err.response);
    }

    // ==================================================================================== //

    updateTask(id, status) {
        let data = {
            status: status,
        };

        let config = {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        };

        return axios
            .patch(`${this.BASE_URL}/tasks/${id}/status`, data, config)
            .then((res) => res)
            .catch((err) => err.response);
    }

    // ==================================================================================== //

    deleteTask(id) {
        let config = {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        };

        return axios
            .delete(`${this.BASE_URL}/tasks/${id}`, config)
            .then((res) => res)
            .catch((err) => err.response);
    }

    // ==================================================================================== //
}

export default new HTTPRequests();

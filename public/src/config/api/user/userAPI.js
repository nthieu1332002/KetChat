import api from "./apiConfig";
const userAPI = {
    loginAPI: (data) => {
        const url = `/api/auth/login`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    }
}

export default userAPI
import api from "./apiConfig";
const messageAPI = {
    addMessageAPI: (data) => {
        const url = `/api/message/addMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    getMessageAPI: (data) => {
        const url = `/api/message/getMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    getLastMessageAPI: (data) => {
        const url = `/api/message/getLastMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    }

}

export default messageAPI
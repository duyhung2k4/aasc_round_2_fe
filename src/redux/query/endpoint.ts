export const HEADER = {
    defaultHeader: () => ({
        "Content-Type": "application/json",
    }),
}

export const endPoint = {
    auth: {
        login: () => ({
            url: "api/auth/login",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
    },

    users: {
        getAll: () => ({
            url: "api/user/all-employee",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
    },

    contact: {
        getAll: () => ({
            url: "api/contact/list",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        add: () => ({
            url: "api/contact/add",
            method: "POST",
            headers: HEADER.defaultHeader(),
        })
    }
}
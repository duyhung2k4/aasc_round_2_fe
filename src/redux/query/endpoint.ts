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
        }),
        update: () => ({
            url: "api/contact/update",
            method: "PUT",
            headers: HEADER.defaultHeader(),
        }),
        delete: () => ({
            url: "api/contact/delete",
            method: "DELETE",
            headers: HEADER.defaultHeader(),
        })
    }
}
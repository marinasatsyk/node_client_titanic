//func   unified characters for first & last names

export const unifyString = (v) => v.trim().toLowerCase().split(' ').join('');

//VALIDATEION PART
export const Validator = {
    email: (e) =>
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(e).toLowerCase()
        ),
    name: (n) => n.trim().length > 1,
    password: (p) => /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(p),
};
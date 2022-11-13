import * as yup from 'yup'

export const schema = yup
    .object({
        username: yup.string()
            .required('Username is required.')
            .min(3, "Username should be greater than 3 characters.")
            .max(20, "Username should be less than 20 characters"),
        email: yup
            .string('Email is not valid.')
            .matches(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is not valid"
            )
            .required('Email is required.'),
        password: yup.string()
            .required("Password is required.")
            .min(8, "Passsword should be greater than 8 characters."),
        confirmPassword: yup.string()
            .required("Please confirm your password.")
            .oneOf([yup.ref("password"), null], "Password does not match."),
    })
    .required()
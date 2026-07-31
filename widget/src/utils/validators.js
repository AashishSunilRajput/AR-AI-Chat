export function validateLead(data) {

    const errors = {};

    if (!data.name?.trim()) {

        errors.name = "Name is required";

    }

    if (!data.email?.trim()) {

        errors.email = "Email is required";

    }

    else {

        const emailRegex =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {

            errors.email = "Invalid email";

        }

    }

    if (data.phone) {

        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(data.phone)) {

            errors.phone =

                "Phone must be 10 digits";

        }

    }

    return errors;

}
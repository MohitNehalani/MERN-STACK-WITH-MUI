
export const Validation = (event, state) => {
    let isValid = true;
    let updatedForm = {
        ...state.contactData,
        [event.target.name]: {
            ...state.contactData[event.target.name],
        }

    };

    let rules = updatedForm[event.target.name].rules;
    let value = updatedForm[event.target.name].value;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;

    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /^\S+@\S+(\.\S+)$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.confirmPassword) {
        const match = value === state.contactData.password.value
        isValid = match && isValid
    }

    let completeFormShouldBeValid = true;
    for (let id in updatedForm) {
        completeFormShouldBeValid = !!(updatedForm[id].isValid && completeFormShouldBeValid);
    }
    updatedForm[event.target.name].isValid = isValid
    return {contactData: updatedForm, completeFormValidity: completeFormShouldBeValid};
};


export const HandleChange = (event, state) => {
    let updatedForm = {
        ...state.contactData,
        [event.target.name]: {
            ...state.contactData[event.target.name],
            value: event.target.value.trim(),
            touched: true
        }

    };

    let completeFormShouldBeValid = true;
    for (let id in updatedForm) {
        completeFormShouldBeValid = !!(updatedForm[id].isValid && completeFormShouldBeValid);
    }
    return {contactData: updatedForm, completeFormValidity: completeFormShouldBeValid};
};


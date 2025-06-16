export const validateNameAndLastName = (name:string): string => {
    let validation = ""
    const regexCountry = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/

    if(!regexCountry.test(name)) validation = "Debe tener entre 1 y 50 letras."
    return validation
}

export const validateDni = (dni:string): string => {
    let validation = ""
    const regexCountry = /^\d{7,10}$/

    if(!regexCountry.test(dni)) validation = "Debe tener entre 7 y 10 números."
    return validation
}
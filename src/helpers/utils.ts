const checkIfInvalid = <T>(content: T) => {
    if (content === null || content === undefined) return true;
    return false;
}

export { checkIfInvalid }
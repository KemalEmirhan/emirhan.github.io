const BIRTH_YEAR = 1994;

export const useAge = () => {
    return ((new Date()).getFullYear() - BIRTH_YEAR) - 1;
}
const BIRTH_YEAR = 1994;

const useAge = () => {
    return ((new Date()).getFullYear() - BIRTH_YEAR) - 1;
}

export default useAge;
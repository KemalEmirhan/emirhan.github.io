import { BirthDateSchema } from '@/schemas';

// Validate birth date with Zod
const BIRTH_DATE = BirthDateSchema.parse(new Date(1994, 7, 13));

const useAge = (): number => {
  const today = new Date();
  const age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const monthDiff = today.getMonth() - BIRTH_DATE.getMonth();

  return monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < BIRTH_DATE.getDate())
    ? age - 1
    : age;
};

export default useAge;

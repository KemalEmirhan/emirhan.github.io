import { Github, Linkedin, AtSign, Twitter, Instagram } from 'lucide-react';
import { type TAccountName } from '@/schemas';

// Mapping from account names to lucide-react icon components
export const ACCOUNT_ICON_MAPPING: Map<
  TAccountName,
  React.ComponentType<{ size?: number; className?: string }>
> = new Map([
  ['Github', Github],
  ['Linkedin', Linkedin],
  ['Medium', AtSign],
  ['Twitter', Twitter],
  ['Instagram', Instagram],
  ['Bluesky', AtSign],
]);

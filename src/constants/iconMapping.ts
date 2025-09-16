import { Github, Linkedin, BookOpen, Twitter, Instagram } from 'lucide-react';
import { type TAccountName } from '@/schemas';

// Mapping from account names to lucide-react icon components
export const ACCOUNT_ICON_MAPPING: Record<
  TAccountName,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Github,
  Linkedin,
  Medium: BookOpen,
  Twitter,
  Instagram,
} as const;

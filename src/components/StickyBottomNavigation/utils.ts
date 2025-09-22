import { NAVIGATIONS } from '@/constants/navigations';

export const getActiveLinkIndex = (pathname: string) =>
  NAVIGATIONS.findIndex(navigation => navigation.href === pathname);

export const calculateDotPosition = (
  navElement: HTMLElement,
  activeIndex: number,
  direction: 'horizontal' | 'vertical' = 'horizontal'
): number => {
  const links = navElement.querySelectorAll('a');
  const activeLink = links[activeIndex];

  if (!activeLink) return 0;

  const navRect = navElement.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  return direction === 'horizontal'
    ? linkRect.left - navRect.left + linkRect.width / 2
    : linkRect.top - navRect.top + linkRect.height / 2;
};

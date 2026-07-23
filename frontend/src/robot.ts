export interface RobotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  sitemap: string;
}

export const robotsConfig: RobotRule = {
  userAgent: '*',
  allow: [
    '/',
    '/welcome',
    '/about',
    '/contact',
    '/blogs',
    '/destinations',
    '/tips'
  ],
  disallow: [
    '/explore',
    '/map',
    '/assistant',
    '/profile',
    '/settings',
    '/dashboard',
    '/chat/',
    '/treks',
    '/marketplace'
  ],
  sitemap: 'https://adventurer-travel.vercel.app/sitemap.xml'
};

export default robotsConfig;

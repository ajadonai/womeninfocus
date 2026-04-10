import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'A research and advocacy platform focused on legal and policy analysis at the intersection of gender, public health, and governance.',
  openGraph: {
    title: 'About Us | Women in Focus',
    description: 'Meet the team behind Women in Focus — advancing accountability, strengthening institutions, and promoting equitable outcomes.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { MailIcon, LinkedInIcon, TwitterIcon, ScholarIcon } from '@/components/icons';
import type { SiteSettings } from '@/sanity/lib/fetch';

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const socialLinks = [
    { href: 'mailto:amalaokafor01@gmail.com', icon: MailIcon, label: 'Email' },
    { href: settings?.linkedinUrl || '#', icon: LinkedInIcon, label: 'LinkedIn' },
    { href: settings?.twitterUrl || '#', icon: TwitterIcon, label: 'X / Twitter' },
    { href: settings?.scholarUrl || '#', icon: ScholarIcon, label: 'Google Scholar' },
  ];

  return (
    <footer className="site-footer">
      <div className="container-wide">
        {/* Top row — branding + socials */}
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">
              <span>Women in Focus</span>
              <span className="site-logo-dot" aria-hidden="true" />
            </p>
            <p className="footer-tagline">
              Advancing women through research&nbsp;&amp;&nbsp;technology.
            </p>
          </div>

          <div className="footer-socials">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer-social-link"
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Women in Focus
          </p>
          <p className="footer-built">Built with intention.</p>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="footer-mobile-spacer" />
    </footer>
  );
}

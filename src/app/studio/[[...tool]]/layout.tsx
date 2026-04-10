import { metadata as studioMetadata } from 'next-sanity/studio';

export const metadata = {
  ...studioMetadata,
  title: 'Women in Focus — CMS',
  description: 'Content management for womeninfocus.ng',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#101112',
      }}
    >
      {children}
    </div>
  );
}

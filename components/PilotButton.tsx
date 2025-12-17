'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PilotButtonProps {
  href: string;
  className: string;
  children: React.ReactNode;
  source?: string;
}

export default function PilotButton({ href, className, children, source = 'Unknown' }: PilotButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Send e-post varsel
    setIsLoading(true);
    try {
      const response = await fetch('/api/pilot-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: source,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          referer: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to send pilot click notification:', data);
      } else {
        console.log('Pilot click notification sent successfully:', data);
      }
    } catch (error) {
      console.error('Failed to send pilot click notification:', error);
      // Continue anyway - don't block user action
    } finally {
      setIsLoading(false);
    }

    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pilot_click', {
        event_category: 'engagement',
        event_label: source,
        value: 1,
      });
    }

    // Let the default link behavior continue (scroll to #contact)
    // No need to preventDefault since we want the link to work normally
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {isLoading ? 'Sender...' : children}
    </Link>
  );
}


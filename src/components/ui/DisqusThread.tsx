import { useEffect } from 'react';

type DisqusProps = {
  identifier: string;
  title: string;
};

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config: (this: any) => void;
      }) => void;
    };
  }
}

export default function DisqusThread({ identifier, title }: DisqusProps) {
  useEffect(() => {
    if (window.DISQUS === undefined) {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://droppeek.disqus.com/embed.js';
      s.setAttribute('data-timestamp', Date.now().toString());
      (d.head || d.body).appendChild(s);
    } else {
      window.DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page.url = window.location.href;
          this.page.identifier = identifier;
          this.page.title = title;
        }
      });
    }
  }, [identifier, title]);

  return <div id="disqus_thread" />;
}

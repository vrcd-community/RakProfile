'use client';

import { useEffect, useState } from 'react';
import { APMComponent } from '@/components/apm';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#0a0a0a',
    color: '#fafafa',
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '1280px',
    border: '1px solid #27272a',
    borderRadius: '0.75rem',
    backgroundColor: '#18181b',
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid #27272a',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#f43f5e',
    margin: '0',
  },
  description: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#a1a1aa',
    margin: '0',
  },
  content: {
    padding: '1.5rem',
  },
  contentText: {
    fontSize: '0.875rem',
    color: '#a1a1aa',
    lineHeight: '1.5',
    margin: '0 0 1rem 0',
  },
  accordionTrigger: {
    width: '100%',
    padding: '0.5rem 0.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #27272a',
    color: '#fafafa',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  accordionContent: {
    marginTop: '1rem',
  },
  pre: {
    backgroundColor: '#020617',
    color: '#f8fafc',
    padding: '1rem',
    borderRadius: '0.5rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    lineHeight: '1.7',
  },
  codeBlock: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  footer: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    borderTop: '1px solid #27272a',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'opacity 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#fafafa',
    color: '#0a0a0a',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #27272a',
    color: '#fafafa',
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <>

      <APMComponent />
      <div style={styles.wrapper}>
        <style>
          {
            `
          body,html {
            margin: 0;
            padding: 0;
            font-family: system-ui, sans-serif;
            background-color: #0a0a0a;
            color: #fafafa;
            font-size: 16px;
            line-height: 1.5;
          }
          `
          }
        </style>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Oooops!</h1>
            <p style={styles.description}>
              我们遇到了一些技术问题，给您带来了不便，我们深表歉意。
            </p>
          </div>
          <div style={styles.content}>
            <p style={styles.contentText}>
              您可以尝试刷新页面，这可能会解决问题。如果问题仍然存在，请将以下错误信息反馈给我们，以便我们能更快地修复它。
            </p>
            <div>
              <button
                style={styles.accordionTrigger}
                onClick={() => setDetailsVisible(!detailsVisible)}
              >
                <span>查看详细的错误信息</span>
                <span style={{ transform: detailsVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              </button>
              {detailsVisible && (
                <div style={styles.accordionContent}>
                  {/* @ts-ignore */}
                  <pre style={styles.pre}>
                    <code style={styles.codeBlock}><strong>Message:</strong> {error.message}</code>
                    {error.digest && <code style={styles.codeBlock}><strong>Digest:</strong> {error.digest}</code>}
                    <code style={styles.codeBlock}><strong>Stack:</strong> {error.stack}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
          <div style={styles.footer}>
            <button
              style={{ ...styles.button, ...styles.buttonOutline }}
              onClick={() => alert("还没做喵 OwO")}
            >
              反馈此错误
            </button>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary }}
              onClick={() => reset()}
            >
              刷新页面
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
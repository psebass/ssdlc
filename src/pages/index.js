import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Bienvenido a ${siteConfig.title}`}
      description="Documentación técnica y guías">
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <h1 style={{fontSize: '4rem', fontWeight: '800'}}>{siteConfig.title}</h1>
        <p style={{fontSize: '1.5rem', opacity: '0.7'}}>{siteConfig.tagline}</p>
        <div style={{marginTop: '2rem'}}>
          <a 
            href="/docs/intro"
            style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              padding: '0.8rem 2rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
            Comenzar lectura
          </a>

        </div>
      </main>
    </Layout>
  );
}

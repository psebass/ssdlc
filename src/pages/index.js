import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link'; // Usamos Link de Docusaurus que es mejor que <a>

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Bienvenido a ${siteConfig.title}`}
      description="Documentación técnica y guías">
      <main className="hero-container"> 
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        <div className="hero-buttons">
          <Link 
            className="button button--primary button--lg"
            to="/docs/bienvenida">
            Comenzar
          </Link>
        </div>
      </main>
    </Layout>
  );
}
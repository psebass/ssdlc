import React from 'react';

export default function MiniCalendario({ mes, anio, eventos = {} }) {
  // Genera días básicos para el ejemplo; en producción usarías Date()
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="mini-calendar shadow--md">
      <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{mes} {anio}</h4>
      <table style={{ width: '100%', fontSize: '0.8rem', textAlign: 'center' }}>
        <thead>
          <tr>{['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(d => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            {dias.slice(0, 7).map(d => <td key={d} className={eventos[d] ? 'event-day' : ''}>{d}</td>)}
          </tr>
          {/* Resto de las semanas */}
          {dias.slice(7, 14).map(d => <td key={d} className={eventos[d] ? 'event-day' : ''}>{d}</td>)}
        </tbody>
      </table>
    </div>
  );
}
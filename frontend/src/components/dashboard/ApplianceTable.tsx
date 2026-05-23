import React from 'react';

export default function ApplianceTable() {
  const appliances = [
    { name: 'Nevera', status: 'Siempre Encendida', statusType: 'on', usage: '0.4 kWh' },
    { name: 'Lavadora', status: 'Inactiva', statusType: 'idle', usage: '0.1 kWh' },
    { name: 'Iluminación Principal', status: 'Activa', statusType: 'active', usage: '0.9 kWh' },
    { name: 'Cafetera', status: 'Pico de Consumo', statusType: 'peak', usage: '1.2 kWh' },
    { name: 'Cine en Casa', status: 'Reposo', statusType: 'standby', usage: '0.05 kWh' }
  ];

  const getStatusBadge = (statusType: string, status: string) => {
    switch (statusType) {
      case 'on':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{status}</span>;
      case 'idle':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">{status}</span>;
      case 'active':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{status}</span>;
      case 'peak':
        return <span className="px-3 py-1 bg-red-100 text-red-500 rounded-full text-xs font-medium">{status}</span>;
      case 'done':
      case 'standby':
        return <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">{status}</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <section aria-labelledby="appliance-table-title" className="card mt-2">
      <header className="flex justify-between items-center mb-6">
        <h2 id="appliance-table-title" className="text-[16px] font-bold text-text-primary">Distribución por Electrodoméstico</h2>
        <a href="#" className="text-brand font-semibold text-sm hover:underline">Ver Todos los Detalles</a>
      </header>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-border-subtle text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              <th className="pb-3 font-semibold">Electrodoméstico</th>
              <th className="pb-3 text-center font-semibold">Estado</th>
              <th className="pb-3 text-right font-semibold">Consumo</th>
            </tr>
          </thead>
          <tbody>
            {appliances.map((app, i) => (
              <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-app-bg transition-colors group">
                <td className="py-3 px-1 font-medium text-text-primary text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-border-light flex items-center justify-center text-text-muted bg-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </div>
                    {app.name}
                  </div>
                </td>
                <td className="py-3 px-1 text-center">
                  {getStatusBadge(app.statusType, app.status)}
                </td>
                <td className="py-3 px-1 text-right font-semibold text-text-primary text-sm">
                  {app.usage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

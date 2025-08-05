import { useEffect, useState } from 'react';
import { reportService, ReportDTO } from '../services/reportService';

export default function Reports() {
  const [reports, setReports] = useState<ReportDTO[]>([]);

  useEffect(() => {
    reportService.getAllReports().then(setReports);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Denúncias Recebidas</h1>
      {reports.map((report) => (
        <div key={report.id} className="border p-2 mb-2 rounded">
          <p><strong>Spot ID:</strong> {report.spotId}</p>
          <p><strong>Motivo:</strong> {report.reason}</p>
          <p><strong>Por:</strong> {report.reporterUsername}</p>
          <p><strong>Data:</strong> {new Date(report.createdAt!).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

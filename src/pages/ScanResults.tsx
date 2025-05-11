import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, Heart } from 'lucide-react';

const ScanResults: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (scanId) {
      const stored = localStorage.getItem(`scan_result_${scanId}`);
      if (stored) {
        setResult(JSON.parse(stored));
      }
    }
  }, [scanId]);

  if (!result) {
  return (
    <div className="text-center py-16">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Scan Result Available</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Upload a scan to study your heart and get instant AI-powered results and recommendations.
      </p>
      <div className="mt-6 flex flex-col items-center space-y-2">
        <Link
          to="/upload"
          className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 font-medium transition"
        >
          Upload Scan
        </Link>
        <Link to="/" className="text-cyan-600 hover:text-cyan-500 text-sm">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}


  const isAbnormal = result.class_name === 'abnormal';

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-4">Scan Analysis Result</h1>
      <div className="mb-4 flex items-center space-x-3">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          isAbnormal
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {result.class_name === 'healthy' ? 'Healthy' : 'Abnormal'}
        </span>
        <span className="text-gray-700 dark:text-gray-200">
          Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
        </span>
      </div>

      {/* Explanation */}
      {result.explanation && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-1">AI Explanation</h2>
          <p className="text-gray-700 dark:text-gray-200">{result.explanation}</p>
        </div>
      )}

      {/* Grad-CAM */}
      {result.gradcam && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-1">Grad-CAM Visualization</h2>
          <img
            src={`data:image/png;base64,${result.gradcam}`}
            alt="Grad-CAM Heatmap"
            className="rounded shadow border border-gray-200 dark:border-gray-700"
            style={{ maxWidth: 224, maxHeight: 224 }}
          />
        </div>
      )}

      {/* Findings */}
      {result.findings && Array.isArray(result.findings) && result.findings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Key Findings</h2>
          <ul className="space-y-2">
            {result.findings.map((finding: any, idx: number) => (
              <li key={idx} className="bg-red-50 dark:bg-red-900 rounded p-3 border border-red-100 dark:border-red-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium text-red-800 dark:text-red-200">{finding.type}</span>
                  {finding.severity && (
                    <span className="ml-2 text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-100 px-2 py-0.5 rounded">
                      {finding.severity}
                    </span>
                  )}
                </div>
                <div className="ml-7 text-red-700 dark:text-red-200">{finding.description}</div>
                {finding.confidence && (
                  <div className="ml-7 text-xs text-red-600 dark:text-red-300">Confidence: {finding.confidence}%</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metrics */}
      {(result.heartRate || result.qrsInterval || result.qtInterval) && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {result.heartRate && (
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Heart Rate</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{result.heartRate} bpm</span>
              </div>
            )}
            {result.qrsInterval && (
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">QRS Interval</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{result.qrsInterval} ms</span>
              </div>
            )}
            {result.qtInterval && (
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">QT Interval</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{result.qtInterval} ms</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Recommendations</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-200">
            {result.recommendations.map((rec: string, idx: number) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Note */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900 rounded-md p-4 border border-yellow-100 dark:border-yellow-700">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Note</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
              <p>
                This AI analysis is not a substitute for professional medical advice. Please consult with your healthcare provider regarding these results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Link
          to="/"
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ScanResults;

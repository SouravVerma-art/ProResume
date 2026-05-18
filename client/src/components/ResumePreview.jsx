import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import RegularTemplate from './templates/RegularTemplate';

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    regular: RegularTemplate,
    classic: ClassicTemplate,
  };

  const TemplateComponent = templates[template] || ClassicTemplate;

  return (
    <>
      <style>{`
        @page { 
          size: A4; 
          margin: 0mm; 
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            background: white;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            transform: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide scrollbars during print */
          ::-webkit-scrollbar { display: none; }
        }

      `}</style>
      <div className="bg-white shadow-2xl overflow-hidden">
        <div
          id="resume-preview"
          className={"print:shadow-none print:border-none " + classes}
          style={{ width: '210mm', minHeight: '297mm' }}
        >
          <TemplateComponent data={data} accentColor={accentColor} />
        </div>
      </div>
    </>
  );
};

export default ResumePreview;

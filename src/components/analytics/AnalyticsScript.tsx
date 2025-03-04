import React from "react";

interface AnalyticsScriptProps {
  measurementId?: string;
}

const AnalyticsScript: React.FC<AnalyticsScriptProps> = ({
  measurementId = "G-XXXXXXXXXX",
}) => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
};

export default AnalyticsScript;

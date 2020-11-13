import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
const PdfComponent = ({ document }) => {
  const { useState, useEffect } = React;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);
  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ url, loading, error }) => {
          if(loading){
            return (
              <span download className="btn btn-icon btn-light-primary btn-hover-primary btn-sm mx-3 justify-content-start">
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <span className="spinner spinner-primary ml-2"></span>
                </span>
              </span>
            )
          }
          else if(url){
            return (
              <a href={url} download className="btn btn-icon btn-light-primary btn-hover-primary btn-sm mx-3">
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i className="fas fa-eye"></i>
                </span>
              </a>
           );
          }
        }}
      </BlobProvider>
    );
  }
};
export default PdfComponent;


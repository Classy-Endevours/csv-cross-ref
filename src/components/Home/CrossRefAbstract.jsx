/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import Loader from 'react-loader-spinner';

import {
  ABSTRACT_FILE_NAME,
  ABSTRACT_HEADERS,
  API_URL,
  COLOR,
} from '../../constant/cross-ref';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useRecursive } from '../../hooks/useRecursive';
import useCSVFile from '../../hooks/useCsvFile';

function CrossRefAbstract() {
  const value = 'Please add your abstract string';
  const [text, setText] = useState('');
  const {
    error,
    isLoading,
    isSuccess,
    result,
    total,
    index,
    dispatch: dispatcher,
  } = useRecursive(API_URL);
  const { result: list, dispatch: fileDispatcher } = useCSVFile();

  const handleRefCSV = () => {
    if (list.length) {
      const key = 'DOI';
      dispatcher(list, key);
    }
  };
  // handle file upload
  const handleFileUpload = (e) => {
    fileDispatcher(e.target.files[0]);
  };

  return (
    <div style={{ margin: '24px' }}>
      <p>{error.message}</p>
      <h1>{value}</h1>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          width: '50%',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          className="mdc-button mdc-button--raised"
          onClick={() => handleRefCSV()}
        >
          {isLoading ? (
            <Loader
              type="Puff"
              color={COLOR}
              height={25}
              width={25}
              timeout={3000} // 3 secs
            />
          ) : (
            <span className="mdc-button__label">Submit</span>
          )}
        </button>
        {isSuccess && total === index && (
          <CSVLink
            data={result}
            filename={ABSTRACT_FILE_NAME}
            className="mdc-button mdc-button--raised"
          >
            Download
          </CSVLink>
        )}
      </div>
      {total !== 0 && (
        <p>
          Working on {index}/{total}
        </p>
      )}
      {result.map((e) => {
        return (
          <p
            style={{
              display: 'flex',
              width: '50%',
              justifyContent: 'space-between',
            }}
            key={e.value}
          >
            {e.value}
            {e.failed ? (
              <span>Wrong input: {e.failed} </span>
            ) : (
              <span>Stored</span>
            )}
          </p>
        );
      })}
    </div>
  );
}

export default CrossRefAbstract;

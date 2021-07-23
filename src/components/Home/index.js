/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import Loader from 'react-loader-spinner';

import { useActionFetch } from '../../hooks/useFetch';
import { changeValue } from './reducer';
import { convertCrossRef } from '../../util/convertCrossRef';
import { API_URL, COLOR, FILE_NAME, HEADERS } from '../../constant/cross-ref';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Home() {
  const { value } = useSelector((state) => state.homeReducer);
  const [text, setText] = useState('');
  const {
    error,
    isLoading,
    result,
    isSuccess,
    dispatch: dispatcher,
  } = useActionFetch(API_URL, {
    params: {
      'query.bibliographic': text,
    },
  });
  return (
    <div style={{ margin: '24px' }}>
      <p>{error.message}</p>
      <h1>{value}</h1>
      <textarea
        type="text"
        rows="8"
        cols="100"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
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
          onClick={() => dispatcher(changeValue(text))}
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
        {isSuccess && (
          <CSVLink
            data={convertCrossRef(result)}
            filename={FILE_NAME}
            headers={HEADERS}
            className="mdc-button mdc-button--raised"
          >
            Download
          </CSVLink>
        )}
      </div>
    </div>
  );
}

export default Home;

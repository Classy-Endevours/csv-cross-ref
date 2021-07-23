/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useActionFetch, useFetch } from '../../hooks/useFetch';
import { changeValue } from './reducer';

function Home() {
  const { value } = useSelector((state) => state.homeReducer);
  const [text, setText] = useState('');
  const [refetch, setRefetch] = useState(0);
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    result,
    dispatch: dispatcher,
  } = useActionFetch('https://api.crossref.org/works', {
    params: {
      'query.bibliographic': text,
    },
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <p>{error.message}</p>
      <h1>{value}</h1>
      <textarea
        type="text"
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        type="button"
        className="mdc-button mdc-button--raised"
        onClick={() => dispatcher(changeValue(text))}
      >
        <span className="mdc-button__label">Submit</span>
      </button>
      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Home;

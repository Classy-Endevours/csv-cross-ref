/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

export const useRecursiveRef = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = async (data, key) => {
    try {
      setIsLoading(true);
      setError('');
      setIsSuccess(false);
      const dataset = data;
      setTotal(dataset.length);
      for (let i = 0; i < dataset.length; i += 1) {
        const str = dataset[i][key].trim();
        setIndex(i + 1);
        const obj = {
          index: i + 1,
          ...dataset[i],
        };
        try {
          if (!str) {
            obj.failed = 'Empty Reference';
          } else {
            const response = await axios.get(`${url}`, {
              params: {
                'query.bibliographic': str,
              },
            });
            const { DOI, URL } = response.data.message.items[0];
            obj.DOI = DOI;
            obj.URL = URL;
          }
        } catch (loopError) {
          obj.failed = 'Some error occurred';
        }
        setData((state) => [...state, obj]);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (dispatchError) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(dispatchError);
    }
  };
  return {
    isLoading,
    result,
    isSuccess,
    error,
    dispatch,
    total,
    index,
  };
};

export default {};

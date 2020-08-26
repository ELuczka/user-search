import { useCallback, useEffect, useMemo, useState } from 'react';

export const useAsyncData = ({
    loadOnMount = false,
    fetchData = null,
  } = {}) => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const loadData = useCallback(async (event) => {
      setIsLoading(true);
      setError(false);
      fetchData(event).then((resp) => {     
        setData(resp);
        setIsLoading(false);
      }).catch(() => {
        setData();
        setError(true);
        setIsLoading(false);
      });
    },[fetchData]);

    useEffect(() => {
        if (loadOnMount && fetchData !== null) loadData();
      }, []);
  
    return useMemo(
        () => ({ 
            data, isLoading, error, loadData }), [data, isLoading, error, loadData]
        );
  };
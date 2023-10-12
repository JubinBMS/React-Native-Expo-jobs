import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "301b4cc8afmsh10bc3adf9aae72bp168b5ajsn1e4d2656b8b3",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async (id = null) => {
    setIsLoading(true);

    try {
      if (id) {
        options = {
          ...options,
          params: {
            job_id: id,
            extended_publisher_details: "false",
          },
        };
      }

      console.log(options, "=============", id);
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(id, error, query, endpoint);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (id = null) => {
    setIsLoading(true);
    if (id) {
      fetchData(id);
    } else {
      fetchData();
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

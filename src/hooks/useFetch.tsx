import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface BaseProps {
  path: string;
  start: boolean;
}

type GetProps = {
  method: "GET" | "HEAD";
  data?: never;
};

type PostProps = {
  method: "POST" | "DELETE" | "PUT";
  data: object;
};

type ConditionalProps = GetProps | PostProps;

type Props = BaseProps & ConditionalProps;

type FetchReturn = [
  data: object | undefined,
  loading: boolean,
  refresh: () => void,
  statusCode: number
];

function getUrl(relative: string) {
  // eslint-disable-next-line
  const urlExpression =
    "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)";
  const regex = new RegExp(urlExpression);

  if (relative.match(regex)) {
    return relative;
  }

  var mainURL = process.env.REACT_APP_API_ENDPOINT;
  if (mainURL === undefined) return "";
  if (mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/";

  if (relative.length > 0 && relative.charAt(0) === "/")
    relative = relative.substring(1, relative.length);

  return mainURL + relative;
}

const useFetch = ({ path, method, data, start }: Props): FetchReturn => {
  const [result, setResult] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusCode, setStatusCode] = useState(-1);

  const fetchData = useCallback(async () => {
    try {
      if (loading) return;
      setLoading(true);
      setResult({});
      setError("");

      const source = axios.CancelToken.source();
      const url = getUrl(path);
      axios({
        method,
        url,
        headers:
          data === undefined ? {} : { "Content-Type": "application/json" },
        data: JSON.stringify(data === undefined ? {} : data),
        cancelToken: source.token,
      })
        .then((res) => {
          console.log(res); // set response object in setResult
          setStatusCode(res.status);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError("Unknown error");
        });
    } catch (err) {}
  }, [data, loading, method, path]);

  useEffect(() => {
    if (start) {
      fetchData();
    }
  }, [fetchData, start]);

  const refresh = () => {
    fetchData();
  };

  return [result, loading, refresh, statusCode];
};

export function useGet({ path, start }: BaseProps): FetchReturn {
  return useFetch({ path, method: "GET", start });
}

export function usePost({
  path,
  start,
  data,
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: "POST", start, data });
  return fetchResult;
}

export default useFetch;

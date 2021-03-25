import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../workers/fileParser.worker';

interface UseWebWorker<T, P> {
  result: T | null;
  run: (value: P) => void;
}

export const useWebWorker = <T, P>(fn: (props: P) => T): UseWebWorker<T, P> => {
  const [result, setResult] = useState<T | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker();
    workerRef.current = worker;

    worker.onmessage = e => setResult(e.data);

    return () => {
      worker.terminate();
    };
  }, [fn]);

  const run = useCallback(props => {
    workerRef.current?.postMessage(props);
  }, []);

  return {
    result,
    run,
  };
};

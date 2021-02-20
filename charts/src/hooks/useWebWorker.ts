import { useCallback, useEffect, useRef, useState } from 'react';

const workerHandler = (fn: (props: any) => any) => {
  // eslint-disable-next-line no-param-reassign
  onmessage = (e: MessageEvent) => {
    const result = fn(e.data);
    console.log(result);
    postMessage(result, e.origin);
  };
};

interface UseWebWorker<T, P> {
  result: T | null;
  run: (value: P) => void;
}

export const useWebWorker = <T, P>(fn: (props: P) => T): UseWebWorker<T, P> => {
  const [result, setResult] = useState<T | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker('/../workers/parser.worker.ts');
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

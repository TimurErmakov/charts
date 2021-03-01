import { useCallback, useEffect, useRef, useState } from 'react';

const workerHandler = (fn: (props: any) => any) => {
  onmessage = (e: MessageEvent) => {
    const result = fn(e.data);
    (postMessage as any)(result);
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
    const blob = new Blob([`(${workerHandler})(${fn})`]);
    const worker = new Worker(URL.createObjectURL(blob));
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

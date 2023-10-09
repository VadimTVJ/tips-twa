import { useEffect } from 'react';
import { isObject } from '../is-object';

type Params = {
  callback: (qrHash: string | null) => void;
  enabled?: boolean;
};

// useQRScanner from @tma.js/sdk-react resolves promise useQRScanner.open(),
// when qr code not valid for our business logic (we can scan qr code only once).
// in this project we need to not stop handle scanned qr-codes until user close qr scanner
// or until scan valid qr code
// todo attach link to issue
export const useQrScannerListener = ({ callback, enabled = false }: Params) => {
  useEffect(() => {
    const listener = ({ data }: MessageEvent<any>) => {
      if (typeof data !== 'string') {
        return;
      }

      try {
        const json = JSON.parse(data);
        if (!isObject(json)) {
          return;
        }

        const { eventType, eventData } = json;
        if (typeof eventType !== 'string') {
          return;
        }

        callback(eventData.data);
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [enabled]);
};

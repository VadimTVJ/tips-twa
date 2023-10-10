import { useQRScanner } from '@tma.js/sdk-react';
import { useNavigate } from 'react-router-dom';
import { useQrScannerListener } from '../../../shared/lib/use-qr-scanner-listener';

export const useScanQR = () => {
  const regex = /(?:https?:\/\/)?t\.me\/\w+\/\w+\?startapp=(\d+)/;

  const navigate = useNavigate();
  const scanner = useQRScanner();

  useQrScannerListener({
    enabled: scanner.isOpened,
    callback: (qrHash) => {
      if (!qrHash) {
        return;
      }

      const valid = regex.test(qrHash);
      if (!valid) {
        return;
      }

      const waiterId = Number(qrHash.match(regex)?.[1]);
      if (!waiterId) {
        return;
      }

      navigate(`/tip/${waiterId}`);
    },
  });

  const scan = () => scanner.open('Scan the waiter\'s QR code');

  const isSupported = scanner.supports('open');

  return {
    isSupported,

    scan,
  };
};

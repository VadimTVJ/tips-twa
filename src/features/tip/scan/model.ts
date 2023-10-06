import { useQRScanner } from '@tma.js/sdk-react';
import { useNavigate } from 'react-router-dom';

export const useScanQR = () => {
  const navigate = useNavigate();
  const scanner = useQRScanner();

  const isSupported = scanner.supports('open');

  const scan = async () => {
    scanner.open('hello workd')
      .then((qrHash) => {
        console.log(qrHash);

        scanner.close();
        navigate('/tip/1');
      });
  };

  return {
    isSupported,

    scan,
  };
};

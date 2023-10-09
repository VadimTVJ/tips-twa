import { useQRScanner } from '@tma.js/sdk-react';
import { useNavigate } from 'react-router-dom';

export const useScanQR = () => {
  const navigate = useNavigate();
  const scanner = useQRScanner();

  const isSupported = scanner.supports('open');

  const scan = async () => {
    const regex = /^waiter_(\d+)$/;

    scanner.open('hello workd') // todo text
      .then((qrHash) => {
        if (!qrHash) {
          return; // todo проверить, будут ли дальне приходить сканы
        }
        console.log('qrHash', qrHash);

        const valid = regex.test(qrHash);
        if (!valid) {
          return; // todo handler
        }

        const waiterId = Number(qrHash.match(regex));
        if (!waiterId) {
          return; // todo
        }

        scanner.close();
        navigate(`/tip/${waiterId}`);
      });
  };

  return {
    isSupported,

    scan,
  };
};

import { ReactNode } from 'react';
import { useScanQR } from './model';

interface ScanQRButtonProps {
  children: (
    openScanner: () => void,
    isSupported: boolean,
  ) => ReactNode;
}

export const ScanQRButton = ({ children: render }: ScanQRButtonProps) => {
  const { isSupported, scan } = useScanQR();

  return (
    <>
      {render(scan, isSupported)}
    </>
  );
};

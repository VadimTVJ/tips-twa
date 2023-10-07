import { useEffect } from 'react';
import { useMainButton, useWebApp } from '@tma.js/sdk-react';
import { useInvoiceLinkQuery } from '../../../entities/tip/api';
import { buildAmountWithCurrency } from '../../../shared/config';

type Params = {
  form: {
    waiterId?: number;
    tipsAmount: number;
    currency: string;
  };
  onSuccess?: () => void;
  onError?: () => void;
  onCanceled?: () => void;
};

export const useAddTip = ({ form, onSuccess }: Params) => {
  const { waiterId, tipsAmount, currency } = form;

  const webApp = useWebApp();
  const mainButton = useMainButton();

  const { invoiceLink, fetchInvoiceLink } = useInvoiceLinkQuery({
    params: { ...form, waiterId: form.waiterId! },
  });

  useEffect(() => {
    mainButton.hideProgress();
    mainButton.setText('Pay');
    mainButton.disable();
    mainButton.show();

    return () => {
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (invoiceLink) {
      webApp.openInvoice(invoiceLink)
        .then((invoiceStatus) => {
          console.log('qq', invoiceStatus);
          if (invoiceStatus === 'paid') {
            onSuccess?.();
          }
        });
    }
  }, [invoiceLink]);

  useEffect(() => {
    // todo можно сделать input focus
    if (!waiterId) {
      mainButton.setText('Enter waiter');
    } else if (tipsAmount > 0) {
      mainButton.setText(`Pay (${buildAmountWithCurrency(tipsAmount, currency)})`);
    } else {
      mainButton.setText('Enter tips amount');
    }
  }, [tipsAmount, currency, waiterId]);

  useEffect(() => {
    const canPay = waiterId && tipsAmount > 0;

    const pressHandler = async () => {
      mainButton.showProgress();
      await fetchInvoiceLink();
      mainButton.hideProgress();
    };

    if (canPay) {
      mainButton.enable();
      mainButton.on('click', pressHandler);

      return () => {
        mainButton.disable();
        mainButton.off('click', pressHandler);
      };
    }
    mainButton.disable();

    return () => {};
  }, [mainButton, fetchInvoiceLink, tipsAmount, waiterId]);
};

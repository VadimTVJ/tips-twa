import { useEffect } from 'react';
import { useMainButton, useWebApp } from '@tma.js/sdk-react';
import { useInvoiceLinkQuery } from '../../../entities/tip/api';
import { buildAmountWithCurrency } from '../../../shared/config';
import { waiterModel } from '../../../entities/waiter';
import { useUpdateEffect } from '../../../shared/lib/use-update-effect';

type Params = {
  form: {
    waiter?: waiterModel.Waiter | null;
    tipsAmount: number;
    currency: string;
  };
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAddTip = ({ form, onSuccess, onError }: Params) => {
  const {
    waiter, tipsAmount, currency,
  } = form;

  const canPay = waiter && tipsAmount > 0;

  const webApp = useWebApp();
  const mainButton = useMainButton();

  const { invoiceLink, fetchInvoiceLink } = useInvoiceLinkQuery({
    params: { ...form, waiterId: waiter?.id || 0 },
  });

  useEffect(() => {
    // Reset main button config
    mainButton.hideProgress();
    mainButton.setText('Leave a tip');
    mainButton.enable();
    mainButton.show();

    return () => {
      mainButton.hide();
    };
  }, []);

  useUpdateEffect(() => {
    if (!canPay) { return; }

    if (invoiceLink) {
      if (!mainButton.isProgressVisible) {
        mainButton.showProgress();

        webApp.openInvoice(invoiceLink)
          .then((invoiceStatus) => {
            if (invoiceStatus === 'paid') {
              onSuccess?.();
            } else if (invoiceStatus === 'failed') {
              onError?.();
            }
          })
          .finally(() => {
            mainButton.hideProgress();
          });
      }
    }
  }, [invoiceLink]);

  useEffect(() => {
    const label = tipsAmount
      ? `Leave a tip (${buildAmountWithCurrency(tipsAmount, currency)})`
      : 'Leave a tip';

    mainButton.setText(label);
  }, [tipsAmount, currency]);

  useEffect(() => {
    const pressHandler = async () => {
      if (!canPay || mainButton.isProgressVisible) {
        return;
      }

      mainButton.showProgress();
      await fetchInvoiceLink();
      mainButton.hideProgress();
    };

    mainButton.on('click', pressHandler);

    return () => {
      mainButton.off('click', pressHandler);
    };
  }, [mainButton, fetchInvoiceLink, tipsAmount, waiter]);
};

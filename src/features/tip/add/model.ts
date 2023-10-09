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
    calculationMode: string;
    checkPrice: number;
  };
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAddTip = ({ form, onSuccess, onError }: Params) => {
  const {
    waiter, tipsAmount, currency, checkPrice, calculationMode,
  } = form;

  const canPay = waiter && tipsAmount > 0;

  const webApp = useWebApp();
  const mainButton = useMainButton();

  const { invoiceLink, fetchInvoiceLink } = useInvoiceLinkQuery({
    params: { ...form, waiterId: waiter?.id || 0 },
  });

  useEffect(() => {
    mainButton.hideProgress();
    mainButton.setText('Pay');
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
            } else if (invoiceStatus === 'cancelled' || invoiceStatus === 'failed') {
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
    if (!waiter) {
      mainButton.setText('Enter waiter');
      return;
    }
    if (calculationMode === 'percent' && !checkPrice) {
      mainButton.setText('Enter check price');
      return;
    }
    if (tipsAmount === 0) {
      mainButton.setText('Enter tips amount');
      return;
    }
    mainButton.setText(`Pay (${buildAmountWithCurrency(tipsAmount, currency)})`);
  }, [tipsAmount, currency, waiter, calculationMode, checkPrice]);

  useEffect(() => {
    const pressHandler = async () => {
      if (canPay || !mainButton.isProgressVisible) {
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

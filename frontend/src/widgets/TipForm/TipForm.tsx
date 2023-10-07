import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { useMainButton, useWebApp } from '@tma.js/sdk-react';
import styles from './TipForm.module.scss';
import {
  Radio, Section, SegmentedControl, TextField,
} from '../../shared/ui';
import { useInvoiceLinkQuery } from '../../entities/tip/api';

interface TipFormProps extends ComponentPropsWithRef<'form'> {
  waiterId?: number;
}

export const TipForm = ({ className, ...rest }: TipFormProps) => {
  const webApp = useWebApp();
  const mainButton = useMainButton();

  const {
    control, watch,
  } = useForm({
    defaultValues: {
      calculationMode: 'fix',
      waiterId: '',
      total: '1000',
      percent: '20',
      tipsAmount: '100',
    },
  });

  const calculationMode = watch('calculationMode');
  const tipsAmount = watch('tipsAmount');

  const { invoiceLink, fetchInvoiceLink } = useInvoiceLinkQuery();

  useEffect(() => {
    if (invoiceLink) {
      webApp.openInvoice(invoiceLink);
    }
  }, [invoiceLink]);

  useEffect(() => {
    if (mainButton.isEnabled && mainButton.isVisible) {
      // todo добавить лоадер
      console.log('actopn added');
      mainButton.on('click', fetchInvoiceLink);

      return () => {
        console.log('action removed'); // todo check
        mainButton.off('clock', fetchInvoiceLink);
      };
    }

    return () => {};
  }, [mainButton.isEnabled, mainButton.isVisible]);

  useEffect(() => {
    if (Number(tipsAmount)) {
      mainButton.enable();
    } else {
      mainButton.disable();
    }
  }, [tipsAmount]);

  useEffect(() => {
    mainButton.hideProgress();
    mainButton.setText('Pay');
    mainButton.disable();
    mainButton.show();

    return () => {
      mainButton.hide();
    };
  }, []);

  const rootClassName = clsx(className, styles.TipForm);
  return (
    <form
      className={rootClassName}
      {...rest}
    >
      <Controller
        name="waiterId"
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field,
        }) => (
          <Section
            header="Код официанта"
            description={<span className="color_red">Официант не найден</span>}
          >
            <TextField {...field} placeholder="Код официанта" />
          </Section>
        )}
      />

      <Section header="Чаевые">
        <Controller
          name="calculationMode"
          control={control}
          render={({
            field,
          }) => (
            <Radio
              {...field}
              value="fix"
              checked={calculationMode === 'fix'} // todo RadioGroup instead checked prop
            >
              Фиксированная сумма
            </Radio>
          )}
        />
        <Controller
          name="calculationMode"
          control={control}
          render={({
            field,
          }) => (
            <Radio
              {...field}
              value="percent"
              checked={calculationMode === 'percent'}
            >
              Процент от покупки
            </Radio>
          )}
        />
      </Section>

      {calculationMode === 'percent' && (
        <>
          <Controller
            name="total"
            control={control}
            render={({
              field,
            }) => (
              <Section header="Сумма чека, ₽">
                <TextField {...field} />
              </Section>
            )}
          />

          <Controller
            name="percent"
            control={control}
            render={({
              field,
            }) => (
              <Section header="Процент от суммы">
                <SegmentedControl
                  {...field}
                  items={[
                    { label: '10%', value: '10' },
                    { label: '15%', value: '15' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                  ]}
                />
              </Section>
            )}
          />
        </>
      )}

      <Controller
        name="tipsAmount"
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field,
        }) => (
          <Section header="Чаевые">
            <TextField {...field} />
          </Section>
        )}
      />
    </form>
  );
};

import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './TipForm.module.scss';
import {
  Button,
  ButtonMode,
  ButtonSize,
  Radio,
  Section,
  SegmentedControl, Spinner,
  TextField,
} from '../../shared/ui';
import { waiterApi, WaiterCell } from '../../entities/waiter';
import { useAddTip } from '../../features/tip';
import { buildAmountWithCurrency, currencies } from '../../shared/config';

interface TipFormProps extends ComponentPropsWithRef<'form'> {
  waiterId?: number;
}

export const TipForm = ({ className, waiterId: initialWaiterId, ...rest }: TipFormProps) => {
  const navigate = useNavigate();

  const {
    control, setValue,
  } = useForm({
    defaultValues: {
      waiterId: initialWaiterId || 0,
      calculationMode: 'percent',
      currency: currencies[0].code,
      checkPrice: 0,
      percent: 20,
      tipsAmount: 0,
    },
  });

  const [waiterId, calculationMode, checkPrice, percent, tipsAmount, currency] = useWatch({
    control,
    name: ['waiterId', 'calculationMode', 'checkPrice', 'percent', 'tipsAmount', 'currency'],
  });

  const {
    isWaiterError, waiter, fetchWaiter, waiterFetchStatus,
  } = waiterApi.useWaiterByIdQuery({
    params: { waiterId: Number(waiterId) },
  });

  useAddTip({
    form: {
      waiter, tipsAmount, currency, calculationMode, checkPrice,
    },
    onSuccess: () => navigate('/success', { replace: true }),
    onError: () => navigate('/error'),
  });

  const currencyInfo = currencies.find(({ code }) => code === currency) || currencies[0];

  useEffect(() => {
    setValue('tipsAmount', Math.round((checkPrice / 100) * percent) || 0);
  }, [checkPrice, percent]);

  useEffect(() => {
    if (initialWaiterId) {
      fetchWaiter();
    }
  }, []);

  const rootClassName = clsx(className, styles.TipForm);
  return (
    <form className={rootClassName} {...rest}>
      {waiter && (
        <Section header="Официант">
          <WaiterCell
            waiter={waiter}
            after={(
              <Button
                type="button"
                size={ButtonSize.SMALL}
                mode={ButtonMode.TERTIARY}
              >
                Отвенить
              </Button>
            )}
          />
        </Section>
      )}

      {!waiter && (
        <Controller
          name="waiterId"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <Section
              header="Код официанта"
              description={isWaiterError && <span className="color_red">Официант не найден</span>}
            >
              <TextField
                value={value || ''}
                placeholder="Укажите код официанта"
                autoFocus
                after={(
                  <>
                    {waiterFetchStatus === 'fetching' && <Spinner />}

                    {waiterFetchStatus !== 'fetching' && !!waiterId && (
                      <Button
                        type="button"
                        size={ButtonSize.SMALL}
                        mode={ButtonMode.TERTIARY}
                        onClick={() => fetchWaiter()}
                      >
                        Найти
                      </Button>
                    )}
                  </>
                )}
                {...restField}
              />
            </Section>
          )}
        />
      )}

      <Section header="Чаевые">
        <Controller
          name="calculationMode"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <Radio
              value="percent"
              checked={calculationMode === 'percent'}
              {...restField}
            >
              Процент от покупки
            </Radio>
          )}
        />
        <Controller
          name="calculationMode"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <Radio
              value="fix"
              // todo RadioGroup wrapper with context instead of checked prop
              checked={calculationMode === 'fix'}
              {...restField}
            >
              Фиксированная сумма
            </Radio>
          )}
        />
      </Section>

      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <Section
            header="Валюта"
            description={`Min: ${buildAmountWithCurrency(currencyInfo.min, currency)}, max: ${buildAmountWithCurrency(currencyInfo.max, currency)}`}
          >
            <SegmentedControl
              items={currencies.map(({ code }) => ({
                value: code,
                label: code,
              }))}
              {...field}
            />
          </Section>
        )}
      />

      {calculationMode === 'percent' && (
        <>
          <Controller
            name="checkPrice"
            control={control}
            render={({ field: { value, ...restField } }) => (
              <Section header="Сумма чека">
                <TextField
                  placeholder="Укажите сумму чека"
                  value={value || ''}
                  {...restField}
                />
              </Section>
            )}
          />

          <Controller
            name="percent"
            control={control}
            render={({ field }) => (
              <Section header="Процент от суммы">
                <SegmentedControl
                  items={[
                    { label: '10%', value: '10' },
                    { label: '15%', value: '15' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                  ]}
                  {...field}
                />
              </Section>
            )}
          />
        </>
      )}

      <Controller
        name="tipsAmount"
        control={control}
        render={({ field: { value, ...restField } }) => (
          <Section header="Чаевые">
            <TextField
              placeholder="Укажите размер чаевых"
              value={value || ''}
              {...restField}
            />
          </Section>
        )}
      />
    </form>
  );
};

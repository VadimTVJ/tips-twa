import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';
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
    control, setValue, setFocus,
  } = useForm({
    defaultValues: {
      waiterId: initialWaiterId,
      calculationMode: 'percent',
      currency: currencies[0].code,
      checkPrice: 0,
      percent: 20,
      tipsAmount: 0,
      test: '123123',
    },
  });

  const [waiterId, calculationMode, checkPrice, percent, tipsAmount, currency] = useWatch({
    control,
    name: ['waiterId', 'calculationMode', 'checkPrice', 'percent', 'tipsAmount', 'currency'],
  });

  useAddTip({
    form: { waiterId, tipsAmount, currency },
    onSuccess: () => navigate('/result'),
  });

  const {
    isWaiterError, waiter, fetchWaiter, waiterFetchStatus,
  } = waiterApi.useWaiterByIdQuery({
    params: { waiterId: Number(waiterId) },
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
      <button
        type="button"
        onClick={() => setFocus('test')}
      >
        test
      </button>

      <br />

      <Controller
        name="test"
        control={control}
        render={({
          field,
        }) => (
          <Slot>
            <input
              style={{
                background: 'red',
                color: 'green',
              }}
              {...field}
            />
          </Slot>
        )}
      />

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
          render={({
            field,
          }) => (
            <Section
              header="Код официанта"
              description={isWaiterError && <span className="color_red">Официант не найден</span>}
            >
              <TextField
                {...field}
                placeholder="Код официанта"
                after={(
                  <>
                    {waiterFetchStatus === 'fetching' && <Spinner />}

                    {waiterFetchStatus !== 'fetching' && waiterId && (
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
              />
            </Section>
          )}
        />
      )}

      <Section header="Чаевые">
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
        <Controller
          name="calculationMode"
          control={control}
          render={({
            field,
          }) => (
            <Radio
              {...field}
              value="fix"
              // todo RadioGroup wrapper with context instead of checked prop
              checked={calculationMode === 'fix'}
            >
              Фиксированная сумма
            </Radio>
          )}
        />
      </Section>

      <Controller
        name="currency"
        control={control}
        render={({
          field,
        }) => (
          <Section
            header="Валюта"
            description={`Min: ${buildAmountWithCurrency(currencyInfo.min, currency)}, max: ${buildAmountWithCurrency(currencyInfo.max, currency)}`}
          >
            <SegmentedControl
              {...field}
              items={currencies.map(({ code }) => ({
                value: code,
                label: code,
              }))}
            />
          </Section>
        )}
      />

      {calculationMode === 'percent' && (
        <>
          <Controller
            name="checkPrice"
            control={control}
            render={({
              field: { value, ...restField },
            }) => (
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
        render={({
          field: { value, ...restField },
        }) => (
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

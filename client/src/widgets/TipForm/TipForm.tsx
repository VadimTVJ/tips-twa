import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMainButton, useQRScanner } from '@tma.js/sdk-react';
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

interface TipFormProps extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  waiterId?: number;
}

export const TipForm = ({ className, waiterId: initialWaiterId, ...rest }: TipFormProps) => {
  const navigate = useNavigate();
  const mainButton = useMainButton();
  const qrScanner = useQRScanner();

  const {
    control, setValue, handleSubmit, formState,
  } = useForm({
    mode: 'all',
    defaultValues: {
      waiterId: initialWaiterId || 0,
      calculationMode: 'percent',
      currency: currencies[0].code,
      checkPrice: 0,
      percent: 10,
      tipsAmount: 0,
    },
  });

  const [waiterId, calculationMode, checkPrice, percent, tipsAmount, currency] = useWatch({
    control,
    name: ['waiterId', 'calculationMode', 'checkPrice', 'percent', 'tipsAmount', 'currency'],
  });

  const {
    isWaiterError, waiter, fetchWaiter, waiterFetchStatus, removeWaiter,
  } = waiterApi.useWaiterByIdQuery({
    params: { waiterId: Number(waiterId) },
  });

  useAddTip({
    form: {
      waiter, tipsAmount, currency,
    },
    onSuccess: () => navigate('/success', { replace: true }),
    onError: () => navigate('/error'),
  });

  const currencyInfo = currencies.find(({ code }) => code === currency) || currencies[0];

  useEffect(() => {
    setValue('tipsAmount', Math.round((checkPrice / 100) * percent) || 0);
  }, [checkPrice, percent]);

  useEffect(() => {
    const pressHandler = () => {
      handleSubmit(() => {})();
    };

    mainButton.on('click', pressHandler);

    return () => {
      mainButton.off('click', pressHandler);
    };
  }, []);

  useEffect(() => {
    if (initialWaiterId) {
      (async () => {
        await fetchWaiter();

        if (qrScanner.supports('close')) {
          qrScanner.close();
        }
      })();
    }
  }, [initialWaiterId]);

  const rootClassName = clsx(className, styles.TipForm);
  return (
    <form className={rootClassName} {...rest}>
      {waiter && (
        <Section header="Waiter">
          <WaiterCell
            waiter={waiter}
            after={(
              <Button
                type="button"
                size={ButtonSize.SMALL}
                mode={ButtonMode.TERTIARY}
                onClick={removeWaiter}
              >
                Undo
              </Button>
            )}
          />
        </Section>
      )}

      {!waiter && (
        <Controller
          name="waiterId"
          control={control}
          rules={{
            min: { value: 1, message: 'Enter waiter ID' },
            pattern: /^[0-9]/,
          }}
          render={({ field: { value, ...restField } }) => (
            <Section
              header="Waiter ID"
              error={formState.errors.waiterId?.message
                ? formState.errors.waiterId.message
                : isWaiterError && <span className="color_red">No waiter found</span>}
            >
              <TextField
                value={value || ''}
                placeholder="Enter waiter ID"
                inputMode="numeric"
                type="number"
                pattern="^[0-9]"
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
                        Apply
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

      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <Section header="Currency">
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

      <Section header="Mode">
        <Controller
          name="calculationMode"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <Radio
              value="percent"
              checked={calculationMode === 'percent'}
              {...restField}
            >
              Percent of bill
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
              Fixed tip amount
            </Radio>
          )}
        />
      </Section>

      {calculationMode === 'percent' && (
        <>
          <Controller
            name="checkPrice"
            control={control}
            rules={{
              min: { value: 1, message: 'Enter bill amount' },
              pattern: /^[0-9]/,
            }}
            render={({ field: { value, ...restField } }) => (
              <Section
                header="Bill Amount"
                error={formState.errors.checkPrice?.message}
              >
                <TextField
                  placeholder="Enter bill amount"
                  value={value || ''}
                  inputMode="numeric"
                  type="number"
                  pattern="^[0-9]"
                  {...restField}
                />
              </Section>
            )}
          />

          <Controller
            name="percent"
            control={control}
            render={({ field: { value, ...restField } }) => (
              <Section header="Percent of bill">
                <SegmentedControl
                  items={[
                    { label: '10%', value: '10' },
                    { label: '15%', value: '15' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                  ]}
                  value={value.toString()}
                  {...restField}
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
          minLength: { value: 1, message: 'Enter tip amount' },
          min: { value: currencyInfo.min, message: `Minimum tip amount — ${buildAmountWithCurrency(currencyInfo.min, currency)}` },
          max: { value: currencyInfo.max, message: `Maximum tip amount — ${buildAmountWithCurrency(currencyInfo.max, currency)}` },
        }}
        render={({ field: { value, onChange, ...restField } }) => (
          <Section
            header="Tip"
            error={formState.errors.tipsAmount?.message}
            description={`Min: ${buildAmountWithCurrency(currencyInfo.min, currency)}, max: ${buildAmountWithCurrency(currencyInfo.max, currency)}`}
          >
            <TextField
              onChange={(e) => {
                setValue('calculationMode', 'fix');

                onChange(e);
              }}
              placeholder="Enter amount of the tip"
              value={value || ''}
              inputMode="numeric"
              type="number"
              pattern="^[0-9]"
              {...restField}
            />
          </Section>
        )}
      />
    </form>
  );
};

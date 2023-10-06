import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import styles from './TipForm.module.scss';
import {
  Radio, Section, SegmentedControl, TextField,
} from '../../shared/ui';

interface TipFormProps extends ComponentPropsWithRef<'form'> {
  waiterId?: number;
}

export const TipForm = ({ className, ...rest }: TipFormProps) => {
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

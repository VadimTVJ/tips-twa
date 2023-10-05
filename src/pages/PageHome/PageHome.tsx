import { ComponentPropsWithRef, useState } from 'react';

import { clsx } from 'clsx';
import styles from './PageHome.module.scss';
import {
  Page, Hero, SegmentedControl, Component, Typography, ListItem, Section, TextField, Radio, Spinner,
} from '../../shared/ui';
import Logo from './scan-icon.svg?react';

interface PageHomeProps extends ComponentPropsWithRef<'div'> {}

const test2 = [
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
  { label: '20%', value: '20' },
  { label: '30%', value: '30' },
];

export function PageHome({ className }: PageHomeProps) {
  const [control, setControl] = useState(test2[0].value);
  const [control2, setControl2] = useState(test2[0].value);

  const rootClassName = clsx(className, styles.PageHome);
  return (
    <Page className={rootClassName}>
      <Hero
        heading="Отправим чаевые?"
        subheading="Выберите более подходящий вариант"
        filled
        icon={<img src="./test.png" alt="" />}
      />

      <Component as={Hero} heading="asd">
        123
      </Component>

      <div style={{ padding: 10, boxSizing: 'border-box', width: '100%' }}>
        <Section header="Hello world" description="Hello world">
          <ListItem before={<Logo />} onClick={() => {}}>
            <ListItem.Text primary="Hello" secondary="World" />
          </ListItem>

          <ListItem
            onClick={() => {}}
            after={(
              <div>
                <Typography variant="text">500Р</Typography>
                <Typography variant="subtitle1">10%</Typography>
              </div>
          )}
          >
            123213
          </ListItem>

          <ListItem>
            123213
          </ListItem>

          <TextField
            as="input"
            placeholder="Input text..."
            disabled
            value="1232132"
            after={<Spinner />}
          />
        </Section>

        <Section header="Textarea">
          <TextField
            as="textarea"
            after={<div style={{ width: 22, height: 22, background: 'red' }} />}
            placeholder="Input text..."
          />
          <Radio
            checked={control === test2[0].value}
            onChange={() => setControl(test2[0].value)}
          >
            {/* todo ListItem.text сделать отдельным абстрактным компонентом */}
            <ListItem.Text primary="Фиксированная сумма" secondary="Test" />
          </Radio>
          <Radio
            checked={control === test2[1].value}
            onChange={() => setControl(test2[1].value)}
          >
            Процентом от покупки
          </Radio>
        </Section>
      </div>

      <Section
        mode="full"
        header="Hello world"
        description="Hello world"
      >
        <ListItem
          onClick={() => {}}
          after={(
            <div>
              <Typography variant="text">500Р</Typography>
              <Typography variant="subtitle1">10%</Typography>
            </div>
          )}
        >
          123213
        </ListItem>

        <ListItem>
          123213
        </ListItem>
      </Section>

      <div style={{ padding: 10, boxSizing: 'border-box', width: '100%' }}>
        <SegmentedControl
          name="test"
          items={test2}
          value={control}
          onChange={setControl}
        />
      </div>

      <div style={{ padding: 10, boxSizing: 'border-box', width: '100%' }}>
        <SegmentedControl
          name="test2"
          items={test2}
          value={control2}
          onChange={setControl2}
        />
      </div>

      <Typography variant="h1">H1. Hello world! How are you?</Typography>
      <Typography variant="h2">H2. Hello world! How are you?</Typography>
      <Typography variant="h3">H3. Hello world! How are you?</Typography>
      <Typography variant="text">TEXT. Hello world! How are you?</Typography>
      <Typography variant="subtitle1">SUB1. Hello world! How are you?</Typography>
      <Typography variant="subtitle2">SUB2. Hello world! How are you?</Typography>
    </Page>
  );
}

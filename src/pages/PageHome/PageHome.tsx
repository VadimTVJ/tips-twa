import { ComponentPropsWithRef, useState } from 'react';

import { clsx } from 'clsx';
import styles from './PageHome.module.scss';
import {
  Button,
  Component,
  ConfigProvider,
  Hero, InfoRows,
  ListItem,
  Page,
  Radio,
  Section,
  SegmentedControl,
  Spinner,
  TextField,
  Theme,
  Typography,
} from '../../shared/ui';
import Logo from './scan-icon.svg?react';

interface PageHomeProps extends ComponentPropsWithRef<'div'> {}

const test2 = [
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
  { label: '20%', value: '20' },
  { label: '30%', value: '30' },
];

// todo проверять, доступен ли скан куаркода, если нет, то делать listItem disabled
export function PageHome({ className }: PageHomeProps) {
  const [control, setControl] = useState<string | undefined | number>(test2[0].value);
  const [control2, setControl2] = useState<string | undefined | number>(test2[0].value);
  const [theme, setTheme] = useState(Theme.LIGHT);

  const rootClassName = clsx(className, styles.PageHome);
  return (
    <ConfigProvider theme={theme}>
      <Page className={rootClassName}>
        <Hero
          heading="Отправим чаевые?"
          subheading="Выберите более подходящий вариант"
          filled
          icon={<img src="./test.png" alt="" />}
        />

        <Button size="s" stretched>Button 1</Button>
        <br />
        <Button size="m" stretched>Button 2</Button>
        <br />
        <Button size="l" stretched>Button 3</Button>
        <br />
        <Button size="s" stretched mode="secondary">Button 1</Button>
        <br />
        <Button size="m" stretched mode="secondary">Button 2</Button>
        <br />
        <Button size="l" stretched mode="secondary">Попробовать еще раз</Button>

        <Component as={Hero} heading="asd">
          123
        </Component>

        <div style={{ padding: 10, boxSizing: 'border-box', width: '100%' }}>
          <Section header="Hello world" description="Hello world">
            <ListItem before={<Logo />} onClick={() => {}}>
              <InfoRows primary="Hello" secondary="World" />
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
              checked={theme === 'light'}
              onChange={() => setTheme(Theme.LIGHT)}
            >
              <InfoRows primary="Фиксированная сумма" secondary="Test" />
            </Radio>
            <Radio
              checked={theme === 'dark'}
              onChange={() => setTheme(Theme.DARK)}
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
    </ConfigProvider>
  );
}

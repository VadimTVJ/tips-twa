import { Decorator } from '@storybook/react';
import { ConfigProvider } from '../src/shared/ui';

export const withUIWrapper: Decorator = (Component, context) => {
  const { theme } = context.globals;

  if (theme === 'dark') {
    document.body.style.setProperty('--App_tg-background', '#8774e1');
    document.body.style.setProperty('--App_tg-color', '#ffffff');
    document.body.style.setProperty('--App__background-color_body', '#181818');
    document.body.style.setProperty('--App__background-color_content', '#212121');
    document.body.style.setProperty('--App__background-color_secondary', '#74748014');
    document.body.style.setProperty('--App__text-color_primary', '#ffffff');
    document.body.style.setProperty('--App__text-color_secondary', '#aaaaaa');
    document.body.style.setProperty('--App__text-color_link', '#8774e1');
    document.body.style.setProperty('--App__separator-color_secondary', '#535353');
  } else {
    document.body.style.setProperty('--App_tg-background', '#3390ec');
    document.body.style.setProperty('--App_tg-color', '#ffffff');
    document.body.style.setProperty('--App__background-color_body', '#f4f4f5');
    document.body.style.setProperty('--App__background-color_content', '#ffffff');
    document.body.style.setProperty('--App__background-color_secondary', '#74748014');
    document.body.style.setProperty('--App__text-color_primary', '#000000');
    document.body.style.setProperty('--App__text-color_secondary', '#707579');
    document.body.style.setProperty('--App__text-color_link', '#00488f');
    document.body.style.setProperty('--App__separator-color_secondary', '#dce1e6');
  }

  return (
    <ConfigProvider>
      <Component />
    </ConfigProvider>
  );
};

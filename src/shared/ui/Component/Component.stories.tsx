import type { Meta, StoryObj } from '@storybook/react';
import { ElementType } from 'react';
import { Component } from '.';
import { Section } from '../Section';
import { PolymorphicComponentProp } from '../generics';

const meta: Meta<PolymorphicComponentProp<ElementType>> = {
  title: 'Common/Component',
  component: Component,

  args: {
    as: 'div',
    children: 'Change as prop and see my root tag in devtools',
  },

  argTypes: {
    as: {
      description: 'Root (ElementType) or component func of react component',
      control: 'select',
      options: ['div', 'span', 'h1', 'h2', 'b', 'i', 'textarea'],
    },
  },
};

export default meta;
type Story = StoryObj<PolymorphicComponentProp<ElementType>>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Section
        header="Polymorphic component"
        description="A polymorphic component is a component that can act in more than one way depending on how it is instantiated"
      >
        <Component {...args} />
      </Section>
    );
  },
};

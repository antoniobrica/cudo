import React from 'react';
import { useTranslation } from 'react-i18next';
import './test-component.module.scss';

/* eslint-disable-next-line */
export interface TestComponentProps { }

export function TestComponent(props: TestComponentProps) {
  const { t } = useTranslation();
  return (
    <div>
      <h1> {t('messages.test')}</h1>
    </div>
  );
}

export default TestComponent;

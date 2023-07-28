import React from 'react';

import './../../../assets/style/index.scss'
import { Progress } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface Tasks {
  progress?
}

export function ProgressBar(props: Tasks) {
const {t} = useTranslation()
  const description = [

  ]
  return (

    <div>

      <Progress percent={props.progress}>{t("project_tab_menu.files.completed")} {props.progress} %</Progress>

    </div>


  );
}

export default ProgressBar;

import React from 'react';
import './country.module.scss';
import { useCountrykQuery } from '../../services/useRequest';
import { GET_COUNTRY } from '../../graphql/graphql';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface CountryProps {
  parentCallback?

}

export function Country(props: CountryProps) {
  const [items, setItems] = React.useState([])
  const [country, setCountry] = React.useState("")
  const {t} = useTranslation()

  const { loading, error, data } = useCountrykQuery(GET_COUNTRY);
  React.useEffect(() => {
    if (data) {
      setItems(data.countries.map(({ countryName }) => ({ key: countryName, value: countryName, text: countryName })));

    }
  }, [data]);

  const onCountry = (event, data) => {
    setCountry(data.value)
    props?.parentCallback(data.value)
  }
  return (
    <Form.Field>
      <label>{t("register.country")}</label>
      <Select
        placeholder={t("common.select")} className="small" options={items}
        value={country}
        onChange={onCountry}
        clearable
      />
    </Form.Field>
  );
}

export default Country;

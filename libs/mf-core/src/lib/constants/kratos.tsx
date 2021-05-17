interface FormLabel {
  label: string;
  priority: number;
}

export const FORM_LABELS: { [key: string]: FormLabel } = {
  "to_verify": {
    label: "Email",
    priority: 100
  },
  "csrf_token": {
    label: "",
    priority: 100
  },
  "traits.email": {
    label: "Email",
    priority: 90,
  },
  email: {
    label: "Email",
    priority: 80
  },
  identifier: {
    label: "Email",
    priority: 80
  },
  password: {
    label: "Password",
    priority: 80
  },
  "traits.name.first": {
    label: "First Name",
    priority: 90,
  },
  "traits.name.last": {
    label: "Last Name",
    priority: 90,
  },
  "traits.company.company_name": {
    label: "Comapny Name",
    priority: 90,
  },
  "traits.phone.country_code": {
    label: "Country Code",
    priority: 90,
  },
  "traits.phone.phone_number": {
    label: "Phone Number",
    priority: 90,
  },
  "traits.address.address_line_1": {
    label: "Address Line 1",
    priority: 90,
  },
  "traits.address.address_line_2": {
    label: "Address Line 2",
    priority: 90,
  },
  "traits.address.city": {
    label: "City",
    priority: 90,
  },
  "traits.address.state_pin": {
    label: "State Pin",
    priority: 90,
  },
  "traits.address.country": {
    label: "Country",
    priority: 90,
  },
}

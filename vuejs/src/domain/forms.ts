export const integerPattern = /^\d*$/;

export const requiredRule = (value: string) => !!(value && (typeof value !== 'string' || value.length)) || '';
export const integerRule = (value: string) => !!(!value || (!value.length || value.match(integerPattern))) || '';

export const formRules = {
  required: requiredRule,
  integer: integerRule,
};

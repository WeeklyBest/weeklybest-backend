export interface IPropsWithPropertyName {
  property: string;
}
interface IPropsWithMinLength extends IPropsWithPropertyName {
  minLength: number;
}
interface IPropsWithMaxLength extends IPropsWithPropertyName {
  maxLength: number;
}

interface IPropsWithMax extends IPropsWithPropertyName {
  max: number;
}

interface IPropsWithMin extends IPropsWithPropertyName {
  min: number;
}

interface IMessageOptions extends IPropsWithPropertyName {
  description?: string;
  example?: string;
}

type PropsWithLength = IPropsWithMinLength & IPropsWithMaxLength;

export function getMinLengthMessage({
  property,
  minLength,
}: IPropsWithMinLength) {
  return `${property}의 길이는 ${minLength}자 이상이어야합니다.`;
}

export function getMaxLengthMessage({
  property,
  maxLength,
}: IPropsWithMaxLength) {
  return `${property}의 길이는 ${maxLength}자 이하여야합니다.`;
}

export function getLengthMessage({
  property,
  minLength,
  maxLength,
}: PropsWithLength) {
  return `${property}의 길이는 ${minLength}자 ~ ${maxLength}자 이내여야 합니다.`;
}

export function getIsNotEmptyMessage({ property }: IPropsWithPropertyName) {
  return `${property} 입력이 누락되었습니다.`;
}

// 타입 관련 함수
function getTypeCheckMessage(property: string, type: string) {
  return `${property} 필드는 ${type} 형식이어야 합니다.`;
}

export function getIsStringMessage({ property }: IPropsWithPropertyName) {
  return getTypeCheckMessage(property, '문자열');
}

export function getIsIntMessage({ property }: IPropsWithPropertyName) {
  return getTypeCheckMessage(property, '정수형');
}

export function getIsNumberStringMessage({ property }: IPropsWithPropertyName) {
  return getTypeCheckMessage(property, '숫자형 문자열');
}

export function getIdDateMessage({ property }: IPropsWithPropertyName) {
  return getTypeCheckMessage(property, '날짜');
}

// String 타입 관련 함수
export function getStringTypeMessage({
  property,
  description,
  example,
}: IMessageOptions) {
  const comma = description && example ? ', ' : '';
  const exampleWithPreffix = example ? `ex: ${example}` : '';

  const suffix =
    description || example
      ? ` (${description}${comma}${exampleWithPreffix})`
      : '';

  return `${property}의 형식이 올바르지 않습니다.${suffix}`;
}

export function getIsMobilePhone({ property }: IPropsWithPropertyName) {
  return getStringTypeMessage({ property });
}

// 값 크기 관련 함수
export function getMaxMessage({ property, max }: IPropsWithMax) {
  return `${property}의 최대값은 ${max}입니다.`;
}

export function getMinMessage({ property, min }: IPropsWithMin) {
  return `${property}의 최소값은 ${min}입니다.`;
}

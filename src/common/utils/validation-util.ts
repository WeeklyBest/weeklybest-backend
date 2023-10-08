interface IPropsWithPropertyName {
  property: string;
}
interface IPropsWithMinLength extends IPropsWithPropertyName {
  minLength: number;
}
interface IPropsWithMaxLength extends IPropsWithPropertyName {
  maxLength: number;
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

// 타입 검증 관련 함수
function getTypeCheckMessage(property: string, type: string) {
  return `${property}의 형식은 ${type}이어야 합니다.`;
}

export function getIsStringMessage({ property }: IPropsWithPropertyName) {
  return getTypeCheckMessage(property, '문자열');
}

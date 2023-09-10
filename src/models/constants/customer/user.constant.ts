export const USER = {
  EMAIL: {
    MATCHES: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    MAX_LENGTH: 255,
    MESSAGE: {
      IS_EMAIL: '이메일 형식에 맞게 입력해주세요.',
      IS_NOT_EMPTY: '이메일을 입력해주세요.',
    },
  },
  PASSWORD: {
    MATCHES: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    MIN_LENGTH: 8,
    MAX_LENGTH: 255,
    MESSAGE: {
      IS_PASSWORD:
        '비밀번호는 영문, 숫자, 특수문자 조합으로 이루어진 8~15 글자이어야 합니다.',
      IS_NOT_EMPTY: '비밀번호를 입력해주세요.',
    },
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
  },
  MOBILE: {
    MATCHES: /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/,
    MESSAGE: {
      IS_PHONE: '휴대폰 번호 양식에 맞게 입력해주세요.',
    },
  },
};
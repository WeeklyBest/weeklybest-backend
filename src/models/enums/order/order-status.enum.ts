export enum OrderStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT', // 입금대기
  PAYMENT_ACCEPTED = 'PAYMENT_ACCEPTED', // 입금확인
  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT', // 배송준비중
  SHIPPED = 'SHIPPED', // 배송중
  DELIVERED = 'DELIVERED', // 배송완료
  CANCELLED = 'CANCELLED', // 주문 취소
  EXCHANGED = 'EXCHANGED', // 교환
  REFUNDED = 'REFUNDED', // 환불
}

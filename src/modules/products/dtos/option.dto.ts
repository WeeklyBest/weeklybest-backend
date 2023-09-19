import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { OptionDocs, OptionValueDocs } from '@/docs';
import { InputType, Option, OptionValue } from '@/models';

export class OptionValueResponse {
  @SwaggerDoc.id('상품 옵션 값 식별자')
  id: number;

  @OptionValueDocs.value()
  value: string;

  @OptionValueDocs.additionalCharge()
  additionalCharge: number;

  @OptionValueDocs.order()
  order: number;

  constructor(optionValue: OptionValue) {
    const { id, value, additionalCharge, order } = optionValue;

    this.id = id;
    this.value = value;
    this.additionalCharge = additionalCharge;
    this.order = order;
  }
}

export class OptionResponse {
  @SwaggerDoc.id('상품 옵션 식별자')
  id: number;

  @OptionDocs.label()
  label: string;

  @OptionDocs.description()
  description: string;

  @OptionDocs.inputType()
  inputType: InputType;

  @OptionDocs.order()
  order: number;

  @ApiProperty({
    description: '상품 옵션값',
    type: [OptionValueResponse],
  })
  values: OptionValueResponse[];

  constructor(option: Option) {
    const { id, label, description, inputType, order, values } = option;

    this.id = id;
    this.label = label;
    this.description = description;
    this.inputType = inputType;
    this.order = order;

    this.values = values.map((value) => new OptionValueResponse(value));
  }
}

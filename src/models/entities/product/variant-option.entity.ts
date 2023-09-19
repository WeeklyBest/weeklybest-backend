import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { OptionValue } from './option-value.entity';
import { Variant } from './variant.entity';

@Entity()
export class VariantOption {
  @PrimaryColumn()
  variantId: number;

  @PrimaryColumn()
  optionValueId: number;

  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;

  @ManyToOne(() => OptionValue, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn([{ name: 'optionValueId', referencedColumnName: 'id' }])
  value: OptionValue;
}

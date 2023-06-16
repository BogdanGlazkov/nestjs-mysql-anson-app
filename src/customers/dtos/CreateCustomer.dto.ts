import {
  IsEmail,
  IsNumberString,
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './CreateAddress.dto';

export class CreateCustomerDto {
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}

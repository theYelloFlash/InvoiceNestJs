import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { v4 } from "uuid";

export class GenericDto {
  @IsString()
  @IsOptional()
  uuid: string = v4();

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean = false;

  @IsString()
  @IsOptional()
  created_user: string;

  @IsString()
  @IsOptional()
  modified_user?: string;

  @IsString()
  @IsOptional()
  deleted_user?: string;

  @IsDate()
  @IsOptional()
  created_date: Date = new Date();

  @IsDate()
  @IsOptional()
  modified_date?: Date;

  @IsDate()
  @IsOptional()
  deleted_date?: Date;
}

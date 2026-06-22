import{IsOptional} from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

}
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT Access 토큰',
  })
  accessToken: string;
}

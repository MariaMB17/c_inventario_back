import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { InstructionModule } from './instruction/instruction.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    ClientModule,
    SupplierModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    ClientModule,
    SupplierModule,
    ProductModule,
    InstructionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

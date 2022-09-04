import { Module } from '@nestjs/common';
import { UsersModule } from './routers/users/users.module';
import { LoginModule } from './routers/login/login.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { AuthModule } from './logical/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolesModule } from './routers/roles/roles.module';
import { UploadModule } from './routers/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponModule } from './routers/compon/compon.module';
import { SmsModule } from './routers/sms/sms.module';
import { CategoryModule } from './routers/mall/category/category.module';
import { AttrKeyModule } from './routers/mall/attr-key/attr-key.module';
import { AttrValModule } from './routers/mall/attr-val/attr-val.module';
import { ProductModule } from './routers/mall/product/product.module';
import { ProductSpecsModule } from './routers/mall/product-specs/product-specs.module';
import { BrandModule } from './routers/mall/brand/brand.module';

@Module({
  imports: [
    LoginModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      serveRoot: '/doc',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/assets'),
      serveRoot: '/asset',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web'),
      serveRoot: '',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'q847164495',
      database: 'xlh',
      synchronize: true,
      autoLoadEntities: true,
      timezone: '+08:00', // 东八时区
    }),
    UsersModule,
    RolesModule,
    UploadModule,
    ComponModule,
    SmsModule,
    CategoryModule,
    AttrKeyModule,
    AttrValModule,
    ProductModule,
    ProductSpecsModule,
    BrandModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

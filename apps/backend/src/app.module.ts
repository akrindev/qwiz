import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from 'app.controller';
import { PrismaService } from 'prisma.service';
import { AWSModule } from 'resources/aws/aws.module';
import { SlideModule } from 'resources/slide/slide.module';
import { AttendeeModule } from './resources/attendee/attendee.module';
import { OrganizationModule } from './resources/organization/organization.module';
import { QuestionModule } from './resources/question/question.module';
import { UserModule } from './resources/user/user.module';
import { EventModule } from './resources/event/event.module';
import { QuizModule } from './resources/quiz/quiz.module';

@Module({
  imports: [
    UserModule,
    QuestionModule,
    OrganizationModule,
    AttendeeModule,
    EventModule,
    QuizModule,
    AWSModule,
    SlideModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        AWS_BUCKET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET_SECRET_KEY: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_BUCKET_REGION: Joi.string().required(),
        AWS_BUCKET_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}

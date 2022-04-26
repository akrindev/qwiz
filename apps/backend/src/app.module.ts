import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';

import { PrismaService } from 'prisma.service';
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
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}

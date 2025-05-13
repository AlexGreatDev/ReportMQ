import { Module } from '@nestjs/common';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'email@gmail.com',
          pass: 'email-password',
        },
      },
      defaults: {
        from: '"No Reply" <your-email@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: null, // Use a template adapter like Handlebars or Pug if needed
        options: {
          strict: true,
        },
      },
    }),
    EmailSenderModule,
    RabbitMQModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

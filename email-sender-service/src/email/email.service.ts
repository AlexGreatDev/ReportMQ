import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(to: string, subject: string, content: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: `<b>${content}</b>`,
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
    return 'Mail sent';
  }
}

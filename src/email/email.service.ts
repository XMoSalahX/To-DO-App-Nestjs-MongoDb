import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpException } from '@nestjs/common';
import { SendemailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendEmail(emailData: SendemailDto) {
    try {
      const send = await this.mailer.sendMail({
        to: emailData.to,
        from: emailData.from,
        subject: emailData.subject,
        context: emailData.context,
        template: emailData.template,
      });
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

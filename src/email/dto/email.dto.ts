export class SendemailDto {
  to: string;
  from: string;
  subject: string;
  template: string;
  context: any;
}

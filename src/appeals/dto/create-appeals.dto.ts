import { AppealStatus } from '../entity/appeals.entity';

export class CreateAppealsDto {
  subject: string;
  text: string;
  status?: AppealStatus;
}

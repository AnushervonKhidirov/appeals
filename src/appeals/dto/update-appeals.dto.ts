import { PartialType } from '../../common/types/partial.type';
import { CreateAppealsDto } from './create-appeals.dto';

export class UpdateAppealsDto extends PartialType(CreateAppealsDto) {
  resultMessage?: string | null;
}

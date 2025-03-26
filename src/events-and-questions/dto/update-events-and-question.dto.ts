import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsAndQuestionDto } from './create-events-and-question.dto';

export class UpdateEventsAndQuestionDto extends PartialType(
  CreateEventsAndQuestionDto,
) {}

import type { DataSource } from 'typeorm';
import type { Request, Response } from 'express';
import { AppealEntity, AppealStatus } from './entity/appeals.entity';

import { AppealsService } from './appeals.service';
import { AppealsHelper } from './appeals.helper';
import { Validation } from '../common/validation/validation';

import { BadRequestException } from '../common/exceptions/exceptions';
import { CreateAppealsDto } from './dto/create-appeals.dto';
import { TAsyncMethodReturnWithError } from '../common/types/service-method.type';
import { UpdateAppealsDto } from './dto/update-appeals.dto';

export class AppealsController {
  private readonly appealsService: AppealsService;
  private readonly appealsHelper: AppealsHelper;

  constructor(dataSource: DataSource) {
    this.appealsService = new AppealsService(dataSource);
    this.appealsHelper = new AppealsHelper();
  }

  async findOne(req: Request, res: Response) {
    const idValidation = new Validation(req.params.id, 'id').IsNumberString();

    if (idValidation.errors.length > 0) {
      const exceptions = new BadRequestException(idValidation.errors);
      res.status(exceptions.statusCode).send(exceptions);
      return;
    }

    const [appeal, err] = await this.appealsService.findOne({ id: +req.params.id });

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }
    res.status(200).send(appeal);
  }

  async findAll(req: Request, res: Response) {
    const dateFilters = this.appealsHelper.getDateFilters(req.query);
    const [appeals, err] = await this.appealsService.findAll(dateFilters);

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeals);
  }

  async create(req: Request, res: Response) {
    const textValidation = new Validation(req.body.text, 'text').IsString().IsNotEmpty();
    const subjectValidation = new Validation(req.body.subject, 'subject').IsString().IsNotEmpty();
    const validationErrors = [...textValidation.errors, ...subjectValidation.errors];

    if (validationErrors.length > 0) {
      const exceptions = new BadRequestException(validationErrors);
      res.status(exceptions.statusCode).send(exceptions);
      return;
    }

    const createAppealsDto = req.body as CreateAppealsDto;
    const [appeal, err] = await this.appealsService.create(createAppealsDto);

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeal);
  }

  async setInProgress(req: Request, res: Response) {
    const [appeal, err] = await this.updateAppealStatus(req.params.id, {
      status: AppealStatus.IN_PROGRESS,
      resultMessage: null,
    });

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeal);
  }

  async setCompleted(req: Request, res: Response) {
    const messageValidation = new Validation(req.body.resultMessage, 'resultMessage')
      .IsString()
      .IsNotEmpty();

    if (messageValidation.errors.length > 0) {
      const exceptions = new BadRequestException(messageValidation.errors);
      res.status(exceptions.statusCode).send(exceptions);
      return;
    }

    const [appeal, err] = await this.updateAppealStatus(req.params.id, {
      status: AppealStatus.COMPLETED,
      resultMessage: req.body.resultMessage,
    });

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeal);
  }

  async setCanceled(req: Request, res: Response) {
    const messageValidation = new Validation(req.body.resultMessage, 'resultMessage')
      .IsString()
      .IsNotEmpty();

    if (messageValidation.errors.length > 0) {
      const exceptions = new BadRequestException(messageValidation.errors);
      res.status(exceptions.statusCode).send(exceptions);
      return;
    }

    const [appeal, err] = await this.updateAppealStatus(req.params.id, {
      status: AppealStatus.CANCELLED,
      resultMessage: req.body.resultMessage,
    });

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeal);
  }

  async cancelAllInProgress(req: Request, res: Response) {
    const [appeals, err] = await this.appealsService.cancelAllInProgress();

    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }

    res.status(200).send(appeals);
  }

  private async updateAppealStatus(
    id: string,
    updateAppealsDto: UpdateAppealsDto,
  ): TAsyncMethodReturnWithError<AppealEntity> {
    const idValidation = new Validation(id, 'id').IsNumberString();

    if (idValidation.errors.length > 0) {
      return [null, new BadRequestException(idValidation.errors)];
    }

    const [updatedAppeal, updateErr] = await this.appealsService.update(+id, updateAppealsDto);
    if (updateErr) return [null, updateErr];

    return [updatedAppeal, null];
  }
}

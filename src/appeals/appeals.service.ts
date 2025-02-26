import type { Repository, DataSource, FindOptionsWhere, FindManyOptions } from 'typeorm'
import { TAsyncMethodReturnWithError } from '../common/types/service-method.type'
import { AppealEntity } from './entity/appeals.entity'

import { CreateAppealsDto } from './dto/create-appeals.dto'
import { UpdateAppealsDto } from './dto/update-appeals.dto'

import { NotFoundException, InternalServerErrorException } from '../common/exceptions/exceptions'

export class AppealsService {
  repository: Repository<AppealEntity>

  constructor(database: DataSource) {
    this.repository = database.getRepository(AppealEntity)
  }

  async findOne(where: FindOptionsWhere<AppealEntity>): TAsyncMethodReturnWithError<AppealEntity> {
    const appeal = await this.repository.findOneBy(where)
    if (!appeal) return [null, new NotFoundException()]
    return [appeal, null]
  }

  async findAll(options?: FindManyOptions<AppealEntity>): TAsyncMethodReturnWithError<AppealEntity[]> {
    const appeals = await this.repository.find(options)
    if (!Array.isArray(appeals)) return [null, new InternalServerErrorException()]
    return [appeals, null]
  }

  async create(createAppealsDto: CreateAppealsDto): TAsyncMethodReturnWithError<AppealEntity> {
    const newAppeal = this.repository.create(createAppealsDto)
    const appeal = await this.repository.save(newAppeal)
    if (!appeal) return [null, new InternalServerErrorException()]
    return [appeal, null]
  }

  async update(id: number, updateAppealsDto: UpdateAppealsDto): TAsyncMethodReturnWithError<AppealEntity> {
    const [appeal, err] = await this.findOne({ id })
    if (err) return [null, err]

    const newAppeal = this.repository.create({
      ...appeal,
      ...updateAppealsDto,
    })

    const updatedAppeal = await this.repository.save(newAppeal)
    if (!updatedAppeal) return [null, new InternalServerErrorException()]

    return [updatedAppeal, null]
  }
}

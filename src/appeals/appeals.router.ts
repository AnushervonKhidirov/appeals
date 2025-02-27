import type { DataSource } from 'typeorm'
import { Router } from 'express'

import { AppealsController } from './appeals.controller'

export class AppealsRouter {
  private readonly controller: AppealsController
  readonly router: Router

  constructor(dataSource: DataSource) {
    this.controller = new AppealsController(dataSource)
    this.router = Router()
    this.init()
  }

  private init() {
    this.router.get('/', this.controller.findAll.bind(this.controller))
    this.router.get('/:id', this.controller.findOne.bind(this.controller))
    this.router.post('/create', this.controller.create.bind(this.controller))
    this.router.patch('/set_in_progress/:id', this.controller.setInProgress.bind(this.controller))
    this.router.patch('/complete/:id', this.controller.setCompleted.bind(this.controller))
    this.router.patch('/cancel/:id', this.controller.setCanceled.bind(this.controller))
    this.router.patch('/cancel_all_in_progress', this.controller.cancelAllInProgress.bind(this.controller))
    this.router.delete('/:id')
  }
}

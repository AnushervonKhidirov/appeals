import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export enum AppealStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'appeals' })
export class AppealEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subject: string

  @Column()
  text: string

  @Column({ type: 'enum', enum: AppealStatus, default: AppealStatus.NEW })
  status: AppealStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

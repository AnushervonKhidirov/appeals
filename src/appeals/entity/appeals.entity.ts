import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum AppealStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'appeals' })
export class AppealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'enum', enum: AppealStatus, default: AppealStatus.NEW })
  status: AppealStatus;

  @Column({ name: 'result_message', type: 'text', nullable: true })
  resultMessage: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

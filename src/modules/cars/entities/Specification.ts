import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("specifications")
class Specification {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}

export { Specification };

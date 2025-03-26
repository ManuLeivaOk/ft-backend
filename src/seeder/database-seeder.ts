/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.runSeedScript();
  }

  private async runSeedScript() {
    const sqlScript = `
      INSERT INTO talks (name, speakerDNI) VALUES ('Sample Event', '43333333');
      INSERT INTO event (state) VALUES ('1');
      INSERT INTO user (id, name, lastName, password, email, documentNumber, age, school, instagram, birthday, colour, state, type, group)
        VALUES(1, '', '', '', '', '', 0, '', '', '', '', '', 1, 1, 1);
    `;
    
    try {
      await this.dataSource.query(sqlScript);
      console.log('Test data inserted successfully');
    } catch (error) {
      console.error('Error inserting test data', error);
    }
  }
}

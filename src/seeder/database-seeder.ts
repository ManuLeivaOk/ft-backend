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
      INSERT INTO event (state) VALUES(1);
    `;
    
    try {
      await this.dataSource.query(sqlScript);
      console.log('Test data inserted successfully');
    } catch (error) {
      console.error('Error inserting test data', error);
    }
  }
}

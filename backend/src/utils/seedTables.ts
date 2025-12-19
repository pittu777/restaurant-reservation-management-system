import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db';
import { Table } from '../models/Table';

const TABLE_CONFIG = [
  { count: 2, capacity: 2 }, 
  { count: 2, capacity: 4 },
  { count: 1, capacity: 6 },
];

const seedTables = async () => {
  await connectDB();

  await Table.deleteMany();

  let tableNumber = 1;
  const tables = [];

  for (const config of TABLE_CONFIG) {
    for (let i = 0; i < config.count; i++) {
      tables.push({
        tableNumber: tableNumber++,
        capacity: config.capacity,
      });
    }
  }

  await Table.insertMany(tables);

  console.log('Tables seeded successfully');
  process.exit();
};

seedTables();

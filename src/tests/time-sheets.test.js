import app from '../app'
import timesheets from '../models/Time-sheets'
import timesheetseeds from '../seeds/time-sheets-seeds'

beforeAll(async() => {
    await timesheets.collection.insertMany(timesheetseeds);
});

describe()
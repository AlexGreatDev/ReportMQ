import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateInvoiceDto } from '../invoice/invoice.dto';

describe('InvoiceController (integration)', () => {
  let app: INestApplication;
  let invoiceModel;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot('mongodb://localhost/nest_test'),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    invoiceModel = moduleFixture.get(getModelToken('Invoice'));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'John Doe',
      amount: 150.0,
      reference: 'INV123',
      date: new Date(),
      items: [
        { sku: 'ITEM001', qt: 2 },
        { sku: 'ITEM002', qt: 5 },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/invoices')
      .send(createInvoiceDto)
      .expect(201);

    expect(response.body.customer).toBe(createInvoiceDto.customer);
    expect(response.body.amount).toBe(createInvoiceDto.amount);
    expect(response.body.reference).toBe(createInvoiceDto.reference);
    expect(response.body.items.length).toBe(createInvoiceDto.items.length);

    const invoice = await invoiceModel.findById(response.body._id);
    expect(invoice).toBeDefined();
    expect(invoice.customer).toBe(createInvoiceDto.customer);
    expect(invoice.amount).toBe(createInvoiceDto.amount);
  });

  it('should retrieve an invoice by id', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'Jane Doe',
      amount: 200.0,
      reference: 'INV124',
      date: new Date(),
      items: [
        { sku: 'ITEM003', qt: 1 },
        { sku: 'ITEM004', qt: 3 },
      ],
    };
    const createdInvoice = await request(app.getHttpServer())
      .post('/invoices')
      .send(createInvoiceDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/invoices/${createdInvoice.body._id}`)
      .expect(200);

    expect(response.body._id).toBe(createdInvoice.body._id);
    expect(response.body.customer).toBe(createInvoiceDto.customer);
    expect(response.body.amount).toBe(createInvoiceDto.amount);
    expect(response.body.reference).toBe(createInvoiceDto.reference);
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async processPayment(storeId: number, amount: number, currency: string, paymentMethod: string) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    switch (store.paymentGateway) {
      case 'stripe':
        return this.processStripePayment(store, amount, currency);
      case 'paypal':
        return this.processPayPalPayment(store, amount, currency);
      case 'mada':
        return this.processMadaPayment(store, amount, currency);
      case 'bank_transfer':
        return this.processBankTransfer(store);
      default:
        throw new NotFoundException('Payment gateway not supported');
    }
  }

  private async processStripePayment(store: Store, amount: number, currency: string) {
    const stripe = new Stripe(JSON.parse(store.paymentConfig).stripeSecretKey, { apiVersion: '2022-11-15' });
    return stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
  }

  private async processPayPalPayment(store: Store, amount: number, currency: string) {
    const paypalClient = new paypal.core.PayPalHttpClient(
      new paypal.core.SandboxEnvironment(
        JSON.parse(store.paymentConfig).paypalClientId,
        JSON.parse(store.paymentConfig).paypalClientSecret
      )
    );

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: currency, value: amount.toString() } }],
    });

    return paypalClient.execute(request);
  }

  private async processMadaPayment(store: Store, amount: number, currency: string) {
    // تكامل مدى - هنا تحتاج إلى API مدى
    return { success: true, message: 'Payment processed via Mada' };
  }

  private async processBankTransfer(store: Store) {
    return { success: true, message: 'Bank transfer initiated, please send proof of payment' };
  }
}

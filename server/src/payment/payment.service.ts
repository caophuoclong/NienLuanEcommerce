import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from 'src/database/entities/creditCard';
import { Customer } from 'src/database/entities/customer';
import {
  Payment,
  PaymentStatus,
  PaymentType,
} from 'src/database/entities/payment';
import { ICard } from 'src/order/dto/checkoutDTO';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly crediCardRepository: Repository<CreditCard>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  private async _getCreditCard(customer: Customer, card: ICard) {
    const creditCard = await this.crediCardRepository.findOne({
      where: [
        {
          number: card.number,
        },
        {
          number: card._id,
        },
      ],
    });
    if (creditCard) {
      return creditCard;
    } else {
      const creditCard = this.crediCardRepository.create();
      creditCard.holder = card.holder;
      creditCard.number = card.number;
      creditCard.mm = card.exp.mm;
      creditCard.yy = card.exp.yy;
      creditCard.cvv = card.cvv;
      creditCard.email = card.email;
      creditCard.customer = customer;
      return await this.crediCardRepository.save(creditCard);
    }
  }
  async createPayment(
    customer: Customer,
    card: ICard,
    _: {
      method: PaymentType;
      amount: number;
    },
  ) {
    const payment = this.paymentRepository.create();
    payment.customer = customer;
    if (_.method === PaymentType.CREDIT_CARD) {
      const creditCard = await this._getCreditCard(customer, card);
      payment.creditCard = creditCard;
    }
    payment.type = _.method;
    payment.amount = _.amount;
    payment.status = PaymentStatus.SUCCESS;
    return await this.paymentRepository.save(payment);
  }
  async updatePayment(payment: Payment) {
    const creditCard = await this._getCreditCard(payment.customer, {
      _id: payment.creditCard.number,
      number: payment.creditCard.number,
      holder: payment.creditCard.holder,
      cvv: payment.creditCard.cvv,
      email: payment.creditCard.email,
      exp: {
        mm: payment.creditCard.mm,
        yy: payment.creditCard.yy,
      },
    });
    if (creditCard) {
      if (payment.amount > creditCard.balance) {
        throw new Error('Not enough balance');
      } else {
        creditCard.balance -= payment.amount;
        await this.crediCardRepository.save(creditCard);
      }
    }
    return await this.paymentRepository.save(payment);
  }
  async setStatus(payment: Payment, status: PaymentStatus) {
    payment.status = status;
    return await this.paymentRepository.save(payment);
  }
}

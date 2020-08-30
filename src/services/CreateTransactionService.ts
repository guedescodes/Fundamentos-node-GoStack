import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}: Omit<Transaction,'id'> ): Transaction {

    if(!['outcome','income'].includes(type))
    {
        throw Error('Type transiction not valid.');
    }

    if(type == 'outcome' && this.transactionsRepository.getBalance().total < value)
    {
      throw Error('Value impossible.');
    }
    const transaction = this.transactionsRepository.create({title,value,type});
    return transaction
  }
}

export default CreateTransactionService;

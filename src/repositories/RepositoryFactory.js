import ReceiptRepository from './receiptRepository'
import UserRepository from './userRepository'
import StoreRepository from './storeRepository'
import SupplierRepository from './supplierRepository'
import ReceiptTypeRepository from './receiptTypeRepository'
import EvidenceRepository from './evidenceRepository'
import TransactionRepository from './transactionRepository'
import AccountingPeriodRepository from './accountingPeriodRepository'
import TransactionCategoryRepository from './transactionCategoryRepository'
import TransactionDetailRepository from './transactionDetailRepository'
import TransactionTypeRepository from './transactionTypeRepository'

const repositories = {
    receipts: ReceiptRepository,
    users: UserRepository,
    stores: StoreRepository,
    suppliers: SupplierRepository,
    receipt_types: ReceiptTypeRepository,
    evidences: EvidenceRepository,
    transactions: TransactionRepository,
    'accounting-periods': AccountingPeriodRepository,
    'transaction-categories': TransactionCategoryRepository,
    'transaction-details': TransactionDetailRepository,
    'transaction-types': TransactionTypeRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}

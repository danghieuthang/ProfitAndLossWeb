import ReceiptRepository from './receiptRepository'
import UserRepository from './userRepository'
import StoreRepository from './storeRepository'
import SupplierRepository from './supplierRepository'
import ReceiptTypeRepository from './receiptTypeRepository'
import EvidenceRepository from './evidenceRepository'
import TransactionRepository from './transactionRepository'
import AccountingPeriodRepository from './accountingPeriodRepository'
import TransactionCategoryRepository from './transactionCategoryRepository'

const repositories = {
    receipts: ReceiptRepository,
    users: UserRepository,
    stores: StoreRepository,
    suppliers: SupplierRepository,
    receipt_types: ReceiptTypeRepository,
    evidences: EvidenceRepository,
    transactions: TransactionRepository,
    'accounting-periods': AccountingPeriodRepository,
    'transaction-categories': TransactionCategoryRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}

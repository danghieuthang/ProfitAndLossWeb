import ReceiptRepository from './receiptRepository'
import UserRepository from './userRepository'

const repositories = {
    receipts: ReceiptRepository,
    users: UserRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}

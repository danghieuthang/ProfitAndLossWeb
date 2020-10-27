<template>
  <a-modal
    :visible="visible"
    title="Add new receipt"
    okText="Add"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="createReceipt"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Store">
        <a-select v-model="receipt.store_id" de>
          <!-- <a-select-option>Please select store: </a-select-option> -->
          <a-select-option v-for="store in stores" :key="store.id">
            {{ store.code }} - {{ store.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Description">
        <a-input
          v-model="receipt.description"
          type="textarea"
          v-decorator="[
            'description',
            {
              rules: [{ required: true, message: 'Please input the description of receipt!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Price">
        <a-input
          v-model="receipt.price"
          type="number"
          v-decorator="[
            'price',
            {
              initValue: { number: 0 },
              rules: [{ validator: checkPrice }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Supplier">
        <a-select v-model="receipt.supplier_id" de>
          <a-select-option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
            {{ supplier.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Receipt Type">
        <a-select v-model="receipt.type_id" de>
          <a-select-option v-for="type in types" :key="type.id" :value="type.id">
            {{ type.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const StoreRepository = RepositoryFactory.get('stores')
const SupplierRepository = RepositoryFactory.get('suppliers')
const ReceiptTypeRepository = RepositoryFactory.get('receipt_types')
const ReceiptRepository = RepositoryFactory.get('receipts')
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      stores: [],
      suppliers: [],
      types: [],
      receipt: {
        store_id: '',
        description: '',
        price: 0,
        type_id: '',
        supplier_id: ''
      }
    }
  },
  mounted () {
    StoreRepository.get().then((res) => {
      const rs = res.data.results
      this.stores = rs
      this.receipt.store_id = rs[0].id
    })
    SupplierRepository.get().then((res) => {
      const rs = res.data.results
      this.suppliers = rs
      this.receipt.supplier_id = rs[0].id
    })
    ReceiptTypeRepository.get().then((res) => {
      const rs = res.data.results
      this.types = rs
      this.receipt.type_id = rs[0].id
    })
  },
  methods: {
    checkPrice (rule, value, callback) {
      if (this.receipt.price > 0) {
        callback()
        return
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('Price must greater than zero!')
    },
    createReceipt () {
      this.form.validateFields((err) => {
        if (!err) {
          ReceiptRepository.createReceipt(this.receipt).then((res) => {
              this.$emit('create', res.data)
          })
        } else {
        }
      })
    }
  }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

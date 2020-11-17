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
    @ok="createTransaction"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Store">
        <a-select v-model="transaction['store-id']" de>
          <!-- <a-select-option>Please select store: </a-select-option> -->
          <a-select-option v-for="st in stores" :key="st.id">
            {{ st.code }} - {{ st.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Receipt Type">
        <a-select v-model="transaction['receipt-type-id']" de>
          <a-select-option v-for="type in types" :key="type.id" :value="type.id">
            {{ type.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Note Message">
        <a-input
          v-model="transaction['note-message']"
          type="textarea"
          v-decorator="[
            'notemessage',
            {
              rules: [{ required: true, message: 'Please input the Note message of receipt!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Balance">
        <a-input
          v-model="transaction['total-balance']"
          type="number"
          v-decorator="[
            'price',
            {
              initValue: { number: 0 },
              rules: [{ validator: checkBalance }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Supplier">
        <a-select v-model="transaction['supplier-id']" de>
          <a-select-option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
            {{ supplier.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Open Date - Close Date">
        <a-range-picker
          :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
          @change="onChangeDatePicker"
        />
      </a-form-item>

      <h1 class="receipt-form"></h1>
      <a-form-item label="Upload Evidence" extra="">
        <a-input type="file" @change="onImageChange" multiple />
        <div id="preview">
          <img v-for="image in imageUrl" :key="image" :src="image" />
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import firebase from '@/config/firebase.config'
const StoreRepository = RepositoryFactory.get('stores')
const SupplierRepository = RepositoryFactory.get('suppliers')
const TransactionTypeRepository = RepositoryFactory.get('transaction-types')
const TransactionRepository = RepositoryFactory.get('transactions')
const EvidenceRepository = RepositoryFactory.get('evidences')

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
      dateFormat: 'YYYY/MM/DD',
      form: this.$form.createForm(this),
      stores: [],
      suppliers: [],
      types: [],
      transaction: {
        'store-id': '',
        'note-message': '',
        'total-balance': 0,
        'receipt-type-id': '',
        'supplier-id': '',
        'shipping-fee': 0,
        'description': '',
        'discount-value': 0
      },
      file: null,
      imageUrl: null
    }
  },
  mounted () {
    StoreRepository.get().then((res) => {
      const rs = res.results
      this.stores = rs
      this.transaction['store-id'] = rs[0].id
    })
    SupplierRepository.get().then((res) => {
      const rs = res.results
      this.suppliers = rs
      // this.transaction['supplier-id'] = rs[0].id
    })
    TransactionTypeRepository.get().then((res) => {
      const rs = res.results
      this.types = rs
      this.transaction['receipt-type-id'] = rs[0].id
    })
  },
  methods: {
    moment,
    checkBalance (rule, value, callback) {
      if (this.transaction['total-balance'] > 0) {
        callback()
        return
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('Balance must greater than zero!')
    },
    createTransaction () {
      this.form.validateFields((err) => {
        if (!err) {
          TransactionRepository.create(this.transaction).then((res) => {
            if (res.success) {
              this.addEvidence(res.results.id)
              // this.$emit('addTransaction', res.results)
              this.$router.push({ path: `${this.$route.path}/${res.results.id}` })
            } else {
              this.$message.error(`Add transaction faild: ${res.results}`)
            }
          })
        }
      })
      // console.log(this.file)
    },
    uploadFirebase (image, id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const storageRef = firebase.storage().ref(`${image.name}`).put(image)
          storageRef.on(
            `state_changed`,
            (snapshot) => {
              this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
              console.log(error.message)
            },
            () => {
              this.uploadValue = 100
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                resolve({
                  name: image.name,
                  'img-url': url,
                  'receipt-id': id
                })
              })
            }
          )
        })
      })
    },
    async createEvidence (id) {
      const evidences = []
      for (var i = 0; i < this.file.length; i++) {
        const image = this.file[i]
        console.log(`upload ${i}`)
        const newEvidence = await this.uploadFirebase(image, id)
        evidences.push(newEvidence)
      }
      //  this.file.forEach(x => {
      //    evidences.push(this.uploadFirebase(x, id))
      //  })
      EvidenceRepository.add(evidences).then((res) => {
          if (res.success) {
            console.log('add evidence success')
          } else {
            console.log('add evidence error')
          }
      })
    },
    addEvidence (id) {
      for (var i = 0; i < this.file.length; i++) {
          const image = this.file[i]

          const formData = new FormData()
          formData.append('image', image)
          formData.append('receipt-id', id)
          formData.append('name', image.name)
          EvidenceRepository.addEvidence(formData).then((res) => {
          if (res.success) {
            console.log('add evidence success')
          } else {
            console.log('add evidence error')
          }
      })
      }
    },
    onImageChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.file = files
      this.imageUrl = []
      files.forEach((file) => this.imageUrl.push(URL.createObjectURL(file)))
      // this.imageUrl = URL.createObjectURL(this.file)
      this.previewVisible = true
    },
    onChangeDatePicker (dates, dateStrings) {
      this.transaction['open-date'] = dateStrings[0]
      this.transaction['close-date'] = dateStrings[2]
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
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.receipt-form {
  border-top: 2px ridge;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  margin: 2px;
  max-width: 100px;
  max-height: 100px;
}
</style>

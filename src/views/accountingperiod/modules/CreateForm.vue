<template>
  <a-modal
    :visible="visible"
    title="Add new Accounting Period"
    okText="Add"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="create"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Start Date">
        <a-range-picker
          :default-value="[moment('2020/06/11', dateFormat), moment('2020/12/31', dateFormat)]"
          @change="onChange"
        />
      </a-form-item>
      <a-form-item label="Title">
        <a-input
          v-model="accountingPeriod.title"
          type="text"
          v-decorator="[
            'Title',
            {
              rules: [{ required: true, message: 'Please input the title!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Description">
        <a-input
          v-model="accountingPeriod.description"
          type="textarea"
          v-decorator="[
            'description',
            {
              rules: [{ required: true, message: 'Please input the description!' }],
            },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
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
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      accountingPeriod: {
        title: '',
        description: '',
        'start-date': '2020-06-01',
        'close-date': '2020-12-31'
      }
    }
  },
  mounted () {
  },
  methods: {
    create () {
      this.form.validateFields((err) => {
        if (!err) {
          AccountingPeriodRepository.create(this.accountingPeriod).then((res) => {
              this.$emit('create', res)
          })
        } else {
        }
      })
    },
    moment,
    onChange (dates, dateStrings) {
      this.accountingPeriod['start-date'] = dateStrings[0]
      this.accountingPeriod['close-date'] = dateStrings[1]
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

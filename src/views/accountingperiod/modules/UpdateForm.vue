<template>
  <a-modal
    :visible="true"
    title="Update Accounting Period"
    okText="Save"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="update"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Date">
        <a-range-picker
          @change="onChange"
          v-decorator="['date']"
        />
      </a-form-item>
      <a-form-item label="Title">
        <a-input
          v-model="accountingPeriod.title"
          type="text"
          v-decorator="[
            'title',
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
  props: ['selectId'],
  data () {
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      accountingPeriod: {
      }
    }
  },
  mounted () {
      AccountingPeriodRepository.searchById(this.selectId).then((res) => {
             const data = res.results
             this.accountingPeriod = data
             this.form.getFieldDecorator('title', { initialValue: data.title })
             this.form.getFieldDecorator('description', { initialValue: data.description })
             this.form.getFieldDecorator('date', { initialValue: [moment(this.accountingPeriod['start-date'], this.dateFormat), moment(this.accountingPeriod['close-date'], this.dateFormat)] })
        })
  },
  methods: {
    update () {
      this.form.validateFields((err) => {
        if (!err) {
          AccountingPeriodRepository.update(this.accountingPeriod).then((res) => {
              this.$emit('update', res)
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

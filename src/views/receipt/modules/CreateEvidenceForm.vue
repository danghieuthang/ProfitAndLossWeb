<template>
  <a-modal
    :visible="visible"
    title="Add evidence for created receipt"
    okText="Create"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="addEvidence"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Name">
        <a-input
          v-model="evidence.name"
          type="text"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input the name of evidences!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Description">
        <a-input v-model="evidence.description" type="textarea" />
      </a-form-item>
      <a-form-item label="Upload" extra="">
        <!-- <a-upload
          v-decorator="[
            'upload',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="logo"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload> -->
        <a-input type="file" @change="onImageChange" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
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
      form: this.$form.createForm(this),
      evidence: { receipt_id: '', name: '', description: '', image: null }
    }
  },
  methods: {
    addEvidence () {
      this.form.validateFields((err) => {
        console.log('Err ' + err)
        if (!err) {
          this.$emit('addEvidence', this.evidence)
        }
      })
    },
    onImageChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.evidence.image = files[0]
      // this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this.evidence
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

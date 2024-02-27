import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled } from '@ant-design/icons'
import request from '@common/helpers/request'
import Button from '@components/Button/Index'
import Input from '@components/Input/Index'
import Toaster from '@components/Toaster/Toaster'
import { Space, Table } from 'antd'
import { Modal } from 'antd'
import { Checkbox, Radio, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import cls from './AllIntegrations.module.css'

export default function AllIntegrations() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([])
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const { confirm } = Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [integrationData, setIntegrationData] = useState([])
  const [integrationCategories, setIntegrationCategories] = useState([])

  interface values {
    [key: string]: any // Assuming any value can be assigned under any key
    product_name: string
    integration_name: string
    // integration_desc: string
    integration_category: string
    doc_link: string
    integration_type: string
    is_free: any
    integration_logo: any
  }

  interface DataType {
    key: number
    product_name: string
    // integration_desc: string
    integration_category: string
    doc_link: string
    integration_type: string
    is_free: boolean
    integration_logo: string
  }

  const [values, setValues] = useState<values>({
    product_name: 'bit_integrations',
    integration_name: '',
    integration_category: '',
    // integration_desc: '',
    doc_link: '',
    integration_type: 'action',
    is_free: false,
    integration_logo: undefined
  })

  const showModal = (record: any) => {
    setValues(record)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchData = () => {
    setLoading(true)
    request('integration', null, null, 'GET').then(res => {
      setTableData(res.data.integrationDetails)
      setIntegrationData(res.data.integrationDetails)
      setIntegrationCategories(res.data.allCategories)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const ids: [] = []
    for (let i = 0; i < newSelectedRowKeys.length; i++) {
      ids.push(tableData[i]['id'])
    }
    setSelectedRowIds(ids)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: text => (text === 'bit_integrations' ? 'Bit Integrations' : 'Bit Assist')
    },
    {
      title: 'Integration Name',
      dataIndex: 'integration_name',
      key: 'integration_name'
    },
    {
      title: 'Category',
      dataIndex: 'integration_category',
      key: 'integration_category'
    },
    // {
    //   title: 'Integration Description',
    //   dataIndex: 'integration_desc',
    //   key: 'integration_desc'
    // },
    {
      title: 'Doc Link',
      dataIndex: 'doc_link',
      key: 'doc_link',
      render: text => (
        <a target="_blank" href={text}>
          {text}
        </a>
      )
    },
    {
      title: 'Type',
      key: 'integration_type',
      dataIndex: 'integration_type'
    },
    {
      title: 'Is Free',
      key: 'is_free',
      dataIndex: 'is_free',
      render: text => (text === '1' ? 'True' : 'False')
    },
    {
      title: 'Integration Logo',
      key: 'integration_logo',
      dataIndex: 'integration_logo',
      render: text => (
        <img
          className="integration-logo"
          style={{ width: '50px', height: '50px' }}
          src={text}
          alt="integration logo"
        ></img>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      fixed: 'right',
      render: (_, record: any) => (
        <Space size="middle">
          <span onClick={() => showModal(record)} style={{ cursor: 'pointer' }}>
            <EditOutlined style={{ fontSize: '18px' }} />
          </span>
          <span onClick={() => showDeleteConfirm(record.id, 'single')} style={{ cursor: 'pointer' }}>
            <DeleteOutlined style={{ fontSize: '18px', color: 'hsl(4deg, 90%, 58%)' }} />
          </span>
        </Space>
      )
    }
  ]

  const showDeleteConfirm = (rowIds: number[], type: string) => {
    confirm({
      title: type === 'single' ? 'Are you sure delete this row?' : 'Are you sure delete these rows?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        request(`integration/${rowIds}/destroy`)
          .then(res => {
            setSelectedRowKeys([])
            fetchData()
            if (res.status != 'error') {
              toast.success(res.data)
            } else {
              toast.error(res.data)
            }
          })
          .catch(err => {
            fetchData()
            toast.error(err.data)
          })
      }
    })
  }

  const handleSelectChange = (value: string, name: string) => {
    const tmpValues = { ...values }
    tmpValues[name] = value

    if (value === 'bit_integrations') {
      tmpValues['integration_type'] = 'action'
    } else if (value === 'bit_assist') {
      tmpValues['integration_type'] = 'social'
    }
    setValues(tmpValues)
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    const tmpValues = { ...values }
    tmpValues[name] =
      name == 'is_free' ? checked : name === 'integration_logo' ? e.target.files[0] : value
    setValues(tmpValues)
  }

  const handleEditSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData()
    for (let key in values) {
      data.append(key, values[key])
    }
    request(`integration/${parseInt(values.id)}/update`, data)
      .then(res => {
        if (res?.status !== 'error') {
          setIsModalOpen(false)
          toast.success(res.data)
          fetchData()
        } else {
          Object.entries(res.data).forEach((item: any) => {
            item[1].forEach((rule: string) => {
              toast.error(rule)
            })
          })
        }
      })
      .catch(() => {
        toast.error('integration updating failed')
      })
  }

  const handleSearch = (val: string) => {
    setSearchValue(val)
    const filteredData = integrationData.filter(data => {
      if (val.trim() !== '') {
        return Object.values(data).some(key =>
          String(key).toLowerCase().includes(val.toString().toLowerCase())
        )
      }
      return data
    })
    setTableData(filteredData)
  }

  return (
    <div className={cls.allIntegrations}>
      <div className={cls.tableTop}>
        <div className="left">
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <span onClick={() => showDeleteConfirm(selectedRowIds, 'bulk')} style={{ cursor: 'pointer' }}>
            {hasSelected ? (
              <DeleteOutlined
                style={{ marginLeft: '10px', fontSize: '18px', color: 'hsl(4deg, 90%, 58%)' }}
              />
            ) : (
              ''
            )}
          </span>
        </div>
        <div className="right">
          <Input
            name="search"
            value={searchValue}
            placeHolder="Search here"
            onChange={e => handleSearch(e.target.value)}
            width="200px"
          />
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        rowKey={(_, index): any => index}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={{ position: ['bottomRight'] }}
      />

      <Modal title="Edit integration" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form className={cls.form} onSubmit={handleEditSubmit}>
          <Select
            defaultValue={values.product_name}
            style={{ width: 400 }}
            onChange={e => handleSelectChange(e, 'product_name')}
            options={[
              { value: 'bit_integrations', label: 'Bit Integrations' },
              { value: 'bit_assist', label: 'Bit Assist' }
            ]}
          />
          <Input
            name="integration_name"
            value={values.integration_name}
            placeHolder="Integration Name"
            title="Integration Name"
            onChange={handleChange}
          />
          {values.product_name !== 'bit_assist' && (
            <>
              <label className={cls.label}>Integration Category:</label>
              <Select
                placeholder="Select a category"
                defaultValue={values.integration_category}
                style={{ width: 400 }}
                onChange={e => handleSelectChange(e, 'integration_category')}
                options={integrationCategories}
              />
            </>
          )}
          {/* <label className={cls.label}>Integration Description:</label>
          <textarea
            name="integration_desc"
            style={{ width: 400 }}
            onChange={handleChange}
          ></textarea> */}
          <Input
            name="doc_link"
            value={values.doc_link}
            placeHolder="Doc Link"
            title="Doc Link"
            onChange={handleChange}
            required={false}
          />
          <label className={cls.label}>Type:</label>

          <Radio.Group onChange={handleChange} value={values.integration_type} name="integration_type">
            {values.product_name === 'bit_integrations' && (
              <>
                <Radio value="trigger">Trigger</Radio>
                <Radio value="action">Action</Radio>
              </>
            )}
            {values.product_name === 'bit_assist' && (
              <>
                <Radio value="social">Social</Radio>
                <Radio value="others">Others</Radio>
              </>
            )}
          </Radio.Group>

          <Checkbox
            name="is_free"
            onChange={handleChange}
            checked={typeof values.is_free === 'string' ? parseInt(values.is_free) : values.is_free}
          >
            Is Free
          </Checkbox>

          <Input
            name="integration_logo"
            type="file"
            title="Integration Logo"
            onChange={handleChange}
            required={values.integration_logo !== '' ? false : true}
          ></Input>
          <div className="integration-logo-preview">
            <img
              style={{ width: '50px', height: '50px' }}
              src={
                typeof values.integration_logo === 'object'
                  ? URL.createObjectURL(values.integration_logo)
                  : values.integration_logo
              }
            ></img>
          </div>
          <Button type="submit">Update</Button>
        </form>
      </Modal>

      <Toaster />
    </div>
  )
}

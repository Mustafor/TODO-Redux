import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS } from '../redux/actions'

function List() {
  const [updateModal, setUpdateModal] = useState(false)
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.todo)
  const [username, setUsername] = useState("")
  const [age, setAge] = useState("")
  const [updateId, setUpdateId] = useState(null)

  function handleUpdateBtnClick(id) {
    setUpdateModal(true);
    const findUpdateUser = usersList.find(item => item.id === id)
    setUsername(findUpdateUser.username)
    setAge(findUpdateUser.age)
    setUpdateId(id)
  }

  function handleUpdateUser() {
    const data = { username, age: Number(age) }
    dispatch({ type: ACTIONS.update, payload: { newData: data, id: updateId } })
    setUpdateModal(false)
  }

  return (
    <>
      <ul className='w-[500px] space-y-4 mx-auto mt-10'>
        {usersList.map((item, index) => (
          <li key={index} className='p-4 bg-slate-200 flex items-center justify-between border-[1px] border-blue-400 rounded-md'>
            <div className='flex items-center space-x-1'>
              <span className='text-[20px]'>{index + 1}.</span>
              <strong className='text-[20px]'>{item.username} - {item.age}</strong>
            </div>
            <div className='flex items-center space-x-2'>
              <Button onClick={() => dispatch({ type: ACTIONS.delete, payload: item.id })} style={{ borderColor: "red" }}>
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
              <Button onClick={() => handleUpdateBtnClick(item.id)} style={{ borderColor: "green" }}>
                <EditOutlined style={{ color: "green" }} />
              </Button>
              <Button style={{ borderColor: "blue" }}>
                <MoreOutlined style={{ color: "blue" }} />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal title="Update user" open={updateModal} onCancel={() => setUpdateModal(false)} onOk={handleUpdateUser}>
        <Input required className='mb-3' value={username} onChange={(e) => setUsername(e.target.value)} size='large' type='text' allowClear placeholder='Enter your name'/>
        <Input required value={age} onChange={(e) => setAge(e.target.value)} size='large' type='number' allowClear placeholder='Enter your age'/>
      </Modal>
    </>
  )
}

export default List

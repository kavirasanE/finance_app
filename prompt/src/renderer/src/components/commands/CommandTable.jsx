import React, { useContext } from 'react'
import { Table } from 'flowbite-react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { decode } from 'messagepack'
import { DataContext } from '../context/DataProvider'

const CommandTable = ({ item, index, callback }) => {
  const { setCommandstoOutput, pauseRunningCommand, listDevices } = useContext(DataContext)
  console.log(pauseRunningCommand)

  const handleClick = (e) => {
    console.log(listDevices)
    console.log(item)
    setCommandstoOutput(item.command)
    const coms = item.command
    e.preventDefault()
    e.stopPropagation()
    let device = listDevices[0].id
    console.log(device)
    const shellComand = coms
    // console.log(shellComand)
    window.electron.ipcRenderer.invoke('shellCommand', shellComand, device).then((res) => {
      const socket = new WebSocket('ws://localhost:8080')
      socket.onopen = () => {
        console.log('Connected to WebSocket server')
      }
      socket.onmessage = (event) => {
        let last = JSON.parse(event.data)
        console.log(last)
        // let last =decode(event.data)
        setTimeout(() => {
          callback(last)
        }, 500)
      }
      
      socket.onclose = () => {
        console.log('Disconnected from WebSocket server')
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    })
  }

  return (
    <Table hoverable className="border border-gray-500 cursor-pointer ">
      <Table.Body>
        <Table.Row className="bg-white hover:bg-gray-300 dark:border-gray-700 ">
          <Table.Cell
            className="font-medium break-all text-gray-900 dark:text-white"
            onClick={handleClick}
          >
            {item.command} <br />
            <span className="text-xs font-thin clear-start flex items-center gap-1">
              <IoInformationCircleOutline className="text-xs" /> {item.description}
            </span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default CommandTable

import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers
} from 'react-icons/hi'
import { RxHamburgerMenu } from 'react-icons/rx'
export function Online() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex items-center justify-between p-2 w-full px-10 ">
        <RxHamburgerMenu
          size={40}
          className=" rounded-lg border border-gray-100 p-1.5 shadow-lg shadow-black/50 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

       <p className='font-bold text-xl'>Beta Version</p>
       <p></p>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="PromptClickz" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/logs">Take Logs</Sidebar.Item>
                    <Sidebar.Item href="/Home">Test your Commands</Sidebar.Item>
                    {/* <Sidebar.Item href="/demo">Test</Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/connectdevice">Connected Devices</Sidebar.Item>
                    <Sidebar.Item href="/commands">Log Commands</Sidebar.Item>
                    {/* <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}

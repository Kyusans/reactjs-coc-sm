import React from 'react'
import { Card, Form } from 'react-bootstrap'

function CreatePost() {
  return (
    <div className='flex justify-center h-screen bg-[#030303]'>
      <div className='flex justify-center w-[80%] gap-8'>
        <div className='w-[60%] my-14 p-2'>
          <div className='flex justify-between'>
            <h1 className='text-[22px]'>Create Post</h1>
            <button className='flex items-center px-4 py-2 rounded-full gap-2'>
              <p className='text-sm font-bold'>DRAFTS</p>
              <p className='h-[25px] w-[20px] bg-gray-400 rounded-md'>0</p>
            </button>
          </div>
          <div className='w-full border-[1px] border-[#333435]' />
          <div className='my-4'>
            <select name="cars" id="cars" className='text-white font-semibold bg-[#1a1a1b] p-2 w-[300px]'>
              <option selected>Choose a Community</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className='bg-[#1a1a1b] rounded-md'>
            <div className='flex text-center'>
              <div className='w-full p-3 border-b-[2px] font-bold bg-[#333435] rounded-tl-md'>Post</div>
              <div className='border-r-[2px] border-[#333435]' />
              <div className='w-full p-3 text-[#7f8182] font-bold hover:bg-[#333435]'>Image & Video</div>
              <div className='border-r-[2px] border-[#333435]' />
              <div className='w-full p-3 text-[#7f8182] font-bold hover:bg-[#333435]'>Link</div>
              <div className='border-r-[2px] border-[#313d49]' />
              <div className='w-full p-3 text-[#7f8182] font-bold hover:bg-[#333435] hover:rounded-tr-md hover:rounded-br-md'>Poll</div>
            </div>
            <div className='h-[380px] p-4'>
              <div>
                <input placeholder='Title' className='w-full bg-[#1a1a1b] border-[1px] border-[#333435] rounded-md p-2'></input>
                <p className='w-full text-right'>0/300</p>
              </div>
              <div className='border rounded-md border-[#333435] p-2 h-[200px]'>
                <div> <p className=''>Text(Optional)</p></div>
              </div>
              <div className='flex gap-2 my-2'>
                <button className='flex items-center px-4 py-2 rounded-full gap-2 border-[1px] border-[#333435] text-[#333435]'>OC</button>
                <button className='flex items-center px-4 py-2 rounded-full gap-2 border-[1px] border-[#333435] text-[#333435]'>Spoiler</button>
                <button className='flex items-center px-4 py-2 rounded-full gap-2 border-[1px] border-[#333435] text-[#333435]'>NSFW</button>
                <button className='flex items-center px-4 py-2 rounded-full gap-2 border-[1px] border-[#333435] text-[#333435]'>Flair</button>
              </div>
              <div className='w-full border-[1px] border-[#333435]' />
            </div>
            <div className='flex justify-end py-2 pb-4 pr-4 gap-2'>
              <button className='flex items-center px-4 py-2 rounded-full gap-2 border'>Save Draft</button>
              <button className='flex items-center px-4 py-2 rounded-full gap-2 border bg-white text-black'>Post</button>
            </div>
          </div>
        </div>
        <div className='w-[20%] my-14'>
          <div className='bg-[#1a1a1b] p-4 rounded-md'>
            <p className='text-lg font-semibold'>Posting to Reddit</p>
            <div className='w-full border-[1px] border-[#333435]' />
            <p className='font-semibold'>Test</p>
            <div className='w-full border-[1px] border-[#333435]' />
            <p className='font-semibold'>Test</p>
            <div className='w-full border-[1px] border-[#333435]' />
            <p className='font-semibold'>Test</p>
            <div className='w-full border-[1px] border-[#333435]' />
          </div>
        </div>
      </div>
    </div >
  )
}

export default CreatePost
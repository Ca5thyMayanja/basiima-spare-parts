'use client'

import React from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { ContainerStyles } from './ContainerStyles'

const WhatsAppButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const firstwhatsapp = (
    <ContainerStyles>
      <a
        href={`https://wa.me/${phoneNumber}?text='hello,where,you,located?`}
        className="fixed bottom-20 right-10 bg-green-500 text-white rounded-full shadow-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="md:px-4 p-3 flex gap-2 md:gap-3 justify-center items-center">
          <FaWhatsapp color="white" className="w-8 h-8 md:w-10 md:h-8" />
          <div className=" font-bold md:text-[15px] text-[13px] hidden md:block">
            Chat on WhatsApp
          </div>
        </div>
      </a>
    </ContainerStyles>
  )

  return <>{firstwhatsapp}</>
}

export default WhatsAppButton

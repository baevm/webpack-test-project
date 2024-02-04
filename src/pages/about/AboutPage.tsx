import React, { useEffect } from 'react'
import avatarJpg from '@/assets/avatar.jpg'
import AvatarSvg from '@/assets/avatar.svg'
import avatarPng from '@/assets/avatar.png'

const AboutPage = () => {
  useEffect(() => {
    throw new Error('test')
  })

  return (
    <div>
      <div>
        <AvatarSvg width={360} height={360} />
        <img src={avatarJpg} width={360} height={360} alt='avatarjpg' />
        <img src={avatarPng} width={360} height={360} alt='avatarpng' />
      </div>
      <h1>about page</h1>
    </div>
  )
}

export default AboutPage
